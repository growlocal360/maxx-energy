"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 2.5;
const STEP = 0.5;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const touchDist = (a: Touch, b: Touch) =>
  Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

/**
 * Zoom + pan for the flip book.
 *
 * react-pageflip has no native zoom, and CSS-scaling a parent breaks its
 * drag-to-flip math (it maps pointers against an unscaled rect). So:
 *  - At zoom === 1 there is NO overlay and the transform is identity, so
 *    drag-to-flip and the TOC hotspots behave exactly as before.
 *  - At zoom > 1 a transparent overlay sits on top of the book and owns
 *    pointer drags (pan), so page-flip never sees them. Pages are turned
 *    with the arrow buttons instead.
 *  - Pinch is handled by a capture-phase touch listener on the container so
 *    it fires before page-flip (and works to start zooming from 1).
 *
 * Panning uses a translate transform (not scrollLeft), because CSS transforms
 * don't enlarge a parent's scroll area.
 */
export function useZoomPan() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null); // pinch target + fullscreen
  const viewportRef = useRef<HTMLDivElement | null>(null); // clipping box
  const contentRef = useRef<HTMLDivElement | null>(null); // measured for clamp

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const clampPan = useCallback((x: number, y: number, z: number) => {
    const vp = viewportRef.current;
    const content = contentRef.current;
    if (!vp || !content) return { x, y };
    const scaledW = content.offsetWidth * z;
    const scaledH = content.offsetHeight * z;
    const maxX = Math.max(0, (scaledW - vp.clientWidth) / 2);
    const maxY = Math.max(0, scaledH - vp.clientHeight);
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, 0) };
  }, []);

  const applyZoom = useCallback(
    (next: number) => {
      const z = clamp(next, MIN_ZOOM, MAX_ZOOM);
      setZoom(z);
      setPan((p) => (z === 1 ? { x: 0, y: 0 } : clampPan(p.x, p.y, z)));
    },
    [clampPan],
  );

  const zoomIn = useCallback(() => applyZoom(zoomRef.current + STEP), [applyZoom]);
  const zoomOut = useCallback(() => applyZoom(zoomRef.current - STEP), [applyZoom]);
  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);
  // Re-frame to top-center without changing zoom (used when turning pages).
  const recenter = useCallback(() => setPan({ x: 0, y: 0 }), []);

  // Pinch — capture-phase touch listener on the container so it beats
  // page-flip's own touch handlers and can start zooming from 1.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startDist = 0;
    let startZoom = 1;
    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        e.stopPropagation();
        startDist = touchDist(e.touches[0], e.touches[1]);
        startZoom = zoomRef.current;
      }
    };
    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist > 0) {
        e.preventDefault();
        e.stopPropagation();
        applyZoom(startZoom * (touchDist(e.touches[0], e.touches[1]) / startDist));
      }
    };
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) startDist = 0;
    };
    const opts = { capture: true, passive: false } as AddEventListenerOptions;
    el.addEventListener("touchstart", onStart, opts);
    el.addEventListener("touchmove", onMove, opts);
    el.addEventListener("touchend", onEnd, { capture: true });
    el.addEventListener("touchcancel", onEnd, { capture: true });
    return () => {
      el.removeEventListener("touchstart", onStart, opts);
      el.removeEventListener("touchmove", onMove, opts);
      el.removeEventListener("touchend", onEnd, { capture: true });
      el.removeEventListener("touchcancel", onEnd, { capture: true });
    };
  }, [applyZoom]);

  // Pan — pointer handlers for the overlay. Single pointer only; 2+ pointers
  // belong to the pinch listener above.
  const active = useRef<Set<number>>(new Set());
  const last = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    active.current.add(e.pointerId);
    if (active.current.size === 1) {
      last.current = { x: e.clientX, y: e.clientY };
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    } else {
      last.current = null;
    }
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (active.current.size !== 1 || !last.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      setPan((p) => clampPan(p.x + dx, p.y + dy, zoomRef.current));
    },
    [clampPan],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    active.current.delete(e.pointerId);
    if (active.current.size === 0) last.current = null;
  }, []);

  const overlayHandlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };

  return {
    zoom,
    pan,
    isZoomed: zoom > 1,
    zoomIn,
    zoomOut,
    reset,
    recenter,
    containerRef,
    viewportRef,
    contentRef,
    overlayHandlers,
  };
}

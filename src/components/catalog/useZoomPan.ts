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
 *  - At zoom > 1 a transparent overlay sits on top of the book and owns the
 *    desktop mouse drag (pan), so page-flip never sees it. Pages are turned
 *    with the arrow buttons instead.
 *
 * Touch is handled by ONE capture-phase listener on the viewport, driven by
 * `e.touches` (always authoritative). Mixing touch + pointer events was the
 * mobile bug: a `pointercancel` after a pinch left a stuck id in a pointer
 * set, so panning silently stopped. Desktop uses mouse-only events; touch
 * uses touch-only events; the two streams never overlap.
 *
 * Panning uses a translate transform (not scrollLeft), because CSS transforms
 * don't enlarge a parent's scroll area.
 */
export function useZoomPan() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null); // fullscreen target
  const viewportRef = useRef<HTMLDivElement | null>(null); // clipping box + gesture surface
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

  // --- Touch: one capture-phase listener on the viewport for pinch + pan ---
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let startDist = 0; // >0 while a 2-finger pinch is active
    let startZoom = 1;
    let anchor: { x: number; y: number } | null = null; // pan anchor
    let prevCount = 0;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        e.stopPropagation();
        startDist = touchDist(e.touches[0], e.touches[1]);
        startZoom = zoomRef.current;
        anchor = null;
      } else if (e.touches.length === 1 && zoomRef.current > 1) {
        e.preventDefault();
        e.stopPropagation();
        anchor = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      // 1 finger at 100%: let it flow to page-flip (swipe-to-flip).
      prevCount = e.touches.length;
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist > 0) {
        e.preventDefault();
        e.stopPropagation();
        applyZoom(startZoom * (touchDist(e.touches[0], e.touches[1]) / startDist));
      } else if (e.touches.length === 1 && zoomRef.current > 1) {
        e.preventDefault();
        e.stopPropagation();
        const t = e.touches[0];
        if (anchor === null || prevCount !== 1) {
          // First pan frame, or just dropped from 2→1 fingers: re-anchor, no jump.
          anchor = { x: t.clientX, y: t.clientY };
        } else {
          const dx = t.clientX - anchor.x;
          const dy = t.clientY - anchor.y;
          anchor = { x: t.clientX, y: t.clientY };
          setPan((p) => clampPan(p.x + dx, p.y + dy, zoomRef.current));
        }
      }
      prevCount = e.touches.length;
    };

    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) startDist = 0;
      if (e.touches.length === 0) anchor = null;
      prevCount = e.touches.length;
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
  }, [applyZoom, clampPan]);

  // --- Desktop pan: mouse-only handlers for the overlay (no pointer events,
  // so they can't collide with the touch listener above). ---
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging.current || !last.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      setPan((p) => clampPan(p.x + dx, p.y + dy, zoomRef.current));
    },
    [clampPan],
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
    last.current = null;
  }, []);

  const overlayHandlers = {
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
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

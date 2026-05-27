"use client";

import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ListTree,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { CATALOG_SECTIONS, currentSection } from "@/lib/catalog-sections";
import { MAX_ZOOM, MIN_ZOOM } from "./useZoomPan";

interface CatalogToolbarProps {
  currentPage: number;
  totalPages: number;
  pdfUrl: string;
  isFullscreen: boolean;
  zoom: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onJumpToPage: (page: number) => void;
  onOpenContents: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export default function CatalogToolbar({
  currentPage,
  totalPages,
  pdfUrl,
  isFullscreen,
  zoom,
  onPrev,
  onNext,
  onToggleFullscreen,
  onJumpToPage,
  onOpenContents,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: CatalogToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const here = currentSection(currentPage);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-maxx-950/95 px-4 py-3 text-white shadow-lg backdrop-blur sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous page"
          disabled={currentPage <= 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next page"
          disabled={currentPage >= totalPages - 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="ml-2 font-mono text-sm tabular-nums text-white/80">
          {Math.min(currentPage + 1, totalPages)} / {totalPages}
        </span>

        <div ref={dropdownRef} className="relative ml-2">
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm transition hover:bg-white/20"
          >
            <ListTree className="h-4 w-4 text-maxx-accent" />
            <span className="max-w-28 truncate sm:max-w-none">
              {here ? `${here.number} · ${here.title}` : "Jump to section"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute bottom-12 left-0 z-10 w-64 overflow-hidden rounded-lg border border-white/10 bg-maxx-950 shadow-2xl"
            >
              {CATALOG_SECTIONS.map((s) => {
                const isActive = here?.number === s.number;
                return (
                  <li key={s.number}>
                    <button
                      type="button"
                      onClick={() => {
                        onJumpToPage(s.openerPage);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-baseline justify-between px-4 py-2.5 text-left text-sm transition ${
                        isActive
                          ? "bg-maxx-accent/20 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-maxx-accent">
                          {s.number}
                        </span>
                        <span>{s.title}</span>
                      </span>
                      <span className="font-mono text-xs text-white/50 tabular-nums">
                        p. {s.openerPage}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Zoom controls — visible on all screen sizes (client reads on tablets).
            Buttons are ≥44px tall for reliable finger taps. */}
        <div className="flex items-center gap-0.5 rounded-lg bg-white/10 px-0.5">
          <button
            type="button"
            onClick={onZoomOut}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            className="flex h-11 w-11 items-center justify-center rounded-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onZoomReset}
            aria-label="Reset zoom to 100%"
            className="h-11 w-14 text-center font-mono text-xs tabular-nums text-white/80 transition hover:text-white"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={onZoomIn}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="flex h-11 w-11 items-center justify-center rounded-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onOpenContents}
          aria-label="Open contents drawer"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
        >
          <BookOpen className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="hidden h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20 sm:flex"
        >
          {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
        <a
          href={pdfUrl}
          download
          className="flex items-center gap-2 rounded-lg bg-maxx-accent px-4 py-2 text-sm font-semibold text-maxx-950 transition hover:bg-maxx-mint"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </a>
      </div>
    </div>
  );
}

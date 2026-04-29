"use client";

import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from "lucide-react";

interface CatalogToolbarProps {
  currentPage: number;
  totalPages: number;
  pdfUrl: string;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
}

export default function CatalogToolbar({
  currentPage,
  totalPages,
  pdfUrl,
  isFullscreen,
  onPrev,
  onNext,
  onToggleFullscreen,
}: CatalogToolbarProps) {
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
      </div>

      <div className="flex items-center gap-2">
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

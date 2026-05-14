"use client";

import { useEffect, useRef } from "react";
import { ChevronRight, X } from "lucide-react";
import { CATALOG_SECTIONS, type TocSection } from "@/lib/catalog-sections";

interface TOCDrawerProps {
  open: boolean;
  currentPage: number;
  onClose: () => void;
  onJumpToPage: (page: number) => void;
}

export default function TOCDrawer({
  open,
  currentPage,
  onClose,
  onJumpToPage,
}: TOCDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleJump = (page: number) => {
    onJumpToPage(page);
    onClose();
  };

  return (
    <div
      aria-hidden={!open}
      className={`pointer-events-${
        open ? "auto" : "none"
      } fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close contents"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        tabIndex={open ? 0 : -1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-label="Catalog contents"
        tabIndex={-1}
        className={`relative flex h-full w-full max-w-md flex-col bg-maxx-950 text-white shadow-2xl transition-transform duration-300 sm:max-w-lg ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-maxx-accent">
              Contents
            </div>
            <div className="font-display text-2xl font-bold tracking-tight">
              Jump to a section
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-6">
            {CATALOG_SECTIONS.map((s) => (
              <SectionBlock
                key={s.number}
                section={s}
                currentPage={currentPage}
                onJump={handleJump}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  currentPage,
  onJump,
}: {
  section: TocSection;
  currentPage: number;
  onJump: (page: number) => void;
}) {
  const isCurrent =
    currentPage + 1 >= section.openerPage &&
    currentPage + 1 <= (section.items.at(-1)?.page ?? section.openerPage);

  return (
    <li>
      <button
        type="button"
        onClick={() => onJump(section.openerPage)}
        className={`group flex w-full items-baseline justify-between border-b pb-2 text-left transition ${
          isCurrent
            ? "border-maxx-accent"
            : "border-white/20 hover:border-maxx-accent"
        }`}
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-maxx-accent">
            {section.number} · {section.eyebrow}
          </div>
          <div className="font-display text-xl font-bold tracking-tight">
            {section.title}
          </div>
        </div>
        <span className="font-mono text-xs text-white/60 tabular-nums">
          p. {section.openerPage}
        </span>
      </button>

      <ul className="mt-2 flex flex-col">
        {section.items.map((it) => {
          const active = currentPage + 1 === it.page;
          return (
            <li key={it.label}>
              <button
                type="button"
                onClick={() => onJump(it.page)}
                className={`flex w-full items-baseline gap-3 py-1.5 text-left text-sm transition ${
                  active
                    ? "text-maxx-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <ChevronRight
                  className={`h-3.5 w-3.5 flex-shrink-0 transition ${
                    active ? "text-maxx-accent" : "text-white/30"
                  }`}
                />
                <span className="flex-1">{it.label}</span>
                <span className="font-mono text-xs text-white/50 tabular-nums">
                  {it.page}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

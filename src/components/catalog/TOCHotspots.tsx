"use client";

import { CATALOG_SECTIONS } from "@/lib/catalog-sections";

interface TOCHotspotsProps {
  onJumpToPage: (page: number) => void;
}

// Layout constants from the printed Contents.tsx page (8.5 × 11 in).
const PAGE_W = 8.5;
const PAGE_H = 11;
const GRID_LEFT = 0.5;
const GRID_TOP = 2.75;
const COL_GAP = 0.5;
const COL_WIDTH = (PAGE_W - GRID_LEFT * 2 - COL_GAP) / 2; // 3.5 in

// Per-section block heights, derived from the printed layout:
// eyebrow (0.07) + title row (0.45) + items × 0.18 + margin-bottom (0.38).
const SECTION_HEIGHT_IN = (itemCount: number) => 0.07 + 0.45 + itemCount * 0.18 + 0.38;

// Click target covers the eyebrow + the big section title.
const HEADER_HEIGHT_IN = 0.6;

const inX = (n: number) => `${(n / PAGE_W) * 100}%`;
const inY = (n: number) => `${(n / PAGE_H) * 100}%`;

const LEFT_COL_SECTIONS = ["01", "03", "05"];
const RIGHT_COL_SECTIONS = ["02", "04", "06"];

function hotspotsForColumn(numbers: string[], xOffsetIn: number) {
  let cursorY = GRID_TOP;
  const out: {
    number: string;
    title: string;
    page: number;
    style: React.CSSProperties;
  }[] = [];
  for (const n of numbers) {
    const section = CATALOG_SECTIONS.find((s) => s.number === n);
    if (!section) continue;
    out.push({
      number: section.number,
      title: section.title,
      page: section.openerPage,
      style: {
        left: inX(xOffsetIn),
        width: inX(COL_WIDTH),
        top: inY(cursorY),
        height: inY(HEADER_HEIGHT_IN),
      },
    });
    cursorY += SECTION_HEIGHT_IN(section.items.length);
  }
  return out;
}

export default function TOCHotspots({ onJumpToPage }: TOCHotspotsProps) {
  const left = hotspotsForColumn(LEFT_COL_SECTIONS, GRID_LEFT);
  const right = hotspotsForColumn(
    RIGHT_COL_SECTIONS,
    GRID_LEFT + COL_WIDTH + COL_GAP,
  );
  const hotspots = [...left, ...right];

  return (
    <div
      aria-label="Contents page hotspots"
      className="pointer-events-none absolute inset-0"
    >
      {hotspots.map((h) => (
        <button
          key={h.number}
          type="button"
          onClick={() => onJumpToPage(h.page)}
          aria-label={`Jump to ${h.title} (page ${h.page})`}
          title={`${h.title} — p. ${h.page}`}
          style={h.style}
          className="pointer-events-auto absolute cursor-pointer bg-maxx-accent/0 transition hover:bg-maxx-accent/20 focus:bg-maxx-accent/20 focus:outline-2 focus:outline-maxx-accent"
        />
      ))}
    </div>
  );
}

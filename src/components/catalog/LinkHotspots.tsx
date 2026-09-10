"use client";

/**
 * Clickable link overlays for catalog pages that print a button/URL.
 * The flip-book renders each page as a flat image, so this overlay is
 * what makes the printed button actually open the link in the viewer.
 *
 * Geometry is in inches on the printed 8.5 × 11 in page, measured from
 * the designer render (see maxx-energy-designer BoxPartsPage.tsx).
 */

const PAGE_W = 8.5;
const PAGE_H = 11;

type LinkHotspot = {
  href: string;
  label: string;
  /** inches from the page's left / top edge */
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Keyed by 1-based render position (the same number the toolbar shows). */
export const LINK_HOTSPOTS: Record<number, LinkHotspot[]> = {
  51: [
    {
      href: "/products/box-parts",
      label: "Browse Roll-Off Box Parts",
      left: 4.98,
      top: 9.5,
      width: 2.74,
      height: 0.38,
    },
  ],
};

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

export default function LinkHotspots({ page }: { page: number }) {
  const spots = LINK_HOTSPOTS[page];
  if (!spots?.length) return null;

  return (
    <div
      aria-label="Page links"
      className="pointer-events-none absolute inset-0"
    >
      {spots.map((h) => (
        <a
          key={h.href}
          href={h.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={h.label}
          title={h.label}
          onClick={(e) => e.stopPropagation()}
          style={{
            left: pct(h.left, PAGE_W),
            top: pct(h.top, PAGE_H),
            width: pct(h.width, PAGE_W),
            height: pct(h.height, PAGE_H),
          }}
          className="pointer-events-auto absolute block cursor-pointer rounded-sm bg-white/0 transition hover:bg-white/15 focus:bg-white/15 focus:outline-2 focus:outline-maxx-accent"
        />
      ))}
    </div>
  );
}

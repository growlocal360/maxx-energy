/**
 * Live TOC data for the flip-book viewer.
 *
 * `page` numbers are 1-based render positions in the flip-book array
 * (same numbering the toolbar counter shows: "12 / 53"). The flip-book
 * uses 0-based indices internally, so all jumps go through `page - 1`.
 *
 * These numbers do NOT necessarily match the folio printed in the
 * bottom corner of each page — those drifted when the full-bleed
 * hero was inserted into §01 and weren't renumbered. The live nav
 * uses render-position; the printed folios are decorative chrome.
 */

export type TocEntry = {
  label: string;
  page: number;
};

export type TocSection = {
  number: string;
  eyebrow: string;
  title: string;
  openerPage: number;
  items: TocEntry[];
};

export const CATALOG_SECTIONS: TocSection[] = [
  {
    number: "01",
    eyebrow: "RAPID DEPLOY",
    title: "Spill Kits",
    openerPage: 7,
    items: [
      { label: "Compact 2.5 Gal Bag", page: 9 },
      { label: "High-Viz 5 Gal Bag", page: 10 },
      { label: "High-Viz 10 Gal Bag", page: 12 },
      { label: "Stackable 7 Gal Crate", page: 13 },
      { label: "Let's Roll 25 Gal Cart", page: 14 },
      { label: "Backpack 30 Gal Bag", page: 15 },
      { label: "Cubic Yard Bulk", page: 16 },
    ],
  },
  {
    number: "02",
    eyebrow: "BULK MEDIA",
    title: "Absorbents",
    openerPage: 18,
    items: [
      { label: "Spill Bully Recycled Paper", page: 20 },
      { label: "Spill Bully LIGHT · Coconut Coir", page: 21 },
      { label: "Absorbent Pads & Diapers", page: 22 },
      { label: "Selection Chart", page: 23 },
    ],
  },
  {
    number: "03",
    eyebrow: "STORM WATER",
    title: "Drain Protection",
    openerPage: 24,
    items: [
      { label: "Fire-Resistant Drain Cover", page: 26 },
      { label: "Inlet Filter", page: 27 },
      { label: "Grate Filter", page: 28 },
      { label: "Sediment Control Insert", page: 29 },
      { label: "Cut-to-Size Inlet", page: 30 },
    ],
  },
  {
    number: "04",
    eyebrow: "CONTAINMENT",
    title: "Spill & Berm",
    openerPage: 31,
    items: [
      { label: "Windproof Flex Drip Tray", page: 32 },
      { label: "Flex Spill Barrier", page: 33 },
      { label: "Drive-Over Containment", page: 34 },
      { label: "L-Bracket Containment", page: 35 },
      { label: "Poly Wall Systems", page: 36 },
      { label: "Secondary Containment", page: 37 },
      { label: "UN-Rated Zipper Tote", page: 38 },
      { label: "Drive-Over Cover", page: 39 },
    ],
  },
  {
    number: "05",
    eyebrow: "FLOOD & FIRE",
    title: "Emergency Response",
    openerPage: 40,
    items: [
      { label: "Pronto Sacks — Reusable Flood", page: 41 },
      { label: "Flood Bags & Barriers", page: 42 },
      { label: "Fire Blankets", page: 43 },
    ],
  },
  {
    number: "06",
    eyebrow: "MARINE",
    title: "On-Water Recovery",
    openerPage: 44,
    items: [
      { label: "Spill Rover · Autonomous Vessel", page: 45 },
      { label: "Spill Buoy · Water Monitoring", page: 49 },
      { label: "Gilligan AI · Predictive Analytics", page: 50 },
    ],
  },
];

/**
 * Finds the section the user is currently reading, given the 0-based
 * flip-book page index. Returns undefined for front-matter (pages 1–6)
 * and back-matter (pages 51–53), so callers can render a neutral label.
 */
export function currentSection(pageIndex: number): TocSection | undefined {
  const pos = pageIndex + 1;
  const backMatterStart =
    Math.max(...CATALOG_SECTIONS.flatMap((s) => s.items.map((i) => i.page))) +
    1;
  if (pos < CATALOG_SECTIONS[0].openerPage) return undefined;
  if (pos >= backMatterStart) return undefined;
  let match: TocSection | undefined;
  for (const s of CATALOG_SECTIONS) {
    if (s.openerPage <= pos) match = s;
    else break;
  }
  return match;
}

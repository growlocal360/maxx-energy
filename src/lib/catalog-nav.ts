/**
 * Flip-book navigation data. Generated per brand by the catalog hub's export
 * script (nav.json + links.json) — never hand-maintained.
 *
 * `page` numbers are 1-based render positions, the same number the toolbar
 * counter shows ("12 / 54") and the folio printed on the page.
 */

export type TocEntry = {
  label: string;
  page: number;
};

export type TocSection = {
  /** "01"… or "" for un-numbered blocks (e.g. the Box Parts sales sheet). */
  number: string;
  eyebrow: string;
  title: string;
  openerPage: number;
  items: TocEntry[];
};

export type CatalogNav = { sections: TocSection[] };

/** A click target on a page, as 0–1 fractions of the page box. */
export type CatalogLink = {
  kind: "jump" | "href";
  /** kind "jump": 1-based page to flip to. */
  target?: number;
  /** kind "href": URL to open. */
  href?: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Keyed by 1-based page number (JSON object keys, hence strings). */
export type CatalogLinks = Record<string, CatalogLink[]>;

/**
 * Finds the section the reader is in, given the 0-based flip-book page index.
 * Returns undefined for front matter and back matter so callers can render a
 * neutral label.
 */
export function currentSection(
  sections: TocSection[],
  pageIndex: number,
): TocSection | undefined {
  if (!sections.length) return undefined;
  const pos = pageIndex + 1;
  const lastPage = Math.max(
    ...sections.flatMap((s) => [s.openerPage, ...s.items.map((i) => i.page)]),
  );
  if (pos < sections[0].openerPage || pos > lastPage) return undefined;
  let match: TocSection | undefined;
  for (const s of sections) {
    if (s.openerPage <= pos) match = s;
    else break;
  }
  return match;
}

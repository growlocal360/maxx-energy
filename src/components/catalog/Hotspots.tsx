"use client";

import type { CatalogLink } from "@/lib/catalog-nav";

/**
 * Click targets over a flat page image. The flip-book shows screenshots, so
 * this overlay is what makes a printed table of contents or button work.
 * Geometry comes from links.json, measured from the rendered page at export
 * time — nothing here is positioned by hand.
 */
export default function Hotspots({
  links,
  onJumpToPage,
}: {
  links: CatalogLink[];
  onJumpToPage: (page: number) => void;
}) {
  if (!links.length) return null;

  const base =
    "pointer-events-auto absolute block cursor-pointer rounded-sm bg-maxx-accent/0 transition hover:bg-maxx-accent/20 focus:bg-maxx-accent/20 focus:outline-2 focus:outline-maxx-accent";

  return (
    <div aria-label="Page links" className="pointer-events-none absolute inset-0">
      {links.map((l, i) => {
        const style = {
          left: `${l.x * 100}%`,
          top: `${l.y * 100}%`,
          width: `${l.w * 100}%`,
          height: `${l.h * 100}%`,
        };
        if (l.kind === "jump" && l.target) {
          const target = l.target;
          return (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJumpToPage(target);
              }}
              aria-label={`Jump to ${l.label} (page ${target})`}
              title={`${l.label} — p. ${target}`}
              style={style}
              className={base}
            />
          );
        }
        if (l.kind === "href" && l.href) {
          return (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={l.label}
              title={l.label}
              style={style}
              className={base}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

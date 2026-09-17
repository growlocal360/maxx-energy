import localManifest from "../../public/catalog/manifest.json";
import localNav from "../../public/catalog/nav.json";
import localLinks from "../../public/catalog/links.json";
import type { CatalogLinks, CatalogNav, TocSection } from "@/lib/catalog-nav";

/**
 * Resolves the flip-book assets for a catalog brand.
 *
 * Builds are produced by the catalog hub's export script and uploaded to the
 * public `catalogs` Storage bucket as catalogs/<slug>/<buildId>/…; the brand
 * row's `current_build` points at the live one, so a rebuild goes live with no
 * deploy. Until the first Storage build exists (or if Storage is unreachable)
 * the copy bundled in /public/catalog is served instead, so this page can
 * never go dark.
 */

export type CatalogPage = { index: number; src: string; width: number; height: number };

export type CatalogBuild = {
  pages: CatalogPage[];
  pageCount: number;
  pdfUrl: string;
  basePath: string;
  sections: TocSection[];
  links: CatalogLinks;
  /** True when served from Storage (pages skip the Next image optimizer). */
  remote: boolean;
  coverUrl: string;
};

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const REVALIDATE_SECONDS = 60;

function bundledBuild(): CatalogBuild {
  return {
    pages: localManifest.pages,
    pageCount: localManifest.pageCount,
    pdfUrl: "/catalog/catalog.pdf",
    basePath: "/catalog",
    sections: (localNav as CatalogNav).sections,
    links: localLinks as CatalogLinks,
    remote: false,
    coverUrl: "/catalog/page-01.webp",
  };
}

async function getJson<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function getCatalogBuild(slug: string): Promise<CatalogBuild> {
  if (!SUPABASE_URL || !ANON_KEY) return bundledBuild();

  const rows = await getJson<{ current_build: string | null }[]>(
    `${SUPABASE_URL}/rest/v1/catalog_brands?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=current_build&limit=1`,
    { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  );
  const buildId = rows?.[0]?.current_build;
  if (!buildId) return bundledBuild();

  const base = `${SUPABASE_URL}/storage/v1/object/public/catalogs/${slug}/${buildId}`;
  const [manifest, nav, links] = await Promise.all([
    getJson<{ pageCount: number; pages: CatalogPage[] }>(`${base}/manifest.json`),
    getJson<CatalogNav>(`${base}/nav.json`),
    getJson<CatalogLinks>(`${base}/links.json`),
  ]);
  if (!manifest || !nav || !links) return bundledBuild();

  return {
    pages: manifest.pages,
    pageCount: manifest.pageCount,
    pdfUrl: `${base}/catalog.pdf`,
    basePath: base,
    sections: nav.sections,
    links,
    remote: true,
    coverUrl: `${base}/page-01.webp`,
  };
}

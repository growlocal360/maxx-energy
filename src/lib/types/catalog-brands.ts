export type CatalogBuildStatus = "never" | "queued" | "building" | "ok" | "failed";

export interface CatalogBrandColors {
  accent?: string;
  navy?: string;
}

export interface CatalogBrand {
  id: string;
  slug: string;
  custom_domain: string | null;
  display_name: string;
  short_name: string | null;
  legal_name: string | null;
  division_line: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  product_url: string | null;
  box_parts_url: string | null;
  logo_url: string | null;
  mark_url: string | null;
  colors: CatalogBrandColors;
  include_box_parts: boolean;
  published: boolean;
  current_build: string | null;
  last_built_at: string | null;
  build_status: CatalogBuildStatus;
  created_at: string;
  updated_at: string;
}

/** Subdomains the hub uses for itself; a brand slug may not take these. */
export const RESERVED_BRAND_SLUGS = ["www", "render", "api", "admin", "app", "b"];

export const BRAND_SLUG_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

export function slugifyBrand(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 63);
}

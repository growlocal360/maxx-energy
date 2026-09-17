import {
  BRAND_SLUG_PATTERN,
  RESERVED_BRAND_SLUGS,
} from "@/lib/types/catalog-brands";

/** Fields the admin form may write. Build-pointer columns are script-only. */
const EDITABLE_FIELDS = [
  "slug",
  "custom_domain",
  "display_name",
  "short_name",
  "legal_name",
  "division_line",
  "contact_name",
  "contact_email",
  "contact_phone",
  "website_url",
  "product_url",
  "box_parts_url",
  "logo_url",
  "mark_url",
  "colors",
  "include_box_parts",
  "published",
] as const;

const HEX = /^#[0-9a-fA-F]{6}$/;
const HOSTNAME = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

type Result =
  | { ok: true; values: Record<string, unknown> }
  | { ok: false; error: string };

/**
 * Whitelists and validates a catalog-brand payload. `partial` allows PUT
 * bodies that only carry some fields (e.g. the publish toggle).
 */
export function parseCatalogBrandInput(
  body: Record<string, unknown>,
  { partial }: { partial: boolean },
): Result {
  const values: Record<string, unknown> = {};
  for (const key of EDITABLE_FIELDS) {
    if (key in body) values[key] = body[key];
  }

  // Empty strings become null so optional columns stay clean.
  for (const [k, v] of Object.entries(values)) {
    if (typeof v === "string") {
      const trimmed = v.trim();
      values[k] = trimmed === "" ? null : trimmed;
    }
  }

  if (!partial || "slug" in values) {
    const slug = values.slug;
    if (typeof slug !== "string" || !BRAND_SLUG_PATTERN.test(slug) || slug.length > 63) {
      return { ok: false, error: "Subdomain may only use lowercase letters, numbers and hyphens." };
    }
    if (RESERVED_BRAND_SLUGS.includes(slug)) {
      return { ok: false, error: `"${slug}" is reserved. Choose a different subdomain.` };
    }
  }

  if (!partial || "display_name" in values) {
    if (typeof values.display_name !== "string" || !values.display_name) {
      return { ok: false, error: "Display name is required." };
    }
  }

  if (typeof values.custom_domain === "string") {
    const host = values.custom_domain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");
    if (!HOSTNAME.test(host)) {
      return { ok: false, error: "Custom domain must be a hostname like catalog.example.com." };
    }
    values.custom_domain = host;
  }

  for (const key of ["website_url", "product_url", "box_parts_url"] as const) {
    const v = values[key];
    if (typeof v === "string" && !/^https?:\/\//i.test(v)) {
      values[key] = `https://${v}`;
    }
  }

  if ("colors" in values) {
    const c = (values.colors ?? {}) as Record<string, unknown>;
    const clean: Record<string, string> = {};
    for (const key of ["accent", "navy"]) {
      const v = c[key];
      if (typeof v === "string" && v) {
        if (!HEX.test(v)) return { ok: false, error: `Color "${key}" must be a hex value like #00afc7.` };
        clean[key] = v.toLowerCase();
      }
    }
    values.colors = clean;
  }

  return { ok: true, values };
}

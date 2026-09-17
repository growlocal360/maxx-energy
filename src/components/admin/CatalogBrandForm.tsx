"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, Wrench, Globe, Palette } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  BRAND_SLUG_PATTERN,
  RESERVED_BRAND_SLUGS,
  slugifyBrand,
} from "@/lib/types/catalog-brands";
import type { CatalogBrand } from "@/lib/types";

const HUB_DOMAIN = process.env.NEXT_PUBLIC_CATALOG_HUB_DOMAIN || "";

const DEFAULT_ACCENT = "#00afc7";
const DEFAULT_NAVY = "#001029";

export type CatalogBrandFormValues = {
  slug: string;
  custom_domain: string;
  display_name: string;
  short_name: string;
  legal_name: string;
  division_line: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  website_url: string;
  product_url: string;
  box_parts_url: string;
  logo_url: string;
  mark_url: string;
  colors: { accent?: string; navy?: string };
  include_box_parts: boolean;
  published: boolean;
};

export function brandToFormValues(b?: CatalogBrand): CatalogBrandFormValues {
  return {
    slug: b?.slug ?? "",
    custom_domain: b?.custom_domain ?? "",
    display_name: b?.display_name ?? "",
    short_name: b?.short_name ?? "",
    legal_name: b?.legal_name ?? "",
    division_line: b?.division_line ?? "",
    contact_name: b?.contact_name ?? "",
    contact_email: b?.contact_email ?? "",
    contact_phone: b?.contact_phone ?? "",
    website_url: b?.website_url ?? "",
    product_url: b?.product_url ?? "",
    box_parts_url: b?.box_parts_url ?? "",
    logo_url: b?.logo_url ?? "",
    mark_url: b?.mark_url ?? "",
    colors: b?.colors ?? {},
    include_box_parts: b?.include_box_parts ?? false,
    published: b?.published ?? false,
  };
}

const inputClass =
  "w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors";
const labelClass = "block text-sm font-medium text-maxx-200 mb-2";
const hintClass = "text-maxx-400 text-xs mt-1.5";
const cardClass = "bg-maxx-900 border border-maxx-700 rounded-xl p-6 space-y-4";

interface Props {
  initial: CatalogBrandFormValues;
  /** True when editing an existing brand: the subdomain stops auto-following the name. */
  isEdit?: boolean;
  saving: boolean;
  submitLabel: string;
  onSubmit: (values: CatalogBrandFormValues) => void;
  /** Extra sidebar content (build status, delete) supplied by the edit page. */
  sidebarExtra?: React.ReactNode;
}

export default function CatalogBrandForm({
  initial,
  isEdit = false,
  saving,
  submitLabel,
  onSubmit,
  sidebarExtra,
}: Props) {
  const [v, setV] = useState<CatalogBrandFormValues>(initial);
  const [slugTouched, setSlugTouched] = useState(isEdit);

  const set = <K extends keyof CatalogBrandFormValues>(
    key: K,
    value: CatalogBrandFormValues[K],
  ) => setV((prev) => ({ ...prev, [key]: value }));

  const slugError = !v.slug
    ? null
    : !BRAND_SLUG_PATTERN.test(v.slug)
      ? "Lowercase letters, numbers and hyphens only."
      : RESERVED_BRAND_SLUGS.includes(v.slug)
        ? `"${v.slug}" is reserved.`
        : null;

  const isMaxx = isEdit && initial.slug === "maxx";
  const canSubmit = !!v.display_name && !!v.slug && !slugError && !saving;

  const previewHost = v.custom_domain
    ? v.custom_domain
    : `${v.slug || "subdomain"}.${HUB_DOMAIN || "your-catalog-domain.com"}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit(v);
      }}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Naming */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white">Name</h3>
            <div>
              <label className={labelClass}>Display name *</label>
              <input
                type="text"
                value={v.display_name}
                onChange={(e) => {
                  const name = e.target.value;
                  setV((prev) => ({
                    ...prev,
                    display_name: name,
                    slug: slugTouched ? prev.slug : slugifyBrand(name),
                  }));
                }}
                className={inputClass}
                placeholder="Acme Industrial Supply"
                required
              />
              <p className={hintClass}>Shown on the cover, back cover and viewer header.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Short name</label>
                <input type="text" value={v.short_name} onChange={(e) => set("short_name", e.target.value)} className={inputClass} placeholder="Acme" />
                <p className={hintClass}>Used inside sentences. Defaults to the display name.</p>
              </div>
              <div>
                <label className={labelClass}>Legal name</label>
                <input type="text" value={v.legal_name} onChange={(e) => set("legal_name", e.target.value)} className={inputClass} placeholder="Acme Industrial Supply, Inc." />
              </div>
            </div>
            <div>
              <label className={labelClass}>Line under the logo</label>
              <input type="text" value={v.division_line} onChange={(e) => set("division_line", e.target.value)} className={inputClass} placeholder="Spill Response Division" />
              <p className={hintClass}>Optional small caption on the cover and back cover.</p>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-maxx-accent" /> Catalog address
            </h3>
            <div>
              <label className={labelClass}>Subdomain *</label>
              <input
                type="text"
                value={v.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase());
                }}
                disabled={isMaxx}
                className={`${inputClass} font-mono disabled:opacity-60`}
                placeholder="acme"
                required
              />
              {slugError ? (
                <p className="text-red-400 text-xs mt-1.5">{slugError}</p>
              ) : (
                <p className={hintClass}>
                  {isMaxx
                    ? "The MAXX brand feeds the main website catalog; its address is fixed."
                    : "Changing this later changes the catalog's web address and the QR codes printed in it."}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Custom domain</label>
              <input type="text" value={v.custom_domain} onChange={(e) => set("custom_domain", e.target.value)} className={`${inputClass} font-mono`} placeholder="catalog.acmesupply.com" />
              <p className={hintClass}>Optional. The distributor adds a CNAME record and the hostname is added to the hub project before this works.</p>
            </div>
            <div className="rounded-lg bg-maxx-800/60 border border-maxx-700 px-4 py-3">
              <div className="text-maxx-400 text-xs uppercase tracking-wider mb-1">Catalog will live at</div>
              <div className="font-mono text-maxx-accent text-sm break-all">https://{previewHost}</div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white">Contact printed in the catalog</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Contact name</label>
                <input type="text" value={v.contact_name} onChange={(e) => set("contact_name", e.target.value)} className={inputClass} placeholder="Jordan" />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" value={v.contact_email} onChange={(e) => set("contact_email", e.target.value)} className={inputClass} placeholder="jordan@acmesupply.com" required />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="text" value={v.contact_phone} onChange={(e) => set("contact_phone", e.target.value)} className={inputClass} placeholder="555.010.0199" required />
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white">Links and QR codes</h3>
            <div>
              <label className={labelClass}>Website</label>
              <input type="text" value={v.website_url} onChange={(e) => set("website_url", e.target.value)} className={inputClass} placeholder="https://www.acmesupply.com" />
              <p className={hintClass}>Its domain is printed in the page footers.</p>
            </div>
            <div>
              <label className={labelClass}>Spill products page</label>
              <input type="text" value={v.product_url} onChange={(e) => set("product_url", e.target.value)} className={inputClass} placeholder="https://www.acmesupply.com/spill-control" />
              <p className={hintClass}>Target of the cover and back-cover QR codes. Left empty, they point to this catalog&apos;s contact page.</p>
            </div>
            {v.include_box_parts && (
              <div>
                <label className={labelClass}>Box parts page</label>
                <input type="text" value={v.box_parts_url} onChange={(e) => set("box_parts_url", e.target.value)} className={inputClass} placeholder="https://www.acmesupply.com/box-parts" />
              </div>
            )}
          </motion.div>

          {/* Colors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Palette className="h-5 w-5 text-maxx-accent" /> Colors
            </h3>
            <p className="text-maxx-300 text-sm">Optional. Leave off to keep the standard catalog palette.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                ["accent", "Accent", DEFAULT_ACCENT, "Eyebrows, rules, buttons"],
                ["navy", "Dark", DEFAULT_NAVY, "Cover, openers, dark panels"],
              ] as const).map(([key, label, fallback, hint]) => {
                const active = !!v.colors[key];
                return (
                  <div key={key} className="rounded-lg border border-maxx-700 bg-maxx-800/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-maxx-200">{label}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = { ...v.colors };
                          if (active) delete next[key];
                          else next[key] = fallback;
                          set("colors", next);
                        }}
                        className={`text-xs px-2.5 py-1 rounded-full ${active ? "bg-maxx-accent/15 text-maxx-accent" : "bg-maxx-700 text-maxx-300"}`}
                      >
                        {active ? "Custom" : "Default"}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={v.colors[key] ?? fallback}
                        disabled={!active}
                        onChange={(e) => set("colors", { ...v.colors, [key]: e.target.value })}
                        className="h-10 w-14 rounded border border-maxx-700 bg-transparent disabled:opacity-40"
                      />
                      <span className="font-mono text-sm text-maxx-300">{v.colors[key] ?? fallback}</span>
                    </div>
                    <p className={hintClass}>{hint}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={cardClass}>
            <h3 className="text-lg font-semibold text-white">Settings</h3>
            <button type="button" onClick={() => set("published", !v.published)} className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${v.published ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-maxx-800 text-maxx-300 border border-maxx-700"}`}>
              {v.published ? <><Eye className="h-5 w-5" /><span>Published</span></> : <><EyeOff className="h-5 w-5" /><span>Draft</span></>}
            </button>
            <button type="button" onClick={() => set("include_box_parts", !v.include_box_parts)} className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${v.include_box_parts ? "bg-maxx-accent/10 text-maxx-accent border border-maxx-accent/30" : "bg-maxx-800 text-maxx-300 border border-maxx-700"}`}>
              <Wrench className="h-5 w-5" /><span>{v.include_box_parts ? "Box Parts page included" : "No Box Parts page"}</span>
            </button>
            <p className={hintClass}>Only published brands are built and served. The Box Parts sales sheet is for brands that also sell roll-off parts.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
            <ImageUpload
              value={v.logo_url}
              onChange={(url) => set("logo_url", url)}
              folder={`catalog-brands/${v.slug || "new"}`}
              label="Logo"
              fit="contain"
            />
            <p className={hintClass}>Light or white version: it sits on dark photos and navy panels. SVG or transparent PNG.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={cardClass}>
            <ImageUpload
              value={v.mark_url}
              onChange={(url) => set("mark_url", url)}
              folder={`catalog-brands/${v.slug || "new"}`}
              label="Small mark"
              fit="contain"
            />
            <p className={hintClass}>Optional square icon for the black page rail on product pages. Without one, the rail shows no mark.</p>
          </motion.div>

          {sidebarExtra}

          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} type="submit" disabled={!canSubmit} className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none">
            <Save className="h-5 w-5" /><span>{saving ? "Saving..." : submitLabel}</span>
          </motion.button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, ExternalLink, BookOpen, RefreshCw } from "lucide-react";
import type { CatalogBrand, CatalogBuildStatus } from "@/lib/types";

const HUB_DOMAIN = process.env.NEXT_PUBLIC_CATALOG_HUB_DOMAIN || "firstresponsecatalog.com";

const BUILD_BADGE: Record<CatalogBuildStatus, { label: string; className: string }> = {
  never: { label: "Not built", className: "bg-maxx-700 text-maxx-300" },
  queued: { label: "Queued", className: "bg-amber-500/10 text-amber-300" },
  building: { label: "Building", className: "bg-amber-500/10 text-amber-300" },
  ok: { label: "Built", className: "bg-green-500/10 text-green-400" },
  failed: { label: "Build failed", className: "bg-red-500/10 text-red-400" },
};

function brandHost(b: CatalogBrand): string | null {
  if (b.custom_domain) return b.custom_domain;
  if (HUB_DOMAIN) return `${b.slug}.${HUB_DOMAIN}`;
  return null;
}

function formatBuilt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminCatalogBrandsPage() {
  const [brands, setBrands] = useState<CatalogBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [rebuilding, setRebuilding] = useState(false);

  const rebuildAll = async () => {
    if (!confirm("Rebuild every published catalog? This takes a few minutes per brand.")) return;
    setRebuilding(true);
    const response = await fetch("/api/catalog-brands/rebuild", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand: "all" }),
    });
    if (response.ok) fetchBrands();
    else {
      const body = await response.json().catch(() => ({}));
      alert(body.error || "Could not start the rebuild.");
    }
    setRebuilding(false);
  };

  const fetchBrands = async () => {
    const response = await fetch("/api/catalog-brands");
    if (response.ok) {
      setBrands(await response.json());
      setLoadError(null);
    } else {
      const body = await response.json().catch(() => ({}));
      setLoadError(body.error || "Could not load catalog brands.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleDelete = async (brand: CatalogBrand) => {
    if (!confirm(`Delete the "${brand.display_name}" catalog? Its web address will stop working.`)) return;
    setDeleteId(brand.id);
    const response = await fetch(`/api/catalog-brands/${brand.id}`, { method: "DELETE" });
    if (response.ok) setBrands(brands.filter((b) => b.id !== brand.id));
    else {
      const body = await response.json().catch(() => ({}));
      alert(body.error || "Failed to delete brand");
    }
    setDeleteId(null);
  };

  const togglePublish = async (brand: CatalogBrand) => {
    const response = await fetch(`/api/catalog-brands/${brand.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !brand.published }),
    });
    if (response.ok) fetchBrands();
  };

  const filtered = brands.filter((b) => {
    const q = searchQuery.toLowerCase();
    return b.display_name.toLowerCase().includes(q) || b.slug.includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Catalog Brands</h1>
          <p className="text-maxx-300 mt-1">White-label versions of the First Response catalog, one per distributor</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={rebuildAll} disabled={rebuilding} className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-maxx-200 border border-maxx-700 hover:border-maxx-accent/50 hover:text-white transition-colors disabled:opacity-50">
            <RefreshCw className={`h-5 w-5 mr-2 ${rebuilding ? "animate-spin" : ""}`} />Rebuild all
          </button>
          <Link href="/admin/catalog-brands/new" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25">
            <Plus className="h-5 w-5 mr-2" />Add Brand
          </Link>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-maxx-700 bg-maxx-900/60 px-5 py-4 text-sm text-maxx-300 flex gap-3">
        <BookOpen className="h-5 w-5 text-maxx-accent shrink-0 mt-0.5" />
        <p>
          Every brand is built from the same catalog pages. Edits here change the contact page right away;
          the printed pages and PDF update the next time that brand is rebuilt.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input type="text" placeholder="Search brands..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
      </div>

      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : loadError ? (
          <div className="p-8 text-center">
            <p className="text-red-400 mb-2">{loadError}</p>
            <p className="text-maxx-400 text-sm">If this is a new install, run <span className="font-mono">supabase/add-catalog-brands.sql</span> in the Supabase SQL editor first.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No catalog brands found</p>
            <Link href="/admin/catalog-brands/new" className="text-maxx-accent hover:text-maxx-mint">Add your first distributor</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-maxx-700 bg-maxx-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Brand</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Address</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Last built</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-maxx-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((brand, index) => {
                const host = brandHost(brand);
                const badge = BUILD_BADGE[brand.build_status] ?? BUILD_BADGE.never;
                return (
                  <motion.tr key={brand.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-16 rounded bg-maxx-950 border border-maxx-700 flex items-center justify-center overflow-hidden shrink-0">
                          {brand.logo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={brand.logo_url} alt="" className="max-h-8 max-w-14 object-contain" />
                          ) : (
                            <span className="text-[10px] text-maxx-500">no logo</span>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium">{brand.display_name}</div>
                          <div className="text-maxx-400 text-xs">{brand.contact_name || "No contact set"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {host ? (
                        <a href={`https://${host}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-maxx-accent hover:text-maxx-mint">
                          {host}<ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="font-mono text-maxx-300">{brand.slug}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-maxx-300">
                      <div>{formatBuilt(brand.last_built_at)}</div>
                      <span className={`inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${badge.className}`}>{badge.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => togglePublish(brand)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${brand.published ? "bg-green-500/10 text-green-400" : "bg-maxx-700 text-maxx-400"}`}>
                        {brand.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/admin/catalog-brands/${brand.id}/edit`} className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"><Pencil className="h-4 w-4" /></Link>
                        {brand.slug !== "maxx" && (
                          <button onClick={() => handleDelete(brand)} disabled={deleteId === brand.id} className="p-2 text-maxx-300 hover:text-red-400 hover:bg-maxx-800 rounded transition-colors disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

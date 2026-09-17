"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Hammer, RefreshCw } from "lucide-react";
import CatalogBrandForm, {
  brandToFormValues,
  type CatalogBrandFormValues,
} from "@/components/admin/CatalogBrandForm";
import type { CatalogBrand } from "@/lib/types";

const STATUS_LABEL: Record<string, string> = {
  never: "Not built yet",
  queued: "Queued for rebuild",
  building: "Building now",
  ok: "Up to date as of last build",
  failed: "Last build failed — previous version still live",
};

export default function EditCatalogBrandPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [brand, setBrand] = useState<CatalogBrand | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);

  const handleRebuild = async () => {
    if (!brand) return;
    setRebuilding(true);
    const response = await fetch("/api/catalog-brands/rebuild", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand: brand.slug }),
    });
    if (response.ok) setBrand({ ...brand, build_status: "queued" });
    else {
      const error = await response.json().catch(() => ({}));
      alert(error.error || "Could not start the rebuild.");
    }
    setRebuilding(false);
  };

  useEffect(() => {
    const fetchBrand = async () => {
      const response = await fetch(`/api/catalog-brands/${id}`);
      if (response.ok) setBrand(await response.json());
      setLoading(false);
    };
    fetchBrand();
  }, [id]);

  const handleSubmit = async (values: CatalogBrandFormValues) => {
    setSaving(true);
    const response = await fetch(`/api/catalog-brands/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) router.push("/admin/catalog-brands");
    else {
      const error = await response.json().catch(() => ({}));
      alert(error.error || "Failed to save brand");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!brand) return;
    if (!confirm(`Delete the "${brand.display_name}" catalog? Its web address will stop working.`)) return;
    setDeleting(true);
    const response = await fetch(`/api/catalog-brands/${id}`, { method: "DELETE" });
    if (response.ok) router.push("/admin/catalog-brands");
    else {
      const error = await response.json().catch(() => ({}));
      alert(error.error || "Failed to delete brand");
      setDeleting(false);
    }
  };

  if (loading) return <div className="text-maxx-300">Loading...</div>;
  if (!brand) return <div className="text-maxx-300">Brand not found.</div>;

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/catalog-brands" className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{brand.display_name}</h1>
          <p className="text-maxx-300 mt-1">Edit this catalog brand</p>
        </div>
      </div>

      <CatalogBrandForm
        initial={brandToFormValues(brand)}
        isEdit
        saving={saving}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        sidebarExtra={
          <>
            <div className="bg-maxx-900 border border-maxx-700 rounded-xl p-6 space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Hammer className="h-5 w-5 text-maxx-accent" /> Build
              </h3>
              <p className="text-maxx-200 text-sm">{STATUS_LABEL[brand.build_status] ?? brand.build_status}</p>
              <p className="text-maxx-400 text-xs">
                Last built: {brand.last_built_at ? new Date(brand.last_built_at).toLocaleString() : "never"}
              </p>
              <p className="text-maxx-400 text-xs">
                Saved changes appear in the printed pages and PDF after this brand is rebuilt.
              </p>
              <button type="button" onClick={handleRebuild} disabled={rebuilding || !brand.published} className="mt-2 w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-maxx-200 border border-maxx-700 hover:border-maxx-accent/50 hover:text-white transition-colors disabled:opacity-50">
                <RefreshCw className={`h-4 w-4 ${rebuilding ? "animate-spin" : ""}`} />
                <span>{brand.published ? "Rebuild this brand" : "Publish to enable rebuilds"}</span>
              </button>
            </div>
            {brand.slug !== "maxx" && (
              <button type="button" onClick={handleDelete} disabled={deleting} className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors disabled:opacity-50">
                <Trash2 className="h-5 w-5" /><span>{deleting ? "Deleting..." : "Delete Brand"}</span>
              </button>
            )}
          </>
        }
      />
    </div>
  );
}

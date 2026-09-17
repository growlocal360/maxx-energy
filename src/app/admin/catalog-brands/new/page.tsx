"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CatalogBrandForm, {
  brandToFormValues,
  type CatalogBrandFormValues,
} from "@/components/admin/CatalogBrandForm";

export default function NewCatalogBrandPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values: CatalogBrandFormValues) => {
    setSaving(true);
    const response = await fetch("/api/catalog-brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) router.push("/admin/catalog-brands");
    else {
      const error = await response.json().catch(() => ({}));
      alert(error.error || "Failed to create brand");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/catalog-brands" className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-3xl font-bold text-white">New Catalog Brand</h1>
          <p className="text-maxx-300 mt-1">Set up a distributor&apos;s white-label catalog</p>
        </div>
      </div>

      <CatalogBrandForm
        initial={brandToFormValues()}
        saving={saving}
        submitLabel="Save Brand"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

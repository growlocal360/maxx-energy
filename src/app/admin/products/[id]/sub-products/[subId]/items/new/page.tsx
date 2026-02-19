"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import type { Product, SubProduct } from "@/lib/types";

export default function NewProductItemPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const subId = params.subId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [subProduct, setSubProduct] = useState<SubProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [family, setFamily] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [uom, setUom] = useState("");
  const [packing, setPacking] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, subProductRes] = await Promise.all([
        fetch(`/api/products/${productId}`),
        fetch(`/api/products/${productId}/sub-products/${subId}`),
      ]);

      if (productRes.ok) {
        setProduct(await productRes.json());
      }
      if (subProductRes.ok) {
        setSubProduct(await subProductRes.json());
      }
    };

    fetchData();
  }, [productId, subId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!family || !tradeName) return;

    setSaving(true);

    const response = await fetch(
      `/api/products/${productId}/sub-products/${subId}/items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          family,
          trade_name: tradeName,
          uom: uom || null,
          packing: packing || null,
          display_order: displayOrder,
        }),
      }
    );

    if (response.ok) {
      router.push(
        `/admin/products/${productId}/sub-products/${subId}/items`
      );
    } else {
      const error = await response.json();
      alert(error.error || "Failed to create product item");
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href={`/admin/products/${productId}/sub-products/${subId}/items`}
          className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">New Product Item</h1>
          <p className="text-maxx-300 mt-1">
            Add an item to{" "}
            <span className="text-maxx-accent">
              {subProduct?.name || "..."}
            </span>
            {product && (
              <>
                {" "}
                in{" "}
                <span className="text-maxx-accent">{product.name}</span>
              </>
            )}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-sm font-medium text-maxx-200 mb-2">
                Family *
              </label>
              <input
                type="text"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. Acid Corrosion Inhibitor"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <label className="block text-sm font-medium text-maxx-200 mb-2">
                Chemical / Trade Name *
              </label>
              <input
                type="text"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. ACI-120 Medium Temp"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-maxx-200 mb-2">
                Unit of Measure (UOM)
              </label>
              <input
                type="text"
                value={uom}
                onChange={(e) => setUom(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. gal, lb"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className="block text-sm font-medium text-maxx-200 mb-2">
                Packing
              </label>
              <input
                type="text"
                value={packing}
                onChange={(e) => setPacking(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. Totes, Bulk/Totes, Sacks"
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Display Order
              </h3>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="0"
                min={0}
              />
              <p className="text-maxx-400 text-sm mt-2">
                Lower numbers appear first
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              type="submit"
              disabled={saving || !family || !tradeName}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Item"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}

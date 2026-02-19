"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SubProduct, Product, ProductItem } from "@/lib/types";

export default function AdminProductItemsPage() {
  const params = useParams();
  const productId = params.id as string;
  const subId = params.subId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [subProduct, setSubProduct] = useState<SubProduct | null>(null);
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const supabase = createClient();

    const [{ data: productData }, { data: subData }, { data: itemsData }] =
      await Promise.all([
        supabase.from("products").select("*").eq("id", productId).single(),
        supabase.from("sub_products").select("*").eq("id", subId).single(),
        supabase
          .from("product_items")
          .select("*")
          .eq("sub_product_id", subId)
          .order("display_order", { ascending: true }),
      ]);

    setProduct(productData);
    setSubProduct(subData);
    setItems(itemsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [productId, subId]);

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this product item?")) return;

    setDeleteId(itemId);
    const response = await fetch(
      `/api/products/${productId}/sub-products/${subId}/items/${itemId}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      setItems(items.filter((item) => item.id !== itemId));
    }
    setDeleteId(null);
  };

  const filteredItems = items.filter(
    (item) =>
      item.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.trade_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href={`/admin/products/${productId}/sub-products/${subId}/edit`}
            className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Product Items</h1>
            <p className="text-maxx-300 mt-1">
              Manage items for{" "}
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
        <Link
          href={`/admin/products/${productId}/sub-products/${subId}/items/new`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input
          type="text"
          placeholder="Search by family or trade name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
        />
      </div>

      {/* Items List */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No product items found</p>
            <Link
              href={`/admin/products/${productId}/sub-products/${subId}/items/new`}
              className="text-maxx-accent hover:text-maxx-mint"
            >
              Add your first product item
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-maxx-700 bg-maxx-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">
                  Family
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">
                  Chemical / Trade Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">
                  UOM
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">
                  Packing
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">
                  Order
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-maxx-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">
                      {item.family}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">
                    {item.trade_name}
                  </td>
                  <td className="px-6 py-4">
                    {item.uom && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maxx-accent/10 text-maxx-accent">
                        {item.uom}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">
                    {item.packing}
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">
                    {item.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/products/${productId}/sub-products/${subId}/items/${item.id}/edit`}
                        className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteId === item.id}
                        className="p-2 text-maxx-300 hover:text-red-400 hover:bg-maxx-800 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

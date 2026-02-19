"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  ArrowLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SubProduct, Product } from "@/lib/types";

export default function AdminSubProductsPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [subProducts, setSubProducts] = useState<SubProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const supabase = createClient();

    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    setProduct(productData);

    const { data: subData } = await supabase
      .from("sub_products")
      .select("*")
      .eq("product_id", productId)
      .order("display_order", { ascending: true });

    setSubProducts(subData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  const handleDelete = async (subId: string) => {
    if (!confirm("Are you sure you want to delete this sub-product?")) return;

    setDeleteId(subId);
    const response = await fetch(`/api/products/${productId}/sub-products/${subId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setSubProducts(subProducts.filter((sp) => sp.id !== subId));
    }
    setDeleteId(null);
  };

  const togglePublish = async (subProduct: SubProduct) => {
    const response = await fetch(
      `/api/products/${productId}/sub-products/${subProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !subProduct.published }),
      }
    );

    if (response.ok) {
      fetchData();
    }
  };

  const filteredSubProducts = subProducts.filter((sp) =>
    sp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href={`/admin/products/${productId}/edit`}
            className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Sub-Products</h1>
            <p className="text-maxx-300 mt-1">
              Manage sub-products for{" "}
              <span className="text-maxx-accent">{product?.name || "..."}</span>
            </p>
          </div>
        </div>
        <Link
          href={`/admin/products/${productId}/sub-products/new`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Sub-Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input
          type="text"
          placeholder="Search sub-products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
        />
      </div>

      {/* Sub-Products List */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filteredSubProducts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No sub-products found</p>
            <Link
              href={`/admin/products/${productId}/sub-products/new`}
              className="text-maxx-accent hover:text-maxx-mint"
            >
              Add your first sub-product
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-maxx-700 bg-maxx-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Slug</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Order</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-maxx-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubProducts.map((subProduct, index) => (
                <motion.tr
                  key={subProduct.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{subProduct.name}</p>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{subProduct.slug}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(subProduct)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        subProduct.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-maxx-700 text-maxx-400"
                      }`}
                    >
                      {subProduct.published ? (
                        <>
                          <Eye className="h-3 w-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{subProduct.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/products/${productId}/sub-products/${subProduct.id}/edit`}
                        className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(subProduct.id)}
                        disabled={deleteId === subProduct.id}
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

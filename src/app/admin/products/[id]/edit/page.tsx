"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Trash2, Layers } from "lucide-react";
import slugify from "slugify";
import type { Product } from "@/lib/types";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const product: Product = await response.json();
        setName(product.name);
        setSlug(product.slug);
        setTagline(product.tagline || "");
        setDescription(typeof product.description === "string" ? product.description : product.description ? JSON.stringify(product.description) : "");
        setIcon(product.icon || "");
        setHeroImageUrl(product.hero_image_url || "");
        setDisplayOrder(product.display_order);
        setPublished(product.published);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setSaving(true);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        tagline: tagline || null,
        description: description || null,
        icon: icon || null,
        hero_image_url: heroImageUrl || null,
        display_order: displayOrder,
        published,
      }),
    });

    if (response.ok) {
      router.push("/admin/products");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to update product");
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/admin/products");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-maxx-300">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Product</h1>
            <p className="text-maxx-300 mt-1">Update product details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/admin/products/${id}/sub-products`}
            className="inline-flex items-center px-4 py-2 text-maxx-accent hover:text-maxx-mint hover:bg-maxx-accent/10 border border-maxx-accent/30 rounded-lg font-medium transition-colors"
          >
            <Layers className="h-5 w-5 mr-2" />
            Sub-Products
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg font-medium transition-colors"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Product name"
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="product-slug"
                required
              />
              <p className="text-maxx-400 text-sm mt-1">Auto-generated from name. Edit if needed.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Short product tagline"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none"
                placeholder="Product description..."
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Icon</label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Icon name or URL"
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Publish</h3>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  published
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "bg-maxx-800 text-maxx-300 border border-maxx-700"
                }`}
              >
                {published ? (
                  <>
                    <Eye className="h-5 w-5" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-5 w-5" />
                    <span>Draft</span>
                  </>
                )}
              </button>
              <p className="text-maxx-400 text-sm mt-2">
                {published ? "Product will be visible on the website" : "Product will be saved as a draft"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Hero Image</h3>
              <input
                type="url"
                value={heroImageUrl}
                onChange={(e) => setHeroImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Hero image URL"
              />
              {heroImageUrl && (
                <div className="mt-4">
                  <img src={heroImageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-maxx-700" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Display Order</h3>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="0"
                min={0}
              />
              <p className="text-maxx-400 text-sm mt-2">Lower numbers appear first</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              disabled={saving || !name || !slug}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}

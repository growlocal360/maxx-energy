"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Trash2 } from "lucide-react";
import slugify from "slugify";
import type { ShalePlay } from "@/lib/types";

export default function EditShalePlayPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchShalePlay = async () => {
      const response = await fetch(`/api/shale-plays/${id}`);
      if (response.ok) {
        const shalePlay: ShalePlay = await response.json();
        setName(shalePlay.name);
        setSlug(shalePlay.slug);
        setDescription(typeof shalePlay.description === "string" ? shalePlay.description : "");
        setRegion(shalePlay.region || "");
        setHeroImageUrl(shalePlay.hero_image_url || "");
        setLat(shalePlay.lat !== null ? String(shalePlay.lat) : "");
        setLng(shalePlay.lng !== null ? String(shalePlay.lng) : "");
        setDisplayOrder(shalePlay.display_order);
        setPublished(shalePlay.published);
      }
      setLoading(false);
    };

    fetchShalePlay();
  }, [id]);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setSaving(true);

    const response = await fetch(`/api/shale-plays/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        description: description || null,
        region: region || null,
        hero_image_url: heroImageUrl || null,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        display_order: displayOrder,
        published,
      }),
    });

    if (response.ok) {
      router.push("/admin/shale-plays");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to update shale play");
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this shale play?")) return;

    const response = await fetch(`/api/shale-plays/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/admin/shale-plays");
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
            href="/admin/shale-plays"
            className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Shale Play</h1>
            <p className="text-maxx-300 mt-1">Update shale play details</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg font-medium transition-colors"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Delete
        </button>
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
                placeholder="Shale play name"
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
                placeholder="shale-play-slug"
                required
              />
              <p className="text-maxx-400 text-sm mt-1">Auto-generated from name. Edit if needed.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none"
                placeholder="Describe this shale play..."
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Region</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. West Texas, Appalachian Basin"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-semibold text-white mb-4">Coordinates</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-maxx-200 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                    placeholder="31.9686"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-maxx-200 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                    placeholder="-99.9018"
                  />
                </div>
              </div>
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
                {published ? "Shale play will be visible on the website" : "Shale play will be saved as a draft"}
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

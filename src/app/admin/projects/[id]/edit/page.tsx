"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Star, StarOff, Trash2 } from "lucide-react";
import slugify from "slugify";
import type { Project } from "@/lib/types";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [productsUsed, setProductsUsed] = useState("");
  const [market, setMarket] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/projects/${id}`);
      if (response.ok) {
        const project: Project = await response.json();
        setTitle(project.title);
        setSlug(project.slug);
        setClient(project.client);
        setLocation(project.location || "");
        setExcerpt(project.excerpt || "");
        setDescription(
          typeof project.description === "string"
            ? project.description
            : project.description
            ? JSON.stringify(project.description)
            : ""
        );
        setFeaturedImage(project.featured_image || "");
        setProductsUsed((project.products_used || []).join(", "));
        setMarket(project.market || "");
        setFeatured(project.featured);
        setPublished(project.published);
        setPublishedAt(project.published_at);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client) return;

    setSaving(true);

    const productsArray = productsUsed
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const response = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        client,
        location: location || null,
        excerpt: excerpt || null,
        description: description || null,
        featured_image: featuredImage || null,
        products_used: productsArray,
        market: market || null,
        featured,
        published,
        published_at: publishedAt,
      }),
    });

    if (response.ok) {
      router.push("/admin/projects");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to update project");
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/admin/projects");
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
            href="/admin/projects"
            className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Project</h1>
            <p className="text-maxx-300 mt-1">Update project details</p>
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
              <label className="block text-sm font-medium text-maxx-200 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Project title"
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="auto-generated-from-title"
              />
              <p className="text-maxx-400 text-xs mt-1">Auto-generated from title. Edit to customize.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Client *</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Client name"
                required
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Project location"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Excerpt</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Brief summary of the project"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none"
                placeholder="Full project description..."
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Products Used</label>
              <input
                type="text"
                value={productsUsed}
                onChange={(e) => setProductsUsed(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Product A, Product B, Product C"
              />
              <p className="text-maxx-400 text-xs mt-1">Comma-separated list of products</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Market</label>
              <input
                type="text"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="e.g. Oil & Gas, Renewable Energy"
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
                {published ? "Project will be visible on the website" : "Project will be saved as a draft"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Featured</h3>
              <button
                type="button"
                onClick={() => setFeatured(!featured)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  featured
                    ? "bg-maxx-accent/10 text-maxx-accent border border-maxx-accent/30"
                    : "bg-maxx-800 text-maxx-300 border border-maxx-700"
                }`}
              >
                {featured ? (
                  <>
                    <Star className="h-5 w-5" />
                    <span>Featured</span>
                  </>
                ) : (
                  <>
                    <StarOff className="h-5 w-5" />
                    <span>Not Featured</span>
                  </>
                )}
              </button>
              <p className="text-maxx-400 text-sm mt-2">
                {featured ? "Project will be highlighted on the homepage" : "Project will not be featured"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Featured Image</h3>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Image URL"
              />
              {featuredImage && (
                <div className="mt-4">
                  <img src={featuredImage} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-maxx-700" />
                </div>
              )}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              type="submit"
              disabled={saving || !title || !client}
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

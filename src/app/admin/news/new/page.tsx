"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import slugify from "slugify";

export default function NewNewsArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<"news" | "event">("news");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [published, setPublished] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setSaving(true);

    const response = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        type,
        excerpt: excerpt || null,
        content: content || null,
        featured_image: featuredImage || null,
        event_date: type === "event" && eventDate ? eventDate : null,
        event_location: type === "event" && eventLocation ? eventLocation : null,
        published,
      }),
    });

    if (response.ok) {
      router.push("/admin/news");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to create article");
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/admin/news"
          className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">New Article</h1>
          <p className="text-maxx-300 mt-1">Create a new news article or event</p>
        </div>
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
                placeholder="Article title"
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
              <label className="block text-sm font-medium text-maxx-200 mb-2">Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "news" | "event")}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white outline-none transition-colors"
              >
                <option value="news">News</option>
                <option value="event">Event</option>
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Excerpt</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Brief summary of the article"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none"
                placeholder="Full article content..."
              />
            </motion.div>

            {type === "event" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-maxx-200 mb-2">Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maxx-200 mb-2">Event Location</label>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                      placeholder="e.g. Houston, TX"
                    />
                  </div>
                </div>
              </motion.div>
            )}
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
                {published ? "Article will be visible on the website" : "Article will be saved as a draft"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
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
              transition={{ delay: 0.3 }}
              type="submit"
              disabled={saving || !title}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Article"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}

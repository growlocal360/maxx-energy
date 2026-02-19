"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Star,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleteId(id);
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });

    if (response.ok) {
      setProjects(projects.filter((p) => p.id !== id));
    }
    setDeleteId(null);
  };

  const togglePublish = async (project: Project) => {
    const response = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });

    if (response.ok) {
      fetchProjects();
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.market || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-maxx-300 mt-1">Manage your project portfolio</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input
          type="text"
          placeholder="Search projects by title, client, or market..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
        />
      </div>

      {/* Projects List */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No projects found</p>
            <Link href="/admin/projects/new" className="text-maxx-accent hover:text-maxx-mint">
              Add your first project
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-maxx-700 bg-maxx-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Client</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Market</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-maxx-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{project.title}</p>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{project.client}</td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{project.market || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePublish(project)}
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                          project.published
                            ? "bg-green-500/10 text-green-400"
                            : "bg-maxx-700 text-maxx-400"
                        }`}
                      >
                        {project.published ? (
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
                      {project.featured && (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-maxx-accent/10 text-maxx-accent">
                          <Star className="h-3 w-3" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteId === project.id}
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

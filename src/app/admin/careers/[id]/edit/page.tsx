"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Trash2 } from "lucide-react";
import type { JobPosting } from "@/lib/types";

export default function EditJobPostingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`/api/careers/${id}`);
      if (response.ok) {
        const job: JobPosting = await response.json();
        setTitle(job.title);
        setSlug(job.slug);
        setDepartment(job.department || "");
        setLocation(job.location);
        setEmploymentType(job.employment_type);
        // Extract text from JSONB
        const descText = job.description?.content?.[0]?.content?.[0]?.text || "";
        const reqText = job.requirements?.content?.[0]?.content?.[0]?.text || "";
        setDescription(descText);
        setRequirements(reqText);
        setSalaryRange(job.salary_range || "");
        setPublished(job.published);
      }
      setLoading(false);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;
    setSaving(true);

    const descJson = description ? { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: description }] }] } : null;
    const reqJson = requirements ? { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: requirements }] }] } : null;

    const response = await fetch(`/api/careers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, department: department || null, location, employment_type: employmentType, description: descJson, requirements: reqJson, salary_range: salaryRange || null, published }),
    });

    if (response.ok) router.push("/admin/careers");
    else { const error = await response.json(); alert(error.error || "Failed to update"); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    const response = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (response.ok) router.push("/admin/careers");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-maxx-300">Loading...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/careers" className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Job Posting</h1>
            <p className="text-maxx-300 mt-1">Update job details</p>
          </div>
        </div>
        <button onClick={handleDelete} className="inline-flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg font-medium transition-colors">
          <Trash2 className="h-5 w-5 mr-2" />Delete
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Job Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Slug *</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Department</label>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Employment Type</label>
                <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white outline-none transition-colors">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Salary Range</label>
                <input type="text" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Job Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Requirements</label>
              <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={6} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors resize-none" />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-maxx-900 border border-maxx-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Publish</h3>
              <button type="button" onClick={() => setPublished(!published)} className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${published ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-maxx-800 text-maxx-300 border border-maxx-700"}`}>
                {published ? <><Eye className="h-5 w-5" /><span>Published</span></> : <><EyeOff className="h-5 w-5" /><span>Draft</span></>}
              </button>
            </motion.div>

            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} type="submit" disabled={saving || !title || !slug} className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none">
              <Save className="h-5 w-5" /><span>{saving ? "Saving..." : "Save Changes"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}

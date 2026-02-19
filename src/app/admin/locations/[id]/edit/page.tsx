"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Trash2, Star } from "lucide-react";
import type { Location } from "@/lib/types";

export default function EditLocationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isHeadquarters, setIsHeadquarters] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(`/api/locations/${id}`);
      if (response.ok) {
        const loc: Location = await response.json();
        setName(loc.name);
        setAddress(loc.address || "");
        setCity(loc.city);
        setState(loc.state);
        setZip(loc.zip || "");
        setPhone(loc.phone || "");
        setEmail(loc.email || "");
        setIsHeadquarters(loc.is_headquarters);
        setLat(loc.lat ? String(loc.lat) : "");
        setLng(loc.lng ? String(loc.lng) : "");
        setPublished(loc.published);
      }
      setLoading(false);
    };
    fetchLocation();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city || !state) return;
    setSaving(true);

    const response = await fetch(`/api/locations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, address, city, state, zip,
        phone: phone || null, email: email || null,
        is_headquarters: isHeadquarters,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        published,
      }),
    });

    if (response.ok) router.push("/admin/locations");
    else { const error = await response.json(); alert(error.error || "Failed to update"); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    const response = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (response.ok) router.push("/admin/locations");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-maxx-300">Loading...</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/locations" className="p-2 text-maxx-300 hover:text-white hover:bg-maxx-800 rounded-lg transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Location</h1>
            <p className="text-maxx-300 mt-1">Update location details</p>
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
              <label className="block text-sm font-medium text-maxx-200 mb-2">Location Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" required />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <label className="block text-sm font-medium text-maxx-200 mb-2">Street Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">City *</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">State *</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">ZIP</label>
                <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Latitude</label>
                <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-maxx-200 mb-2">Longitude</label>
                <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} className="w-full px-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-maxx-900 border border-maxx-700 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Settings</h3>
              <button type="button" onClick={() => setPublished(!published)} className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${published ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-maxx-800 text-maxx-300 border border-maxx-700"}`}>
                {published ? <><Eye className="h-5 w-5" /><span>Published</span></> : <><EyeOff className="h-5 w-5" /><span>Draft</span></>}
              </button>
              <button type="button" onClick={() => setIsHeadquarters(!isHeadquarters)} className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${isHeadquarters ? "bg-maxx-accent/10 text-maxx-accent border border-maxx-accent/30" : "bg-maxx-800 text-maxx-300 border border-maxx-700"}`}>
                <Star className="h-5 w-5" /><span>{isHeadquarters ? "Headquarters" : "Branch Office"}</span>
              </button>
            </motion.div>

            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} type="submit" disabled={saving || !name || !city || !state} className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none">
              <Save className="h-5 w-5" /><span>{saving ? "Saving..." : "Save Changes"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}

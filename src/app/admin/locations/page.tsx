"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, MapPin, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Location } from "@/lib/types";

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchLocations = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("locations")
      .select("*")
      .order("is_headquarters", { ascending: false })
      .order("name", { ascending: true });
    setLocations(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    setDeleteId(id);
    const response = await fetch(`/api/locations/${id}`, { method: "DELETE" });
    if (response.ok) setLocations(locations.filter((l) => l.id !== id));
    setDeleteId(null);
  };

  const togglePublish = async (loc: Location) => {
    const response = await fetch(`/api/locations/${loc.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !loc.published }),
    });
    if (response.ok) fetchLocations();
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Locations</h1>
          <p className="text-maxx-300 mt-1">Manage office locations</p>
        </div>
        <Link href="/admin/locations/new" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25">
          <Plus className="h-5 w-5 mr-2" />Add Location
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input type="text" placeholder="Search locations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors" />
      </div>

      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filteredLocations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No locations found</p>
            <Link href="/admin/locations/new" className="text-maxx-accent hover:text-maxx-mint">Add your first location</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-maxx-700 bg-maxx-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Address</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Phone</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-maxx-200">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-maxx-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((loc, index) => (
                <motion.tr key={loc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{loc.name}</span>
                      {loc.is_headquarters && <Star className="h-4 w-4 text-maxx-mint fill-maxx-mint" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{loc.city}, {loc.state} {loc.zip}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{loc.phone || "—"}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => togglePublish(loc)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${loc.published ? "bg-green-500/10 text-green-400" : "bg-maxx-700 text-maxx-400"}`}>
                      {loc.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/locations/${loc.id}/edit`} className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"><Pencil className="h-4 w-4" /></Link>
                      <button onClick={() => handleDelete(loc.id)} disabled={deleteId === loc.id} className="p-2 text-maxx-300 hover:text-red-400 hover:bg-maxx-800 rounded transition-colors disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
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

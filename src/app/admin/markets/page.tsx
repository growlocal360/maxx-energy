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
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Market } from "@/lib/types";

export default function AdminMarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMarkets = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("markets")
      .select("*")
      .order("display_order", { ascending: true });

    setMarkets(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this market?")) return;

    setDeleteId(id);
    const response = await fetch(`/api/markets/${id}`, { method: "DELETE" });

    if (response.ok) {
      setMarkets(markets.filter((m) => m.id !== id));
    }
    setDeleteId(null);
  };

  const togglePublish = async (market: Market) => {
    const response = await fetch(`/api/markets/${market.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !market.published }),
    });

    if (response.ok) {
      fetchMarkets();
    }
  };

  const filteredMarkets = markets.filter((market) =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Markets</h1>
          <p className="text-maxx-300 mt-1">Manage your market segments</p>
        </div>
        <Link
          href="/admin/markets/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Market
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input
          type="text"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
        />
      </div>

      {/* Markets List */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filteredMarkets.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-maxx-300 mb-4">No markets found</p>
            <Link href="/admin/markets/new" className="text-maxx-accent hover:text-maxx-mint">
              Add your first market
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
              {filteredMarkets.map((market, index) => (
                <motion.tr
                  key={market.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-maxx-800 hover:bg-maxx-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{market.name}</p>
                  </td>
                  <td className="px-6 py-4 text-maxx-300 text-sm">{market.slug}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(market)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        market.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-maxx-700 text-maxx-400"
                      }`}
                    >
                      {market.published ? (
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
                  <td className="px-6 py-4 text-maxx-300 text-sm">{market.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/markets/${market.id}/edit`}
                        className="p-2 text-maxx-300 hover:text-maxx-accent hover:bg-maxx-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(market.id)}
                        disabled={deleteId === market.id}
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

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Reply,
  Phone,
  Building2,
  ChevronDown,
  ChevronUp,
  Inbox,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ContactSubmission } from "@/lib/types";

type Filter = "all" | "unread" | "read";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchMessages = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const setRead = async (msg: ContactSubmission, read: boolean) => {
    if (msg.read === read) return;
    setBusyId(msg.id);
    const response = await fetch(`/api/contact/${msg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    if (response.ok) {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read } : m))
      );
    }
    setBusyId(null);
  };

  const toggleExpand = (msg: ContactSubmission) => {
    const opening = expandedId !== msg.id;
    setExpandedId(opening ? msg.id : null);
    if (opening && !msg.read) {
      setRead(msg, true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This cannot be undone.")) return;

    setBusyId(id);
    const response = await fetch(`/api/contact/${id}`, { method: "DELETE" });

    if (response.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
    setBusyId(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const filtered = messages.filter((m) => {
    if (filter === "unread" && m.read) return false;
    if (filter === "read" && !m.read) return false;
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.company || "").toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const replyHref = (m: ContactSubmission) =>
    `mailto:${m.email}?subject=${encodeURIComponent(
      "Re: Your message to MAXX Energy Services"
    )}`;

  const filterButton = (value: Filter, label: string, count?: number) => (
    <button
      key={value}
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        filter === value
          ? "bg-maxx-mint/10 text-maxx-mint border border-maxx-mint/30"
          : "text-maxx-300 hover:text-white hover:bg-maxx-800 border border-transparent"
      }`}
    >
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="ml-2 px-2 py-0.5 rounded-full bg-maxx-accent text-maxx-900 text-xs font-bold">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-maxx-300 mt-1">
            Contact form submissions from the website
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {filterButton("all", "All")}
          {filterButton("unread", "Unread", unreadCount)}
          {filterButton("read", "Read")}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
        <input
          type="text"
          placeholder="Search by name, email, company, or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-maxx-900 border border-maxx-700 focus:border-maxx-accent rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
        />
      </div>

      {/* List */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-maxx-300">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="h-10 w-10 text-maxx-600 mx-auto mb-3" />
            <p className="text-maxx-300">
              {messages.length === 0
                ? "No messages yet. Submissions from the contact form will appear here."
                : "No messages match your search."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-maxx-800">
            {filtered.map((msg, index) => {
              const expanded = expandedId === msg.id;
              return (
                <motion.li
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(index, 10) * 0.04 }}
                  className={`transition-colors ${
                    msg.read ? "" : "bg-maxx-accent/[0.04]"
                  } hover:bg-maxx-800/30`}
                >
                  <button
                    onClick={() => toggleExpand(msg)}
                    className="w-full text-left px-6 py-4 flex items-start gap-4"
                  >
                    <span
                      className={`mt-1 p-2 rounded-lg shrink-0 ${
                        msg.read
                          ? "bg-maxx-800 text-maxx-400"
                          : "bg-maxx-accent/10 text-maxx-accent"
                      }`}
                      title={msg.read ? "Read" : "Unread"}
                    >
                      {msg.read ? (
                        <MailOpen className="h-4 w-4" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-3">
                        <span
                          className={`truncate ${
                            msg.read
                              ? "text-maxx-200 font-medium"
                              : "text-white font-semibold"
                          }`}
                        >
                          {msg.name}
                        </span>
                        {msg.company && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-maxx-400 truncate">
                            <Building2 className="h-3 w-3" />
                            {msg.company}
                          </span>
                        )}
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded-full bg-maxx-accent/10 text-maxx-accent text-[10px] font-bold uppercase tracking-wide">
                            New
                          </span>
                        )}
                      </span>
                      <span className="block text-sm text-maxx-400 truncate">
                        {msg.email}
                      </span>
                      {!expanded && (
                        <span className="block text-sm text-maxx-300 truncate mt-1">
                          {msg.message}
                        </span>
                      )}
                    </span>

                    <span className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-maxx-400 whitespace-nowrap">
                        {formatDate(msg.created_at)}
                      </span>
                      {expanded ? (
                        <ChevronUp className="h-4 w-4 text-maxx-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-maxx-400" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[4.5rem]">
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-maxx-300 mb-4">
                            <a
                              href={`mailto:${msg.email}`}
                              className="inline-flex items-center gap-1 hover:text-maxx-mint"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              {msg.email}
                            </a>
                            {msg.phone && (
                              <a
                                href={`tel:${msg.phone}`}
                                className="inline-flex items-center gap-1 hover:text-maxx-mint"
                              >
                                <Phone className="h-3.5 w-3.5" />
                                {msg.phone}
                              </a>
                            )}
                            {msg.company && (
                              <span className="inline-flex items-center gap-1">
                                <Building2 className="h-3.5 w-3.5" />
                                {msg.company}
                              </span>
                            )}
                          </div>

                          <div className="bg-maxx-800/60 border border-maxx-700 rounded-lg p-4 text-maxx-100 whitespace-pre-wrap leading-relaxed mb-4">
                            {msg.message}
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={replyHref(msg)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg text-sm font-semibold transition-all"
                            >
                              <Reply className="h-4 w-4 mr-2" />
                              Reply by Email
                            </a>
                            <button
                              onClick={() => setRead(msg, !msg.read)}
                              disabled={busyId === msg.id}
                              className="inline-flex items-center px-4 py-2 text-maxx-300 hover:text-white hover:bg-maxx-800 border border-maxx-700 rounded-lg text-sm transition-colors disabled:opacity-50"
                            >
                              {msg.read ? (
                                <>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Mark as Unread
                                </>
                              ) : (
                                <>
                                  <MailOpen className="h-4 w-4 mr-2" />
                                  Mark as Read
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(msg.id)}
                              disabled={busyId === msg.id}
                              className="inline-flex items-center px-4 py-2 text-maxx-300 hover:text-red-400 hover:bg-maxx-800 border border-maxx-700 rounded-lg text-sm transition-colors disabled:opacity-50 ml-auto"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

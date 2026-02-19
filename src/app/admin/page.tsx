"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  FolderKanban,
  Factory,
  Map,
  Newspaper,
  Briefcase,
  MapPin,
  Plus,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  teamCount: number;
  productsCount: number;
  projectsCount: number;
  publishedProjectsCount: number;
  marketsCount: number;
  shalePlaysCount: number;
  newsCount: number;
  publishedNewsCount: number;
  jobsCount: number;
  activeJobsCount: number;
  locationsCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    teamCount: 0,
    productsCount: 0,
    projectsCount: 0,
    publishedProjectsCount: 0,
    marketsCount: 0,
    shalePlaysCount: 0,
    newsCount: 0,
    publishedNewsCount: 0,
    jobsCount: 0,
    activeJobsCount: 0,
    locationsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [
        teamResult,
        productsResult,
        projectsResult,
        publishedProjectsResult,
        marketsResult,
        shalePlaysResult,
        newsResult,
        publishedNewsResult,
        jobsResult,
        activeJobsResult,
        locationsResult,
      ] = await Promise.all([
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("markets").select("id", { count: "exact", head: true }),
        supabase.from("shale_plays").select("id", { count: "exact", head: true }),
        supabase.from("news_articles").select("id", { count: "exact", head: true }),
        supabase.from("news_articles").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("job_postings").select("id", { count: "exact", head: true }),
        supabase.from("job_postings").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("locations").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        teamCount: teamResult.count || 0,
        productsCount: productsResult.count || 0,
        projectsCount: projectsResult.count || 0,
        publishedProjectsCount: publishedProjectsResult.count || 0,
        marketsCount: marketsResult.count || 0,
        shalePlaysCount: shalePlaysResult.count || 0,
        newsCount: newsResult.count || 0,
        publishedNewsCount: publishedNewsResult.count || 0,
        jobsCount: jobsResult.count || 0,
        activeJobsCount: activeJobsResult.count || 0,
        locationsCount: locationsResult.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Team Members",
      total: stats.teamCount,
      published: null,
      icon: Users,
      href: "/admin/team",
      newHref: "/admin/team/new",
    },
    {
      title: "Products",
      total: stats.productsCount,
      published: null,
      icon: FlaskConical,
      href: "/admin/products",
      newHref: "/admin/products/new",
    },
    {
      title: "Projects",
      total: stats.projectsCount,
      published: stats.publishedProjectsCount,
      icon: FolderKanban,
      href: "/admin/projects",
      newHref: "/admin/projects/new",
    },
    {
      title: "Markets",
      total: stats.marketsCount,
      published: null,
      icon: Factory,
      href: "/admin/markets",
      newHref: "/admin/markets/new",
    },
    {
      title: "Shale Plays",
      total: stats.shalePlaysCount,
      published: null,
      icon: Map,
      href: "/admin/shale-plays",
      newHref: "/admin/shale-plays/new",
    },
    {
      title: "News & Events",
      total: stats.newsCount,
      published: stats.publishedNewsCount,
      icon: Newspaper,
      href: "/admin/news",
      newHref: "/admin/news/new",
    },
    {
      title: "Job Postings",
      total: stats.jobsCount,
      published: stats.activeJobsCount,
      icon: Briefcase,
      href: "/admin/careers",
      newHref: "/admin/careers/new",
    },
    {
      title: "Locations",
      total: stats.locationsCount,
      published: null,
      icon: MapPin,
      href: "/admin/locations",
      newHref: "/admin/locations/new",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-maxx-300 mt-1">
          Manage your website content from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-maxx-900 border border-maxx-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-maxx-accent/10">
                  <Icon className="h-6 w-6 text-maxx-accent" />
                </div>
                <Link
                  href={card.newHref}
                  className="flex items-center space-x-1 text-sm text-maxx-400 hover:text-maxx-mint transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New</span>
                </Link>
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">
                {card.title}
              </h3>

              {loading ? (
                <div className="h-8 bg-maxx-800 rounded animate-pulse" />
              ) : (
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">
                    {card.total}
                  </span>
                  {card.published !== null && (
                    <span className="text-maxx-400 text-sm">
                      ({card.published} published)
                    </span>
                  )}
                </div>
              )}

              <Link
                href={card.href}
                className="inline-flex items-center text-sm text-maxx-accent hover:text-maxx-mint mt-4 transition-colors"
              >
                Manage
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-maxx-900 border border-maxx-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/team/new"
            className="flex items-center space-x-3 p-4 bg-maxx-800 hover:bg-maxx-700 border border-maxx-700 hover:border-maxx-accent/50 rounded-lg transition-colors"
          >
            <Users className="h-5 w-5 text-maxx-accent" />
            <span className="text-maxx-100">Add Team Member</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center space-x-3 p-4 bg-maxx-800 hover:bg-maxx-700 border border-maxx-700 hover:border-maxx-accent/50 rounded-lg transition-colors"
          >
            <FolderKanban className="h-5 w-5 text-maxx-accent" />
            <span className="text-maxx-100">Add Project</span>
          </Link>
          <Link
            href="/admin/news/new"
            className="flex items-center space-x-3 p-4 bg-maxx-800 hover:bg-maxx-700 border border-maxx-700 hover:border-maxx-accent/50 rounded-lg transition-colors"
          >
            <Newspaper className="h-5 w-5 text-maxx-accent" />
            <span className="text-maxx-100">Create News Article</span>
          </Link>
          <Link
            href="/admin/careers/new"
            className="flex items-center space-x-3 p-4 bg-maxx-800 hover:bg-maxx-700 border border-maxx-700 hover:border-maxx-accent/50 rounded-lg transition-colors"
          >
            <Briefcase className="h-5 w-5 text-maxx-accent" />
            <span className="text-maxx-100">Post New Job</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

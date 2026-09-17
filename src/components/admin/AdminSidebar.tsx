"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FolderKanban,
  Factory,
  Map,
  Newspaper,
  Briefcase,
  MapPin,
  ExternalLink,
  Droplets,
  Inbox,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Team Members",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: FlaskConical,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Markets",
    href: "/admin/markets",
    icon: Factory,
  },
  {
    label: "Shale Plays",
    href: "/admin/shale-plays",
    icon: Map,
  },
  {
    label: "News & Events",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    label: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
  },
  {
    label: "Locations",
    href: "/admin/locations",
    icon: MapPin,
  },
  {
    label: "Catalog Brands",
    href: "/admin/catalog-brands",
    icon: BookOpen,
  },
  {
    label: "Messages",
    href: "/admin/messages",
    icon: Inbox,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const supabase = createClient();
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("contact_submissions")
        .select("id", { count: "exact", head: true })
        .eq("read", false);
      setUnreadCount(count || 0);
    };
    fetchUnread();
    // Refresh whenever the admin navigates (e.g. after reading a message).
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-maxx-900 border-r border-maxx-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-maxx-700">
        <Link href="/admin" className="flex items-center space-x-3">
          <Droplets className="h-8 w-8 text-maxx-mint" />
          <div>
            <span className="text-lg font-bold text-white tracking-tight">MAXX</span>
            <span className="block text-[10px] text-maxx-accent tracking-[0.2em] uppercase">Energy Services</span>
          </div>
        </Link>
        <p className="text-maxx-400 text-xs mt-2">Content Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                active
                  ? "bg-maxx-mint/10 text-maxx-mint border border-maxx-mint/30"
                  : "text-maxx-300 hover:text-white hover:bg-maxx-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/messages" && unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-maxx-accent text-maxx-900 text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-maxx-700">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 text-maxx-400 hover:text-maxx-200 text-sm transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Website</span>
        </Link>
      </div>
    </aside>
  );
}

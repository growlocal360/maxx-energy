import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Newspaper, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { NewsArticle } from "@/lib/types";

export const metadata: Metadata = {
  title: "News & Events | MAXX Energy Services",
  description:
    "Stay up to date with the latest news, industry updates, and events from MAXX Energy Services.",
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("news_articles")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const typedArticles = (articles as NewsArticle[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
            Stay Informed
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            News & Events
          </h1>
          <p className="text-maxx-200 text-lg max-w-2xl mx-auto">
            The latest updates, industry insights, and upcoming events from
            MAXX Energy Services.
          </p>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      {/* Articles List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedArticles.length === 0 ? (
            <div className="text-center py-24">
              <Newspaper className="h-16 w-16 text-maxx-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-maxx-900 mb-3">
                No News Yet
              </h2>
              <p className="text-maxx-500 max-w-md mx-auto">
                We are working on bringing you the latest updates. Check back
                soon for news and event announcements.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group block bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-maxx-50 overflow-hidden">
                    {article.featured_image ? (
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Newspaper className="h-12 w-12 text-maxx-200" />
                      </div>
                    )}
                    {/* Type Badge */}
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${
                        article.type === "event"
                          ? "bg-maxx-mint text-maxx-900"
                          : "bg-maxx-accent/90 text-white"
                      }`}
                    >
                      {article.type === "event" ? "Event" : "News"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center text-maxx-400 text-sm mb-3">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <time>
                        {formatDate(article.published_at)}
                      </time>
                      {article.type === "event" && article.event_date && (
                        <>
                          <span className="mx-2">|</span>
                          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                          <span>Event: {formatDate(article.event_date)}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-maxx-900 mb-2 group-hover:text-maxx-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-maxx-500 text-sm line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="mt-4 inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

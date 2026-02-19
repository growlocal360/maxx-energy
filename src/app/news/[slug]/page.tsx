import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  CalendarDays,
  Tag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ArticleContent from "@/components/editor/ArticleContent";
import type { NewsArticle } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_articles")
    .select("title, excerpt, featured_image")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    return { title: "Article Not Found | MAXX Energy Services" };
  }

  return {
    title: `${data.title} | News | MAXX Energy Services`,
    description: data.excerpt || undefined,
    openGraph: {
      title: `${data.title} | MAXX Energy Services`,
      description: data.excerpt || undefined,
      images: data.featured_image ? [data.featured_image] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) {
    notFound();
  }

  const typedArticle = article as NewsArticle;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center text-maxx-300 hover:text-maxx-mint transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>

          {/* Type Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                typedArticle.type === "event"
                  ? "bg-maxx-mint/20 text-maxx-mint"
                  : "bg-maxx-accent/20 text-maxx-accent"
              }`}
            >
              <Tag className="h-3 w-3 mr-1.5" />
              {typedArticle.type === "event" ? "Event" : "News"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {typedArticle.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-maxx-300 text-sm">
            {typedArticle.published_at && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                <time>{formatDate(typedArticle.published_at)}</time>
              </div>
            )}
            {typedArticle.type === "event" && typedArticle.event_date && (
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                <span>Event Date: {formatDate(typedArticle.event_date)}</span>
              </div>
            )}
            {typedArticle.type === "event" && typedArticle.event_location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>{typedArticle.event_location}</span>
              </div>
            )}
          </div>
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

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Event Details Banner */}
          {typedArticle.type === "event" &&
            (typedArticle.event_date || typedArticle.event_location) && (
              <div className="bg-maxx-50 border border-maxx-100 rounded-2xl p-6 mb-10">
                <h3 className="text-sm font-semibold text-maxx-accent uppercase tracking-wider mb-3">
                  Event Details
                </h3>
                <div className="flex flex-wrap gap-6">
                  {typedArticle.event_date && (
                    <div className="flex items-center text-maxx-700">
                      <CalendarDays className="h-5 w-5 text-maxx-accent mr-2" />
                      <span className="font-medium">
                        {formatDate(typedArticle.event_date)}
                      </span>
                    </div>
                  )}
                  {typedArticle.event_location && (
                    <div className="flex items-center text-maxx-700">
                      <MapPin className="h-5 w-5 text-maxx-accent mr-2" />
                      <span className="font-medium">
                        {typedArticle.event_location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* Featured Image */}
          {typedArticle.featured_image && (
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-10">
              <Image
                src={typedArticle.featured_image}
                alt={typedArticle.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          {typedArticle.content && (
            <div className="prose prose-lg max-w-none prose-headings:text-maxx-900 prose-p:text-maxx-700 prose-strong:text-maxx-900 prose-a:text-maxx-accent hover:prose-a:text-maxx-mint">
              <ArticleContent content={typedArticle.content} />
            </div>
          )}

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-maxx-100">
            <Link
              href="/news"
              className="inline-flex items-center text-maxx-accent hover:text-maxx-mint font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News & Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

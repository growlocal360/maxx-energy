import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  Send,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ArticleContent from "@/components/editor/ArticleContent";
import type { JobPosting } from "@/lib/types";

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
    .from("job_postings")
    .select("title, location, employment_type")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    return { title: "Job Not Found | MAXX Energy Services" };
  }

  return {
    title: `${data.title} | Careers | MAXX Energy Services`,
    description: `${data.title} - ${data.employment_type} position in ${data.location} at MAXX Energy Services.`,
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("job_postings")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!job) {
    notFound();
  }

  const typedJob = job as JobPosting;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center text-maxx-300 hover:text-maxx-mint transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {typedJob.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-maxx-300 text-sm">
            {typedJob.department && (
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1.5" />
                <span>{typedJob.department}</span>
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{typedJob.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5" />
              <span>{typedJob.employment_type}</span>
            </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              {typedJob.description && (
                <div>
                  <h2 className="text-2xl font-bold text-maxx-900 mb-6">
                    Job Description
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-maxx-900 prose-p:text-maxx-700 prose-strong:text-maxx-900 prose-a:text-maxx-accent hover:prose-a:text-maxx-mint prose-li:text-maxx-700">
                    <ArticleContent content={typedJob.description} />
                  </div>
                </div>
              )}

              {/* Requirements */}
              {typedJob.requirements && (
                <div>
                  <h2 className="text-2xl font-bold text-maxx-900 mb-6">
                    Requirements
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-maxx-900 prose-p:text-maxx-700 prose-strong:text-maxx-900 prose-a:text-maxx-accent hover:prose-a:text-maxx-mint prose-li:text-maxx-700">
                    <ArticleContent content={typedJob.requirements} />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Job Info */}
                <div className="bg-maxx-50 rounded-2xl p-6 space-y-5">
                  <h3 className="text-lg font-bold text-maxx-900">
                    Job Details
                  </h3>

                  {typedJob.department && (
                    <div className="flex items-start space-x-3">
                      <Briefcase className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Department
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {typedJob.department}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                        Location
                      </p>
                      <p className="text-maxx-900 font-semibold">
                        {typedJob.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                        Employment Type
                      </p>
                      <p className="text-maxx-900 font-semibold">
                        {typedJob.employment_type}
                      </p>
                    </div>
                  </div>

                  {typedJob.salary_range && (
                    <div className="flex items-start space-x-3">
                      <DollarSign className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Salary Range
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {typedJob.salary_range}
                        </p>
                      </div>
                    </div>
                  )}

                  {typedJob.published_at && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Posted
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {formatDate(typedJob.published_at)}
                        </p>
                      </div>
                    </div>
                  )}

                  {typedJob.expires_at && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Expires
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {formatDate(typedJob.expires_at)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply CTA */}
                <div className="bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-bold text-maxx-900 mb-2">
                    Interested in this role?
                  </h3>
                  <p className="text-maxx-900/70 text-sm mb-4">
                    Send us your resume and cover letter to get started.
                  </p>
                  <a
                    href={`mailto:careers@maxxenergy.com?subject=Application: ${typedJob.title}`}
                    className="inline-flex items-center px-6 py-3 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-maxx-100">
            <Link
              href="/careers"
              className="inline-flex items-center text-maxx-accent hover:text-maxx-mint font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              View All Open Positions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

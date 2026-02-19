import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { JobPosting } from "@/lib/types";

export const metadata: Metadata = {
  title: "Careers | MAXX Energy Services",
  description:
    "Join the MAXX Energy Services team. Explore career opportunities in chemical supply, containment, and distribution across the energy sector.",
};

export default async function CareersPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const typedJobs = (jobs as JobPosting[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
            Career Opportunities
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-maxx-200 text-lg max-w-2xl mx-auto">
            Build your career with an industry leader in chemical supply,
            distribution, and containment. We are always looking for talented
            individuals who share our commitment to reliability and excellence.
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

      {/* Job Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedJobs.length === 0 ? (
            <div className="text-center py-24">
              <Users className="h-16 w-16 text-maxx-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-maxx-900 mb-3">
                No Open Positions Right Now
              </h2>
              <p className="text-maxx-500 max-w-md mx-auto mb-8">
                We do not have any open positions at the moment, but we are
                always growing. Check back later or reach out to us directly.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-900 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-maxx-accent/25"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-maxx-500 mb-2">
                {typedJobs.length} open position{typedJobs.length !== 1 && "s"}
              </p>

              {typedJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.slug}`}
                  className="group block bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-maxx-500">
                        {job.department && (
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1.5 text-maxx-accent" />
                            <span>{job.department}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1.5 text-maxx-accent" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5 text-maxx-accent" />
                          <span>{job.employment_type}</span>
                        </div>
                        {job.salary_range && (
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1.5 text-maxx-accent" />
                            <span>{job.salary_range}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
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

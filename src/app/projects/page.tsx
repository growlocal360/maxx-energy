import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Droplets, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our Projects | MAXX Energy Services",
  description:
    "Explore our portfolio of chemical supply, containment, and distribution projects across the energy, agriculture, and municipal sectors.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  const typedProjects = (projects as Project[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
            Our Work
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Projects
          </h1>
          <p className="text-maxx-200 text-lg max-w-2xl mx-auto">
            Delivering reliable chemical supply, distribution, and containment
            solutions across major energy basins and industries nationwide.
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

      {/* Projects Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedProjects.length === 0 ? (
            <div className="text-center py-24">
              <Droplets className="h-16 w-16 text-maxx-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-maxx-900 mb-3">
                Projects Coming Soon
              </h2>
              <p className="text-maxx-500 max-w-md mx-auto">
                We are preparing our project showcase. Check back soon to see
                our work in action.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-maxx-50 overflow-hidden">
                    {project.featured_image ? (
                      <Image
                        src={project.featured_image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Droplets className="h-12 w-12 text-maxx-200" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-maxx-mint text-maxx-900 text-xs font-bold rounded-full">
                        Featured
                      </div>
                    )}
                    {project.market && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-maxx-accent/90 text-white text-xs font-bold rounded-full">
                        {project.market}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-maxx-900 mb-2 group-hover:text-maxx-accent transition-colors">
                      {project.title}
                    </h3>

                    <div className="flex items-center text-maxx-500 text-sm mb-3">
                      <span className="font-medium">{project.client}</span>
                      {project.location && (
                        <>
                          <span className="mx-2">|</span>
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>{project.location}</span>
                        </>
                      )}
                    </div>

                    <p className="text-maxx-500 text-sm line-clamp-2">
                      {project.excerpt}
                    </p>

                    <div className="mt-4 inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                      View Project
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

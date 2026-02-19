"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Droplets } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      setProjects(data || []);
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-maxx-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-maxx-900"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center text-maxx-accent hover:text-maxx-mint font-semibold transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
              >
                {/* Image */}
                <div className="relative h-48 bg-maxx-50 overflow-hidden">
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
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{project.location}</span>
                      </>
                    )}
                  </div>

                  <p className="text-maxx-500 text-sm line-clamp-2">
                    {project.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-maxx-accent hover:text-maxx-mint font-semibold transition-colors"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, Tag, Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ArticleContent from "@/components/editor/ArticleContent";
import type { Project, ProjectImage } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("title, excerpt, featured_image")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    return { title: "Project Not Found | MAXX Energy Services" };
  }

  return {
    title: `${data.title} | Projects | MAXX Energy Services`,
    description: data.excerpt,
    openGraph: {
      title: `${data.title} | MAXX Energy Services`,
      description: data.excerpt,
      images: data.featured_image ? [data.featured_image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) {
    notFound();
  }

  const typedProject = project as Project;

  const { data: images } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", typedProject.id)
    .order("display_order", { ascending: true });

  const typedImages = (images as ProjectImage[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-maxx-300 hover:text-maxx-mint transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {typedProject.title}
          </h1>
          <p className="text-maxx-200 text-lg max-w-3xl">
            {typedProject.excerpt}
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

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {typedProject.featured_image && (
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10">
                  <Image
                    src={typedProject.featured_image}
                    alt={typedProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Description */}
              {typedProject.description && (
                <div className="prose prose-lg max-w-none prose-headings:text-maxx-900 prose-p:text-maxx-700 prose-strong:text-maxx-900 prose-a:text-maxx-accent hover:prose-a:text-maxx-mint">
                  <ArticleContent content={typedProject.description} />
                </div>
              )}

              {/* Image Gallery */}
              {typedImages.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-maxx-900 mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {typedImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                      >
                        <Image
                          src={image.image_url}
                          alt={image.caption || typedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {image.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maxx-950/80 to-transparent p-4">
                            <p className="text-white text-sm">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-maxx-50 rounded-2xl p-6 space-y-5">
                  <h3 className="text-lg font-bold text-maxx-900">
                    Project Details
                  </h3>

                  <div className="flex items-start space-x-3">
                    <Briefcase className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                        Client
                      </p>
                      <p className="text-maxx-900 font-semibold">
                        {typedProject.client}
                      </p>
                    </div>
                  </div>

                  {typedProject.location && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Location
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {typedProject.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {typedProject.market && (
                    <div className="flex items-start space-x-3">
                      <Tag className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                          Market
                        </p>
                        <p className="text-maxx-900 font-semibold">
                          {typedProject.market}
                        </p>
                      </div>
                    </div>
                  )}

                  {typedProject.products_used &&
                    typedProject.products_used.length > 0 && (
                      <div className="flex items-start space-x-3">
                        <Layers className="h-5 w-5 text-maxx-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-maxx-500 uppercase tracking-wider font-medium">
                            Products Used
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {typedProject.products_used.map((product) => (
                              <span
                                key={product}
                                className="px-3 py-1 bg-maxx-accent/10 text-maxx-accent text-xs font-medium rounded-full"
                              >
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-2xl p-6 text-center">
                  <h3 className="text-lg font-bold text-maxx-900 mb-2">
                    Have a Similar Project?
                  </h3>
                  <p className="text-maxx-900/70 text-sm mb-4">
                    Let us help you find the right chemical and containment
                    solutions.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

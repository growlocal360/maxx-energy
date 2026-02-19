import { Metadata } from "next";
import Image from "next/image";
import { MapPin, Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ShalePlay } from "@/lib/types";
import type { JSONContent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Strategic Shale Plays | MAXX Energy Services",
  description:
    "MAXX Energy Services operates across major shale plays and energy basins nationwide, delivering reliable chemical supply and containment where you need it.",
};

function extractExcerpt(content: JSONContent | null): string {
  if (!content || !content.content) return "";
  for (const node of content.content) {
    if (node.type === "paragraph" && node.content) {
      const text = node.content
        .filter((child) => child.text)
        .map((child) => child.text)
        .join("");
      if (text) {
        return text.length > 160 ? text.slice(0, 157) + "..." : text;
      }
    }
  }
  return "";
}

export default async function ShalePlaysPage() {
  const supabase = await createClient();
  const { data: shalePlays } = await supabase
    .from("shale_plays")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const typedShalePlays = (shalePlays as ShalePlay[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 pt-32 pb-24">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
            Nationwide Coverage
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Strategic Shale Plays
          </h1>
          <p className="text-maxx-200 text-lg max-w-2xl mx-auto">
            Strategically positioned across major US energy basins to deliver
            reliable chemical supply, distribution, and containment solutions
            wherever your operations take you.
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

      {/* Shale Plays Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedShalePlays.length === 0 ? (
            <div className="text-center py-24">
              <Globe className="h-16 w-16 text-maxx-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-maxx-900 mb-3">
                Shale Plays Coming Soon
              </h2>
              <p className="text-maxx-500 max-w-md mx-auto">
                We are preparing detailed information about our coverage areas.
                Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {typedShalePlays.map((play) => {
                const excerpt = extractExcerpt(play.description);

                return (
                  <div
                    key={play.id}
                    className="group relative bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                  >
                    {/* Hero Image or Gradient */}
                    <div className="relative h-56 overflow-hidden">
                      {play.hero_image_url ? (
                        <Image
                          src={play.hero_image_url}
                          alt={play.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-maxx-900 to-maxx-800">
                          <div className="absolute inset-0 grid-pattern opacity-30" />
                        </div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-maxx-950/80 via-maxx-950/30 to-transparent" />

                      {/* Content over image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {play.name}
                        </h3>
                        {play.region && (
                          <div className="flex items-center text-maxx-mint text-sm">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            <span>{play.region}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-6">
                      {excerpt ? (
                        <p className="text-maxx-600 text-sm leading-relaxed">
                          {excerpt}
                        </p>
                      ) : (
                        <p className="text-maxx-400 text-sm italic">
                          Serving energy operations in the{" "}
                          {play.region || play.name} region with reliable
                          chemical supply and containment solutions.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-maxx-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-4">
            Operating in One of These Basins?
          </h2>
          <p className="text-maxx-500 text-lg mb-8 max-w-2xl mx-auto">
            Reach out to our team to learn how MAXX Energy Services can support
            your operations with reliable chemical supply and containment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-900 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-maxx-accent/25"
            >
              Get In Touch
            </a>
            <a
              href="tel:1-833-777-6299"
              className="inline-flex items-center px-8 py-4 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-semibold transition-colors"
            >
              Call 1-833-777-MAXX
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

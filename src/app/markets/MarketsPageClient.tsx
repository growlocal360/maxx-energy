"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Fuel,
  Wheat,
  Zap,
  Factory,
  Droplets,
  Mountain,
  Building2,
  Truck,
  Waves,
  Globe,
} from "lucide-react";
import type { Market, JSONContent } from "@/lib/types";

// Map known market slugs to Lucide icons
function getMarketIcon(slug: string) {
  switch (slug) {
    case "oil-and-gas":
      return Fuel;
    case "agriculture":
      return Wheat;
    case "energy-recovery":
      return Zap;
    case "industrial":
      return Factory;
    case "municipal-water":
      return Droplets;
    case "mining":
      return Mountain;
    case "construction":
      return Building2;
    case "transportation":
      return Truck;
    case "water-management":
      return Waves;
    default:
      return Globe;
  }
}

// Extract a plain text excerpt from TipTap JSONContent
function extractExcerpt(content: JSONContent | null, maxLength = 120): string {
  if (!content || !content.content) return "";

  let text = "";

  function walk(nodes: JSONContent[]) {
    for (const node of nodes) {
      if (node.text) {
        text += node.text;
      }
      if (node.content) {
        walk(node.content);
      }
    }
  }

  walk(content.content);

  if (text.length > maxLength) {
    return text.slice(0, maxLength).trimEnd() + "...";
  }
  return text;
}

interface MarketsPageClientProps {
  markets: Market[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MarketsPageClient({ markets }: MarketsPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Industries & Sectors
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Markets We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-maxx-200 max-w-3xl mx-auto leading-relaxed"
          >
            Delivering reliable chemical supply, distribution, and containment
            solutions across diverse market sectors nationwide.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-20"
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {markets.length === 0 ? (
            <div className="text-center py-16">
              <Globe className="h-16 w-16 text-maxx-300 mx-auto mb-4" />
              <p className="text-maxx-600 text-lg">
                Market information coming soon. Check back for updates.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {markets.map((market) => {
                const Icon = getMarketIcon(market.slug);
                const excerpt = extractExcerpt(market.description);

                return (
                  <motion.div key={market.id} variants={cardVariants}>
                    <Link
                      href={`/markets/${market.slug}`}
                      className="group block h-full bg-maxx-50 border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                    >
                      {/* Card Image or Icon Header */}
                      {market.hero_image_url ? (
                        <div className="relative h-48 overflow-hidden bg-maxx-100">
                          <img
                            src={market.hero_image_url}
                            alt={market.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-maxx-900/60 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <div className="p-2 bg-maxx-accent/20 backdrop-blur-sm rounded-lg">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 pb-0">
                          <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl group-hover:bg-maxx-accent/20 transition-colors">
                            <Icon className="h-10 w-10 text-maxx-accent" />
                          </div>
                        </div>
                      )}

                      <div className="p-8">
                        <h3 className="text-xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                          {market.name}
                        </h3>

                        {excerpt && (
                          <p className="text-maxx-600 text-sm leading-relaxed mb-6">
                            {excerpt}
                          </p>
                        )}

                        <span className="inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-2xl p-10 sm:p-14">
              <h3 className="text-2xl sm:text-3xl font-bold text-maxx-900 mb-4">
                Don&apos;t See Your Industry?
              </h3>
              <p className="text-maxx-900/70 text-lg max-w-2xl mx-auto mb-8">
                We serve a wide range of markets with customized chemical and
                containment solutions. Contact us to discuss your specific
                requirements.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-bold transition-all shadow-lg"
              >
                <span>Get In Touch</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

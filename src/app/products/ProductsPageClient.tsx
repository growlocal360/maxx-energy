"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FlaskConical,
  Shield,
  Package,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/lib/types";

// Map product slugs to icons — fallback to Package
function getProductIcon(slug: string) {
  switch (slug) {
    case "chemical-solutions":
      return FlaskConical;
    case "containment-solutions":
      return Shield;
    default:
      return Package;
  }
}

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({
  products,
}: ProductsPageClientProps) {
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
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-maxx-200 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive chemical and containment solutions built for
            reliability. From specialty oilfield chemistries to engineered spill
            containment systems, MAXX delivers products that perform.
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

      {/* Products Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-maxx-300 mx-auto mb-4" />
              <p className="text-maxx-600 text-lg">
                Products coming soon. Check back for our full catalog.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {products.map((product, index) => {
                const Icon = getProductIcon(product.slug);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block bg-maxx-50 border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        {/* Icon & Title */}
                        <div className="flex-1">
                          <div className="p-4 bg-maxx-accent/10 rounded-xl w-fit mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                            <Icon className="h-10 w-10 text-maxx-accent" />
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                            {product.name}
                          </h2>

                          <p className="text-maxx-600 text-lg leading-relaxed mb-6 max-w-2xl">
                            {product.tagline}
                          </p>

                          <span className="inline-flex items-center text-maxx-accent font-semibold group-hover:text-maxx-mint transition-colors">
                            View All {product.name}
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>

                        {/* Sub-Products List */}
                        {product.sub_products &&
                          product.sub_products.length > 0 && (
                            <div className="lg:w-80 flex-shrink-0">
                              <p className="text-xs font-semibold text-maxx-accent tracking-wider uppercase mb-4">
                                Includes
                              </p>
                              <ul className="space-y-2">
                                {product.sub_products.map((sub) => (
                                  <li
                                    key={sub.id}
                                    className="flex items-center text-sm text-maxx-700"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-maxx-mint mr-3 flex-shrink-0" />
                                    {sub.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-2xl p-10 sm:p-14">
              <h3 className="text-2xl sm:text-3xl font-bold text-maxx-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-maxx-900/70 text-lg max-w-2xl mx-auto mb-8">
                Our team of chemical engineers and product specialists can
                develop tailored solutions for your specific operational needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-bold transition-all shadow-lg"
              >
                <span>Contact Our Team</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

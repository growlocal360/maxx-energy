"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Shield,
  Package,
} from "lucide-react";
import type { Product } from "@/lib/types";
import RichTextContent from "@/components/RichTextContent";

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

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const Icon = getProductIcon(product.slug);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/products"
              className="inline-flex items-center text-maxx-300 hover:text-maxx-accent transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </motion.div>

          <div className="flex items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 bg-maxx-accent/10 border border-maxx-accent/20 rounded-xl hidden sm:block"
            >
              <Icon className="h-10 w-10 text-maxx-accent" />
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {product.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-maxx-200 max-w-3xl leading-relaxed"
              >
                {product.tagline}
              </motion.p>
            </div>
          </div>
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

      {/* Product Description */}
      {product.description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <RichTextContent content={product.description} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Sub-Products Grid */}
      {product.sub_products && product.sub_products.length > 0 && (
        <section className="py-20 bg-maxx-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
                Product Lineup
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900">
                {product.name} Products
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.sub_products.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-maxx-accent/10"
                >
                  {sub.image_url && (
                    <div className="mb-6 rounded-xl overflow-hidden bg-maxx-50">
                      <img
                        src={sub.image_url}
                        alt={sub.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="w-2 h-2 rounded-full bg-maxx-mint mb-4" />

                  <h3 className="text-lg font-bold text-maxx-900 mb-2 group-hover:text-maxx-accent transition-colors">
                    {sub.name}
                  </h3>

                  {sub.description && (
                    <div className="text-sm text-maxx-600 leading-relaxed">
                      <RichTextContent content={sub.description} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Navigation & CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/products"
              className="inline-flex items-center text-maxx-600 hover:text-maxx-accent transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Products
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-900 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-maxx-accent/25"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

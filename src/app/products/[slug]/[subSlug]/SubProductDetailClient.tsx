"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, X } from "lucide-react";
import type { Product, SubProduct, ProductItem } from "@/lib/types";
import RichTextContent from "@/components/RichTextContent";

interface SubProductDetailClientProps {
  product: Product;
  subProduct: SubProduct;
  items: ProductItem[];
}

export default function SubProductDetailClient({
  product,
  subProduct,
  items,
}: SubProductDetailClientProps) {
  const hasImages = items.some((item) => item.image_url);
  const [lightboxItem, setLightboxItem] = useState<ProductItem | null>(null);

  const itemsWithImages = items.filter((item) => item.image_url);
  const currentIndex = lightboxItem
    ? itemsWithImages.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  function goToNext() {
    if (currentIndex < itemsWithImages.length - 1) {
      setLightboxItem(itemsWithImages[currentIndex + 1]);
    }
  }

  function goToPrev() {
    if (currentIndex > 0) {
      setLightboxItem(itemsWithImages[currentIndex - 1]);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center text-sm text-maxx-300 mb-8 flex-wrap gap-1"
          >
            <Link
              href="/products"
              className="hover:text-maxx-accent transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              href={`/products/${product.slug}`}
              className="hover:text-maxx-accent transition-colors"
            >
              {product.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-white font-medium">{subProduct.name}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {subProduct.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-maxx-200 max-w-3xl"
          >
            Part of the{" "}
            <span className="text-maxx-accent font-medium">
              {product.name}
            </span>{" "}
            product line
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

      {/* Description */}
      {subProduct.description && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <RichTextContent content={subProduct.description} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Items Table */}
      {items.length > 0 && (
        <section className="py-16 bg-maxx-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
                Product Catalog
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900">
                {subProduct.name}
              </h2>
              <p className="text-maxx-600 mt-2">
                {items.length} product{items.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-maxx-100 shadow-sm overflow-hidden"
            >
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-maxx-900 text-white">
                      {hasImages && (
                        <th className="w-20 px-4 py-4 text-sm font-semibold" />
                      )}
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        Family
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold">
                        Chemical / Trade Name
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-semibold">
                        UOM
                      </th>
                      <th className="text-center px-6 py-4 text-sm font-semibold">
                        Packing
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-maxx-50 transition-colors hover:bg-maxx-50/50 ${
                          index % 2 === 0 ? "bg-white" : "bg-maxx-50/30"
                        }`}
                      >
                        {hasImages && (
                          <td className="px-4 py-3">
                            {item.image_url ? (
                              <button
                                onClick={() => setLightboxItem(item)}
                                className="w-14 h-14 relative rounded-lg overflow-hidden bg-maxx-50 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-maxx-accent transition-all"
                              >
                                <Image
                                  src={item.image_url}
                                  alt={item.trade_name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="56px"
                                />
                              </button>
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-maxx-50" />
                            )}
                          </td>
                        )}
                        <td className="px-6 py-4 text-maxx-900 font-medium text-sm">
                          {item.family}
                        </td>
                        <td className="px-6 py-4 text-maxx-700 text-sm">
                          {item.trade_name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.uom && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maxx-accent/10 text-maxx-accent">
                              {item.uom}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.packing && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maxx-100 text-maxx-700">
                              {item.packing}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-maxx-100">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    {hasImages && item.image_url && (
                      <button
                        onClick={() => setLightboxItem(item)}
                        className="w-16 h-16 relative rounded-lg overflow-hidden bg-maxx-50 flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-maxx-accent transition-all"
                      >
                        <Image
                          src={item.image_url}
                          alt={item.trade_name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      </button>
                    )}
                    <div className="space-y-1.5 min-w-0">
                      <p className="text-maxx-900 font-medium text-sm">
                        {item.family}
                      </p>
                      <p className="text-maxx-600 text-sm">{item.trade_name}</p>
                      <div className="flex items-center gap-2">
                        {item.uom && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maxx-accent/10 text-maxx-accent">
                            {item.uom}
                          </span>
                        )}
                        {item.packing && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-maxx-100 text-maxx-700">
                            {item.packing}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back Navigation & CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center text-maxx-600 hover:text-maxx-accent transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {product.name}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && lightboxItem.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxItem(null)}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              >
                <ArrowLeft className="h-8 w-8" />
              </button>
            )}

            {currentIndex < itemsWithImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              >
                <ArrowRight className="h-8 w-8" />
              </button>
            )}

            <motion.div
              key={lightboxItem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg aspect-square bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxItem.image_url}
                alt={lightboxItem.trade_name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </motion.div>

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white font-semibold text-lg">
                {lightboxItem.trade_name}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {currentIndex + 1} of {itemsWithImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

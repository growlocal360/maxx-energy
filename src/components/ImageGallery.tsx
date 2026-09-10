"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
  title?: string;
}

/** Responsive photo grid with a click-to-enlarge lightbox. */
export default function ImageGallery({
  images,
  eyebrow,
  title,
}: ImageGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const current = index !== null ? images[index] : null;

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(eyebrow || title) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              {eyebrow && (
                <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900">
                  {title}
                </h2>
              )}
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {images.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-maxx-50 border border-maxx-100 hover:border-maxx-accent/40 hover:shadow-lg hover:shadow-maxx-accent/10 transition-all cursor-zoom-in"
                aria-label={`Enlarge: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setIndex(null)}
          >
            <button
              onClick={() => setIndex(null)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>

            {index > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setIndex(index - 1); }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ArrowLeft className="h-8 w-8" />
              </button>
            )}

            {index < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setIndex(index + 1); }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <ArrowRight className="h-8 w-8" />
              </button>
            )}

            <motion.div
              key={current.src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </motion.div>

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-white font-semibold text-lg">{current.alt}</p>
              <p className="text-white/60 text-sm mt-1">
                {index + 1} of {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

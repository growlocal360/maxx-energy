"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const row1 = [
  "/gallery/Resized_IMG_7648.jpeg",
  "/gallery/block-dust-debris-for-equipment-wall-systems.jpg",
  "/gallery/containment-berm-valves.jpg",
  "/gallery/image5.jpeg",
  "/gallery/conveyor-belt-cover.jpg",
  "/gallery/dust-debris-containment-systems.jpg",
  "/gallery/industrial-oilfield-debris-containment-wall-systems.jpg",
  "/gallery/large-format-liners-and-containment-berms.jpg",
  "/gallery/pond-liner-solutions.jpg",
  "/gallery/proflex-L-bracket-berm.jpg",
  "/gallery/railcar-spill-containment-berms.jpg",
  "/gallery/spillflex-spill-kits-texas-louisiana.jpg",
];

const row2 = [
  "/gallery/large-pit-liner-solutions-and-services.jpg",
  "/gallery/pond-liners-and-solutions.jpg",
  "/gallery/tank-liners-and-solutions.jpg",
  "/gallery/train-rail-spill-containment-solutions.jpg",
  "/gallery/image4.jpeg",
  "/gallery/image3.jpeg",
  "/gallery/image2.jpeg",
  "/gallery/image1.jpeg",
  "/gallery/Resized_Screenshot_20250807_102942_Facebook.jpeg",
  "/gallery/Screenshot_20250807_103008_Facebook.jpg",
  "/gallery/Resized_IMG_7650.jpeg",
  "/gallery/Resized_IMG_7649.jpeg",
];

const allImages = [...row1, ...row2];

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-8 w-8" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt=""
          fill
          className="object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function MarqueeRow({
  images,
  reverse = false,
  onImageClick,
}: {
  images: string[];
  reverse?: boolean;
  onImageClick: (src: string) => void;
}) {
  const doubled = [...images, ...images];

  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        className={`flex gap-4 w-max group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => onImageClick(src)}
            className="relative w-72 h-48 flex-shrink-0 rounded-xl overflow-hidden group/img cursor-pointer"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover/img:scale-110"
              sizes="288px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ImageMarquee() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((src: string) => {
    const idx = allImages.indexOf(src);
    setLightboxIndex(idx >= 0 ? idx : 0);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + allImages.length) % allImages.length : null
    );
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % allImages.length : null
    );
  }, []);

  return (
    <>
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
            In The Field
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900">
            Our Work in Action
          </h2>
        </div>

        <div className="space-y-4">
          <MarqueeRow images={row1} onImageClick={openLightbox} />
          <MarqueeRow images={row2} reverse onImageClick={openLightbox} />
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}

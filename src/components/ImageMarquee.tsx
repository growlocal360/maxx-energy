"use client";

import Image from "next/image";

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

function MarqueeRow({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) {
  // Duplicate images for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="group relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        className={`flex gap-4 w-max group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative w-72 h-48 flex-shrink-0 rounded-xl overflow-hidden group/img"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover/img:scale-110"
              sizes="288px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImageMarquee() {
  return (
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
        <MarqueeRow images={row1} />
        <MarqueeRow images={row2} reverse />
      </div>
    </section>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import manifest from "../../../../../public/catalog/manifest.json";
import CatalogFlipbook from "@/components/catalog/CatalogFlipbook";

export const metadata: Metadata = {
  title: "Spill Control Catalog | MAXX Energy Services",
  description:
    "Browse the MAXX First Response spill control catalog — kits, absorbents, drain protection, containment, flood & fire response, and Spill Rover marine response.",
  openGraph: {
    title: "MAXX First Response Catalog",
    description:
      "Spill kits, absorbents, drain protection, containment, flood & fire, and marine response.",
    images: ["/catalog/page-01.webp"],
  },
};

export default function CatalogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <Image
          src="/spill-bully-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maxx-900/85 via-maxx-900/75 to-maxx-950/85" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/products/spill-control"
              className="inline-flex items-center text-maxx-300 hover:text-maxx-accent transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Spill Control
            </Link>
          </div>

          <div className="flex items-start gap-6">
            <div className="p-4 bg-maxx-accent/10 border border-maxx-accent/20 rounded-xl hidden sm:block">
              <BookOpen className="h-10 w-10 text-maxx-accent" />
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                First Response Catalog
              </h1>
              <p className="text-xl text-maxx-200 max-w-3xl leading-relaxed">
                Flip through the full {manifest.pageCount}-page product catalog, or download the PDF.
              </p>
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
              fill="#e8f1f7"
            />
          </svg>
        </div>
      </section>

      {/* Flipbook */}
      <section className="bg-maxx-50 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogFlipbook
            pages={manifest.pages}
            pdfUrl="/catalog/catalog.pdf"
            basePath="/catalog"
          />
        </div>
      </section>
    </>
  );
}

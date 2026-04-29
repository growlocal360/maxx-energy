import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-maxx-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/products/spill-control"
              className="inline-flex items-center gap-2 text-sm font-semibold text-maxx-700 hover:text-maxx-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Spill Control
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-maxx-900 sm:text-4xl">
              First Response Catalog
            </h1>
            <p className="mt-1 max-w-2xl text-maxx-700">
              Flip through the full {manifest.pageCount}-page product catalog, or download the PDF.
            </p>
          </div>
        </div>

        <CatalogFlipbook
          pages={manifest.pages}
          pdfUrl="/catalog/catalog.pdf"
          basePath="/catalog"
        />
      </div>
    </div>
  );
}

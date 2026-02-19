import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Product, SubProduct } from "@/lib/types";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, tagline")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) {
    return { title: "Product Not Found | MAXX Energy Services" };
  }

  return {
    title: `${product.name} | MAXX Energy Services`,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | MAXX Energy Services`,
      description: product.tagline,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) {
    notFound();
  }

  const { data: subProducts } = await supabase
    .from("sub_products")
    .select("*")
    .eq("product_id", product.id)
    .eq("published", true)
    .order("display_order", { ascending: true });

  const productWithSubs: Product = {
    ...product,
    sub_products: (subProducts as SubProduct[]) || [],
  };

  return <ProductDetailClient product={productWithSubs} />;
}

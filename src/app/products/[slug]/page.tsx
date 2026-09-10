import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Product, SubProduct, ProductItem } from "@/lib/types";
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
    .select("*, sub_product_categories!inner(product_id)")
    .eq("sub_product_categories.product_id", product.id)
    .eq("published", true)
    .order("display_order", { ascending: true });

  const subs = (subProducts as SubProduct[]) || [];

  const productWithSubs: Product = {
    ...product,
    sub_products: subs,
  };

  // A category with a single sub-product shows that sub-product's items
  // directly on the category page instead of a one-card "lineup".
  let inlineItems: ProductItem[] | undefined;
  if (subs.length === 1) {
    const { data: items } = await supabase
      .from("product_items")
      .select("*")
      .eq("sub_product_id", subs[0].id)
      .order("display_order", { ascending: true });
    inlineItems = (items || []) as ProductItem[];
  }

  return (
    <ProductDetailClient product={productWithSubs} inlineItems={inlineItems} />
  );
}

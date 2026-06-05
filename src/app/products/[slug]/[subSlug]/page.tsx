import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Product, SubProduct, ProductItem } from "@/lib/types";
import SubProductDetailClient from "./SubProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("id, name")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) return { title: "Not Found" };

  const { data: subProduct } = await supabase
    .from("sub_products")
    .select("name, sub_product_categories!inner(product_id)")
    .eq("slug", subSlug)
    .eq("sub_product_categories.product_id", product.id)
    .eq("published", true)
    .single();

  if (!subProduct) return { title: "Not Found" };

  return {
    title: `${subProduct.name} | ${product.name} | MAXX Energy Services`,
    description: `${subProduct.name} products from MAXX Energy Services ${product.name} lineup.`,
    openGraph: {
      title: `${subProduct.name} — ${product.name}`,
      description: `${subProduct.name} products from MAXX Energy Services.`,
    },
  };
}

export default async function SubProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const supabase = await createClient();

  // Fetch product
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) notFound();

  // Fetch sub-product (must be a member of this category via the join table)
  const { data: subProduct } = await supabase
    .from("sub_products")
    .select("*, sub_product_categories!inner(product_id)")
    .eq("slug", subSlug)
    .eq("sub_product_categories.product_id", product.id)
    .eq("published", true)
    .single();

  if (!subProduct) notFound();

  // Fetch product items
  const { data: items } = await supabase
    .from("product_items")
    .select("*")
    .eq("sub_product_id", subProduct.id)
    .order("display_order", { ascending: true });

  return (
    <SubProductDetailClient
      product={product as Product}
      subProduct={subProduct as SubProduct}
      items={(items || []) as ProductItem[]}
    />
  );
}

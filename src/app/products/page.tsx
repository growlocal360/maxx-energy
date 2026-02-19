import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Product, SubProduct } from "@/lib/types";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Our Products | MAXX Energy Services",
  description:
    "Explore MAXX Energy Services' comprehensive chemical and containment solutions. From frac chemicals to spill containment berms, we deliver reliability across every industry.",
  openGraph: {
    title: "Our Products | MAXX Energy Services",
    description:
      "Comprehensive chemical and containment solutions for energy, agriculture, and municipal markets.",
  },
};

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  // Fetch sub_products for each product
  const productsWithSubs: Product[] = [];
  if (products) {
    for (const product of products) {
      const { data: subProducts } = await supabase
        .from("sub_products")
        .select("*")
        .eq("product_id", product.id)
        .eq("published", true)
        .order("display_order", { ascending: true });

      productsWithSubs.push({
        ...product,
        sub_products: (subProducts as SubProduct[]) || [],
      });
    }
  }

  return <ProductsPageClient products={productsWithSubs} />;
}

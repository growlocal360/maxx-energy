import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Market } from "@/lib/types";
import MarketDetailClient from "./MarketDetailClient";

interface MarketDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MarketDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: market } = await supabase
    .from("markets")
    .select("name")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!market) {
    return { title: "Market Not Found | MAXX Energy Services" };
  }

  return {
    title: `${market.name} | Markets | MAXX Energy Services`,
    description: `MAXX Energy Services provides reliable chemical and containment solutions for the ${market.name} industry.`,
    openGraph: {
      title: `${market.name} | MAXX Energy Services`,
      description: `Chemical and containment solutions for the ${market.name} industry.`,
    },
  };
}

export default async function MarketDetailPage({
  params,
}: MarketDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: market } = await supabase
    .from("markets")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!market) {
    notFound();
  }

  return <MarketDetailClient market={market as Market} />;
}

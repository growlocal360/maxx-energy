import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Market } from "@/lib/types";
import MarketsPageClient from "./MarketsPageClient";

export const metadata: Metadata = {
  title: "Markets We Serve | MAXX Energy Services",
  description:
    "MAXX Energy Services delivers reliable chemical and containment solutions across oil & gas, agriculture, energy recovery, industrial, municipal water, mining, and more.",
  openGraph: {
    title: "Markets We Serve | MAXX Energy Services",
    description:
      "Reliable chemical and containment solutions across diverse market sectors nationwide.",
  },
};

export default async function MarketsPage() {
  const supabase = await createClient();

  const { data: markets } = await supabase
    .from("markets")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  return <MarketsPageClient markets={(markets as Market[]) || []} />;
}

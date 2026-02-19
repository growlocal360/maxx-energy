import { createClient } from "@/lib/supabase/server";
import type { Location } from "@/lib/types";
import LocationsContent from "./LocationsContent";

export const metadata = {
  title: "Our Locations | MAXX Energy Services",
  description:
    "Find MAXX Energy Services offices and service areas strategically positioned to serve customers across key energy, agriculture, and municipal markets.",
};

export default async function LocationsPage() {
  const supabase = await createClient();

  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("published", true)
    .order("is_headquarters", { ascending: false })
    .order("name", { ascending: true });

  return <LocationsContent locations={(locations as Location[]) || []} />;
}

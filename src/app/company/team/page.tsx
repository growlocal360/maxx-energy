import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";
import TeamContent from "./TeamContent";

export const metadata = {
  title: "Our Team | MAXX Energy Services",
  description:
    "Meet the experienced professionals behind MAXX Energy Services. Our team brings decades of expertise in chemical supply, distribution, and containment solutions.",
};

export default async function TeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  return <TeamContent members={(members as TeamMember[]) || []} />;
}

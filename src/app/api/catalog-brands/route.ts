import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { parseCatalogBrandInput } from "@/lib/catalog-brand-input";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("catalog_brands")
    .select("*")
    .order("display_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = parseCatalogBrandInput(await request.json(), { partial: false });
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("catalog_brands")
    .insert(parsed.values)
    .select()
    .single();

  if (error) {
    const message =
      error.code === "23505"
        ? "That subdomain or custom domain is already in use."
        : error.message;
    return NextResponse.json({ error: message }, { status: error.code === "23505" ? 409 : 500 });
  }

  return NextResponse.json(data);
}

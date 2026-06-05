import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sub_products")
    .select("*, sub_product_categories!inner(product_id)")
    .eq("sub_product_categories.product_id", id)
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { category_ids, ...fields } = body as {
    category_ids?: string[];
    [key: string]: unknown;
  };

  const { data, error } = await supabase
    .from("sub_products")
    .insert({ ...fields, product_id: id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Write category memberships (home category is always included)
  const categoryIds = Array.from(new Set([id, ...(category_ids ?? [])]));
  const { error: joinError } = await supabase
    .from("sub_product_categories")
    .insert(
      categoryIds.map((product_id) => ({ sub_product_id: data.id, product_id }))
    );

  if (joinError) {
    return NextResponse.json({ error: joinError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

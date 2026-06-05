import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; subId: string }> }
) {
  const { subId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sub_products")
    .select("*, sub_product_categories(product_id)")
    .eq("id", subId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Flatten join rows into a category_ids array for the admin form
  const { sub_product_categories, ...subProduct } = data as Record<
    string,
    unknown
  > & { sub_product_categories?: { product_id: string }[] };
  return NextResponse.json({
    ...subProduct,
    category_ids: (sub_product_categories ?? []).map((c) => c.product_id),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; subId: string }> }
) {
  const { id, subId } = await params;
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
    .update(fields)
    .eq("id", subId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Replace category memberships only when the caller sends them
  // (e.g. the publish toggle sends just { published } and must not touch them).
  if (category_ids !== undefined) {
    const categoryIds = Array.from(new Set([id, ...category_ids]));

    await supabase
      .from("sub_product_categories")
      .delete()
      .eq("sub_product_id", subId);

    const { error: joinError } = await supabase
      .from("sub_product_categories")
      .insert(
        categoryIds.map((product_id) => ({ sub_product_id: subId, product_id }))
      );

    if (joinError) {
      return NextResponse.json({ error: joinError.message }, { status: 500 });
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; subId: string }> }
) {
  const { subId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("sub_products").delete().eq("id", subId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

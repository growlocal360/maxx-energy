import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { BRAND_SLUG_PATTERN } from "@/lib/types/catalog-brands";

/**
 * Queues a catalog rebuild by dispatching the hub's "Rebuild catalogs" GitHub
 * Action. Body: { brand: "<slug>" | "all" }.
 *
 * Env: CATALOG_HUB_REPO ("owner/repo") and GITHUB_DISPATCH_TOKEN (fine-grained
 * token with "Contents: read & write" on that repo).
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { brand } = (await request.json().catch(() => ({}))) as { brand?: string };
  if (!brand || (brand !== "all" && !BRAND_SLUG_PATTERN.test(brand))) {
    return NextResponse.json({ error: "Specify a brand slug or \"all\"." }, { status: 400 });
  }

  const repo = process.env.CATALOG_HUB_REPO;
  const token = process.env.GITHUB_DISPATCH_TOKEN;
  if (!repo || !token) {
    return NextResponse.json(
      {
        error:
          "Rebuilds from the admin are not set up yet. Run the export from the catalog hub instead (npm run export:catalog -- --all).",
      },
      { status: 501 },
    );
  }

  const dispatch = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ event_type: "rebuild-catalog", client_payload: { brand } }),
  });

  if (!dispatch.ok) {
    return NextResponse.json(
      { error: `GitHub refused the rebuild request (${dispatch.status}).` },
      { status: 502 },
    );
  }

  // Reflect the queue in the admin right away; the export script moves the
  // status on to building → ok | failed.
  const query = supabase.from("catalog_brands").update({ build_status: "queued" });
  await (brand === "all" ? query.eq("published", true) : query.eq("slug", brand));

  return NextResponse.json({ queued: brand });
}

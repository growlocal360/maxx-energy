import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.NANO_BANANA_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";

const marketPrompts: Record<string, string> = {
  "oil-and-gas":
    "A dramatic wide-angle photograph of an oil refinery at golden hour with pipelines, storage tanks, and drilling equipment. Industrial energy landscape, professional photography, warm tones.",
  agriculture:
    "A stunning aerial photograph of vast green agricultural farmland with irrigation systems, crop fields, and farming equipment. Golden sunlight, professional photography.",
  "energy-recovery":
    "A modern energy recovery facility with solar panels, wind turbines, and industrial recycling equipment against a blue sky. Clean energy, professional photography.",
  industrial:
    "A large industrial manufacturing plant interior with heavy machinery, conveyor belts, and steel structures. Dramatic lighting, professional photography.",
  "industrial-water":
    "An industrial water treatment facility with large filtration tanks, pipes, and water processing equipment. Blue tones, clean, professional photography.",
  mining:
    "A large open-pit mining operation with heavy excavation equipment, haul trucks, and terraced earth. Dramatic landscape, professional photography.",
  "municipal-water":
    "A modern municipal water treatment plant with settling pools, filtration systems, and clean water infrastructure. Blue sky, professional photography.",
  paper:
    "A paper mill interior with large rolls of paper, industrial machinery, and production lines. Warm lighting, professional photography.",
  construction:
    "A large-scale construction site with cranes, steel framework, and heavy equipment at sunset. Dynamic perspective, professional photography.",
  "heavy-commercial":
    "A busy commercial trucking depot with heavy vehicles, loading docks, and logistics operations. Professional photography, dramatic sky.",
  "select-industries":
    "A modern specialized chemical laboratory and production facility with stainless steel equipment and control panels. Clean, professional photography.",
  "water-treatment":
    "A water treatment plant with aeration basins, clarifiers, and chemical dosing systems. Aerial view, blue water, professional photography.",
};

async function generateImage(
  slug: string,
  prompt: string
): Promise<string | null> {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Generate a high-quality, photorealistic hero background image for a website section about "${slug.replace(/-/g, " ")}". ${prompt} The image should be wide format (16:9 aspect ratio), suitable as a website hero background. No text or logos in the image.`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`Failed for ${slug}:`, JSON.stringify(data));
    return `API error: ${data.error?.message || "unknown"}`;
  }

  const candidates = data.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        const filePath = path.join(
          process.cwd(),
          "public",
          "markets",
          `${slug}.jpg`
        );
        fs.writeFileSync(filePath, buffer);
        return "generated";
      }
    }
  }

  return "no image in response";
}

export async function POST() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "NANO_BANANA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const results: Record<string, string> = {};

  for (const [slug, prompt] of Object.entries(marketPrompts)) {
    console.log(`Generating image for ${slug}...`);
    try {
      const result = await generateImage(slug, prompt);
      results[slug] = result || "failed";
    } catch (e: unknown) {
      results[slug] = `error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return NextResponse.json({ results });
}

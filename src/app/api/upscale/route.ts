import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.NANO_BANANA_API_KEY;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent";

async function upscaleImage(filePath: string): Promise<boolean> {
  const imageBuffer = fs.readFileSync(filePath);
  const base64 = imageBuffer.toString("base64");
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" : "image/jpeg";

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: "Upscale this image to a higher resolution. Keep the exact same content, colors, and composition. Do not change anything about the image, just make it sharper and higher resolution.",
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64,
              },
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
    console.error(`Failed to upscale ${filePath}:`, JSON.stringify(data));
    throw new Error(JSON.stringify(data.error || data));
  }

  // Find the image part in the response
  const candidates = data.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const upscaledBuffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(filePath, upscaledBuffer);
        return true;
      }
    }
  }

  throw new Error("No image in response: " + JSON.stringify(data));
}

export async function POST() {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "NANO_BANANA_API_KEY not configured" },
      { status: 500 }
    );
  }

  const shaleDir = path.join(process.cwd(), "public", "shale-plays");
  const files = fs
    .readdirSync(shaleDir)
    .filter(
      (f) =>
        f.endsWith(".jpg") &&
        f !== "shale-plays-hero.jpg" &&
        f.includes("basin")
    );

  const results: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(shaleDir, file);
    console.log(`Upscaling ${file}...`);
    try {
      const success = await upscaleImage(filePath);
      results[file] = success ? "upscaled" : "failed";
    } catch (e: unknown) {
      results[file] = `error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  return NextResponse.json({ results });
}

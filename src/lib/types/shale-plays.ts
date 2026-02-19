import { JSONContent } from "./index";

export interface ShalePlay {
  id: string;
  name: string;
  slug: string;
  description: JSONContent | null;
  region: string | null;
  hero_image_url: string | null;
  lat: number | null;
  lng: number | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

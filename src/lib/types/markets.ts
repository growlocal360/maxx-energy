import { JSONContent } from "./index";

export interface Market {
  id: string;
  name: string;
  slug: string;
  description: JSONContent | null;
  icon_url: string | null;
  hero_image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

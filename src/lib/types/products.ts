import { JSONContent } from "./index";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: JSONContent | null;
  icon: string | null;
  hero_image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  sub_products?: SubProduct[];
}

export interface SubProduct {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  description: JSONContent | null;
  icon: string | null;
  image_url: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

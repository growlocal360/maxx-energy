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

export interface ProductItem {
  id: string;
  sub_product_id: string;
  family: string;
  trade_name: string;
  uom: string | null;
  packing: string | null;
  display_order: number;
  created_at: string;
}

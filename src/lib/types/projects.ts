import { JSONContent } from "./index";

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string | null;
  description: JSONContent | null;
  excerpt: string;
  featured_image: string | null;
  products_used: string[];
  market: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

import { JSONContent } from "./index";

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  type: "news" | "event";
  excerpt: string | null;
  content: JSONContent | null;
  featured_image: string | null;
  event_date: string | null;
  event_location: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type { TeamMember } from "./team";
export type { Product, SubProduct } from "./products";
export type { Project, ProjectImage } from "./projects";
export type { Market } from "./markets";
export type { ShalePlay } from "./shale-plays";
export type { NewsArticle } from "./news";
export type { JobPosting } from "./careers";
export type { Location } from "./locations";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

// TipTap JSON Content type
export interface JSONContent {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, unknown>;
  }[];
  text?: string;
}

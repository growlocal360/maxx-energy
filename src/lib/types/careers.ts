import { JSONContent } from "./index";

export interface JobPosting {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  location: string;
  employment_type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: JSONContent | null;
  requirements: JSONContent | null;
  salary_range: string | null;
  published: boolean;
  published_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

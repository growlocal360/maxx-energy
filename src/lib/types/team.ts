export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

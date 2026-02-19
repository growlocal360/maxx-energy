export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  email: string | null;
  is_headquarters: boolean;
  lat: number | null;
  lng: number | null;
  published: boolean;
  created_at: string;
}

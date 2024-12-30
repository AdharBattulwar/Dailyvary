export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  label?: string;
  created_at: string;
  updated_at: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
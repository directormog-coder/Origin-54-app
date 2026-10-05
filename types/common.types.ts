export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Artisan extends BaseEntity {
  name: string;
  location?: string | null;
  bio?: string | null;
  profile_image?: string | null;
  products?: Product[] | null;
}

export interface Product extends BaseEntity {
  name: string;
  slug?: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  category?: string | null;
  artisan_id?: string | null;
  artisans?: Artisan | null;
}

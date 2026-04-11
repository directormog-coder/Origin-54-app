// types/shop.types.ts

import { Database } from './database.types'

// Re-export database types with friendly names
export type Artisan = Database['public']['Tables']['artisans']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']

// Extended types with relations
export interface ProductWithArtisan extends Product {
  artisans: Artisan | null
}

export interface ArtisanWithProducts extends Artisan {
  products: Product[] | null
}

// Cart types (match your store)
export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string
  category: string
  quantity: number
  artisan_name?: string
}

// Checkout types
export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  phone: string
}

export interface PaystackResponse {
  authorization_url: string
  access_code: string
  reference: string
}



// types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artisans: {
        Row: {
          id: string
          name: string
          bio: string | null
          location: string | null
          profile_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          bio?: string | null
          location?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          bio?: string | null
          location?: string | null
          profile_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: 'WOMEN' | 'MEN' | 'CHILDREN' | 'ACCESSORIES'
          image_url: string | null
          artisan_id: string | null
          stock_quantity: number
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          category: 'WOMEN' | 'MEN' | 'CHILDREN' | 'ACCESSORIES'
          image_url?: string | null
          artisan_id?: string | null
          stock_quantity?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          category?: 'WOMEN' | 'MEN' | 'CHILDREN' | 'ACCESSORIES'
          image_url?: string | null
          artisan_id?: string | null
          stock_quantity?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          email: string
          amount: number
          status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          items: Json
          paystack_reference: string | null
          customer_details: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          amount: number
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          items: Json
          paystack_reference?: string | null
          customer_details?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          amount?: number
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          items?: Json
          paystack_reference?: string | null
          customer_details?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}



// Deep Repair Sync: 2026-04-11 17:28:30
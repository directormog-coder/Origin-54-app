import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize the Supabase client with the Database types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string; // Optional because it's usually auto-generated
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image_url?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          email?: string;
          role?: 'user' | 'admin';
        };
      };
    };
  };
};

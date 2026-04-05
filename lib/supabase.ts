import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    tables: {
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
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
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
        };
        Update: {
          email?: string;
          role?: 'user' | 'admin';
        };
      };
    };
  };
};

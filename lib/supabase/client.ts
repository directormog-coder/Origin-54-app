import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase"; // Optional: Add if you have types

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}



// Deep Repair Sync: 2026-04-11 17:28:30
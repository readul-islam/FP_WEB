

import { createClient } from "@supabase/supabase-js";

// In Next.js, expose these as NEXT_PUBLIC_* so they are available on the client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Only warn in the browser to avoid noisy logs during static analysis.
  if (typeof window !== "undefined") {
    console.warn(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types (will be generated later)
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          role: string;
          rank: string;
          focus_coins: number;
          total_flight_hours: number;
          is_active: boolean;
          email_verified: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          is_completed: boolean;
          task_type: string;
          priority: number;
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      // Add more types as needed
    };
  };
};

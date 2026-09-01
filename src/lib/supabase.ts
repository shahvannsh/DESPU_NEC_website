import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Whether the blog's backend is actually configured. Every blog page checks
 * this before trying to talk to Supabase, so the rest of the site keeps
 * working perfectly even if the blog hasn't been set up yet (see
 * supabase/SETUP.md) — visitors just see a friendly "not set up yet" state
 * instead of a crash.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

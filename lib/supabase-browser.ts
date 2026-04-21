import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Generation {
  id: string;
  created_at: string;
  objective: string | null;
  vibe: string | null;
  language: string | null;
  post: string | null;
  image_prompt: string | null;
  brand_alignment: number | null;
  alignment_reason: string | null;
}

// Lazy singleton — created only when first called (not at module load / build time)
let _client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (typeof window === 'undefined') return null; // never run on server
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!_client) _client = createClient(url, key);
  return _client;
}

-- ──────────────────────────────────────────────────────────────────
-- Artist DNA Content Engine — Supabase setup
-- Run this entire file in Supabase → SQL Editor → Run
-- ──────────────────────────────────────────────────────────────────

create table if not exists generations (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz default now(),

  -- inputs
  brand_dna         text not null,
  objective         text,
  target_audience   text,
  vibe              text,
  language          text default 'English',

  -- outputs
  post              text,
  image_prompt      text,
  brand_alignment   integer check (brand_alignment between 1 and 100),
  alignment_reason  text
);

-- Index for fast date-sorted queries (used by My Studio tab)
create index if not exists generations_created_at_idx
  on generations (created_at desc);

-- Row Level Security
alter table generations enable row level security;

-- Allow server-side inserts (via service_role key — bypasses RLS automatically)
-- Allow browser reads via anon key
create policy "Allow anonymous reads"
  on generations for select
  using (true);

create policy "Allow anonymous inserts"
  on generations for insert
  with check (true);

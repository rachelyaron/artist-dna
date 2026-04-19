-- Run this in Supabase → SQL Editor
-- Creates the table that stores every generation

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

-- Optional: enable RLS and allow public inserts (adjust for your auth strategy)
alter table generations enable row level security;

create policy "Allow anonymous inserts"
  on generations for insert
  with check (true);

create policy "Allow reads for authenticated users"
  on generations for select
  using (true);

-- ============================================================================
-- DESPU Blog — database schema
-- ============================================================================
-- Run this once in your Supabase project's SQL Editor (Dashboard → SQL Editor
-- → New query → paste this whole file → Run). Safe to re-run: uses
-- IF NOT EXISTS / CREATE OR REPLACE everywhere.
--
-- What this sets up:
--   1. `profiles`  — one row per team member allowed to write posts. Pre-seeded
--                    below with the 13 current DESPU team members by email.
--   2. `posts`     — the blog posts themselves.
--   3. Row Level Security so that:
--        - Anyone (including logged-out visitors) can READ posts.
--        - Only someone logged in AND present in `profiles` can CREATE a post.
--        - You can only edit/delete YOUR OWN posts.
--   4. A trigger that keeps `updated_at` current automatically.
-- ============================================================================

-- 1. PROFILES ----------------------------------------------------------------
-- One row per person allowed to write. Linked to Supabase's built-in
-- auth.users by id. A profile only becomes "active" once that email actually
-- signs up / is invited in the Auth tab — until then it just reserves the
-- slot so the right display name is ready to go.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row the moment someone signs up, using whatever
-- name was set when they were invited (see SETUP.md). Falls back to the
-- part of their email before the @ if no name was provided.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. POSTS --------------------------------------------------------------------

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_slug_idx on public.posts (slug);

alter table public.posts enable row level security;

drop policy if exists "Posts are publicly readable" on public.posts;
create policy "Posts are publicly readable"
  on public.posts for select
  using (true);

-- Only someone who (a) is logged in and (b) has a row in `profiles` — i.e.
-- was actually invited as a team member — can create a post. This is the
-- "invite-only" gate: creating an auth account alone isn't enough.
drop policy if exists "Team members can create posts" on public.posts;
create policy "Team members can create posts"
  on public.posts for insert
  with check (
    auth.uid() = author_id
    and exists (select 1 from public.profiles where id = auth.uid())
  );

drop policy if exists "Authors can update their own posts" on public.posts;
create policy "Authors can update their own posts"
  on public.posts for update
  using (auth.uid() = author_id);

drop policy if exists "Authors can delete their own posts" on public.posts;
create policy "Authors can delete their own posts"
  on public.posts for delete
  using (auth.uid() = author_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute procedure public.set_updated_at();

-- 3. STORAGE (cover images) ---------------------------------------------------
-- A public bucket for blog cover images. Anyone can view; only logged-in
-- team members (present in `profiles`) can upload.

insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

drop policy if exists "Blog covers are publicly readable" on storage.objects;
create policy "Blog covers are publicly readable"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

drop policy if exists "Team members can upload blog covers" on storage.objects;
create policy "Team members can upload blog covers"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-covers'
    and exists (select 1 from public.profiles where id = auth.uid())
  );

-- 4. PRE-SEED THE 13 TEAM MEMBERS ---------------------------------------------
-- This reserves each person's display name/role so it's correct the moment
-- they log in for the first time. Replace the placeholder emails below with
-- each person's real email before running this — the invite in Supabase's
-- Auth tab MUST use the exact same email for the account to link up
-- correctly (see SETUP.md, step 3).
--
-- These insert into auth.users directly with no password (invite-only,
-- password gets set when they accept the email invite in the dashboard).

-- NOTE: this section intentionally left for you to fill in — see SETUP.md.
-- Example of the shape once you have real emails:
--
-- insert into public.profiles (id, email, full_name, role) values
--   ('<uuid from Auth tab after inviting>', 'vannsh@example.com', 'Vannsh Shah', 'Campus Ambassador — AI Researcher');

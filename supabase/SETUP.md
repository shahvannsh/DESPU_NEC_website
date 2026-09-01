# Setting up the blog

The blog (`/blog`) needs a small backend to store posts and log in the 13
team members. This uses [Supabase](https://supabase.com) — free, and takes
about 15 minutes to set up. The rest of the site works with zero setup;
only `/blog` needs this.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → sign up (free) → **New project**.
2. Pick any name (e.g. `despu-blog`) and a database password — save that
   password somewhere, you likely won't need it again but it's good to have.
3. Wait ~2 minutes for the project to finish provisioning.

## 2. Run the database schema

1. In your new project, open **SQL Editor** (left sidebar) → **New query**.
2. Open `supabase/schema.sql` from this repo, copy the whole file, paste it
   in, and click **Run**.
3. You should see "Success. No rows returned" — that's correct, this just
   creates the tables/policies.

## 3. Get your API keys

1. Go to **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** and the **anon public** key (NOT the
   `service_role` key — that one must never be exposed to the browser).
3. Create a file called `.env.local` in the project root (same folder as
   `package.json`) with:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Also add these two as **Environment Variables** in your Vercel project
   settings (Settings → Environment Variables), so the live site has them
   too — not just your local machine.

## 4. Invite the 13 team members

This is the "invite-only" part — nobody can create their own account; you
create one for each person.

1. In Supabase, go to **Authentication** → **Users** → **Add user** →
   **Invite user**.
2. Enter their real email. Under **User Metadata**, add:
   ```json
   { "full_name": "Their Full Name" }
   ```
   (This makes their name show up correctly as the post author — otherwise
   it'll just show the part of their email before the @.)
3. Click **Invite**. They'll get an email with a link to set their password.
4. Repeat for each of the 13 team members.

That's it — each invited person automatically gets a row in the `profiles`
table (via a database trigger) the moment they accept the invite, which is
what makes them allowed to write posts. Nobody else can, even if they
somehow get a login link, because `posts` are gated on having a `profiles`
row, not just being logged in.

## 5. Try it out

1. Run `npm run dev` (or visit the deployed site).
2. Go to `/blog/login`, log in with one of the invited accounts.
3. Go to `/blog/new` and publish a test post.

## Removing someone's access later

Supabase dashboard → **Authentication** → **Users** → find them → delete.
Their profile row and any posts they wrote will be removed automatically
(cascading delete) — if you'd rather keep their posts but just revoke
future write access, delete their row from the `profiles` table instead of
deleting the whole user.

## Troubleshooting

- **"This account isn't set up as a DESPU team member yet"** — they logged
  in successfully, but there's no matching `profiles` row. Check the email
  used to invite them exactly matches (case-sensitive) the email they're
  logging in with.
- **Blog pages show "not set up yet"** — the `VITE_SUPABASE_*` env vars
  aren't set (or Vercel needs a redeploy after you added them — env var
  changes don't apply retroactively to old deployments).

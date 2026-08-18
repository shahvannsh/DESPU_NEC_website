# DESPU — National Entrepreneurship Challenge

Team website for **DESPU**, representing Deccan Education Society's Pune
University in the National Entrepreneurship Challenge (NEC).

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

See [DEPLOY.md](./DEPLOY.md) for hosting-specific setup (Vercel, Netlify,
GitHub Pages, etc.) — this is a single-page app, so the host needs to be
told to serve `index.html` for unknown routes like `/team/:slug`.

## Project structure

```
src/
 ├── components/     Reusable UI (Navbar, Hero, TeamCard, Contact, ...)
 ├── pages/          Route-level pages (Home, TeamPage, NotFound)
 ├── data/           Editable content — team members, journey, values
 ├── lib/            Shared utilities (motion/animation presets)
 ├── assets/team/    Team member photos (WebP)
 ├── App.tsx         Routes + layout shell
 └── main.tsx        Entry point
```

## Editing content

**Team members** — edit `src/data/team.ts`. Each entry has name, role,
category, image, motivation, expectations, skills, responsibilities, fun
fact, and optional social links. Adding a member here automatically adds
them to the grid, the filter, and gets them an individual profile page at
`/team/<slug>` (slug is auto-generated from the name).

**Journey timeline** — `src/data/journey.ts`
**Values section** — `src/data/values.ts`

## Known placeholders

A few things still need real content or a real domain before launch — see
[DOMAIN_TODO.md](./DOMAIN_TODO.md) for the sitemap/robots.txt domain, and
check `Testimonials.tsx` and `Contact.tsx` (WhatsApp link) for other
placeholders still marked "coming soon."

## License

Internal project — not licensed for external reuse.

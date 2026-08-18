# Deploying DESPU

This is a single-page app (React Router). Any static host needs to be told to
serve `index.html` for unknown paths like `/team/vannsh-shah`, otherwise
refreshing a team page returns a plain 404.

## Vercel
Already configured via `vercel.json` — deploy with:
```
npm run build
vercel --prod
```

## Netlify
Already configured via `public/_redirects` — deploy with:
```
npm run build
netlify deploy --prod --dir=dist
```

## GitHub Pages / other static hosts
Build first (`npm run build`), then copy `dist/index.html` to `dist/404.html`
so unknown paths fall back to the app:
```
cp dist/index.html dist/404.html
```

## Any other host
Configure it to rewrite all unmatched routes to `/index.html` (SPA fallback),
not redirect — a redirect changes the URL and breaks deep links.

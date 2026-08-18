# Update once you have a real domain

Two files hardcode a placeholder domain. Once you know your real one, do a
find-and-replace of `despu-nec.vercel.app` → your actual domain in:

- `public/sitemap.xml` (14 URLs)
- `public/robots.txt` (1 line)

One command that does both:
```bash
find public -name "sitemap.xml" -o -name "robots.txt" | xargs sed -i 's/despu-nec\.vercel\.app/YOUR-REAL-DOMAIN/g'
```

While you're at it, also add a canonical URL tag to `index.html` inside
`<head>` — skipped for now since it needs a real domain too:
```html
<link rel="canonical" href="https://YOUR-REAL-DOMAIN/" />
```

These files don't affect how the site looks or works — they only matter
for search engines, so there's no rush.

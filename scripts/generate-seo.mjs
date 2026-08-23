#!/usr/bin/env node
/**
 * Generates public/sitemap.xml, public/robots.txt, and injects the
 * canonical/OG/Twitter URLs into index.html — all from the single
 * `siteUrl` value in site.config.json at the repo root.
 *
 * Run automatically before every build (see package.json "prebuild"),
 * or manually: npm run generate:seo
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const { siteUrl } = JSON.parse(readFileSync(path.join(root, "site.config.json"), "utf-8"));
const base = siteUrl.replace(/\/$/, "");

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// --- pull team member names straight out of the TS source (no build step
// dependency / no need to duplicate the list here) ---
const teamSrc = readFileSync(path.join(root, "src/data/team.ts"), "utf-8");
const names = [...teamSrc.matchAll(/name:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((n) => n !== "string"); // skip the `name: string;` interface line

// --- sitemap.xml ---
const urls = [`${base}/`, ...names.map((n) => `${base}/team/${slugify(n)}`)];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(path.join(root, "public/sitemap.xml"), sitemap);

// --- robots.txt ---
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
writeFileSync(path.join(root, "public/robots.txt"), robots);

// --- index.html: canonical + absolute OG/Twitter image + url URLs ---
let html = readFileSync(path.join(root, "index.html"), "utf-8");

// canonical tag (add if missing, update if present)
if (html.includes('rel="canonical"')) {
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${base}/" />`);
} else {
  html = html.replace(
    '<meta name="theme-color" content="#05070d" />',
    `<meta name="theme-color" content="#05070d" />\n    <link rel="canonical" href="${base}/" />`
  );
}

// make OG/Twitter image + url absolute (required by most link-preview crawlers)
html = html.replace(/(<meta property="og:image" content=")\/?og-image\.png(")/, `$1${base}/og-image.png$2`);
html = html.replace(/(<meta name="twitter:image" content=")\/?og-image\.png(")/, `$1${base}/og-image.png$2`);
if (!html.includes('property="og:url"')) {
  html = html.replace(
    '<meta property="og:type" content="website" />',
    `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${base}/" />`
  );
}

// --- Organization structured data (JSON-LD) ---
// Pull social links straight from data/social.ts so there's one source of
// truth — this script never hardcodes a URL that could drift out of sync.
const socialSrc = readFileSync(path.join(root, "src/data/social.ts"), "utf-8");
const sameAs = [...socialSrc.matchAll(/(instagram|linkedin):\s*"([^"]+)"/g)]
  .map((m) => m[2])
  .filter(Boolean);

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DESPU",
  alternateName: "DESPU — E-Cell, DES Pune University",
  url: `${base}/`,
  logo: `${base}/icon-512.png`,
  sameAs,
};
const ldJson = `<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`;

if (html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"')) {
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ldJson);
} else {
  html = html.replace("</head>", `  ${ldJson}\n  </head>`);
}

writeFileSync(path.join(root, "index.html"), html);

console.log(`[generate-seo] sitemap.xml (${urls.length} urls), robots.txt, and index.html updated for ${base}`);

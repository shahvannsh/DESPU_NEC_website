#!/usr/bin/env node
/**
 * Finds the full address of each LinkedIn post listed in
 * src/data/linkedinPosts.ts by following its short lnkd.in link, and saves
 * the result to src/data/linkedinResolved.generated.json. The blog page uses
 * those full addresses to embed the real post (LinkedIn's own preview).
 *
 * Runs automatically before every build (see package.json "prebuild").
 *
 * It must NEVER break a build: no internet, a blocked link, or a changed
 * redirect all just mean that post keeps showing as a plain card. Only the
 * lnkd.in redirect is followed — linkedin.com itself is never fetched.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const UA = "Mozilla/5.0 (compatible; DESPU-site-build/1.0)";
const isShort = (u) => /(^|\.)lnkd\.in$/i.test(new URL(u).hostname);

/** Follow lnkd.in hops one at a time; stop as soon as we reach another host. */
export async function resolveShortLink(url, fetchImpl = fetch, { timeoutMs = 6000, maxHops = 5 } = {}) {
  let current = url;
  for (let hop = 0; hop < maxHops; hop++) {
    if (!isShort(current)) return current;
    const res = await fetchImpl(current, {
      redirect: "manual",
      headers: { "user-agent": UA },
      signal: AbortSignal.timeout(timeoutMs),
    });
    const location = res.headers.get("location");
    if (location) {
      current = new URL(location, current).toString();
      continue;
    }
    // Some redirectors answer 200 with the destination in the page instead.
    const body = await res.text();
    const m = body.match(/https:\/\/www\.linkedin\.com\/(?:posts|feed\/update)\/[^"'<>\s\\]+/);
    return m ? m[0].replace(/&amp;/g, "&") : null;
  }
  return null;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const srcPath = path.join(root, "src/data/linkedinPosts.ts");
  const outPath = path.join(root, "src/data/linkedinResolved.generated.json");
  if (!existsSync(srcPath)) return;

  const src = readFileSync(srcPath, "utf-8");
  const posts = [...src.matchAll(/id:\s*"([^"]+)"[^}]*?url:\s*"([^"]+)"/gs)].map((m) => ({ id: m[1], url: m[2] }));

  let cache = {};
  try { cache = JSON.parse(readFileSync(outPath, "utf-8")); } catch { /* first run */ }

  const results = await Promise.all(
    posts.map(async (p) => {
      try { return [p.id, await resolveShortLink(p.url)]; } catch { return [p.id, null]; }
    })
  );

  const next = {};
  let found = 0;
  for (const [id, resolved] of results) {
    if (resolved) { next[id] = resolved; found++; }
    else if (cache[id]) next[id] = cache[id]; // keep an earlier good result
  }
  const json = JSON.stringify(next, null, 2) + "\n";
  if (!existsSync(outPath) || readFileSync(outPath, "utf-8") !== json) writeFileSync(outPath, json);
  console.log(`[resolve-linkedin] resolved ${found}/${posts.length} post link(s)` + (found < posts.length ? " — the rest stay as plain cards" : ""));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => console.log("[resolve-linkedin] skipped:", e?.message ?? e)).finally(() => process.exit(0));
}

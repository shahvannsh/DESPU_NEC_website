/**
 * DESPU E-Cell's LinkedIn posts, shown on the /blog page as blog cards that
 * open the original post on LinkedIn.
 *
 * Only `url` is required. Everything else is optional and should be copied
 * from the real post — never invented.
 *
 * AUTOMATIC: on every build, scripts/resolve-linkedin.mjs follows each short
 * link to find the post's full address, and the blog then embeds the real post
 * (needs internet, which Vercel builds have). If that ever fails for a post, it
 * just shows as a plain card.
 *
 * MANUAL FALLBACK — TO SHOW THE REAL POST ON THE PAGE: replace the short lnkd.in link in `url`
 * with the full post link — open the short link, then copy the address from
 * the browser's address bar (it looks like
 * https://www.linkedin.com/posts/...-activity-7123456789-XXXX). The blog then
 * embeds the actual post. (Or on LinkedIn: "..." menu > "Embed this post" and
 * paste the iframe's src.) Short lnkd.in links can't be embedded, so those
 * show as a plain card that opens the post on LinkedIn.
 *
 * To make a card richer, add any of:
 *   title   — the post's headline / first line
 *   excerpt — 1–2 sentences from the post
 *   date    — ISO date, e.g. "2026-08-27"
 *   image   — an imported image (put the file in src/assets/blog/)
 *
 * List newest first: the page shows them in this order.
 */
export interface LinkedInPost {
  id: string;
  url: string;
  title?: string;
  excerpt?: string;
  date?: string;
  image?: string;
  /** Height in px of the embedded post, if the default (600) cuts it off. */
  embedHeight?: number;
}

export const linkedinPosts: LinkedInPost[] = [
  { id: "dBRr5YKc", url: "https://lnkd.in/p/dBRr5YKc" },
  { id: "dmHE4SWq", url: "https://lnkd.in/p/dmHE4SWq" },
  { id: "d37TpsPC", url: "https://lnkd.in/p/d37TpsPC" },
  { id: "dQViKpYq", url: "https://lnkd.in/p/dQViKpYq" },
  { id: "dUWsFupw", url: "https://lnkd.in/p/dUWsFupw" },
  { id: "degNuAuD", url: "https://lnkd.in/p/degNuAuD" },
  { id: "dA5ZagYs", url: "https://lnkd.in/p/dA5ZagYs" },
  { id: "d52eD2i8", url: "https://lnkd.in/p/d52eD2i8" },
];

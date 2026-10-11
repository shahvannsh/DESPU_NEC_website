/**
 * DESPU E-Cell's LinkedIn posts, shown on the /blog page as blog cards that
 * open the original post on LinkedIn.
 *
 * Only `url` is required. Everything else is optional and should be copied
 * from the real post — never invented. The card falls back to a plain
 * "LinkedIn post" label until `title` is filled in.
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

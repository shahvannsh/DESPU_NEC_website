/**
 * Turns a LinkedIn post link into the URL LinkedIn uses for embedding that
 * post on another website. Returns null when the link has no post ID in it
 * (e.g. the short lnkd.in links), in which case the blog falls back to a
 * plain card that opens the post on LinkedIn.
 *
 * Accepts any of:
 *   - the "Embed this post" iframe src from LinkedIn
 *       https://www.linkedin.com/embed/feed/update/urn:li:share:7123456789
 *   - a full post link (what the address bar shows after opening a post)
 *       https://www.linkedin.com/posts/despu-ecell_title-activity-7123456789-AbCd
 *   - a feed link containing a urn
 *       https://www.linkedin.com/feed/update/urn:li:activity:7123456789
 */
export function getLinkedInEmbedUrl(url: string): string | null {
  if (!url) return null;

  if (url.includes("linkedin.com/embed/feed/update/")) return url;

  const urn = url.match(/urn:li:(share|ugcPost|activity):(\d{10,})/);
  if (urn) return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1]}:${urn[2]}`;

  const slug = url.match(/-(activity|share|ugcPost)-(\d{10,})/) ?? url.match(/(activity):(\d{10,})/);
  if (slug) return `https://www.linkedin.com/embed/feed/update/urn:li:${slug[1]}:${slug[2]}`;

  return null;
}

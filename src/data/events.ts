export interface DespuEvent {
  id: string;
  title: string;
  /** ISO date string, e.g. "2026-09-14" */
  date: string;
  location?: string;
  description: string;
  status: "upcoming" | "completed";
  /**
   * Full Instagram Reel/Post URL, e.g.
   * "https://www.instagram.com/reel/XXXXXXXXXXX/"
   * Leave undefined if the reel isn't posted yet — the card will show a
   * "Reel coming soon" placeholder instead of a broken embed.
   */
  reelUrl?: string;
}

/**
 * HOW TO ADD A NEW EVENT (do this one by one, as each event happens):
 *
 * 1. Copy the shape below and add a new object to the TOP of this array
 *    (newest first).
 * 2. Fill in title, date, location, and a short description.
 * 3. Once the Instagram reel/post is live, paste its URL into `reelUrl`.
 *    Until then, leave it out — the site will show a clean placeholder.
 *
 * Example:
 * {
 *   id: "eureka-kickoff-2026",
 *   title: "Eureka! Kickoff Session",
 *   date: "2026-09-14",
 *   location: "DES Pune University",
 *   description: "Our first campus session introducing NEC and Eureka! to first-time founders.",
 *   status: "completed",
 *   reelUrl: "https://www.instagram.com/reel/XXXXXXXXXXX/",
 * },
 */
export const events: DespuEvent[] = [];

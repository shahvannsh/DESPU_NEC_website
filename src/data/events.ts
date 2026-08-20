export interface DespuEvent {
  id: string;
  title: string;
  /** ISO date string, e.g. "2026-08-27" */
  date: string;
  location?: string;
  /** short blurb shown on the card */
  description: string;
  /** full poster message shown when the poster is clicked */
  fullMessage?: string;
  status: "upcoming" | "completed";
  /** event poster/flyer image */
  image?: string;
  /** external registration link, if still open */
  registerUrl?: string;
  /**
   * Instagram Reel/Post URLs. Add as many as you have — they render as a
   * horizontal, side-by-side scrollable row of real embeds. Leave empty
   * until reels are posted; the card will show a placeholder instead.
   */
  reelUrls: string[];
}

/**
 * HOW TO ADD A NEW EVENT (do this one by one, as each event happens):
 *
 * 1. Add a new object to the TOP of this array (newest first).
 * 2. Fill in title, date, location, description, and fullMessage.
 * 3. Drop the poster image into src/assets/events/ and import it below.
 * 4. Add reel URLs to reelUrls as they get posted — no limit, they scroll.
 */
import eurekaPoster from "../assets/events/eureka-2026.webp";

export const events: DespuEvent[] = [
  {
    id: "eureka-2026",
    title: "EUREKA! — Pitching Competition",
    date: "2026-08-27",
    location: "L-107, Lohia Complex, DES Pune University, Deccan Gymkhana, Pune",
    status: "upcoming",
    image: eurekaPoster,
    description:
      "Asia's largest business model competition. Pitch your idea, get expert feedback, and take it to the national stage.",
    fullMessage: `🚀 EUREKA – PITCHING COMPETITION 🚀
🌏 Asia's Largest Business Model Competition
Pitch Your Idea. Ignite the Future.

EUREKA gives you a platform to pitch your idea, get expert feedback, and take it forward.

📅 DATE: 27 August 2026
📍 VENUE: L-107, Lohia Complex, DES Pune University, Deccan Gymkhana, Pune
⏳ REGISTRATION DEADLINE: 22 August 2026
💰 FEE: ₹100/-

🏆 WHY PARTICIPATE?
🌟 Pitch before an external expert jury
🏅 Top 3 teams get special campus recognition
📜 Certificates for all participants
⚖️ Valuable feedback from industry experts

🏆 PATH TO THE NATIONAL STAGE
The DESPU EUREKA round is the official campus selection round. Winning teams advance to the central EUREKA! 2026 semi-final and national selection stages, evaluated by IIT Bombay.

💰 At the official final stage, winning teams can walk away with cash prizes worth lakhs, equity-free startup grants, additional credits, and investor funding opportunities. Real perks for teams who take their idea all the way.

📌 PARTICIPATION GUIDELINES
• Individual or team (1–7 members)
• Individual innovators encouraged

🎤 PITCH FORMAT
• 2 min pitch + 3 min Q&A
• Shortlisting round followed by Final Pitch

📞 CONTACT:
Mantsha Khan – 77965 80050
Vannsh Shah – 86689 95892

✨ Have an idea? Give it a stage.
🚀 Pitch it. Get noticed. Take it to the national stage.`,
    registerUrl:
      "https://docs.google.com/forms/d/1CXoe_BTgxd3AcZszuJosSvTQDqrVJtUPJZnY0A0vUhw/edit?ts=6a79fc7a",
    reelUrls: [
      "https://www.instagram.com/reel/DcOgIamCkH-/",
      "https://www.instagram.com/reel/DcLg1TyCVE_/",
      "https://www.instagram.com/reel/DcEg_LBiDTQ/",
      "https://www.instagram.com/reel/Db791MWik2T/",
      "https://www.instagram.com/p/Dbd1CMqTmmw/",
      "https://www.instagram.com/reel/DcENFGJieSU/",
    ],
  },
];

export interface DespuEvent {
  id: string;
  title: string;
  /** ISO date string, e.g. "2026-08-27" */
  date: string;
  location?: string;
  /** e.g. "Pitching Competition", "Workshop", "Bootcamp" */
  type?: string;
  /** short blurb shown on the card */
  description: string;
  /** full poster message shown when the poster is clicked */
  fullMessage?: string;
  status: "upcoming" | "completed";
  /** event poster/flyer image */
  image?: string;
  /** external registration link, if still open */
  registerUrl?: string;
  /** key takeaways/highlights — mainly for completed events */
  highlights?: string[];
  /**
   * What actually resulted from this event — ranking, award, milestone.
   * Only fill in once it's real; leave undefined until then.
   */
  outcome?: string;
  /**
   * Photos from the event. Leave empty until you have them — the gallery
   * is hidden entirely rather than shown empty.
   */
  gallery?: string[];
  /**
   * Short video clips from the event (local files, not Instagram). Each
   * entry needs a `src` (served from /public/videos/...) and a `poster`
   * thumbnail (an imported image) shown before playback.
   */
  videoGallery?: { src: string; poster: string }[];
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
import eurekaClip01Poster from "../assets/events/eureka-clips/clip-01.webp";
import eurekaClip02Poster from "../assets/events/eureka-clips/clip-02.webp";
import eurekaClip03Poster from "../assets/events/eureka-clips/clip-03.webp";
import eurekaClip04Poster from "../assets/events/eureka-clips/clip-04.webp";
import eurekaClip05Poster from "../assets/events/eureka-clips/clip-05.webp";
import eurekaClip06Poster from "../assets/events/eureka-clips/clip-06.webp";
import eurekaClip07Poster from "../assets/events/eureka-clips/clip-07.webp";
import eurekaClip08Poster from "../assets/events/eureka-clips/clip-08.webp";
import eurekaClip09Poster from "../assets/events/eureka-clips/clip-09.webp";
import eurekaClip10Poster from "../assets/events/eureka-clips/clip-10.webp";
import eurekaClip11Poster from "../assets/events/eureka-clips/clip-11.webp";
import eurekaClip12Poster from "../assets/events/eureka-clips/clip-12.webp";
import eurekaClip13Poster from "../assets/events/eureka-clips/clip-13.webp";
import eurekaClip14Poster from "../assets/events/eureka-clips/clip-14.webp";
import eurekaClip15Poster from "../assets/events/eureka-clips/clip-15.webp";
import eurekaClip16Poster from "../assets/events/eureka-clips/clip-16.webp";
import eurekaClip17Poster from "../assets/events/eureka-clips/clip-17.webp";
import eurekaClip18Poster from "../assets/events/eureka-clips/clip-18.webp";
import eurekaClip19Poster from "../assets/events/eureka-clips/clip-19.webp";
import eurekaClip20Poster from "../assets/events/eureka-clips/clip-20.webp";
import eurekaClip21Poster from "../assets/events/eureka-clips/clip-21.webp";
import eurekaClip22Poster from "../assets/events/eureka-clips/clip-22.webp";
import eurekaClip23Poster from "../assets/events/eureka-clips/clip-23.webp";
import eurekaClip24Poster from "../assets/events/eureka-clips/clip-24.webp";
import eurekaClip25Poster from "../assets/events/eureka-clips/clip-25.webp";
import eurekaClip26Poster from "../assets/events/eureka-clips/clip-26.webp";
import eurekaClip27Poster from "../assets/events/eureka-clips/clip-27.webp";
import eurekaClip28Poster from "../assets/events/eureka-clips/clip-28.webp";
import eurekaClip29Poster from "../assets/events/eureka-clips/clip-29.webp";
import eurekaClip30Poster from "../assets/events/eureka-clips/clip-30.webp";
import eurekaClip31Poster from "../assets/events/eureka-clips/clip-31.webp";
import eurekaClip32Poster from "../assets/events/eureka-clips/clip-32.webp";
import eurekaClip33Poster from "../assets/events/eureka-clips/clip-33.webp";
import eurekaClip34Poster from "../assets/events/eureka-clips/clip-34.webp";
import eurekaClip35Poster from "../assets/events/eureka-clips/clip-35.webp";
import eurekaClip36Poster from "../assets/events/eureka-clips/clip-36.webp";
import eurekaClip37Poster from "../assets/events/eureka-clips/clip-37.webp";
import eurekaClip38Poster from "../assets/events/eureka-clips/clip-38.webp";
import eurekaClip39Poster from "../assets/events/eureka-clips/clip-39.webp";
import eurekaClip40Poster from "../assets/events/eureka-clips/clip-40.webp";
import eurekaClip41Poster from "../assets/events/eureka-clips/clip-41.webp";

export const events: DespuEvent[] = [
  {
    id: "eureka-2026",
    title: "EUREKA! — Pitching Competition",
    date: "2026-08-27",
    location: "L-107, Lohia Complex, DES Pune University, Deccan Gymkhana, Pune",
    status: "completed",
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
    videoGallery: [
  { src: "/videos/eureka-2026/clip-01.mp4", poster: eurekaClip01Poster },
  { src: "/videos/eureka-2026/clip-02.mp4", poster: eurekaClip02Poster },
  { src: "/videos/eureka-2026/clip-03.mp4", poster: eurekaClip03Poster },
  { src: "/videos/eureka-2026/clip-04.mp4", poster: eurekaClip04Poster },
  { src: "/videos/eureka-2026/clip-05.mp4", poster: eurekaClip05Poster },
  { src: "/videos/eureka-2026/clip-06.mp4", poster: eurekaClip06Poster },
  { src: "/videos/eureka-2026/clip-07.mp4", poster: eurekaClip07Poster },
  { src: "/videos/eureka-2026/clip-08.mp4", poster: eurekaClip08Poster },
  { src: "/videos/eureka-2026/clip-09.mp4", poster: eurekaClip09Poster },
  { src: "/videos/eureka-2026/clip-10.mp4", poster: eurekaClip10Poster },
  { src: "/videos/eureka-2026/clip-11.mp4", poster: eurekaClip11Poster },
  { src: "/videos/eureka-2026/clip-12.mp4", poster: eurekaClip12Poster },
  { src: "/videos/eureka-2026/clip-13.mp4", poster: eurekaClip13Poster },
  { src: "/videos/eureka-2026/clip-14.mp4", poster: eurekaClip14Poster },
  { src: "/videos/eureka-2026/clip-15.mp4", poster: eurekaClip15Poster },
  { src: "/videos/eureka-2026/clip-16.mp4", poster: eurekaClip16Poster },
  { src: "/videos/eureka-2026/clip-17.mp4", poster: eurekaClip17Poster },
  { src: "/videos/eureka-2026/clip-18.mp4", poster: eurekaClip18Poster },
  { src: "/videos/eureka-2026/clip-19.mp4", poster: eurekaClip19Poster },
  { src: "/videos/eureka-2026/clip-20.mp4", poster: eurekaClip20Poster },
      { src: "/videos/eureka-2026/clip-21.mp4", poster: eurekaClip21Poster },
      { src: "/videos/eureka-2026/clip-22.mp4", poster: eurekaClip22Poster },
      { src: "/videos/eureka-2026/clip-23.mp4", poster: eurekaClip23Poster },
      { src: "/videos/eureka-2026/clip-24.mp4", poster: eurekaClip24Poster },
      { src: "/videos/eureka-2026/clip-25.mp4", poster: eurekaClip25Poster },
      { src: "/videos/eureka-2026/clip-26.mp4", poster: eurekaClip26Poster },
      { src: "/videos/eureka-2026/clip-27.mp4", poster: eurekaClip27Poster },
      { src: "/videos/eureka-2026/clip-28.mp4", poster: eurekaClip28Poster },
      { src: "/videos/eureka-2026/clip-29.mp4", poster: eurekaClip29Poster },
      { src: "/videos/eureka-2026/clip-30.mp4", poster: eurekaClip30Poster },
      { src: "/videos/eureka-2026/clip-31.mp4", poster: eurekaClip31Poster },
      { src: "/videos/eureka-2026/clip-32.mp4", poster: eurekaClip32Poster },
      { src: "/videos/eureka-2026/clip-33.mp4", poster: eurekaClip33Poster },
      { src: "/videos/eureka-2026/clip-34.mp4", poster: eurekaClip34Poster },
      { src: "/videos/eureka-2026/clip-35.mp4", poster: eurekaClip35Poster },
      { src: "/videos/eureka-2026/clip-36.mp4", poster: eurekaClip36Poster },
      { src: "/videos/eureka-2026/clip-37.mp4", poster: eurekaClip37Poster },
      { src: "/videos/eureka-2026/clip-38.mp4", poster: eurekaClip38Poster },
      { src: "/videos/eureka-2026/clip-39.mp4", poster: eurekaClip39Poster },
      { src: "/videos/eureka-2026/clip-40.mp4", poster: eurekaClip40Poster },
      { src: "/videos/eureka-2026/clip-41.mp4", poster: eurekaClip41Poster },
    ],
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

export const eurekaEvent = events.find((e) => e.id === "eureka-2026");

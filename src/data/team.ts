import vannsh from "../assets/team/Vannsh_Shah.webp";
import shravani from "../assets/team/Shravani_Kadam.webp";
import namrata from "../assets/team/Namrata.webp";
import radhika from "../assets/team/Radhika.webp";
import sanskruti from "../assets/team/Sanskruti.webp";
import siya from "../assets/team/Siya_Alandkar.webp";
import saee from "../assets/team/Saee.webp";
import shantanu from "../assets/team/Shantanu_Ombhase.webp";
import mantsha from "../assets/team/Mantsha_Khan.webp";
import mitali from "../assets/team/Mitali_Jadhav.webp";
import palak from "../assets/team/Palak.webp";
import rudrani from "../assets/team/Rudrani_Harpale.webp";
import tanishq from "../assets/team/Tanishq.webp";
import saishPagar from "../assets/team/Saish_Pagar.webp";
import priyaSaraf from "../assets/team/Priya_Saraf.webp";
import rahulChidrawar from "../assets/team/Rahul_Chidrawar.webp";
import rishitSinkar from "../assets/team/Rishit_Sinkar.webp";
import pranavDeshmane from "../assets/team/Pranav_Deshmane.webp";
import diyaShah from "../assets/team/Diya_Shah.webp";
import riyaKothari from "../assets/team/Riya_Kothari.webp";
import tusharRathod from "../assets/team/Tushar_Rathod.webp";
import swaraKasurkar from "../assets/team/Swara_Kasurkar.webp";
import yuktiNahar from "../assets/team/Yukti_Nahar.webp";
import { placeholders } from "./placeholders";

export type Category =
  | "ALL"
  | "LEADERSHIP"
  | "TECH"
  | "RESEARCH"
  | "MARKETING"
  | "DESIGN"
  | "BUSINESS";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: Category;
  image?: string;
  imagePlaceholder?: string;
  tagline: string;
  motivation: string;
  expectations: string;
  skills: string[];
  responsibilities: string[];
  /** only set once you have a real one — leave the field out otherwise */
  funFact?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: "Vannsh Shah",
    role: "Campus Ambassador — AI Researcher",
    category: "LEADERSHIP",
    image: vannsh,
    imagePlaceholder: placeholders["Vannsh_Shah"],
    tagline: "Turning our five-month NEC run into a launchpad, not a checklist.",
    motivation:
      "Vannsh sees the National Entrepreneurship Challenge as DESPU's ultimate launchpad — five months of tackling real problems, running workshops, and pushing toward national exposure through Eureka! and the Grand Finale at E-Summit, IIT Bombay.",
    expectations:
      "As Campus Ambassador, his goal is to build a thriving entrepreneurial ecosystem on campus, secure structured mentorship, and connect DESPU's brightest ideas to platforms like Eureka! and E-Summit — bridging classroom theory with real startup execution.",
    skills: ["AI Research", "Leadership", "Startup Strategy"],
    responsibilities: [
      "Represent DES Pune University to E-Cell, IIT Bombay",
      "Drive campus-wide entrepreneurial initiatives",
      "Coordinate national exposure opportunities",
    ],
  },
  {
    id: 2,
    name: "Shravani Kadam",
    role: "Full Stack Developer",
    category: "TECH",
    image: shravani,
    imagePlaceholder: placeholders["Shravani_Kadam"],
    tagline: "Building the tech backbone that turns ideas into working products.",
    motivation:
      "Shravani joined E-Cell to develop an entrepreneurial mindset and explore how ideas become impactful solutions, bringing a Computer Science background focused on AI, technology, and innovation.",
    expectations:
      "She hopes E-Cell becomes a platform where students experiment and build real solutions, and wants to contribute a technology-focused, creative approach that encourages others to explore emerging tech for real-world problems.",
    skills: ["Full Stack Development", "AI", "Problem Solving"],
    responsibilities: [
      "Build and maintain DESPU's technical projects",
      "Support technology-driven initiatives",
      "Mentor peers on development practices",
    ],
  },
  {
    id: 3,
    name: "Namrata Ghogare",
    role: "Visual Designer",
    category: "DESIGN",
    image: namrata,
    imagePlaceholder: placeholders["Namrata"],
    tagline: "Bringing DESPU's ideas to life, one visual at a time.",
    motivation:
      "Namrata joined E-Cell to learn, grow, and contribute to a community of passionate, innovative students — exploring new ideas and working with people who share her enthusiasm for creating impact.",
    expectations:
      "She hopes this journey builds her leadership and communication skills while helping create a more active campus culture where students from every background feel encouraged to participate.",
    skills: ["Visual Design", "Creativity", "Branding"],
    responsibilities: [
      "Design visual assets for campaigns and events",
      "Maintain DESPU's visual identity",
      "Collaborate on creative campus initiatives",
    ],
  },
  {
    id: 4,
    name: "Radhika Sakpal",
    role: "Data Analyst",
    category: "RESEARCH",
    image: radhika,
    imagePlaceholder: placeholders["Radhika"],
    tagline: "Curious about how a simple idea grows into something that matters.",
    motivation:
      "A Computer Science student, Radhika is driven by curiosity about how startups are built and how technology and AI can turn ideas into products that solve real-world problems.",
    expectations:
      "She hopes to make entrepreneurship more approachable through beginner-friendly sessions, and wants to use data and technology to make E-Cell's events more engaging for everyone.",
    skills: ["Data Analysis", "AI", "Research"],
    responsibilities: [
      "Analyze data behind DESPU's initiatives",
      "Support decision-making with insights",
      "Help design beginner-friendly sessions",
    ],
  },
  {
    id: 5,
    name: "Sanskruti Jagtap",
    role: "Brand Voice & Community Manager",
    category: "MARKETING",
    image: sanskruti,
    imagePlaceholder: placeholders["Sanskruti"],
    tagline: "Making E-Cell a space where everyone feels comfortable jumping in.",
    motivation:
      "Sanskruti was drawn to E-Cell by the energy of building something from an idea, wanting to meet people who think differently and learn skills beyond the classroom.",
    expectations:
      "She wants to make E-Cell a space where more students feel comfortable participating — through interactive sessions, team activities, and creatively highlighting student achievements.",
    skills: ["Community Building", "Communication", "Brand Voice"],
    responsibilities: [
      "Shape DESPU's community voice and tone",
      "Run interactive engagement sessions",
      "Highlight student stories and milestones",
    ],
  },
  {
    id: 6,
    name: "Siya Alandkar",
    role: "Campus Ambassador — Events and PR",
    category: "LEADERSHIP",
    image: siya,
    imagePlaceholder: placeholders["Siya_Alandkar"],
    tagline: "Merging analytical thinking with a creative, human voice.",
    motivation:
      "Siya is drawn to the mix of ideas, people, and problem-solving that entrepreneurship demands — pairing her interest in data analytics and AI with a love for writing and clear communication.",
    expectations:
      "She wants to bring data-driven thinking into how DESPU plans and evaluates events, and a stronger, more human creative voice to its content and communication.",
    skills: ["PR & Events", "Data Analytics", "Writing"],
    responsibilities: [
      "Plan and run campus events and PR efforts",
      "Bring analytics into event planning",
      "Craft DESPU's written communication",
    ],
  },
  {
    id: 7,
    name: "Saee Deshpande",
    role: "UI/UX Designer & Developer",
    category: "DESIGN",
    image: saee,
    imagePlaceholder: placeholders["Saee"],
    tagline: "Designing experiences while learning to lead real teams.",
    motivation:
      "As a Computer Engineering student, Saee believes entrepreneurship is about solving real problems and taking initiative — and joined NEC to learn from mentors and gain exposure to the startup ecosystem.",
    expectations:
      "She hopes to understand how ideas become real ventures, build her leadership and problem-solving skills, and grow into a more confident, creative thinker by the end of the journey.",
    skills: ["UI/UX Design", "Frontend Development", "Problem Solving"],
    responsibilities: [
      "Design and build DESPU's digital interfaces",
      "Prototype and test user experiences",
      "Collaborate across design and tech",
    ],
  },
  {
    id: 8,
    name: "Shantanu Ombhase",
    role: "Graphics Designer & Sponsorship / Industry Relations Head",
    category: "DESIGN",
    image: shantanu,
    imagePlaceholder: placeholders["Shantanu_Ombhase"],
    tagline: "Creating content that carries E-Cell's vision further.",
    motivation:
      "Shantanu joined to connect with new people, sharpen his communication skills, and contribute fresh creative ideas that grow the reach and engagement of E-Cell's activities.",
    expectations:
      "He hopes this journey builds his confidence and discipline while teaching him about entrepreneurship, teamwork, leadership, and event management through hands-on experience.",
    skills: ["Graphic Design", "Sponsorship Relations", "Content Creation"],
    responsibilities: [
      "Design graphics for campaigns and events",
      "Manage sponsorship and industry relationships",
      "Keep social platforms active and on-brand",
    ],
  },
  {
    id: 9,
    name: "Mantsha Khan",
    role: "Team Lead & Logistics Manager",
    category: "LEADERSHIP",
    image: mantsha,
    imagePlaceholder: placeholders["Mantsha_Khan"],
    tagline: "Leading with open communication and mutual respect.",
    motivation:
      "Mantsha joined E-Cell for a platform that encourages innovation, leadership, and entrepreneurship — eager to learn from mentors and collaborate with a dedicated team.",
    expectations:
      "As Team Leader, she wants a motivated team where every member feels comfortable sharing ideas, and hopes to build a stronger entrepreneurial culture through accountability and teamwork.",
    skills: ["Team Leadership", "Logistics", "Coordination"],
    responsibilities: [
      "Lead and coordinate the core team",
      "Manage logistics for events and initiatives",
      "Foster a collaborative team culture",
    ],
  },
  {
    id: 10,
    name: "Tanishq Mhaske",
    role: "Event and Photography Lead",
    category: "BUSINESS",
    image: tanishq,
    imagePlaceholder: placeholders["Tanishq"],
    tagline: "Bringing people together through events that leave a mark.",
    motivation:
      "Tanishq is driven by a passion for learning, leadership, and creating meaningful impact — enjoying teamwork, organizing events, and taking initiatives that bring people together.",
    expectations:
      "He hopes NEC 2026 becomes part of an ecosystem that encourages innovation and problem-solving, sharpening his leadership, event management, and networking skills while inspiring fellow students to explore entrepreneurship.",
    skills: ["Event Management", "Photography", "Leadership"],
    responsibilities: [
      "Plan and execute DESPU's events",
      "Lead photography and visual documentation",
      "Coordinate logistics for campus initiatives",
    ],
  },
  {
    id: 11,
    name: "Mitali Jadhav",
    role: "Campus Ambassador — Technical Coordinator",
    category: "TECH",
    image: mitali,
    imagePlaceholder: placeholders["Mitali_Jadhav"],
    tagline: "Noticing the problems others overlook, then building for them.",
    motivation:
      "Mitali came to see entrepreneurship as more than starting a company — it's about noticing overlooked problems and having the courage to build solutions, which is what drew her to E-Cell.",
    expectations:
      "She wants to help create an environment where students feel comfortable sharing ideas, and hopes that by the end of this journey even one student feels inspired to believe in their own idea.",
    skills: ["Technical Coordination", "Leadership", "Community Building"],
    responsibilities: [
      "Coordinate technical execution across teams",
      "Support campus-wide E-Cell initiatives",
      "Organize workshops and startup discussions",
    ],
  },
  {
    id: 13,
    name: "Palak Das",
    role: "Operations Lead",
    category: "BUSINESS",
    image: palak,
    imagePlaceholder: placeholders["Palak"],
    tagline: "Driven to build high-impact solutions and lead as a founder.",
    motivation:
      "Palak is motivated by an intrinsic drive to build high-impact enterprise solutions, sustained through self-discipline, resilience, and complete ownership of every problem she takes on.",
    expectations:
      "She wants E-Cell to operate as a high-velocity launchpad connecting student innovators with industry leaders and mentors, with a focus on guiding founders on IP and innovation support.",
    skills: ["Operations", "Strategy", "IP & Innovation"],
    responsibilities: [
      "Lead operational planning for DESPU",
      "Guide structured IP and innovation support",
      "Drive strategy and events execution",
    ],
  },
  {
    id: 14,
    name: "Rudrani Harpale",
    role: "Experience Designer",
    category: "DESIGN",
    image: rudrani,
    imagePlaceholder: placeholders["Rudrani_Harpale"],
    tagline: "Turning ordinary workshops into memorable journeys.",
    motivation:
      "Rudrani blends creative attention to detail with high-impact execution, aiming to build immersive environments that transform DESPU's workshops into memorable experiences.",
    expectations:
      "She looks forward to a rigorous, high-ownership environment that bridges academic theory with real-world execution, and wants to help DES Pune University stand out at the national stage.",
    skills: ["Experience Design", "Event Planning", "Creative Direction"],
    responsibilities: [
      "Design the end-to-end attendee experience",
      "Craft engaging event pathways",
      "Bring a polished aesthetic to DESPU initiatives",
    ],
  },
  {
    id: 15,
    name: "Saish Pagar",
    role: "President",
    category: "LEADERSHIP",
    image: saishPagar,
    imagePlaceholder: placeholders["Saish_Pagar"],
    tagline: "Setting the strategic roadmap and leading DESPU's executive direction.",
    motivation:
      "Saish leads DESPU as President, chosen for his strong leadership drive, strategic vision, public speaking, and networking capabilities.",
    expectations:
      "As President, he owns DESPU's strategic roadmap and overall vision, represents the team to institutional and external stakeholders, and directs executive decision-making.",
    skills: ["Strategic Leadership", "Public Speaking", "Networking"],
    responsibilities: [
      "Set the strategic roadmap and overall vision",
      "Lead institutional and external stakeholder relationships",
      "Direct executive decision-making",
    ],
  },
  {
    id: 16,
    name: "Priya Saraf",
    role: "Vice President",
    category: "LEADERSHIP",
    image: priyaSaraf,
    imagePlaceholder: placeholders["Priya_Saraf"],
    tagline: "Keeping every team in sync and every NEC deadline on track.",
    motivation:
      "Priya serves as Vice President, bringing high execution efficiency, organizational acumen, and project tracking to how DESPU runs day to day.",
    expectations:
      "She oversees operations and cross-team synergy across DESPU, and tracks compliance with NEC tasks and deadlines.",
    skills: ["Operations", "Project Tracking", "Organization"],
    responsibilities: [
      "Oversee operations and cross-team synergy",
      "Track NEC task compliance and deadlines",
    ],
  },
  {
    id: 17,
    name: "Rahul Chidrawar",
    role: "Secretary",
    category: "LEADERSHIP",
    image: rahulChidrawar,
    imagePlaceholder: placeholders["Rahul_Chidrawar"],
    tagline: "Running the meetings, the timelines, and the events team behind them.",
    motivation:
      "Rahul takes on the Secretary role with strong experience in event management, structured task management, and the ability to perform under pressure.",
    expectations:
      "He manages meetings, directly supervises the Event Head, and plans resources and timelines for DESPU's initiatives.",
    skills: ["Event Management", "Task Management", "Resource Planning"],
    responsibilities: [
      "Manage meetings and documentation",
      "Supervise the Event Head",
      "Plan resources and hold timelines to schedule",
    ],
  },
  {
    id: 18,
    name: "Rishit Sinkar",
    role: "Joint Secretary",
    category: "LEADERSHIP",
    image: rishitSinkar,
    imagePlaceholder: placeholders["Rishit_Sinkar"],
    tagline: "Keeping the record straight and the brand voice consistent.",
    motivation:
      "Rishit serves as Joint Secretary, drawing on strategic communication, team delegation, brand management, and documentation skills.",
    expectations:
      "He documents meetings, oversees the Social Media and Marketing Heads, and keeps DESPU's brand messaging consistent across channels.",
    skills: ["Strategic Communication", "Brand Management", "Documentation"],
    responsibilities: [
      "Document meetings (minutes of meeting)",
      "Oversee Social Media and Marketing Heads",
      "Maintain brand message consistency",
    ],
  },
  {
    id: 19,
    name: "Pranav Deshmane",
    role: "Treasurer",
    category: "BUSINESS",
    image: pranavDeshmane,
    imagePlaceholder: placeholders["Pranav_Deshmane"],
    tagline: "Making sure every rupee DESPU spends is tracked and accounted for.",
    motivation:
      "Pranav manages DESPU's finances as Treasurer, bringing high numerical literacy, proficiency with financial tools, and a detail-oriented mindset.",
    expectations:
      "He allocates budgets, tracks expenses, and drafts financial reports and audits for DESPU.",
    skills: ["Budgeting", "Financial Reporting", "Excel"],
    responsibilities: [
      "Allocate budgets and track expenses",
      "Draft financial reports and audits",
    ],
  },
  {
    id: 20,
    name: "Tushar Rathod",
    role: "Social Media Head",
    category: "MARKETING",
    image: tusharRathod,
    imagePlaceholder: placeholders["Tushar_Rathod"],
    tagline: "Turning DESPU's work into content people actually stop to read.",
    motivation:
      "Tushar leads social media for DESPU, chosen for his understanding of platform algorithms, content design, and engaging digital copywriting.",
    expectations:
      "He plans the content calendar, writes captions and copy, and tracks analytics and audience engagement across DESPU's channels.",
    skills: ["Content Strategy", "Copywriting", "Analytics"],
    responsibilities: [
      "Plan the social media content calendar",
      "Write copy, captions, and track trends",
      "Track analytics and audience engagement",
    ],
  },
  {
    id: 21,
    name: "Yukti Nahar",
    role: "Marketing Head",
    category: "MARKETING",
    image: yuktiNahar,
    imagePlaceholder: placeholders["Yukti_Nahar"],
    tagline: "Taking DESPU off-screen and onto campus, one outreach drive at a time.",
    motivation:
      "Yukti leads marketing for DESPU, bringing persuasive communication, negotiation skills, offline marketing experience, and high energy to the role.",
    expectations:
      "She drives on-ground student outreach, manages sponsorship funds, generates footfall for events, and builds cross-college promotional partnerships.",
    skills: ["Persuasive Communication", "Negotiation", "Offline Marketing"],
    responsibilities: [
      "Run on-ground student outreach drives",
      "Manage sponsorship funds",
      "Generate footfall and execute campaigns",
      "Build cross-college promotional partnerships",
    ],
  },
  {
    id: 22,
    name: "Swara Kasurkar",
    role: "Event Head",
    category: "BUSINESS",
    image: swaraKasurkar,
    imagePlaceholder: placeholders["Swara_Kasurkar"],
    tagline: "The person on the ground keeping every event on schedule.",
    motivation:
      "Swara leads event execution for DESPU, chosen for her adaptability, crisis management, logistics coordination, and ability to command a team on-site.",
    expectations:
      "She plans and schedules events end to end, sets up venues and technical requirements, coordinates the speaker desk and logistics, and troubleshoots in real time during events.",
    skills: ["Event Planning", "Crisis Management", "Logistics"],
    responsibilities: [
      "Plan and schedule events overall",
      "Set up venue and technical requirements on-ground",
      "Coordinate the speaker desk and logistics",
      "Troubleshoot issues in real time during events",
    ],
  },
  {
    id: 23,
    name: "Riya Kothari",
    role: "Creatives Head",
    category: "DESIGN",
    image: riyaKothari,
    imagePlaceholder: placeholders["Riya_Kothari"],
    tagline: "Giving DESPU's ideas a visual identity worth remembering.",
    motivation:
      "Riya leads creative design for DESPU, bringing proficiency in tools like Canva, Photoshop, and Figma along with a strong aesthetic sense.",
    expectations:
      "She designs visual branding, banners, posters, and decks, edits creative for digital campaigns, and shapes the UI/UX aesthetics of DESPU's collateral.",
    skills: ["Graphic Design", "Visual Branding", "UI/UX"],
    responsibilities: [
      "Design visual branding, banners, posters, and decks",
      "Edit creative for digital campaigns",
      "Shape UI/UX aesthetics for club collateral",
    ],
  },
  {
    id: 24,
    name: "Diya Shah",
    role: "HR Head",
    category: "BUSINESS",
    image: diyaShah,
    imagePlaceholder: placeholders["Diya_Shah"],
    tagline: "Keeping the team connected, heard, and working well together.",
    motivation:
      "Diya leads HR for DESPU, bringing empathy, strong interpersonal skills, and a focus on conflict resolution and internal organization.",
    expectations:
      "She manages internal team communication and culture, tracks attendance, and handles member feedback and conflict resolution.",
    skills: ["Internal Communication", "Conflict Resolution", "Team Culture"],
    responsibilities: [
      "Manage internal team communication and culture",
      "Track attendance",
      "Handle member feedback and conflict resolution",
    ],
  },
];

export const categories: Category[] = [
  "ALL",
  "LEADERSHIP",
  "TECH",
  "RESEARCH",
  "MARKETING",
  "DESIGN",
  "BUSINESS",
];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((m) => slugify(m.name) === slug);
}

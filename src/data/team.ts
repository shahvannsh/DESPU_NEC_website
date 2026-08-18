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
import diya from "../assets/team/Diya.webp";
import palak from "../assets/team/Palak.webp";
import rudrani from "../assets/team/Rudrani_Harpale.webp";
import tanishq from "../assets/team/Tanishq.webp";
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
  funFact: string;
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
  },
  {
    id: 12,
    name: "Diya Kadam",
    role: "Content Creator & Graphics Designer",
    category: "MARKETING",
    image: diya,
    imagePlaceholder: placeholders["Diya"],
    tagline: "Making entrepreneurship feel accessible, not intimidating.",
    motivation:
      "As part of DESPU's social media team, Diya wants to make entrepreneurship accessible and practical, simplifying startup concepts through relatable content and authentic student stories.",
    expectations:
      "She hopes for a transparent, well-structured environment with creative freedom, mentorship, and industry exposure that helps the team build a lasting culture of innovation.",
    skills: ["Content Creation", "Graphic Design", "Social Media"],
    responsibilities: [
      "Create content for DESPU's social channels",
      "Design graphics for campaigns",
      "Tell authentic student stories",
    ],
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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
    funFact: "Information coming soon.",
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

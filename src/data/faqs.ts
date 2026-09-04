/**
 * Frequently asked questions for sponsors, judges, mentors, and prospective
 * team members. Grouped by audience via the `category` field so the page
 * can filter. Add real questions as they come up — don't invent answers
 * that aren't true of DESPU.
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "sponsors" | "joining" | "judges";
}

export const faqs: FAQ[] = [
  {
    id: "what-is-despu",
    question: "What is DESPU?",
    answer:
      "DESPU represents the Entrepreneurship Cell (E-Cell) of DES Pune University (Deccan Education Society's Pune University). We are a student-led movement building a vibrant startup ecosystem on campus through collaboration, problem solving, and hands-on venture development.",
    category: "general",
  },
  {
    id: "what-is-nec",
    question: "What is the National Entrepreneurship Challenge (NEC)?",
    answer:
      "The National Entrepreneurship Challenge (NEC) 2026 is a premier nationwide initiative to establish and scale student-run E-Cells across Indian universities. Our team is actively competing across milestones, task submissions, and pitch finals.",
    category: "general",
  },
  {
    id: "how-to-join",
    question: "How can I join the team?",
    answer:
      "DESPU E-Cell recruits passionate DES Pune University students across engineering, management, design, and marketing. Watch out for our campus recruitment drives or reach out directly to the team via ecell.despu@gmail.com.",
    category: "joining",
  },
  {
    id: "how-to-sponsor",
    question: "How can I sponsor or partner with DESPU?",
    answer:
      "We partner with corporate sponsors, alumni entrepreneurs, and startup mentors for event sponsorships, workshops, and student seed funding. Contact our partnerships team at ecell.despu@gmail.com to explore collaboration opportunities.",
    category: "sponsors",
  },
  {
    id: "follow-updates",
    question: "Where can I follow updates?",
    answer:
      "You can follow our latest journey, event announcements, and behind-the-scenes build logs on Instagram (@ecell_despu), LinkedIn (DESPU E-Cell), and through our official website updates.",
    category: "general",
  },
  {
    id: "media-inquiries",
    question: "Who do I contact for media/press inquiries?",
    answer:
      "For press releases, media coverage, or judge evaluations, please write directly to ecell.despu@gmail.com or connect with our leadership team on LinkedIn.",
    category: "judges",
  },
];

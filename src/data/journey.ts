export interface Milestone {
  index: string;
  title: string;
  description: string;
  /** communicates real progress — never mark "completed" unless confirmed */
  status: "completed" | "current" | "upcoming";
  highlights?: string[];
  image?: string;
}

export const journey: Milestone[] = [
  {
    index: "01",
    title: "Team Formation",
    status: "completed",
    description:
      "DESPU comes together — thirteen students from different branches, backgrounds, and skill sets, united around one goal.",
  },
  {
    index: "02",
    title: "Problem Discovery",
    status: "completed",
    description:
      "We start by listening: to peers, mentors, and the campus around us, surfacing the problems worth solving.",
  },
  {
    index: "03",
    title: "Idea Development",
    status: "current",
    description:
      "Raw observations turn into structured ideas, shaped through discussion, research, and early experimentation.",
  },
  {
    index: "04",
    title: "Validation",
    status: "upcoming",
    description:
      "We test our thinking against reality — feedback from mentors, peers, and the wider entrepreneurial ecosystem.",
  },
  {
    index: "05",
    title: "Building",
    status: "upcoming",
    description:
      "From workshops to campaigns to product thinking, we move from plans to things we can actually ship.",
  },
  {
    index: "06",
    title: "NEC Journey",
    status: "upcoming",
    description:
      "Five months representing DES Pune University in E-Cell IIT Bombay's National Entrepreneurship Challenge — Eureka! and the E-Summit Grand Finale.",
  },
];

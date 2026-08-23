/**
 * Content for the "What We're Building" section — centralized here so it
 * can be edited without touching any component code.
 *
 * STATUS: DRAFT. This is grounded in themes that actually appear across
 * the team's own member docs (workshops, mentorship, IP/innovation
 * support, beginner-friendly sessions) — not an invented product. If
 * DESPU has one specific product/idea being pitched for NEC, replace the
 * fields below with that instead. See CONTENT_TO_REVIEW.md.
 */

export interface StartupPillar {
  icon: "graduation" | "network" | "target" | "users";
  title: string;
  description: string;
}

export interface StartupStep {
  label: string;
  detail: string;
}

export interface DevelopmentStage {
  label: string;
  status: "completed" | "current" | "upcoming";
}

export const startup = {
  eyebrow: "What We're Building",
  headline: "Not a Pitch. An Ecosystem.",
  summary:
    "DESPU isn't building a single product for NEC — we're building the entrepreneurial ecosystem at DES Pune University itself: the workshops, mentorship, and momentum that turn students with an idea into founders with a plan.",

  // Optional five-part breakdown (problem / idea / why it matters / approach
  // / vision) — fill these in if/when there's one specific product or pitch
  // to describe, and the section can be reworked to surface them directly.
  problem: "",
  idea: "",
  whyItMatters: "",
  approach: "",
  vision: "",

  /**
   * The qualitative impact this could have — only shown once `problem` and
   * `idea` above are also filled in. No invented statistics.
   */
  impact: "",

  /**
   * Product/startup development stage tracker — deliberately a different
   * model (Ideation → Outcome) from the "Our Journey" NEC timeline, so the
   * two don't duplicate each other. Update `status` as things progress;
   * never mark a stage "completed" before it actually happens.
   */
  developmentStages: [
    { label: "Ideation", status: "current" },
    { label: "Research", status: "upcoming" },
    { label: "Validation", status: "upcoming" },
    { label: "Prototype", status: "upcoming" },
    { label: "Testing", status: "upcoming" },
    { label: "Pitch", status: "upcoming" },
    { label: "Outcome", status: "upcoming" },
  ] as DevelopmentStage[],

  pillars: [
    {
      icon: "graduation",
      title: "Campus Entrepreneurship Culture",
      description:
        "Making entrepreneurship approachable for students who've never pitched an idea before — through beginner-friendly sessions, workshops, and hands-on exposure.",
    },
    {
      icon: "network",
      title: "Mentorship & Industry Access",
      description:
        "Connecting student ideas with mentors, sponsors, and industry leaders — structured support on IP, innovation, and what it actually takes to build something real.",
    },
    {
      icon: "target",
      title: "A National Stage",
      description:
        "Using the NEC journey — Eureka! and the E-Summit Grand Finale at IIT Bombay — as the proving ground for problems worth solving and ideas worth building.",
    },
    {
      icon: "users",
      title: "A Repeatable Pipeline",
      description:
        "Not a one-off event — a lasting system for surfacing problems, testing ideas, and turning DES Pune University students into founders, one cohort at a time.",
    },
  ] satisfies StartupPillar[],

  steps: [
    { label: "Discover", detail: "Surface real problems from campus and community" },
    { label: "Mentor", detail: "Pair ideas with mentors and industry input" },
    { label: "Build", detail: "Turn direction into something testable" },
    { label: "Pitch", detail: "Take it to Eureka! and the E-Summit stage" },
  ] satisfies StartupStep[],

  partnerCta: {
    text: "Mentoring, sponsoring, or partnering with DESPU? We're always looking to connect with people who've built things before.",
    linkLabel: "Get in touch",
    linkHref: "/#contact",
  },
};

import { motion } from "framer-motion";
import { Target, Users2, GraduationCap, Network } from "lucide-react";
import { EASE } from "../lib/motion";

// DRAFT — grounded in what the team actually wrote in their member docs
// (workshops, mentorship, IP/innovation support, beginner-friendly sessions,
// data-driven event planning). Replace with your specific NEC pitch/product
// details once you have them — see DOMAIN_TODO.md-style note below.
const pillars = [
  {
    icon: GraduationCap,
    title: "Campus Entrepreneurship Culture",
    description:
      "Making entrepreneurship approachable for students who've never pitched an idea before — through beginner-friendly sessions, workshops, and hands-on exposure.",
  },
  {
    icon: Network,
    title: "Mentorship & Industry Access",
    description:
      "Connecting student ideas with mentors, sponsors, and industry leaders — structured support on IP, innovation, and what it actually takes to build something real.",
  },
  {
    icon: Target,
    title: "A National Stage",
    description:
      "Using the NEC journey — Eureka! and the E-Summit Grand Finale at IIT Bombay — as the proving ground for problems worth solving and ideas worth building.",
  },
  {
    icon: Users2,
    title: "A Repeatable Pipeline",
    description:
      "Not a one-off event — a lasting system for surfacing problems, testing ideas, and turning DES Pune University students into founders, one cohort at a time.",
  },
];

export default function WhatWereBuilding() {
  return (
    <section className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            What We're Building
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Not a Pitch. An Ecosystem.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            DESPU isn't building a single product for NEC — we're building the
            entrepreneurial ecosystem at DES Pune University itself: the workshops,
            mentorship, and momentum that turn students with an idea into founders
            with a plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                className="glass flex gap-4 rounded-2xl p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

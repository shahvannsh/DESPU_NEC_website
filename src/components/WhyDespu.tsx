import { motion } from "framer-motion";
import { Users2, Cpu, Rocket, Search, Handshake } from "lucide-react";
import { EASE } from "../lib/motion";
import DecryptedText from "./reactbits/DecryptedText";

const pillars = [
  {
    icon: Users2,
    title: "Multidisciplinary",
    description: "Different skills and perspectives, working together toward one goal.",
  },
  {
    icon: Cpu,
    title: "Technology-First",
    description: "Using technology as the default way to turn ideas into working solutions.",
  },
  {
    icon: Rocket,
    title: "Execution-Focused",
    description: "Thinking beyond the idea itself — the work is in actually building it.",
  },
  {
    icon: Search,
    title: "Research-Driven",
    description: "Understanding a problem properly before attempting to solve it.",
  },
  {
    icon: Handshake,
    title: "Collaborative",
    description: "Building together, in the open — not competing in isolation.",
  },
];

export default function WhyDespu() {
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
            <DecryptedText text="Why DESPU" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            How We Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                className="glass flex flex-col gap-3 rounded-2xl p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-accent-cyan">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-sm font-semibold text-white">{p.title}</h3>
                <p className="text-xs leading-relaxed text-white/55">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

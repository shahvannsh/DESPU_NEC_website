import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { EASE } from "../lib/motion";
import { startup } from "../data/startup";

export default function ProblemSolutionImpact() {
  // Hidden until the team fills in a real problem + idea — no filler copy.
  if (!startup.problem || !startup.idea) return null;

  const rows = [
    { icon: AlertCircle, label: "The Problem", text: startup.problem },
    { icon: Lightbulb, label: "Our Solution", text: startup.idea },
    ...(startup.impact ? [{ icon: TrendingUp, label: "The Impact", text: startup.impact }] : []),
  ];

  return (
    <section className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            The Idea
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Problem → Solution → Impact
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {rows.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
                className="glass flex gap-4 rounded-2xl p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-cyan">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-accent-cyan">
                    {r.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{r.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

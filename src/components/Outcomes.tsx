import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { EASE } from "../lib/motion";
import { outcomes } from "../data/results";
import DecryptedText from "./reactbits/DecryptedText";

export default function Outcomes() {
  // Hidden entirely until there's a real result to show.
  if (outcomes.length === 0) return null;

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
            <DecryptedText text="Results" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <div className="mx-auto mt-3 h-px w-10 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            What We've Achieved
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="glass flex flex-col gap-3 rounded-2xl p-6"
            >
              <Trophy className="text-accent-cyan" size={20} />
              <div className="font-display text-2xl font-bold text-gradient">{o.metric}</div>
              <h3 className="font-display text-base font-semibold text-white">{o.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{o.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

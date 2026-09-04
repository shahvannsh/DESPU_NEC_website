import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { team } from "../data/team";
import DecryptedText from "./reactbits/DecryptedText";

export default function TeamCapabilities() {
  // Counts are derived directly from each member's real `skills` array —
  // nothing here is estimated or invented.
  const counts = new Map<string, number>();
  team.forEach((m) => {
    m.skills.forEach((skill) => {
      counts.set(skill, (counts.get(skill) ?? 0) + 1);
    });
  });

  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  if (entries.length === 0) return null;

  const max = entries[0][1];

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-900 dark:text-white px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            <DecryptedText text="Collective Skillset" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <div className="mx-auto mt-3 h-px w-10 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />
          <h2 className="mt-4 font-display text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
            What We Bring Together
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-neutral-700 dark:text-white/80">
            Drawn directly from each team member's actual skills — no estimates.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {entries.map(([skill, count], i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.04 }}
              className="flex items-center gap-4"
            >
              <span className="w-40 shrink-0 text-sm font-medium text-white/90 sm:w-48">{skill}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(count / max) * 100}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 + 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                />
              </div>
              <span className="w-6 shrink-0 text-right text-xs font-semibold text-white/70">{count}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

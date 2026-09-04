import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { EASE } from "../lib/motion";
import { learnings } from "../data/learnings";

const CATEGORY_LABEL: Record<string, string> = {
  product: "Product",
  business: "Business",
  teamwork: "Teamwork",
  research: "Research",
  pitching: "Pitching",
};

export default function LearningLog() {
  if (learnings.length === 0) return null;

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-950 dark:text-white px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3054ff] dark:text-accent-cyan">
            Learning Log
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-neutral-900 dark:text-white sm:text-4xl">
            What We've Learned
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {learnings.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.05 }}
              className="glass flex gap-4 rounded-2xl p-5 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
            >
              <BookOpen className="mt-0.5 shrink-0 text-accent-cyan" size={18} />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-neutral-900 dark:text-white">{l.title}</h3>
                  <span className="rounded-full bg-neutral-200 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-600 dark:text-white/40">
                    {CATEGORY_LABEL[l.category]}
                  </span>
                  {l.event && <span className="text-xs text-neutral-500 dark:text-white/35">{l.event}</span>}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-700 dark:text-white/65">{l.lesson}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { memberVoices } from "../data/memberVoices";

export default function MemberVoices() {
  if (memberVoices.length === 0) return null;

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-950 dark:text-white px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3054ff] dark:text-accent-cyan">
            From The Team
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-neutral-900 dark:text-white sm:text-4xl">
            In Their Own Words
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {memberVoices.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              className="glass rounded-2xl p-6 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
            >
              <p className="text-sm leading-relaxed text-neutral-800 dark:text-white/75">"{v.quote}"</p>
              <p className="mt-4 text-xs font-medium text-neutral-600 dark:text-white/50">
                {v.name} <span className="text-neutral-500 dark:text-white/30">— {v.role}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

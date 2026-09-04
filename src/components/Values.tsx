import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { values } from "../data/values";
import DecryptedText from "./reactbits/DecryptedText";

export default function Values() {
  return (
    <section className="relative bg-white dark:bg-black text-neutral-900 dark:text-white px-6 py-20 sm:py-28 lg:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#3054ff] dark:text-[#22d3ee]">
            <DecryptedText text="What Drives Us" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <h2 className="mt-3 font-sans text-3xl font-semibold text-neutral-900 dark:text-white sm:text-5xl tracking-tight">
            Our Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="group bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#3054ff]/40 dark:hover:border-white/20 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-[#3054ff] dark:text-[#22d3ee] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-neutral-900 dark:text-white tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-[1.65] text-neutral-600 dark:text-neutral-400">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

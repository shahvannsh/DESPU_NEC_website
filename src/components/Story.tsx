import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { story } from "../data/story";
import DecryptedText from "./reactbits/DecryptedText";

export default function Story() {
  if (story.length === 0) return null;

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-black dark:text-white px-6 py-20 sm:py-28 lg:py-32 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#3054ff] dark:text-[#22d3ee]">
            <DecryptedText text="The DESPU Story" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold text-neutral-900 dark:text-white sm:text-5xl tracking-tight">
            How We Got Here
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10">
          {story.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-white/15 rounded-2xl p-6 sm:p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#22d3ee]/40 hover:shadow-xl hover:-translate-y-1 flex flex-col gap-6"
            >
              {s.image && (
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-sans text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    {s.title}
                  </h3>
                  {s.date && (
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-white/70">
                      {s.date}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-sans text-base leading-[1.65] text-neutral-700 dark:text-white/85">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

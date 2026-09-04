import { motion } from "framer-motion";
import { Quote, Link2 } from "lucide-react";
import { EASE } from "../lib/motion";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  // Hidden entirely until real testimonials exist — no placeholder cards.
  if (testimonials.length === 0) return null;

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-900 dark:text-white px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3054ff] dark:text-accent-cyan">
            What Mentors Say
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-neutral-900 dark:text-white sm:text-4xl">
            Voices From Our Journey
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="glass flex flex-col gap-4 rounded-2xl p-6 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
            >
              <Quote className="text-accent-cyan/40" size={22} />
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-white/70">"{t.quote}"</p>
              <div className="mt-auto flex items-center gap-3 border-t border-neutral-200 dark:border-white/10 pt-4">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-200 dark:bg-white/5 text-xs font-semibold text-neutral-600 dark:text-white/50">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{t.name}</p>
                    {t.linkedin && (
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${t.name} on LinkedIn`}
                        className="text-neutral-400 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white"
                      >
                        <Link2 size={13} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-white/45">
                    {t.designation}, {t.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

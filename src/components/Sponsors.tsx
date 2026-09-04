import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { sponsors } from "../data/sponsors";

export default function Sponsors() {
  // Hidden entirely until real sponsors/partners exist.
  if (sponsors.length === 0) return null;

  return (
    <section className="relative bg-white text-neutral-900 dark:bg-base-900 dark:text-white px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3054ff] dark:text-accent-cyan">
            Backed By
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl">
            Sponsors & Partners
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {sponsors.map((s) => {
            const Logo = (
              <img
                src={s.logo}
                alt={s.name}
                loading="lazy"
                className="h-12 w-auto object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-14"
              />
            );
            return s.website ? (
              <a
                key={s.id}
                href={s.website}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.name}
              >
                {Logo}
              </a>
            ) : (
              <div key={s.id}>{Logo}</div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

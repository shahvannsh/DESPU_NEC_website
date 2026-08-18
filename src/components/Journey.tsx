import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { journey } from "../data/journey";

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.69, ease: EASE }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            The Path
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Our Journey
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 sm:left-[19px]" />
          <div className="flex flex-col gap-10">
            {journey.map((m, i) => (
              <motion.div
                key={m.index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.57, ease: EASE, delay: i * 0.05 }}
                className="relative flex gap-6 pl-0"
              >
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-cyan/40 bg-base-900 text-xs font-semibold text-accent-cyan sm:h-10 sm:w-10">
                  {m.index}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/55">
                    {m.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { story } from "../data/story";
import DecryptedText from "./reactbits/DecryptedText";

export default function Story() {
  if (story.length === 0) return null;

  return (
    <section className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            <DecryptedText text="The DESPU Story" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            How We Got Here
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          {story.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="flex flex-col gap-4"
            >
              {s.image && (
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-video w-full rounded-2xl object-cover"
                />
              )}
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {s.title}
                  </h3>
                  {s.date && <span className="text-xs text-white/40">{s.date}</span>}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
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

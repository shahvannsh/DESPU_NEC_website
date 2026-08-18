import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { values } from "../data/values";

export default function Values() {
  return (
    <section className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.69, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            What Drives Us
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Our Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.57, ease: EASE, delay: i * 0.08 }}
                className="glass group rounded-2xl p-6 transition-colors hover:border-accent-cyan/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-accent-cyan transition-colors group-hover:bg-accent-cyan/10">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-base font-semibold text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
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

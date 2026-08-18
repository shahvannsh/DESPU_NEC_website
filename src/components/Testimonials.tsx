import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { EASE } from "../lib/motion";

const placeholders = [1, 2, 3];

export default function Testimonials() {
  return (
    <section className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            What Mentors Say
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Voices From Our Journey
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {placeholders.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="glass flex flex-col gap-4 rounded-2xl border-dashed p-6"
            >
              <Quote className="text-accent-cyan/40" size={22} />
              <p className="text-sm italic leading-relaxed text-white/40">
                Testimonial coming soon — mentor and judge feedback from NEC 2026 will
                appear here.
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5" />
                <div>
                  <div className="h-2.5 w-24 rounded bg-white/10" />
                  <div className="mt-1.5 h-2 w-16 rounded bg-white/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

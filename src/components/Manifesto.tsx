import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { manifesto } from "../data/manifesto";
import BlurText from "./reactbits/BlurText";

export default function Manifesto() {
  if (manifesto.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-white px-6 py-28 lg:px-10">
      {/* Decorative ambient radial glow */}
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#3054ff]/20 via-[#22d3ee]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#3054ff] dark:text-[#22d3ee]"
        >
          The DESPU Manifesto
        </motion.span>

        <div className="mt-10 flex flex-col gap-6">
          {manifesto.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white leading-relaxed"
            >
              <BlurText
                text={line.text}
                animateBy="words"
                direction="top"
                delay={40}
                className="justify-center text-neutral-900 dark:text-white font-sans text-2xl sm:text-4xl font-bold tracking-tight leading-relaxed drop-shadow-sm"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

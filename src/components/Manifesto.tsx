import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { manifesto } from "../data/manifesto";
import DecryptedText from "./reactbits/DecryptedText";

export default function Manifesto() {
  if (manifesto.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-base-900 px-6 py-28 lg:px-10">
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-violet/10 via-accent-blue/5 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
        >
          The DESPU Manifesto
        </motion.span>

        <div className="mt-8 flex flex-col gap-4">
          {manifesto.map((line, i) => (
            <motion.div
              key={line.text}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              className="font-display text-xl font-medium text-white sm:text-2xl"
            >
              <DecryptedText
                text={line.text}
                animateOn="view"
                sequential
                revealDirection="start"
                speed={28}
                className="text-white"
                encryptedClassName="text-accent-cyan/70"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
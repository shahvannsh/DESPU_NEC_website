import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

export default function Vision() {
  return (
    <section
      id="vision"
      style={{ scrollMarginTop: "6rem" }}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-base-950 px-6 py-28 lg:px-10"
    >
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-violet/15 via-accent-blue/10 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-grid bg-[size:64px_64px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-3xl font-semibold leading-tight text-gradient sm:text-5xl">
          We Don't Just Participate.
          <br />
          We Build.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          DESPU represents a generation that sees entrepreneurship not merely as
          starting a company, but as the courage to identify problems, challenge
          assumptions and build solutions that matter.
        </p>
      </motion.div>
    </section>
  );
}

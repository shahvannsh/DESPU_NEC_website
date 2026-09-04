import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import Magnetic from "./Magnetic";
import { SOCIAL_LINKS } from "../data/social";
import WarpText from "./reactbits/WarpText";

export default function CTA() {
  return (
    <section className="relative bg-base-950 px-6 py-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.69, ease: EASE }}
        className="glass mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
      >
        <h2 className="sr-only">Interested In What We're Building?</h2>
        <div className="w-full" style={{ height: 90 }} aria-hidden="true">
          <WarpText
            text="Interested In What We're Building?"
            color="#ffffff"
            fontSize="clamp(1.3rem, 3.2vw, 1.9rem)"
            fontWeight={600}
            warpStrength={0.05}
            pointerStrength={0.25}
            style={{ minHeight: 0, height: "100%" }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#journey"
              className="btn-primary-glow rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3 text-sm font-bold text-black shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
            >
              Follow Our Journey →
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#team"
              className="rounded-full bg-neutral-900 text-white dark:bg-white/10 dark:text-white border border-neutral-700 dark:border-white/20 px-7 py-3 text-sm font-medium transition-colors hover:bg-black dark:hover:bg-white/20"
            >
              Connect With The Team
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-neutral-900 text-white dark:bg-white/10 dark:text-white border border-neutral-700 dark:border-white/20 px-7 py-3 text-sm font-medium transition-colors hover:bg-black dark:hover:bg-white/20"
            >
              Join Our Community
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}

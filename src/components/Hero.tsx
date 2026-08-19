import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE } from "../lib/motion";
import Magnetic from "./Magnetic";

const TAGLINE_WORDS = ["Ideas.", "People.", "Impact."];

export default function Hero() {
  const nodes = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 6 + Math.random() * 6,
  }));

  const { scrollY } = useScroll();
  const orbY = useTransform(scrollY, [0, 800], [0, 160]);
  const gridY = useTransform(scrollY, [0, 800], [0, 60]);
  const contentY = useTransform(scrollY, [0, 800], [0, 40]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-base-950 pt-24"
    >
      {/* grid backdrop */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />

      {/* gradient orb */}
      <motion.div
        style={{ y: orbY }}
        className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-blue/25 via-accent-violet/10 to-transparent blur-3xl"
      />

      {/* floating network nodes */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-60">
        {nodes.map((n, i) =>
          i > 0 ? (
            <line
              key={`l-${n.id}`}
              x1={`${nodes[i - 1].x}%`}
              y1={`${nodes[i - 1].y}%`}
              x2={`${n.x}%`}
              y2={`${n.y}%`}
              stroke="rgba(96,165,250,0.08)"
              strokeWidth="1"
            />
          ) : null
        )}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={`${n.x}%`}
            cy={`${n.y}%`}
            r={2}
            fill="rgba(34,211,238,0.5)"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: n.dur, delay: n.delay, repeat: Infinity }}
          />
        ))}
      </svg>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.69, ease: EASE }}
          className="mb-6 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70"
        >
          National Entrepreneurship Challenge 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="font-display text-6xl font-bold tracking-tight text-gradient sm:text-7xl md:text-8xl"
        >
          DESPU
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-4 font-display text-xl font-medium sm:text-2xl"
        >
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              className="mx-1 inline-block"
              animate={{ color: ["rgba(255,255,255,0.85)", "#22d3ee", "rgba(255,255,255,0.85)"] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                repeatDelay: (TAGLINE_WORDS.length - 1) * 1.2,
                delay: 1 + i * 1.2,
                ease: "easeInOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-5 max-w-xl text-sm text-white/60 sm:text-base"
        >
          A team of young entrepreneurs participating in the National Entrepreneurship
          Challenge, transforming ideas into meaningful solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#team"
              className="rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
            >
              Meet Our Team
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#journey"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              Our Journey
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-white/35"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

export default function Hero() {
  const nodes = Array.from({ length: 26 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    dur: 6 + Math.random() * 6,
  }));

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-base-950 pt-24"
    >
      {/* grid backdrop */}
      <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      {/* gradient orb */}
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-blue/25 via-accent-violet/10 to-transparent blur-3xl" />

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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
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
          className="mt-4 font-display text-xl font-medium text-white/85 sm:text-2xl"
        >
          Ideas. People. Impact.
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
          <a
            href="#team"
            className="rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-7 py-3 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
          >
            Meet Our Team
          </a>
          <a
            href="#journey"
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            Our Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}

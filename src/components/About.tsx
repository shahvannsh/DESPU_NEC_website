import { motion, useInView, animate } from "framer-motion";
import { EASE } from "../lib/motion";
import { useEffect, useRef, useState } from "react";
import DecryptedText from "./reactbits/DecryptedText";

const stats = [
  { value: 23, suffix: "", label: "Team Members" },
  { value: null, suffix: "∞", label: "Ideas" },
  { value: 40, suffix: "+", label: "Moments Captured" },
  { value: null, suffix: "2026", label: "National Challenge" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-white text-neutral-900 dark:bg-black dark:text-white px-6 py-20 sm:py-28 lg:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#3054ff] dark:text-[#22d3ee]">
              <DecryptedText text="About DESPU" animateOn="view" speed={35} maxIterations={12} />
            </span>
            <h2 className="mt-3 font-sans text-3xl font-bold leading-tight text-neutral-900 dark:text-white sm:text-5xl tracking-tight">
              More Than a Team.
              <br />
              <span className="bg-gradient-to-r from-[#3054ff] to-neutral-900 dark:from-[#b4c0ff] dark:to-white bg-clip-text text-transparent">
                A Movement.
              </span>
            </h2>
            <p className="mt-6 font-sans text-base leading-[1.65] text-neutral-800 dark:text-white/90 sm:text-lg font-medium">
              DESPU brings together students who believe entrepreneurship isn't reserved
              for a select few — it's a mindset anyone can build. We practice it through
              collaboration, problem solving, and a willingness to learn in public.
            </p>
            <p className="mt-4 font-sans text-base leading-[1.65] text-neutral-700 dark:text-white/80">
              Representing DES Pune University in the National Entrepreneurship
              Challenge, we're using this journey to sharpen how we identify problems,
              lead teams, and turn raw ideas into something people actually need.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#3054ff]/40 dark:hover:border-white/20 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="font-sans text-4xl font-bold bg-gradient-to-r from-[#3054ff] to-[#22d3ee] dark:from-white dark:to-[#b4c0ff] bg-clip-text text-transparent sm:text-5xl tracking-tight">
                  {s.value !== null ? (
                    <>
                      <Counter to={s.value} />
                      {s.suffix}
                    </>
                  ) : (
                    s.suffix
                  )}
                </div>
                <div className="mt-2 font-sans text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 14, suffix: "", label: "Team Members" },
  { value: 1, suffix: "", label: "Shared Vision" },
  { value: null, suffix: "∞", label: "Ideas" },
  { value: 1, suffix: "", label: "Entrepreneurial Journey" },
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
    <section id="about" className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
              About DESPU
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              More Than a Team.
              <br />A Movement.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60 sm:text-base">
              DESPU brings together students who believe entrepreneurship isn't reserved
              for a select few — it's a mindset anyone can build. We practice it through
              collaboration, problem solving, and a willingness to learn in public.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              Representing DES Pune University in the National Entrepreneurship
              Challenge, we're using this journey to sharpen how we identify problems,
              lead teams, and turn raw ideas into something people actually need.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl px-6 py-8 text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                  {s.value !== null ? <Counter to={s.value} /> : s.suffix}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wide text-white/50">
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

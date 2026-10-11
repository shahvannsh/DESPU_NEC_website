import { motion } from "framer-motion";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { EASE } from "../lib/motion";
import { journey, type Milestone } from "../data/journey";
import DecryptedText from "./reactbits/DecryptedText";

const STATUS_STYLES: Record<
  Milestone["status"],
  { dot: string; label: string; text: string }
> = {
  completed: {
    dot: "border-accent-cyan bg-accent-cyan/15 text-accent-cyan",
    text: "text-white",
    label: "Completed",
  },
  current: {
    dot: "border-accent-cyan bg-accent-cyan text-base-950",
    text: "text-white",
    label: "In Progress",
  },
  upcoming: {
    dot: "border-white/15 bg-base-900 text-white/40",
    text: "text-white/60",
    label: "Upcoming",
  },
};

const STATUS_ICON: Record<Milestone["status"], typeof CheckCircle2> = {
  completed: CheckCircle2,
  current: CircleDot,
  upcoming: Circle,
};

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.69, ease: EASE }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            <DecryptedText text="The Path" animateOn="view" speed={35} maxIterations={12} />
          </span>
          <div className="mx-auto mt-3 h-px w-10 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Our Journey
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 sm:left-[19px]" />
          <div className="flex flex-col gap-10">
            {journey.map((m, i) => {
              const style = STATUS_STYLES[m.status];
              const Icon = STATUS_ICON[m.status];
              return (
                <motion.div
                  key={m.index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.57, ease: EASE, delay: i * 0.05 }}
                  className="relative flex gap-6 pl-0"
                >
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold sm:h-10 sm:w-10 ${style.dot}`}
                  >
                    {m.status === "upcoming" ? m.index : <Icon size={16} />}
                  </div>
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className={`font-display text-lg font-semibold ${style.text}`}>
                        {m.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          m.status === "upcoming"
                            ? "bg-white/5 text-white/35"
                            : "bg-accent-cyan/10 text-accent-cyan"
                        }`}
                      >
                        {style.label}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/55">
                      {m.description}
                    </p>
                    {m.highlights && m.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {m.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-xs text-white/50"
                          >
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-cyan/60" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

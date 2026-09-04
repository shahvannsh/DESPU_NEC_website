import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE } from "../lib/motion";
import { startup } from "../data/startup";

export default function ProductStageTracker() {
  const stages = startup.developmentStages;
  if (!stages || stages.length === 0) return null;

  return (
    <div className="mt-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] p-5 sm:p-6">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-white/40">
        Build Stage
      </h4>
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
            className="flex items-center gap-2"
          >
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                s.status === "completed"
                  ? "bg-accent-cyan/15 text-accent-cyan"
                  : s.status === "current"
                    ? "bg-accent-cyan text-base-950"
                    : "bg-neutral-200 text-neutral-700 dark:bg-white/5 dark:text-white/35"
              }`}
            >
              {s.status === "completed" && <Check size={12} />}
              {s.label}
            </span>
            {i < stages.length - 1 && (
              <span className="text-neutral-400 dark:text-white/15" aria-hidden="true">
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

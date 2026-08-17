import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { team, categories, type Category, type TeamMember } from "../data/team";
import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";

export default function Team() {
  const [filter, setFilter] = useState<Category>("ALL");
  const [active, setActive] = useState<TeamMember | null>(null);

  const filtered =
    filter === "ALL" ? team : team.filter((m) => m.category === filter);

  return (
    <section id="team" className="relative bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Meet DESPU
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            14 minds. Different strengths.
            <br />
            One shared ambition.
          </h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                filter === c
                  ? "bg-white text-base-950"
                  : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <TeamCard member={m} onOpen={() => setActive(m)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <TeamModal member={active} onClose={() => setActive(null)} />
    </section>
  );
}

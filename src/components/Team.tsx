import { useState, useRef, useCallback, useEffect } from "react";
import { Search, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../lib/motion";
import { team, categories, type Category, type TeamMember } from "../data/team";
import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";

interface Point {
  x: number;
  y: number;
}

export default function Team() {
  const [filter, setFilter] = useState<Category>("ALL");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TeamMember | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lines, setLines] = useState<{ from: Point; to: Point }[]>([]);
  const [enableConstellation, setEnableConstellation] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filtered = team.filter((m) => {
    const matchesCategory = filter === "ALL" || m.category === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    // disable the constellation effect on small screens to protect performance
    const check = () => setEnableConstellation(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleHover = useCallback(
    (id: number | null) => {
      setHoveredId(id);
      if (!enableConstellation || id === null || !gridRef.current) {
        setLines([]);
        return;
      }

      const gridBox = gridRef.current.getBoundingClientRect();
      const hoveredEl = cardRefs.current.get(id);
      if (!hoveredEl) return;

      const hb = hoveredEl.getBoundingClientRect();
      const center: Point = {
        x: hb.left - gridBox.left + hb.width / 2,
        y: hb.top - gridBox.top + hb.height / 2,
      };

      const candidates = filtered
        .filter((m) => m.id !== id)
        .map((m) => {
          const el = cardRefs.current.get(m.id);
          if (!el) return null;
          const b = el.getBoundingClientRect();
          const p: Point = {
            x: b.left - gridBox.left + b.width / 2,
            y: b.top - gridBox.top + b.height / 2,
          };
          const dist = Math.hypot(p.x - center.x, p.y - center.y);
          return { p, dist };
        })
        .filter((v): v is { p: Point; dist: number } => v !== null)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3);

      setLines(candidates.map((c) => ({ from: center, to: c.p })));
    },
    [enableConstellation, filtered]
  );

  return (
    <section id="team" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.69, ease: EASE }}
          className="mb-10 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Meet DESPU
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            13 minds. Different strengths.
            <br />
            One shared ambition.
          </h2>
        </motion.div>

        <div className="mx-auto mb-6 max-w-xs">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role..."
              aria-label="Search team members"
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/35 focus:border-accent-cyan/50 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <XIcon size={14} />
              </button>
            )}
          </div>
        </div>

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

        {filtered.length === 0 && (
          <p className="mb-10 text-center text-sm text-white/40">
            No one matches "{query}" — try a different name or role.
          </p>
        )}

        <div ref={gridRef} className="relative">
          {enableConstellation && (
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <AnimatePresence>
                {lines.map((l, i) => (
                  <motion.line
                    key={`${hoveredId}-${i}`}
                    x1={l.from.x}
                    y1={l.from.y}
                    x2={l.to.x}
                    y2={l.to.y}
                    stroke="rgba(34,211,238,0.35)"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                ))}
              </AnimatePresence>
            </svg>
          )}

          <motion.div
            layout
            className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <motion.div
                  key={m.id}
                  layout
                  ref={(el) => {
                    if (el) cardRefs.current.set(m.id, el);
                    else cardRefs.current.delete(m.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: EASE, delay: (i % 8) * 0.04 }}
                  onMouseEnter={() => handleHover(m.id)}
                  onMouseLeave={() => handleHover(null)}
                >
                  <TeamCard member={m} onOpen={() => setActive(m)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <TeamModal member={active} onClose={() => setActive(null)} />
    </section>
  );
}

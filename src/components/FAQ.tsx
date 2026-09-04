import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X as XIcon } from "lucide-react";
import { EASE, fadeUpSm, stagger } from "../lib/motion";
import { faqs, type FAQ as FAQItem } from "../data/faqs";

type CategoryFilter = "all" | FAQItem["category"];
const categories: CategoryFilter[] = ["all", "general", "sponsors", "joining", "judges"];

export default function FAQ() {
  if (faqs.length === 0) return null;

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = category === "all" || faq.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative scroll-mt-24 bg-base-950 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Section Header matching site pattern */}
        <motion.div {...fadeUpSm} className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Knowledge Base
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Questions? Answered.
          </h2>
        </motion.div>

        {/* Search Input matching Team.tsx pattern */}
        <div className="mx-auto mb-6 max-w-md">
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              aria-label="Search questions"
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

        {/* Category Tabs matching Team.tsx pattern */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                category === c
                  ? "bg-white text-base-950 font-bold"
                  : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {/* Empty State matching site search pattern */}
        {filtered.length === 0 && (
          <p className="mb-10 text-center text-sm text-white/40">
            No matching questions — try a different search.
          </p>
        )}

        {/* Accordion List */}
        <div className="space-y-4">
          {filtered.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={stagger(i, 0.05, 0.1)}
                className="glass card-hover overflow-hidden rounded-2xl border border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="font-display text-base font-medium text-white sm:text-lg">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="shrink-0 text-white/40"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-6 pb-6 pt-4 text-sm leading-relaxed text-white/70">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

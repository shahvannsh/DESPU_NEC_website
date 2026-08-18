import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, User, Hash } from "lucide-react";
import { team, slugify } from "../data/team";
import { EASE } from "../lib/motion";

interface Item {
  id: string;
  label: string;
  sublabel?: string;
  kind: "section" | "member";
  action: () => void;
}

const sections = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
  { label: "Follow / Connect", href: "#connect" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onCustomOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goToSection = (href: string) => {
    setOpen(false);
    if (window.location.pathname !== "/") {
      navigate(`/${href}`);
    } else {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items: Item[] = useMemo(() => {
    const sectionItems: Item[] = sections.map((s) => ({
      id: `section-${s.href}`,
      label: s.label,
      kind: "section",
      action: () => goToSection(s.href),
    }));

    const memberItems: Item[] = team.map((m) => ({
      id: `member-${m.id}`,
      label: m.name,
      sublabel: m.role,
      kind: "member",
      action: () => {
        setOpen(false);
        navigate(`/team/${slugify(m.name)}`);
      },
    }));

    return [...sectionItems, ...memberItems];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.sublabel?.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => setActiveIndex(0), [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-base-950/80 px-4 pt-24 backdrop-blur-sm sm:pt-32"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            className="glass w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search size={16} className="shrink-0 text-white/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sections or team members..."
                aria-label="Command palette search"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40 sm:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-white/40">
                  No matches for "{query}"
                </p>
              )}
              {filtered.map((item, i) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === activeIndex ? "bg-white/10 text-white" : "text-white/70"
                  }`}
                >
                  {item.kind === "member" ? (
                    <User size={14} className="shrink-0 text-accent-cyan/70" />
                  ) : (
                    <Hash size={14} className="shrink-0 text-white/30" />
                  )}
                  <span className="flex-1 truncate">
                    {item.label}
                    {item.sublabel && (
                      <span className="ml-2 text-xs text-white/40">{item.sublabel}</span>
                    )}
                  </span>
                  {i === activeIndex && (
                    <ArrowRight size={13} className="shrink-0 text-white/40" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

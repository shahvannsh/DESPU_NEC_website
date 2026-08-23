import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { announcements } from "../data/announcements";

const DISMISSED_KEY = "despu-dismissed-announcements";

function isExpired(expiresAt?: string): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt + "T23:59:59") < new Date();
}

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    try {
      const stored = sessionStorage.getItem(DISMISSED_KEY);
      setDismissed(stored ? JSON.parse(stored) : []);
    } catch {
      setDismissed([]);
    }
    setMounted(true);
  }, []);

  const active = announcements.find(
    (a) => a.active && !isExpired(a.expiresAt) && !dismissed.includes(a.id)
  );

  // Publish this bar's rendered height as a CSS var so the fixed navbar
  // (and a matching spacer in normal document flow) can offset by exactly
  // this amount — keeping everything aligned whether the bar is 1 line or
  // wraps to 2 on a narrow screen, and collapsing cleanly to 0 when hidden.
  useEffect(() => {
    const update = () => {
      const h = active && barRef.current ? barRef.current.offsetHeight : 0;
      document.documentElement.style.setProperty("--announcement-h", `${h}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  const dismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try {
      sessionStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
    } catch {
      // sessionStorage unavailable — dismissal just won't persist, no big deal
    }
  };

  if (!mounted || !active) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={barRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-x-0 top-0 z-[80] text-center text-xs font-medium sm:text-sm ${
          active.type === "urgent"
            ? "bg-gradient-to-r from-accent-blue to-accent-cyan text-base-950"
            : "bg-white/5 text-white/80"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-10 py-2.5">
          <motion.span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              active.type === "urgent" ? "bg-base-950" : "bg-accent-cyan"
            }`}
            animate={reducedMotion ? {} : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>{active.message}</span>
          {active.linkHref && active.linkLabel && (
            <a
              href={active.linkHref}
              className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
            >
              {active.linkLabel}
              <ArrowRight size={12} />
            </a>
          )}
        </div>
        <button
          onClick={() => dismiss(active.id)}
          aria-label="Dismiss announcement"
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors ${
            active.type === "urgent"
              ? "text-base-950/70 hover:text-base-950"
              : "text-white/50 hover:text-white"
          }`}
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import InstagramEmbed from "./InstagramEmbed";

interface Props {
  urls: string[];
  startIndex: number;
  onClose: () => void;
}

export default function ReelViewer({ urls, startIndex, onClose }: Props) {
  const [active, setActive] = useState(startIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const scrollTo = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(urls.length - 1, i));
    itemRefs.current.get(clamped)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [urls.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // jump to the starting reel without an animated scroll on open
    requestAnimationFrame(() => {
      itemRefs.current.get(startIndex)?.scrollIntoView({ block: "start" });
    });
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") scrollTo(active + 1);
      if (e.key === "ArrowUp") scrollTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose, scrollTo]);

  // track which reel is currently centered as the user scrolls/swipes
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root, threshold: [0.6] }
    );
    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [urls.length]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[150] bg-black"
        role="dialog"
        aria-modal="true"
        aria-label="Reel viewer"
      >
        <button
          onClick={onClose}
          aria-label="Close reel viewer"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          <X size={20} />
        </button>

        <div className="absolute left-4 top-4 z-20 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          {active + 1} / {urls.length}
        </div>

        {/* desktop up/down controls */}
        <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
          <button
            onClick={() => scrollTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous reel"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={() => scrollTo(active + 1)}
            disabled={active === urls.length - 1}
            aria-label="Next reel"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <div
          ref={containerRef}
          className="h-full w-full snap-y snap-mandatory overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {urls.map((url, i) => (
            <div
              key={url}
              ref={(el) => {
                if (el) itemRefs.current.set(i, el);
                else itemRefs.current.delete(i);
              }}
              data-index={i}
              className="flex h-full w-full shrink-0 snap-start snap-always items-center justify-center px-4"
            >
              <div className="w-full max-w-[400px]">
                <InstagramEmbed url={url} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

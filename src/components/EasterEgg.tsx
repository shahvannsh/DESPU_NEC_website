import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = ["#22d3ee", "#3b82f6", "#8b5cf6", "#ffffff"];

interface Piece {
  id: number;
  x: number;
  rotate: number;
  color: string;
  delay: number;
}

export default function EasterEgg() {
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const onKey = (e: KeyboardEvent) => {
      // ignore while typing anywhere — the contact form, search boxes, and
      // the command palette all use arrow keys for normal text editing
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;

      const expected = KONAMI[progress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        const next = progress + 1;
        if (next === KONAMI.length) {
          fire();
          setProgress(0);
        } else {
          setProgress(next);
        }
      } else {
        setProgress(key === KONAMI[0] ? 1 : 0);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [progress]);

  const fire = () => {
    const newPieces: Piece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      rotate: Math.random() * 720 - 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.4,
    }));
    setPieces(newPieces);
    setTriggered(true);
    setTimeout(() => {
      setTriggered(false);
      setPieces([]);
    }, 2600);
  };

  return (
    <AnimatePresence>
      {triggered && (
        <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", rotate: p.rotate, opacity: [1, 1, 0] }}
              transition={{ duration: 2.2, delay: p.delay, ease: "easeIn" }}
              className="absolute h-2.5 w-2.5"
              style={{ backgroundColor: p.color, top: 0 }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base-950/90 px-6 py-3 text-center font-display text-sm font-semibold text-white shadow-xl"
          >
            You found it. Built with curiosity — like everything else here. 🚀
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

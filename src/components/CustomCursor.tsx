import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, [role="button"], .cursor-hover';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  // raw pointer position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // ring lags slightly behind the dot for a soft trailing feel
  const ringX = useSpring(x, { damping: 28, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 260, mass: 0.5 });

  // the big ambient glow lags even more, for a slow trailing aura
  const glowX = useSpring(x, { damping: 22, stiffness: 90, mass: 0.8 });
  const glowY = useSpring(y, { damping: 22, stiffness: 90, mass: 0.8 });

  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reducedMotion || isTouch) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setHovering(!!el?.closest(INTERACTIVE_SELECTOR));
      });
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      {/* ambient trailing glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 260 : 180,
          height: hovering ? 260 : 180,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.06) 45%, transparent 75%)",
          transition: "width 0.4s ease, height 0.4s ease",
        }}
      />

      {/* outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          borderColor: hovering ? "rgba(34,211,238,0.6)" : "rgba(255,255,255,0.35)",
          borderWidth: 1.5,
          scale: pressed ? 0.85 : 1,
          transition:
            "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease, scale 0.15s ease",
        }}
      />

      {/* core dot */}
      <motion.div
        className="absolute rounded-full bg-accent-cyan"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 6 : 7,
          height: hovering ? 6 : 7,
          scale: pressed ? 1.6 : 1,
          transition: "scale 0.15s ease",
        }}
      />
    </div>
  );
}

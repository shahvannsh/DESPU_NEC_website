// Shared Framer Motion presets for consistent, smooth animation feel.
export const EASE = [0.22, 1, 0.36, 1] as const; // expo-out — smooth deceleration

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: EASE },
};

export const fadeUpSm = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE },
};

export const stagger = (i: number, base = 0.07, delayChildren = 0) => ({
  duration: 0.6,
  delay: delayChildren + i * base,
  ease: EASE,
});

export const springSmooth = { type: "spring" as const, damping: 26, stiffness: 220, mass: 0.9 };
export const springSnappy = { type: "spring" as const, damping: 30, stiffness: 340, mass: 0.7 };

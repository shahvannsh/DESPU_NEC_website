// Shared Framer Motion presets & tokens for consistent, smooth animation feel.
export const DURATION_FAST = 0.2;
export const DURATION_DEFAULT = 0.3;
export const DURATION_SLOW = 0.5;

export const EASE = [0.22, 1, 0.36, 1] as const; // expo-out — smooth deceleration
export const EASE_OUT = EASE;

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: DURATION_SLOW + 0.3, ease: EASE },
};

export const fadeUpSm = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: DURATION_SLOW + 0.1, ease: EASE },
};

export const stagger = (i: number, base = 0.07, delayChildren = 0) => ({
  duration: DURATION_SLOW + 0.1,
  delay: delayChildren + i * base,
  ease: EASE,
});

export const springSmooth = { type: "spring" as const, damping: 26, stiffness: 220, mass: 0.9 };
export const springSnappy = { type: "spring" as const, damping: 30, stiffness: 340, mass: 0.7 };


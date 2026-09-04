import { type HTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className = "", ...props }: SkeletonProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`bg-black/10 dark:bg-white/10 rounded-lg ${className}`}
        {...props}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 ${className}`}
      {...props}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent"
        animate={{ translateX: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "linear",
        }}
      />
    </div>
  );
}

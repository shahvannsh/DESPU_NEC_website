import { motion, useReducedMotion } from "framer-motion";

interface LoaderProps {
  label?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function Loader({ label, size = 48, fullScreen = false }: LoaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-black dark:text-white transition-colors"
        aria-hidden="true"
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <path d="M12 0L14 8.5L22.5 6L16.5 12L22.5 18L14 15.5L12 24L10 15.5L1.5 18L7.5 12L1.5 6L10 8.5L12 0Z" />
      </motion.svg>
      {label && (
        <span className="mt-4 font-sans text-sm text-black/50 dark:text-white/50">
          {label}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
        {content}
      </div>
    );
  }

  return content;
}

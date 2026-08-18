import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE } from "../lib/motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-base-950 px-6">
      <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-blue/15 via-accent-violet/10 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <span className="font-display text-8xl font-bold text-gradient sm:text-9xl">
          404
        </span>
        <h1 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">
          This page hasn't been built yet.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-white/55">
          The page you're looking for doesn't exist, or the link might be
          outdated. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import ParticleText from "../components/reactbits/ParticleText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-neutral-900 dark:text-white px-6">
      {/* Decorative Radial Gradients (subtle opacity-40) */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-200/20 dark:bg-blue-900/15 blur-[120px] mix-blend-screen pointer-events-none opacity-40" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-200/20 dark:bg-indigo-900/15 blur-[120px] mix-blend-screen pointer-events-none opacity-40" />

      {/* Content Container with Entrance Staggers */}
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        {/* 1. Large 404 with ParticleText / Brand Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="h-36 w-full max-w-xs sm:h-44 flex items-center justify-center"
        >
          <ParticleText
            text="404"
            color="#3054ff"
            highlightColor="#b4c0ff"
            fontSize="clamp(5rem, 16vw, 8rem)"
            fontWeight={800}
            trigger="mount"
            glow
          />
        </motion.div>

        {/* 2. Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-2xl font-semibold text-neutral-900 dark:text-white sm:text-3xl tracking-tight"
        >
          This page took a wrong turn
        </motion.h1>

        {/* 3. Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 text-base text-black/60 dark:text-white/60 font-sans leading-relaxed"
        >
          The page you're looking for doesn't exist, or the link might be outdated.
        </motion.p>

        {/* 4. CTAs (Primary & Secondary buttons reusing Hero button design system) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/"
            className="pl-6 pr-2 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center gap-3 transition-all duration-300 hover:scale-105 group cursor-pointer shadow-lg"
          >
            <span className="font-sans font-bold text-base text-white dark:text-black">
              Back to Home
            </span>
            <div className="w-[36px] h-[36px] rounded-full bg-[#3054ff] hover:bg-[#2040e0] flex items-center justify-center transition-colors shrink-0">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
          </Link>

          <a
            href="/#contact"
            className="text-neutral-900 dark:text-white backdrop-blur-sm hover:bg-black/5 dark:hover:bg-white/10 px-5 py-2.5 rounded-full flex items-center font-sans font-bold transition-all border border-neutral-300 dark:border-white/20"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}

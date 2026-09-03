import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BlurText from "./reactbits/BlurText";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc =
    "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden flex flex-col justify-center items-center pt-20 pb-16">
      {/* BACKGROUND VIDEO LAYER */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none z-0"
      />

      {/* VIDEO OVERLAY */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* DECORATIVE GRADIENTS */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-[120px] mix-blend-screen pointer-events-none z-0" />

      {/* CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10 mt-20 space-y-12 px-4">
        {/* 1. Pre-headline */}
        <BlurText
          text="Design at the speed of thought"
          className="font-serif text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-black dark:text-white justify-center"
          delay={150}
          animateBy="words"
          direction="top"
        />

        {/* 2. Main headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-neutral-900 via-neutral-900 to-[#3054ff] dark:from-white dark:via-white dark:to-[#b4c0ff] bg-clip-text text-transparent"
        >
          Build Faster
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-sans text-lg sm:text-[20px] leading-[1.65] text-black/70 dark:text-white max-w-xl"
        >
          Create fully functional, SEO-optimized websites in seconds with our
          advanced AI engine.
        </motion.p>

        {/* 4. CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          {/* Primary Button */}
          <a
            href="#start"
            className="pl-6 pr-2 py-2 rounded-full bg-black dark:bg-white flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 group cursor-pointer"
          >
            <span className="font-sans font-medium text-lg text-white dark:text-[#0a0400]">
              Start Building Free
            </span>
            <div className="w-[40px] h-[40px] rounded-full bg-[#3054ff] hover:bg-[#2040e0] flex items-center justify-center transition-colors shrink-0">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </a>

          {/* Secondary Button */}
          <a
            href="#examples"
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white backdrop-blur-sm hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded-lg flex items-center font-sans font-medium transition-all group cursor-pointer"
          >
            See Examples
            <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

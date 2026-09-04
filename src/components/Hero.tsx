import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlurText from "./reactbits/BlurText";
import ShinyText from "./reactbits/ShinyText";
import TextCursor from "./reactbits/TextCursor";
import Magnetic from "./Magnetic";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc =
    "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark") ||
          !document.documentElement.classList.contains("light")
      );
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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
    <section className="relative w-full min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden flex flex-col justify-center items-center pt-24 pb-16">
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
      <div className="absolute inset-0 bg-white/70 dark:bg-black/65 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* DECORATIVE GRADIENTS */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-200/30 dark:bg-blue-900/25 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 dark:bg-indigo-900/25 blur-[120px] mix-blend-screen pointer-events-none z-0" />

      {/* REACT BITS: Floating Text Cursor */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 z-20 hidden h-1/2 lg:block opacity-40">
        <TextCursor text="✦" spacing={140} maxPoints={4} exitDuration={0.4} />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10 mt-16 space-y-10 px-4">
        {/* REACT BITS: ShinyText Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full border border-black/20 dark:border-white/30 bg-black/5 dark:bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase backdrop-blur-md shadow-sm"
        >
          <ShinyText
            text="NATIONAL ENTREPRENEURSHIP CHALLENGE 2026"
            speed={2.5}
            color={isDark ? "#ffffff" : "#1e293b"}
            shineColor={isDark ? "#93c5fd" : "#3054ff"}
          />
        </motion.div>

        {/* 1. Pre-headline (BlurText) */}
        <BlurText
          text="Ideas. People. Impact."
          className="font-serif text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-black dark:text-white justify-center tracking-tight font-normal"
          delay={150}
          animateBy="words"
          direction="top"
        />

        {/* 2. Main headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-neutral-900 via-neutral-900 to-[#3054ff] dark:from-white dark:via-neutral-100 dark:to-[#b4c0ff] bg-clip-text text-transparent"
        >
          DESPU NEC
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-sans text-lg sm:text-[20px] leading-[1.65] text-neutral-800 dark:text-neutral-200 max-w-xl font-normal"
        >
          A team of young entrepreneurs representing DES Pune University in the
          National Entrepreneurship Challenge, transforming ideas into high-impact ventures.
        </motion.p>

        {/* 4. CTA buttons with React Bits / Magnetic attraction & Crisp High-Contrast Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center pt-2"
        >
          {/* Primary Button: White Pill with High-Contrast Dark Text & Blue Arrow */}
          <Magnetic>
            <a
              href="#team"
              className="pl-6 pr-2 py-2 rounded-full bg-white dark:bg-white flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_24px_rgba(48,84,255,0.4)] hover:scale-105 group cursor-pointer shadow-lg border border-neutral-200 dark:border-white/20"
            >
              <span className="font-sans font-bold text-lg text-black dark:text-black">
                Meet Our Team
              </span>
              <div className="w-[40px] h-[40px] rounded-full bg-[#3054ff] hover:bg-[#2040e0] flex items-center justify-center transition-colors shrink-0">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </a>
          </Magnetic>

          {/* Secondary Button: High-Contrast Dark Button with Crisp White Text */}
          <Magnetic>
            <a
              href="#journey"
              className="bg-black text-white hover:bg-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900 backdrop-blur-md px-6 py-3 rounded-full flex items-center font-sans font-bold transition-all group cursor-pointer border border-neutral-800 dark:border-white/20 shadow-md"
            >
              <span className="text-white">Our Journey</span>
              <ArrowRight className="w-4 h-4 ml-2 inline-block group-hover:translate-x-1 transition-transform text-white" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

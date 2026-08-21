import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { events } from "../data/events";
import { EASE } from "../lib/motion";
import InstagramEmbed from "./InstagramEmbed";
import ReelViewer from "./ReelViewer";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

export default function Reels() {
  const reelUrls = events.flatMap((e) => e.reelUrls);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <section id="reels" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            From The Feed
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Reels
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
            Behind-the-scenes and on-the-ground moments from DESPU, straight from Instagram.
            Tap any reel to watch them one after another, just like the app.
          </p>
        </motion.div>

        {reelUrls.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border-dashed p-10 text-center"
          >
            <InstagramGlyph />
            <p className="text-sm text-white/50">
              Our first reels are coming soon. Check back here as they go up.
            </p>
          </motion.div>
        ) : (
          <div className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:thin]">
            {reelUrls.map((url, i) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 6) * 0.07 }}
                whileHover={{ y: -4 }}
                className="group relative w-[260px] shrink-0 transition-transform sm:w-[300px]"
              >
                <button
                  onClick={() => setViewerIndex(i)}
                  aria-label="Watch reels in fullscreen viewer"
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/0 transition-colors group-hover:bg-black/30"
                >
                  <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
                    <Play size={20} className="ml-0.5 fill-base-950 text-base-950" />
                  </span>
                </button>
                <InstagramEmbed url={url} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {viewerIndex !== null && (
        <ReelViewer
          urls={reelUrls}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
}

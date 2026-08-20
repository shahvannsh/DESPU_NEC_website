import { motion } from "framer-motion";
import { events } from "../data/events";
import { EASE } from "../lib/motion";
import InstagramEmbed from "./InstagramEmbed";

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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:thin]"
          >
            {reelUrls.map((url) => (
              <div key={url} className="w-[260px] shrink-0 sm:w-[300px]">
                <InstagramEmbed url={url} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

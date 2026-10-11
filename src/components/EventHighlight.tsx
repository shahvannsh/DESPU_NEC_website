import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { eurekaEvent } from "../data/events";

/**
 * A simple, reliable highlight strip using real footage from Eureka 2026.
 * Replaces an earlier scroll-pinned effect that rendered a large empty
 * gap and cropped the wrong kind of image (a text-heavy poster). This
 * version just autoplays a few real muted clips side by side — no
 * scroll-jacking, no dependency on image content being photo-like.
 */
export default function EventHighlight() {
  const clips = eurekaEvent?.videoGallery?.slice(0, 4) ?? [];
  if (clips.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-base-950 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Straight From Eureka! 2026
          </span>
          <div className="mx-auto mt-3 h-px w-10 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Built on the ground
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            Every session, every pitch, every late night — this is DESPU in motion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {clips.map((clip, i) => (
            <motion.div
              key={clip.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
              className="aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-base-900"
            >
              <video
                src={clip.src}
                poster={clip.poster}
                muted
                loop
                autoPlay
                playsInline
                preload="none"
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

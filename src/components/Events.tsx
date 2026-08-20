import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
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

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function Events() {
  return (
    <section id="events" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            On The Ground
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Events
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
            Sessions, workshops, and milestones from the DESPU journey — updated as they
            happen, with reels from the ground.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border-dashed p-10 text-center"
          >
            <Calendar className="text-accent-cyan/40" size={26} />
            <p className="text-sm text-white/50">
              Our first event drop is coming soon. Check back here as things happen.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 6) * 0.06 }}
                className="glass flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="flex flex-col gap-2 p-5 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        event.status === "upcoming"
                          ? "bg-accent-cyan/15 text-accent-cyan"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {event.status === "upcoming" ? "Upcoming" : "Completed"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Calendar size={12} />
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {event.title}
                  </h3>
                  {event.location && (
                    <span className="flex items-center gap-1 text-xs text-white/45">
                      <MapPin size={12} />
                      {event.location}
                    </span>
                  )}
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {event.description}
                  </p>
                </div>

                <div className="mt-auto p-5 pt-2">
                  {event.reelUrl ? (
                    <InstagramEmbed url={event.reelUrl} />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-8 text-center text-white/25">
                      <InstagramGlyph />
                      <span className="text-xs text-white/35">Reel coming soon</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

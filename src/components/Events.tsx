import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { events, type DespuEvent } from "../data/events";
import { EASE } from "../lib/motion";
import EventModal from "./EventModal";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function Events() {
  const [active, setActive] = useState<DespuEvent | null>(null);

  return (
    <section id="events" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
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
          <div className="flex flex-col gap-10">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 4) * 0.08 }}
                className="glass grid grid-cols-1 gap-0 overflow-hidden rounded-2xl lg:grid-cols-[340px_1fr]"
              >
                {/* poster */}
                {event.image && (
                  <button
                    onClick={() => setActive(event)}
                    className="group relative block aspect-[3/4] w-full overflow-hidden bg-base-800 lg:aspect-auto lg:h-full"
                    aria-label={`View full details for ${event.title}`}
                  >
                    <img
                      src={event.image}
                      alt={`${event.title} poster`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-base-950/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs font-medium text-white">Tap for full details</span>
                    </div>
                  </button>
                )}

                <div className="flex flex-col gap-4 p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
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
                    {event.location && (
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <MapPin size={12} />
                        {event.location}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {event.description}
                    </p>
                    <button
                      onClick={() => setActive(event)}
                      className="mt-2 text-xs font-medium text-accent-cyan hover:text-accent-cyan/80"
                    >
                      Read full details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <EventModal event={active} onClose={() => setActive(null)} />
    </section>
  );
}

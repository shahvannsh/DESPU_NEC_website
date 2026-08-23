import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, ExternalLink, CheckCircle2 } from "lucide-react";
import type { DespuEvent } from "../data/events";

interface Props {
  event: DespuEvent | null;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function EventModal({ event, onClose }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose, lightbox]);

  return createPortal(
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-base-950/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${event.title} details`}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 200, mass: 0.85 }}
            className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>

            {event.image && (
              <img
                src={event.image}
                alt={`${event.title} poster`}
                className="max-h-[45vh] w-full object-contain bg-base-950"
              />
            )}

            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {event.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDate(event.date)}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-relaxed text-white/70">
                {event.fullMessage || event.description}
              </p>

              {event.outcome && (
                <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                    Outcome
                  </h4>
                  <p className="text-sm text-white/80">{event.outcome}</p>
                </div>
              )}

              {event.highlights && event.highlights.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Highlights
                  </h4>
                  <ul className="space-y-1.5">
                    {event.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-white/70">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent-cyan" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.gallery && event.gallery.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Photos
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {event.gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setLightbox(src)}
                        className="aspect-square overflow-hidden rounded-lg bg-base-800 transition-opacity hover:opacity-80"
                        aria-label={`View photo ${i + 1} from ${event.title}`}
                      >
                        <img
                          src={src}
                          alt={`${event.title} photo ${i + 1}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {event.registerUrl && (
                <a
                  href={event.registerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
                >
                  Register Now
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>

          {/* photo lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(null);
                }}
              >
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo"
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <X size={20} />
                </button>
                <img
                  src={lightbox}
                  alt=""
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

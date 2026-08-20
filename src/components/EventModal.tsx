import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, ExternalLink } from "lucide-react";
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
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

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
            transition={{ type: "spring", damping: 26, stiffness: 240, mass: 0.9 }}
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
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

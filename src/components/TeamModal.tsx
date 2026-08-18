import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Link2, Code2, AtSign, ArrowUpRight } from "lucide-react";
import { slugify, type TeamMember } from "../data/team";
import ProgressiveImage from "./ProgressiveImage";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: Props) {
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-base-950/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${member.name} profile`}
        >
          <motion.div
            layoutId={`card-${member.id}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 240, mass: 0.9 }}
            className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close profile"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="grid gap-0 sm:grid-cols-[280px_1fr]">
              <div className="relative aspect-square w-full overflow-hidden bg-base-800 sm:aspect-auto sm:h-full">
                {member.image ? (
                  <ProgressiveImage
                    src={member.image}
                    placeholder={member.imagePlaceholder}
                    alt={`${member.name}, ${member.role}`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/20">
                    <User size={64} />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent-cyan">
                    {member.role}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    About
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {member.motivation}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {member.expectations}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Skills
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Responsibilities
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {member.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Fun Fact
                  </h4>
                  <p className="mt-2 text-sm text-white/70">{member.funFact}</p>
                </div>

                {(member.linkedin || member.github || member.instagram) && (
                  <div className="flex gap-4 border-t border-white/10 pt-5">
                    {member.linkedin && (
                      <a href={member.linkedin} aria-label="LinkedIn" className="text-white/60 hover:text-white">
                        <Link2 size={18} />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} aria-label="GitHub" className="text-white/60 hover:text-white">
                        <Code2 size={18} />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} aria-label="Instagram" className="text-white/60 hover:text-white">
                        <AtSign size={18} />
                      </a>
                    )}
                  </div>
                )}

                <Link
                  to={`/team/${slugify(member.name)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 border-t border-white/10 pt-5 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-cyan/80"
                >
                  View full profile page
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

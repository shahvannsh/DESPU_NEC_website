import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";import { motion } from "framer-motion";
import { ArrowLeft, User, Link2, Code2, AtSign } from "lucide-react";
import { getMemberBySlug, team, slugify } from "../data/team";
import { EASE } from "../lib/motion";

export default function TeamPage() {
  const { slug } = useParams<{ slug: string }>();
  const member = slug ? getMemberBySlug(slug) : undefined;

  useEffect(() => {
    if (member) {
      document.title = `${member.name} — DESPU`;
      window.scrollTo({ top: 0 });

      const desc = document.querySelector('meta[name="description"]');
      const prevDesc = desc?.getAttribute("content") ?? "";
      if (desc) {
        desc.setAttribute(
          "content",
          `${member.name}, ${member.role} at DESPU — National Entrepreneurship Challenge, DES Pune University.`
        );
      }

      return () => {
        document.title = "DESPU — National Entrepreneurship Challenge";
        if (desc) desc.setAttribute("content", prevDesc);
      };
    }
  }, [member]);

  if (!member) return <Navigate to="/404" replace />;

  const idx = team.findIndex((m) => m.id === member.id);
  const next = team[(idx + 1) % team.length];

  return (
    <div className="min-h-screen bg-base-950 px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/#team"
          className="no-print mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Team
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass overflow-hidden rounded-3xl"
        >
          <div className="grid gap-0 sm:grid-cols-[320px_1fr]">
            <div className="relative aspect-square w-full overflow-hidden bg-base-800 sm:aspect-auto sm:h-full sm:min-h-[420px]">
              {member.image ? (
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white/20">
                  <User size={64} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-7 p-7 sm:p-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                  {member.category}
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                  {member.name}
                </h1>
                <p className="mt-1 text-sm font-medium text-white/60">{member.role}</p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  About
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {member.motivation}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {member.expectations}
                </p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Skills
                </h2>
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
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Responsibilities
                </h2>
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
                <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Fun Fact
                </h2>
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
            </div>
          </div>
        </motion.div>

        <div className="no-print mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-xs uppercase tracking-wide text-white/40">Next up</span>
          <Link
            to={`/team/${slugify(next.name)}`}
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            {next.name} →
          </Link>
        </div>
      </div>
    </div>
  );
}

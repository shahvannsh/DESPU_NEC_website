import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Link2,
  Code2,
  AtSign,
  Share2,
  Check,
} from "lucide-react";
import { getMemberBySlug, team, slugify } from "../data/team";
import { EASE } from "../lib/motion";
import ProgressiveImage from "../components/ProgressiveImage";

export default function TeamPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const member = slug ? getMemberBySlug(slug) : undefined;
  const [copied, setCopied] = useState(false);

  const idx = member ? team.findIndex((m) => m.id === member.id) : -1;
  const next = idx >= 0 ? team[(idx + 1) % team.length] : undefined;
  const prev = idx >= 0 ? team[(idx - 1 + team.length) % team.length] : undefined;

  const goTo = useCallback(
    (m: typeof next) => {
      if (m) navigate(`/team/${slugify(m.name)}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (member) {
      document.title = `${member.name} — DESPU`;
      window.scrollTo({ top: 0 });

      // Best-effort: updates the live DOM's meta description for anything that
      // reads it client-side. Most link-preview crawlers (WhatsApp, Twitter,
      // Discord) don't execute JS, so a shared link still shows the site-wide
      // OG image rather than this person's photo — true per-page previews
      // need server-side rendering, which this static SPA doesn't have.
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(next);
      if (e.key === "ArrowLeft") goTo(prev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: member ? `${member.name} — DESPU` : "DESPU",
      text: member ? `Check out ${member.name}'s profile on DESPU.` : "",
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!member) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-base-950 px-6 pb-24 pt-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="no-print mb-8 flex items-center justify-between">
          <Link
            to="/#team"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Team
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Share this profile"
          >
            {copied ? (
              <>
                <Check size={14} className="text-accent-cyan" />
                Link copied
              </>
            ) : (
              <>
                <Share2 size={14} />
                Share
              </>
            )}
          </button>
        </div>

        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass overflow-hidden rounded-3xl"
        >
          <div className="grid gap-0 sm:grid-cols-[320px_1fr]">
            <div className="relative aspect-square w-full overflow-hidden bg-base-800 sm:aspect-auto sm:h-full sm:min-h-[420px]">
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
          <button
            onClick={() => goTo(prev)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            aria-label={`Previous: ${prev?.name}`}
          >
            <ArrowLeft size={14} />
            {prev?.name}
          </button>
          <span className="hidden text-[11px] uppercase tracking-wide text-white/30 sm:inline">
            Use ← → to browse
          </span>
          <button
            onClick={() => goTo(next)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            aria-label={`Next: ${next?.name}`}
          >
            {next?.name}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

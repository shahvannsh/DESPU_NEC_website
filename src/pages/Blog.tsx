import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenSquare, AlertCircle, FileText, ExternalLink } from "lucide-react";
import { EASE } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { supabase, isSupabaseConfigured, type BlogPost } from "../lib/supabase";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import { linkedinPosts } from "../data/linkedinPosts";
import { SOCIAL_LINKS } from "../data/social";
import { getLinkedInEmbedUrl } from "../lib/linkedin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function LinkedinGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.75h4.96V21.5H2.5V9.75Zm7.44 0h4.76v1.6h.07c.66-1.18 2.27-2.42 4.67-2.42 5 0 5.93 3.13 5.93 7.2v6.37h-4.96v-5.65c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.19 1.44-2.19 2.98v5.75H9.94V9.75Z" />
    </svg>
  );
}

export default function Blog() {
  const { isTeamMember } = useAuth();
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) setError(fetchError.message);
        else setPosts((data as BlogPost[]) ?? []);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-950 px-6 pb-28 pt-36 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
              From the Team
            </span>
            <div className="mt-3 h-px w-10 bg-gradient-to-r from-accent-cyan/60 to-transparent" />
            <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
              The DESPU Blog
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/60">
              Notes on startups, building in public, and everything we're learning along the way —
              written by the team.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {SOCIAL_LINKS.linkedin && (
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2]/15"
              >
                <LinkedinGlyph className="h-4 w-4" />
                Follow on LinkedIn
              </a>
            )}
          {isTeamMember && (
              <Link
                to="/blog/new"
                className="btn-primary-glow inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
              >
                <PenSquare size={16} />
                Write a post
              </Link>
            )}
          </div>
        </motion.div>

        {!isSupabaseConfigured && linkedinPosts.length === 0 && (
          <div className="glass flex items-start gap-3 rounded-2xl p-6 text-sm text-white/70">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-accent-cyan" />
            <div>
              <p className="font-medium text-white">The blog isn't set up yet.</p>
              <p className="mt-1 text-white/60">
                See <code className="rounded bg-white/10 px-1.5 py-0.5">supabase/SETUP.md</code> in
                the project for a step-by-step guide to connecting the backend.
              </p>
            </div>
          </div>
        )}

        {isSupabaseConfigured && error && (
          <div className="glass rounded-2xl p-6 text-sm text-white/60">
            Couldn't load posts right now ({error}). Try refreshing.
          </div>
        )}

        {isSupabaseConfigured && !error && posts === null && linkedinPosts.length === 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        )}

        {isSupabaseConfigured && posts !== null && posts.length === 0 && linkedinPosts.length === 0 && (
          <EmptyState
            icon={FileText}
            title="No posts published yet"
            description={
              isTeamMember
                ? "Be the first team member to write and publish a post."
                : "Check back soon for notes on startups, building in public, and team updates."
            }
            action={
              isTeamMember
                ? { label: "Write a post", href: "/blog/new" }
                : undefined
            }
          />
        )}

        {((posts && posts.length > 0) || linkedinPosts.length > 0) && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {(posts ?? []).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="card-hover glass flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  {post.cover_image_url && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-base-800">
                      <img
                        src={post.cover_image_url}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-accent-cyan"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-display text-lg font-semibold text-white">{post.title}</h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-white/60">{post.excerpt}</p>
                    )}
                    <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-white/40">
                      <span>{post.profiles?.full_name ?? "DESPU"}</span>
                      <span>·</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {linkedinPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
              >
                {getLinkedInEmbedUrl(post.url) ? (
                  <div className="glass flex h-full flex-col overflow-hidden rounded-2xl">
                    <iframe
                      src={getLinkedInEmbedUrl(post.url) as string}
                      title={post.title ?? `DESPU E-Cell LinkedIn post ${i + 1}`}
                      loading="lazy"
                      allowFullScreen
                      className="w-full border-0 bg-white"
                      style={{ height: post.embedHeight ?? 600 }}
                    />
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-xs font-medium text-accent-cyan hover:text-white"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <LinkedinGlyph />
                        Open on LinkedIn
                      </span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ) : (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover glass flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  {post.image && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-base-800">
                      <img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2]/20 px-2.5 py-1 text-[11px] font-semibold text-[#8cc4ff]">
                        <LinkedinGlyph />
                        LinkedIn
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      {post.title ?? `DESPU E-Cell on LinkedIn · Post ${i + 1}`}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-white/60">{post.excerpt}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs text-white/40">
                      <span>{post.date ? formatDate(post.date) : "DESPU E-Cell"}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-accent-cyan">
                        Read on LinkedIn
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

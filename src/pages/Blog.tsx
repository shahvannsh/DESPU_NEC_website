import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenSquare, AlertCircle } from "lucide-react";
import { EASE } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { supabase, isSupabaseConfigured, type BlogPost } from "../lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

          {isTeamMember && (
            <Link
              to="/blog/new"
              className="btn-primary-glow inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-5 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
            >
              <PenSquare size={16} />
              Write a post
            </Link>
          )}
        </motion.div>

        {!isSupabaseConfigured && (
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

        {isSupabaseConfigured && !error && posts === null && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="glass h-64 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {isSupabaseConfigured && posts !== null && posts.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-sm text-white/60">
            No posts yet — {isTeamMember ? "be the first to write one." : "check back soon."}
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
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
          </div>
        )}
      </div>
    </div>
  );
}

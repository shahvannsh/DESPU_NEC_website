import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark-dimmed.css";
import { ArrowLeft, Pencil, Trash2, Clock } from "lucide-react";
import { EASE } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { supabase, isSupabaseConfigured, type BlogPost as BlogPostType } from "../lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** ~200 words/minute, rounded up, minimum 1 — a standard reading-time estimate. */
function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Deterministic gradient per person so the same author always gets the same
 * color instead of a flat grey circle — small touch, but a plain letter
 * avatar reads as "unfinished" next to the rest of the site's gradient use. */
const AVATAR_GRADIENTS = [
  "from-accent-blue to-accent-cyan",
  "from-accent-cyan to-accent-violet",
  "from-accent-violet to-accent-blue",
  "from-blue-500 to-emerald-400",
  "from-fuchsia-500 to-accent-cyan",
];

function avatarGradient(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPostType | null | undefined>(undefined);
  const [related, setRelated] = useState<BlogPostType[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (!supabase) {
      setPost(null);
      return;
    }
    let cancelled = false;
    setPost(undefined);
    setRelated([]);

    supabase
      .from("posts")
      .select("*, profiles(*)")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const current = (data as BlogPostType) ?? null;
        setPost(current);

        // fetch a few related posts by shared tags, once we know this post's
        // tags — falls back to "most recent other posts" if there's no tag
        // overlap, so the section still has something worth clicking
        if (current && supabase) {
          const query =
            current.tags.length > 0
              ? supabase
                  .from("posts")
                  .select("*, profiles(*)")
                  .overlaps("tags", current.tags)
                  .neq("id", current.id)
                  .limit(3)
              : supabase
                  .from("posts")
                  .select("*, profiles(*)")
                  .neq("id", current.id)
                  .order("created_at", { ascending: false })
                  .limit(3);

          query.then(({ data: relatedData }) => {
            if (!cancelled) setRelated((relatedData as BlogPostType[]) ?? []);
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const isAuthor = post && user && post.author_id === user.id;
  const readMinutes = useMemo(() => (post ? readingTime(post.content) : 0), [post]);

  const handleDelete = async () => {
    if (!supabase || !post) return;
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    setDeleting(true);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    setDeleting(false);
    if (error) {
      alert(`Couldn't delete: ${error.message}`);
      return;
    }
    navigate("/blog");
  };

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-base-950 px-6 pb-28 pt-36 lg:px-10">
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-white/5" />
          <div className="h-10 w-3/4 rounded bg-white/5" />
          <div className="h-64 w-full rounded-2xl bg-white/5" />
        </div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-950 px-6 text-center">
        <p className="text-white/60">
          {isSupabaseConfigured
            ? "This post doesn't exist, or was removed."
            : "The blog isn't set up yet."}
        </p>
        <Link to="/blog" className="text-sm font-medium text-accent-cyan hover:underline">
          ← Back to the blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-950 px-6 pb-28 pt-36 lg:px-10">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto max-w-3xl"
      >
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          All posts
        </Link>

        {post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-accent-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {post.profiles?.avatar_url ? (
              <img
                src={post.profiles.avatar_url}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-base-950 ${avatarGradient(
                  post.profiles?.full_name ?? post.author_id
                )}`}
              >
                {(post.profiles?.full_name ?? "D")[0]}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-white">
                {post.profiles?.full_name ?? "DESPU"}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white/40">
                <span>{formatDate(post.created_at)}</span>
                {post.updated_at !== post.created_at && <span>· edited</span>}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {readMinutes} min read
                </span>
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link
                to={`/blog/${post.slug}/edit`}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
              >
                <Pencil size={13} />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-red-400/50 hover:text-red-400 disabled:opacity-50"
              >
                <Trash2 size={13} />
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          )}
        </div>

        {post.cover_image_url && (
          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-base-800">
            <img src={post.cover_image_url} alt="" className="h-full w-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-headings:font-display prose-a:text-accent-cyan mt-10 max-w-none text-white/80">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              Read next
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="card-hover glass flex flex-col rounded-xl p-5"
                >
                  <h3 className="font-display text-sm font-semibold text-white">{r.title}</h3>
                  {r.excerpt && (
                    <p className="mt-2 line-clamp-2 text-xs text-white/50">{r.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
}

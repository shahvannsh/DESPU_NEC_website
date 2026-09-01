import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ImagePlus, Eye, Pencil, X } from "lucide-react";
import { EASE } from "../lib/motion";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import Loader from "../components/Loader";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogEditor() {
  const { slug: editingSlug } = useParams<{ slug: string }>();
  const isEditing = Boolean(editingSlug);
  const navigate = useNavigate();
  const { user, profile, isTeamMember, loading: authLoading } = useAuth();

  const [postId, setPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPost, setLoadingPost] = useState(isEditing);

  // load existing post when editing
  useEffect(() => {
    if (!editingSlug) return;
    if (!supabase) {
      setLoadingPost(false);
      return;
    }
    let cancelled = false;

    supabase
      .from("posts")
      .select("*")
      .eq("slug", editingSlug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled || !data) return;
        setPostId(data.id);
        setTitle(data.title);
        setExcerpt(data.excerpt ?? "");
        setContent(data.content);
        setTags((data.tags as string[]).join(", "));
        setCoverUrl(data.cover_image_url);
        setLoadingPost(false);
      });

    return () => {
      cancelled = true;
    };
  }, [editingSlug]);

  const handleCoverUpload = async (file: File) => {
    if (!supabase || !user) return;
    setUploading(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("blog-covers").upload(path, file);
    if (uploadError) {
      setError(`Couldn't upload image: ${uploadError.message}`);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("blog-covers").getPublicUrl(path);
    setCoverUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (isEditing && postId) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({
          title: title.trim(),
          excerpt: excerpt.trim() || null,
          content,
          tags: tagList,
          cover_image_url: coverUrl,
        })
        .eq("id", postId);

      setSaving(false);
      if (updateError) {
        setError(updateError.message);
        return;
      }
      navigate(`/blog/${editingSlug}`);
      return;
    }

    // creating a new post — make sure the slug is unique by appending a
    // short suffix if it collides with an existing one
    let slug = slugify(title);
    const { data: existing } = await supabase.from("posts").select("slug").eq("slug", slug);
    if (existing && existing.length > 0) {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    }

    const { error: insertError } = await supabase.from("posts").insert({
      author_id: user.id,
      title: title.trim(),
      slug,
      excerpt: excerpt.trim() || null,
      content,
      tags: tagList,
      cover_image_url: coverUrl,
    });

    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    navigate(`/blog/${slug}`);
  };

  if (authLoading || loadingPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-950 px-6 text-center">
        <p className="text-white/60">You need to be logged in to write a post.</p>
        <Link
          to="/blog/login"
          state={{ redirectTo: isEditing ? `/blog/${editingSlug}/edit` : "/blog/new" }}
          className="text-sm font-medium text-accent-cyan hover:underline"
        >
          Log in →
        </Link>
      </div>
    );
  }

  if (!isTeamMember) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-base-950 px-6 text-center">
        <p className="text-white/60">
          This account ({profile === null ? user.email : ""}) isn't set up as a DESPU team member
          yet.
        </p>
        <p className="max-w-sm text-sm text-white/40">
          If this is a mistake, ask whoever manages the site to add your profile — see{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">supabase/SETUP.md</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-950 px-6 pb-28 pt-36 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-white">
            {isEditing ? "Edit post" : "Write a new post"}
          </h1>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
          >
            {preview ? <Pencil size={13} /> : <Eye size={13} />}
            {preview ? "Back to editing" : "Preview"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {preview ? (
          <article className="glass rounded-2xl p-8">
            {coverUrl && (
              <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-base-800">
                <img src={coverUrl} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <h2 className="font-display text-2xl font-bold text-white">
              {title || "Untitled post"}
            </h2>
            <div className="prose prose-invert prose-headings:font-display prose-a:text-accent-cyan mt-6 max-w-none text-white/80">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content || "*Nothing written yet.*"}
              </ReactMarkdown>
            </div>
          </article>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-white/70">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's this post about?"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-white/70">
                Short excerpt <span className="text-white/30">(shown on the blog list)</span>
              </label>
              <input
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="One or two sentences…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-white/70">
                Tags <span className="text-white/30">(comma-separated)</span>
              </label>
              <input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="fundraising, product, mentorship"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Cover image <span className="text-white/30">(optional)</span>
              </label>
              {coverUrl ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-base-800">
                  <img src={coverUrl} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverUrl(null)}
                    aria-label="Remove cover image"
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-white/40 transition-colors hover:border-accent-cyan/40 hover:text-white/60">
                  <ImagePlus size={22} />
                  <span className="text-xs">{uploading ? "Uploading…" : "Click to upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCoverUpload(file);
                    }}
                  />
                </label>
              )}
            </div>

            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-white/70">
                Content <span className="text-white/30">(markdown supported)</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post here. Use **bold**, *italics*, `code`, ## headings, and - lists."
                required
                rows={16}
                className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving || uploading}
                className="btn-primary-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {saving ? "Publishing…" : isEditing ? "Save changes" : "Publish post"}
              </button>
              <Link
                to={isEditing ? `/blog/${editingSlug}` : "/blog"}
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:text-white"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

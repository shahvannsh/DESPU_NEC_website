import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { useAuth, isSupabaseConfigured } from "../lib/auth";

export default function BlogLogin() {
  const { signInWithPassword, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo ?? "/blog";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate(redirectTo, { replace: true });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await signInWithPassword(email.trim(), password);
    setLoading(false);
    if (signInError) {
      setError(signInError);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="glass w-full max-w-sm rounded-2xl p-8"
      >
        <h1 className="font-display text-xl font-semibold text-white">Team login</h1>
        <p className="mt-2 text-sm text-white/50">
          For DESPU team members with a blog account. Not part of the team?{" "}
          <Link to="/blog" className="text-accent-cyan hover:underline">
            Just browse the blog
          </Link>{" "}
          instead.
        </p>

        {!isSupabaseConfigured && (
          <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/50">
            The blog backend isn't configured yet — see{" "}
            <code className="rounded bg-white/10 px-1 py-0.5">supabase/SETUP.md</code>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!isSupabaseConfigured}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-accent-cyan/50 focus:outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/60">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!isSupabaseConfigured}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-accent-cyan/50 focus:outline-none disabled:opacity-50"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="btn-primary-glow mt-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-5 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-xs text-white/40">
          First time logging in? Check your email for the invite sent when your account was
          created — it'll let you set your password.
        </p>
      </motion.div>
    </div>
  );
}

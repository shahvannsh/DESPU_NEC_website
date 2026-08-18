import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://instagram.com/ecell_despu";
const LINKEDIN_URL = "https://www.linkedin.com/in/despu-ecell-22703b42a";
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=10&data=${encodeURIComponent(
  INSTAGRAM_URL
)}`;

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.75h4.96V21.5H2.5V9.75Zm7.44 0h4.76v1.6h.07c.66-1.18 2.27-2.42 4.67-2.42 5 0 5.93 3.13 5.93 7.2v6.37h-4.96v-5.65c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.19 1.44-2.19 2.98v5.75H9.94V9.75Z" />
    </svg>
  );
}

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative scroll-mt-24 overflow-hidden bg-base-950 px-6 py-28 lg:px-10"
    >
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-violet/10 via-accent-blue/10 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Stay Connected
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Follow the Journey
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/55 sm:text-base">
            Behind-the-scenes, event drops, and everything DESPU — scan, follow, and stay
            in the loop.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Instagram QR card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="glass relative flex flex-col items-center overflow-hidden rounded-3xl p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
                <InstagramGlyph />
                Instagram
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl bg-white p-4 shadow-xl shadow-black/30 transition-transform hover:scale-[1.03]"
                aria-label="Open DESPU E-Cell on Instagram"
              >
                <img
                  src={QR_SRC}
                  alt="QR code linking to DESPU E-Cell's Instagram profile"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-44 w-44 sm:h-52 sm:w-52"
                />
              </a>

              <p className="mt-5 font-display text-lg font-semibold text-white">
                @ecell_despu
              </p>
              <p className="mt-1 text-xs text-white/50">
                Scan the code or tap below to follow
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
              >
                <InstagramGlyph />
                Follow on Instagram
              </a>
            </div>
          </motion.div>

          {/* LinkedIn card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a66c2]/15 via-accent-blue/5 to-transparent" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
                <LinkedinGlyph />
                LinkedIn
              </div>

              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#0a66c2]/15 text-[#4a9eff]">
                <LinkedinGlyph />
              </div>

              <p className="mt-5 font-display text-lg font-semibold text-white">
                DESPU E-Cell
              </p>
              <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-white/50">
                Connect with our official page for updates, opportunities, and everything
                NEC 2026.
              </p>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0a66c2]/30 transition-transform hover:scale-105"
              >
                <LinkedinGlyph />
                View LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

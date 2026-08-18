import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Copy, Check } from "lucide-react";
import { EASE } from "../lib/motion";

const CONTACT_EMAIL = "ecell.despu@gmail.com";
const WHATSAPP_URL = "https://chat.whatsapp.com/despu-ecell-community";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.4-.71-2.88-1.15-4.72-4.06-4.87-4.25-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.36.76-.36h.55c.18 0 .41-.03.63.48.24.57.8 1.98.87 2.12.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.66-.17 1.34Z" />
    </svg>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Message from ${name || "DESPU website"}`
  )}&body=${encodeURIComponent(
    `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
  )}`;

  return (
    <section id="contact" className="relative scroll-mt-24 bg-base-950 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Mentors, Judges & Recruiters — Reach Out
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/55 sm:text-base">
            Have a question, an opportunity, or want to collaborate with DESPU?
            We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass grid gap-0 overflow-hidden rounded-3xl sm:grid-cols-[1fr_260px]"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 p-7 sm:p-9"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-medium text-white/60">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-medium text-white/60">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-xs font-medium text-white/60">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-cyan/50 focus:outline-none"
              />
            </div>

            <a
              href={mailtoHref}
              className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-6 py-2.5 text-sm font-semibold text-base-950 shadow-lg shadow-accent-blue/20 transition-transform hover:scale-105"
            >
              <Send size={15} />
              Send Message
            </a>
            <p className="text-xs text-white/35">
              Opens your email client with this message pre-filled.
            </p>
          </form>

          <div className="flex flex-col justify-center gap-5 border-t border-white/10 bg-white/[0.02] p-7 sm:border-l sm:border-t-0 sm:p-9">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex flex-1 items-center gap-3 transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10">
                  <Mail size={16} />
                </span>
                {CONTACT_EMAIL}
              </a>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="shrink-0 text-white/40 transition-colors hover:text-white"
              >
                {emailCopied ? <Check size={15} className="text-accent-cyan" /> : <Copy size={15} />}
              </button>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#25D366]">
                <WhatsAppGlyph />
              </span>
              Join our WhatsApp community
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

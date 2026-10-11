import { Link } from "react-router-dom";
import ecellLogo from "../assets/brand/ecell-logo.png";
import { SOCIAL_LINKS } from "../data/social";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Journey", href: "#journey" },
  { label: "Blog", href: "/blog" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
];

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.75h4.96V21.5H2.5V9.75Zm7.44 0h4.76v1.6h.07c.66-1.18 2.27-2.42 4.67-2.42 5 0 5.93 3.13 5.93 7.2v6.37h-4.96v-5.65c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.19 1.44-2.19 2.98v5.75H9.94V9.75Z" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.24c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.4-.71-2.88-1.15-4.72-4.06-4.87-4.25-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.36.76-.36h.55c.18 0 .41-.03.63.48.24.57.8 1.98.87 2.12.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.66-.17 1.34Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-black text-neutral-900 dark:text-white px-6 py-14 lg:px-10 font-sans">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={ecellLogo}
              alt="E-Cell, DES Pune University"
              className="h-10 w-auto bg-white/95 p-1 rounded-md shadow-sm border border-black/10 dark:border-white/20"
            />
            <span className="flex flex-col">
              <span className="font-sans text-lg font-bold text-black dark:text-white leading-tight">
                DESPU
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-black/70 dark:text-white/80">
                NEC Team
              </span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-black/60 dark:text-white/60 font-sans">
            National Entrepreneurship Challenge
          </p>
          <p className="text-sm text-black/50 dark:text-white/50 font-sans">
            Deccan Education Society's Pune University
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-semibold text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 transition-all hover:scale-105 hover:border-[#3054ff] hover:text-[#3054ff] dark:hover:text-white"
          >
            <InstagramGlyph />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 text-black/70 dark:text-white/70 transition-all hover:scale-105 hover:border-[#3054ff] hover:text-[#3054ff] dark:hover:text-white"
          >
            <LinkedinGlyph />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp community"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 text-[#25D366] transition-all hover:scale-105 hover:border-[#25D366]"
          >
            <WhatsAppGlyph />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-black/10 dark:border-white/10 pt-8 text-center">
        <p className="text-xs font-semibold text-black/50 dark:text-white/50">
          © 2026 DESPU. Built with curiosity, collaboration & ambition.
        </p>
      </div>
    </footer>
  );
}

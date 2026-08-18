const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
];

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.75h4.96V21.5H2.5V9.75Zm7.44 0h4.76v1.6h.07c.66-1.18 2.27-2.42 4.67-2.42 5 0 5.93 3.13 5.93 7.2v6.37h-4.96v-5.65c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.19 1.44-2.19 2.98v5.75H9.94V9.75Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-950 px-6 py-14 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-display text-lg font-bold text-white">DESPU</div>
          <p className="mt-1 text-sm text-white/50">
            National Entrepreneurship Challenge
          </p>
          <p className="text-sm text-white/50">
            Deccan Education Society's Pune University
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-white/60 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href="https://instagram.com/ecell_despu"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            <InstagramGlyph />
          </a>
          <a
            href="https://www.linkedin.com/in/despu-ecell-22703b42a"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            <LinkedinGlyph />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 DESPU. Built with curiosity, collaboration & ambition.
      </div>
    </footer>
  );
}

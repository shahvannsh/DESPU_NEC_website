import { AtSign, Link2, Code2 } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
];

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
          <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white">
            <AtSign size={18} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-white">
            <Link2 size={18} />
          </a>
          <a href="#" aria-label="GitHub" className="text-white/50 hover:text-white">
            <Code2 size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © 2026 DESPU. Built with curiosity, collaboration & ambition.
      </div>
    </footer>
  );
}

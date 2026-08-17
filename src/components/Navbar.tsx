import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-tight text-white">
            DESPU
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
            National Entrepreneurship Challenge
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                activeHash === l.href
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#team"
          className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all hover:border-accent-cyan/50 hover:bg-white/10 md:inline-flex"
        >
          Meet the Team →
        </a>

        <button
          aria-label="Toggle menu"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-white/10 bg-base-950/95 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#team"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-white/10 px-4 py-3 text-center text-sm font-medium text-white"
              >
                Meet the Team →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Left: 24x24px Sunburst SVG icon + Brand Name */}
      <div className="flex items-center">
        <a href="#home" aria-label="Home" className="flex items-center gap-3 group">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-black dark:text-white transition-transform group-hover:rotate-45 duration-300"
            aria-hidden="true"
          >
            <path d="M12 0L14 8.5L22.5 6L16.5 12L22.5 18L14 15.5L12 24L10 15.5L1.5 18L7.5 12L1.5 6L10 8.5L12 0Z" />
          </svg>
          <span className="font-sans text-xl font-bold tracking-tight text-black dark:text-white flex items-baseline gap-2">
            DESPU
            <span className="text-[11px] font-semibold uppercase tracking-wider text-black/60 dark:text-white/60 hidden sm:inline">
              NEC Team
            </span>
          </span>
        </a>
      </div>

      {/* Center: DESPU NEC Nav links */}
      <nav className="hidden md:flex items-center gap-8 font-sans">
        <a
          href="#home"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="#team"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Team
        </a>
        <a
          href="#journey"
          className="inline-flex items-center text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Journey
          <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
        </a>
        <a
          href="#events"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Events
        </a>
        <a
          href="#vision"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Vision
        </a>
      </nav>

      {/* Right: Contact link, Theme Toggle, Meet Team Button */}
      <div className="flex items-center gap-4">
        <a
          href="#contact"
          className="hidden sm:inline-block text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Contact
        </a>
        <ThemeToggle />
        <a
          href="#team"
          className="bg-black text-white dark:bg-white dark:text-black rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-all inline-block font-sans shadow-sm"
        >
          Meet Team
        </a>
      </div>
    </header>
  );
}

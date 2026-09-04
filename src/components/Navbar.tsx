import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ecellLogo from "../assets/brand/ecell-logo.png";

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
          ? "bg-white/95 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Left: Official NEC / E-Cell Logo + DESPU Brand text */}
      <div className="flex items-center">
        <a href="#home" aria-label="Home" className="flex items-center gap-3 group">
          <img
            src={ecellLogo}
            alt="E-Cell, DES Pune University"
            className="h-10 w-auto bg-white/95 p-1 rounded-md shadow-sm border border-black/10 dark:border-white/20 transition-transform group-hover:scale-105"
          />
          <span className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-tight text-black dark:text-white leading-tight">
              DESPU
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-black/70 dark:text-white/80">
              NEC Team
            </span>
          </span>
        </a>
      </div>

      {/* Center: DESPU NEC Nav links */}
      <nav className="hidden md:flex items-center gap-8 font-sans">
        <a
          href="#home"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="#team"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Team
        </a>
        <a
          href="#journey"
          className="inline-flex items-center text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Journey
          <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
        </a>
        <a
          href="#events"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Events
        </a>
        <a
          href="#vision"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Vision
        </a>
        <a
          href="#faq"
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          FAQ
        </a>
      </nav>

      {/* Right: Contact link, Theme Toggle, High-Contrast Meet Team Button */}
      <div className="flex items-center gap-4">
        <a
          href="#contact"
          className="hidden sm:inline-block text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Contact
        </a>
        <ThemeToggle />
        <a
          href="#team"
          className="bg-black text-white dark:bg-white dark:text-black rounded-full px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-all inline-block font-sans shadow-md"
        >
          Meet Team
        </a>
      </div>
    </header>
  );
}

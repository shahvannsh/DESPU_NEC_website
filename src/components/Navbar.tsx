import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ecellLogo from "../assets/brand/ecell-logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onBlog = pathname.startsWith("/blog");
  // On any page other than home (e.g. /blog), section anchors must point back
  // to the home page, otherwise clicking "About" would do nothing.
  const to = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ top: "var(--announcement-h, 0px)" }}
      className={`fixed left-0 right-0 z-50 px-4 sm:px-6 py-4 flex items-center justify-between w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Left: Official NEC / E-Cell Logo + DESPU Brand text */}
      <div className="flex items-center">
        <a href={to("#home")} aria-label="Home" className="flex items-center gap-3 group">
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
          href={to("#home")}
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href={to("#about")}
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href={to("#team")}
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Team
        </a>
        <a
          href={to("#journey")}
          className="inline-flex items-center text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Journey
          <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
        </a>
        <a
          href={to("#events")}
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Events
        </a>
        <Link
          to="/blog"
          aria-current={onBlog ? "page" : undefined}
          className={`text-sm font-semibold transition-colors ${
            onBlog
              ? "text-black dark:text-white"
              : "text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white"
          }`}
        >
          Blog
        </Link>
        <a
          href={to("#vision")}
          className="text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Vision
        </a>
      </nav>

      {/* Right: Contact link, Theme Toggle, High-Contrast Meet Team Button */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <a
          href={to("#contact")}
          className="hidden sm:inline-block text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Contact
        </a>
        <Link
          to="/blog"
          className="md:hidden text-sm font-semibold text-black/80 hover:text-black dark:text-white/90 dark:hover:text-white transition-colors"
        >
          Blog
        </Link>
        <ThemeToggle />
        <a
          href={to("#team")}
          className="bg-black text-white dark:bg-white dark:text-black rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm whitespace-nowrap font-bold hover:opacity-90 transition-all inline-block font-sans shadow-md"
        >
          Meet Team
        </a>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Left: 24x24px sunburst SVG icon */}
      <div className="flex items-center">
        <a href="#" aria-label="Home" className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-black dark:text-white transition-colors"
            aria-hidden="true"
          >
            <path d="M12 0L14 8.5L22.5 6L16.5 12L22.5 18L14 15.5L12 24L10 15.5L1.5 18L7.5 12L1.5 6L10 8.5L12 0Z" />
          </svg>
        </a>
      </div>

      {/* Center: nav links (hidden on mobile, md:flex, gap-8) */}
      <nav className="hidden md:flex items-center gap-8 font-sans">
        <a
          href="#products"
          className="inline-flex items-center text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Products
          <ChevronDown className="w-4 h-4 ml-1" />
        </a>
        <a
          href="#stories"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Customer Stories
        </a>
        <a
          href="#resources"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Resources
        </a>
        <a
          href="#pricing"
          className="text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Pricing
        </a>
      </nav>

      {/* Right: Book A Demo, Theme Toggle, Get Started */}
      <div className="flex items-center gap-4">
        <a
          href="#demo"
          className="hidden sm:inline-block text-sm font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors"
        >
          Book A Demo
        </a>
        <ThemeToggle />
        <a
          href="#get-started"
          className="bg-black text-white dark:bg-white dark:text-black rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-all inline-block font-sans"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}

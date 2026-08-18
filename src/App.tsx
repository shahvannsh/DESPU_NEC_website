import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import NotFound from "./pages/NotFound";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // wait a tick for the route's content to mount
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else if (pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  }, [hash, pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-base-950 font-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-base-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <ScrollToHash />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:slug" element={<TeamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <CustomCursor />
    </div>
  );
}

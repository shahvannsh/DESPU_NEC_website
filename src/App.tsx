import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./lib/motion";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import Splash from "./components/Splash";
import EasterEgg from "./components/EasterEgg";
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
  const location = useLocation();
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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/team/:slug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <TeamPage />
                </motion.div>
              }
            />
            <Route
              path="*"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <NotFound />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <CustomCursor />
      <Splash />
      <EasterEgg />
    </div>
  );
}

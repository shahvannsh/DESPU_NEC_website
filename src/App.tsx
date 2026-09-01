import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./lib/motion";
import { AuthProvider } from "./lib/auth";
import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import Splash from "./components/Splash";
import EasterEgg from "./components/EasterEgg";
import ClickSpark from "./components/reactbits/ClickSpark";
import Home from "./pages/Home";
import Loader from "./components/Loader";

// Code-split routes people don't land on immediately — the home page
// (and everything the navbar links to) loads eagerly since it's what
// nearly every visitor sees first; these load on demand instead.
const TeamPage = lazy(() => import("./pages/TeamPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));
const BlogLogin = lazy(() => import("./pages/BlogLogin"));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Loader />
    </div>
  );
}

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
    <AuthProvider>
    <ClickSpark sparkColor="#22d3ee" sparkSize={8} sparkRadius={18} sparkCount={6} duration={420}>
    <div className="min-h-screen bg-base-950 font-body">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-base-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <ScrollToHash />
      <div style={{ height: "var(--announcement-h, 0px)" }} aria-hidden="true" />
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
                  <Suspense fallback={<RouteFallback />}>
                    <TeamPage />
                  </Suspense>
                </motion.div>
              }
            />
            <Route
              path="/blog"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Suspense fallback={<RouteFallback />}>
                    <Blog />
                  </Suspense>
                </motion.div>
              }
            />
            <Route
              path="/blog/login"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Suspense fallback={<RouteFallback />}>
                    <BlogLogin />
                  </Suspense>
                </motion.div>
              }
            />
            <Route
              path="/blog/new"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Suspense fallback={<RouteFallback />}>
                    <BlogEditor />
                  </Suspense>
                </motion.div>
              }
            />
            <Route
              path="/blog/:slug/edit"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Suspense fallback={<RouteFallback />}>
                    <BlogEditor />
                  </Suspense>
                </motion.div>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Suspense fallback={<RouteFallback />}>
                    <BlogPost />
                  </Suspense>
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
                  <Suspense fallback={<RouteFallback />}>
                    <NotFound />
                  </Suspense>
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
    </ClickSpark>
    </AuthProvider>
  );
}

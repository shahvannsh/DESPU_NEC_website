import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ecellLogo from "../assets/brand/ecell-logo.png";
import SplitFlapText from "./reactbits/SplitFlapText";

const SESSION_KEY = "despu-splash-shown";

export default function Splash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || sessionStorage.getItem(SESSION_KEY)) return;
    setShow(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-base-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={ecellLogo} alt="E-Cell, DES Pune University" className="h-16 w-auto" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-white/50"
            >
              <SplitFlapText
                words={["DESPU"]}
                loop={false}
                padTo={5}
                fontSize={14}
                tileColor="#0a0a0f"
                textColor="rgba(255,255,255,0.6)"
                gap={2}
                tileRadius={3}
              />
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

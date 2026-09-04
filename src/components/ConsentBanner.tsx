import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { EASE, DURATION_DEFAULT } from '../lib/motion';

export const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('despu_cookie_consent');
    if (!consent) {
      // Small delay before presenting consent prompt to avoid cluttering initial render
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('despu_cookie_consent', JSON.stringify({ type, timestamp: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: DURATION_DEFAULT + 0.1, ease: EASE }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[90] md:max-w-md w-auto"
          role="dialog"
          aria-live="polite"
          aria-label="Privacy & Cookie Preferences"
        >
          <div className="glass bg-base-900/90 dark:bg-base-900/95 border border-white/10 dark:border-white/15 p-5 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden text-white">
            {/* Subtle top accent gradient line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent-cyan to-accent-gradientEnd" />

            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent/15 text-accent-cyan border border-accent/20">
                  <Cookie className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-semibold text-base text-white dark:text-white">
                  Privacy & Cookie Preferences
                </h3>
              </div>
              <button
                onClick={() => handleAccept('essential')}
                className="text-white/60 hover:text-white p-1 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 -mt-2"
                aria-label="Dismiss consent banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-white/70 leading-relaxed mb-4">
              We use essential cookies and anonymous telemetry to optimize website performance, measure community engagement, and improve event features. No sensitive personal tracking data is shared.
            </p>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleAccept('all')}
                className="flex-1 bg-white text-black dark:bg-white dark:text-black font-sans font-bold text-xs py-2.5 px-4 rounded-full hover:bg-neutral-200 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan min-h-[44px]"
              >
                Accept All
              </button>
              <button
                onClick={() => handleAccept('essential')}
                className="flex-1 bg-neutral-900 text-white dark:bg-white/10 dark:text-white font-sans font-semibold text-xs py-2.5 px-4 rounded-full border border-neutral-700 dark:border-white/15 transition-colors hover:bg-black dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent-cyan min-h-[44px]"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

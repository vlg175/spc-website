"use client";

/* ─────────────────────────────────────────────────────────────────────────
   BackToTop — fixed bottom-right button
   Appears after 500px scroll. Molten accent. ChevronUp icon.
   Uses Framer Motion for the enter/exit fade+slide.
   ───────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { smoothScrollToTop } from "@/components/LenisProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => smoothScrollToTop()}
          aria-label="Back to top"
          className="fixed z-50 flex items-center justify-center"
          style={{
            bottom: "2rem",
            right: "1.5rem",
            width: 44,
            height: 44,
            background: "var(--molten-500)",
            color: "var(--text-white)",
            border: "none",
            cursor: "pointer",
          }}
          whileHover={{ background: "var(--molten-600)", scale: 1.05 } as never}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp size={20} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

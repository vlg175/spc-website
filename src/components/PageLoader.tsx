"use client";

/* ─────────────────────────────────────────────────────────────────────────
   PageLoader — full-screen initial load overlay
   Design spec: navy bg + SPC logo centered, fades in (0.3s),
   then fades out (0.6s) after a short dwell (0.8s).
   Removed from DOM via AnimatePresence once exit animation completes.
   ───────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Dwell for 900ms then trigger exit
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "var(--bg-void)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {/* Logo — fades + scales in on mount */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo_SPC.png"
              alt="SPC — Steel Pipe Company"
              width={120}
              height={51}
              priority
            />
          </motion.div>

          {/* Thin loading bar */}
          <motion.div
            style={{
              width: 80,
              height: 1,
              background: "var(--border-subtle)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--molten-500)",
                transformOrigin: "left center",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

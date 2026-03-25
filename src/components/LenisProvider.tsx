"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/* ── Global Lenis instance — used by smoothScrollTo() ────────────────── */
let lenisInstance: Lenis | null = null;

/**
 * Smoothly scroll to a DOM element by its id.
 * Uses the Lenis instance for a buttery, controlled scroll.
 * duration: seconds (default 2s for a noticeably smooth ride).
 */
export function smoothScrollTo(id: string, duration = 2) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration, offset: 0 });
  } else {
    // Fallback if Lenis isn't ready yet
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Smoothly scroll to the top of the page.
 */
export function smoothScrollToTop(duration = 2) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // Expo ease-out: snappy start, long smooth tail
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    let raf: number;

    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}

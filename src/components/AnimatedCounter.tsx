"use client";

/* ─────────────────────────────────────────────────────────────────────────
   AnimatedCounter — reusable GSAP scroll-triggered number counter
   Props
     end       – target number (required)
     start     – starting number (default 0)
     duration  – animation duration in seconds (default 2)
     suffix    – appended after the number  e.g. "+"  " MPa"
     prefix    – prepended before the number e.g. "$"
     className – forwarded to the <span> (use for text-size / color)
     style     – forwarded to the <span> (for color / weight overrides)
   Behaviour
     · GSAP snap: integers only (no decimals)
     · Triggers once when top of element hits 80% of viewport
     · Cleans up tween + ScrollTrigger on unmount
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
  style,
}: AnimatedCounterProps) {
  /** The <span> that displays the changing number */
  const numRef  = useRef<HTMLSpanElement>(null);
  /** Outer wrapper — used as ScrollTrigger target */
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const num  = numRef.current;
    const root = rootRef.current;
    if (!num || !root) return;

    // Set the initial rendered value (avoids layout shift from empty span)
    num.textContent = `${prefix}${start}${suffix}`;

    const proxy = { val: start };

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: end,
        duration,
        ease: "power2.out",
        snap: { val: 1 },          // keep whole integers
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent =
              `${prefix}${Math.round(proxy.val)}${suffix}`;
          }
        },
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [end, start, duration, suffix, prefix]);

  return (
    <span ref={rootRef}>
      <span
        ref={numRef}
        className={`font-mono tabular-nums leading-none ${className}`}
        style={style}
      >
        {prefix}{start}{suffix}
      </span>
    </span>
  );
}

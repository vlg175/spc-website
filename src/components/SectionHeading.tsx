"use client";

/* ─────────────────────────────────────────────────────────────────────────
   SectionHeading — Reusable animated section heading
   Pattern: number ── line ── label
            TITLE (clip-path reveal)

   Replaces duplicated heading code in About, Products, Quality,
   Partners, and Contact (~50 lines each → 1 component).
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  /** Section number, e.g. "02", "04" */
  number: string;
  /** Small label above the title, e.g. "About SPC", "Our Products" */
  label: string;
  /** Main heading line 1 */
  heading1: string;
  /** Main heading line 2 (accent-colored) */
  heading2Accent?: string;
  /** CSS class name for the trigger (unique per section) */
  triggerClass: string;
  /** Whether this is on a dark background (true) or light (false). Defaults to dark. */
  dark?: boolean;
}

export default function SectionHeading({
  number,
  label,
  heading1,
  heading2Accent,
  triggerClass,
  dark = true,
}: SectionHeadingProps) {
  const lineRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const trigger = document.querySelector(`.${triggerClass}`);
    if (!trigger) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: DUR.headingLine, ease: EASE.outStrong, transformOrigin: "left center" }
      )
        .fromTo(
          labelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: DUR.headingLabel, ease: EASE.out },
          "-=0.1"
        )
        .fromTo(
          titleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: DUR.headingTitle, ease: EASE.out },
          "-=0.15"
        );
    });

    return () => ctx.revert();
  }, [triggerClass]);

  const titleColor = dark ? "var(--text-white)" : "var(--text-dark)";
  const accentColor = dark ? "var(--molten-500)" : "var(--molten-600)";

  return (
    <header className={triggerClass}>
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-mono text-xs select-none"
          style={{ color: "var(--molten-500)" }}
        >
          {number}
        </span>
        <div
          ref={lineRef}
          className="flex-shrink-0 w-[80px] sm:w-[120px]"
          style={{
            height: 2,
            background: "var(--molten-500)",
            transformOrigin: "left center",
          }}
        />
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.28em] uppercase select-none min-w-0 truncate"
          style={{ color: "var(--text-muted)", opacity: 0 }}
        >
          {label}
        </span>
      </div>

      <h2
        ref={titleRef}
        className="font-display font-bold uppercase leading-[0.92] tracking-tight"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 5rem)",
          color: titleColor,
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        {heading1}
        {heading2Accent && (
          <>
            <br />
            <span style={{ color: accentColor }}>{heading2Accent}</span>
          </>
        )}
      </h2>
    </header>
  );
}

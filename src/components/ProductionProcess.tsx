"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Production Process — Section 03  ·  THE SHOWPIECE
   5-step ERW pipeline: Preparation → Forming → Welding → Treatment → Testing
   Desktop: GSAP ScrollTrigger pin + scrub, snap to steps, horizontal sequence
   Mobile:  vertical timeline, scroll-triggered cards, NO pinning
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ── Step data ─────────────────────────────────────────────────────────── */
interface Step {
  num: number;
  title: string;
  subtitle: string;
  copy: string;
  tagline: string;
  standard: string;
  color: string;       // dominant color for this step
  glowColor: string;   // glow/accent for this step
}

/* ── SVG icons per step (stroke draw-in) ──────────────────────────────── */
function StepIcon({ step, className }: { step: number; className?: string }) {
  const cn = className ?? "w-16 h-16";
  const props = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn,
  };

  switch (step) {
    case 1: // coil unrolling
      return (
        <svg {...props}>
          <path className="step-icon-path" d="M16 44 C16 28, 28 16, 44 16 C52 16, 52 24, 44 24 C36 24, 36 32, 44 32 C48 32, 48 36, 44 36" />
          <line className="step-icon-path" x1="44" y1="36" x2="56" y2="36" />
          <line className="step-icon-path" x1="8" y1="48" x2="56" y2="48" />
        </svg>
      );
    case 2: // flat → round (forming)
      return (
        <svg {...props}>
          <line className="step-icon-path" x1="8" y1="48" x2="56" y2="48" />
          <path className="step-icon-path" d="M12 38 Q32 10, 52 38" />
          <circle className="step-icon-path" cx="32" cy="28" r="14" />
        </svg>
      );
    case 3: // welding spark
      return (
        <svg {...props}>
          <circle className="step-icon-path" cx="32" cy="32" r="16" />
          <line className="step-icon-path" x1="32" y1="16" x2="32" y2="48" />
          <line className="step-icon-path" x1="22" y1="8" x2="26" y2="16" />
          <line className="step-icon-path" x1="42" y1="8" x2="38" y2="16" />
          <line className="step-icon-path" x1="16" y1="14" x2="22" y2="22" />
          <line className="step-icon-path" x1="48" y1="14" x2="42" y2="22" />
        </svg>
      );
    case 4: // sizing caliper
      return (
        <svg {...props}>
          <circle className="step-icon-path" cx="32" cy="32" r="16" />
          <circle className="step-icon-path" cx="32" cy="32" r="12" strokeDasharray="4 3" />
          <line className="step-icon-path" x1="32" y1="10" x2="32" y2="14" />
          <line className="step-icon-path" x1="32" y1="50" x2="32" y2="54" />
          <line className="step-icon-path" x1="10" y1="32" x2="14" y2="32" />
          <line className="step-icon-path" x1="50" y1="32" x2="54" y2="32" />
        </svg>
      );
    case 5: // checkmark stamp
      return (
        <svg {...props}>
          <circle className="step-icon-path" cx="32" cy="32" r="20" />
          <circle className="step-icon-path" cx="32" cy="32" r="16" />
          <polyline className="step-icon-path" points="22,32 29,40 42,24" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Forming morph SVG (Step 2 hero animation) ────────────────────────── */
function FormingMorph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      className={className ?? "w-full max-w-[280px]"}
    >
      {/* flat strip (start state) */}
      <rect
        className="forming-shape"
        x="20" y="50" width="160" height="8" rx="1"
        stroke="var(--steel-300)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* U-shape (mid state) — hidden initially */}
      <path
        className="forming-u"
        d="M40 50 Q40 90, 100 90 Q160 90, 160 50"
        stroke="var(--steel-300)"
        strokeWidth="1.5"
        fill="none"
        opacity="0"
      />
      {/* circle (end state) — hidden initially */}
      <circle
        className="forming-circle"
        cx="100" cy="60" r="30"
        stroke="var(--steel-200)"
        strokeWidth="1.5"
        fill="none"
        opacity="0"
      />
    </svg>
  );
}

/* ── Welding glow SVG (Step 3) ────────────────────────────────────────── */
function WeldingGlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={className ?? "w-full max-w-[280px]"}>
      <circle cx="100" cy="60" r="30" stroke="var(--molten-500)" strokeWidth="1.5" fill="none" />
      {/* seam line */}
      <line
        className="weld-seam"
        x1="100" y1="30" x2="100" y2="90"
        stroke="var(--molten-400)"
        strokeWidth="3"
        opacity="0"
      />
      {/* glow circle */}
      <circle
        className="weld-glow"
        cx="100" cy="60" r="34"
        fill="none"
        stroke="var(--molten-300)"
        strokeWidth="6"
        opacity="0"
      />
      {/* spark particles */}
      {[
        { cx: 82, cy: 40 },
        { cx: 118, cy: 42 },
        { cx: 78, cy: 70 },
        { cx: 122, cy: 72 },
        { cx: 86, cy: 34 },
        { cx: 114, cy: 80 },
      ].map((p, i) => (
        <circle
          key={i}
          className="weld-spark"
          cx={p.cx}
          cy={p.cy}
          r="2"
          fill="var(--molten-300)"
          opacity="0"
        />
      ))}
    </svg>
  );
}

/* ── Certified badge SVG (Step 5) ─────────────────────────────────────── */
function CertifiedBadge({ className }: { className?: string }) {
  return (
    <div className={className ?? ""}>
      <svg viewBox="0 0 200 60" fill="none" className="w-full max-w-[260px]">
        {/* Shield outline */}
        <path
          className="cert-shield"
          d="M100 4 L130 14 L130 34 Q130 50, 100 56 Q70 50, 70 34 L70 14 Z"
          stroke="var(--status-success-light)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Checkmark inside */}
        <polyline
          className="cert-check"
          points="88,32 96,40 112,24"
          stroke="var(--status-success-light)"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      <div className="cert-labels flex flex-wrap gap-2 mt-3 opacity-0">
        {["GOST 10704", "GOST 10705", "ISO 559", "Uzstandard"].map((s) => (
          <span
            key={s}
            className="font-mono text-[0.58rem] px-2 py-0.5 tracking-wider uppercase"
            style={{
              color: "var(--status-success-light)",
              border: "1px solid rgba(46,140,88,0.35)",
              background: "rgba(46,140,88,0.08)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Pipe evolution cross-section (top progress indicator) ────────────── */
function PipeEvolution({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 40" fill="none" className={className ?? "w-64 h-8"}>
      {/* Stage 1: flat strip */}
      <line className="pipe-evo-1" x1="10" y1="20" x2="50" y2="20" stroke="var(--steel-400)" strokeWidth="2" />
      {/* Stage 2: curving */}
      <path className="pipe-evo-2" d="M70 28 Q90 8, 110 28" stroke="var(--steel-400)" strokeWidth="2" opacity="0.3" />
      {/* Stage 3: circle (weld seam visible) */}
      <circle className="pipe-evo-3" cx="150" cy="20" r="10" stroke="var(--steel-400)" strokeWidth="2" opacity="0.3" />
      <line className="pipe-evo-3s" x1="150" y1="10" x2="150" y2="12" stroke="var(--molten-500)" strokeWidth="2" opacity="0.3" />
      {/* Stage 4: perfect circle + dimensions */}
      <circle className="pipe-evo-4" cx="210" cy="20" r="10" stroke="var(--steel-300)" strokeWidth="2" opacity="0.3" />
      {/* Stage 5: circle + checkmark */}
      <circle className="pipe-evo-5" cx="270" cy="20" r="10" stroke="var(--status-success-light)" strokeWidth="2" opacity="0.3" />
      <polyline className="pipe-evo-5c" points="263,20 268,26 278,14" stroke="var(--status-success-light)" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */
export default function ProductionProcess() {
  const t = useTranslations("process");

  const STEPS: Step[] = [
    {
      num: 1,
      title: t("s1_title"),
      subtitle: t("s1_subtitle"),
      copy: t("s1_copy"),
      tagline: t("s1_tagline"),
      standard: "GOST 380-2005",
      color: "var(--steel-400)",
      glowColor: "rgba(101,128,152,0.35)",
    },
    {
      num: 2,
      title: t("s2_title"),
      subtitle: t("s2_subtitle"),
      copy: t("s2_copy"),
      tagline: t("s2_tagline"),
      standard: "Precision rollers",
      color: "var(--steel-300)",
      glowColor: "rgba(138,164,188,0.35)",
    },
    {
      num: 3,
      title: t("s3_title"),
      subtitle: t("s3_subtitle"),
      copy: t("s3_copy"),
      tagline: t("s3_tagline"),
      standard: "ERW HF process",
      color: "var(--molten-500)",
      glowColor: "rgba(232,94,34,0.50)",
    },
    {
      num: 4,
      title: t("s4_title"),
      subtitle: t("s4_subtitle"),
      copy: t("s4_copy"),
      tagline: t("s4_tagline"),
      standard: "Ø ±0.5mm tolerance",
      color: "var(--copper-400)",
      glowColor: "rgba(208,140,66,0.35)",
    },
    {
      num: 5,
      title: t("s5_title"),
      subtitle: t("s5_subtitle"),
      copy: t("s5_copy"),
      tagline: t("s5_tagline"),
      standard: "GOST 10704 · 10705 · ISO 559",
      color: "var(--status-success-light)",
      glowColor: "rgba(46,140,88,0.35)",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ══════════════════════════════════════════════════════════════
         DESKTOP — pinned horizontal scroll
         ══════════════════════════════════════════════════════════════ */
      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const desktop = desktopRef.current;
        if (!track || !desktop) return;

        const panels = gsap.utils.toArray<HTMLElement>(".pp-panel");
        const totalPanels = panels.length;

        // Main pinned scroll
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: desktop,
            start: "top top",
            end: () => `+=${window.innerHeight * 4}`,
            pin: true,
            scrub: 0.5,
            snap: {
              snapTo: 1 / (totalPanels - 1),
              duration: { min: 0.2, max: 0.6 },
              delay: 0.1,
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
          },
        });

        // Slide track horizontally
        mainTl.to(track, {
          xPercent: -100 * (totalPanels - 1) / totalPanels,
          ease: "none",
        });

        // Progress bar fill
        mainTl.to(
          ".pp-progress-fill",
          { scaleX: 1, ease: "none" },
          0
        );

        // Progress dots activation
        panels.forEach((_, i) => {
          const progress = i / (totalPanels - 1);
          mainTl.to(`.pp-dot-${i}`, {
            scale: 1.35,
            opacity: 1,
            duration: 0.01,
          }, progress);
          // Deactivate previous dot
          if (i > 0) {
            mainTl.to(`.pp-dot-${i - 1}`, {
              scale: 1,
              opacity: 0.4,
              duration: 0.01,
            }, progress);
          }
        });

        // Pipe evolution: light up each stage
        for (let i = 0; i < totalPanels; i++) {
          const p = i / (totalPanels - 1);
          mainTl.to(`.pipe-evo-${i + 1}`, { opacity: 1, duration: 0.01 }, p);
          if (section.querySelector(`.pipe-evo-${i + 1}s`)) {
            mainTl.to(`.pipe-evo-${i + 1}s`, { opacity: 1, duration: 0.01 }, p);
          }
          if (section.querySelector(`.pipe-evo-${i + 1}c`)) {
            mainTl.to(`.pipe-evo-${i + 1}c`, { opacity: 1, duration: 0.01 }, p);
          }
        }

        // Per-panel content animations
        panels.forEach((panel, i) => {
          const p = i / (totalPanels - 1);
          const icon = panel.querySelector(".step-icon-path");
          const title = panel.querySelector(".pp-title");
          const copy = panel.querySelector(".pp-copy");
          const tagline = panel.querySelector(".pp-tagline");

          // Icon stroke draw-in
          if (icon) {
            const paths = panel.querySelectorAll(".step-icon-path");
            paths.forEach((path) => {
              const el = path as SVGGeometryElement;
              if (el.getTotalLength) {
                const len = el.getTotalLength();
                gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
                mainTl.to(el, { strokeDashoffset: 0, duration: 0.08, ease: "none" }, Math.max(0, p - 0.05));
              }
            });
          }

          if (title) {
            gsap.set(title, { clipPath: "inset(0 100% 0 0)" });
            mainTl.to(title, { clipPath: "inset(0 0% 0 0)", duration: 0.06, ease: "power2.out" }, p);
          }
          if (copy) {
            gsap.set(copy, { opacity: 0, y: 16 });
            mainTl.to(copy, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, p + 0.02);
          }
          if (tagline) {
            gsap.set(tagline, { opacity: 0 });
            mainTl.to(tagline, { opacity: 1, duration: 0.04 }, p + 0.04);
          }
        });

        // Step 2 forming morph
        const formRect = section.querySelector(".forming-shape");
        const formU = section.querySelector(".forming-u");
        const formCircle = section.querySelector(".forming-circle");
        if (formRect && formU && formCircle) {
          const p2 = 1 / (totalPanels - 1);
          // Flatten rect → show U
          mainTl.to(formRect, { opacity: 0, duration: 0.03 }, p2);
          mainTl.to(formU, { opacity: 1, duration: 0.04 }, p2 + 0.01);
          // U → circle
          mainTl.to(formU, { opacity: 0, duration: 0.03 }, p2 + 0.06);
          mainTl.to(formCircle, { opacity: 1, duration: 0.04 }, p2 + 0.06);
        }

        // Step 3 welding glow
        const weldSeam = section.querySelector(".weld-seam");
        const weldGlow = section.querySelector(".weld-glow");
        const sparks = section.querySelectorAll(".weld-spark");
        if (weldSeam && weldGlow) {
          const p3 = 2 / (totalPanels - 1);
          mainTl.to(weldSeam, { opacity: 1, duration: 0.04 }, p3);
          mainTl.to(weldGlow, { opacity: 0.6, duration: 0.06 }, p3);
          // Sparks fly outward
          sparks.forEach((spark, si) => {
            const angle = (si / sparks.length) * Math.PI * 2;
            const dx = Math.cos(angle) * 18;
            const dy = Math.sin(angle) * 18;
            mainTl.fromTo(
              spark,
              { opacity: 0, x: 0, y: 0 },
              { opacity: 1, x: dx, y: dy, duration: 0.04 },
              p3 + 0.01 + si * 0.005
            );
            mainTl.to(spark, { opacity: 0, duration: 0.02 }, p3 + 0.06);
          });
        }

        // Step 5 certified badge
        const shield = section.querySelector(".cert-shield");
        const check = section.querySelector(".cert-check");
        const certLabels = section.querySelector(".cert-labels");
        if (shield && check) {
          const p5 = 4 / (totalPanels - 1);
          if ((shield as SVGGeometryElement).getTotalLength) {
            const sLen = (shield as SVGGeometryElement).getTotalLength();
            gsap.set(shield, { strokeDasharray: sLen, strokeDashoffset: sLen });
            mainTl.to(shield, { strokeDashoffset: 0, duration: 0.08, ease: "power2.out" }, p5);
          }
          if ((check as SVGGeometryElement).getTotalLength) {
            const cLen = (check as SVGGeometryElement).getTotalLength();
            gsap.set(check, { strokeDasharray: cLen, strokeDashoffset: cLen });
            mainTl.to(check, { strokeDashoffset: 0, duration: 0.06, ease: "power2.out" }, p5 + 0.04);
          }
          if (certLabels) {
            mainTl.to(certLabels, { opacity: 1, duration: 0.04 }, p5 + 0.06);
          }
        }
      });

      /* ════════════════════════════════════════════════════════════
         MOBILE — vertical timeline, NO pinning
         ════════════════════════════════════════════════════════════ */
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".pp-mobile-card").forEach((card) => {
          gsap.from(card, {
            y: 32,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      {/* ── Section heading ──────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pt-24 lg:pt-32 pb-8 lg:pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs select-none" style={{ color: "var(--molten-500)" }}>03</span>
          <div className="flex-shrink-0" style={{ width: 120, height: 2, background: "var(--molten-500)" }} />
          <span className="font-mono text-xs tracking-[0.28em] uppercase select-none" style={{ color: "var(--text-muted)" }}>
            {t("label")}
          </span>
        </div>
        <h2
          className="font-display font-bold uppercase leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", color: "var(--text-white)" }}
        >
          {t("heading1")}{" "}
          <span style={{ color: "var(--molten-500)" }}>{t("heading2")} {t("heading2_accent")}</span>
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP: pinned horizontal track
          ══════════════════════════════════════════════════════════════════ */}
      <div ref={desktopRef} className="hidden md:block relative" style={{ minHeight: "100vh" }}>
        {/* Progress bar + dots */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[80%] max-w-3xl">
          {/* Pipe evolution */}
          <PipeEvolution className="w-64 h-8 opacity-60" />

          {/* Bar */}
          <div className="relative w-full h-px" style={{ background: "var(--border-dim)" }}>
            <div
              className="pp-progress-fill absolute inset-0 origin-left"
              style={{ background: "var(--molten-500)", transform: "scaleX(0)" }}
            />
          </div>

          {/* Dots */}
          <div className="flex justify-between w-full">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={`pp-dot-${i} w-3 h-3 border flex-shrink-0`}
                  style={{
                    borderColor: i === 0 ? "var(--molten-500)" : "var(--steel-600)",
                    background: i === 0 ? "var(--molten-500)" : "transparent",
                    opacity: i === 0 ? 1 : 0.4,
                    transform: i === 0 ? "scale(1.35)" : "scale(1)",
                  }}
                />
                <span
                  className="font-mono text-[0.5rem] tracking-wider uppercase hidden lg:block"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex"
          style={{ width: `${STEPS.length * 100}%` }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="pp-panel flex-shrink-0 flex items-center justify-center relative"
              style={{ width: `${100 / STEPS.length}%`, height: "100vh" }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${step.glowColor}, transparent 70%)`,
                }}
              />

              {/* Content card */}
              <div className="relative z-10 max-w-xl px-8 lg:px-12 pt-28">
                {/* Step number */}
                <span
                  className="font-mono text-[5rem] lg:text-[7rem] font-bold leading-none select-none"
                  style={{ color: step.color, opacity: 0.1 }}
                >
                  0{step.num}
                </span>

                {/* Icon */}
                <div className="mb-6 -mt-10" style={{ color: step.color }}>
                  {/* Step-specific visual */}
                  {step.num === 2 ? (
                    <FormingMorph className="w-full max-w-[260px] h-auto" />
                  ) : step.num === 3 ? (
                    <WeldingGlow className="w-full max-w-[260px] h-auto" />
                  ) : step.num === 5 ? (
                    <CertifiedBadge className="mb-2" />
                  ) : (
                    <StepIcon step={step.num} className="w-16 h-16" />
                  )}
                </div>

                {/* Title */}
                <h3
                  className="pp-title font-display font-bold uppercase text-2xl lg:text-3xl mb-2"
                  style={{ color: "var(--text-white)" }}
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-xs tracking-wider uppercase mb-4" style={{ color: step.color }}>
                  {step.subtitle}
                </p>

                {/* Copy */}
                <p className="pp-copy text-[0.92rem] leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                  {step.copy}
                </p>

                {/* Tagline */}
                <p
                  className="pp-tagline font-display font-bold uppercase text-sm tracking-wide"
                  style={{ color: step.color }}
                >
                  &ldquo;{step.tagline}&rdquo;
                </p>

                {/* Standard ref */}
                <span
                  className="inline-block mt-3 font-mono text-[0.58rem] px-2 py-0.5 tracking-wider uppercase"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-dim)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {step.standard}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE: vertical timeline
          ══════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative px-6 pb-20">
        {/* Timeline line */}
        <div
          className="absolute left-9 top-0 bottom-0 w-px"
          style={{ background: "var(--border-dim)" }}
          aria-hidden="true"
        />

        <div className="space-y-12">
          {STEPS.map((step, i) => (
            <div key={i} className="pp-mobile-card relative pl-16">
              {/* Timeline dot */}
              <div
                className="absolute left-[30px] top-2 w-3.5 h-3.5 border-2 z-10"
                style={{
                  borderColor: step.num === 3 ? "var(--molten-500)" : "var(--steel-600)",
                  background: step.num === 3 ? "var(--molten-500)" : "var(--bg-deep)",
                }}
              />

              {/* Card */}
              <div
                className="p-5 relative overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-dim)",
                }}
              >
                {/* Color accent top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: step.color }}
                />

                {/* Step number + title */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[0.6rem] tracking-wider uppercase px-1.5 py-0.5"
                    style={{ color: step.color, border: `1px solid ${step.glowColor}` }}
                  >
                    0{step.num}
                  </span>
                  <h3 className="font-display font-bold uppercase text-lg" style={{ color: "var(--text-white)" }}>
                    {step.title}
                  </h3>
                </div>

                <p className="font-mono text-[0.6rem] tracking-wider uppercase mb-3" style={{ color: step.color }}>
                  {step.subtitle}
                </p>

                <p className="text-[0.85rem] leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {step.copy}
                </p>

                <p className="font-display font-bold uppercase text-xs tracking-wide" style={{ color: step.color }}>
                  &ldquo;{step.tagline}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section motto ─────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 pb-20 lg:pb-28">
        <div style={{ borderTop: "1px solid var(--border-dim)" }} className="pt-8">
          <p
            className="font-display font-bold uppercase tracking-tight"
            style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)", color: "var(--text-muted)" }}
          >
            {t("motto")}
          </p>
        </div>
      </div>
    </section>
  );
}

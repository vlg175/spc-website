"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Production Process — Section 03  ·  THE SHOWPIECE
   5-step ERW pipeline: Preparation → Forming → Welding → Treatment → Testing
   Desktop (lg+):  GSAP ScrollTrigger pin + scrub, 2-column panels
   Tablet (md):    vertical timeline, enhanced cards with visual + text
   Mobile (<md):   vertical timeline, compact single-column cards
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
  color: string;
  glowColor: string;
}

/* ── Static step icon (no draw-in class, for mobile/tablet cards) ─────── */
function StepIconStatic({ step, className }: { step: number; className?: string }) {
  const cn = className ?? "w-12 h-12";
  const props = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn,
  };

  switch (step) {
    case 1:
      return (
        <svg {...props}>
          <path d="M16 44 C16 28, 28 16, 44 16 C52 16, 52 24, 44 24 C36 24, 36 32, 44 32 C48 32, 48 36, 44 36" />
          <line x1="44" y1="36" x2="56" y2="36" />
          <line x1="8" y1="48" x2="56" y2="48" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <line x1="8" y1="48" x2="56" y2="48" />
          <path d="M12 38 Q32 10, 52 38" />
          <circle cx="32" cy="28" r="14" />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="16" />
          <line x1="32" y1="16" x2="32" y2="48" />
          <line x1="22" y1="8" x2="26" y2="16" />
          <line x1="42" y1="8" x2="38" y2="16" />
          <line x1="16" y1="14" x2="22" y2="22" />
          <line x1="48" y1="14" x2="42" y2="22" />
        </svg>
      );
    case 4:
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="16" />
          <circle cx="32" cy="32" r="12" strokeDasharray="4 3" />
          <line x1="32" y1="10" x2="32" y2="14" />
          <line x1="32" y1="50" x2="32" y2="54" />
          <line x1="10" y1="32" x2="14" y2="32" />
          <line x1="50" y1="32" x2="54" y2="32" />
        </svg>
      );
    case 5:
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="16" />
          <polyline points="22,32 29,40 42,24" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Step 1 Visual: Steel Preparation — coil unrolling, rollers, trim ── */
function PrepVisual() {
  return (
    <svg viewBox="0 0 260 150" fill="none" className="w-full max-w-[340px]">
      {/* Coil glow pulse */}
      <circle className="prep-glow" cx="52" cy="75" r="50" fill="none"
        stroke="var(--molten-500)" strokeWidth="6" opacity="0" filter="url(#prepBlur)" />
      <defs><filter id="prepBlur"><feGaussianBlur stdDeviation="6" /></filter></defs>

      {/* Steel coil — concentric rings */}
      <circle className="step-icon-path prep-ring" cx="52" cy="75" r="42" stroke="var(--steel-300)" strokeWidth="2.5" />
      <circle className="step-icon-path prep-ring" cx="52" cy="75" r="30" stroke="var(--steel-400)" strokeWidth="2" />
      <circle className="step-icon-path prep-ring" cx="52" cy="75" r="18" stroke="var(--steel-500)" strokeWidth="1.5" />
      <circle className="prep-core" cx="52" cy="75" r="5" fill="var(--molten-500)" opacity="0" />

      {/* Strip unrolling from coil */}
      <rect className="prep-strip" x="92" y="71" width="156" height="8" rx="1"
        stroke="var(--steel-300)" strokeWidth="1.5" fill="rgba(42,62,114,0.08)" />

      {/* Moving hash marks on strip to show motion */}
      <g className="prep-motion-marks" opacity="0">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={110+i*28} y1="72" x2={116+i*28} y2="78"
            stroke="var(--steel-400)" strokeWidth="1" />
        ))}
      </g>

      {/* Leveling rollers */}
      <g className="prep-rollers" opacity="0">
        <circle cx="152" cy="56" r="12" stroke="var(--steel-400)" strokeWidth="1.5" fill="rgba(42,62,114,0.06)" />
        <circle cx="152" cy="94" r="12" stroke="var(--steel-400)" strokeWidth="1.5" fill="rgba(42,62,114,0.06)" />
        <path d="M145 45 L152 39 L159 45" stroke="var(--molten-500)" strokeWidth="1.2" />
        <path d="M145 105 L152 111 L159 105" stroke="var(--molten-500)" strokeWidth="1.2" />
        {/* Rotation indicator lines */}
        <line className="prep-roller-spin" x1="146" y1="56" x2="158" y2="56"
          stroke="var(--steel-300)" strokeWidth="0.8" />
        <line className="prep-roller-spin" x1="146" y1="94" x2="158" y2="94"
          stroke="var(--steel-300)" strokeWidth="0.8" />
      </g>

      {/* Trimming blade with cut flash */}
      <g className="prep-blade" opacity="0">
        <path d="M220 44 L227 71 L213 71 Z" stroke="var(--steel-200)" strokeWidth="1.2" fill="rgba(200,210,230,0.1)" />
        <line className="prep-cut-line" x1="220" y1="71" x2="220" y2="110"
          stroke="var(--molten-400)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0" />
        <circle className="prep-cut-flash" cx="220" cy="71" r="8"
          fill="var(--molten-300)" opacity="0" filter="url(#prepBlur)" />
      </g>
    </svg>
  );
}

/* ── Step 2 Visual: Forming — cross-section flat → U → circle ────────── */
function FormingVisual() {
  return (
    <svg viewBox="0 0 260 160" fill="none" className="w-full max-w-[340px]">
      <defs>
        <filter id="formGlow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {/* Stage 1: Flat bar */}
      <rect className="forming-flat" x="30" y="76" width="200" height="8" rx="1"
        stroke="var(--steel-300)" strokeWidth="1.5" fill="rgba(42,62,114,0.06)" />

      {/* Stage 2: Curving upward */}
      <path className="forming-curve" d="M50 80 Q130 20, 210 80"
        stroke="var(--steel-300)" strokeWidth="2" opacity="0" />

      {/* Stage 3: U-shape */}
      <path className="forming-u" d="M60 72 Q60 128, 130 128 Q200 128, 200 72"
        stroke="var(--steel-300)" strokeWidth="2" opacity="0" />

      {/* Stage 4: Full circle with glow */}
      <circle className="forming-glow" cx="130" cy="80" r="44"
        stroke="var(--molten-500)" strokeWidth="8" opacity="0" filter="url(#formGlow)" />
      <circle className="forming-circle" cx="130" cy="80" r="38"
        stroke="var(--steel-200)" strokeWidth="2.5" opacity="0" />

      {/* Pressure lines during forming */}
      <g className="forming-pressure" opacity="0">
        {[0,1,2,3].map(i => (
          <line key={i} x1={30+i*20} y1="40" x2={30+i*20} y2="120"
            stroke="var(--steel-500)" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}
        {[0,1,2,3].map(i => (
          <line key={`r${i}`} x1={170+i*20} y1="40" x2={170+i*20} y2="120"
            stroke="var(--steel-500)" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}
      </g>

      {/* Forming rollers */}
      <g className="forming-rollers" opacity="0">
        <circle cx="58" cy="80" r="11" stroke="var(--steel-400)" strokeWidth="1.5" fill="rgba(42,62,114,0.08)" />
        <circle cx="202" cy="80" r="11" stroke="var(--steel-400)" strokeWidth="1.5" fill="rgba(42,62,114,0.08)" />
        <path d="M48 68 L58 60 L68 68" stroke="var(--molten-500)" strokeWidth="1" />
        <path d="M192 68 L202 60 L212 68" stroke="var(--molten-500)" strokeWidth="1" />
      </g>

      {/* Label */}
      <text className="forming-label" x="130" y="155" textAnchor="middle"
        fill="var(--molten-400)" fontSize="9" fontFamily="monospace" letterSpacing="0.18em" opacity="0">
        FLAT → U → CIRCLE
      </text>
    </svg>
  );
}

/* ── Step 3 Visual: HF Welding — arcs, glow, sparks, temperature ─────── */
function WeldingVisual() {
  return (
    <svg viewBox="0 0 260 160" fill="none" className="w-full max-w-[340px]">
      <defs>
        <filter id="weldBlur"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="weldBlur2"><feGaussianBlur stdDeviation="8" /></filter>
        <radialGradient id="weldHeat" cx="50%" cy="25%">
          <stop offset="0%" stopColor="var(--molten-300)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--molten-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Heat zone glow behind pipe */}
      <circle className="weld-heat-zone" cx="130" cy="72" r="56" fill="url(#weldHeat)" opacity="0" />

      {/* Pipe cross-section */}
      <circle cx="130" cy="72" r="40" stroke="var(--molten-500)" strokeWidth="1.5" />

      {/* Weld seam */}
      <line className="weld-seam" x1="130" y1="32" x2="130" y2="112"
        stroke="var(--molten-400)" strokeWidth="3" opacity="0" />

      {/* Outer glow ring — pulsing */}
      <circle className="weld-glow" cx="130" cy="72" r="48"
        stroke="var(--molten-300)" strokeWidth="10" opacity="0" filter="url(#weldBlur)" />
      {/* Inner intense glow at seam */}
      <circle className="weld-inner-glow" cx="130" cy="32" r="12"
        fill="var(--molten-200)" opacity="0" filter="url(#weldBlur2)" />

      {/* Electric arcs — more dramatic zigzag */}
      <path className="weld-arc" d="M130 32 L118 18 L126 8 L112 -6"
        stroke="var(--molten-300)" strokeWidth="2" opacity="0" />
      <path className="weld-arc" d="M130 32 L142 18 L134 8 L148 -6"
        stroke="var(--molten-300)" strokeWidth="2" opacity="0" />
      <path className="weld-arc" d="M130 32 L125 14 L133 6"
        stroke="var(--molten-200)" strokeWidth="1.5" opacity="0" />

      {/* Spark particles — bigger, more spread */}
      {[
        { cx: 105, cy: 42 }, { cx: 155, cy: 44 },
        { cx: 96, cy: 58 }, { cx: 164, cy: 56 },
        { cx: 100, cy: 86 }, { cx: 160, cy: 88 },
        { cx: 110, cy: 102 }, { cx: 150, cy: 100 },
        { cx: 88, cy: 70 }, { cx: 172, cy: 72 },
        { cx: 114, cy: 34 }, { cx: 146, cy: 36 },
        { cx: 130, cy: 24 }, { cx: 120, cy: 108 },
        { cx: 140, cy: 108 }, { cx: 82, cy: 82 },
      ].map((p, i) => (
        <circle key={i} className="weld-spark" cx={p.cx} cy={p.cy}
          r={i % 3 === 0 ? 3 : 2} fill="var(--molten-300)" opacity="0" />
      ))}

      {/* Temperature readout with box */}
      <rect className="weld-temp-bg" x="88" y="134" width="84" height="20" rx="2"
        fill="rgba(232,94,34,0.08)" stroke="var(--molten-500)" strokeWidth="0.8" opacity="0" />
      <text className="weld-temp" x="130" y="149" textAnchor="middle"
        fill="var(--molten-400)" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em" opacity="0">
        1,000°C
      </text>
    </svg>
  );
}

/* ── Step 4 Visual: Treatment & Sizing — oval→circle, dimensions ─────── */
function SizingVisual() {
  return (
    <svg viewBox="0 0 260 160" fill="none" className="w-full max-w-[340px]">
      <defs>
        <filter id="sizeGlow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {/* Imperfect oval (initial state) */}
      <ellipse className="sizing-oval step-icon-path" cx="130" cy="75" rx="55" ry="38"
        stroke="var(--copper-400)" strokeWidth="2" strokeDasharray="6 4" />

      {/* Perfect circle glow */}
      <circle className="sizing-glow" cx="130" cy="75" r="50"
        stroke="var(--copper-300)" strokeWidth="6" opacity="0" filter="url(#sizeGlow)" />
      {/* Perfect circle (target) */}
      <circle className="sizing-circle" cx="130" cy="75" r="44"
        stroke="var(--copper-300)" strokeWidth="2.5" opacity="0" />

      {/* Cross-hair at center */}
      <g className="sizing-crosshair" opacity="0">
        <line x1="125" y1="75" x2="135" y2="75" stroke="var(--copper-400)" strokeWidth="0.8" />
        <line x1="130" y1="70" x2="130" y2="80" stroke="var(--copper-400)" strokeWidth="0.8" />
      </g>

      {/* Squeeze arrows pressing inward — animated pulse */}
      <g className="sizing-arrows" opacity="0">
        <line x1="14" y1="75" x2="70" y2="75" stroke="var(--copper-500)" strokeWidth="1.8" />
        <path d="M58 65 L72 75 L58 85" stroke="var(--copper-500)" strokeWidth="2" fill="none" />
        <line x1="246" y1="75" x2="190" y2="75" stroke="var(--copper-500)" strokeWidth="1.8" />
        <path d="M202 65 L188 75 L202 85" stroke="var(--copper-500)" strokeWidth="2" fill="none" />
        {/* Vertical squeeze */}
        <line x1="130" y1="8" x2="130" y2="26" stroke="var(--copper-500)" strokeWidth="1.2" />
        <path d="M122 20 L130 28 L138 20" stroke="var(--copper-500)" strokeWidth="1.2" fill="none" />
        <line x1="130" y1="142" x2="130" y2="124" stroke="var(--copper-500)" strokeWidth="1.2" />
        <path d="M122 130 L130 122 L138 130" stroke="var(--copper-500)" strokeWidth="1.2" fill="none" />
      </g>

      {/* Horizontal dimension line */}
      <g className="sizing-dim-h" opacity="0">
        <line x1="86" y1="20" x2="174" y2="20" stroke="var(--copper-400)" strokeWidth="1" />
        <line x1="86" y1="14" x2="86" y2="26" stroke="var(--copper-400)" strokeWidth="1" />
        <line x1="174" y1="14" x2="174" y2="26" stroke="var(--copper-400)" strokeWidth="1" />
      </g>

      {/* Vertical dimension line */}
      <g className="sizing-dim-v" opacity="0">
        <line x1="224" y1="31" x2="224" y2="119" stroke="var(--copper-400)" strokeWidth="1" />
        <line x1="218" y1="31" x2="230" y2="31" stroke="var(--copper-400)" strokeWidth="1" />
        <line x1="218" y1="119" x2="230" y2="119" stroke="var(--copper-400)" strokeWidth="1" />
      </g>

      {/* Measurement labels */}
      <rect className="sizing-text-bg" x="100" y="3" width="60" height="16" rx="2"
        fill="rgba(184,115,51,0.08)" stroke="var(--copper-400)" strokeWidth="0.6" opacity="0" />
      <text className="sizing-text" x="130" y="14" textAnchor="middle"
        fill="var(--copper-300)" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.1em" opacity="0">
        Ø 219mm
      </text>
      <text className="sizing-text-v" x="244" y="78" textAnchor="middle"
        fill="var(--copper-300)" fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0">
        ±0.5
      </text>
    </svg>
  );
}

/* ── Step 5 Visual: Testing & Certification — clean linear layout ───── */
function TestingVisual() {
  return (
    <div className="w-full max-w-[340px]">
      <svg viewBox="0 0 260 150" fill="none" className="w-full">
        <defs>
          <filter id="testGlow"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        {/* ── Row 1: Pipe + waves (top-left) ── */}
        {/* Pipe cross-section */}
        <circle className="cert-pipe-glow" cx="42" cy="38" r="24"
          fill="var(--status-success-light)" opacity="0" filter="url(#testGlow)" />
        <circle cx="42" cy="38" r="18" stroke="var(--status-success-light)" strokeWidth="1.5" />

        {/* Ultrasonic wave arcs emanating right */}
        {[0, 1, 2].map((i) => (
          <path key={i} className="cert-wave"
            d={`M${66 + i * 14} ${22 - i * 2} Q${72 + i * 14} 38, ${66 + i * 14} ${54 + i * 2}`}
            stroke="var(--status-success-light)" strokeWidth={1.4 - i * 0.2} opacity="0" />
        ))}

        {/* ── Row 1: Gauge (top-right) ── */}
        <circle className="cert-gauge-bg" cx="190" cy="38" r="28"
          fill="rgba(46,140,88,0.04)" stroke="var(--steel-500)" strokeWidth="0.5" opacity="0" />
        <path className="cert-gauge"
          d="M168 58 A26 26 0 1 1 212 58"
          stroke="var(--steel-400)" strokeWidth="1.5" fill="none" opacity="0" />
        <g className="cert-gauge-ticks" opacity="0">
          {[0,1,2,3,4].map(i => {
            const a = -180 + i * 45;
            const rad = a * Math.PI / 180;
            return (
              <line key={i}
                x1={190 + Math.cos(rad) * 21} y1={40 + Math.sin(rad) * 21}
                x2={190 + Math.cos(rad) * 25} y2={40 + Math.sin(rad) * 25}
                stroke="var(--steel-400)" strokeWidth="1.2" />
            );
          })}
        </g>
        <line className="cert-needle" x1="190" y1="20" x2="190" y2="34"
          stroke="var(--status-success-light)" strokeWidth="2" opacity="0" />
        <circle className="cert-needle-hub" cx="190" cy="40" r="2.5"
          fill="var(--status-success-light)" opacity="0" />
        <text className="cert-pressure" x="190" y="76" textAnchor="middle"
          fill="var(--status-success-light)" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0">
          12 MPa
        </text>

        {/* Connecting line between rows */}
        <line className="cert-connector" x1="130" y1="68" x2="130" y2="82"
          stroke="var(--steel-500)" strokeWidth="0.6" strokeDasharray="2 2" opacity="0" />

        {/* ── Row 2: Shield + check (bottom-center) ── */}
        <path className="cert-shield-glow"
          d="M130 86 L156 94 L156 116 Q156 130, 130 134 Q104 130, 104 116 L104 94 Z"
          fill="var(--status-success-light)" opacity="0" filter="url(#testGlow)" />
        <path className="cert-shield"
          d="M130 86 L156 94 L156 116 Q156 130, 130 134 Q104 130, 104 116 L104 94 Z"
          stroke="var(--status-success-light)" strokeWidth="1.5" fill="none" />
        <polyline className="cert-check" points="118,112 125,120 142,104"
          stroke="var(--status-success-light)" strokeWidth="2.5" />
      </svg>

      {/* GOST certification labels */}
      <div className="cert-labels flex flex-wrap gap-2 mt-3 opacity-0">
        {["GOST 10704", "GOST 10705", "ISO 559", "Uzstandard"].map((s) => (
          <span key={s} className="font-mono text-[0.58rem] px-2 py-0.5 tracking-wider uppercase"
            style={{ color: "var(--status-success-light)", border: "1px solid rgba(46,140,88,0.35)", background: "rgba(46,140,88,0.08)" }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════════════════════ */
export default function ProductionProcess() {
  const t = useTranslations("process");

  const STEPS: Step[] = [
    { num: 1, title: t("s1_title"), subtitle: t("s1_subtitle"), copy: t("s1_copy"), tagline: t("s1_tagline"), standard: "GOST 380-2005", color: "var(--steel-400)", glowColor: "rgba(101,128,152,0.30)" },
    { num: 2, title: t("s2_title"), subtitle: t("s2_subtitle"), copy: t("s2_copy"), tagline: t("s2_tagline"), standard: "Precision rollers", color: "var(--steel-300)", glowColor: "rgba(138,164,188,0.30)" },
    { num: 3, title: t("s3_title"), subtitle: t("s3_subtitle"), copy: t("s3_copy"), tagline: t("s3_tagline"), standard: "ERW HF process", color: "var(--molten-500)", glowColor: "rgba(232,94,34,0.40)" },
    { num: 4, title: t("s4_title"), subtitle: t("s4_subtitle"), copy: t("s4_copy"), tagline: t("s4_tagline"), standard: "Ø ±0.5mm tolerance", color: "var(--copper-400)", glowColor: "rgba(208,140,66,0.30)" },
    { num: 5, title: t("s5_title"), subtitle: t("s5_subtitle"), copy: t("s5_copy"), tagline: t("s5_tagline"), standard: "GOST 10704 · 10705 · ISO 559", color: "var(--status-success-light)", glowColor: "rgba(46,140,88,0.30)" },
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
         DESKTOP (lg+) — pinned horizontal scroll
         ══════════════════════════════════════════════════════════════ */
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const desktop = desktopRef.current;
        if (!track || !desktop) return;

        const panels = gsap.utils.toArray<HTMLElement>(".pp-panel");
        const totalPanels = panels.length;

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: desktop,
            start: "top top",
            end: () => `+=${window.innerHeight * 5}`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (totalPanels - 1),
              duration: { min: 0.3, max: 0.8 },
              delay: 0.05,
              ease: "power2.inOut",
            },
            invalidateOnRefresh: true,
          },
        });

        // ── All animations use explicit durations to stay in sync ──
        // Total timeline = 1 unit. Each step occupies 1/(N-1) of it.
        const DUR = 1; // full timeline span

        // Slide track horizontally — spans the FULL timeline
        mainTl.to(track, {
          xPercent: -100 * (totalPanels - 1) / totalPanels,
          ease: "none",
          duration: DUR,
        });

        // Progress bar fill — also spans the full timeline
        mainTl.to(".pp-progress-fill", { scaleX: 1, ease: "none", duration: DUR }, 0);

        // Progress step indicators
        panels.forEach((_, i) => {
          const p = i / (totalPanels - 1) * DUR;
          mainTl.to(`.pp-step-ind-${i}`, { opacity: 1, duration: 0.001 }, p);
          mainTl.to(`.pp-step-ind-${i} .pp-step-num`, { color: "var(--molten-500)", duration: 0.001 }, p);
          if (i > 0) {
            mainTl.to(`.pp-step-ind-${i - 1}`, { opacity: 0.35, duration: 0.001 }, p);
            mainTl.to(`.pp-step-ind-${i - 1} .pp-step-num`, { color: "var(--steel-600)", duration: 0.001 }, p);
          }
        });

        // Per-panel content reveals
        const STEP = DUR / (totalPanels - 1); // duration of one step in timeline units
        const REVEAL = STEP * 0.4; // content reveals in the first 40% of each step's window

        panels.forEach((panel, i) => {
          const p = (i / (totalPanels - 1)) * DUR; // position in timeline
          const paths = panel.querySelectorAll(".step-icon-path");
          const title = panel.querySelector(".pp-title");
          const subtitle = panel.querySelector(".pp-subtitle");
          const copy = panel.querySelector(".pp-copy");
          const tagline = panel.querySelector(".pp-tagline");
          const visual = panel.querySelector(".pp-visual-area");

          if (i === 0) {
            // First step: draw coil rings, then reveal strip/rollers/blade
            paths.forEach((path) => {
              const el = path as SVGGeometryElement;
              if (el.getTotalLength) {
                const len = el.getTotalLength();
                gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
                mainTl.to(el, { strokeDashoffset: 0, duration: REVEAL, ease: "power2.out" }, 0);
              }
            });

            // Step 1 multi-stage: glow pulse → core → strip extends → rollers spin in → blade drops + flash
            const prepCore = panel.querySelector(".prep-core");
            const prepStrip = panel.querySelector(".prep-strip");
            const prepRollers = panel.querySelector(".prep-rollers");
            const prepBlade = panel.querySelector(".prep-blade");
            const prepGlow = panel.querySelector(".prep-glow");
            const prepRings = panel.querySelectorAll(".prep-ring");
            const prepMotion = panel.querySelector(".prep-motion-marks");
            const prepCutFlash = panel.querySelector(".prep-cut-flash");
            const prepCutLine = panel.querySelector(".prep-cut-line");

            // Glow pulse behind coil
            if (prepGlow) {
              mainTl.to(prepGlow, { opacity: 0.35, duration: REVEAL * 0.3, ease: "power2.in" }, REVEAL * 0.1);
              mainTl.to(prepGlow, { opacity: 0, duration: REVEAL * 0.4 }, REVEAL * 0.5);
            }
            // Rings rotate slightly to suggest coil spinning
            prepRings.forEach((ring, ri) => {
              mainTl.to(ring, { rotation: 15 + ri * 10, transformOrigin: "52px 75px", duration: REVEAL * 0.8, ease: "power1.out" }, REVEAL * 0.15);
            });
            if (prepCore) {
              mainTl.to(prepCore, { opacity: 1, scale: 1.3, duration: REVEAL * 0.2, ease: "back.out(2)" }, REVEAL * 0.15);
              mainTl.to(prepCore, { scale: 1, duration: REVEAL * 0.2 }, REVEAL * 0.35);
            }
            if (prepStrip) {
              gsap.set(prepStrip, { scaleX: 0, transformOrigin: "left center" });
              mainTl.to(prepStrip, { scaleX: 1, duration: REVEAL * 0.5, ease: "power3.out" }, REVEAL * 0.25);
            }
            // Motion marks on strip (movement feel)
            if (prepMotion) {
              mainTl.to(prepMotion, { opacity: 0.5, duration: REVEAL * 0.15 }, REVEAL * 0.5);
              mainTl.to(prepMotion, { x: -12, duration: REVEAL * 0.4, ease: "none" }, REVEAL * 0.5);
              mainTl.to(prepMotion, { opacity: 0, duration: REVEAL * 0.1 }, REVEAL * 0.85);
            }
            if (prepRollers) {
              gsap.set(prepRollers, { scale: 0.5, opacity: 0 });
              mainTl.to(prepRollers, { opacity: 1, scale: 1, duration: REVEAL * 0.35, ease: "back.out(2)" }, REVEAL * 0.45);
            }
            if (prepBlade) {
              gsap.set(prepBlade, { y: -20 });
              mainTl.to(prepBlade, { opacity: 1, y: 0, duration: REVEAL * 0.2, ease: "power3.in" }, REVEAL * 0.7);
              // Cut flash effect
              if (prepCutFlash) {
                mainTl.to(prepCutFlash, { opacity: 0.7, duration: REVEAL * 0.08 }, REVEAL * 0.85);
                mainTl.to(prepCutFlash, { opacity: 0, duration: REVEAL * 0.15 }, REVEAL * 0.92);
              }
              if (prepCutLine) {
                mainTl.to(prepCutLine, { opacity: 0.8, duration: REVEAL * 0.1 }, REVEAL * 0.85);
              }
            }
            return;
          }

          // Panels 2–5: hide initially, reveal as panel scrolls into view
          // Content should start appearing BEFORE the panel is fully centered
          const revealStart = p - STEP * 0.25; // start reveal 25% before center

          if (visual) {
            gsap.set(visual, { opacity: 0, scale: 0.92 });
            mainTl.to(visual, { opacity: 1, scale: 1, duration: REVEAL, ease: "power2.out" }, revealStart);
          }

          paths.forEach((path) => {
            const el = path as SVGGeometryElement;
            if (el.getTotalLength) {
              const len = el.getTotalLength();
              gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
              mainTl.to(el, { strokeDashoffset: 0, duration: REVEAL, ease: "power2.out" }, revealStart);
            }
          });

          if (title) {
            gsap.set(title, { clipPath: "inset(0 100% 0 0)" });
            mainTl.to(title, { clipPath: "inset(0 0% 0 0)", duration: REVEAL * 0.7, ease: "power2.out" }, revealStart);
          }
          if (subtitle) {
            gsap.set(subtitle, { opacity: 0, y: 10 });
            mainTl.to(subtitle, { opacity: 1, y: 0, duration: REVEAL * 0.6, ease: "power2.out" }, revealStart + REVEAL * 0.15);
          }
          if (copy) {
            gsap.set(copy, { opacity: 0, y: 20 });
            mainTl.to(copy, { opacity: 1, y: 0, duration: REVEAL * 0.7, ease: "power2.out" }, revealStart + REVEAL * 0.25);
          }
          if (tagline) {
            gsap.set(tagline, { opacity: 0 });
            mainTl.to(tagline, { opacity: 1, duration: REVEAL * 0.5 }, revealStart + REVEAL * 0.4);
          }
        });

        /* ── Step 2: Forming — flat → curve → U → circle + rollers + glow ─── */
        const formFlat = section.querySelector(".forming-flat");
        const formCurve = section.querySelector(".forming-curve");
        const formU = section.querySelector(".forming-u");
        const formCircle = section.querySelector(".forming-circle");
        const formGlow = section.querySelector(".forming-glow");
        const formRollers = section.querySelector(".forming-rollers");
        const formPressure = section.querySelector(".forming-pressure");
        const formLabel = section.querySelector(".forming-label");
        if (formFlat && formU && formCircle) {
          const p2 = (1 / (totalPanels - 1)) * DUR;
          // pressure lines appear first (context)
          if (formPressure) {
            mainTl.to(formPressure, { opacity: 0.4, duration: STEP * 0.15 }, p2 - STEP * 0.15);
          }
          // rollers squeeze in from sides
          if (formRollers) {
            gsap.set(formRollers, { scaleX: 1.4, opacity: 0 });
            mainTl.to(formRollers, { opacity: 1, scaleX: 1, duration: STEP * 0.2, ease: "back.out(1.5)" }, p2 - STEP * 0.12);
          }
          // flat → curve (starts bending)
          mainTl.to(formFlat, { opacity: 0, scaleY: 0.5, duration: STEP * 0.12, ease: "power2.in" }, p2 - STEP * 0.1);
          if (formCurve) {
            gsap.set(formCurve, { scale: 0.95, transformOrigin: "center center" });
            mainTl.to(formCurve, { opacity: 1, scale: 1, duration: STEP * 0.15, ease: "power2.out" }, p2 - STEP * 0.06);
            mainTl.to(formCurve, { opacity: 0, duration: STEP * 0.08 }, p2 + STEP * 0.04);
          }
          // curve → U
          mainTl.to(formU, { opacity: 1, duration: STEP * 0.12 }, p2 + STEP * 0.04);
          mainTl.to(formU, { opacity: 0, duration: STEP * 0.08 }, p2 + STEP * 0.16);
          // U → circle with flash glow
          if (formGlow) {
            mainTl.to(formGlow, { opacity: 0.35, duration: STEP * 0.12 }, p2 + STEP * 0.16);
            mainTl.to(formGlow, { opacity: 0, duration: STEP * 0.2 }, p2 + STEP * 0.28);
          }
          mainTl.to(formCircle, { opacity: 1, duration: STEP * 0.18, ease: "back.out(1.2)" }, p2 + STEP * 0.17);
          // pressure lines fade
          if (formPressure) {
            mainTl.to(formPressure, { opacity: 0, duration: STEP * 0.12 }, p2 + STEP * 0.22);
          }
          // rollers fade out
          if (formRollers) {
            mainTl.to(formRollers, { opacity: 0, duration: STEP * 0.12 }, p2 + STEP * 0.24);
          }
          // label fades in at end
          if (formLabel) {
            mainTl.to(formLabel, { opacity: 0.8, y: -4, duration: STEP * 0.2, ease: "power2.out" }, p2 + STEP * 0.2);
          }
        }

        /* ── Step 3: Welding — heat zone, seam, arcs, glow, sparks, temp ──── */
        const weldSeam = section.querySelector(".weld-seam");
        const weldGlow = section.querySelector(".weld-glow");
        const weldInnerGlow = section.querySelector(".weld-inner-glow");
        const weldHeatZone = section.querySelector(".weld-heat-zone");
        const weldArcs = section.querySelectorAll(".weld-arc");
        const sparks = section.querySelectorAll(".weld-spark");
        const weldTemp = section.querySelector(".weld-temp");
        const weldTempBg = section.querySelector(".weld-temp-bg");
        if (weldSeam && weldGlow) {
          const p3 = (2 / (totalPanels - 1)) * DUR;
          // heat zone fades in behind everything
          if (weldHeatZone) {
            mainTl.to(weldHeatZone, { opacity: 0.6, duration: STEP * 0.3 }, p3 - STEP * 0.15);
          }
          // seam ignites with flash
          mainTl.to(weldSeam, { opacity: 1, strokeWidth: 5, duration: STEP * 0.12, ease: "power3.in" }, p3 - STEP * 0.1);
          mainTl.to(weldSeam, { strokeWidth: 3, duration: STEP * 0.15 }, p3 + STEP * 0.02);
          // inner glow at seam point
          if (weldInnerGlow) {
            mainTl.to(weldInnerGlow, { opacity: 0.6, duration: STEP * 0.15 }, p3 - STEP * 0.08);
            mainTl.to(weldInnerGlow, { opacity: 0.2, duration: STEP * 0.25 }, p3 + STEP * 0.15);
          }
          // outer glow ring pulses up and down
          mainTl.to(weldGlow, { opacity: 0.6, duration: STEP * 0.2 }, p3 - STEP * 0.08);
          mainTl.to(weldGlow, { opacity: 0.25, duration: STEP * 0.15 }, p3 + STEP * 0.08);
          mainTl.to(weldGlow, { opacity: 0.5, duration: STEP * 0.1 }, p3 + STEP * 0.2);
          // electric arcs flash in rapidly, flicker
          weldArcs.forEach((arc, ai) => {
            mainTl.to(arc, { opacity: 1, duration: STEP * 0.05 }, p3 - STEP * 0.06 + ai * STEP * 0.02);
            mainTl.to(arc, { opacity: 0.3, duration: STEP * 0.04 }, p3 + STEP * 0.02 + ai * STEP * 0.02);
            mainTl.to(arc, { opacity: 0.9, duration: STEP * 0.04 }, p3 + STEP * 0.08 + ai * STEP * 0.015);
            mainTl.to(arc, { opacity: 0, duration: STEP * 0.08 }, p3 + STEP * 0.18 + ai * STEP * 0.02);
          });
          // sparks fly outward — bigger radius, more dramatic
          sparks.forEach((spark, si) => {
            const angle = (si / sparks.length) * Math.PI * 2;
            const dx = Math.cos(angle) * 38;
            const dy = Math.sin(angle) * 38;
            mainTl.fromTo(spark,
              { opacity: 0, x: 0, y: 0, scale: 0.5 },
              { opacity: 1, x: dx * 0.4, y: dy * 0.4, scale: 1.5, duration: STEP * 0.08, ease: "power3.out" },
              p3 + STEP * 0.01 + si * STEP * 0.012
            );
            mainTl.to(spark,
              { x: dx, y: dy, opacity: 0, scale: 0.3, duration: STEP * 0.18, ease: "power1.out" },
              p3 + STEP * 0.09 + si * STEP * 0.012
            );
          });
          // temperature readout with bg box
          if (weldTempBg) {
            mainTl.to(weldTempBg, { opacity: 1, duration: STEP * 0.15 }, p3 + STEP * 0.06);
          }
          if (weldTemp) {
            mainTl.to(weldTemp, { opacity: 1, duration: STEP * 0.15 }, p3 + STEP * 0.08);
          }
          // heat zone fades
          if (weldHeatZone) {
            mainTl.to(weldHeatZone, { opacity: 0.2, duration: STEP * 0.2 }, p3 + STEP * 0.25);
          }
        }

        /* ── Step 4: Sizing — arrows squeeze → oval morphs → circle + glow + dims ── */
        const sizingOval = section.querySelector(".sizing-oval");
        const sizingCircle = section.querySelector(".sizing-circle");
        const sizingGlow = section.querySelector(".sizing-glow");
        const sizingArrows = section.querySelector(".sizing-arrows");
        const sizingCrosshair = section.querySelector(".sizing-crosshair");
        const sizingDimH = section.querySelector(".sizing-dim-h");
        const sizingDimV = section.querySelector(".sizing-dim-v");
        const sizingTexts = section.querySelectorAll(".sizing-text, .sizing-text-v");
        const sizingTextBg = section.querySelector(".sizing-text-bg");
        if (sizingOval && sizingCircle) {
          const p4 = (3 / (totalPanels - 1)) * DUR;
          // arrows slide in from far edges
          if (sizingArrows) {
            gsap.set(sizingArrows, { scaleX: 1.3, opacity: 0 });
            mainTl.to(sizingArrows, { opacity: 1, scaleX: 1, duration: STEP * 0.2, ease: "power3.out" }, p4 - STEP * 0.18);
          }
          // oval squeezes to circle (animate rx/ry)
          mainTl.to(sizingOval, {
            attr: { rx: 44, ry: 44 },
            strokeDasharray: "none",
            duration: STEP * 0.25,
            ease: "power2.inOut"
          }, p4 - STEP * 0.08);
          mainTl.to(sizingOval, { opacity: 0, duration: STEP * 0.08 }, p4 + STEP * 0.12);
          // glow flash on morph completion
          if (sizingGlow) {
            mainTl.to(sizingGlow, { opacity: 0.4, duration: STEP * 0.1, ease: "power2.in" }, p4 + STEP * 0.1);
            mainTl.to(sizingGlow, { opacity: 0, duration: STEP * 0.2 }, p4 + STEP * 0.2);
          }
          mainTl.to(sizingCircle, { opacity: 1, duration: STEP * 0.15, ease: "back.out(1.2)" }, p4 + STEP * 0.08);
          // crosshair snaps on
          if (sizingCrosshair) {
            mainTl.to(sizingCrosshair, { opacity: 0.6, duration: STEP * 0.08 }, p4 + STEP * 0.12);
          }
          // arrows pulse then dim
          if (sizingArrows) {
            mainTl.to(sizingArrows, { opacity: 0.6, duration: STEP * 0.05 }, p4 + STEP * 0.1);
            mainTl.to(sizingArrows, { opacity: 0.2, duration: STEP * 0.15 }, p4 + STEP * 0.18);
          }
          // dimension lines draw in with scale
          if (sizingDimH) {
            gsap.set(sizingDimH, { scaleX: 0, transformOrigin: "center center" });
            mainTl.to(sizingDimH, { opacity: 1, scaleX: 1, duration: STEP * 0.2, ease: "power2.out" }, p4 + STEP * 0.12);
          }
          if (sizingDimV) {
            gsap.set(sizingDimV, { scaleY: 0, transformOrigin: "center center" });
            mainTl.to(sizingDimV, { opacity: 1, scaleY: 1, duration: STEP * 0.2, ease: "power2.out" }, p4 + STEP * 0.16);
          }
          // text bg + text labels
          if (sizingTextBg) {
            mainTl.to(sizingTextBg, { opacity: 1, duration: STEP * 0.12 }, p4 + STEP * 0.2);
          }
          sizingTexts.forEach((txt, ti) => {
            mainTl.to(txt, { opacity: 1, duration: STEP * 0.12, ease: "power2.out" }, p4 + STEP * 0.22 + ti * STEP * 0.04);
          });
        }

        /* ── Step 5: Testing — pipe glow, waves cascade, gauge sweep, shield stamp, labels ─── */
        const certPipeGlow = section.querySelector(".cert-pipe-glow");
        const certWaves = section.querySelectorAll(".cert-wave");
        const certGaugeBg = section.querySelector(".cert-gauge-bg");
        const certGauge = section.querySelector(".cert-gauge");
        const certGaugeTicks = section.querySelector(".cert-gauge-ticks");
        const certNeedle = section.querySelector(".cert-needle");
        const certNeedleHub = section.querySelector(".cert-needle-hub");
        const certPressure = section.querySelector(".cert-pressure");
        const certConnector = section.querySelector(".cert-connector");
        const shield = section.querySelector(".cert-shield");
        const shieldGlow = section.querySelector(".cert-shield-glow");
        const check = section.querySelector(".cert-check");
        const certLabels = section.querySelector(".cert-labels");
        {
          const p5 = (4 / (totalPanels - 1)) * DUR;
          // pipe glow pulsing
          if (certPipeGlow) {
            mainTl.to(certPipeGlow, { opacity: 0.15, duration: STEP * 0.2 }, p5 - STEP * 0.2);
            mainTl.to(certPipeGlow, { opacity: 0.05, duration: STEP * 0.15 }, p5);
            mainTl.to(certPipeGlow, { opacity: 0.12, duration: STEP * 0.1 }, p5 + STEP * 0.12);
          }
          // ultrasonic waves cascade outward with scale
          certWaves.forEach((wave, wi) => {
            gsap.set(wave, { scale: 0.8, transformOrigin: "center center" });
            mainTl.to(wave, { opacity: 0.8, scale: 1, duration: STEP * 0.1, ease: "power2.out" }, p5 - STEP * 0.22 + wi * STEP * 0.035);
            mainTl.to(wave, { opacity: 0.15, duration: STEP * 0.12 }, p5 - STEP * 0.06 + wi * STEP * 0.025);
            mainTl.to(wave, { opacity: 0.5, duration: STEP * 0.08 }, p5 + STEP * 0.08 + wi * STEP * 0.02);
          });
          // gauge background circle
          if (certGaugeBg) {
            mainTl.to(certGaugeBg, { opacity: 1, duration: STEP * 0.15 }, p5 - STEP * 0.18);
          }
          // gauge arc + ticks
          if (certGauge) {
            mainTl.to(certGauge, { opacity: 1, duration: STEP * 0.15 }, p5 - STEP * 0.15);
          }
          if (certGaugeTicks) {
            mainTl.to(certGaugeTicks, { opacity: 1, duration: STEP * 0.12 }, p5 - STEP * 0.12);
          }
          // needle sweeps from far left to target with overshoot
          if (certNeedle) {
            gsap.set(certNeedle, { rotation: -90, transformOrigin: "50% 100%" });
            mainTl.to(certNeedle, { opacity: 1, rotation: 10, duration: STEP * 0.25, ease: "power3.out" }, p5 - STEP * 0.1);
            mainTl.to(certNeedle, { rotation: 0, duration: STEP * 0.1, ease: "power2.inOut" }, p5 + STEP * 0.12);
          }
          if (certNeedleHub) {
            mainTl.to(certNeedleHub, { opacity: 1, duration: STEP * 0.1 }, p5 - STEP * 0.08);
          }
          // pressure text punches in
          if (certPressure) {
            gsap.set(certPressure, { scale: 0.5 });
            mainTl.to(certPressure, { opacity: 1, scale: 1, duration: STEP * 0.12, ease: "back.out(2)" }, p5 + STEP * 0.1);
          }
          // connector line
          if (certConnector) {
            mainTl.to(certConnector, { opacity: 0.5, duration: STEP * 0.1 }, p5 + STEP * 0.02);
          }
          // shield draws in
          if (shield && (shield as SVGGeometryElement).getTotalLength) {
            const sLen = (shield as SVGGeometryElement).getTotalLength();
            gsap.set(shield, { strokeDasharray: sLen, strokeDashoffset: sLen });
            mainTl.to(shield, { strokeDashoffset: 0, duration: STEP * 0.4, ease: "power2.out" }, p5 - STEP * 0.2);
          }
          // shield glow pulses on completion
          if (shieldGlow) {
            mainTl.to(shieldGlow, { opacity: 0.12, duration: STEP * 0.15 }, p5 + STEP * 0.02);
            mainTl.to(shieldGlow, { opacity: 0.04, duration: STEP * 0.2 }, p5 + STEP * 0.15);
          }
          // checkmark stamps with bounce
          if (check && (check as SVGGeometryElement).getTotalLength) {
            const cLen = (check as SVGGeometryElement).getTotalLength();
            gsap.set(check, { strokeDasharray: cLen, strokeDashoffset: cLen, scale: 0.8, transformOrigin: "center center" });
            mainTl.to(check, { strokeDashoffset: 0, scale: 1.15, duration: STEP * 0.2, ease: "power3.out" }, p5 + STEP * 0.02);
            mainTl.to(check, { scale: 1, duration: STEP * 0.1, ease: "power2.inOut" }, p5 + STEP * 0.2);
          }
          // GOST labels cascade in
          if (certLabels) {
            gsap.set(certLabels, { y: 8 });
            mainTl.to(certLabels, { opacity: 1, y: 0, duration: STEP * 0.2, ease: "power2.out" }, p5 + STEP * 0.12);
          }
        }
      });

      /* ════════════════════════════════════════════════════════════
         TABLET + MOBILE (<1024px) — vertical timeline, NO pinning
         ════════════════════════════════════════════════════════════ */
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".pp-mobile-card").forEach((card) => {
          gsap.from(card, {
            y: 32,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-6 sm:pb-8 lg:pb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs select-none" style={{ color: "var(--molten-500)" }}>03</span>
          <div className="flex-shrink-0 w-[80px] sm:w-[120px]" style={{ height: 2, background: "var(--molten-500)" }} />
          <span className="font-mono text-xs tracking-[0.28em] uppercase select-none min-w-0 truncate" style={{ color: "var(--text-muted)" }}>
            {t("label")}
          </span>
        </div>
        <h2
          className="font-display font-bold uppercase leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(1.7rem, 4.8vw, 4.5rem)", color: "var(--text-white)" }}
        >
          {t("heading1")}{" "}
          <span style={{ color: "var(--molten-500)" }}>{t("heading2")} {t("heading2_accent")}</span>
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP (lg+): pinned horizontal track — two-column panels
          ══════════════════════════════════════════════════════════════════ */}
      <div ref={desktopRef} className="hidden lg:block relative" style={{ minHeight: "100vh" }}>
        {/* Progress bar — steps */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[85%] max-w-4xl">
          <div className="relative w-full h-px mb-4" style={{ background: "var(--border-dim)" }}>
            <div className="pp-progress-fill absolute inset-0 origin-left" style={{ background: "var(--molten-500)", transform: "scaleX(0)" }} />
          </div>
          <div className="flex justify-between">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className={`pp-step-ind-${i} flex items-center gap-2 transition-opacity`}
                style={{ opacity: i === 0 ? 1 : 0.35 }}
              >
                <span
                  className="pp-step-num font-mono text-[0.65rem] font-bold"
                  style={{ color: i === 0 ? "var(--molten-500)" : "var(--steel-600)" }}
                >
                  0{s.num}
                </span>
                <span
                  className="font-mono text-[0.5rem] tracking-wider uppercase hidden lg:inline"
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
              className="pp-panel flex-shrink-0 flex items-center relative"
              style={{ width: `${100 / STEPS.length}%`, height: "100vh" }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 55% 55% at 35% 50%, ${step.glowColor}, transparent 70%)` }}
              />

              {/* Two-column layout: VISUAL | TEXT */}
              <div className="relative z-10 w-full grid grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto px-8 lg:px-16 pt-20">
                {/* Left — Visual area */}
                <div className="pp-visual-area flex flex-col items-center justify-center relative">
                  {/* Giant step number (background) */}
                  <span
                    className="absolute top-0 left-0 font-mono font-bold leading-none select-none"
                    style={{ fontSize: "clamp(6rem, 12vw, 11rem)", color: step.color, opacity: 0.07 }}
                  >
                    0{step.num}
                  </span>

                  {/* Visual */}
                  <div className="relative z-10" style={{ color: step.color }}>
                    {step.num === 1 ? <PrepVisual /> :
                     step.num === 2 ? <FormingVisual /> :
                     step.num === 3 ? <WeldingVisual /> :
                     step.num === 4 ? <SizingVisual /> :
                     <TestingVisual />}
                  </div>

                  {/* Standard badge below visual */}
                  <span
                    className="mt-6 font-mono text-[0.56rem] px-2.5 py-1 tracking-wider uppercase"
                    style={{ color: "var(--text-muted)", border: "1px solid var(--border-dim)", background: "rgba(255,255,255,0.03)" }}
                  >
                    {step.standard}
                  </span>
                </div>

                {/* Right — Text content */}
                <div className="flex flex-col justify-center">
                  {/* Step indicator */}
                  <span
                    className="font-mono text-[0.65rem] tracking-widest uppercase mb-4"
                    style={{ color: step.color }}
                  >
                    Step 0{step.num} / 05
                  </span>

                  {/* Title */}
                  <h3
                    className="pp-title font-display font-bold uppercase text-2xl lg:text-4xl mb-3"
                    style={{ color: "var(--text-white)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="pp-subtitle font-mono text-[0.7rem] tracking-wider uppercase mb-5 pb-5"
                    style={{ color: step.color, borderBottom: "1px solid var(--border-dim)" }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Copy — the description */}
                  <p
                    className="pp-copy text-[0.95rem] leading-[1.75] mb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.copy}
                  </p>

                  {/* Tagline */}
                  <p
                    className="pp-tagline font-display font-bold uppercase text-sm tracking-wide"
                    style={{ color: step.color }}
                  >
                    &ldquo;{step.tagline}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TABLET + MOBILE (<lg): vertical timeline with enhanced cards
          ══════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative px-4 sm:px-6 md:px-10 pb-16 md:pb-20">
        {/* Timeline spine — left side */}
        <div
          className="absolute left-[31px] sm:left-[33px] md:left-[49px] top-0 bottom-0 w-px"
          style={{ background: "var(--border-dim)" }}
          aria-hidden="true"
        />

        <div className="space-y-8 md:space-y-10">
          {STEPS.map((step, i) => (
            <div key={i} className="pp-mobile-card relative pl-14 sm:pl-16 md:pl-20">
              {/* Timeline dot */}
              <div
                className="absolute left-[24px] sm:left-[26px] md:left-[42px] top-5 md:top-6 w-3.5 h-3.5 border-2 z-10"
                style={{
                  borderColor: step.num === 3 ? "var(--molten-500)" : "var(--steel-600)",
                  background: step.num === 3 ? "var(--molten-500)" : "var(--bg-deep)",
                }}
              />

              {/* Card */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-dim)",
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: step.color }}
                />

                {/* Tablet: two-column interior (visual | text)
                    Mobile: stacked (visual on top, text below) */}
                <div className="md:grid md:grid-cols-[140px_1fr] md:gap-0">

                  {/* Visual column — tablet only shows as side panel */}
                  <div
                    className="hidden md:flex flex-col items-center justify-center p-5 relative"
                    style={{
                      background: `radial-gradient(circle at center, ${step.glowColor}, transparent 70%)`,
                      borderRight: "1px solid var(--border-dim)",
                    }}
                  >
                    {/* Giant step number (watermark) */}
                    <span
                      className="absolute font-mono font-bold leading-none select-none"
                      style={{ fontSize: "4.5rem", color: step.color, opacity: 0.08 }}
                    >
                      0{step.num}
                    </span>
                    <div className="relative z-10" style={{ color: step.color }}>
                      <StepIconStatic step={step.num} className="w-16 h-16" />
                    </div>
                    <span
                      className="mt-3 font-mono text-[0.5rem] px-1.5 py-0.5 tracking-wider uppercase text-center"
                      style={{
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-dim)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {step.standard}
                    </span>
                  </div>

                  {/* Text column */}
                  <div className="p-5 md:p-6">
                    {/* Header row: step badge + title */}
                    <div className="flex items-start gap-3 mb-3">
                      <span
                        className="flex-shrink-0 font-mono text-[0.6rem] tracking-wider uppercase px-1.5 py-0.5 mt-1"
                        style={{ color: step.color, border: `1px solid ${step.glowColor}` }}
                      >
                        0{step.num}
                      </span>
                      <h3
                        className="font-display font-bold uppercase text-base sm:text-lg md:text-xl leading-tight"
                        style={{ color: "var(--text-white)" }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p
                      className="font-mono text-[0.58rem] sm:text-[0.62rem] tracking-wider uppercase mb-4 pb-3"
                      style={{ color: step.color, borderBottom: "1px solid var(--border-dim)" }}
                    >
                      {step.subtitle}
                    </p>

                    {/* Mobile-only: inline icon above description */}
                    <div className="md:hidden flex items-center gap-3 mb-3">
                      <div style={{ color: step.color }}>
                        <StepIconStatic step={step.num} className="w-10 h-10" />
                      </div>
                      <span
                        className="font-mono text-[0.5rem] px-1.5 py-0.5 tracking-wider uppercase"
                        style={{
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-dim)",
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {step.standard}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-[0.82rem] sm:text-[0.88rem] md:text-[0.92rem] leading-[1.7] mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {step.copy}
                    </p>

                    {/* Tagline */}
                    <p
                      className="font-display font-bold uppercase text-xs md:text-sm tracking-wide"
                      style={{ color: step.color }}
                    >
                      &ldquo;{step.tagline}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section motto ─────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 pb-16 md:pb-20 lg:pb-28">
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

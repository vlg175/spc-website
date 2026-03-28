"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { smoothScrollTo } from "@/components/LenisProvider";
import PipeErrorBoundary from "@/components/three/PipeErrorBoundary";

/* Code-split Three.js — only loads on client, reduces initial bundle */
const PipeScene = dynamic(() => import("@/components/three/PipeScene"), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────────────────────────
   HERO — SPC Steel Pipe Company
   Full 100vh dark section. 7-step GSAP page-load sequence per design-spec.
   ───────────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const t = useTranslations("hero");

  /* ── Refs ─────────────────────────────────────────────────────────────── */
  const overlayRef      = useRef<HTMLDivElement>(null);
  const logoIntroRef    = useRef<HTMLDivElement>(null);
  const gridRef         = useRef<HTMLDivElement>(null);
  const eyebrowRef      = useRef<HTMLParagraphElement>(null);
  const line1Ref        = useRef<HTMLDivElement>(null);
  const line2Ref        = useRef<HTMLDivElement>(null);
  const subtitleRef     = useRef<HTMLParagraphElement>(null);
  const ctasRef         = useRef<HTMLDivElement>(null);
  const scrollRef       = useRef<HTMLDivElement>(null);

  /* ── Only load Three.js on lg+ screens (saves ~200KB on mobile) ──── */
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsLg(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  /* ── Mouse parallax on grid ───────────────────────────────────────────── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(grid, {
        x: (e.clientX / window.innerWidth  - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 24,
        duration: 1.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── 7-step page load GSAP timeline ──────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Set every element to its start state before the timeline plays */
      gsap.set(overlayRef.current,   { opacity: 1 });
      gsap.set(logoIntroRef.current, { opacity: 0, scale: 0.86 });
      gsap.set(gridRef.current,      { opacity: 0 });
      gsap.set(eyebrowRef.current,   { opacity: 0 });
      gsap.set([line1Ref.current, line2Ref.current], {
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 });
      gsap.set(scrollRef.current,   { opacity: 0 });

      const ctaEls = ctasRef.current
        ? Array.from(ctasRef.current.children)
        : [];
      if (ctaEls.length) gsap.set(ctaEls, { opacity: 0, y: 22 });

      /* ── Timeline ────────────────────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1 — SPC logo fades in centered on overlay (0.35s)
      tl.to(logoIntroRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
      })

      // Step 2 — Logo scales down → nav position, overlay fades (0.55s, power3.inOut)
      .to(logoIntroRef.current, {
        scale: 0.38,
        x: () => -(window.innerWidth  / 2) + 88,
        y: () => -(window.innerHeight / 2) + 40,
        opacity: 0,
        duration: 0.55,
        ease: "power3.inOut",
      })
      .to(
        overlayRef.current,
        { autoAlpha: 0, duration: 0.28, ease: "power2.in" },
        "-=0.22"
      )

      // Step 3 — Grid fades in (0.85s, subtle)
      .to(gridRef.current, { opacity: 1, duration: 0.85 }, "-=0.05")
      .to(eyebrowRef.current, { opacity: 1, duration: 0.5 }, "-=0.65")

      // Step 4 — Headline clipPath wipe: inset(0 100% 0 0) → inset(0 0% 0 0), 0.15s stagger
      .to(
        [line1Ref.current, line2Ref.current],
        { clipPath: "inset(0 0% 0 0)", duration: 0.72, stagger: 0.15 },
        "-=0.45"
      )

      // Step 5 — Subtitle fades in (0.4s, 0.15s delay from last line)
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.18"
      )

      // Step 6 — CTAs slide up translateY(22→0) + opacity, 0.1s stagger
      .to(ctaEls, { opacity: 1, y: 0, duration: 0.44, stagger: 0.1 }, "-=0.12")

      // Step 7 — Scroll indicator last (CSS infinite pulse handles repeat)
      .to(scrollRef.current, { opacity: 1, duration: 0.4 });
    });

    return () => ctx.revert();
  }, []);

  /* ── Helpers ──────────────────────────────────────────────────────────── */
  const scrollTo = (id: string) => smoothScrollTo(id);

  /* ── Render ───────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          INTRO OVERLAY — full-screen logo splash, z-[200], pointer-events:none
          GSAP hides it automatically via autoAlpha after step 2
          ════════════════════════════════════════════════════════════════════ */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: "var(--bg-void)", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div ref={logoIntroRef}>
          <Image
            src="/logo_SPC.png"
            alt="SPC Steel Pipe Company"
            width={192}
            height={82}
            className="brightness-0 invert select-none"
            style={{ width: "auto", height: "auto" }}
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "var(--bg-void)" }}
      >

        {/* ── Grid — 120% of section for parallax headroom ─────────────── */}
        <div
          ref={gridRef}
          className="absolute pointer-events-none"
          style={{ inset: "-10%", opacity: 0 }}
          aria-hidden="true"
        >
          {/* Major 60px grid — navy */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(42,62,114,0.13) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(42,62,114,0.13) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "60px 60px",
            }}
          />
          {/* Fine 12px sub-grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(42,62,114,0.042) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(42,62,114,0.042) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "12px 12px",
            }}
          />
        </div>

        {/* ── Depth / vignette ─────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 90% 65% at 50% 35%, rgba(16,30,66,0.22) 0%, transparent 68%)",
              "linear-gradient(to bottom, transparent 55%, rgba(5,8,16,0.92) 100%)",
            ].join(","),
          }}
          aria-hidden="true"
        />

        {/* ── 3D Pipe cross-section — right side, behind text ──────────── */}
        {isLg && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: "5%",
              right: "-8%",
              width: "60%",
              height: "90%",
              opacity: 0.85,
            }}
            aria-hidden="true"
          >
            <PipeErrorBoundary>
              <PipeScene />
            </PipeErrorBoundary>
          </div>
        )}

        {/* ── Molten glow — very subtle warm accent at bottom ──────────── */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-[900px]"
          style={{
            height: "260px",
            background:
              "radial-gradient(ellipse at center bottom, rgba(232,94,34,0.12) 0%, rgba(255,107,53,0.04) 40%, transparent 75%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        {/* ── Dimension accent lines (top-left corner) ─────────────────── */}
        <div
          className="absolute top-24 left-0 pointer-events-none hidden lg:block"
          aria-hidden="true"
        >
          {/* Horizontal tick */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(42,62,114,0.45)",
              marginLeft: "64px",
            }}
          />
          {/* Vertical tick */}
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "rgba(42,62,114,0.45)",
              marginLeft: "104px",
              marginTop: "-1px",
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MAIN CONTENT
            ════════════════════════════════════════════════════════════════ */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full pt-24 pb-28 md:pt-32 md:pb-44 lg:pb-56">

          {/* Eyebrow — monospaced tag line */}
          <p
            ref={eyebrowRef}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-6 md:mb-8"
            style={{ color: "var(--molten-500)", opacity: 0 }}
          >
            {t("eyebrow")}
          </p>

          {/* ── Headline — two lines, clip-path wipe reveal ───────────── */}
          <div
            className="mb-6 md:mb-8"
            aria-label={`${t("headline1")} ${t("headline2")} ${t("accent")}`}
          >
            {/* Line 1 */}
            <div
              ref={line1Ref}
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <h1
                className="font-display font-extrabold uppercase leading-[0.88] text-text-white"
                style={{
                  fontSize: "clamp(50px, 9.5vw, 124px)",
                  letterSpacing: "-0.015em",
                }}
              >
                {t("headline1")}
              </h1>
            </div>

            {/* Line 2 — accent on last word */}
            <div
              ref={line2Ref}
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <p
                role="doc-subtitle"
                className="font-display font-extrabold uppercase leading-[0.88] text-text-white"
                style={{
                  fontSize: "clamp(50px, 9.5vw, 124px)",
                  letterSpacing: "-0.015em",
                }}
              >
                {t("headline2")}{" "}
                <span style={{ color: "var(--molten-500)" }}>{t("accent")}</span>
              </p>
            </div>
          </div>

          {/* ── Subtitle ─────────────────────────────────────────────── */}
          <p
            ref={subtitleRef}
            className="font-mono text-[12px] md:text-[13px] tracking-[0.1em] mb-10 md:mb-12 max-w-xs md:max-w-md"
            style={{ color: "var(--text-secondary)", opacity: 0 }}
          >
            {t("subtitle")}
          </p>

          {/* ── CTAs ─────────────────────────────────────────────────── */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            {/* Primary — accent solid */}
            <button
              onClick={() => scrollTo("products")}
              className="
                group inline-flex items-center justify-center gap-2.5
                font-mono text-xs uppercase tracking-[0.14em]
                text-text-white transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={{
                padding: "14px 32px",
                background: "var(--molten-500)",
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background  = "var(--molten-400)";
                el.style.boxShadow   = "var(--shadow-molten)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background  = "var(--molten-500)";
                el.style.boxShadow   = "none";
              }}
              /* a11y: no aria-label needed — visible text is the accessible name */
            >
              {t("cta_primary")}
              {/* Arrow → */}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>

            {/* Secondary — outlined */}
            <button
              onClick={() => scrollTo("contact")}
              className="
                inline-flex items-center justify-center gap-2
                font-mono text-xs uppercase tracking-[0.14em]
                text-text-white transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={{
                padding: "14px 32px",
                background: "transparent",
                border: "1px solid var(--border-dim)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "var(--border-bright)";
                el.style.background  = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "var(--border-dim)";
                el.style.background  = "transparent";
              }}
              /* a11y: no aria-label needed — visible text is the accessible name */
            >
              {t("cta_secondary")}
            </button>
          </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <span
            className="font-mono text-[9px] tracking-[0.34em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("scroll")}
          </span>
          {/* Thin vertical line — scrollLine keyframe from globals.css */}
          <div
            className="relative overflow-hidden"
            style={{ width: "1px", height: "56px" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, var(--steel-400), transparent)",
                animation: "scrollLine 2.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* ── Bottom edge line — decorative ────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Spec label — top right (technical drawing flavour) ────────── */}
        <div
          className="absolute top-24 right-6 md:right-10 lg:right-16 pointer-events-none hidden md:block"
          aria-hidden="true"
        >
          <span
            className="font-mono text-[9px] tracking-[0.22em] uppercase"
            style={{ color: "rgba(42,62,114,0.55)" }}
          >
            SPC-HERO-01
          </span>
        </div>

      </section>
    </>
  );
}

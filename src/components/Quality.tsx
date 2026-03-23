"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Quality — Section 05
   Dark bg. Three feature blocks: Cpu · Lightbulb · ShieldCheck.
   GSAP: SVG stroke draw-in on scroll, text stagger, cert badge reveal.
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Lightbulb, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────────────────────── */
interface Feature {
  Icon: LucideIcon;
  number: string;
  title: string;
  tagline: string;
  body: string;
  detail: string;
}

const CERTS = [
  "GOST 10704",
  "GOST 10705",
  "GOST 8639",
  "GOST 8645",
  "ISO 9001",
  "API 5L",
  "EN 10219",
  "ASTM A500",
];

/* ── Helper: safely read SVG path length ─────────────────────────────── */
function safeGetLength(el: Element): number {
  try {
    if (typeof (el as SVGGeometryElement).getTotalLength === "function") {
      return (el as SVGGeometryElement).getTotalLength();
    }
  } catch {
    /* noop */
  }
  return 60; // reasonable fallback for small icons
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Quality() {
  const t = useTranslations("quality");

  const FEATURES: Feature[] = [
    {
      Icon: Cpu,
      number: "01",
      title: t("f1_title"),
      tagline: t("f1_tagline"),
      body: t("f1_body"),
      detail: t("f1_detail"),
    },
    {
      Icon: Lightbulb,
      number: "02",
      title: t("f2_title"),
      tagline: t("f2_tagline"),
      body: t("f2_body"),
      detail: t("f2_detail"),
    },
    {
      Icon: ShieldCheck,
      number: "03",
      title: t("f3_title"),
      tagline: t("f3_tagline"),
      body: t("f3_body"),
      detail: t("f3_detail"),
    },
  ];

  const sectionRef    = useRef<HTMLElement>(null);
  const headingLineRef  = useRef<HTMLDivElement>(null);
  const headingLabelRef = useRef<HTMLSpanElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      /* ── Heading reveal ──────────────────────────────────────── */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.querySelector(".quality-heading"),
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          headingLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power3.out", transformOrigin: "left center" }
        )
        .fromTo(
          headingLabelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        )
        .fromTo(
          headingTitleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power2.out" },
          "-=0.15"
        );

      /* ── Per-icon SVG stroke draw-in ─────────────────────────── */
      iconRefs.current.forEach((iconEl, i) => {
        if (!iconEl) return;
        const svg = iconEl.querySelector("svg");
        if (!svg) return;

        // Gather every drawable element inside the Lucide SVG
        const paths = Array.from(
          svg.querySelectorAll("path, polyline, line, circle, ellipse, rect")
        );

        // Prime each path: hidden via dashoffset
        paths.forEach((el) => {
          const len = safeGetLength(el);
          gsap.set(el, {
            strokeDasharray: len,
            strokeDashoffset: len,
            fill: "none",
          });
        });

        // Draw in on scroll
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 0.75,
          stagger: 0.04,
          ease: "power2.inOut",
          delay: i * 0.16,
          scrollTrigger: {
            trigger: iconEl.closest(".quality-block"),
            start: "top 82%",
            once: true,
          },
        });
      });

      /* ── Block content stagger ───────────────────────────────── */
      gsap.from(".quality-block-content", {
        y: 30,
        opacity: 0,
        stagger: 0.14,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".quality-grid"),
          start: "top 78%",
          once: true,
        },
      });

      /* ── Cert badges ─────────────────────────────────────────── */
      gsap.from(".cert-badge", {
        opacity: 0,
        y: 8,
        stagger: 0.055,
        duration: 0.38,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".cert-strip"),
          start: "top 92%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Subtle grid overlay on dark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      {/* Left accent: tall molten bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--molten-600) 30%, var(--molten-500) 60%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-20 py-20 md:py-24 lg:py-36">

        {/* ── Section heading ────────────────────────────────────── */}
        <header className="quality-heading mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs select-none"
              style={{ color: "var(--molten-500)" }}
            >
              05
            </span>
            <div
              ref={headingLineRef}
              className="flex-shrink-0 w-[80px] sm:w-[120px]"
              style={{
                height: 2,
                background: "var(--molten-500)",
                transformOrigin: "left center",
              }}
            />
            <span
              ref={headingLabelRef}
              className="font-mono text-xs tracking-[0.28em] uppercase select-none min-w-0 truncate"
              style={{ color: "var(--text-muted)", opacity: 0 }}
            >
              {t("label")}
            </span>
          </div>

          <h2
            ref={headingTitleRef}
            className="font-display font-bold uppercase leading-[0.92] tracking-tight"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              color: "var(--text-white)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("heading1")}
            <br />
            <span style={{ color: "var(--molten-500)" }}>
              {t("heading2_accent")}
            </span>
          </h2>
        </header>

        {/* ── Three feature blocks ──────────────────────────────── */}
        <div
          className="quality-grid grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--border-subtle)" }}
        >
          {FEATURES.map((feat, i) => {
            const Icon = feat.Icon;
            return (
              <div
                key={i}
                className="quality-block relative flex flex-col p-6 md:p-8 lg:p-10"
                style={{ background: "var(--bg-dark)" }}
              >
                {/* Step number */}
                <span
                  className="font-mono text-[0.58rem] tracking-[0.34em] uppercase block mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feat.number}
                </span>

                {/* Icon wrapper — GSAP targets paths inside this SVG */}
                <div
                  ref={(el) => { iconRefs.current[i] = el; }}
                  className="quality-icon mb-8 flex-shrink-0"
                  style={{ width: 52, height: 52 }}
                >
                  <Icon
                    size={52}
                    strokeWidth={1.2}
                    style={{ color: "var(--molten-400)", display: "block" }}
                  />
                </div>

                {/* Text content */}
                <div className="quality-block-content flex flex-col flex-1">
                  <h3
                    className="font-display font-bold uppercase leading-none mb-3"
                    style={{
                      fontSize: "clamp(1.45rem, 2.2vw, 1.9rem)",
                      color: "var(--text-white)",
                    }}
                  >
                    {feat.title}
                  </h3>

                  {/* Tagline */}
                  <p
                    className="font-mono text-[0.62rem] tracking-widest uppercase mb-5 leading-relaxed"
                    style={{ color: "var(--molten-400)" }}
                  >
                    {feat.tagline}
                  </p>

                  {/* Body */}
                  <p
                    className="text-sm leading-relaxed mb-8 flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {feat.body}
                  </p>

                  {/* Detail line */}
                  <p
                    className="font-mono text-[0.58rem] tracking-wider uppercase mt-auto"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {feat.detail}
                  </p>
                </div>

                {/* Bottom accent gradient */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--molten-600), transparent 70%)",
                  }}
                />

                {/* Top-left corner bracket — decorative */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    width: 18,
                    height: 18,
                    borderTop: "1px solid var(--molten-700)",
                    borderLeft: "1px solid var(--molten-700)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Cert badge strip ──────────────────────────────────── */}
        <div
          className="cert-strip mt-12 lg:mt-16 pt-7"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p
            className="font-mono text-[0.55rem] tracking-[0.28em] uppercase mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            {t("certified_label")}
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map((cert) => (
              <span
                key={cert}
                className="cert-badge font-mono text-[0.6rem] tracking-wider uppercase px-3 py-1.5"
                style={{
                  color: "var(--steel-300)",
                  border: "1px solid var(--border-dim)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

/* ─────────────────────────────────────────────────────────────────────────
   About — Section 02
   Light warm bg (#EDE9E0) — maximum contrast from dark Hero.
   Two-column layout:  Story (60%, 3/5)  |  Stats (40%, 2/5)

   Animations (all GSAP, cleanup via ctx.revert())
     1. Heading: molten line draws → label fades → title clips left→right
     2. Story paragraphs: stagger y+opacity reveal
     3. Stat cards: stagger y+opacity (counters own their scroll trigger)
     4. Motto: clipPath left→right reveal
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const CERTS = ["GOST 10704", "GOST 10705", "ISO 559", "EN 10219", "Uzstandard"];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function About() {
  const t = useTranslations("about");

  const STORY = [
    t("story1"),
    t("story2"),
    t("story3"),
  ];

  const STATS = [
    { end: 160,  start: 0,    suffix: "+",    duration: 2.0, label: t("stat_workers")  },
    { end: 2018, start: 2013, suffix: "",     duration: 1.6, label: t("stat_founded")  },
    { end: 6,    start: 0,    suffix: "+",    duration: 1.4, label: t("stat_products") },
    { end: 20,   start: 0,    suffix: " MPa", duration: 1.4, label: t("stat_pressure") },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const storyRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const mottoRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      /* ── 1. Section heading sequence ─────────────────────────────────── */
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector(".about-heading"),
          start: "top 85%",
          once: true,
        },
      });

      headTl
        // molten line draws across from left
        .fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.45, ease: "power3.out", transformOrigin: "left center" }
        )
        // label fades in
        .fromTo(labelRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        )
        // title clips in left → right
        .fromTo(titleRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power2.out" },
          "-=0.15"
        );

      /* ── 2. Story paragraphs — stagger reveal ────────────────────────── */
      gsap.from(".about-para", {
        y: 30,
        opacity: 0,
        stagger: 0.16,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* ── 3. Stat cards — stagger reveal (counters are self-triggered) ── */
      gsap.from(".about-stat-card", {
        y: 22,
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 82%",
          once: true,
        },
      });

      /* ── 4. Motto — clip-path reveal ─────────────────────────────────── */
      gsap.fromTo(mottoRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mottoRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

    }, section); // scope: class selectors restricted to this section

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-light)" }}
    >
      {/* ── Subtle technical grid overlay ────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(42,62,114,0.065) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(42,62,114,0.065) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Corner dimension markers — top-right ─────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-8 hidden lg:block pointer-events-none"
        style={{ color: "var(--text-muted)", opacity: 0.35 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M48 0 L48 48" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0 L48 0"   stroke="currentColor" strokeWidth="1" />
          <path d="M44 4 L44 8"  stroke="currentColor" strokeWidth="1" />
          <path d="M40 4 L44 4"  stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-20 py-20 md:py-24 lg:py-36">

        {/* ══ Section heading ══════════════════════════════════════════════ */}
        <header className="about-heading mb-10 md:mb-16 lg:mb-24">

          {/* Label row: section number · line · label */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs select-none"
              style={{ color: "var(--molten-500)" }}
            >
              02
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
              {t("label")}
            </span>
          </div>

          {/* Main heading — clamps 2.6→5.25rem across breakpoints */}
          <h2
            ref={titleRef}
            className="font-display font-bold uppercase leading-[0.92] tracking-tight"
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5.25rem)",
              color: "var(--text-dark)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("heading1")}
            <br />
            {t("heading2")}
          </h2>
        </header>

        {/* ══ Two-column body ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16 xl:gap-20 items-start">

          {/* ── Left: company story (3/5 = 60%) ──────────────────────── */}
          <div ref={storyRef} className="md:col-span-1 lg:col-span-3 space-y-5">

            {STORY.map((para, i) => (
              <p
                key={i}
                className={`about-para leading-relaxed ${
                  i === 0
                    ? "text-[1.08rem] font-medium"
                    : "text-[0.96rem]"
                }`}
                style={{ color: "var(--text-mid)" }}
              >
                {para.trim()}
              </p>
            ))}

            {/* Certification tags */}
            <div className="about-para flex flex-wrap gap-2 pt-3">
              {CERTS.map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[0.62rem] px-2.5 py-1 tracking-wider uppercase"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid rgba(100,128,152,0.30)",
                    background: "rgba(100,128,152,0.06)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* SEZ badge */}
            <div
              className="about-para inline-flex items-center gap-2 mt-2"
            >
              <div
                className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                style={{ background: "var(--molten-500)" }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {t("sez")}
              </span>
            </div>
          </div>

          {/* ── Right: stats grid (2/5 = 40%) ────────────────────────── */}
          <div ref={statsRef} className="md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-2 gap-[1px] outline outline-[1px]"
              style={{ outlineColor: "rgba(100,128,152,0.18)" }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="about-stat-card flex flex-col gap-2 p-4 md:p-5 lg:p-6"
                  style={{
                    background: "rgba(255,255,255,0.62)",
                    borderTop: "2px solid var(--molten-500)",
                  }}
                >
                  {/* Animated number */}
                  <AnimatedCounter
                    end={stat.end}
                    start={stat.start}
                    suffix={stat.suffix}
                    duration={stat.duration}
                    className="text-[1.8rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-bold"
                    style={{ color: "var(--navy-700)" }}
                  />

                  {/* Label */}
                  <p
                    className="font-mono text-[0.6rem] uppercase tracking-[0.22em] leading-tight"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Sub-label under stats */}
            <p
              className="mt-3 font-mono text-[0.6rem] tracking-widest uppercase"
              style={{ color: "var(--text-muted)", opacity: 0.6 }}
            >
              {t("stat_sublabel")}
            </p>
          </div>
        </div>

        {/* ══ Motto ════════════════════════════════════════════════════════ */}
        <div
          className="mt-16 lg:mt-20 pt-8"
          style={{ borderTop: "1px solid rgba(100,128,152,0.22)" }}
        >
          <p
            ref={mottoRef}
            className="font-display font-bold uppercase tracking-tight"
            style={{
              fontSize: "clamp(1.3rem, 2.4vw, 2rem)",
              color: "var(--navy-700)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("motto")}
          </p>
        </div>

      </div>
    </section>
  );
}

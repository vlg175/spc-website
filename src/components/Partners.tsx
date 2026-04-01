"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Partners — Section 06
   Light cool bg. CSS marquee ticker + interactive 6-card grid.
   Default: grayscale(1) + opacity(0.55). Hover: color + scale + accent border.
   GSAP: heading reveal + card stagger on scroll.
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ── Partner data ─────────────────────────────────────────────────────── */
interface Partner {
  name: string;
  short: string;   // display name in the card
  country: string;
  flag: string;    // country code for decoration
  roleKey: string; // translation key for the role label
  accent: string;  // brand-approximate accent shown on hover
  logo: string;    // path to image in /public/images/partners/
  logoPad?: string; // extra CSS padding inside the logo container (tighten whitespace)
  logoScale?: number; // CSS scale for logos with excess canvas whitespace
}

/* A resolved partner with a translated role string ready for rendering */
interface PartnerResolved extends Partner { role: string; }

/* PNG/JPEG logos have white backgrounds — mix-blend-mode: multiply removes them */
const hasBg = (logo: string) =>
  logo.endsWith(".png") || logo.endsWith(".jpeg");

const PARTNERS: Partner[] = [
  {
    name: "Qarmet",
    short: "Qarmet",
    country: "Kazakhstan",
    flag: "KZ",
    roleKey: "role_raw_material",
    accent: "#0D3B6E",
    logo: "/images/partners/logo_top_alt.png",
    logoPad: "4px 0",
  },
  {
    name: "HUAYE",
    short: "HUAYE",
    country: "China",
    flag: "CN",
    roleKey: "role_technology",
    accent: "#1E3A7A",
    logo: "/images/partners/huaye.png",
    logoPad: "8px 0",
  },
  {
    name: "SAP",
    short: "SAP",
    country: "Germany",
    flag: "DE",
    roleKey: "role_software_erp",
    accent: "#0070F2",
    logo: "/images/partners/sap.svg",
    logoPad: "4px 8px",
  },
  {
    name: "TTZ",
    short: "TTZ",
    country: "Uzbekistan",
    flag: "UZ",
    roleKey: "role_industry_partner",
    accent: "#2A3E72",
    logo: "/images/partners/ttz.png",
    logoPad: "4px 0",
    logoScale: 2.7,
  },
];

/* ── Partner Card ─────────────────────────────────────────────────────── */
function PartnerCard({ partner }: { partner: PartnerResolved }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="partner-card relative flex flex-col items-center justify-center px-5 py-8 cursor-default select-none"
      style={{
        background: hovered ? `${partner.accent}08` : "rgba(255,255,255,0.72)",
        border: `1px solid ${hovered ? partner.accent : "rgba(100,128,152,0.22)"}`,
        filter: hovered ? "grayscale(0%) " : "grayscale(100%)",
        opacity: hovered ? 1 : 0.55,
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition:
          "filter 0.3s ease, opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent stripe — reveals on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: partner.accent,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Country badge */}
      <span
        className="font-mono text-[0.52rem] tracking-[0.28em] uppercase mb-3 block"
        style={{
          color: hovered ? partner.accent : "var(--text-muted)",
          transition: "color 0.3s ease",
        }}
      >
        {partner.flag}
      </span>

      {/* Logo image */}
      <div
        className="relative flex items-center justify-center mb-3"
        style={{
          width: "100%",
          height: 52,
          padding: partner.logoPad ?? "0",
          overflow: "hidden",
        }}
      >
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          loading="lazy"
          style={{
            objectFit: "contain",
            objectPosition: "center",
            filter: hovered ? "none" : "grayscale(100%)",
            transition: "filter 0.3s ease, transform 0.3s ease",
            mixBlendMode: hasBg(partner.logo) ? "multiply" : "normal",
            transform: partner.logoScale ? `scale(${partner.logoScale})` : undefined,
          }}
        />
      </div>

      {/* Role */}
      <span
        className="font-mono text-[0.52rem] tracking-[0.2em] uppercase text-center leading-relaxed"
        style={{
          color: hovered ? `${partner.accent}CC` : "var(--text-muted)",
          transition: "color 0.3s ease",
        }}
      >
        {partner.role}
      </span>
    </div>
  );
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Partners() {
  const t = useTranslations("partners");

  /* Resolve translation keys to localized role strings */
  const partners: PartnerResolved[] = PARTNERS.map(p => ({ ...p, role: t(p.roleKey as Parameters<typeof t>[0]) }));
  const marqueeItems = [...partners, ...partners];

  const sectionRef      = useRef<HTMLElement>(null);
  const headingLineRef  = useRef<HTMLDivElement>(null);
  const headingLabelRef = useRef<HTMLSpanElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);

  /* Marquee styles now live in globals.css — no runtime injection needed */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Heading reveal ──────────────────────────────────────── */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section.querySelector(".partners-heading"),
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

      /* ── Cards stagger ───────────────────────────────────────── */
      gsap.from(".partner-card", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".partners-grid"),
          start: "top 82%",
          once: true,
        },
      });

      /* ── Sub-headline fade ───────────────────────────────────── */
      gsap.fromTo(
        ".partners-sub",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: section.querySelector(".partners-heading"),
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-steel-light)" }}
    >
      {/* Grid overlay — very faint on light bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(42,62,114,0.045) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(42,62,114,0.045) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Marquee ticker strip ───────────────────────────────── */}
      <div
        className="spc-marquee-wrapper relative overflow-hidden"
        style={{
          borderBottom: "1px solid rgba(100,128,152,0.2)",
          background: "var(--bg-navy)",
          minHeight: 44,
          zIndex: 1,
        }}
      >
        <div
          className="spc-marquee-track flex items-center"
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-3 flex-shrink-0"
              style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="font-mono text-[0.52rem] tracking-[0.22em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.flag}
              </span>
              <span
                className="font-mono font-bold text-[0.72rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--steel-300)" }}
              >
                {p.short}
              </span>
              <span
                className="font-mono text-[0.46rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.role}
              </span>
              <span
                className="font-mono text-[0.46rem]"
                style={{ color: "var(--molten-600)" }}
              >
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-20 py-20 md:py-24 lg:py-32">

        {/* ── Section heading ──────────────────────────────────── */}
        <header className="partners-heading mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs select-none"
              style={{ color: "var(--molten-500)" }}
            >
              06
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
            className="font-display font-bold uppercase leading-[0.92] tracking-tight mb-5"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
              color: "var(--text-dark)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("heading1")}
            <br />
            <span style={{ color: "var(--molten-600)" }}>
              {t("heading2_accent")}
            </span>
          </h2>

          <p
            className="partners-sub font-body text-base leading-relaxed max-w-xl"
            style={{ color: "var(--text-mid)", opacity: 0 }}
          >
            {t("sub")}
          </p>
        </header>

        {/* ── Partner grid ─────────────────────────────────────── */}
        <div className="partners-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((partner, i) => (
            <PartnerCard key={i} partner={partner} />
          ))}
        </div>

        {/* ── Bottom note ──────────────────────────────────────── */}
        <div
          className="mt-10 pt-6 flex items-center gap-6"
          style={{ borderTop: "1px solid rgba(100,128,152,0.2)" }}
        >
          <p
            className="font-mono text-[0.58rem] tracking-[0.22em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("note")}
          </p>
        </div>

      </div>
    </section>
  );
}

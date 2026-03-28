"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Products — Section 04
   3-column grid: Round · Square · Profile pipes
   Each card: icon, name, description, GOST badges, "Download Specs" PDF link
   GSAP stagger from bottom. Framer Motion hover: lift + shadow + zoom.
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ── Pipe cross-section SVGs — technical drawing aesthetic ────────────── */
function RoundPipeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className}>
      {/* Outer wall */}
      <circle cx="70" cy="70" r="46" stroke="var(--steel-300)" strokeWidth="1.8" className="pipe-outer" />
      {/* Inner bore */}
      <circle cx="70" cy="70" r="34" stroke="var(--steel-400)" strokeWidth="1.2" className="pipe-inner" />
      {/* Wall fill */}
      <circle cx="70" cy="70" r="40" stroke="none" fill="rgba(143,163,184,0.06)" />
      {/* Centermark */}
      <line x1="67" y1="70" x2="73" y2="70" stroke="var(--steel-500)" strokeWidth="0.6" />
      <line x1="70" y1="67" x2="70" y2="73" stroke="var(--steel-500)" strokeWidth="0.6" />
      {/* Dimension line — horizontal */}
      <line x1="20" y1="70" x2="24" y2="70" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="116" y1="70" x2="120" y2="70" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="24" y1="70" x2="116" y2="70" stroke="var(--molten-500)" strokeWidth="0.4" strokeDasharray="3 3" className="pipe-dim" opacity="0" />
      {/* Dimension ticks */}
      <line x1="24" y1="66" x2="24" y2="74" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="116" y1="66" x2="116" y2="74" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
    </svg>
  );
}

function SquarePipeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className}>
      {/* Outer wall */}
      <rect x="28" y="28" width="84" height="84" rx="4" stroke="var(--steel-300)" strokeWidth="1.8" className="pipe-outer" />
      {/* Inner bore */}
      <rect x="40" y="40" width="60" height="60" rx="2" stroke="var(--steel-400)" strokeWidth="1.2" className="pipe-inner" />
      {/* Wall fill */}
      <rect x="34" y="34" width="72" height="72" rx="3" stroke="none" fill="rgba(143,163,184,0.06)" />
      {/* Centermark */}
      <line x1="67" y1="70" x2="73" y2="70" stroke="var(--steel-500)" strokeWidth="0.6" />
      <line x1="70" y1="67" x2="70" y2="73" stroke="var(--steel-500)" strokeWidth="0.6" />
      {/* Corner detail lines */}
      <line x1="28" y1="20" x2="28" y2="24" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="112" y1="20" x2="112" y2="24" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="28" y1="20" x2="112" y2="20" stroke="var(--molten-500)" strokeWidth="0.4" strokeDasharray="3 3" className="pipe-dim" opacity="0" />
      {/* Side ticks */}
      <line x1="20" y1="28" x2="24" y2="28" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="20" y1="112" x2="24" y2="112" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="20" y1="28" x2="20" y2="112" stroke="var(--molten-500)" strokeWidth="0.4" strokeDasharray="3 3" className="pipe-dim" opacity="0" />
    </svg>
  );
}

function ProfilePipeSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className}>
      {/* Outer wall */}
      <rect x="22" y="26" width="116" height="68" rx="4" stroke="var(--steel-300)" strokeWidth="1.8" className="pipe-outer" />
      {/* Inner bore */}
      <rect x="34" y="38" width="92" height="44" rx="2" stroke="var(--steel-400)" strokeWidth="1.2" className="pipe-inner" />
      {/* Wall fill */}
      <rect x="28" y="32" width="104" height="56" rx="3" stroke="none" fill="rgba(143,163,184,0.06)" />
      {/* Centermark */}
      <line x1="77" y1="60" x2="83" y2="60" stroke="var(--steel-500)" strokeWidth="0.6" />
      <line x1="80" y1="57" x2="80" y2="63" stroke="var(--steel-500)" strokeWidth="0.6" />
      {/* Dimension — top */}
      <line x1="22" y1="16" x2="138" y2="16" stroke="var(--molten-500)" strokeWidth="0.4" strokeDasharray="3 3" className="pipe-dim" opacity="0" />
      <line x1="22" y1="12" x2="22" y2="20" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="138" y1="12" x2="138" y2="20" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      {/* Dimension — right */}
      <line x1="148" y1="26" x2="148" y2="94" stroke="var(--molten-500)" strokeWidth="0.4" strokeDasharray="3 3" className="pipe-dim" opacity="0" />
      <line x1="144" y1="26" x2="152" y2="26" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
      <line x1="144" y1="94" x2="152" y2="94" stroke="var(--molten-500)" strokeWidth="0.8" className="pipe-dim" opacity="0" />
    </svg>
  );
}

/* ── Product data from content.md ─────────────────────────────────────── */
type PipeSVGComponent = ({ className }: { className?: string }) => React.JSX.Element;
interface Product {
  name: string;
  tagline: string;
  description: string;
  specs: string;
  gosts: string[];
  catalog: string;
  Icon: PipeSVGComponent;
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Products() {
  const t = useTranslations("products");

  const PRODUCTS: Product[] = [
    {
      name: t("round_name"),
      tagline: t("round_tagline"),
      description: t("round_desc"),
      specs: t("round_specs"),
      gosts: ["GOST 10704", "GOST 10705", "GOST 3262"],

      catalog: "/catalogs/SPC_catalogue_round.pdf",
      Icon: RoundPipeSVG,
    },
    {
      name: t("square_name"),
      tagline: t("square_tagline"),
      description: t("square_desc"),
      specs: t("square_specs"),
      gosts: ["GOST 8639", "GOST 13663"],

      catalog: "/catalogs/SPC_catalogue_square.pdf",
      Icon: SquarePipeSVG,
    },
    {
      name: t("profile_name"),
      tagline: t("profile_tagline"),
      description: t("profile_desc"),
      specs: t("profile_specs"),
      gosts: ["GOST 8645", "GOST 13663"],

      catalog: "/catalogs/SPC_catalogue_rectangular.pdf",
      Icon: ProfilePipeSVG,
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const headingLineRef = useRef<HTMLDivElement>(null);
  const headingLabelRef = useRef<HTMLSpanElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Heading animation ───────────────────────────────────── */
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector(".products-heading"),
          start: "top 85%",
          once: true,
        },
      });

      headTl
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

      /* ── Cards stagger from bottom ───────────────────────────── */
      gsap.from(".product-card", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section.querySelector(".products-grid"),
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-light)" }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(42,62,114,0.055) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(42,62,114,0.055) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 py-16 sm:py-20 md:py-24 lg:py-36">
        {/* ── Section heading ──────────────────────────────────────── */}
        <header className="products-heading mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs select-none" style={{ color: "var(--molten-500)" }}>04</span>
            <div
              ref={headingLineRef}
              className="flex-shrink-0 w-[80px] sm:w-[120px]"
              style={{ height: 2, background: "var(--molten-500)", transformOrigin: "left center" }}
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
              fontSize: "clamp(1.8rem, 5vw, 5rem)",
              color: "var(--text-dark)",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            {t("heading1")}
            <br />
            <span style={{ color: "var(--molten-600)" }}>{t("heading2_accent")}</span>
          </h2>
        </header>

        {/* ── Product cards grid ───────────────────────────────────── */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              className="product-card group relative overflow-hidden flex flex-col"
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(100,128,152,0.18)",
              }}
              whileHover={{
                y: -10,
                boxShadow: "0 24px 60px rgba(0,0,0,0.14), 0 0 0 1px rgba(232,94,34,0.12)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Top accent — expands on hover */}
              <div
                className="h-[2px] transition-all duration-500 ease-out group-hover:h-[3px]"
                style={{ background: "var(--molten-500)" }}
              />

              {/* Icon area — technical blueprint feel */}
              <div
                className="flex items-center justify-center py-12 relative overflow-hidden"
                style={{ background: "var(--bg-navy)" }}
              >
                {/* Grid pattern overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
                  style={{
                    backgroundImage: [
                      "linear-gradient(rgba(143,163,184,1) 1px, transparent 1px)",
                      "linear-gradient(90deg, rgba(143,163,184,1) 1px, transparent 1px)",
                    ].join(", "),
                    backgroundSize: "20px 20px",
                  }}
                />
                {/* SVG icon with dimension line reveal on hover */}
                <div
                  className="relative z-10 transition-transform duration-400 ease-out group-hover:scale-[1.12] [&_.pipe-dim]:transition-opacity [&_.pipe-dim]:duration-500 [&_.pipe-dim]:ease-out group-hover:[&_.pipe-dim]:opacity-100 [&_.pipe-outer]:transition-all [&_.pipe-outer]:duration-500 group-hover:[&_.pipe-outer]:stroke-[var(--steel-200)]"
                >
                  <product.Icon className="w-24 h-24" />
                </div>
                {/* Warm radial glow — intensifies on hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle at 50% 55%, rgba(232,94,34,0.08), transparent 65%)",
                  }}
                />
                {/* Navy ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(42,62,114,0.3), transparent 70%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7 flex flex-col flex-1">
                {/* Upper content — grows to fill available space */}
                <div className="flex-1">
                  <h3
                    className="font-display font-bold uppercase text-xl lg:text-2xl min-h-[2.4em] mb-1"
                    style={{ color: "var(--navy-700)" }}
                  >
                    {product.name}
                  </h3>

                  <p
                    className="font-mono text-[0.65rem] tracking-wider uppercase min-h-[2.2em] mb-4"
                    style={{ color: "var(--molten-600)" }}
                  >
                    {product.tagline}
                  </p>

                  <p className="text-[0.88rem] leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {product.description}
                  </p>
                </div>

                {/* Bottom content — aligned across all cards */}
                <div className="mt-6">
                  {/* Specs */}
                  <p
                    className="font-mono text-[0.62rem] tracking-wider uppercase mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {product.specs}
                  </p>

                  {/* GOST badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.gosts.map((gost) => (
                      <span
                        key={gost}
                        className="font-mono text-[0.56rem] px-2 py-0.5 tracking-wider uppercase"
                        style={{
                          color: "var(--navy-600)",
                          border: "1px solid rgba(42,62,114,0.22)",
                          background: "rgba(42,62,114,0.05)",
                        }}
                      >
                        {gost}
                      </span>
                    ))}
                  </div>

                  {/* Download catalog PDF — saves file + opens in new tab */}
                  <a
                    href={product.catalog}
                    download
                    onClick={(e) => {
                      // Also open in new tab for preview
                      window.open(product.catalog, "_blank", "noopener,noreferrer");
                    }}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase py-2.5 px-4 transition-colors duration-200"
                    style={{
                      color: "var(--text-white)",
                      background: "var(--molten-500)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--molten-600)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--molten-500)";
                    }}
                  >
                    <Download size={14} strokeWidth={2} />
                    {t("download")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom standards bar ─────────────────────────────────── */}
        <div className="mt-12 lg:mt-16 pt-6" style={{ borderTop: "1px solid rgba(100,128,152,0.22)" }}>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center" style={{ color: "var(--text-muted)" }}>
            {t("certs_row")}
          </p>
        </div>
      </div>
    </section>
  );
}

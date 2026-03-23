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
import { Circle, Square, RectangleHorizontal, Download } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

/* ── Product data from content.md ─────────────────────────────────────── */
interface Product {
  name: string;
  tagline: string;
  description: string;
  specs: string;
  gosts: string[];
  pdf: string;
  Icon: typeof Circle;
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
      pdf: "/Truba.pdf",
      Icon: Circle,
    },
    {
      name: t("square_name"),
      tagline: t("square_tagline"),
      description: t("square_desc"),
      specs: t("square_specs"),
      gosts: ["GOST 8639", "GOST 13663"],
      pdf: "/Profel.pdf",
      Icon: Square,
    },
    {
      name: t("profile_name"),
      tagline: t("profile_tagline"),
      description: t("profile_desc"),
      specs: t("profile_specs"),
      gosts: ["GOST 8645", "GOST 13663"],
      pdf: "/Profel.pdf",
      Icon: RectangleHorizontal,
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 py-24 lg:py-36">
        {/* ── Section heading ──────────────────────────────────────── */}
        <header className="products-heading mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs select-none" style={{ color: "var(--molten-500)" }}>04</span>
            <div
              ref={headingLineRef}
              className="flex-shrink-0"
              style={{ width: 120, height: 2, background: "var(--molten-500)", transformOrigin: "left center" }}
            />
            <span
              ref={headingLabelRef}
              className="font-mono text-xs tracking-[0.28em] uppercase select-none"
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
        <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              className="product-card group relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(100,128,152,0.18)",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 52px rgba(0,0,0,0.12)",
                transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Top accent */}
              <div className="h-[2px]" style={{ background: "var(--molten-500)" }} />

              {/* Icon area */}
              <div
                className="flex items-center justify-center py-10 relative overflow-hidden"
                style={{ background: "var(--bg-navy)" }}
              >
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <product.Icon
                    size={56}
                    strokeWidth={1}
                    style={{ color: "var(--steel-300)" }}
                  />
                </motion.div>
                {/* Subtle glow behind icon */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(42,62,114,0.25), transparent 70%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <h3
                  className="font-display font-bold uppercase text-xl lg:text-2xl mb-1"
                  style={{ color: "var(--navy-700)" }}
                >
                  {product.name}
                </h3>

                <p
                  className="font-mono text-[0.65rem] tracking-wider uppercase mb-4"
                  style={{ color: "var(--molten-600)" }}
                >
                  {product.tagline}
                </p>

                <p className="text-[0.88rem] leading-relaxed mb-5" style={{ color: "var(--text-mid)" }}>
                  {product.description}
                </p>

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

                {/* Download button */}
                <a
                  href={product.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
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

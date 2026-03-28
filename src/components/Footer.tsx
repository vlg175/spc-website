"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Footer — SPC Website
   Darkest bg (--bg-void). Three columns: logo+tagline | links | contact.
   Bottom bar: copyright + legal tagline.
   ───────────────────────────────────────────────────────────────────────── */

import Image from "next/image";
import { useTranslations } from "next-intl";
import { smoothScrollTo } from "@/components/LenisProvider";

function scrollTo(id: string) {
  smoothScrollTo(id);
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const FOOTER_LINKS = [
    { label: tNav("about"),    id: "about"    },
    { label: tNav("process"),  id: "process"  },
    { label: tNav("products"), id: "products" },
    { label: tNav("quality"),  id: "quality"  },
    { label: tNav("partners"), id: "partners" },
    { label: tNav("contact"),  id: "contact"  },
  ];
  return (
    <footer
      style={{ background: "var(--bg-void)" }}
      className="relative"
    >
      {/* Top border with molten fade */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-dim) 30%, var(--border-dim) 70%, transparent)",
        }}
      />

      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-20">

        {/* ── Three-column main area ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 py-12 md:py-16 lg:py-20">

          {/* ── Col 1: Logo + tagline ──────────────────────── */}
          <div className="flex flex-col gap-6">
            <button
              onClick={() => scrollTo("hero")}
              className="inline-block focus-visible:outline-none self-start"
              aria-label="Back to top"
            >
              <Image
                src="/logo_SPC.png"
                alt="SPC — Steel Pipe Company"
                width={80}
                height={34}
                className="object-contain"
                style={{ width: "auto", height: "auto", filter: "brightness(1)" }}
              />
            </button>

            <div>
              <p
                className="font-body font-bold uppercase text-lg leading-snug mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t("company")}
              </p>
              <p
                className="font-mono text-[0.62rem] tracking-[0.2em] uppercase leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {t("tagline1")}
                <br />
                {t("tagline2")}
                <br />
                {t("tagline3")}
              </p>
            </div>

            {/* Tagline */}
            <p
              className="font-mono text-[0.62rem] tracking-wider uppercase italic"
              style={{ color: "var(--molten-600)" }}
            >
              {t("brand_motto")}
            </p>
          </div>

          {/* ── Col 2: Quick links ─────────────────────────── */}
          <div>
            <p
              className="font-mono text-[0.56rem] tracking-[0.32em] uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              {t("nav_title")}
            </p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="font-mono text-xs tracking-[0.18em] uppercase text-left"
                    style={{ color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--molten-400)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ─────────────────────────────── */}
          <div>
            <p
              className="font-mono text-[0.56rem] tracking-[0.32em] uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              {t("contact_title")}
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-mono text-[0.52rem] tracking-wider uppercase mb-1" style={{ color: "var(--text-muted)" }}>Phone</p>
                <a
                  href="tel:+998559000077"
                  className="font-mono text-xs"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--molten-400)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                >
                  +998 (55) 900-00-77
                </a>
              </div>

              <div>
                <p className="font-mono text-[0.52rem] tracking-wider uppercase mb-1" style={{ color: "var(--text-muted)" }}>Email</p>
                <a
                  href="mailto:jv.steelpipe@gmail.com"
                  className="font-mono text-xs"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--molten-400)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                >
                  jv.steelpipe@gmail.com
                </a>
              </div>

              <div>
                <p className="font-mono text-[0.52rem] tracking-wider uppercase mb-1" style={{ color: "var(--text-muted)" }}>Address</p>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  SEZ Angren Promzona-3
                  <br />
                  Akhangaran, Tashkent Region
                  <br />
                  Republic of Uzbekistan
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div
          className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-faint)" }}
        >
          <p
            className="font-mono text-[0.55rem] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {t("copyright")}
          </p>

          <p
            className="font-mono text-[0.55rem] tracking-wider uppercase italic"
            style={{ color: "var(--concrete-400)" }}
          >
            {t("legal")}
          </p>
        </div>

      </div>
    </footer>
  );
}

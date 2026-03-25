"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { smoothScrollTo, smoothScrollToTop } from "@/components/LenisProvider";

/* ── Locale config ──────────────────────────────────────────── */
const LOCALES = [
  { label: "RU", value: "ru" },
  { label: "EN", value: "en" },
  { label: "UZ", value: "uz" },
] as const;

/* ── Component ─────────────────────────────────────────────── */
export default function Navbar() {
  const t = useTranslations("nav");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [drawerOpen,    setDrawerOpen]    = useState(false);

  /* ── Nav links (built inside component to use t()) ───────── */
  const NAV_LINKS = [
    { label: t("about"),    id: "about"    },
    { label: t("process"),  id: "process"  },
    { label: t("products"), id: "products" },
    { label: t("quality"),  id: "quality"  },
    { label: t("partners"), id: "partners" },
    { label: t("contact"),  id: "contact"  },
  ] as const;

  /* ── Transparent → solid on scroll ──────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close drawer on desktop resize ─────────────────────── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Active section via IntersectionObserver ─────────────── */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Hero intersecting → clear active (we're back at the top)
            setActiveSection(entry.target.id === "hero" ? "" : entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    // Also observe the hero section so scrolling back to top clears the active link
    const heroEl = document.getElementById("hero");
    if (heroEl) observer.observe(heroEl);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale]);

  /* ── Lock body scroll while drawer is open ───────────────── */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* ── Smooth-scroll to section (via Lenis) ────────────────── */
  const scrollTo = useCallback((id: string) => {
    setDrawerOpen(false);
    smoothScrollTo(id);
  }, []);

  const scrollToTop = useCallback(() => {
    smoothScrollToTop();
  }, []);

  /* ── Locale switcher ─────────────────────────────────────── */
  const switchLocale = useCallback((locale: string) => {
    setDrawerOpen(false);
    router.replace(pathname, { locale });
  }, [router, pathname]);

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-400",
          scrolled
            ? "bg-bg-navy/95 backdrop-blur-md border-b border-border-subtle shadow-navy"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ─────────────────────────────────────── */}
            <button
              onClick={scrollToTop}
              className="flex-shrink-0 focus-visible:outline-none"
              aria-label="Go to top"
            >
              <Image
                src="/logo_SPC.png"
                alt="SPC Steel Pipe Company"
                width={120}
                height={51}
                className="brightness-0 invert"
                priority
              />
            </button>

            {/* ── Desktop nav ──────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={[
                      "nav-link",
                      "font-display font-semibold text-[11px] tracking-[0.18em] uppercase whitespace-nowrap",
                      "transition-colors duration-200 focus-visible:outline-none",
                      isActive
                        ? "text-text-white nav-link--active"
                        : "text-text-secondary hover:text-text-white",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* ── Right cluster: lang toggle + hamburger ───── */}
            <div className="flex items-center gap-5">

              {/* Language toggle */}
              <div
                className="hidden lg:flex items-center"
                role="group"
                aria-label="Language selector"
              >
                {LOCALES.map((loc, i) => (
                  <span key={loc.value} className="flex items-center">
                    <button
                      onClick={() => switchLocale(loc.value)}
                      className={[
                        "px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em]",
                        "transition-colors duration-200 focus-visible:outline-none",
                        currentLocale === loc.value
                          ? "text-molten-400"
                          : "text-text-muted hover:text-text-secondary",
                      ].join(" ")}
                      aria-pressed={currentLocale === loc.value}
                    >
                      {loc.label}
                    </button>
                    {i < LOCALES.length - 1 && (
                      <span
                        className="text-border-dim text-[10px] select-none"
                        aria-hidden="true"
                      >
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>

              {/* Hamburger — 3 lines → X */}
              <button
                onClick={() => setDrawerOpen((v) => !v)}
                className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-[5px] text-text-white focus-visible:outline-none"
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                aria-expanded={drawerOpen}
              >
                <span
                  className={[
                    "block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center",
                    drawerOpen ? "rotate-45 translate-y-[6.5px]" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block w-5 h-[1.5px] bg-current transition-all duration-200",
                    drawerOpen ? "opacity-0 scale-x-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block w-5 h-[1.5px] bg-current transition-all duration-300 origin-center",
                    drawerOpen ? "-rotate-45 -translate-y-[6.5px]" : "",
                  ].join(" ")}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay (tap-to-close) ──────────────────────── */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden",
          "bg-bg-void/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer — slides from right ──────────────────── */}
      <aside
        className={[
          "fixed top-0 right-0 h-full w-[280px] sm:w-72 z-50",
          "flex flex-col",
          "bg-bg-dark border-l border-border-subtle",
          "transition-transform duration-300",
          "lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        {/* Drawer top bar */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-border-subtle flex-shrink-0">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
            Menu
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-white transition-colors"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
        </div>

        {/* Drawer nav items */}
        <nav className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
          {NAV_LINKS.map(({ label, id }, i) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={[
                  "group flex items-center gap-4 py-4",
                  "text-left border-b border-border-faint",
                  "transition-colors duration-200",
                  isActive
                    ? "text-text-white"
                    : "text-text-secondary hover:text-text-white",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] text-text-muted w-4 text-right flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-semibold text-sm tracking-[0.15em] uppercase flex-1">
                  {label}
                </span>
                {isActive && (
                  <span
                    className="w-0.5 h-4 bg-molten-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Drawer footer — language toggle */}
        <div className="px-6 py-6 border-t border-border-subtle flex-shrink-0">
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-muted mb-3">
            Language
          </p>
          <div className="flex gap-1.5">
            {LOCALES.map((loc) => (
              <button
                key={loc.value}
                onClick={() => switchLocale(loc.value)}
                className={[
                  "flex-1 py-2",
                  "font-mono text-[10px] tracking-[0.1em] uppercase",
                  "border transition-colors duration-200",
                  currentLocale === loc.value
                    ? "border-molten-500 text-molten-400"
                    : "border-border-dim text-text-muted hover:border-border-bright hover:text-text-secondary",
                ].join(" ")}
                aria-pressed={currentLocale === loc.value}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

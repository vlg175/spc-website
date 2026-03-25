import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import BackToTop from "@/components/BackToTop";
import LocaleSync from "@/components/LocaleSync";

/* ── Locale Layout ─────────────────────────────────────────────
   Validates locale, provides i18n messages, syncs <html lang>.
   Navbar, Footer, SocialIcons, BackToTop live here so they can
   access useTranslations() via NextIntlClientProvider.
   ──────────────────────────────────────────────────────────── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  /* ── JSON-LD — Product schema (3 product lines) ──────────── */
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "ERW Round Steel Pipes",
        description:
          "Electric resistance welded round steel pipes. GOST 10704, GOST 10705, GOST 3262 certified. Diameter 15–219 mm, wall thickness 1.0–8.0 mm.",
        brand: { "@type": "Brand", name: "Steel Pipe Company" },
        manufacturer: { "@type": "Organization", name: "Steel Pipe Company" },
      },
      {
        "@type": "Product",
        position: 2,
        name: "ERW Square Steel Profiles",
        description:
          "Electric resistance welded square steel profiles. GOST 8639, GOST 13663 certified. Size 15×15–180×180 mm, wall thickness 1.0–8.0 mm.",
        brand: { "@type": "Brand", name: "Steel Pipe Company" },
        manufacturer: { "@type": "Organization", name: "Steel Pipe Company" },
      },
      {
        "@type": "Product",
        position: 3,
        name: "ERW Rectangular Steel Profiles",
        description:
          "Electric resistance welded rectangular steel profiles. GOST 8645, GOST 13663 certified. Size 20×10–230×100 mm, wall thickness 1.0–8.0 mm.",
        brand: { "@type": "Brand", name: "Steel Pipe Company" },
        manufacturer: { "@type": "Organization", name: "Steel Pipe Company" },
      },
    ],
  };

  /* ── JSON-LD — Organization schema ─────────────────────────── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steel Pipe Company",
    legalName: "ООО «STEEL PIPE COMPANY»",
    url: "https://steelpipe.uz",
    logo: "https://steelpipe.uz/logo_SPC.png",
    foundingDate: "2018",
    description:
      "Uzbek-Chinese joint venture producing ERW electric resistance welded steel pipes and profiles. GOST-certified. Located in SEZ Angren Free Economic Zone, Uzbekistan.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Akhangaran",
      addressRegion: "Tashkent Region",
      addressCountry: "UZ",
      streetAddress: "SEZ Angren, Promzona-3",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998559000077",
        contactType: "customer service",
        availableLanguage: ["Russian", "Uzbek", "English"],
      },
      {
        "@type": "ContactPoint",
        email: "jv.steelpipe@gmail.com",
        contactType: "sales",
      },
    ],
    sameAs: [
      "https://t.me/DiliSultonov",
      "https://instagram.com/steelpipe_uz",
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* Syncs document.documentElement.lang to the active locale */}
      <LocaleSync locale={locale} />
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 font-mono text-xs tracking-wider uppercase"
        style={{
          background: "var(--molten-500)",
          color: "var(--text-white)",
        }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <SocialIcons />
      <BackToTop />
    </NextIntlClientProvider>
  );
}

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
      {/* Syncs document.documentElement.lang to the active locale */}
      <LocaleSync locale={locale} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialIcons />
      <BackToTop />
    </NextIntlClientProvider>
  );
}

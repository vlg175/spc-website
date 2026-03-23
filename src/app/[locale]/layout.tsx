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

  return (
    <NextIntlClientProvider messages={messages}>
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

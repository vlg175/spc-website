import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  Barlow_Condensed,
  IBM_Plex_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";

/* ── Google Fonts ──────────────────────────────────────────────
   Barlow Condensed → display headings (bold, industrial, condensed)
   IBM Plex Sans    → body text (clean, Cyrillic support)
   JetBrains Mono   → stats, specs, technical measurements
   ──────────────────────────────────────────────────────────── */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

/* ── Metadata ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "SPC — Steel Pipe Company | ERW Steel Pipes",
  description:
    "ERW electric resistance welded steel pipe manufacturer. Uzbek-Chinese joint venture. SEZ Angren, Tashkent Region, Uzbekistan. Round, square and profile pipes to GOST and EN standards.",
  keywords: [
    "ERW steel pipes",
    "steel pipe manufacturer",
    "Uzbekistan steel",
    "GOST pipes",
    "SPC steel pipe company",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "SPC — Steel Pipe Company | ERW Steel Pipes",
    description:
      "ERW electric resistance welded steel pipe manufacturer. Uzbek-Chinese JV. SEZ Angren, Uzbekistan. GOST-certified round, square and profile pipes.",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    siteName: "SPC Steel Pipe Company",
  },
};

/* ── Root Layout ───────────────────────────────────────────────
   lang defaults to "ru" (the default locale).
   suppressHydrationWarning allows the LocaleSync component in
   [locale]/layout.tsx to update document.documentElement.lang
   client-side without a React hydration mismatch warning.
   ──────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-void text-text-primary font-body antialiased overflow-x-hidden">
        <PageLoader />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}

import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  Oswald,
  IBM_Plex_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import PageLoader from "@/components/PageLoader";

/* ── Google Fonts ──────────────────────────────────────────────
   Oswald        → display headings (bold, industrial, condensed)
                   Full Latin + Cyrillic — works on RU/UZ/EN alike
   IBM Plex Sans → body text (clean, Cyrillic support)
   JetBrains Mono→ stats, specs, technical measurements
   ──────────────────────────────────────────────────────────── */
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "500"],
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
  metadataBase: new URL("https://steelpipe.uz"),
  title: "SPC — Steel Pipe Company | ERW Steel Pipes",
  description:
    "ERW electric resistance welded steel pipe manufacturer. Uzbek-Chinese joint venture. SEZ Angren, Tashkent Region, Uzbekistan. Round, square and profile pipes to GOST and EN standards.",
  keywords: [
    "ERW steel pipes",
    "steel pipe manufacturer",
    "Uzbekistan steel",
    "GOST pipes",
    "SPC steel pipe company",
    "steel pipe Angren",
    "трубы ERW Узбекистан",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    languages: {
      ru: "/ru",
      en: "/en",
      uz: "/uz",
    },
  },
  openGraph: {
    title: "SPC — Steel Pipe Company | ERW Steel Pipes",
    description:
      "ERW electric resistance welded steel pipe manufacturer. Uzbek-Chinese JV. SEZ Angren, Uzbekistan. GOST-certified round, square and profile pipes.",
    type: "website",
    url: "https://steelpipe.uz",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    siteName: "SPC Steel Pipe Company",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SPC — Steel Pipe Company | ERW Steel Pipes, Uzbekistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPC — Steel Pipe Company | ERW Steel Pipes",
    description:
      "ERW steel pipe manufacturer. Uzbek-Chinese JV. SEZ Angren, Uzbekistan. GOST-certified.",
    images: ["/opengraph-image.png"],
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
      className={`${oswald.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-void text-text-primary font-body antialiased overflow-x-hidden">
        <PageLoader />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

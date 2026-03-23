"use client";

import { useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   LocaleSync — updates <html lang> to match the active locale.
   The root layout sets lang="ru" as a static SSR default.
   This component corrects it client-side after hydration so that
   screen readers and browser spell-check use the right language.
   ───────────────────────────────────────────────────────────────────────── */
export default function LocaleSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}

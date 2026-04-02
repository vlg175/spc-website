import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "uz"],
  defaultLocale: "ru",
  localeDetection: false,
  /* Default locale (ru) is served at "/" with no prefix.
     Other locales keep their prefix: /en, /uz.
     This eliminates the "/" → "/ru" redirect round-trip. */
  localePrefix: "as-needed",
});

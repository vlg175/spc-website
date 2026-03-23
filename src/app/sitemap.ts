import type { MetadataRoute } from "next";

const BASE_URL = "https://steelpipe.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "en", "uz"] as const;

  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "ru" ? 1.0 : 0.9,
    alternates: {
      languages: {
        ru: `${BASE_URL}/ru`,
        en: `${BASE_URL}/en`,
        uz: `${BASE_URL}/uz`,
      },
    },
  }));
}

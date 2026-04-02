import type { MetadataRoute } from "next";

const BASE_URL = "https://www.steelpipe.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  /* localePrefix:"as-needed" — default locale (ru) lives at "/", not "/ru" */
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
      alternates: {
        languages: {
          ru:   `${BASE_URL}/`,
          en:   `${BASE_URL}/en`,
          uz:   `${BASE_URL}/uz`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/uz`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];
}

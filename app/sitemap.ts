import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { industries } from "@/data/industries";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const cityUrls = cities.map((c) => ({
    url: `${SITE_URL}/nettside/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryUrls = industries.map((i) => ({
    url: `${SITE_URL}/nettsider-for/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...cityUrls,
    ...industryUrls,
  ];
}

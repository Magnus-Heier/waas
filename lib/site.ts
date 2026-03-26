/**
 * Canonical base URL for the site. Used in metadataBase, sitemap, robots, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://dittdomene.no).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dittdomene.no";

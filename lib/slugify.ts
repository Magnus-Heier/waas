/**
 * Normalize Norwegian characters and text for URL slugs.
 * Use for generating and validating slugs; display names stay in original form on the page.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

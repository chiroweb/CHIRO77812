import slugify from "slugify";

const HAS_KOREAN = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;

/**
 * Generate a URL-friendly slug from a title.
 * Handles Korean characters by keeping them as-is (modern browsers decode Korean URLs).
 * Falls back to timestamp-based slug if all else fails.
 */
export function generateSlug(title: string): string {
  // If title contains Korean, use Korean-friendly slug
  if (HAS_KOREAN.test(title)) {
    const koreanSlug = title
      .trim()
      .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return koreanSlug || `post-${Date.now()}`;
  }

  // For English/Latin-only titles
  const latinSlug = slugify(title, { lower: true, strict: true });
  return latinSlug || `post-${Date.now()}`;
}

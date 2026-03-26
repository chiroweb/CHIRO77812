export const BLOG_CATEGORIES = [
  "홈페이지 관리법",
  "마케팅",
  "웹사이트 제작",
  "개인이야기",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const DEFAULT_BLOG_CATEGORY: BlogCategory = BLOG_CATEGORIES[0];

export function isBlogCategory(value: string): value is BlogCategory {
  return BLOG_CATEGORIES.includes(value as BlogCategory);
}

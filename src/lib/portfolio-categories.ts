export const PORTFOLIO_CATEGORIES = [
  "온라인 풀세팅",
  "소개홈페이지",
  "기업홈페이지",
  "쇼핑몰",
  "saas",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export const DEFAULT_PORTFOLIO_CATEGORY: PortfolioCategory = PORTFOLIO_CATEGORIES[0];

export function isPortfolioCategory(value: string): value is PortfolioCategory {
  return PORTFOLIO_CATEGORIES.includes(value as PortfolioCategory);
}

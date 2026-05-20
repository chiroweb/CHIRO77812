import { SITE_URL } from '@/lib/constants';
import type { BreadcrumbItem } from '@/lib/schema-helpers';

export const siteNavigation: Record<string, { name: string; parent?: string }> = {
  '/': { name: '홈' },
  '/services': { name: '서비스', parent: '/' },
  '/services/website': { name: '홈페이지 제작', parent: '/services' },
  '/services/remodeling': { name: '홈페이지 리모델링', parent: '/services' },
  '/services/seo-aeo': { name: 'SEO/AEO 통합 설계', parent: '/services' },
  '/portfolio': { name: '포트폴리오', parent: '/' },
  '/reviews': { name: '고객 후기', parent: '/' },
  '/pricing': { name: '요금 안내', parent: '/' },
  '/about': { name: '소개', parent: '/' },
  '/blog': { name: '블로그', parent: '/' },
  '/contact': { name: '문의', parent: '/' },
  '/free-diagnosis': { name: '무료 진단', parent: '/' },
};

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  let current: string | undefined = pathname;

  while (current) {
    const nav: { name: string; parent?: string } | undefined = siteNavigation[current];
    if (!nav) break;
    items.unshift({ name: nav.name, url: `${SITE_URL}${current}` });
    current = nav.parent;
  }

  return items;
}

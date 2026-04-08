import { SITE_URL } from '@/lib/constants';

const ORG_ID = `${SITE_URL}/#organization`;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ServiceData {
  name: string;
  description: string;
  url: string;
  provider?: string;
}

export interface ReviewSchemaInput {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}

export interface OfferSchemaInput {
  name: string;
  description: string;
  price: string;
  priceCurrency?: string;
  url: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}

export function generateFAQSchema(questions: FAQItem[]) {
  if (!questions || questions.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(service: ServiceData) {
  if (!service) return null;
  return {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      '@id': ORG_ID,
    },
  };
}

export function generateReviewSchema(review: ReviewSchemaInput) {
  if (!review) return null;
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
    },
    datePublished: review.datePublished,
  };
}

export function generateOfferSchema(plan: OfferSchemaInput) {
  if (!plan) return null;
  return {
    '@type': 'Offer',
    name: plan.name,
    description: plan.description,
    price: plan.price,
    priceCurrency: plan.priceCurrency || 'KRW',
    url: plan.url,
  };
}

export function generateArticleSchema(article: ArticleData) {
  if (!article) return null;
  return {
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.author && {
      author: { '@type': 'Person', name: article.author },
    }),
    ...(article.image && { image: article.image }),
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: '치로웹디자인',
    alternateName: 'CHIRO Web Design Studio',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    parentOrganization: {
      '@id': ORG_ID,
    },
  };
}

export function generatePageSchema(schemas: (object | null | undefined)[]) {
  const filtered = schemas.filter(Boolean);
  if (filtered.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': filtered,
  };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/<\//g, '<\\/') }}
    />
  );
}

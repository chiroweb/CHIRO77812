export interface Review {
  id: string;
  name: string;
  company: string;
  projectType: 'website' | 'remodeling' | 'seo-aeo';
  date: string;
  rating: number;
  quote: string;
  portfolioSlug?: string;
}

export const reviews: Review[] = [
  {
    id: 'review-kim-dohyun',
    name: '김도현',
    company: '스타트업 대표',
    projectType: 'website',
    date: '2024-06',
    rating: 5,
    quote: '다른 에이전시에서는 시안 나올 때까지 2주를 기다렸습니다. 치로는 상담한 당일에 링크를 보내줬습니다.',
  },
  {
    id: 'review-park-seoyeon',
    name: '박서연',
    company: '뷰티 브랜드 운영',
    projectType: 'website',
    date: '2024-09',
    rating: 5,
    quote: '아임웹으로 직접 만들어보려다 한계를 느꼈습니다. 치로에 맡기고 나서야 제가 원했던 그 느낌이 나왔습니다.',
  },
  {
    id: 'review-lee-junhyuk',
    name: '이준혁',
    company: '법률사무소 대표',
    projectType: 'remodeling',
    date: '2025-01',
    rating: 5,
    quote: '수정사항을 말하면 바로 반영되는 게 신기했습니다. 기다림이 없으니까 오히려 더 꼼꼼하게 요청할 수 있었습니다.',
  },
  {
    id: 'review-jung-sumin',
    name: '정수민',
    company: 'NBP Korea 마케팅 팀장',
    projectType: 'website',
    date: '2025-02',
    rating: 5,
    portfolioSlug: 'nbpkorea',
    quote: '글로벌 브랜드 수준의 퀄리티를 기대했는데, 납품 속도까지 빨라서 놀랐습니다. 내부 검토 기간보다 제작이 먼저 끝났습니다.',
  },
  {
    id: 'review-han-jiwon',
    name: '한지원',
    company: '카페 운영',
    projectType: 'seo-aeo',
    date: '2025-03',
    rating: 5,
    quote: 'SEO 세팅이 기본으로 포함되어 있어서 별도 비용 없이 검색 노출이 됐습니다. 오픈 2주 만에 네이버에서 카페 이름이 검색되기 시작했습니다.',
  },
];

export function getReviewsByType(type: Review['projectType']): Review[] {
  return reviews.filter((review) => review.projectType === type);
}

export function getAverageRating(): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProject {
  id: number;
  name: string;
  category: string;
  problem: string | null;
  result: string | null;
  year: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}

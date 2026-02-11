import type { Metadata } from "next";
import Link from "next/link";
import Divider from "@/components/ui/divider";
import SectionLabel from "@/components/ui/section-label";
import BlogContent from "@/components/blog-content";
import { sql } from "@/lib/db";

interface ProjectDetail {
  id: number;
  name: string;
  slug: string | null;
  category: string;
  client_name: string | null;
  site_url: string | null;
  problem: string | null;
  result: string | null;
  content: string | null;
  year: string | null;
  image_url: string | null;
}

const fallbackProjects: Record<string, ProjectDetail> = {
  "1": {
    id: 1,
    name: "NBPKOREA",
    slug: "nbpkorea",
    category: "Branding & Web",
    client_name: "NBPKOREA",
    site_url: null,
    problem: "글로벌 시장 진출을 위한 브랜드 사이트 필요",
    result: "브랜드 아이덴티티 구축 및 웹사이트 런칭",
    content: null,
    year: "2024",
    image_url: "/portfolio/nbpkorea.png",
  },
  "2": {
    id: 2,
    name: "Man Solution",
    slug: "man-solution",
    category: "Corporate Site",
    client_name: "Man Solution",
    site_url: null,
    problem: "기업 신뢰도를 전달할 홈페이지 부재",
    result: "전문성을 강조한 기업 사이트 구축",
    content: null,
    year: "2024",
    image_url: "/portfolio/mansolution.png",
  },
  "3": {
    id: 3,
    name: "FUNI",
    slug: "funi",
    category: "E-commerce",
    client_name: "FUNI",
    site_url: null,
    problem: "온라인 판매 채널 확장 필요",
    result: "브랜드 감성을 살린 이커머스 구축",
    content: null,
    year: "2024",
    image_url: "/portfolio/funi.png",
  },
  "4": {
    id: 4,
    name: "STUDIO",
    slug: "studio",
    category: "Portfolio Site",
    client_name: "STUDIO",
    site_url: null,
    problem: "크리에이티브 포트폴리오 사이트 필요",
    result: "미니멀 디자인의 포트폴리오 사이트 런칭",
    content: null,
    year: "2025",
    image_url: "/portfolio/studio.png",
  },
};

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbProject = await fetchProject(slug);
  const fallback = fallbackProjects[slug];
  const project = dbProject || fallback;
  const name = project?.name || "포트폴리오";
  const description = project?.result || "치로웹디자인 포트폴리오";

  return {
    title: `${name} — 포트폴리오`,
    description,
    openGraph: {
      title: `${name} — 포트폴리오 | 치로웹디자인`,
      description,
      url: `https://chiroweb.co.kr/portfolio/${slug}`,
    },
    alternates: {
      canonical: `https://chiroweb.co.kr/portfolio/${slug}`,
    },
  };
}

async function fetchProject(slug: string): Promise<ProjectDetail | null> {
  try {
    const decoded = decodeURIComponent(slug);

    // Try slug first
    let result = await sql`
      SELECT id, name, slug, category, client_name, site_url, problem, result, content, year, image_url
      FROM portfolio_projects
      WHERE slug = ${decoded} AND published = true
    `;

    // Fall back to id
    if (result.rows.length === 0) {
      const id = parseInt(decoded);
      if (!isNaN(id)) {
        result = await sql`
          SELECT id, name, slug, category, client_name, site_url, problem, result, content, year, image_url
          FROM portfolio_projects
          WHERE id = ${id} AND published = true
        `;
      }
    }

    if (result.rows.length > 0) return result.rows[0] as ProjectDetail;
  } catch {
    // Fall through
  }
  return null;
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const dbProject = await fetchProject(slug);
  const fallback = fallbackProjects[slug];

  if (!dbProject && !fallback) {
    return (
      <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-2xl font-light">
            프로젝트를 찾을 수 없습니다.
          </h1>
          <Link
            href="/portfolio"
            className="mt-4 inline-block text-sm text-[#6b6b6b] border-b border-[#1a1a1a] pb-[2px]"
          >
            포트폴리오로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const project = (dbProject || fallback) as ProjectDetail;

  return (
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <SectionLabel number="01" label={project.category || "Portfolio"} />

        <div className="mb-12">
          <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] mb-6">
            {project.year}
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[48px] font-light tracking-[0.03em] leading-[1.05] mb-6">
            {project.name}
          </h1>
        </div>

        {/* Hero Image */}
        {project.image_url && (
          <div className="mb-10 md:mb-16 aspect-[16/9] bg-[#f5f5f3] overflow-hidden">
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <Divider />

        {/* Project Info Grid */}
        <div className="mt-10 md:mt-16 grid grid-cols-4 md:grid-cols-12 gap-y-8 gap-x-6 mb-12 md:mb-20">
          {project.client_name && (
            <div className="col-span-4 md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                Client
              </p>
              <p className="text-sm text-[#1a1a1a] leading-relaxed">
                {project.client_name}
              </p>
            </div>
          )}

          <div className="col-span-4 md:col-span-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              Category
            </p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed">
              {project.category}
            </p>
          </div>

          <div className="col-span-4 md:col-span-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
              Year
            </p>
            <p className="text-sm text-[#1a1a1a] font-[family-name:var(--font-jetbrains-mono)]">
              {project.year}
            </p>
          </div>

          {project.site_url && (
            <div className="col-span-4 md:col-span-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                Website
              </p>
              <a
                href={project.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#1a1a1a] border-b border-[#1a1a1a] pb-[1px] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors duration-300"
              >
                사이트 방문 <span className="text-xs">&#8599;</span>
              </a>
            </div>
          )}
        </div>

        {/* Problem & Result */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#E0E0E0] mb-12 md:mb-20">
          {project.problem && (
            <div className="bg-white p-8 md:p-10">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                Challenge
              </p>
              <p className="text-base text-[#1a1a1a] leading-[1.8]">
                {project.problem}
              </p>
            </div>
          )}
          {project.result && (
            <div className="bg-[#fafaf8] p-8 md:p-10">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                Result
              </p>
              <p className="text-base text-[#1a1a1a] leading-[1.8]">
                {project.result}
              </p>
            </div>
          )}
        </div>

        {/* Content Area */}
        {project.content && (
          <>
            <Divider />
            <div className="mt-10 md:mt-16 max-w-3xl">
              <BlogContent html={project.content} />
            </div>
          </>
        )}

        {/* Back Link */}
        <div className="mt-20 pt-12 border-t border-[#E0E0E0]">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] border-b border-[#1a1a1a] pb-[2px] hover:border-transparent transition-colors duration-300"
          >
            &larr; 포트폴리오로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
}

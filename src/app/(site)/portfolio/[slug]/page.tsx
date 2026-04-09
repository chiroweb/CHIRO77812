import type { Metadata } from "next";
import Link from "next/link";
import BlogContent from "@/components/blog-content";
import ContactCtaSection from "@/components/sections/contact-cta-section";
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
  solution: string | null;
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
    solution: null,
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
    solution: null,
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
    solution: null,
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
    solution: null,
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
      SELECT id, name, slug, category, client_name, site_url, problem, result, solution, content, year, image_url
      FROM portfolio_projects
      WHERE slug = ${decoded} AND published = true
    `;

    // Fall back to id
    if (result.rows.length === 0) {
      const id = parseInt(decoded);
      if (!isNaN(id)) {
        result = await sql`
          SELECT id, name, slug, category, client_name, site_url, problem, result, solution, content, year, image_url
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
    <>
      {/* Hero */}
      <section className="bg-[#1a1a1a] pt-32 md:pt-40 pb-16 md:pb-24 px-5 md:px-12 lg:px-20" data-theme="dark">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-white/30 mb-6 font-[family-name:var(--font-jetbrains-mono)]">
            ( {project.category} )
          </p>
          <h1 className="text-[48px] md:text-[80px] lg:text-[110px] font-extrabold text-white tracking-[-0.03em] leading-[0.9] uppercase">
            {project.name}
          </h1>
          {project.year && (
            <p className="mt-6 text-[13px] text-white/40 font-[family-name:var(--font-jetbrains-mono)]">{project.year}</p>
          )}
        </div>
      </section>

      {/* Hero Image */}
      {project.image_url && (
        <section className="bg-[#1a1a1a] px-5 md:px-12 lg:px-20 pb-[100px]" data-theme="dark">
          <div className="max-w-[1400px] mx-auto">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img src={project.image_url} alt={project.name} className="w-full h-full object-contain bg-[#111]" />
            </div>
          </div>
        </section>
      )}

      {/* Overview Meta */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-10 font-[family-name:var(--font-jetbrains-mono)]">
            ( OVERVIEW )
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.client_name && (
              <div>
                <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2 font-[family-name:var(--font-jetbrains-mono)]">Client</p>
                <p className="text-[15px] text-[#111] font-medium">{project.client_name}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2 font-[family-name:var(--font-jetbrains-mono)]">Category</p>
              <p className="text-[15px] text-[#111] font-medium">{project.category}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2 font-[family-name:var(--font-jetbrains-mono)]">Year</p>
              <p className="text-[15px] text-[#111] font-medium font-[family-name:var(--font-jetbrains-mono)]">{project.year}</p>
            </div>
            {project.site_url && (
              <div>
                <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-2 font-[family-name:var(--font-jetbrains-mono)]">Website</p>
                <a href={project.site_url} target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#111] font-medium hover:text-[#FF4D00] transition-colors">
                  사이트 방문 ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Challenge → Solution → Result */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 pb-[200px] md:pb-[260px]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.problem && (
            <div className="border-t-2 border-[#111] pt-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">Challenge</p>
              <p className="text-[15px] text-[#111] leading-[1.8]">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="border-t-2 border-[#111] pt-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">Solution</p>
              <p className="text-[15px] text-[#111] leading-[1.8]">{project.solution}</p>
            </div>
          )}
          {project.result && (
            <div className="border-t-2 border-[#FF4D00] pt-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4 font-[family-name:var(--font-jetbrains-mono)]">Result</p>
              <p className="text-[15px] text-[#111] leading-[1.8] font-medium">{project.result}</p>
            </div>
          )}
        </div>
      </section>

      {/* Content (if CMS) */}
      {project.content && (
        <section className="bg-white px-5 md:px-12 lg:px-20 py-[160px] md:py-[200px]">
          <div className="max-w-[800px] mx-auto">
            <BlogContent html={project.content} />
          </div>
        </section>
      )}

      {/* Back + CTA */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[14px] text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
          >
            ← 포트폴리오로 돌아가기
          </Link>
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}

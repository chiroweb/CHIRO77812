import type { Metadata } from "next";
import Link from "next/link";
import BlogContent from "@/components/blog-content";
import CtaContact from "@/components/sections/cta-contact";
import { sql } from "@/lib/db";

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */

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

/* ─────────────────────────────────────
   Fallback Data
───────────────────────────────────── */

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

/* ─────────────────────────────────────
   DB Fetch
───────────────────────────────────── */

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

    let result = await sql`
      SELECT id, name, slug, category, client_name, site_url, problem, result, solution, content, year, image_url
      FROM portfolio_projects
      WHERE slug = ${decoded} AND published = true
    `;

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

/* ─────────────────────────────────────
   Page Component — Editorial Detail
───────────────────────────────────── */

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const dbProject = await fetchProject(slug);
  const fallback = fallbackProjects[slug];

  if (!dbProject && !fallback) {
    return (
      <section className="pt-32 pb-32 px-5 md:px-12 lg:px-20 bg-[#f5f5f0]">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-8">
            ( NOT FOUND )
          </p>
          <h1 className="text-[48px] md:text-[72px] font-extrabold tracking-[-0.03em] leading-[0.9] text-[#111] uppercase mb-8">
            PROJECT
            <br />
            <span className="text-[#C0C0C0]">NOT FOUND.</span>
          </h1>
          <Link
            href="/portfolio"
            className="text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
          >
            ← 포트폴리오로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const project = (dbProject || fallback) as ProjectDetail;

  return (
    <>
      {/* ══════════════════════════════════════
         HERO — Editorial project title
         다크, 거대 타이포 + 메타 정보
      ══════════════════════════════════════ */}
      <section
        className="pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-12 lg:px-20"
        style={{ backgroundColor: "#1a1a1a" }}
        data-theme="dark"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.06em] uppercase text-white/30 hover:text-white transition-colors duration-300 font-[family-name:var(--font-jetbrains-mono)] mb-16 md:mb-24"
          >
            ← Portfolio
          </Link>

          {/* Category + Year */}
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-white/30 mb-6">
            ( {project.category} {project.year && `— ${project.year}`} )
          </p>

          {/* Project name — editorial display */}
          <h1 className="text-[56px] md:text-[96px] lg:text-[130px] font-extrabold text-white tracking-[-0.04em] leading-[0.85] uppercase">
            {project.name}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10 md:mt-14">
            {project.client_name && (
              <div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-white/25 mb-1">Client</p>
                <p className="text-[15px] text-white/70 font-medium">{project.client_name}</p>
              </div>
            )}
            <div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-white/25 mb-1">Category</p>
              <p className="text-[15px] text-white/70 font-medium">{project.category}</p>
            </div>
            {project.year && (
              <div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-white/25 mb-1">Year</p>
                <p className="text-[15px] text-white/70 font-medium font-[family-name:var(--font-jetbrains-mono)]">{project.year}</p>
              </div>
            )}
            {project.site_url && (
              <div>
                <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] tracking-[0.08em] uppercase text-white/25 mb-1">Website</p>
                <a
                  href={project.site_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-white/70 font-medium hover:text-[#FF4D00] transition-colors"
                >
                  사이트 방문 ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         HERO IMAGE — Full-width editorial
      ══════════════════════════════════════ */}
      {project.image_url && (
        <section
          className="px-5 md:px-12 lg:px-20 pb-[100px] md:pb-[140px]"
          style={{ backgroundColor: "#1a1a1a" }}
          data-theme="dark"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-full object-contain bg-[#111]"
              />
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
         OVERVIEW — Challenge / Solution / Result
         Editorial: 비대칭 3블록, 좌정렬
      ══════════════════════════════════════ */}
      {(project.problem || project.solution || project.result) && (
        <section
          className="py-[160px] md:py-[220px] px-5 md:px-12 lg:px-20"
          style={{ backgroundColor: "#f5f5f0" }}
        >
          <div className="max-w-[1400px] mx-auto">
            <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-16 md:mb-24">
              ( OVERVIEW )
            </p>

            <div className="space-y-16 md:space-y-20">
              {project.problem && (
                <div className="lg:w-[60%]">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4">
                    ( CHALLENGE )
                  </p>
                  <h3 className="text-[24px] md:text-[36px] font-bold text-[#111] leading-[1.2] mb-4">
                    문제.
                  </h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#666]">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="lg:w-[60%] lg:ml-auto">
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4">
                    ( SOLUTION )
                  </p>
                  <h3 className="text-[24px] md:text-[36px] font-bold text-[#111] leading-[1.2] mb-4">
                    해결.
                  </h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#666]">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.result && (
                <div className="lg:w-[60%]"
                  style={{ borderLeft: "3px solid #FF4D00", paddingLeft: "2rem" }}
                >
                  <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] uppercase text-[#999] mb-4">
                    ( RESULT )
                  </p>
                  <h3 className="text-[24px] md:text-[36px] font-bold text-[#111] leading-[1.2] mb-4">
                    결과.
                  </h3>
                  <p className="text-[16px] md:text-[18px] leading-[1.85] text-[#111] font-medium">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
         CONTENT — CMS content (if exists)
      ══════════════════════════════════════ */}
      {project.content && (
        <section className="bg-white px-5 md:px-12 lg:px-20 py-[120px] md:py-[160px]">
          <div className="max-w-[800px] mx-auto">
            <BlogContent html={project.content} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
         BACK + CTA
      ══════════════════════════════════════ */}
      <section className="bg-[#f5f5f0] px-5 md:px-12 lg:px-20 py-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] uppercase font-medium text-[#111] hover:text-[#FF4D00] transition-colors duration-300"
          >
            ← 포트폴리오로 돌아가기
          </Link>
        </div>
      </section>

      <CtaContact />
    </>
  );
}

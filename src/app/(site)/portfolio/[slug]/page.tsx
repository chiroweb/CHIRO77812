import type { Metadata } from "next";
import Link from "next/link";
import Divider from "@/components/ui/divider";
import SectionLabel from "@/components/ui/section-label";
import BlogContent from "@/components/blog-content";
import FAQSection from "@/components/seo/faq-section";
import InternalLinks from "@/components/seo/internal-links";
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

  const caseStudyFAQs = [
    {
      question: "이 프로젝트와 비슷한 사이트를 만들 수 있나요?",
      answer: "네, 가능합니다. 각 프로젝트는 클라이언트의 요구사항에 맞춰 커스텀 제작되며, 유사한 기능과 디자인 방향을 참고하여 새로운 프로젝트를 진행할 수 있습니다. 무료 상담을 통해 구체적인 요구사항을 말씀해주세요.",
    },
    {
      question: "프로젝트 완료 후 유지보수도 해주시나요?",
      answer: "네, 런칭 후에도 안정적인 운영을 위해 유지보수 서비스를 제공합니다. 콘텐츠 업데이트, 기능 추가, 보안 패치 등 필요한 관리를 지속적으로 지원합니다.",
    },
    {
      question: "제작 과정은 어떻게 진행되나요?",
      answer: "상담 → 기획 → 디자인 → 개발 → 테스트 → 런칭 순으로 진행됩니다. 각 단계마다 클라이언트와 충분히 소통하며, 피드백을 반영하여 최적의 결과물을 만들어냅니다.",
    },
  ];

  const caseStudyLinks = [
    { title: "포트폴리오", href: "/portfolio", description: "치로웹디자인의 다양한 프로젝트 사례를 확인하세요." },
    { title: "서비스 안내", href: "/services", description: "홈페이지 제작, 리모델링, SEO/AEO 등 서비스를 확인하세요." },
    { title: "문의하기", href: "/contact", description: "프로젝트 상담부터 견적까지, 편하게 문의해주세요." },
  ];

  return (
    <>
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb for dynamic page */}
          <nav aria-label="Breadcrumb" className="mb-6 md:mb-8 overflow-x-auto">
            <ol className="flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase">
              <li className="flex items-center gap-2">
                <Link href="/" className="text-[#9b9b9b] hover:text-[#6b6b6b] transition-colors">홈</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#9b9b9b]">/</span>
                <Link href="/portfolio" className="text-[#9b9b9b] hover:text-[#6b6b6b] transition-colors">포트폴리오</Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#9b9b9b]">/</span>
                <span className="text-[#1a1a1a]">{project.name}</span>
              </li>
            </ol>
          </nav>

          <div className="flex justify-center">
            <SectionLabel number="01" label={project.category || "Portfolio"} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] mb-6">
              {project.year}
            </p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[48px] font-light tracking-[0.03em] leading-[1.05]">
              {project.name}
            </h1>
          </div>
        </div>

        {project.image_url && (
          <div className="max-w-5xl mx-auto mt-12 md:mt-16 mb-10 md:mb-16 aspect-[16/9] bg-[#f5f5f3] overflow-hidden">
            <img
              src={project.image_url}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <Divider />

          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 md:mb-16">
            {project.client_name && (
              <div className="border border-[#E0E0E0] bg-white p-5 md:p-6 min-h-[132px]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                  Client
                </p>
                <p className="text-sm text-[#1a1a1a] leading-relaxed">
                  {project.client_name}
                </p>
              </div>
            )}

            <div className="border border-[#E0E0E0] bg-white p-5 md:p-6 min-h-[132px]">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                Category
              </p>
              <p className="text-sm text-[#1a1a1a] leading-relaxed">
                {project.category}
              </p>
            </div>

            <div className="border border-[#E0E0E0] bg-white p-5 md:p-6 min-h-[132px]">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-3">
                Year
              </p>
              <p className="text-sm text-[#1a1a1a] font-[family-name:var(--font-jetbrains-mono)]">
                {project.year}
              </p>
            </div>

            {project.site_url && (
              <div className="border border-[#E0E0E0] bg-white p-5 md:p-6 min-h-[132px]">
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

          {/* Problem → Solution → Result structure */}
          <div className={`grid grid-cols-1 ${project.solution ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mb-12 md:mb-18`}>
            {project.problem && (
              <div className="border border-[#E0E0E0] bg-white p-6 md:p-7 min-h-[168px]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                  Challenge
                </p>
                <p className="text-base text-[#1a1a1a] leading-[1.8]">
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div className="border border-[#E0E0E0] bg-white p-6 md:p-7 min-h-[168px]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                  Solution
                </p>
                <p className="text-base text-[#1a1a1a] leading-[1.8]">
                  {project.solution}
                </p>
              </div>
            )}
            {project.result && (
              <div className="border border-[#E0E0E0] bg-[#fafaf8] p-6 md:p-7 min-h-[168px]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b9b9b] mb-4">
                  Result
                </p>
                <p className="text-base text-[#1a1a1a] leading-[1.8]">
                  {project.result}
                </p>
              </div>
            )}
          </div>

          {project.content && (
            <>
              <Divider />
              <div className="mt-10 md:mt-16 max-w-3xl mx-auto">
                <BlogContent html={project.content} />
              </div>
            </>
          )}

          <div className="mt-20 pt-12 border-t border-[#E0E0E0] text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] border-b border-[#1a1a1a] pb-[2px] hover:border-transparent transition-colors duration-300"
            >
              &larr; 포트폴리오로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <FAQSection
      questions={caseStudyFAQs}
      sectionNumber="02"
      sectionLabel="FAQ"
      heading="Questions"
    />

    {/* ── Internal Links ── */}
    <InternalLinks links={caseStudyLinks} />
    </>
  );
}

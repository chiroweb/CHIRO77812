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
    client_name: "NBPKOREA (엔비피코리아)",
    site_url: null,
    problem:
      "글로벌 시장 진출을 앞두고 있었지만, 기존 사이트는 국내 B2B 고객을 대상으로 한 정보 전달 위주 구조였다. 해외 바이어에게 전문성과 기술력을 보여줄 수 있는 브랜드 기반 사이트가 필요했다.",
    solution:
      "제조업 특유의 신뢰감을 살리면서도 모션과 타이포그래피를 활용해 브랜드 차별화를 구현했다. 제품·사업영역·기업정보를 계층적으로 재정리하고, 영문 대응과 구조화 데이터(JSON-LD)를 적용해 해외 검색 노출을 고려했다.",
    result:
      "브랜드 아이덴티티 재정립과 함께 사이트를 전면 재설계했고, 모바일·데스크탑 반응형, AEO(Answer Engine Optimization) 구조 기본 탑재. 제작 후 영문 유입 비중 상승, 문의 품질 개선.",
    content: null,
    year: "2024",
    image_url: "/portfolio/nbpkorea.mp4",
  },
  "2": {
    id: 2,
    name: "Man Solution",
    slug: "man-solution",
    category: "Corporate Site",
    client_name: "Man Solution",
    site_url: null,
    problem:
      "전문 서비스를 제공하는 중소기업임에도 불구하고 기존에 제대로 된 홈페이지가 없어 영업 과정에서 신뢰도 입증에 어려움이 있었다. 견적 상담으로 바로 이어지는 구조가 필요했다.",
    solution:
      "전문성을 중심축으로 두고, 서비스별 구체적 사례·프로세스·담당자 정보를 앞단에 배치했다. 시맨틱 HTML과 FAQ 스키마를 적용해 검색 엔진이 기업의 전문 영역을 명확하게 이해할 수 있도록 했다.",
    result:
      "기업 신뢰도를 구조적으로 전달하는 코퍼레이트 사이트 구축. 문의 폼-CRM 연동, 모바일 최적화, Core Web Vitals 통과. 오픈 후 유기 검색 유입이 꾸준히 상승.",
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
    problem:
      "오프라인에서 축적된 브랜드 감성을 온라인으로 옮기는 과정에서, 기성 이커머스 템플릿(카페24·아임웹 등)의 한계로 브랜드 톤이 희석되는 문제가 있었다.",
    solution:
      "코드 기반 커스텀 이커머스 구조를 설계하고, 브랜드 감성을 유지하는 비주얼 시스템과 모션을 구축했다. 상품 페이지에는 Product 스키마, 리뷰 구조화 데이터를 적용해 검색 결과 노출을 강화했다.",
    result:
      "브랜드 감성과 구매 전환을 동시에 잡는 이커머스 구축. 모바일 퍼스트 설계로 결제 이탈률 개선, 상품 상세 페이지 SEO 최적화로 롱테일 키워드 유입 확장.",
    content: null,
    year: "2024",
    image_url: "/portfolio/funi.png",
  },
  "4": {
    id: 4,
    name: "STUDIO",
    slug: "studio",
    category: "Portfolio Site",
    client_name: "CHIRO Web Design Studio",
    site_url: "https://chiroweb.co.kr",
    problem:
      "크리에이티브 에이전시로서 자사 작업물을 보여줄 포트폴리오 사이트가 필요했다. 단순한 이미지 나열이 아니라, 각 프로젝트의 맥락(문제·해결·결과)을 편집적으로 전달하면서 동시에 AEO·SEO 구조를 모범적으로 구현해 '포트폴리오 자체가 레퍼런스가 되는' 수준을 요구했다.",
    solution:
      "Toyokoh 레퍼런스를 기반으로 분위기 먼저, 정보 나중에 원칙을 적용했다. 100vh+ 히어로, 2배 여백, 에디토리얼 타이포그래피를 사용해 크리에이티브 톤을 세팅하고, 프로젝트 상세 페이지는 Challenge → Solution → Result 구조로 서사성을 강화했다. 전체 페이지에 Next.js App Router 기반의 서버 렌더링, JSON-LD 구조화 데이터, llms.txt, AEO 메타 최적화를 적용했다.",
    result:
      "미니멀·에디토리얼 디자인의 포트폴리오 사이트 런칭. Core Web Vitals 전 항목 Good 등급, ChatGPT·Perplexity 인용 최적화 구조, 모바일·데스크탑 완전 반응형. 치로웹디자인의 작업 철학과 기술력을 동시에 보여주는 자사 플래그십 사이트로 기능.",
    content: null,
    year: "2025",
    image_url: "/portfolio/nbpkorea.mp4",
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

  // 색인 품질을 위해 problem + result를 결합한 풍부한 description 생성
  const parts = [project?.problem, project?.result, project?.solution]
    .filter(Boolean)
    .map((s) => (s as string).replace(/\s+/g, " ").trim());
  const combined = parts.join(" · ");
  const description =
    combined.length > 60
      ? combined.slice(0, 155)
      : `${name} 프로젝트 케이스 스터디 — 치로웹디자인이 설계한 ${project?.category || "웹"} 프로젝트. 문제 정의부터 해결 과정, 성과까지 공개합니다.`;

  return {
    title: `${name} — 포트폴리오`,
    description,
    openGraph: {
      title: `${name} — 포트폴리오 | 치로웹디자인`,
      description,
      url: `https://chiroweb.co.kr/portfolio/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://chiroweb.co.kr/portfolio/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name} — ${project.category}`,
    description:
      [project.problem, project.solution, project.result]
        .filter(Boolean)
        .join(" · ") || `${project.name} 포트폴리오`,
    url: `https://chiroweb.co.kr/portfolio/${slug}`,
    image: project.image_url
      ? project.image_url.startsWith("http")
        ? project.image_url
        : `https://chiroweb.co.kr${project.image_url}`
      : undefined,
    dateCreated: project.year,
    creator: {
      "@type": "Organization",
      name: "치로웹디자인",
      url: "https://chiroweb.co.kr",
    },
    about: project.category,
    ...(project.client_name && {
      sourceOrganization: {
        "@type": "Organization",
        name: project.client_name,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://chiroweb.co.kr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "포트폴리오",
        item: "https://chiroweb.co.kr/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `https://chiroweb.co.kr/portfolio/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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

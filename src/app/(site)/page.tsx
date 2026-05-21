import Hero from "@/components/sections/hero";
import AllInOne from "@/components/sections/all-in-one";
import PrettyTrash from "@/components/sections/pretty-trash";
import AboutEditorial from "@/components/sections/about-editorial";
import ExpandingImage from "@/components/sections/expanding-image";
import WhyChiroPin from "@/components/sections/why-chiro-pin";
import PortfolioShowcase from "@/components/sections/portfolio-showcase";
import GalleryCounter from "@/components/sections/gallery-counter";
import NewsList from "@/components/sections/news-list";
import FaqHome from "@/components/sections/faq-home";
import CtaContact from "@/components/sections/cta-contact";
import { sql } from "@/lib/db";

export default async function Home() {
  let portfolioProjects: { number: string; name: string; category: string; description: string; image: string; video?: string; link: string }[] = [];

  try {
    const result = await sql`
      SELECT id, name, slug, category, problem, image_url, site_url
      FROM portfolio_projects
      WHERE published = true
      ORDER BY sort_order ASC, created_at DESC
    `;
    // Golf from DB
    const golf = result.rows.find((row: any) => row.slug === "project-GOLF_ETC");

    const s3Base = "https://chiro-web.s3.ap-northeast-2.amazonaws.com/public/portfolio";

    portfolioProjects = [
      {
        number: "01",
        name: "Portfolio Collection",
        category: "포트폴리오 모음",
        description: "치로가 만든 다양한 프로젝트들. 브랜딩부터 이커머스까지, 각 클라이언트에 맞춘 맞춤형 솔루션.",
        image: `${s3Base}/portfolio-collection.png`,
        link: "/portfolio",
      },
      {
        number: "02",
        name: "GOLF_ETC",
        category: golf?.category || "온라인 풀세팅",
        description: golf?.problem || "새로 런칭하는 골프악세서리 브랜드의 분위기와 톤앤매너를 찾고 구현했습니다.",
        image: golf?.image_url || "",
        link: `/portfolio/${golf?.slug || "project-GOLF_ETC"}`,
      },
      {
        number: "03",
        name: "NBPKOREA",
        category: "Branding & Web",
        description: "글로벌 시장 진출을 위한 브랜드 아이덴티티 구축 및 웹사이트 런칭. 유입률 240% 증가 달성.",
        image: `${s3Base}/nbpkorea.png`,
        link: "/portfolio/nbpkorea",
      },
      {
        number: "04",
        name: "아파트 분양 홍보관",
        category: "정보 미공개",
        description: "아파트 분양 홍보관 프로젝트. 상세 정보는 비공개입니다.",
        image: `${s3Base}/exordium.png`,
        link: "#",
      },
    ];
  } catch {
    // fallback if DB unavailable
  }

  return (
    <>
      <Hero />
      <AllInOne />
      <PrettyTrash />
      <AboutEditorial />
      <ExpandingImage />
      <WhyChiroPin />
      <PortfolioShowcase projects={portfolioProjects} />
      <GalleryCounter />
      <NewsList />
      <CtaContact />
      <FaqHome />
    </>
  );
}

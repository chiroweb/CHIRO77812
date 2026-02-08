import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Seed blog posts
    const blogPosts = [
      {
        title: "아임웹, 카페24를 넘어서: 커스텀 웹사이트가 필요한 순간",
        slug: "why-custom-website",
        excerpt: "템플릿 기반 빌더의 한계와 커스텀 빌드가 브랜드에 가져다주는 실질적인 차이를 이야기합니다.",
        content: `<p>템플릿 기반 웹사이트 빌더는 빠르고 간편합니다. 하지만 브랜드가 성장하면서, 템플릿의 한계는 반드시 드러납니다.</p>
<p>동일한 레이아웃, 제한된 커스터마이징, 느린 로딩 속도. 이러한 문제들은 단순히 "불편함"이 아닙니다. 브랜드의 신뢰도를 깎고, 잠재 고객의 이탈을 만듭니다.</p>
<p>커스텀 웹사이트는 단순히 "예쁜 사이트"가 아닙니다. 브랜드의 본질을 디지털 위에 정확히 옮기는 작업입니다. 로딩 속도, SEO, 사용자 경험까지 — 모든 것이 브랜드를 위해 설계됩니다.</p>
<p>치로는 이러한 설계를 투명하게 진행합니다. 상담과 동시에 사이트가 만들어지는 과정을 직접 확인하실 수 있습니다.</p>`,
        category: "Insight",
        published: true,
      },
      {
        title: "3초의 법칙: 웹사이트 속도가 매출에 미치는 영향",
        slug: "web-performance-matters",
        excerpt: "로딩 속도 1초 개선이 전환율에 어떤 영향을 미치는지, 실제 데이터를 기반으로 분석합니다.",
        content: `<p>웹사이트의 로딩 속도는 단순히 기술적인 문제가 아닙니다. 비즈니스의 수익과 직결되는 핵심 지표입니다.</p>
<p>Google의 연구에 따르면, 페이지 로딩이 1초에서 3초로 늘어나면 이탈률이 32% 증가합니다. 5초가 되면 90%까지 치솟습니다.</p>
<p>치로는 모든 프로젝트에서 Core Web Vitals를 최우선으로 고려합니다. LCP 1.5초 이내, FID 100ms 이내를 목표로 설계합니다.</p>`,
        category: "Performance",
        published: true,
      },
      {
        title: "디자인이 신뢰를 만드는 방법",
        slug: "design-trust",
        excerpt: "방문자가 웹사이트에 머무르는 이유와 떠나는 이유. 신뢰를 설계하는 디자인 원칙을 정리합니다.",
        content: `<p>방문자는 웹사이트를 열고 0.05초 만에 첫인상을 형성합니다. 이 순간에 신뢰를 주지 못하면, 그 방문자는 영영 돌아오지 않습니다.</p>
<p>신뢰를 만드는 디자인에는 규칙이 있습니다. 일관된 타이포그래피, 적절한 여백, 그리고 명확한 정보 구조. 이 세 가지가 갖춰지면, 방문자는 자연스럽게 머물게 됩니다.</p>
<p>치로는 이러한 원칙을 모든 프로젝트에 적용합니다. 브랜드의 본질을 담으면서도, 방문자가 신뢰할 수 있는 디자인을 설계합니다.</p>`,
        category: "Design",
        published: true,
      },
    ];

    for (const post of blogPosts) {
      const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${post.slug}`;
      if (existing.rows.length === 0) {
        await sql`
          INSERT INTO blog_posts (title, slug, excerpt, content, category, published)
          VALUES (${post.title}, ${post.slug}, ${post.excerpt}, ${post.content}, ${post.category}, ${post.published})
        `;
      }
    }

    // Seed portfolio projects
    const portfolioProjects = [
      { name: "Project Alpha", category: "Branding & Web", problem: "브랜드 인지도 부족으로 온라인 전환율이 낮았습니다.", result: "런칭 3개월 내 문의량 240% 증가", year: "2024", sort_order: 0 },
      { name: "Project Beta", category: "UX Redesign", problem: "복잡한 서비스 구조로 사용자 이탈률이 높았습니다.", result: "이탈률 45% 감소, 평균 체류 시간 2배 증가", year: "2024", sort_order: 1 },
      { name: "Project Gamma", category: "Performance", problem: "기존 사이트의 속도와 SEO 문제로 검색 노출이 어려웠습니다.", result: "검색 유입 380% 증가, 페이지 로드 0.8초", year: "2024", sort_order: 2 },
      { name: "Project Delta", category: "Custom Build", problem: "아임웹 한계로 원하는 디자인 구현이 불가능했습니다.", result: "커스텀 빌드로 브랜드 정체성 완벽 반영", year: "2025", sort_order: 3 },
      { name: "Project Epsilon", category: "E-Commerce", problem: "기존 쇼핑몰의 전환율이 업계 평균 이하였습니다.", result: "구매 전환율 180% 향상", year: "2025", sort_order: 4 },
      { name: "Project Zeta", category: "Corporate", problem: "기업 이미지와 웹사이트의 괴리가 심했습니다.", result: "브랜드 일관성 확보, 문의량 3배 증가", year: "2025", sort_order: 5 },
    ];

    for (const project of portfolioProjects) {
      const existing = await sql`SELECT id FROM portfolio_projects WHERE name = ${project.name}`;
      if (existing.rows.length === 0) {
        await sql`
          INSERT INTO portfolio_projects (name, category, problem, result, year, sort_order, published)
          VALUES (${project.name}, ${project.category}, ${project.problem}, ${project.result}, ${project.year}, ${project.sort_order}, true)
        `;
      }
    }

    // Seed default settings
    const defaultSettings = [
      { key: "site_title", value: "CHIRO — Web Design Studio" },
      { key: "site_description", value: "기획이 곧 개발이 되는 투명함. 당신의 브랜드에 온전히 몰입합니다." },
      { key: "contact_email", value: "chiroweb75@gmail.com" },
      { key: "contact_phone", value: "010-6815-0775" },
      { key: "contact_representative", value: "최정원" },
      { key: "contact_location", value: "센트럴 비즈한라 2740호" },
      { key: "response_time", value: "영업일 기준 24시간 내에 답변을 드립니다." },
    ];

    for (const setting of defaultSettings) {
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES (${setting.key}, ${setting.value})
        ON CONFLICT (key) DO NOTHING
      `;
    }

    return NextResponse.json({ message: "Seed data inserted successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed data", details: String(error) },
      { status: 500 }
    );
  }
}

import Link from "next/link";
import Divider from "@/components/ui/divider";
import SectionLabel from "@/components/ui/section-label";
import BlogContent from "@/components/blog-content";

const fallbackPosts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "why-custom-website": {
    title: "아임웹, 카페24를 넘어서: 커스텀 웹사이트가 필요한 순간",
    date: "2025.01.15",
    category: "Insight",
    content: `템플릿 기반 웹사이트 빌더는 빠르고 간편합니다. 하지만 브랜드가 성장하면서, 템플릿의 한계는 반드시 드러납니다.

동일한 레이아웃, 제한된 커스터마이징, 느린 로딩 속도. 이러한 문제들은 단순히 "불편함"이 아닙니다. 브랜드의 신뢰도를 깎고, 잠재 고객의 이탈을 만듭니다.

커스텀 웹사이트는 단순히 "예쁜 사이트"가 아닙니다. 브랜드의 본질을 디지털 위에 정확히 옮기는 작업입니다. 로딩 속도, SEO, 사용자 경험까지 — 모든 것이 브랜드를 위해 설계됩니다.

치로는 이러한 설계를 투명하게 진행합니다. 상담과 동시에 사이트가 만들어지는 과정을 직접 확인하실 수 있습니다.`,
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {
    // Fall through
  }
  return null;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const dbPost = await fetchPost(slug);
  const fallback = fallbackPosts[slug];

  if (!dbPost && !fallback) {
    return (
      <section className="pt-32 pb-32 px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-2xl font-light">게시글을 찾을 수 없습니다.</h1>
          <Link href="/blog" className="mt-4 inline-block text-sm text-[#6b6b6b] border-b border-[#1a1a1a] pb-[2px]">
            블로그로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const title = dbPost?.title || fallback?.title;
  const category = dbPost?.category || fallback?.category;
  const date = dbPost
    ? new Date(dbPost.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    : fallback?.date;
  const contentHtml = dbPost?.content || fallback?.content || "";

  return (
    <section className="pt-32 pb-32 px-8">
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label={category || "Blog"} />

        <div className="max-w-2xl">
          <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] mb-6">
            {date}
          </p>
          <h1 className="text-3xl md:text-[40px] font-light tracking-tight leading-[1.2] mb-12">
            {title}
          </h1>
        </div>

        <Divider />

        <div className="mt-16 max-w-2xl">
          <BlogContent html={contentHtml} />
        </div>

        <div className="mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] border-b border-[#1a1a1a] pb-[2px] hover:border-transparent transition-colors duration-300"
          >
            &larr; 블로그로 돌아가기
          </Link>
        </div>
      </div>
    </section>
  );
}

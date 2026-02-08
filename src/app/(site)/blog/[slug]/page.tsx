import type { Metadata } from "next";
import Link from "next/link";
import Divider from "@/components/ui/divider";
import SectionLabel from "@/components/ui/section-label";
import BlogContent from "@/components/blog-content";
import { sql } from "@/lib/db";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchPost(slug: string) {
  try {
    const decoded = decodeURIComponent(slug);
    const result = await sql`
      SELECT * FROM blog_posts
      WHERE slug = ${decoded} AND published = true
    `;
    if (result.rows.length > 0) return result.rows[0];
  } catch {
    // Fall through
  }
  return null;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await fetchPost(slug);
  const title = dbPost?.title || "블로그";
  const excerpt = dbPost?.excerpt || "치로웹디자인 블로그";

  return {
    title,
    description: excerpt,
    openGraph: {
      title: `${title} | 치로웹디자인`,
      description: excerpt,
      url: `https://chiroweb.co.kr/blog/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://chiroweb.co.kr/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const dbPost = await fetchPost(slug);

  if (!dbPost) {
    return (
      <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-2xl font-light">게시글을 찾을 수 없습니다.</h1>
          <Link href="/blog" className="mt-4 inline-block text-sm text-[#6b6b6b] border-b border-[#1a1a1a] pb-[2px]">
            블로그로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  const title = dbPost.title;
  const category = dbPost.category;
  const date = new Date(dbPost.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
  const contentHtml = dbPost.content || "";
  const dateISO = new Date(dbPost.created_at).toISOString();
  const excerpt = dbPost.excerpt || "";

  const blogPostJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: dateISO,
    dateModified: dbPost?.updated_at ? new Date(dbPost.updated_at).toISOString() : dateISO,
    author: {
      "@type": "Organization",
      name: "치로웹디자인",
      url: "https://chiroweb.co.kr",
    },
    publisher: {
      "@type": "Organization",
      name: "치로웹디자인",
      url: "https://chiroweb.co.kr",
    },
    mainEntityOfPage: `https://chiroweb.co.kr/blog/${slug}`,
  };

  return (
    <section className="pt-24 md:pt-32 pb-24 md:pb-32 px-5 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto">
        <SectionLabel number="01" label={category || "Blog"} />

        <div className="max-w-2xl">
          <p className="text-xs tracking-wider text-[#9b9b9b] font-[family-name:var(--font-jetbrains-mono)] mb-6">
            {date}
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[28px] md:text-[44px] font-light tracking-[0.03em] leading-[1.05] mb-12">
            {title}
          </h1>
        </div>

        <Divider />

        <div className="mt-10 md:mt-16 max-w-2xl">
          <BlogContent html={contentHtml} />
        </div>

        <div className="mt-10 md:mt-16">
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

"use client";

import DOMPurify from "dompurify";

interface BlogContentProps {
  html: string;
}

export default function BlogContent({ html }: BlogContentProps) {
  const isHtml = html.includes("<");

  if (isHtml) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ["p", "h2", "h3", "h4", "strong", "em", "a", "ul", "ol", "li", "blockquote", "img", "br", "hr", "code", "pre", "s"],
      ALLOWED_ATTR: ["href", "src", "alt", "class", "target", "rel"],
    });

    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    );
  }

  return (
    <>
      {html.split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-base text-[#6b6b6b] leading-[1.8] mb-6">
          {paragraph}
        </p>
      ))}
    </>
  );
}

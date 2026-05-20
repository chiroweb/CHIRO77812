import { ImageResponse } from "next/og";
import { getMdxPost } from "@/lib/mdx";

export const alt = "치로웹디자인 블로그";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRETENDARD_BOLD =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.subset.otf";
const PRETENDARD_MEDIUM =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.subset.otf";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getMdxPost(slug);

  const title = post?.frontmatter.title ?? "치로웹디자인 블로그";
  const category = post?.frontmatter.category ?? "Blog";
  const author = post?.frontmatter.author ?? "최정원";

  const displayTitle = truncate(title, 56);

  const [boldFont, mediumFont] = await Promise.all([
    fetch(new URL(PRETENDARD_BOLD)).then((r) => r.arrayBuffer()),
    fetch(new URL(PRETENDARD_MEDIUM)).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1a1a",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            backgroundColor: "#FF4D00",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#FF4D00",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontFamily: "Pretendard",
              fontWeight: 500,
              color: "#9b9b9b",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {category} · CHIRO BLOG
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1040px",
          }}
        >
          <span
            style={{
              fontSize: "62px",
              fontFamily: "Pretendard",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              wordBreak: "keep-all",
            }}
          >
            {displayTitle}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "30px",
              fontFamily: "Pretendard",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            CHIRO<span style={{ color: "#FF4D00" }}>.</span>
          </span>
          <span
            style={{
              fontSize: "18px",
              fontFamily: "Pretendard",
              fontWeight: 500,
              color: "#6b6b6b",
            }}
          >
            by {author} · chiroweb.co.kr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: boldFont, style: "normal", weight: 700 },
        { name: "Pretendard", data: mediumFont, style: "normal", weight: 500 },
      ],
    },
  );
}

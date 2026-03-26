import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "웹사이트 제작 비용 하나로 마케팅까지 끝내는 솔루션 CHIRO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const pretendardBold = fetch(
    new URL(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.subset.otf"
    )
  ).then((res) => res.arrayBuffer());

  const pretendardMedium = fetch(
    new URL(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Medium.subset.otf"
    )
  ).then((res) => res.arrayBuffer());

  const [boldFont, mediumFont] = await Promise.all([
    pretendardBold,
    pretendardMedium,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#1a1a1a",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Accent bar */}
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

        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
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
              fontSize: "16px",
              fontFamily: "Pretendard",
              fontWeight: 500,
              color: "#999",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            CHIRO WEB DESIGN STUDIO
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              fontSize: "52px",
              fontFamily: "Pretendard",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.25,
            }}
          >
            웹사이트 제작 비용 하나로
          </span>
          <span
            style={{
              fontSize: "52px",
              fontFamily: "Pretendard",
              fontWeight: 700,
              color: "#FF4D00",
              lineHeight: 1.25,
            }}
          >
            마케팅까지 끝내는 솔루션
          </span>
        </div>

        {/* Sub copy */}
        <span
          style={{
            fontSize: "22px",
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#aaa",
            lineHeight: 1.6,
            maxWidth: "800px",
          }}
        >
          호주 유학생 출신 기획자의 글로벌 마케팅 세팅
          <br />
          타사 대비 30% 저렴한 풀패키지
        </span>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontFamily: "Pretendard",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            CHIRO<span style={{ color: "#FF4D00" }}>.</span>
          </span>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "Pretendard",
              fontWeight: 500,
              color: "#666",
            }}
          >
            chiroweb.co.kr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pretendard",
          data: boldFont,
          style: "normal",
          weight: 700,
        },
        {
          name: "Pretendard",
          data: mediumFont,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}

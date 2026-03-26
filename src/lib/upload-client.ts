"use client";

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/chiro/upload", {
    method: "POST",
    body: formData,
  });

  let payload: { url?: string; error?: string } | null = null;

  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok || !payload?.url) {
    throw new Error(payload?.error || "이미지 업로드에 실패했습니다.");
  }

  return payload.url;
}

import { SITE_URL } from "./constants";

export const INDEXNOW_KEY = "bc5e00c7a1afc6dd6ac1169d166d6250";
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

export interface IndexNowResult {
  ok: boolean;
  status: number;
  count: number;
  error?: string;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const cleaned = Array.from(new Set(urls.filter((u) => u && u.startsWith(SITE_URL))));
  if (cleaned.length === 0) {
    return { ok: false, status: 400, count: 0, error: "No valid URLs" };
  }

  const host = new URL(SITE_URL).host;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: cleaned,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, count: cleaned.length };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, status: 0, count: cleaned.length, error: message };
  }
}

export function pingIndexNowFireAndForget(urls: string[]): void {
  submitToIndexNow(urls).catch((err) => {
    console.warn("[indexnow] background ping failed:", err);
  });
}

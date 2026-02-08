import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await createToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

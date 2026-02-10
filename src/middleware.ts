import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

async function verifyAuth(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API
  if (pathname === "/chiro/login" || pathname === "/api/chiro/login") {
    return NextResponse.next();
  }

  // Protect /chiro/* and /api/chiro/*
  if (pathname.startsWith("/chiro") || pathname.startsWith("/api/chiro")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token || !(await verifyAuth(token))) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/chiro/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chiro/:path*", "/api/chiro/:path*"],
};

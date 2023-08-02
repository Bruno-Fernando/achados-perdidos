import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (
    path === "/" ||
    path === "/login" ||
    path.startsWith("/_next/static") ||
    path.startsWith("/_next / image") ||
    path.startsWith("favicon.ico") ||
    path.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

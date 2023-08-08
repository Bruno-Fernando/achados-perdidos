import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Rotas que são públicas
  if (
    path === "/" ||
    path === "/login" ||
    path.startsWith("/_next/static") ||
    path.startsWith("/_next/image") ||
    path.startsWith("favicon.ico") ||
    path.startsWith("/api/auth") ||
    path.startsWith("/logo")
  ) {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redireciona ao login se o usuário não estiver logado
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Caso esteja logado, mas não tenha validado a matricula,
  // redireciona para página de validação
  if (
    session &&
    !session.ufcgLoginValidated &&
    path !== "/validate" &&
    !path.startsWith("/api/validate")
  ) {
    return NextResponse.redirect(new URL("/validate", req.url));
  }

  // Caso já tenha validado o número de matricula, é redirecionado
  // para a home
  if (session && session.ufcgLoginValidated && path === "/validate") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

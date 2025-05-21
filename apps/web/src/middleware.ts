import { NextRequest, NextResponse } from "next/server";

import { clientSessionInit } from "@/utils/auth";
import { USER_JWT_COOKIE_NAME, verifyUserJWT } from "@/utils/cookies/jwt";

const PUBLIC_ROUTES = new Set([
  "/",
  "/api/auth/callback",
  "/api/auth/login",
  "/api/health",
  "/reset-password",
  "/update-password",
  "/api/v1/relax/getCashierToken",
  "/api/v1/relax/deposit",
  "/api/v1/relax/withdraw",
  "/api/v1/relax/rollback",
  "/api/v1/relax/getBalance",
  "/cookie-policy",
  "/privacy-policy",
  "/responsible-gaming",
  "/sweepstake-rules",
  "/terms-service",
]);

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.has(pathname);
}

function redirectTo(path: string, request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();

  url.pathname = path;
  url.search = "";

  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  clientSessionInit(request, response);

  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(USER_JWT_COOKIE_NAME)?.value || "";
  const verified = await verifyUserJWT(token);

  if (verified) {
    if (pathname === "/") {
      return redirectTo("/lobby", request);
    }
    if (pathname === "/reset-password") {
      return redirectTo("/lobby", request);
    }
  }

  if (!verified) {
    if (!isPublicRoute(pathname)) {
      return redirectTo("/", request);
    }

    if (pathname === "/update-password") {
      const code = request.nextUrl.searchParams.get("code");

      if (!code) return redirectTo("/", request);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|_next/static|_next/image|__nextjs_original-stack-frame|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|sitemap|image|favicon.ico|logo.png|robots.txt)).*)",
  ],
};

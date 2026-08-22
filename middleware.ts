import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("__Secure-authjs.session-token")?.value ||
    request.cookies.get("authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;
  const isLoginPage = pathname.startsWith("/login");

  // Rute terproteksi yang wajib login
  const protectedRoutes = ["/cv-builder", "/overview", "/career-profile", "/ai-insight"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // 1. Jika sudah login dan membuka /login -> redirect ke /cv-builder
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/cv-builder", request.url));
  }

  // 2. Jika belum login dan mencoba akses rute privat -> redirect ke /login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Rute publik seperti "/" (Landing page) akan selalu lolos tanpa redirect
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true, // Tambahkan baris ini
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthRoute =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/api/auth");
      const isPublicRoute = nextUrl.pathname === "/" || isAuthRoute;

      if (!isLoggedIn && !isPublicRoute) {
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
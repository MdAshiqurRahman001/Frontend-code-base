import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that are publicly accessible without authentication
const PUBLIC_ROUTES = [
  "/",
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-otp",
  "/auth/google/callback",
  "/auth/facebook/callback",
];

// Routes that require ADMIN role
const ADMIN_ROUTES = ["/dashboard/admin"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, API routes, Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Read the persisted Redux state from localStorage via cookie
  // The redux-persist key is "root" and we persist the "auth" slice
  // Token is stored in localStorage by redux-persist (not httpOnly cookie)
  // We use a custom "auth-token" cookie set on login for middleware access
  const token = request.cookies.get("auth-token")?.value;

  // // Not authenticated and trying to access a protected route
  // if (!token && !isPublicRoute) {
  //   const loginUrl = new URL("/auth/signin", request.url);
  //   loginUrl.searchParams.set("redirect", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Authenticated users trying to access auth pages → redirect to dashboard
  // if (token && pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // // Admin route protection — check role from token payload
  // if (token && ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
  //   try {
  //     // Decode JWT payload (not verify — verification happens on the server)
  //     const payload = JSON.parse(
  //       Buffer.from(token.split(".")[1], "base64").toString()
  //     );
  //     if (payload.role !== "ADMIN") {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     }
  //   } catch {
  //     return NextResponse.redirect(new URL("/auth/signin", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

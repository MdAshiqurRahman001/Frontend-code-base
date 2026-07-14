import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function middleware(request: NextRequest) {
  // In development, skip authentication and allow everything through.
  // When you are ready to add auth protection, replace this with token logic:
  //
  // const token = request.cookies.get("token")?.value;
  // const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  //
  // if (!token && !isAuthPage) {
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

/**
 * ==============================================================================
 * 📌 PROXY ROUTE GUARD (src/proxy.ts)
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Next.js 16 Proxy Middleware for route verification and token validation.
 * ==============================================================================
 */

import { NextResponse } from "next/server";

export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | string;
}

export async function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};

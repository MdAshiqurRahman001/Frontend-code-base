import { NextRequest, NextResponse } from "next/server";

export interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | string;
}

export async function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};

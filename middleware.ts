import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { protectedRoutes, authRoutes } from "./app/config";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  // if (!accessToken && !request.nextUrl.pathname.startsWith('/auth')) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  if (protectedRoutes.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
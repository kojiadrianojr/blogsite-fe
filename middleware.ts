import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { protectedRoutes, authRoutes } from "./app/config";
import { isValidToken } from "./app/lib/verifyToken";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken")
  const isAccessTokenValid = isValidToken(accessToken?.value);
  const isRefreshTokenValid = isValidToken(refreshToken?.value);
  
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isProtected && (isAccessTokenValid === false && isRefreshTokenValid == false)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (authRoutes.includes(request.nextUrl.pathname) && (isAccessTokenValid === true || isRefreshTokenValid === true)) {
  //   if (protectedRoutes.includes(request.nextUrl.pathname)) {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/update/:path*","/((?!api|_next/static|_next/image|.*\\.png$).*)", ],
};
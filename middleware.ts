import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Get session token from cookies
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value

  // Allow public routes
  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return NextResponse.next()
  }

  // Check if user is authenticated for protected routes
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // For role-based access, we'll handle this in the actual pages
  // since we can't easily decode the JWT token in middleware without NextAuth helpers

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/messages/:path*", "/api/protected/:path*"],
}

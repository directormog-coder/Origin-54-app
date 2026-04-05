import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED = ["/admin", "/orders", "/account", "/checkout"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED.some(path => pathname.startsWith(path))
  const token = request.cookies.get("auth-token")?.value

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/orders/:path*",
    "/account/:path*",
    "/checkout/:path*",
  ],
}


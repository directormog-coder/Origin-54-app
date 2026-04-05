import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The function MUST be named 'proxy' or be the default export
export default function proxy(request: NextRequest) {
  // Add any logic here (like redirecting unauthorized users)
  return NextResponse.next();
}

// Optional: Limit the proxy to specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

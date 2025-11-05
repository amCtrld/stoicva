import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login page, API routes, and static assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/goldLogo.png' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  // Check for site access cookie
  const siteAccessCookie = request.cookies.get('site_access')
  
  if (!siteAccessCookie) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Verify cookie value against environment variable
  const expectedPassword = process.env.SITE_ACCESS_PASSWORD
  
  if (!expectedPassword || siteAccessCookie.value !== expectedPassword) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

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
}
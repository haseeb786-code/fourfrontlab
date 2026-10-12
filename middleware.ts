import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'four-front-lab-super-secure-production-jwt-key-2026-xyz-987'
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING)
const COOKIE_NAME = 'ffl_admin_session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only handle /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  let isAuthenticated = false

  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET)
      isAuthenticated = true
    } catch {
      isAuthenticated = false
    }
  }

  // If visiting /admin/login while already authenticated, redirect to /admin
  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // Any other /admin route requires active authentication
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

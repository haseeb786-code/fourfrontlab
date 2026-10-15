import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL SECURITY ERROR: JWT_SECRET environment variable is missing in production environment.')
    }
    return new TextEncoder().encode('ffl_dev_only_local_fallback_secret_not_for_prod_2026')
  }
  return new TextEncoder().encode(secret)
}

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
      await jwtVerify(token, getJwtSecret())
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

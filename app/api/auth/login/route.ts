import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, signSession, getSessionCookieOptions } from '@/lib/auth'

// In-memory rate limiter for login attempts (IP / email based)
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()
    const attemptRecord = failedAttempts.get(ip)

    if (attemptRecord && attemptRecord.count >= MAX_ATTEMPTS) {
      if (now - attemptRecord.lastAttempt < LOCKOUT_WINDOW_MS) {
        return NextResponse.json(
          { error: 'Too many failed login attempts. Please wait 15 minutes.' },
          { status: 429 }
        )
      } else {
        failedAttempts.delete(ip)
      }
    }

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    let user = null

    try {
      user = await prisma.adminUser.findUnique({
        where: { email: cleanEmail },
      })
    } catch (e) {
      // Prisma error fallback
    }

    if (!user) {
      await new Promise((r) => setTimeout(r, 600))
      const current = failedAttempts.get(ip) || { count: 0, lastAttempt: now }
      failedAttempts.set(ip, { count: current.count + 1, lastAttempt: now })

      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      await new Promise((r) => setTimeout(r, 600))
      const current = failedAttempts.get(ip) || { count: 0, lastAttempt: now }
      failedAttempts.set(ip, { count: current.count + 1, lastAttempt: now })

      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      )
    }

    // Reset failed attempts on success
    failedAttempts.delete(ip)

    const token = await signSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    const cookieOpts = getSessionCookieOptions()
    res.cookies.set(cookieOpts.name, token, cookieOpts)
    return res
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error during authentication' },
      { status: 500 }
    )
  }
}

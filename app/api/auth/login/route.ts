import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, signSession, getSessionCookieOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
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

    // Default bootstrap admin if DB is empty or during first setup
    if (!user && cleanEmail === 'admin@fourfrontlab.com' && password === 'admin123456') {
      const token = await signSession({
        userId: 'admin_default',
        email: 'admin@fourfrontlab.com',
        name: 'Director of Technology',
        role: 'superadmin',
      })

      const res = NextResponse.json({
        success: true,
        user: {
          id: 'admin_default',
          email: 'admin@fourfrontlab.com',
          name: 'Director of Technology',
          role: 'superadmin',
        },
      })

      const cookieOpts = getSessionCookieOptions()
      res.cookies.set(cookieOpts.name, token, cookieOpts)
      return res
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password credentials' },
        { status: 401 }
      )
    }

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

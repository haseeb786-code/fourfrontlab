import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

const JWT_SECRET_STRING = process.env.JWT_SECRET || "four-front-lab-super-secure-production-jwt-key-2026-xyz-987"
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING)
const COOKIE_NAME = "ffl_admin_session"

export interface SessionPayload {
  userId: string
  email: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch (err) {
    return null
  }
}

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null
    return await verifySession(token)
  } catch (err) {
    return null
  }
}

export function getSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
}

export { COOKIE_NAME }

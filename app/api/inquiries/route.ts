import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { sendLeadNotification } from '@/lib/email'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory rate limiting map for inquiry submissions (max 5 per 10 mins per IP)
const inquirySubmissions = new Map<string, number[]>()
const MAX_INQUIRIES_PER_WINDOW = 5
const INQUIRY_WINDOW_MS = 10 * 60 * 1000

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()

    // Rate limiting check
    const timestamps = inquirySubmissions.get(ip) || []
    const recent = timestamps.filter((t) => now - t < INQUIRY_WINDOW_MS)
    if (recent.length >= MAX_INQUIRIES_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.' },
        { status: 429 }
      )
    }

    const body = await req.json()

    // Honeypot bot protection: silent rejection if hidden field is filled
    if (body.hp_website || body.bot_check || body.website_url) {
      return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 201 })
    }

    recent.push(now)
    inquirySubmissions.set(ip, recent)

    const { name, email, phone, company, service, budget, timeline, message } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is a required field' },
        { status: 400 }
      )
    }

    const cleanName = name.trim()
    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is a required field' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 150) {
      return NextResponse.json(
        { error: 'Please enter a valid work email address' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Project description message is a required field' },
        { status: 400 }
      )
    }

    const cleanMessage = message.trim()
    if (cleanMessage.length < 5 || cleanMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 5 and 5,000 characters' },
        { status: 400 }
      )
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        phone: typeof phone === 'string' ? phone.trim().slice(0, 50) : '',
        company: typeof company === 'string' ? company.trim().slice(0, 100) : '',
        service: typeof service === 'string' && service ? service.trim().slice(0, 100) : 'General Consultation',
        budget: typeof budget === 'string' && budget ? budget.trim().slice(0, 50) : 'Undisclosed',
        timeline: typeof timeline === 'string' && timeline ? timeline.trim().slice(0, 50) : 'Flexible',
        message: cleanMessage,
        status: 'new',
        priority: budget && String(budget).includes('50,000') ? 'urgent' : 'normal',
      },
    })

    // Dispatch background notification without blocking the response
    sendLeadNotification({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      service: inquiry.service,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
      message: inquiry.message,
    }).catch((err) => console.error('[Notification dispatch error]:', err))

    return NextResponse.json({ success: true, inquiry }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const where: any = {}
    if (status && status !== 'all') {
      where.status = status
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(inquiries)
  } catch (error: any) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

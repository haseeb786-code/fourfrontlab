import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
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

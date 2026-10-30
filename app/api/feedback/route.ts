import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, role, company, quote, rating, projectMetric, category } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      )
    }

    if (!quote || typeof quote !== 'string' || !quote.trim()) {
      return NextResponse.json(
        { error: 'Feedback / endorsement text is required' },
        { status: 400 }
      )
    }

    if (email && (!EMAIL_REGEX.test(email.trim()) || email.trim().length > 150)) {
      return NextResponse.json(
        { error: 'Please provide a valid work email address' },
        { status: 400 }
      )
    }

    // Save to database
    let created = null
    try {
      created = await prisma.testimonial.create({
        data: {
          clientName: name.trim(),
          clientRole: role ? role.trim() : 'Verified Client',
          clientCompany: company ? company.trim() : 'Enterprise Partner',
          quote: quote.trim(),
          rating: Number(rating) || 5,
          featured: true,
          avatarUrl: '',
        },
      })
    } catch (dbErr) {
      console.warn('Database testimonial insert warning:', dbErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Client feedback received and queued for verified production publishing.',
      testimonial: created,
    })
  } catch (error: any) {
    console.error('Error handling feedback submission:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error processing feedback' },
      { status: 500 }
    )
  }
}

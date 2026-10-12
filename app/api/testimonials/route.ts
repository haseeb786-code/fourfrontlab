import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(testimonials)
  } catch (error: any) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { clientName, clientRole, clientCompany, avatarUrl, quote, rating, featured } = body

    if (!clientName || !quote) {
      return NextResponse.json(
        { error: 'Client name and quote are required' },
        { status: 400 }
      )
    }

    const item = await prisma.testimonial.create({
      data: {
        clientName: clientName.trim(),
        clientRole: clientRole ? clientRole.trim() : 'Executive',
        clientCompany: clientCompany ? clientCompany.trim() : 'Enterprise Partner',
        avatarUrl: avatarUrl || '',
        quote: quote.trim(),
        rating: Number(rating) || 5,
        featured: featured !== undefined ? Boolean(featured) : true,
      },
    })

    return NextResponse.json({ success: true, testimonial: item }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, clientName, clientRole, clientCompany, avatarUrl, quote, rating, featured } = body

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(clientName && { clientName: clientName.trim() }),
        ...(clientRole && { clientRole: clientRole.trim() }),
        ...(clientCompany && { clientCompany: clientCompany.trim() }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(quote && { quote: quote.trim() }),
        ...(rating !== undefined && { rating: Number(rating) }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
      },
    })

    return NextResponse.json({ success: true, testimonial: updated })
  } catch (error: any) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update testimonial' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}

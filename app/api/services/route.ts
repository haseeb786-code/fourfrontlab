import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (error: any) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch services' },
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
    const { id, title, shortDesc, fullDesc, icon, deliverables, benefits, techStack, faqs, order } = body

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (shortDesc !== undefined) updateData.shortDesc = shortDesc
    if (fullDesc !== undefined) updateData.fullDesc = fullDesc
    if (icon !== undefined) updateData.icon = icon
    if (deliverables !== undefined) {
      updateData.deliverables = typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables)
    }
    if (benefits !== undefined) {
      updateData.benefits = typeof benefits === 'string' ? benefits : JSON.stringify(benefits)
    }
    if (techStack !== undefined) {
      updateData.techStack = typeof techStack === 'string' ? techStack : JSON.stringify(techStack)
    }
    if (faqs !== undefined) {
      updateData.faqs = typeof faqs === 'string' ? faqs : JSON.stringify(faqs)
    }
    if (order !== undefined) updateData.order = Number(order)

    const updated = await prisma.service.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, service: updated })
  } catch (error: any) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update service' },
      { status: 500 }
    )
  }
}

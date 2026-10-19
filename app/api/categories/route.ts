import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch categories' },
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
    const { name, slug, description } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    const cleanName = name.trim()
    const cleanSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const existing = await prisma.category.findUnique({
      where: { slug: cleanSlug },
    })

    if (existing) {
      return NextResponse.json(
        { error: `Category with slug "${cleanSlug}" already exists` },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name: cleanName,
        slug: cleanSlug,
        description: description ? description.trim() : '',
      },
    })

    return NextResponse.json({ success: true, category }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create category' },
      { status: 500 }
    )
  }
}

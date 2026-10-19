import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const includeDrafts = searchParams.get('all') === 'true'

    const where: any = {}
    if (!includeDrafts) {
      where.published = true
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(projects)
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
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
    const {
      title,
      slug,
      client,
      industry,
      overview,
      problem,
      solution,
      techStack,
      results,
      coverImage,
      gallery,
      liveUrl,
      videoUrl,
      featured,
      published,
      order,
      categoryId,
    } = body

    if (!title || !client || !overview) {
      return NextResponse.json(
        { error: 'Title, client, and overview are required' },
        { status: 400 }
      )
    }

    // Auto-generate slug if missing
    let generatedSlug = slug
      ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Check collision
    const existing = await prisma.project.findUnique({
      where: { slug: generatedSlug },
    })
    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now()}`
    }

    // Resolve or find default category
    let finalCatId = categoryId
    if (!finalCatId) {
      const defaultCat = await prisma.category.findFirst()
      finalCatId = defaultCat?.id
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: generatedSlug,
        client: client.trim(),
        industry: industry ? industry.trim() : 'Digital Transformation',
        overview: overview.trim(),
        problem: problem ? problem.trim() : '',
        solution: solution ? solution.trim() : '',
        techStack: typeof techStack === 'string' ? techStack : JSON.stringify(techStack || []),
        results: typeof results === 'string' ? results : JSON.stringify(results || {}),
        coverImage: coverImage || '/images/portfolio-default.jpg',
        gallery: typeof gallery === 'string' ? gallery : JSON.stringify(gallery || []),
        liveUrl: liveUrl ? liveUrl.trim() : '',
        videoUrl: videoUrl ? videoUrl.trim() : '',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
        order: order !== undefined ? Number(order) : 0,
        categoryId: finalCatId,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    )
  }
}

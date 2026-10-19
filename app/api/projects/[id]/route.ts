import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
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
      categoryId,
      order,
    } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (slug !== undefined) updateData.slug = slug
    if (client !== undefined) updateData.client = client
    if (industry !== undefined) updateData.industry = industry
    if (overview !== undefined) updateData.overview = overview
    if (problem !== undefined) updateData.problem = problem
    if (solution !== undefined) updateData.solution = solution
    if (techStack !== undefined) {
      updateData.techStack = typeof techStack === 'string' ? techStack : JSON.stringify(techStack)
    }
    if (results !== undefined) {
      updateData.results = typeof results === 'string' ? results : JSON.stringify(results)
    }
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (gallery !== undefined) {
      updateData.gallery = typeof gallery === 'string' ? gallery : JSON.stringify(gallery)
    }
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl
    if (featured !== undefined) updateData.featured = Boolean(featured)
    if (published !== undefined) updateData.published = Boolean(published)
    if (categoryId !== undefined) updateData.categoryId = categoryId
    if (order !== undefined) updateData.order = Number(order)

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
      include: { category: true },
    })

    return NextResponse.json({ success: true, project: updated })
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete project' },
      { status: 500 }
    )
  }
}

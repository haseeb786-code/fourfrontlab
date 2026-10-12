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
    const { name, slug, description } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name.trim()
    if (slug !== undefined) {
      updateData.slug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    if (description !== undefined) updateData.description = description.trim()

    const updated = await prisma.category.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, category: updated })
  } catch (error: any) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
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
    const projectCount = await prisma.project.count({
      where: { categoryId: id },
    })

    if (projectCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category because ${projectCount} project(s) are assigned to it. Reassign them first.` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete category' },
      { status: 500 }
    )
  }
}

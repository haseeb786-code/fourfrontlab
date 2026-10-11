import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error: any) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, coverImage, category, author, readTime, featured, published } = body

    const updated = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(coverImage && { coverImage }),
        ...(category && { category }),
        ...(author && { author }),
        ...(readTime && { readTime }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(published !== undefined && { published: Boolean(published) }),
      },
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.blogPost.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete post' }, { status: 500 })
  }
}

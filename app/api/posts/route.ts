import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'
    const category = searchParams.get('category')

    const where: any = {}
    if (!all) {
      where.published = true
    }
    if (category && category !== 'all') {
      where.category = category
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(posts)
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, coverImage, category, author, readTime, featured, published } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const autoSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: autoSlug,
        excerpt: excerpt || title,
        content,
        coverImage: coverImage || '/logo.jpeg',
        category: category || 'Engineering',
        author: author || 'Four Front Lab',
        readTime: readTime || '5 min read',
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
      },
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 })
  }
}

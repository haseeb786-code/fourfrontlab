import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.com'

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/services/website-development',
    '/services/business-automation',
    '/services/ai-solutions',
    '/services/digital-marketing',
    '/services/custom-software',
    '/portfolio',
    '/insights',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.9 : 0.8,
  }))

  let projectRoutes: MetadataRoute.Sitemap = []
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    postRoutes = posts.map((p) => ({
      url: `${baseUrl}/insights/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (e) {}

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}

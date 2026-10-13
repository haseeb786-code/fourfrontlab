import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'

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

  const defaultProjectSlugs = [
    'hanaz-luxury-skincare',
    'nexus-enterprise-os',
    'roamease-booking',
    'edutrack-learning-hub',
  ]

  const defaultPostSlugs = [
    'why-pakistani-startups-need-custom-web-apps-2025',
    'how-business-automation-saves-1000-hours-per-year',
    'nextjs-vs-wordpress-whats-better-for-business',
  ]

  let projectRoutes: MetadataRoute.Sitemap = defaultProjectSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let postRoutes: MetadataRoute.Sitemap = defaultPostSlugs.map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    if (projects.length > 0) {
      const dbSlugs = new Set(projects.map((p) => p.slug))
      projectRoutes = [
        ...projectRoutes.filter((p) => !dbSlugs.has(p.url.split('/').pop() || '')),
        ...projects.map((p) => ({
          url: `${baseUrl}/portfolio/${p.slug}`,
          lastModified: p.updatedAt,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })),
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    if (posts.length > 0) {
      const dbSlugs = new Set(posts.map((p) => p.slug))
      postRoutes = [
        ...postRoutes.filter((p) => !dbSlugs.has(p.url.split('/').pop() || '')),
        ...posts.map((p) => ({
          url: `${baseUrl}/insights/${p.slug}`,
          lastModified: p.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })),
      ]
    }
  } catch (e) {}

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}

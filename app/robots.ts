import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/auth', '/api/inquiries'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

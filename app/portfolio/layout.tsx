import type { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | Next.js Agency Islamabad',
  description:
    'Inspect production case studies by Four Front Lab, a leading web development agency in Pakistan delivering high-converting web apps.',
  alternates: {
    canonical: 'https://fourfrontlab.tech/portfolio',
  },
  openGraph: {
    title: 'Portfolio & Case Studies | Next.js Agency Islamabad',
    description:
      'Inspect production case studies by Four Front Lab, a leading web development agency in Pakistan delivering high-converting web apps.',
    url: 'https://fourfrontlab.tech/portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Four Front Lab Portfolio' }],
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
        ]}
      />
      {children}
    </>
  )
}

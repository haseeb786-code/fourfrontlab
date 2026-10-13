import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import WhatsAppButton from '@/components/WhatsAppButton'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Four Front Lab | Next.js & AI Automation Agency Pakistan',
    template: '%s | Four Front Lab',
  },
  description:
    'Next.js web development agency in Islamabad, Pakistan. We build high-performance web apps, AI automation workflows, and custom digital software for startups.',
  keywords: [
    'web development agency Pakistan',
    'Next.js agency Islamabad',
    'AI automation agency for startups',
    'affordable web agency Pakistan',
    'Next.js 14 development',
    'custom software engineering Islamabad',
    'business automation Pakistan',
    'full-stack web development Pakistan',
  ],
  authors: [{ name: 'Four Front Lab', url: siteUrl }],
  creator: 'Four Front Lab',
  publisher: 'Four Front Lab',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Four Front Lab | Next.js & AI Automation Agency Pakistan',
    description:
      'Next.js web development agency in Islamabad, Pakistan. We build high-performance web apps, AI automation workflows, and custom digital software for startups.',
    url: siteUrl,
    siteName: 'Four Front Lab',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Four Front Lab - Next.js & AI Automation Agency Islamabad, Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Four Front Lab | Next.js & AI Automation Agency Pakistan',
    description:
      'Next.js web development agency in Islamabad engineering high-performance web apps, AI workflows, and digital platforms for startups.',
    creator: '@FourFrontLab',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-[#080808] text-[#f5f5f0] font-sans antialiased min-h-screen flex flex-col selection:bg-[#f5f5f0] selection:text-[#080808]">
        {/* Floating WhatsApp Hotline */}
        <WhatsAppButton phoneNumber="+923444741603" />
        {/* Editorial Inverting Difference Cursor */}
        <CustomCursor />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd'
import { ThemeProvider } from '@/components/ThemeProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal'],
  variable: '--font-serif',
  display: 'swap',
})

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
      suppressHydrationWarning
      className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable}`}
    >
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {/* Anti-flash: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var t = localStorage.getItem('ffl-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
            `.trim(),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[var(--dm-bg)] text-[var(--dm-text)] font-sans antialiased min-h-screen flex flex-col"
      >
        <ThemeProvider>
          {/* Floating WhatsApp Hotline */}
          <WhatsAppButton />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

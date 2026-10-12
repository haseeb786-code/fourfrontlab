import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'),
  title: 'Four Front Lab — Digital Products for Ambitious Companies',
  description:
    'A collective of four software engineering students crafting high-impact digital products, modern software systems, and bespoke web platforms.',
  keywords: [
    'Software Engineering',
    'Next.js 14',
    'Digital Products',
    'Custom Software',
    'Four Front Lab',
  ],
  authors: [{ name: 'Four Front Lab' }],
  openGraph: {
    title: 'Four Front Lab — Digital Products for Ambitious Companies',
    description:
      'We build digital products for ambitious companies. Fast, clean, minimal.',
    siteName: 'Four Front Lab',
    type: 'website',
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
      <body className="bg-[#080808] text-[#f5f5f0] font-sans antialiased min-h-screen flex flex-col selection:bg-[#f5f5f0] selection:text-[#080808]">
        {/* Editorial Inverting Difference Cursor */}
        <CustomCursor />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

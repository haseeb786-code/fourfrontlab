import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'),
  title: 'Four Front Lab | Elite Digital Agency & Kinetic Software Engineering',
  description:
    'Four Front Lab engineers high-performance web applications, Awwwards-caliber digital experiences, autonomous automation workflows, and high-impact AI systems.',
  keywords: [
    'Digital Agency',
    '3D Web Development',
    'Creative Development',
    'Next.js 14',
    'Awwwards',
    'Kinetic Brutalism',
    'Business Process Automation',
    'AI Solutions',
    'Custom Software',
  ],
  authors: [{ name: 'Four Front Lab' }],
  openGraph: {
    title: 'Four Front Lab | Elite Digital Agency & Kinetic Software Engineering',
    description:
      'Engineering next-generation digital experiences, intelligent automation, and scalable software.',
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
    <html lang="en" className={`dark scroll-smooth ${kanit.variable}`}>
      <body className="bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased min-h-screen flex flex-col selection:bg-[#B600A8] selection:text-white">
        <WhatsAppButton phoneNumber="+18004368736" />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fourfrontlab.tech'),
  title: 'Four Front Lab | Elite Digital Agency, 3D Web & AI Engineering',
  description:
    'Four Front Lab engineers high-performance web applications, 3D digital experiences, autonomous business automation workflows, and domain-specific AI solutions.',
  keywords: [
    'Digital Agency',
    '3D Web Development',
    'Three.js',
    'Next.js 14',
    'Business Process Automation',
    'AI Solutions',
    'RAG',
    'Enterprise Software',
  ],
  authors: [{ name: 'Four Front Lab' }],
  openGraph: {
    title: 'Four Front Lab | Elite Digital Agency & AI Engineering',
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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-brand-cyan selection:text-black">
        {/* Global floating WhatsApp channel */}
        <WhatsAppButton phoneNumber="+18004368736" />

        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

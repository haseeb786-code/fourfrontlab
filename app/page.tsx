import React from 'react'
import Navbar from '@/components/Navbar'
import HeroEditorial from '@/components/HeroEditorial'
import MarqueeEditorial from '@/components/MarqueeEditorial'
import ServicesEditorial from '@/components/ServicesEditorial'
import PortfolioEditorial from '@/components/PortfolioEditorial'
import TeamEditorial from '@/components/TeamEditorial'
import TestimonialsEditorial from '@/components/TestimonialsEditorial'
import ContactEditorial from '@/components/ContactEditorial'
import Footer from '@/components/Footer'

import type { Metadata } from 'next'
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Four Front Lab | Web Development & AI Automation Agency Pakistan',
  description:
    'Next.js development agency in Islamabad engineering custom web apps, AI automation workflows, and high-performance websites for startups.',
  alternates: {
    canonical: 'https://fourfrontlab.tech',
  },
  openGraph: {
    title: 'Four Front Lab | Web Development & AI Automation Agency Pakistan',
    description:
      'Next.js development agency in Islamabad engineering custom web apps, AI automation workflows, and high-performance websites for startups.',
    url: 'https://fourfrontlab.tech',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Four Front Lab' }],
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--dm-bg)] text-[var(--dm-text)] font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* Structural JSON-LD for Search Engines */}
      <ServiceJsonLd />
      <FaqJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }]} />
      {/* 01. Architectural Blueprint Navigation */}
      <Navbar />

      {/* 02. Architectural Blueprint Hero (High-Contrast Serif H1 + Olive Accent + 3D Isometric Tablet Showcase) */}
      <HeroEditorial />

      {/* 03. Smooth Monospace Tech Stack Marquee in Blueprint Tone */}
      <MarqueeEditorial />

      {/* 04. Sharp Bordered Services Cards (Acid Green Knife-Edge Hover) */}
      <ServicesEditorial />

      {/* 06. Real Photography Portfolio (Grayscale to Color on Hover) */}
      <PortfolioEditorial />

      {/* 06.5. Architectural Editorial Team (Staggered Grid & Custom Wireframe Art) */}
      <TeamEditorial />

      {/* 07. Executive Endorsements (Large Acid Green Quotes & Headshots) */}
      <TestimonialsEditorial />

      {/* 08. Omnichannel Contact & Direct Minimalist CTA */}
      <ContactEditorial />

      {/* 09. Massive Full-Bleed Editorial Typography Footer */}
      <Footer />
    </main>
  )
}

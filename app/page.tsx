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
import { prisma } from '@/lib/prisma'

export const revalidate = 60

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

export default async function HomePage() {
  let projects: any[] = []
  let testimonials: any[] = []
  let settingsMap: Record<string, string> = {}

  try {
    const [dbProjects, dbTestimonials, dbSettings] = await Promise.all([
      prisma.project.findMany({
        where: { published: true },
        include: { category: true },
        orderBy: { order: 'asc' },
        take: 6,
      }),
      prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.siteSetting.findMany({}),
    ])

    projects = dbProjects
    testimonials = dbTestimonials
    settingsMap = Object.fromEntries(dbSettings.map((s) => [s.key, s.value]))
  } catch (err) {
    console.error('Failed to query Prisma CMS models on homepage:', err)
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f0] font-sans antialiased overflow-x-hidden selection:bg-[#f5f5f0] selection:text-[#080808]">
      {/* Structural JSON-LD for Search Engines */}
      <ServiceJsonLd />
      <FaqJsonLd />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }]} />
      {/* 01. Flat Pure Black Navigation */}
      <Navbar />

      {/* 02. Cold, Minimalist Editorial Hero (Massive Serif H1 + Noise + Split Canvas) */}
      <HeroEditorial />

      {/* 03. Smooth Monospace Tech Stack Marquee */}
      <MarqueeEditorial />

      {/* 04. Sharp Bordered Services Cards (Acid Green Knife-Edge Hover) */}
      <ServicesEditorial />

      {/* 06. Real Photography Portfolio (Grayscale to Color on Hover) */}
      <PortfolioEditorial initialProjects={projects} />

      {/* 06.5. Architectural Editorial Team (Staggered Grid & Custom Wireframe Art) */}
      <TeamEditorial />

      {/* 07. Executive Endorsements (Large Acid Green Quotes & Headshots) */}
      <TestimonialsEditorial initialTestimonials={testimonials} />

      {/* 08. Omnichannel Contact & Direct Minimalist CTA */}
      <ContactEditorial settings={settingsMap} />

      {/* 09. Massive Full-Bleed Editorial Typography Footer */}
      <Footer settings={settingsMap} />
    </main>
  )
}

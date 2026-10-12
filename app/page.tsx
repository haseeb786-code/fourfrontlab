import React from 'react'
import Navbar from '@/components/Navbar'
import HeroEditorial from '@/components/HeroEditorial'
import MarqueeEditorial from '@/components/MarqueeEditorial'
import ManifestoEditorial from '@/components/ManifestoEditorial'
import ServicesEditorial from '@/components/ServicesEditorial'
import PortfolioEditorial from '@/components/PortfolioEditorial'
import TestimonialsEditorial from '@/components/TestimonialsEditorial'
import ContactEditorial from '@/components/ContactEditorial'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f0] font-sans antialiased overflow-x-hidden selection:bg-[#f5f5f0] selection:text-[#080808]">
      {/* 01. Flat Pure Black Navigation */}
      <Navbar />

      {/* 02. Cold, Minimalist Editorial Hero (Massive Serif H1 + Noise + Split Canvas) */}
      <HeroEditorial />

      {/* 03. Smooth Monospace Tech Stack Marquee */}
      <MarqueeEditorial />

      {/* 04. Founding Manifesto & 4 Pillars (The Four Fronts Collective) */}
      <ManifestoEditorial />

      {/* 05. Sharp Bordered Services Cards (Acid Green Knife-Edge Hover) */}
      <ServicesEditorial />

      {/* 06. Real Photography Portfolio (Grayscale to Color on Hover) */}
      <PortfolioEditorial />

      {/* 07. Executive Endorsements (Large Acid Green Quotes & Headshots) */}
      <TestimonialsEditorial />

      {/* 08. Omnichannel Contact & Direct Minimalist CTA */}
      <ContactEditorial />

      {/* 09. Massive Full-Bleed Editorial Typography Footer */}
      <Footer />
    </main>
  )
}

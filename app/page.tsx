import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import KineticHero from '@/components/KineticHero'
import DualScrollMarquee from '@/components/DualScrollMarquee'
import ScrollScrubReveal from '@/components/ScrollScrubReveal'
import InvertedServices from '@/components/InvertedServices'
import StackingProjectCards from '@/components/StackingProjectCards'
import TestimonialsSection from '@/components/TestimonialsSection'
import GlassContactSection from '@/components/GlassContactSection'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-sans antialiased overflow-x-hidden selection:bg-[#B600A8] selection:text-white">
      {/* 01. Kinetic Navigation */}
      <Navbar />

      {/* 02. Feature A: Magnetic Face / Subject Follower & 2.5D Metallic Hero */}
      <KineticHero />

      {/* 03. Feature B: Dual-Opposing Velocity Scroll Marquee */}
      <DualScrollMarquee />

      {/* 04. Feature C: Character-by-Character Scroll-Scrub Text Reveal */}
      <ScrollScrubReveal />

      {/* 05. Feature D: Inverted Crisp White Services Section */}
      <InvertedServices />

      {/* 06. Feature E: Stacking Sticky Project Cards */}
      <StackingProjectCards />

      {/* 07. Executive Endorsements & Trust */}
      <TestimonialsSection />

      {/* 08. Feature F: Glassmorphic Contact Section & Live Lead CRM */}
      <GlassContactSection />

      {/* 09. Brutalist Dark Footer */}
      <Footer />
    </main>
  )
}

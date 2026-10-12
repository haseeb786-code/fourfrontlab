'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'

const projects = [
  {
    index: 0,
    badge: '01 / E-COMMERCE ECOSYSTEM',
    title: 'Hanaz Luxury Skincare',
    slug: 'hanaz-luxury-skincare',
    category: 'E-Commerce / Direct-to-Consumer',
    description:
      'Engineered an ultra-fast headless storefront with custom dynamic bundles, sub-second product pages, and an automated inventory management bridge.',
    metrics: ['+240% Mobile Conversion Rate', '840ms Average Load Time', 'Zero Downtime Architecture'],
    image: '/projects/hanaz_main.webp',
    tech: ['Next.js 14', 'Tailwind CSS', 'Shopify Storefront API', 'Vercel Edge'],
  },
  {
    index: 1,
    badge: '02 / ENTERPRISE CLOUD PLATFORM',
    title: 'Nexus Operations OS',
    slug: 'nexus-enterprise-os',
    category: 'SaaS / ERP / Cloud Architecture',
    description:
      'A multi-tenant enterprise operating system unifying procurement, workforce scheduling, live asset telemetry, and real-time ledger accounting.',
    metrics: ['14,000+ Daily Active Users', '99.99% Uptime SLA', 'Sub-200ms API Response'],
    image: '/projects/nexus_main.jpg',
    tech: ['Next.js App Router', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Docker'],
  },
  {
    index: 2,
    badge: '03 / TRAVEL & DISCOVERY',
    title: 'RoamEase Kinetic Booking',
    slug: 'roamease-booking',
    category: 'Mobile & Web / Interactive Maps',
    description:
      'Curated experiential travel platform featuring interactive geospatial routing, offline itineraries, and frictionless one-tap payment processing.',
    metrics: ['+185% Repeat Booking Volume', '4.9/5 User Satisfaction', 'Global CDN Distribution'],
    image: '/projects/roamease_main.webp',
    tech: ['Next.js 14', 'Framer Motion', 'Stripe API', 'Mapbox GL'],
  },
  {
    index: 3,
    badge: '04 / EDTECH INFRASTRUCTURE',
    title: 'EduTrack Global Learning',
    slug: 'edutrack-learning-hub',
    category: 'EdTech / Web Platform',
    description:
      'Cloud-scale educational platform supporting live synchronous classrooms, adaptive AI assessment quizzes, and comprehensive student metrics.',
    metrics: ['50,000+ Enrolled Students', '42% Lower Server Costs', 'Zero Lag Streaming'],
    image: '/projects/edutrack_main.webp',
    tech: ['React 18', 'WebSockets', 'Tailwind CSS', 'Serverless Functions'],
  },
]

export default function StackingProjectCards() {
  const total = projects.length

  return (
    <section id="projects" className="relative w-full py-28 sm:py-36 bg-[#0C0C0C] px-4 sm:px-8 lg:px-16">
      {/* Atmosphere glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-b from-[#B600A8]/10 via-[#7621B0]/10 to-transparent blur-[140px]" />

      <div className="max-w-7xl mx-auto w-full mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
            [ Selected Case Studies • 04 ]
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            Proven Impact. <br />
            Stacking Precision.
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
          Scroll through our featured production builds. Each project demonstrates the fusion of kinetic aesthetic excellence with enterprise-grade stability.
        </p>
      </div>

      {/* Stacking Card Deck */}
      <div className="relative max-w-7xl mx-auto w-full pb-20">
        {projects.map((proj, idx) => {
          const topOffset = `calc(5rem + ${idx * 28}px)`
          const scaleFactor = 1 - (total - 1 - idx) * 0.025

          return (
            <div
              key={proj.slug}
              className="sticky mb-12 sm:mb-16 last:mb-0 transition-transform duration-300 will-change-transform"
              style={{
                top: topOffset,
                transform: `scale(${scaleFactor})`,
                transformOrigin: 'top center',
              }}
            >
              <div className="relative w-full rounded-[36px] sm:rounded-[50px] lg:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 lg:p-14 shadow-[0_-10px_40px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Internal card ambient lighting */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#B600A8]/15 to-transparent blur-2xl" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Information */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full z-10">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70">
                          {proj.badge}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                          {proj.category}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-[1.05]">
                        {proj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed mb-6 font-light">
                        {proj.description}
                      </p>

                      {/* Verified Metrics */}
                      <div className="space-y-2 mb-8">
                        {proj.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-2.5 text-xs text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/portfolio/${proj.slug}`}
                          className="btn-kinetic-cta inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full text-white text-xs font-semibold uppercase tracking-widest"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        <Link
                          href="/portfolio"
                          className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors"
                        >
                          View Full Archive →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High-Res Project Visual Showcase */}
                  <div className="lg:col-span-7 z-10">
                    <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D7E2EA]/20 bg-[#161616] group shadow-2xl">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white">
                        Production Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Layers } from 'lucide-react'

const rowOneProjects = [
  {
    title: 'Nexus Enterprise OS',
    tag: 'Next.js 14 / Cloud ERP',
    image: '/projects/nexus_main.jpg',
    color: '#00F2FE',
  },
  {
    title: 'Hanaz E-Commerce',
    tag: 'Luxury Retail / Shopify API',
    image: '/projects/hanaz_main.webp',
    color: '#B600A8',
  },
  {
    title: 'Aetheris AI Intelligence',
    tag: 'Autonomous AI / LLM Workflow',
    image: '/images/portfolio-aetheris.jpg',
    color: '#7621B0',
  },
  {
    title: 'EduTrack Global Portal',
    tag: 'EdTech LMS / Realtime Web',
    image: '/projects/edutrack_main.webp',
    color: '#BE4C00',
  },
]

const rowTwoProjects = [
  {
    title: 'RoamEase Booking Ecosystem',
    tag: 'Kinetic Travel / Mobile & Web',
    image: '/projects/roamease_main.webp',
    color: '#D7E2EA',
  },
  {
    title: 'OmniFlow Automation Hub',
    tag: 'Enterprise Workflow / Webhooks',
    image: '/images/portfolio-omniflow.jpg',
    color: '#00F2FE',
  },
  {
    title: 'PulseScale Analytics Engine',
    tag: 'Financial Data Visualization',
    image: '/images/portfolio-pulsescale.jpg',
    color: '#B600A8',
  },
  {
    title: 'Kura Robotics Interface',
    tag: 'Industrial IoT / 3D Telemetry',
    image: '/images/portfolio-kura.jpg',
    color: '#7621B0',
  },
]

export default function DualScrollMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Top strip moves right as you scroll down
  const xTop = useTransform(scrollYProgress, [0, 1], [-250, 250])
  // Bottom strip moves left as you scroll down
  const xBottom = useTransform(scrollYProgress, [0, 1], [250, -250])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden border-t border-b border-[#D7E2EA]/10 select-none"
    >
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#B600A8]/10 via-[#7621B0]/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/80 mb-3">
            <Layers className="w-3.5 h-3.5 text-[#D7E2EA]" />
            Dual-Opposing Velocity Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
            Kinetic Portfolio Stream
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
          High-performance production builds engineered with bespoke micro-interactions, sub-second load times, and custom software architecture.
        </p>
      </div>

      {/* Row 1: Moves Right */}
      <div className="relative w-full overflow-hidden mb-6 sm:mb-8">
        <motion.div style={{ x: xTop }} className="flex gap-6 whitespace-nowrap will-change-transform">
          {[...rowOneProjects, ...rowOneProjects, ...rowOneProjects].map((proj, idx) => (
            <div
              key={`row1-${idx}`}
              className="relative w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 pointer-events-none border border-[#D7E2EA]/20 bg-[#121212] group shadow-2xl"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span
                    className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                    style={{ backgroundColor: `${proj.color}25`, color: '#FFFFFF', border: `1px solid ${proj.color}40` }}
                  >
                    {proj.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{proj.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Moves Left */}
      <div className="relative w-full overflow-hidden">
        <motion.div style={{ x: xBottom }} className="flex gap-6 whitespace-nowrap will-change-transform">
          {[...rowTwoProjects, ...rowTwoProjects, ...rowTwoProjects].map((proj, idx) => (
            <div
              key={`row2-${idx}`}
              className="relative w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 pointer-events-none border border-[#D7E2EA]/20 bg-[#121212] group shadow-2xl"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-width: 768px) 340px, 420px"
                className="object-cover transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span
                    className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                    style={{ backgroundColor: `${proj.color}25`, color: '#FFFFFF', border: `1px solid ${proj.color}40` }}
                  >
                    {proj.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{proj.title}</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

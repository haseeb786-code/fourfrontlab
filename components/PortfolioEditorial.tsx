'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  num: string
  title: string
  slug: string
  client: string
  scope: string
  year: string
  image: string
  telemetry: string
  tags: string[]
}

const projects: Project[] = [
  {
    num: '01',
    title: 'Nexus Operations OS',
    slug: 'nexus-enterprise-os',
    client: 'Nexus Enterprise Solutions',
    scope: 'Cloud ERP & Live Asset Telemetry Architecture',
    year: '2026',
    image: '/projects/nexus_main.jpg',
    telemetry: '99.99% SLA // SUB-200MS',
    tags: ['Next.js 14', 'PostgreSQL', 'Docker', 'Prisma'],
  },
  {
    num: '02',
    title: 'RoamEase Kinetic Booking',
    slug: 'roamease-booking',
    client: 'RoamEase Experiences',
    scope: 'Interactive Geospatial Routing & Travel Platform',
    year: '2026',
    image: '/projects/roamease_main.webp',
    telemetry: '+185% BOOKINGS // MAPBOX GL',
    tags: ['Next.js 14', 'Framer Motion', 'Stripe API', 'Mapbox GL'],
  },
  {
    num: '03',
    title: 'Hanaz Luxury Skincare',
    slug: 'hanaz-luxury-skincare',
    client: 'Hanaz Atelier London',
    scope: 'Kinetic WebGL Storefront & Headless Checkout Engine',
    year: '2025',
    image: '/projects/hanaz_main.webp',
    telemetry: '840MS LCP // +240% CONV',
    tags: ['Next.js 14', 'Tailwind CSS', 'Shopify API', 'Edge CDN'],
  },
  {
    num: '04',
    title: 'EduTrack Global Learning',
    slug: 'edutrack-learning-hub',
    client: 'EduTrack International',
    scope: 'Cloud-Scale Synchronous Classroom & AI Platform',
    year: '2025',
    image: '/projects/edutrack_main.webp',
    telemetry: '50K ACTIVE // ZERO-LAG STREAM',
    tags: ['React 18', 'WebSockets', 'Serverless', 'PostgreSQL'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3D MAGNETIC PARALLAX CARD WITH SPOTLIGHT & LASER SCANLINE
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Cursor spotlight coordinates
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const springConfig = { damping: 22, stiffness: 140 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3.5, -3.5]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3.5, 3.5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)

    spotlightX.set(mouseX)
    spotlightY.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${spotlightX}px ${spotlightY}px, rgba(200, 245, 66, 0.12), transparent 75%)`

  return (
    <Link href={`/portfolio/${project.slug}`} className="block group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex flex-col justify-between border border-[#1f1f1f] bg-[#0d0e12] rounded-xl overflow-hidden group-hover:border-[#c8f542]/70 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-400 select-none cursor-pointer"
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20"
          style={{ background: spotlightBg }}
        />

        {/* ─── IMAGE SHOWCASE AREA ─── */}
        <div className="relative w-full h-[300px] sm:h-[380px] bg-[#080808] overflow-hidden">
          {/* Main Screenshot: Editorial Grayscale by default -> Vivid Color & Zoom on Hover */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top filter grayscale contrast-[1.15] brightness-[0.92] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.04]"
          />

          {/* Vignette Overlay for Seamless Dark Integration */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d0e12] via-transparent to-black/30" />

          {/* Laser Scanline Sweep on Card Hover */}
          <div className="absolute inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-[#c8f542]/25 to-transparent -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100" />

          {/* Top-Left Telemetry Tag with Live Beacon */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1f1f1f] bg-[#0c0d10]/90 backdrop-blur-md group-hover:border-[#c8f542]/40 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f542] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f542]" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#9DA1A8] group-hover:text-[#f5f5f0] transition-colors font-semibold">
              {project.telemetry}
            </span>
          </div>

          {/* Top-Right Expanding Magnetic CTA Button */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#0c0d10]/90 border border-[#1f1f1f] text-[#6b6b6b] group-hover:border-[#c8f542] group-hover:text-[#c8f542] group-hover:shadow-[0_0_12px_rgba(200,245,66,0.35)] backdrop-blur-md transition-all duration-300">
              <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                EXPLORE
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-current" />
            </div>
          </div>

          {/* Corner Precision Drafting Crosshairs */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#3a3a3a] group-hover:text-[#c8f542]/60 transition-colors pointer-events-none">
            +
          </div>
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#3a3a3a] group-hover:text-[#c8f542]/60 transition-colors pointer-events-none">
            +
          </div>
        </div>

        {/* ─── METADATA CONTAINER ─── */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#0d0e12] border-t border-[#1a1b20]">
          <div>
            {/* Top Index & Year Row */}
            <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase text-[#555A64] mb-3">
              <span className="group-hover:text-[#8E929A] transition-colors">
                [{project.num}] {project.client}
              </span>
              <span className="text-[#3a3a3a] group-hover:text-[#c8f542] transition-colors">
                {project.year}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#f5f5f0] mb-2.5 group-hover:text-white transition-colors">
              {project.title}
            </h3>

            {/* Scope of Work Description */}
            <p className="text-xs leading-relaxed text-[#767A82] group-hover:text-[#9DA1A8] transition-colors mb-6">
              {project.scope}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-4 border-t border-[#1a1b20] flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#1a1b20] text-[#666A73] group-hover:border-[#2A2F3A] group-hover:text-[#A0A4AC] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION: PortfolioEditorial ("Selected Works")
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioEditorial() {
  return (
    <section id="work" className="w-full bg-[#080808] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f] select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header Micro-Label */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c8f542] font-semibold">
              04
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#444852] font-semibold">
              / SELECTED WORKS &amp; SYSTEMS
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b6b] hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-pulse" />
            <span>4 PRODUCTION SHIPS</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Proven platforms. Built to scale.
          </h2>
          <p className="text-base leading-[1.8] text-[#767A82]">
            A curated index of production systems engineered with obsessive attention to latency, typography, and clean code.
          </p>
        </div>

        {/* 2x2 Interactive 3D Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

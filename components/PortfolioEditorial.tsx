'use client'

import React, { useRef, useState, useEffect } from 'react'
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
import { useTheme } from './ThemeProvider'

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
    title: 'Nexus Enterprise OS',
    slug: 'nexus-enterprise-os',
    client: 'NEXUS LOGISTICS GLOBAL',
    scope: 'Cloud ERP & Telemetry Architecture',
    year: '2026',
    image: '/projects/nexus_main.jpg',
    telemetry: '99.99% SLA // SUB-200MS',
    tags: ['NEXT.JS 14', 'POSTGRESQL', 'DOCKER', 'PRISMA'],
  },
  {
    num: '02',
    title: 'Aetheris AI Intelligence',
    slug: 'aetheris-ai-intelligence',
    client: 'AETHERIS AUTONOMOUS SYSTEMS',
    scope: 'Domain LLM Orchestration & RAG Pipeline',
    year: '2026',
    image: '/images/portfolio-fourfrontlab-card.jpg',
    telemetry: 'LLM RAG // VECTOR EMBEDDING',
    tags: ['PYTHON', 'FASTAPI', 'VECTOR EMBEDDING', 'NEXT.JS'],
  },
  {
    num: '03',
    title: 'Hanaz Luxury Commerce',
    slug: 'hanaz-luxury-skincare',
    client: 'HANAZ ATELIER LONDON',
    scope: 'Kinetic WebGL Storefront & Checkout Engine',
    year: '2021',
    image: '/projects/hanaz_main.webp',
    telemetry: '840MS LCP // +240% CONV',
    tags: ['NEXT.JS 14', 'TAILWIND CSS', 'SHOPIFY API', 'EDGE CDN'],
  },
  {
    num: '04',
    title: 'OmniFlow Automation Core',
    slug: 'omniflow-automation-core',
    client: 'OMNIFLOW INFRASTRUCTURE',
    scope: 'Event-Driven Webhook Queues & CRM Bridge',
    year: '2021',
    image: '/images/portfolio-fourfrontlab-card.jpg',
    telemetry: '50K ACTIVE // ZERO-LAG QUEUE',
    tags: ['REACT 18', 'WEBSOCKETS', 'POSTGRESQL', 'SERVERLESS'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3D MAGNETIC PARALLAX CARD WITH SPOTLIGHT & LASER SCANLINE
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
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

  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${spotlightX}px ${spotlightY}px, ${
    isDark ? 'rgba(200, 245, 66, 0.12)' : 'rgba(140, 122, 91, 0.12)'
  }, transparent 75%)`

  const isBrandedGraphic = project.image.includes('portfolio-fourfrontlab')

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
        className={`relative flex flex-col justify-between border rounded-2xl overflow-hidden transition-all duration-400 select-none cursor-pointer ${
          isDark
            ? 'border-[#1f1f1f] bg-[#0d0e12] group-hover:border-[#c8f542]/70 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)]'
            : 'border-[#D9D3C7] bg-[#FAF8F4] shadow-[0_12px_32px_rgba(0,0,0,0.06)] group-hover:border-[#8C7A5B] group-hover:shadow-[0_24px_48px_rgba(140,122,91,0.18)]'
        }`}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20"
          style={{ background: spotlightBg }}
        />

        {/* ─── IMAGE SHOWCASE AREA ─── */}
        <div
          className={`relative w-full h-[280px] sm:h-[340px] overflow-hidden ${
            isDark ? 'bg-[#080808]' : 'bg-[#F4EFE6]'
          }`}
        >
          {/* Main Showcase Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`transition-all duration-700 ease-out group-hover:scale-[1.03] ${
              isBrandedGraphic
                ? 'object-cover object-center brightness-100'
                : isDark
                ? 'object-cover object-top filter grayscale contrast-[1.15] brightness-[0.92] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100'
                : 'object-cover object-top filter brightness-[0.98] contrast-[1.02]'
            }`}
          />

          {/* Vignette Overlay for Dark Integration */}
          {isDark && !isBrandedGraphic && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d0e12] via-transparent to-black/30" />
          )}

          {/* Laser Scanline Sweep on Card Hover */}
          <div
            className={`absolute inset-x-0 h-24 pointer-events-none -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-[#c8f542]/25 to-transparent'
                : 'bg-gradient-to-b from-transparent via-[#8C7A5B]/20 to-transparent'
            }`}
          />

          {/* Top-Left Telemetry Tag with Live Beacon */}
          <div
            className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${
              isDark
                ? 'border border-[#1f1f1f] bg-[#0c0d10]/90 group-hover:border-[#c8f542]/40'
                : 'border border-[#D9D3C7] bg-[#FAF8F4]/90 group-hover:border-[#8C7A5B]/60 shadow-sm'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-[#c8f542]' : 'bg-[#8C7A5B]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#c8f542]' : 'bg-[#8C7A5B]'
                }`}
              />
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-wider transition-colors font-semibold ${
                isDark
                  ? 'text-[#9DA1A8] group-hover:text-[#f5f5f0]'
                  : 'text-[#666A73] group-hover:text-[#121316]'
              }`}
            >
              {project.telemetry}
            </span>
          </div>

          {/* Top-Right CTA Square Button matching blueprint mockup */}
          <div className="absolute top-4 right-4 z-10">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${
                isDark
                  ? 'bg-[#0c0d10]/90 border border-[#1f1f1f] text-[#c8f542] group-hover:border-[#c8f542] group-hover:shadow-[0_0_12px_rgba(200,245,66,0.35)]'
                  : 'bg-[#2B2621]/80 hover:bg-[#121316] text-[#FAF8F5] shadow-sm'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Corner Precision Drafting Crosshairs */}
          <div
            className={`absolute bottom-3 left-3 text-[10px] font-mono transition-colors pointer-events-none ${
              isDark
                ? 'text-[#3a3a3a] group-hover:text-[#c8f542]/60'
                : 'text-[#8C7A5B]/40 group-hover:text-[#8C7A5B]'
            }`}
          >
            +
          </div>
          <div
            className={`absolute bottom-3 right-3 text-[10px] font-mono transition-colors pointer-events-none ${
              isDark
                ? 'text-[#3a3a3a] group-hover:text-[#c8f542]/60'
                : 'text-[#8C7A5B]/40 group-hover:text-[#8C7A5B]'
            }`}
          >
            +
          </div>
        </div>

        {/* ─── METADATA CONTAINER ─── */}
        <div
          className={`p-6 sm:p-8 flex flex-col justify-between flex-1 border-t transition-colors ${
            isDark
              ? 'bg-[#0d0e12] border-[#1a1b20]'
              : 'bg-[#FAF8F4] border-[#E8E2D8]'
          }`}
        >
          <div>
            {/* Top Index & Year Row */}
            <div
              className={`flex items-center justify-between font-mono text-[11px] tracking-widest uppercase mb-3 ${
                isDark ? 'text-[#555A64]' : 'text-[#777C85]'
              }`}
            >
              <span className={isDark ? 'group-hover:text-[#8E929A]' : 'group-hover:text-[#121316]'}>
                [{project.num}] {project.client}
              </span>
              <span
                className={`transition-colors font-medium ${
                  isDark
                    ? 'text-[#3a3a3a] group-hover:text-[#c8f542]'
                    : 'text-[#8C7A5B]'
                }`}
              >
                {project.year}
              </span>
            </div>

            {/* Project Title */}
            <h3
              className={`font-editorial text-2xl sm:text-3xl font-normal mb-2.5 transition-colors ${
                isDark
                  ? 'text-[#f5f5f0] group-hover:text-white'
                  : 'text-[#121316] group-hover:text-black'
              }`}
            >
              {project.title}
            </h3>

            {/* Scope of Work Description */}
            <p
              className={`text-xs leading-relaxed mb-6 transition-colors ${
                isDark
                  ? 'text-[#767A82] group-hover:text-[#9DA1A8]'
                  : 'text-[#555860] group-hover:text-[#2A2E36]'
              }`}
            >
              {project.scope}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div
            className={`pt-4 border-t flex flex-wrap gap-2 ${
              isDark ? 'border-[#1a1b20]' : 'border-[#E8E2D8]'
            }`}
          >
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
                  isDark
                    ? 'border-[#1a1b20] text-[#666A73] group-hover:border-[#2A2F3A] group-hover:text-[#A0A4AC]'
                    : 'border-[#D9D3C7] text-[#666A73] bg-white/70 group-hover:border-[#8C7A5B] group-hover:text-[#121316]'
                }`}
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
// MAIN SECTION: PortfolioEditorial ("Proven platforms. Built to scale.")
// ─────────────────────────────────────────────────────────────────────────────

export default function PortfolioEditorial() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : false

  return (
    <section
      id="work"
      className={`relative w-full py-28 sm:py-36 px-6 lg:px-10 border-b select-none transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#080808] text-[#f5f5f0] border-[#1f1f1f]'
          : 'bg-[#ECE8DF] text-[#121316] border-[#D6D0C4]'
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────────────
          BACKGROUND: In light mode, renders the uploaded flowing golden particle wave
          with blueprint schematics. In dark mode, renders midnight blueprint styling.
      ───────────────────────────────────────────────────────────────────── */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src="/images/portfolio-scale-bg.jpg"
            alt="Proven platforms built to scale theme background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-100"
          />
          {/* Subtle warm wash around bottom edge for seamless section blending */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#ECE8DF] to-transparent pointer-events-none" />
        </div>
      )}

      {isDark && (
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#080808]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,245,66,0.04),rgba(255,255,255,0))]" />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          CONTENT CONTAINER
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Section Headline & Description (Clean minimalist styling without clutter tags) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            className={`font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] mb-6 transition-colors ${
              isDark ? 'text-[#f5f5f0]' : 'text-[#121316]'
            }`}
          >
            Proven platforms. Built to scale.
          </h2>
          <p
            className={`text-base leading-[1.8] transition-colors ${
              isDark ? 'text-[#767A82]' : 'text-[#555860]'
            }`}
          >
            A curated index of production systems engineered with obsessive attention to latency, typography, and clean code.
          </p>
        </div>

        {/* 2x2 Interactive 3D Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.num} project={project} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  )
}

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
    image: '/images/portfolio-fourfrontlab-gold-hd.jpg',
    telemetry: 'LLM RAG // VECTOR EMBEDDING',
    tags: ['PYTHON', 'FASTAPI', 'VECTOR EMBEDDINGS', 'NEXT.JS 15'],
  },
  {
    num: '03',
    title: 'Hanaz Luxury Commerce',
    slug: 'hanaz-luxury-skincare',
    client: 'HANAZ ATELIER LONDON',
    scope: 'Kinetic WebGL Storefront & Checkout Engine',
    year: '2026',
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
    year: '2026',
    image: '/projects/roamease_main.webp',
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

  // Dynamic cursor radial spotlight coords
  const spotlightX = useMotionValue(-500)
  const spotlightY = useMotionValue(-500)

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
    isDark ? 'rgba(200, 245, 66, 0.12)' : 'rgba(18, 19, 22, 0.05)'
  }, transparent 75%)`

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
            ? 'border-[#262626] bg-[#0c0d12] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-[#c8f542]/70 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.8)]'
            : 'border-[#E2E8F0] bg-[#FFFFFF] shadow-[0_12px_36px_rgba(0,0,0,0.06)] group-hover:border-[#0F172A] group-hover:shadow-[0_24px_50px_rgba(15,23,42,0.14)]'
        }`}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20"
          style={{ background: spotlightBg }}
        />

        {/* ─── IMAGE SHOWCASE AREA (Clear, Bright & Visible) ─── */}
        <div
          className={`relative w-full h-[280px] sm:h-[340px] overflow-hidden ${
            isDark ? 'bg-[#080808]' : 'bg-[#F8FAFC]'
          }`}
        >
          {/* Main Showcase Image - 100% visible, crystal-clear 2K asset */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center brightness-[1.0] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Laser Scanline Sweep on Card Hover */}
          <div
            className={`absolute inset-x-0 h-24 pointer-events-none -translate-y-full group-hover:translate-y-[450px] transition-transform duration-1000 ease-in-out opacity-0 group-hover:opacity-100 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-[#c8f542]/25 to-transparent'
                : 'bg-gradient-to-b from-transparent via-[#0F172A]/10 to-transparent'
            }`}
          />

          {/* Top-Left Telemetry Tag with Live Beacon */}
          <div
            className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${
              isDark
                ? 'border border-[#262626] bg-[#0c0d12]/95 group-hover:border-[#c8f542]/50'
                : 'border border-[#CBD5E1] bg-[#FFFFFF]/95 group-hover:border-[#0F172A] shadow-xs'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-[#c8f542]' : 'bg-[#10b981]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-[#c8f542]' : 'bg-[#10b981]'
                }`}
              />
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors font-bold ${
                isDark
                  ? 'text-[#D1D5DB] group-hover:text-white'
                  : 'text-[#1F2937] group-hover:text-black'
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
                  ? 'bg-[#0c0d12]/95 border border-[#262626] text-[#c8f542] group-hover:border-[#c8f542] group-hover:shadow-[0_0_12px_rgba(200,245,66,0.35)]'
                  : 'bg-[#0F172A] text-white group-hover:bg-black shadow-xs'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* ─── METADATA CONTAINER (High Contrast & Clear Visibility) ─── */}
        <div
          className={`p-6 sm:p-8 flex flex-col justify-between flex-1 border-t transition-colors ${
            isDark
              ? 'bg-[#0c0d12] border-[#262626]'
              : 'bg-[#FFFFFF] border-[#E2E8F0]'
          }`}
        >
          <div>
            {/* Top Index & Year Row */}
            <div
              className={`flex items-center justify-between font-mono text-[11px] tracking-widest uppercase mb-3 ${
                isDark ? 'text-[#9CA3AF]' : 'text-[#64748B]'
              }`}
            >
              <span className={`font-semibold ${isDark ? 'group-hover:text-white' : 'group-hover:text-[#0F172A]'}`}>
                [{project.num}] {project.client}
              </span>
              <span
                className={`transition-colors font-bold font-mono ${
                  isDark
                    ? 'text-[#c8f542]'
                    : 'text-[#0F172A]'
                }`}
              >
                {project.year}
              </span>
            </div>

            {/* Project Title - High Legibility */}
            <h3
              className={`font-editorial text-2xl sm:text-3xl font-medium mb-2.5 transition-colors ${
                isDark
                  ? 'text-white'
                  : 'text-[#0F172A]'
              }`}
            >
              {project.title}
            </h3>

            {/* Scope of Work Description */}
            <p
              className={`text-sm leading-relaxed mb-6 transition-colors ${
                isDark
                  ? 'text-[#9CA3AF] group-hover:text-[#E5E7EB]'
                  : 'text-[#475569] group-hover:text-[#1E293B]'
              }`}
            >
              {project.scope}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div
            className={`pt-4 border-t flex flex-wrap gap-2 ${
              isDark ? 'border-[#1f2228]' : 'border-[#E2E8F0]'
            }`}
          >
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
                  isDark
                    ? 'border-[#27272a] text-[#a1a1aa] bg-[#18181b] group-hover:border-[#3f3f46] group-hover:text-white'
                    : 'border-[#CBD5E1] text-[#334155] bg-[#F1F5F9] group-hover:border-[#0F172A] group-hover:text-black font-semibold'
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
          : 'bg-[#F8F9FA] text-[#0F172A] border-[#E2E8F0]'
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────────────
          BACKGROUND: Professional architectural software engineering blueprints.
          Light mode: Perimeter CAD blueprint drafting schematics & precision grid.
          Dark mode: Deep obsidian chassis with subtle telemetry circuitry.
          The center area is kept 100% clean & clear for perfect foreground readability.
      ───────────────────────────────────────────────────────────────────── */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#F8F9FA]">
          {/* Subtle Perimeter Architectural CAD Blueprint Schematics in crisp 2K */}
          <Image
            src="/images/portfolio-blueprint-light.jpg"
            alt="Four Front Lab Architectural Software Engineering Blueprint"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-top pointer-events-none opacity-85 transition-opacity duration-700"
          />
          {/* Bottom Blending Wash */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F8F9FA] to-transparent pointer-events-none" />
        </div>
      )}

      {isDark && (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#080808]">
          {/* Dedicated Dark Mode High-Tech Infrastructure Chassis with Wave, Radar, and Grid in crisp 2K */}
          <Image
            src="/images/portfolio-blueprint-dark.jpg"
            alt="Four Front Lab Architectural High-Tech Infrastructure Chassis"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-top pointer-events-none opacity-95 transition-opacity duration-700"
          />
          {/* Subtle Bottom Section Blend Wash */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          CONTENT CONTAINER (Relative z-10 for absolute foreground clarity)
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Section Headline & Description matching exact design in screenshot */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            className={`font-editorial text-[clamp(36px,5.5vw,72px)] font-normal leading-[1.08] tracking-[-0.02em] mb-6 transition-colors ${
              isDark ? 'text-[#f5f5f0]' : 'text-[#0F172A]'
            }`}
          >
            Proven platforms.
            <br />
            Engineered to scale.
          </h2>
          <p
            className={`text-base sm:text-lg leading-[1.7] max-w-2xl transition-colors ${
              isDark ? 'text-[#9CA3AF]' : 'text-[#475569]'
            }`}
          >
            An elite index of high-performance production systems, engineered with obsessive attention to latency, architecture, and pristine, scalable code.
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

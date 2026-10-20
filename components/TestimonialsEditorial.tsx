'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import {
  ChevronDown,
  Check,
  ExternalLink,
  ShieldCheck,
  Menu,
  Twitter,
  Search,
  Sparkles,
  Activity,
  Terminal,
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & TESTIMONIAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type FilterTabType = 'all' | 'web' | 'data' | 'cloud'

interface Testimonial {
  id: string
  category: ('web' | 'data' | 'cloud')[]
  badgeText: string
  badgeStatus: string
  quoteColor: string
  glowColor: string
  badgeColorClass: {
    light: string
    dark: string
  }
  quote: string
  techSpecLeft: string
  techSpecRight: string
  authorName: string
  authorRole: string
  authorCompany: string
  avatarSrc: string
}

const testimonials: Testimonial[] = [
  {
    id: '01',
    category: ['web'],
    badgeText: 'WEB FLAGSHIP DEVELOPMENT',
    badgeStatus: 'VISIT SITE',
    quoteColor: '#22c55e', // Emerald Green
    glowColor: 'rgba(34, 197, 94, 0.25)',
    badgeColorClass: {
      light: 'bg-[#22c55e]/15 text-[#15803d] border-[#22c55e]/40',
      dark: 'bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/50',
    },
    quote:
      'Four Front Lab engineered our web flagship from scratch. We went from a sluggish 4.2s page load to a 0.35s sub-second edge response with custom 3D canvas physics. Working directly with dedicated engineers made delivery effortlessly fast.',
    techSpecLeft: 'NEXT.JS / WEBGL',
    techSpecRight: '4.2S ➔ 0.35S TIME',
    authorName: 'Marcus Vanco',
    authorRole: 'CO-FOUNDER & CTO',
    authorCompany: 'SHOGUN',
    avatarSrc: '/images/avatar-marcus.jpg',
  },
  {
    id: '02',
    category: ['data'],
    badgeText: 'WEBHOOK PIPELINE',
    badgeStatus: 'PIPELINE',
    quoteColor: '#eab308', // Amber Yellow
    glowColor: 'rgba(234, 179, 8, 0.25)',
    badgeColorClass: {
      light: 'bg-[#eab308]/15 text-[#a16207] border-[#eab308]/40',
      dark: 'bg-[#eab308]/20 text-[#fde047] border-[#eab308]/50',
    },
    quote:
      'Constructed an event-driven webhook pipeline that eliminated 140+ hours of monthly manual reconciliation. Zero dropped transactions across 50,000 daily events. The architecture is self-healing, airtight, and dependable.',
    techSpecLeft: 'NODE.JS • FASTAPI',
    techSpecRight: '140 HOURS SAVED',
    authorName: 'Elena Rostova',
    authorRole: 'DIRECTOR OF ENGINEERING',
    authorCompany: 'TRUST',
    avatarSrc: '/images/avatar-elena.jpg',
  },
  {
    id: '03',
    category: ['data', 'cloud'],
    badgeText: 'MULTI-TENANT PORTAL',
    badgeStatus: 'VISIT SITE',
    quoteColor: '#0284c7', // Sky Blue
    glowColor: 'rgba(2, 132, 199, 0.25)',
    badgeColorClass: {
      light: 'bg-[#0284c7]/15 text-[#0369a1] border-[#0284c7]/40',
      dark: 'bg-[#0284c7]/20 text-[#38bdf8] border-[#0284c7]/50',
    },
    quote:
      'Built our internal multi-tenant administrative portal with complex role-based PostgreSQL schemas and real-time telemetry. Zero technical debt, modular Prisma migrations, and rock-solid JWT auth. True senior engineering execution.',
    techSpecLeft: 'POSTGRESQL • NEXT.JS',
    techSpecRight: 'ZERO TECH DEBT',
    authorName: 'David Sterling',
    authorRole: 'VP OF PRODUCT',
    authorCompany: 'STERLING CORE',
    avatarSrc: '/images/avatar-david.jpg',
  },
  {
    id: '04',
    category: ['cloud'],
    badgeText: 'ENTERPRISE AI PIPELINE',
    badgeStatus: 'PRIVATE',
    quoteColor: '#a855f7', // Purple / Violet
    glowColor: 'rgba(168, 85, 247, 0.25)',
    badgeColorClass: {
      light: 'bg-[#a855f7]/15 text-[#7e22ce] border-[#a855f7]/40',
      dark: 'bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/50',
    },
    quote:
      'Integrated an air-gapped private RAG pipeline indexing our proprietary technical documentation. High-precision vector cosine similarity retrieval with guaranteed zero data leakage. Fast inference, clean APIs, and total data isolation.',
    techSpecLeft: 'PYTHON • CHROMA',
    techSpecRight: '99.8% ACCURACY • ZERO LEAKAGE',
    authorName: 'Sophia Chen',
    authorRole: 'HEAD OF RESEARCH',
    authorCompany: 'OMNISC_AI',
    avatarSrc: '/images/avatar-sarah.jpg',
  },
]

const filterTabs: Array<{ id: FilterTabType; label: string }> = [
  { id: 'all', label: 'ALL FEEDBACK' },
  { id: 'web', label: 'WEB & MOBILE' },
  { id: 'data', label: 'DATA & DEVOP' },
  { id: 'cloud', label: 'CLOUD SERVICES' },
]

const tickerTechs = [
  'NEXT.JS 14',
  'TYPESCRIPT',
  'REACT 18',
  'TAILWIND CSS',
  'PYTHON',
  'POSTGRESQL',
  'PRISMA ORM',
  'DOCKER',
  'THREE.JS',
  'FASTAPI',
  'AUTONOMOUS WORKFLOWS',
  'EDGE DEPLOYMENT',
]

// ─────────────────────────────────────────────────────────────────────────────
// 3D MAGNETIC TILT CARD WITH MOUSE-FOLLOW SPOTLIGHT
// ─────────────────────────────────────────────────────────────────────────────

function TiltTestimonialCard({
  item,
  isDark,
}: {
  item: Testimonial
  isDark: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for natural dampening
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  // Spotlight coordinates
  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Normalize -0.5 to 0.5
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)

    spotlightX.set(mouseX)
    spotlightY.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${spotlightX}px ${spotlightY}px, ${item.glowColor}, transparent 80%)`

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative flex flex-col justify-between rounded-xl p-5 sm:p-7 border transition-all duration-300 ${
        isDark
          ? 'bg-[#12151B]/90 border-[#262B36] hover:border-[#4B5260] shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
          : 'bg-[#EFEFEA]/90 border-[#22252A] hover:border-[#121316] shadow-[0_10px_35px_rgba(0,0,0,0.06)]'
      } backdrop-blur-md overflow-hidden`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: spotlightBg }}
      />

      {/* Subtle Corner Accent Glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full pointer-events-none opacity-10 group-hover:opacity-25 blur-2xl transition-opacity duration-500"
        style={{ backgroundColor: item.quoteColor }}
      />

      <div className="relative z-10">
        {/* Top Header Row: Category Indicator & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-[#22252A]/15 dark:border-[#262B36]">
          <div className="flex items-center gap-2 min-w-0">
            {/* Pulsing Colored Dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: item.quoteColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: item.quoteColor }}
              />
            </span>
            <span
              className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold truncate ${
                isDark ? 'text-[#C5CAD4]' : 'text-[#2D3139]'
              }`}
            >
              {item.badgeText}
            </span>
          </div>

          {/* Status Badge Pill with Light Sweep Effect on Hover */}
          <div
            className={`relative overflow-hidden flex items-center gap-1 px-2.5 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-semibold border shrink-0 ${
              isDark ? item.badgeColorClass.dark : item.badgeColorClass.light
            }`}
          >
            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
            <span>{item.badgeStatus}</span>
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Large Styled Quote Mark “ */}
        <div
          className="text-4xl sm:text-5xl font-serif font-black leading-none select-none mb-3 -mt-1 group-hover:scale-110 transition-transform duration-300 origin-left"
          style={{ color: item.quoteColor }}
        >
          “
        </div>

        {/* Testimonial Quote Body */}
        <p
          className={`text-xs sm:text-[13px] leading-relaxed mb-6 transition-colors ${
            isDark ? 'text-[#C5CAD4]' : 'text-[#2D3139]'
          }`}
        >
          {item.quote}
        </p>
      </div>

      <div className="relative z-10">
        {/* Tech Specs Line */}
        <div
          className={`flex items-center justify-between pt-3 pb-3 mb-3.5 border-t border-b font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors ${
            isDark
              ? 'border-[#262B36] text-[#7E8594] group-hover:border-[#3A4050]'
              : 'border-[#22252A]/15 text-[#5A606C] group-hover:border-[#22252A]/35'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            <Terminal className="w-3 h-3 opacity-60" />
            {item.techSpecLeft}
          </span>
          <span
            className="font-bold px-1.5 py-0.5 rounded text-[9px]"
            style={{
              backgroundColor: isDark
                ? `${item.quoteColor}15`
                : `${item.quoteColor}20`,
              color: isDark ? '#ffffff' : '#121316',
            }}
          >
            {item.techSpecRight}
          </span>
        </div>

        {/* Author Row: Avatar + Name + Role */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`relative w-9 h-9 rounded-full overflow-hidden shrink-0 border ${
                isDark ? 'border-[#3A4050]' : 'border-[#22252A]'
              }`}
            >
              <Image
                src={item.avatarSrc}
                alt={item.authorName}
                fill
                className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              />
            </div>
            {/* Micro active indicator */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#12151B]"
              style={{ backgroundColor: item.quoteColor }}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span
              className={`text-xs sm:text-sm font-bold tracking-tight truncate transition-colors ${
                isDark
                  ? 'text-white group-hover:text-[#c8f542]'
                  : 'text-[#121316] group-hover:text-black'
              }`}
            >
              {item.authorName}
            </span>
            <span
              className={`font-mono text-[9px] uppercase tracking-wider truncate ${
                isDark ? 'text-[#7E8594]' : 'text-[#666A73]'
              }`}
            >
              {item.authorRole} • {item.authorCompany}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// KINETIC BLUEPRINT TECHNICAL BACKGROUND (SCANNING RADAR & COMPASS)
// ─────────────────────────────────────────────────────────────────────────────

function KineticBlueprintBackground({ isDark }: { isDark: boolean }) {
  const strokeLight = isDark ? '#262D38' : '#CCD1C7'
  const strokeBold = isDark ? '#333D4D' : '#AAB2A2'

  return (
    <div className="absolute top-8 left-4 sm:left-10 lg:left-14 w-[360px] sm:w-[500px] h-[500px] pointer-events-none z-0 opacity-40 select-none">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Subtle "01" Blueprint Number watermark */}
        <text
          x="30"
          y="95"
          fontFamily="var(--font-mono), monospace"
          fontSize="72"
          fontWeight="bold"
          fill={isDark ? '#262A32' : '#D0D4CC'}
          letterSpacing="-0.04em"
        >
          01
        </text>

        {/* Outer Rotating Compass Reticle */}
        <g className="origin-[140px_240px] animate-[spin_60s_linear_infinite]">
          <circle
            cx="140"
            cy="240"
            r="115"
            stroke={strokeLight}
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {/* Compass Tick Marks at 0, 90, 180, 270 degrees */}
          <line x1="140" y1="120" x2="140" y2="128" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="140" y1="352" x2="140" y2="360" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="20" y1="240" x2="28" y2="240" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="252" y1="240" x2="260" y2="240" stroke={strokeBold} strokeWidth="1.5" />
        </g>

        {/* Counter-Rotating Inner Orbital Ring */}
        <g className="origin-[140px_240px] animate-[spin_30s_linear_infinite_reverse]">
          <circle
            cx="140"
            cy="240"
            r="85"
            stroke={strokeLight}
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          <circle cx="225" cy="240" r="3" fill={strokeBold} />
          <circle cx="55" cy="240" r="3" fill={strokeBold} />
        </g>

        {/* Sweeping Radar Scanner Line */}
        <g className="origin-[140px_240px] animate-[spin_12s_linear_infinite]">
          <line
            x1="140"
            y1="240"
            x2="140"
            y2="128"
            stroke={isDark ? '#c8f542' : '#687D3B'}
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* Fixed Reticle Core */}
        <circle cx="140" cy="240" r="50" stroke={strokeBold} strokeWidth="1" />
        <circle cx="140" cy="240" r="22" stroke={strokeLight} strokeWidth="0.8" />
        <circle cx="140" cy="240" r="3" fill={isDark ? '#c8f542' : '#687D3B'} className="animate-ping" />
        <circle cx="140" cy="240" r="2" fill={isDark ? '#c8f542' : '#687D3B'} />

        {/* Precision Crosshair Lines */}
        <line
          x1="20"
          y1="240"
          x2="260"
          y2="240"
          stroke={strokeLight}
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        <line
          x1="140"
          y1="120"
          x2="140"
          y2="360"
          stroke={strokeLight}
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* Technical Coordinate Stamps */}
        <text
          x="30"
          y="380"
          fontFamily="var(--font-mono), monospace"
          fontSize="9"
          fill={isDark ? '#555E6D' : '#8A919D'}
          letterSpacing="0.15em"
        >
          [ LAT: 33.6844° N • LON: 73.0479° E ]
        </text>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING DIGITAL GOLDEN PARTICLES
// ─────────────────────────────────────────────────────────────────────────────

function AmbientGoldenParticles() {
  const particles = [
    { top: '15%', left: '70%', delay: 0, duration: 6, size: 3.5 },
    { top: '28%', left: '76%', delay: 1.2, duration: 7, size: 4 },
    { top: '38%', left: '84%', delay: 2.1, duration: 5.5, size: 3 },
    { top: '50%', left: '68%', delay: 0.8, duration: 6.5, size: 4.5 },
    { top: '62%', left: '88%', delay: 2.7, duration: 8, size: 3 },
    { top: '74%', left: '78%', delay: 1.5, duration: 6, size: 3.5 },
    { top: '82%', left: '85%', delay: 3.2, duration: 7.5, size: 4 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, y: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.9, 0.3],
            y: [-14, 14, -14],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full shadow-[0_0_14px_rgba(230,165,60,0.9)]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle, #F8C36A 20%, #E6A53C 80%)',
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LEFT DOCK ICONS
// ─────────────────────────────────────────────────────────────────────────────

function LeftSideFloatingDock({ isDark }: { isDark: boolean }) {
  const iconColor = isDark
    ? 'text-[#888888] hover:text-white'
    : 'text-[#666A73] hover:text-[#121316]'

  return (
    <div className="hidden 2xl:flex flex-col items-center gap-6 absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
      <button
        type="button"
        aria-label="Toggle navigation"
        className={`p-2 transition-colors ${iconColor}`}
      >
        <Menu className="w-4 h-4 stroke-[1.5]" />
      </button>

      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className={`p-2 transition-colors ${iconColor}`}
      >
        <Twitter className="w-3.5 h-3.5 stroke-[1.5]" />
      </a>

      <button
        type="button"
        aria-label="Search"
        className={`p-2 transition-colors ${iconColor}`}
      >
        <Search className="w-3.5 h-3.5 stroke-[1.5]" />
      </button>

      <div
        className={`w-px h-12 my-1 ${
          isDark ? 'bg-[#2A2A2A]' : 'bg-[#D4D7D1]'
        }`}
      />
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180 ${
          isDark ? 'text-[#555555]' : 'text-[#8E929A]'
        }`}
      >
        VERIFIED EVIDENCE // 2026
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INFINITE GLIDING BOTTOM TECH TICKER
// ─────────────────────────────────────────────────────────────────────────────

function InfiniteTechTicker({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`mt-16 sm:mt-24 pt-6 pb-2 border-t overflow-hidden relative group ${
        isDark ? 'border-[#1F2228]' : 'border-[#DFE2DC]'
      }`}
    >
      {/* Side Fade Gradients */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #0B0C0E 20%, transparent)'
            : 'linear-gradient(to right, #F4F4F1 20%, transparent)',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to left, #0B0C0E 20%, transparent)'
            : 'linear-gradient(to left, #F4F4F1 20%, transparent)',
        }}
      />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default items-center">
        {[...Array(2)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-8 sm:gap-12 px-6">
            {tickerTechs.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 shrink-0 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors duration-200"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-[#c8f542]' : 'bg-[#687D3B]'
                  }`}
                />
                <span
                  className={`${
                    isDark
                      ? 'text-[#8E929A] hover:text-white'
                      : 'text-[#4A4E58] hover:text-[#121316]'
                  }`}
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: TestimonialsEditorial
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsEditorial() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeTab, setActiveTab] = useState<FilterTabType>('all')

  const filtered =
    activeTab === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category.includes(activeTab as any))

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 sm:py-28 lg:py-36 px-6 lg:px-14 xl:px-20 border-b border-[var(--dm-border)] bg-[var(--dm-bg)] text-[var(--dm-text)] transition-colors duration-300 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 1: Blueprint Technical Grid
      ───────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 2: Kinetic Radar & Compass Blueprint Sketch
      ───────────────────────────────────────────────────────────────── */}
      <KineticBlueprintBackground isDark={isDark} />

      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 3: Ambient Golden Particle Accents
      ───────────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[55vw] max-w-[920px] h-full pointer-events-none select-none z-0 overflow-hidden">
        <AmbientGoldenParticles />
      </div>

      {/* Left Dock Icons */}
      <LeftSideFloatingDock isDark={isDark} />

      {/* ─────────────────────────────────────────────────────────────────
          MAIN SECTION CONTENT
      ───────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Typography, Tag, Description & Filter Tabs
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
            <div>

              {/* Massive Prominent Headline: Typo corrected ("atoven scale" -> "at scale.") */}
              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6 ${
                  isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
                }`}
              >
                Tested in production.
                <br />
                Proven at scale.
              </h2>

              {/* Secondary Descriptive Paragraph */}
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-lg mb-10 ${
                  isDark ? 'text-[#9DA1A8]' : 'text-[#3E424B]'
                }`}
              >
                Direct client assessments from founders and technical leaders
                who partnered with our four engineers to eliminate critical
                software bottlenecks.
              </p>
            </div>

            {/* Filter Tabs & Theme Toggle Controls */}
            <div>
              {/* Sliding Filter Tabs with Framer Motion layoutId */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
                {filterTabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 border ${
                        isActive
                          ? isDark
                            ? 'text-black border-transparent'
                            : 'text-white border-transparent'
                          : isDark
                          ? 'bg-[#13161B]/80 text-[#8E929A] border-[#2A2F3A] hover:text-white hover:border-[#4B5260]'
                          : 'bg-white/80 text-[#555860] border-[#D4D7D1] hover:text-[#121316] hover:border-[#121316]'
                      }`}
                    >
                      {/* Smooth Sliding Pill Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterPill"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className={`absolute inset-0 rounded-md z-0 shadow-md ${
                            isDark ? 'bg-white' : 'bg-[#121316]'
                          }`}
                        />
                      )}

                      <span className="relative z-10 font-bold">{tab.label}</span>
                      {isActive && tab.id === 'all' && (
                        <ChevronDown className="relative z-10 w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </button>
                  )
                })}
              </div>

            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: 2x2 Glassmorphic 3D Tilt Testimonial Grid
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 perspective-[1000px]"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TiltTestimonialCard item={item} isDark={isDark} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM MARGIN INFINITE GLIDING TECH STACK TICKER
        ───────────────────────────────────────────────────────────── */}
        <InfiniteTechTicker isDark={isDark} />
      </div>
    </section>
  )
}

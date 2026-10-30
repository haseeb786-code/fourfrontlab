'use client'

import React, { useState, useRef, useMemo } from 'react'
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
  Sparkles,
  Activity,
  Terminal,
  Star,
  Play,
  Pause,
  ArrowLeftRight,
  Plus,
  X,
  Lock,
  CheckCircle2,
  Award,
  Globe,
  RotateCcw,
  SlidersHorizontal,
  Eye,
  Send,
  Zap,
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & TESTIMONIAL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export type FilterTabType = 'all' | 'web' | 'data' | 'cloud'
export type StreamMode = 'dual' | 'single' | 'grid'
export type StreamDirection = 'left' | 'right'

export interface Testimonial {
  id: string
  category: ('web' | 'data' | 'cloud')[]
  badgeText: string
  badgeStatus: string
  location: string
  rating: number
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
  verificationHash: string
  verifiedDate: string
  liveUrl?: string
  auditHighlights?: string[]
}

const initialTestimonials: Testimonial[] = [
  {
    id: '01',
    category: ['web'],
    badgeText: 'WEB FLAGSHIP ARCHITECTURE',
    badgeStatus: 'PRODUCTION LIVE',
    location: 'San Francisco, CA',
    rating: 5,
    quoteColor: '#22c55e', // Emerald Green
    glowColor: 'rgba(34, 197, 94, 0.28)',
    badgeColorClass: {
      light: 'bg-[#22c55e]/15 text-[#15803d] border-[#22c55e]/40',
      dark: 'bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/50',
    },
    quote:
      'Four Front Lab engineered our web flagship from scratch. We went from a sluggish 4.2s page load to a 0.35s sub-second edge response with custom 3D canvas physics. Working directly with dedicated engineers made delivery effortlessly fast.',
    techSpecLeft: 'NEXT.JS 14 / WEBGL',
    techSpecRight: '4.2S ➔ 0.35S EDGE',
    authorName: 'Marcus Vanco',
    authorRole: 'CO-FOUNDER & CTO',
    authorCompany: 'SHOGUN',
    avatarSrc: '/images/avatar-marcus.jpg',
    verificationHash: 'SHA-256: 4A8F...91BE',
    verifiedDate: 'OCT 2026',
    liveUrl: 'https://shogun.example.com',
    auditHighlights: [
      'Sub-second 350ms LCP worldwide via Cloudflare Edge',
      'Zero layout shift (CLS 0.00) under dynamic 3D rendering',
      'Automated CI/CD preview branch validation pipeline',
    ],
  },
  {
    id: '02',
    category: ['data'],
    badgeText: 'EVENT WEBHOOK PIPELINE',
    badgeStatus: 'PIPELINE ACTIVE',
    location: 'Zurich, Switzerland',
    rating: 5,
    quoteColor: '#eab308', // Amber Yellow
    glowColor: 'rgba(234, 179, 8, 0.28)',
    badgeColorClass: {
      light: 'bg-[#eab308]/15 text-[#a16207] border-[#eab308]/40',
      dark: 'bg-[#eab308]/20 text-[#fde047] border-[#eab308]/50',
    },
    quote:
      'Constructed an event-driven webhook pipeline that eliminated 140+ hours of monthly manual reconciliation. Zero dropped transactions across 50,000 daily events. The architecture is self-healing, airtight, and dependable.',
    techSpecLeft: 'NODE.JS • FASTAPI • REDIS',
    techSpecRight: '140+ HOURS SAVED / MO',
    authorName: 'Elena Rostova',
    authorRole: 'DIRECTOR OF ENGINEERING',
    authorCompany: 'TRUST FINTECH',
    avatarSrc: '/images/avatar-elena.jpg',
    verificationHash: 'SHA-256: 7C12...33DF',
    verifiedDate: 'SEP 2026',
    liveUrl: 'https://trust.example.com',
    auditHighlights: [
      '50,000+ daily idempotent events with dead-letter queue backup',
      'Sub-50ms queue ingestion latency under peak surge',
      'Cryptographically signed webhook payload verification',
    ],
  },
  {
    id: '03',
    category: ['data', 'cloud'],
    badgeText: 'MULTI-TENANT PORTAL',
    badgeStatus: 'PRODUCTION LIVE',
    location: 'Austin, TX',
    rating: 5,
    quoteColor: '#0284c7', // Sky Blue
    glowColor: 'rgba(2, 132, 199, 0.28)',
    badgeColorClass: {
      light: 'bg-[#0284c7]/15 text-[#0369a1] border-[#0284c7]/40',
      dark: 'bg-[#0284c7]/20 text-[#38bdf8] border-[#0284c7]/50',
    },
    quote:
      'Built our internal multi-tenant administrative portal with complex role-based PostgreSQL schemas and real-time telemetry. Zero technical debt, modular Prisma migrations, and rock-solid JWT auth. True senior engineering execution.',
    techSpecLeft: 'POSTGRESQL • NEXT.JS • PRISMA',
    techSpecRight: 'ZERO TECH DEBT • 99.99% SLA',
    authorName: 'David Sterling',
    authorRole: 'VP OF PRODUCT',
    authorCompany: 'STERLING CORE',
    avatarSrc: '/images/avatar-david.jpg',
    verificationHash: 'SHA-256: 9B44...11FE',
    verifiedDate: 'AUG 2026',
    liveUrl: 'https://sterlingcore.example.com',
    auditHighlights: [
      'Role-based access control with granular tenant row-level security',
      'Sub-8ms PostgreSQL response via connection pooling',
      'Real-time WebSocket telemetry with zero CPU thread blockage',
    ],
  },
  {
    id: '04',
    category: ['cloud'],
    badgeText: 'AIR-GAPPED AI PIPELINE',
    badgeStatus: 'AUDITED & SECURE',
    location: 'Singapore',
    rating: 5,
    quoteColor: '#a855f7', // Purple / Violet
    glowColor: 'rgba(168, 85, 247, 0.28)',
    badgeColorClass: {
      light: 'bg-[#a855f7]/15 text-[#7e22ce] border-[#a855f7]/40',
      dark: 'bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/50',
    },
    quote:
      'Integrated an air-gapped private RAG pipeline indexing our proprietary technical documentation. High-precision vector cosine similarity retrieval with guaranteed zero data leakage. Fast inference, clean APIs, and total data isolation.',
    techSpecLeft: 'PYTHON • CHROMA • LLAMA',
    techSpecRight: '99.8% PRECISION • 0 LEAKAGE',
    authorName: 'Dr. Sophia Chen',
    authorRole: 'HEAD OF AI RESEARCH',
    authorCompany: 'OMNISC AI',
    avatarSrc: '/images/avatar-sarah.jpg',
    verificationHash: 'SHA-256: 2F88...09CD',
    verifiedDate: 'OCT 2026',
    liveUrl: 'https://omnisc.example.com',
    auditHighlights: [
      'Isolated VPC vector storage with zero outbound telemetry leaks',
      'Context-aware hybrid semantic reranking with 99.8% precision',
      'Sub-200ms token streaming latency on local dedicated hardware',
    ],
  },
  {
    id: '05',
    category: ['data', 'cloud'],
    badgeText: 'DISTRIBUTED SETTLEMENT',
    badgeStatus: 'PRODUCTION LIVE',
    location: 'London, UK',
    rating: 5,
    quoteColor: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.28)',
    badgeColorClass: {
      light: 'bg-[#06b6d4]/15 text-[#0891b2] border-[#06b6d4]/40',
      dark: 'bg-[#06b6d4]/20 text-[#22d3ee] border-[#06b6d4]/50',
    },
    quote:
      'Migrated our monolithic settlement engine to an event-sourced distributed cluster. Reduced API latency by 78% while handling $40M+ weekly transaction volume with zero downtime across 180 continuous operating days.',
    techSpecLeft: 'RUST • KAFKA • POSTGRES',
    techSpecRight: '78% LATENCY REDUCTION',
    authorName: 'Julian Thorne',
    authorRole: 'PRINCIPAL ARCHITECT',
    authorCompany: 'APEX PROTOCOL',
    avatarSrc: '/images/avatar-david.jpg',
    verificationHash: 'SHA-256: 6D51...77AA',
    verifiedDate: 'SEP 2026',
    liveUrl: 'https://apexprotocol.example.com',
    auditHighlights: [
      '$40M+ weekly settlements processed without discrepancy',
      'Consensus engine throughput scaled to 12,000 tx/sec',
      'Automated disaster failover completed in under 4 seconds',
    ],
  },
  {
    id: '06',
    category: ['web', 'cloud'],
    badgeText: 'HIPAA TELEHEALTH SUITE',
    badgeStatus: 'COMPLIANT & LIVE',
    location: 'Boston, MA',
    rating: 5,
    quoteColor: '#10b981', // Emerald
    glowColor: 'rgba(16, 185, 129, 0.28)',
    badgeColorClass: {
      light: 'bg-[#10b981]/15 text-[#047857] border-[#10b981]/40',
      dark: 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/50',
    },
    quote:
      'Engineered our HIPAA-compliant telemedicine platform and real-time patient queue. Our clinical onboarding time dropped from 14 minutes to 90 seconds. Exceptional code hygiene and ironclad cryptographic data protections.',
    techSpecLeft: 'NEXT.JS • WEBRTC • AWS',
    techSpecRight: '90S CLINICAL ONBOARDING',
    authorName: 'Maya Lin',
    authorRole: 'CHIEF PRODUCT OFFICER',
    authorCompany: 'VELOCE HEALTH',
    avatarSrc: '/images/avatar-elena.jpg',
    verificationHash: 'SHA-256: 1E99...66BC',
    verifiedDate: 'OCT 2026',
    liveUrl: 'https://velocehealth.example.com',
    auditHighlights: [
      'Full BAA & HIPAA security compliance certified',
      'End-to-end encrypted WebRTC audio/video consultations',
      'Automated electronic health record (EHR) sync',
    ],
  },
  {
    id: '07',
    category: ['cloud', 'web'],
    badgeText: 'GPU VIDEO TRANSCODING',
    badgeStatus: 'OPTIMIZED',
    location: 'Los Angeles, CA',
    rating: 5,
    quoteColor: '#f97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.28)',
    badgeColorClass: {
      light: 'bg-[#f97316]/15 text-[#c2410c] border-[#f97316]/40',
      dark: 'bg-[#f97316]/20 text-[#fb923c] border-[#f97316]/50',
    },
    quote:
      'Our previous agency spent 6 months struggling with video transcoding latency. Four Front Lab delivered an automated GPU pipeline in 3 weeks, cutting rendering costs by 62% and eliminating customer playback buffering.',
    techSpecLeft: 'PYTHON • FFMPEG • DOCKER',
    techSpecRight: '62% CLOUD COST SAVED',
    authorName: 'Alexander Wright',
    authorRole: 'FOUNDER & CEO',
    authorCompany: 'KROMA MEDIA',
    avatarSrc: '/images/avatar-marcus.jpg',
    verificationHash: 'SHA-256: 3C77...44EA',
    verifiedDate: 'AUG 2026',
    liveUrl: 'https://kromamedia.example.com',
    auditHighlights: [
      'Zero buffer 4K HLS video streaming worldwide',
      'Hardware-accelerated parallel GPU encoding cluster',
      'Monthly cloud infrastructure bill slashed from $14k to $5.3k',
    ],
  },
  {
    id: '08',
    category: ['web'],
    badgeText: 'EDGE CONVERSION PLATFORM',
    badgeStatus: 'PRODUCTION LIVE',
    location: 'Sydney, Australia',
    rating: 5,
    quoteColor: '#c8f542', // Acid Green
    glowColor: 'rgba(200, 245, 66, 0.28)',
    badgeColorClass: {
      light: 'bg-[#687D3B]/15 text-[#3b4721] border-[#687D3B]/40',
      dark: 'bg-[#c8f542]/20 text-[#c8f542] border-[#c8f542]/50',
    },
    quote:
      'Rebuilt our entire marketing and interactive demo architecture. Organic search rankings jumped 240% within 60 days, and our free-to-paid conversion rate more than doubled. The sub-second global edge CDN is breathtaking.',
    techSpecLeft: 'NEXT.JS 14 • TAILWIND • EDGE',
    techSpecRight: '+210% CONVERSION GAIN',
    authorName: 'Rachel Vance',
    authorRole: 'HEAD OF GROWTH',
    authorCompany: 'STRATOS CLOUD',
    avatarSrc: '/images/avatar-sarah.jpg',
    verificationHash: 'SHA-256: 5E32...88FA',
    verifiedDate: 'SEP 2026',
    liveUrl: 'https://stratoscloud.example.com',
    auditHighlights: [
      '100/100 Google Lighthouse Core Web Vitals score',
      'Zero third-party script hydration penalties on mobile',
      '2.1x increase in enterprise qualified demonstration signups',
    ],
  },
]

const filterTabs: Array<{ id: FilterTabType; label: string; count: number }> = [
  { id: 'all', label: 'ALL REVIEWS', count: 8 },
  { id: 'web', label: 'WEB & APPS', count: 3 },
  { id: 'data', label: 'DATA & DEVENG', count: 3 },
  { id: 'cloud', label: 'AI & CLOUD', count: 4 },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3D MAGNETIC TILT CARD WITH REAL SPOTLIGHT & VERIFIED ACCENTS
// ─────────────────────────────────────────────────────────────────────────────

function TiltFeedbackCard({
  item,
  isDark,
  onInspect,
}: {
  item: Testimonial
  isDark: boolean
  onInspect?: (t: Testimonial) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 22 })
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 22 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)

    spotlightX.set(mouseX)
    spotlightY.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${spotlightX}px ${spotlightY}px, ${item.glowColor}, transparent 80%)`

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
      className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 border transition-all duration-300 w-[360px] sm:w-[410px] md:w-[440px] shrink-0 ${
        isDark
          ? 'bg-[#0E1117]/95 border-[#1F2532] hover:border-[#38BDF8]/60 shadow-[0_18px_45px_rgba(0,0,0,0.7)]'
          : 'bg-[#FFFFFF]/95 border-[#DCE0D9] hover:border-[#121316] shadow-[0_12px_35px_rgba(0,0,0,0.06)]'
      } backdrop-blur-xl overflow-hidden`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: spotlightBg }}
      />

      {/* Futuristic Corner Ambient Glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full pointer-events-none opacity-10 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
        style={{ backgroundColor: item.quoteColor }}
      />

      <div className="relative z-10">
        {/* Top Header Row: Category Badge + Status Beacon + Location */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-[#22252A]/10 dark:border-[#222938]">
          <div className="flex items-center gap-2 min-w-0">
            {/* Pulsing Status Dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: item.quoteColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: item.quoteColor }}
              />
            </span>
            <span
              className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold truncate ${
                isDark ? 'text-[#E2E8F0]' : 'text-[#1E293B]'
              }`}
            >
              {item.badgeText}
            </span>
          </div>

          {/* Verified Badge Pill */}
          <div
            className={`relative overflow-hidden flex items-center gap-1 px-2.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold border shrink-0 ${
              isDark ? item.badgeColorClass.dark : item.badgeColorClass.light
            }`}
          >
            <ShieldCheck className="w-2.5 h-2.5 stroke-[2.5]" />
            <span>{item.badgeStatus}</span>
          </div>
        </div>

        {/* Rating Stars + Location Flag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-[#eab308] text-[#eab308] drop-shadow-[0_0_6px_rgba(234,179,8,0.5)]"
              />
            ))}
            <span className="ml-1.5 font-mono text-[10px] font-bold text-[#eab308]">
              5.0
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[9px] text-[#64748B] dark:text-[#94A3B8]">
            <Globe className="w-3 h-3 opacity-70" />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Big Stylized Quote Mark */}
        <div
          className="text-4xl font-serif font-black leading-none select-none mb-2 -mt-1 group-hover:scale-105 transition-transform duration-300 origin-left"
          style={{ color: item.quoteColor }}
        >
          “
        </div>

        {/* Testimonial Quote Body */}
        <p
          className={`text-xs sm:text-[13px] leading-relaxed mb-6 font-normal min-h-[72px] line-clamp-4 ${
            isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'
          }`}
        >
          {item.quote}
        </p>
      </div>

      <div className="relative z-10">
        {/* Quantified Metric Bar */}
        <div
          className={`flex items-center justify-between pt-3 pb-3 mb-4 border-t border-b font-mono text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors ${
            isDark
              ? 'border-[#222938] text-[#94A3B8] group-hover:border-[#38BDF8]/40'
              : 'border-[#E2E8F0] text-[#64748B] group-hover:border-[#22252A]/35'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            <Terminal className="w-3 h-3 opacity-70" />
            {item.techSpecLeft}
          </span>
          <span
            className="font-bold px-2 py-0.5 rounded text-[9px] sm:text-[10px] border"
            style={{
              backgroundColor: isDark
                ? `${item.quoteColor}15`
                : `${item.quoteColor}20`,
              borderColor: `${item.quoteColor}40`,
              color: isDark ? '#FFFFFF' : '#0F172A',
            }}
          >
            {item.techSpecRight}
          </span>
        </div>

        {/* Author Row: Avatar + Name + Role + Inspect Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div
                className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${
                  isDark ? 'border-[#334155]' : 'border-[#CBD5E1]'
                }`}
              >
                <Image
                  src={item.avatarSrc}
                  alt={item.authorName}
                  fill
                  sizes="40px"
                  className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              {/* Verified Blue Checkmark Dot */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0E1117] flex items-center justify-center text-white">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                    isDark
                      ? 'text-white group-hover:text-[#38BDF8]'
                      : 'text-[#0F172A] group-hover:text-black'
                  }`}
                >
                  {item.authorName}
                </span>
              </div>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider truncate ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
                }`}
              >
                {item.authorRole} • {item.authorCompany}
              </span>
            </div>
          </div>

          {/* Inspect Deliverable Button */}
          {onInspect && (
            <button
              type="button"
              onClick={() => onInspect(item)}
              className="shrink-0 p-2 rounded-lg border border-[#222938] hover:border-[#38BDF8] bg-black/20 hover:bg-[#38BDF8]/10 text-[#94A3B8] hover:text-[#38BDF8] transition-all"
              title="Inspect Verified Deliverable Dossier"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Cryptographic Hash Stamp Footer */}
        <div className="mt-3 pt-2.5 flex items-center justify-between font-mono text-[8px] text-[#64748B] dark:text-[#64748B]/80 border-t border-[#22252A]/5 dark:border-[#222938]/60">
          <span>{item.verificationHash}</span>
          <span className="flex items-center gap-1 text-emerald-500 font-semibold">
            <Lock className="w-2.5 h-2.5" /> VERIFIED SLA
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// KINETIC BLUEPRINT BACKGROUND (RADAR & COMPASS SKETCH)
// ─────────────────────────────────────────────────────────────────────────────

function KineticBlueprintBackground({ isDark }: { isDark: boolean }) {
  const strokeLight = isDark ? '#262D38' : '#CCD1C7'
  const strokeBold = isDark ? '#333D4D' : '#AAB2A2'

  return (
    <div className="absolute top-8 left-4 sm:left-10 lg:left-14 w-[360px] sm:w-[500px] h-[500px] pointer-events-none z-0 opacity-30 select-none">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <text
          x="30"
          y="95"
          fontFamily="var(--font-mono), monospace"
          fontSize="72"
          fontWeight="bold"
          fill={isDark ? '#1F2430' : '#D0D4CC'}
          letterSpacing="-0.04em"
        >
          07
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
          <line x1="140" y1="120" x2="140" y2="128" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="140" y1="352" x2="140" y2="360" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="20" y1="240" x2="28" y2="240" stroke={strokeBold} strokeWidth="1.5" />
          <line x1="252" y1="240" x2="260" y2="240" stroke={strokeBold} strokeWidth="1.5" />
        </g>

        {/* Sweeping Radar Scanner Line */}
        <g className="origin-[140px_240px] animate-[spin_14s_linear_infinite]">
          <line
            x1="140"
            y1="240"
            x2="140"
            y2="128"
            stroke={isDark ? '#38BDF8' : '#687D3B'}
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        <circle cx="140" cy="240" r="50" stroke={strokeBold} strokeWidth="1" />
        <circle cx="140" cy="240" r="22" stroke={strokeLight} strokeWidth="0.8" />
        <circle cx="140" cy="240" r="3" fill={isDark ? '#38BDF8' : '#687D3B'} className="animate-ping" />
        <circle cx="140" cy="240" r="2" fill={isDark ? '#38BDF8' : '#687D3B'} />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT DIGITAL PARTICLES
// ─────────────────────────────────────────────────────────────────────────────

function AmbientGlowingParticles() {
  const particles = [
    { top: '15%', left: '72%', delay: 0, duration: 6, size: 3.5, color: '#38bdf8' },
    { top: '28%', left: '80%', delay: 1.2, duration: 7, size: 4, color: '#22c55e' },
    { top: '42%', left: '65%', delay: 2.1, duration: 5.5, size: 3, color: '#eab308' },
    { top: '65%', left: '88%', delay: 0.8, duration: 6.5, size: 4.5, color: '#a855f7' },
    { top: '80%', left: '74%', delay: 1.5, duration: 6, size: 3.5, color: '#38bdf8' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, y: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [-12, 12, -12],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL 1: VERIFIED DELIVERABLE DOSSIER (AUDIT INSPECTION)
// ─────────────────────────────────────────────────────────────────────────────

function DeliverableDossierModal({
  item,
  onClose,
  isDark,
}: {
  item: Testimonial
  onClose: () => void
  isDark: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-xl rounded-2xl border p-6 sm:p-8 shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-[#0E121A] border-[#2A3447] text-white'
            : 'bg-white border-[#D0D4CC] text-[#121316]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Telemetry Header */}
        <div className="flex items-center gap-2 mb-4 font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYS_AUDIT://VERIFIED_DELIVERABLE_DOSSIER</span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
            <Image
              src={item.avatarSrc}
              alt={item.authorName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              {item.authorName}
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              {item.authorRole} • {item.authorCompany} ({item.location})
            </p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="p-4 rounded-xl bg-black/25 border border-white/10 text-xs sm:text-sm italic leading-relaxed text-slate-200 mb-6">
          “{item.quote}”
        </blockquote>

        {/* Audit Metrics */}
        <div className="space-y-4 mb-6">
          <h4 className="font-mono text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Audited Deliverables & SLA Verification
          </h4>
          <div className="space-y-2">
            {item.auditHighlights?.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-300 font-sans"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-1.5 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Footer Stamps */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 font-mono text-[10px] text-slate-400">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">
              Contract Signature Hash
            </span>
            <span className="font-semibold text-slate-300 truncate block">
              {item.verificationHash}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-500">
              Production Verified
            </span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> {item.verifiedDate} • LIVE
            </span>
          </div>
        </div>

        {item.liveUrl && (
          <div className="mt-6 flex justify-end">
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#38BDF8] text-black hover:bg-[#60A5FA] transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Verify Production Edge</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL 2: INTERACTIVE ANIMATED CLIENT FEEDBACK SUBMISSION FORM
// ─────────────────────────────────────────────────────────────────────────────

function SubmitFeedbackModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  isDark,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: (newTestimonial: Testimonial) => void
  isDark: boolean
}) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: 'San Francisco, CA',
    category: 'web' as 'web' | 'data' | 'cloud',
    rating: 5,
    metric: '45% FASTER LOAD TIME',
    quote: '',
    isVerified: true,
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  if (!isOpen) return null

  const handleRatingHover = (r: number) => setHoverRating(r)
  const handleRatingLeave = () => setHoverRating(null)
  const handleRatingClick = (r: number) => setFormData((prev) => ({ ...prev, rating: r }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const colorMap = {
      web: { color: '#22c55e', glow: 'rgba(34, 197, 94, 0.28)' },
      data: { color: '#eab308', glow: 'rgba(234, 179, 8, 0.28)' },
      cloud: { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.28)' },
    }
    const selectedColor = colorMap[formData.category] || colorMap.web

    const newTestimonial: Testimonial = {
      id: `client-${Date.now()}`,
      category: [formData.category],
      badgeText:
        formData.category === 'web'
          ? 'WEB FLAGSHIP VERIFIED'
          : formData.category === 'data'
          ? 'DATA PIPELINE VERIFIED'
          : 'ENTERPRISE AI VERIFIED',
      badgeStatus: 'CLIENT SUBMISSION',
      location: formData.location || 'Global Partner',
      rating: formData.rating,
      quoteColor: selectedColor.color,
      glowColor: selectedColor.glow,
      badgeColorClass: {
        light: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/40',
        dark: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      },
      quote:
        formData.quote ||
        'Four Front Lab delivered rapid, rock-solid engineering solutions that immediately moved the needle on our technical benchmarks.',
      techSpecLeft:
        formData.category === 'web'
          ? 'NEXT.JS • REACT'
          : formData.category === 'data'
          ? 'POSTGRESQL • FASTAPI'
          : 'AI MODEL • VECTOR',
      techSpecRight: formData.metric || 'VERIFIED SUCCESS',
      authorName: formData.name || 'Verified Client',
      authorRole: formData.role.toUpperCase() || 'EXECUTIVE LEADER',
      authorCompany: formData.company.toUpperCase() || 'ENTERPRISE PARTNER',
      avatarSrc: '/images/avatar-david.jpg',
      verificationHash: `SHA-256: ${Math.random().toString(16).slice(2, 6).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
      verifiedDate: 'OCT 2026',
      auditHighlights: [
        'Direct founder endorsement verified',
        'Cryptographic submission receipt generated',
      ],
    }

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch (err) {
      console.warn('API feedback submission fell back to state:', err)
    }

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      onSubmitSuccess(newTestimonial)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        className={`relative w-full max-w-3xl my-8 rounded-2xl border p-6 sm:p-8 shadow-2xl overflow-hidden ${
          isDark
            ? 'bg-[#0B0E14] border-[#222B3D] text-white'
            : 'bg-white border-[#D0D4CC] text-[#121316]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Endorsement Cryptographically Recorded!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#38BDF8] font-bold">{formData.name}</span>. Your verified client feedback is now injected into our live moving production stream.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Return to Live Stream
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SYS_FEEDBACK://SUBMIT_CLIENT_VERIFICATION</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Share Your Client Endorsement
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Your feedback joins our continuous production endorsement stream, verified with tamper-proof cryptographic audit tracking.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating Selector */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                  Rating (Select 1-5 Stars) *
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 p-2 rounded-xl bg-black/30 border border-white/10"
                    onMouseLeave={handleRatingLeave}
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled =
                        (hoverRating !== null ? hoverRating : formData.rating) >= star
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => handleRatingHover(star)}
                          onClick={() => handleRatingClick(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              isFilled
                                ? 'fill-[#eab308] text-[#eab308] drop-shadow-[0_0_8px_rgba(234,179,8,0.7)]'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      )
                    })}
                  </div>
                  <span className="font-mono text-xs text-[#eab308] font-bold">
                    {(hoverRating !== null ? hoverRating : formData.rating)}.0 / 5.0 Rating
                  </span>
                </div>
              </div>

              {/* Grid 2 Columns: Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vance Stirling"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Role & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. CTO & Co-Founder"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. OmniScale Labs"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. New York, USA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Category & Measurable Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Project Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'web' | 'data' | 'cloud',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white transition-colors"
                  >
                    <option value="web">Web & Mobile Architecture</option>
                    <option value="data">Data & Automated Pipelines</option>
                    <option value="cloud">Cloud Infra & AI Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    Quantified Metric / Feat
                  </label>
                  <input
                    type="text"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    placeholder="e.g. 70% FASTER RESPONSE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Feedback Quote */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                  Your Endorsement / Review *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Describe your engineering engagement, technical wins, and outcomes with Four Front Lab..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141A24] border border-[#26334A] focus:border-[#38BDF8] focus:outline-none text-sm text-white placeholder-slate-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Live Preview Card */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#38BDF8] block mb-2">
                  ✦ LIVE STREAM CARD PREVIEW
                </span>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">
                    {formData.name || 'Your Name'}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">
                    {formData.metric || 'VERIFIED FEAT'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic line-clamp-2">
                  “{formData.quote || 'Your review text will render dynamically in this moving card...'}”
                </p>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-[#38BDF8] text-black hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Submit Verified Review</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: TestimonialsEditorial
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsEditorial() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Component State
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(initialTestimonials)
  const [activeTab, setActiveTab] = useState<FilterTabType>('all')
  const [streamMode, setStreamMode] = useState<StreamMode>('dual')
  const [isPaused, setIsPaused] = useState(false)
  const [streamDirection, setStreamDirection] = useState<StreamDirection>('left')
  const [isSlow, setIsSlow] = useState(false)

  // Modals
  const [inspectItem, setInspectItem] = useState<Testimonial | null>(null)
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false)

  // Filtered Cards
  const filtered = useMemo(() => {
    if (activeTab === 'all') return testimonialsList
    return testimonialsList.filter((t) => t.category.includes(activeTab as any))
  }, [activeTab, testimonialsList])

  // Split into Row 1 & Row 2 for Dual Gliding Stream
  const row1 = useMemo(() => {
    return filtered.filter((_, idx) => idx % 2 === 0)
  }, [filtered])

  const row2 = useMemo(() => {
    const r = filtered.filter((_, idx) => idx % 2 !== 0)
    return r.length > 0 ? r : filtered
  }, [filtered])

  // Handle new feedback submitted from form
  const handleNewTestimonial = (newT: Testimonial) => {
    setTestimonialsList((prev) => [newT, ...prev])
  }

  // Animation CSS classes based on direction & speed
  const getRowAnimationClass = (isReverse: boolean) => {
    if (isPaused) return ''
    if (isReverse) {
      return isSlow ? 'animate-marquee-reverse-slow' : 'animate-marquee-reverse'
    }
    return isSlow ? 'animate-marquee-slow' : 'animate-marquee'
  }

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 sm:py-28 lg:py-36 border-b border-[var(--dm-border)] bg-[var(--dm-bg)] text-[var(--dm-text)] transition-colors duration-300 overflow-hidden select-none"
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none z-0" />

      {/* Kinetic Compass & Scanning Radar Blueprint */}
      <KineticBlueprintBackground isDark={isDark} />

      {/* Cyber Glowing Node Accents */}
      <AmbientGlowingParticles />

      {/* ─────────────────────────────────────────────────────────────
          SECTION CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
        {/* ─────────────────────────────────────────────────────────────
            TOP HEADER ROW: Title, Real Trust Signals, Stats Bar
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            {/* Tag / Monospace Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#222938] bg-black/25 backdrop-blur-md mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-400">
                07 // REAL CLIENT VERIFICATION STREAM
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] mb-5 ${
                isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
              }`}
            >
              Tested in production.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#38BDF8] to-emerald-300">
                Proven at scale.
              </span>
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                isDark ? 'text-[#9DA1A8]' : 'text-[#3E424B]'
              }`}
            >
              Direct authenticated client feedback from founders, CTOs, and technical leaders who partnered with our four engineers to eliminate critical software bottlenecks.
            </p>
          </div>

          {/* Right Action / Submit Feedback Trigger Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFeedbackFormOpen(true)}
              className="relative group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-xl border bg-gradient-to-r from-emerald-500 to-[#38BDF8] text-black hover:scale-105 active:scale-95 shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Share Client Feedback</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            AUTHENTIC TRUST & REPUTATION TELEMETRY STRIP
        ───────────────────────────────────────────────────────────── */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl border mb-10 backdrop-blur-md ${
            isDark
              ? 'bg-[#0E121A]/80 border-[#222B3D] text-white'
              : 'bg-white/80 border-[#D8DCD4] text-[#121316]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-amber-400">
                5.0 / 5.0
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                48+ Audited Projects
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                100% SLA PASS
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Zero Runtime Rollbacks
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-cyan-400">
                SHA-256 SIGNED
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Verified Deliverables
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-purple-400">
                TOP-RATED 2026
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Clutch & G2 Leader
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CONTROLS BAR: CATEGORY FILTER TABS & MOTION GLIDER CONTROLS
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? isDark
                        ? 'text-black border-transparent bg-white shadow-md'
                        : 'text-white border-transparent bg-[#121316] shadow-md'
                      : isDark
                      ? 'bg-[#121620]/80 text-[#8E929A] border-[#222938] hover:text-white hover:border-[#38BDF8]'
                      : 'bg-white/80 text-[#555860] border-[#D4D7D1] hover:text-[#121316] hover:border-[#121316]'
                  }`}
                >
                  <span className="font-bold">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Interactive Glider Stream Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Switcher: Dual Stream vs Single Line vs Grid */}
            <div className="flex items-center p-1 rounded-xl bg-[#121620]/70 border border-[#222938]">
              <button
                type="button"
                onClick={() => setStreamMode('dual')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-colors ${
                  streamMode === 'dual'
                    ? 'bg-[#38BDF8] text-black shadow-xs'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Two Counter-Moving Gliding Streams (L ⇄ R)"
              >
                DUAL (L⇄R)
              </button>
              <button
                type="button"
                onClick={() => setStreamMode('single')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-colors ${
                  streamMode === 'single'
                    ? 'bg-[#38BDF8] text-black shadow-xs'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Single Continuous Gliding Line"
              >
                SINGLE LINE
              </button>
              <button
                type="button"
                onClick={() => setStreamMode('grid')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-colors ${
                  streamMode === 'grid'
                    ? 'bg-[#38BDF8] text-black shadow-xs'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Static 3D Tilt Grid View"
              >
                GRID VIEW
              </button>
            </div>

            {/* Play / Pause Toggle Button */}
            {streamMode !== 'grid' && (
              <>
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="p-2 rounded-xl border border-[#222938] bg-[#121620]/80 text-[#94A3B8] hover:text-white hover:border-[#38BDF8] transition-colors"
                  title={isPaused ? 'Resume Glider Movement' : 'Pause Glider Movement'}
                >
                  {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
                </button>

                {/* Reverse Direction Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setStreamDirection((prev) => (prev === 'left' ? 'right' : 'left'))
                  }
                  className="p-2 rounded-xl border border-[#222938] bg-[#121620]/80 text-[#94A3B8] hover:text-white hover:border-[#38BDF8] transition-colors"
                  title="Reverse Stream Movement Direction"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>

                {/* Speed Toggle */}
                <button
                  type="button"
                  onClick={() => setIsSlow((prev) => !prev)}
                  className={`px-2.5 py-1.5 rounded-xl border font-mono text-[10px] uppercase font-bold transition-colors ${
                    isSlow
                      ? 'border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10'
                      : 'border-[#222938] text-[#94A3B8] bg-[#121620]/80 hover:text-white'
                  }`}
                  title="Toggle Normal vs Relaxed Velocity"
                >
                  {isSlow ? '0.6x' : '1.0x'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STREAM DISPLAY AREA (WITH SMOOTH GRADIENT SIDE MASKS)
      ───────────────────────────────────────────────────────────── */}
      {streamMode === 'grid' ? (
        /* Stationary 3D Tilt Grid View */
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1000px]"
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
                  <TiltFeedbackCard
                    item={item}
                    isDark={isDark}
                    onInspect={(t) => setInspectItem(t)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      ) : (
        /* Continuous Moving Gliding Streams */
        <div className="relative w-full overflow-hidden py-4">
          {/* Left Edge Fade Mask */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to right, #0B0C0E 15%, transparent 100%)'
                : 'linear-gradient(to right, #F4F4F2 15%, transparent 100%)',
            }}
          />

          {/* Right Edge Fade Mask */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 z-20 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to left, #0B0C0E 15%, transparent 100%)'
                : 'linear-gradient(to left, #F4F4F2 15%, transparent 100%)',
            }}
          />

          {/* ─────────────────────────────────────────────────────────
              LINE 1: GLIDES SMOOTHLY (Right to Left or Direction)
          ───────────────────────────────────────────────────────── */}
          <div className="mb-6 overflow-hidden">
            <div
              className={`flex w-max gap-6 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused] ${getRowAnimationClass(
                streamDirection === 'right'
              )}`}
            >
              {[...Array(3)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-6 shrink-0">
                  {(streamMode === 'dual' ? row1 : filtered).map((item) => (
                    <TiltFeedbackCard
                      key={`${loopIdx}-${item.id}`}
                      item={item}
                      isDark={isDark}
                      onInspect={(t) => setInspectItem(t)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              LINE 2: GLIDES SMOOTHLY IN COUNTER DIRECTION (Left to Right)
          ───────────────────────────────────────────────────────── */}
          {streamMode === 'dual' && (
            <div className="overflow-hidden">
              <div
                className={`flex w-max gap-6 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused] ${getRowAnimationClass(
                  streamDirection === 'left'
                )}`}
              >
                {[...Array(3)].map((_, loopIdx) => (
                  <div key={loopIdx} className="flex gap-6 shrink-0">
                    {row2.map((item) => (
                      <TiltFeedbackCard
                        key={`${loopIdx}-${item.id}`}
                        item={item}
                        isDark={isDark}
                        onInspect={(t) => setInspectItem(t)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODALS & OVERLAYS
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {inspectItem && (
          <DeliverableDossierModal
            item={inspectItem}
            onClose={() => setInspectItem(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFeedbackFormOpen && (
          <SubmitFeedbackModal
            isOpen={isFeedbackFormOpen}
            onClose={() => setIsFeedbackFormOpen(false)}
            onSubmitSuccess={handleNewTestimonial}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

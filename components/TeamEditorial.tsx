'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'
import { useTheme } from './ThemeProvider'
import {
  Github,
  Linkedin,
  Sparkles,
  ExternalLink,
  Menu,
  Twitter,
  Search,
  Volume2,
  VolumeX,
  Activity,
  Cpu,
  Layers,
  TrendingUp,
  X,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Maximize2,
  Zap,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBER DEFINITIONS & EXTENDED DOSSIER DATA
// ─────────────────────────────────────────────────────────────────────────────

interface SkillItem {
  name: string
  level: number
}

interface TeamMember {
  id: string
  num: string
  name: string
  role: string
  headline: string
  description: string
  githubUrl: string
  linkedinUrl: string
  officialAvatarUrl: string
  fallbackAvatarUrl: string
  initials: string
  specCode: string
  staggerClass: string
  frontType: 'frontend' | 'backend' | 'design' | 'strategy'
  skills: SkillItem[]
  philosophy: string
  keyDeliverables: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: '01',
    num: '01',
    name: 'M. Taha Nadeem',
    role: 'FRONTEND / ENGINEERING',
    headline: 'Engineering 120 FPS Immersive Web Interfaces',
    description:
      'Architecting responsive, highly interactive frontend experiences that fuse robust engineering with premium aesthetics.',
    githubUrl: 'https://github.com/MTahaNadeem',
    linkedinUrl: 'https://linkedin.com/in/mtahanadeem',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/184400188?v=4',
    fallbackAvatarUrl: '/images/team/taha-reference.webp',
    initials: 'TN',
    specCode: 'LEAD // 001',
    staggerClass: 'lg:translate-y-0',
    frontType: 'frontend',
    skills: [
      { name: 'Next.js 15 / React 19', level: 98 },
      { name: 'TypeScript & WebGL / Three.js', level: 94 },
      { name: 'Framer Motion & Canvas Math', level: 96 },
      { name: 'Core Web Vitals & Zero-Jank Perf', level: 95 },
    ],
    philosophy:
      'If an interface doesn’t react with instantaneous tactile fluidity and pristine typographic balance, it simply isn’t production-ready.',
    keyDeliverables: [
      'Micro-interaction physics & custom canvas engines',
      'Ultra-fluid Server Component data hydration',
      'Hardware-accelerated CSS and 3D transforms',
      'Flawless cross-browser responsive execution',
    ],
  },
  {
    id: '02',
    num: '02',
    name: 'Abdul Haseeb',
    role: 'BACKEND / ARCHITECTURE',
    headline: 'Orchestrating Resilient Scalable Cloud Infrastructures',
    description:
      'Designing resilient backend architectures and optimized data pipelines that scale reliably under pressure.',
    githubUrl: 'https://github.com/haseeb786-code',
    linkedinUrl: 'https://linkedin.com/in/abdul-haseeb',
    officialAvatarUrl: '/images/team/abdul-haseeb.webp',
    fallbackAvatarUrl: '/images/team/abdul-haseeb.png',
    initials: 'AH',
    specCode: 'CORE // 002',
    staggerClass: 'lg:translate-y-4 xl:translate-y-6',
    frontType: 'backend',
    skills: [
      { name: 'Distributed Systems & Microservices', level: 96 },
      { name: 'Node.js & Python / FastAPI', level: 95 },
      { name: 'PostgreSQL, Prisma & Redis Caching', level: 94 },
      { name: 'Docker, Kubernetes & Cloud CI/CD', level: 92 },
    ],
    philosophy:
      'Resilience is never an afterthought. We build distributed architectures that absorb volatility, isolate failures, and scale without friction.',
    keyDeliverables: [
      'Low-latency REST & gRPC API orchestration',
      'Real-time event streaming and queue handling',
      'Strict database indexing and query optimization',
      'Self-healing containerized deployments',
    ],
  },
  {
    id: '03',
    num: '03',
    name: 'Syed Haseeb Badshah',
    role: 'UX/UI / DESIGN SYSTEM',
    headline: 'Crafting High-Order Design Systems & Emotional UX',
    description:
      'Crafting intuitive user interfaces and cohesive design systems that elevate brand identity and user engagement.',
    githubUrl: 'https://github.com/syed-haseeb-badshah',
    linkedinUrl: 'https://linkedin.com/in/syed-haseeb-badshah',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/286664773?v=4',
    fallbackAvatarUrl: '/images/team/syed-reference.webp',
    initials: 'SB',
    specCode: 'SYSTEM // 003',
    staggerClass: 'lg:translate-y-12 xl:translate-y-16',
    frontType: 'design',
    skills: [
      { name: 'Design Token Governance & Systems', level: 98 },
      { name: 'Figma Enterprise & Interactive States', level: 96 },
      { name: 'Micro-Interactions & Spatial Layouts', level: 94 },
      { name: 'Accessibility (WCAG AAA Compliance)', level: 93 },
    ],
    philosophy:
      'Design is the invisible engineering that bridges brutal complexity into effortless intuition. Every pixel carries intent and hierarchy.',
    keyDeliverables: [
      'Comprehensive multi-theme design tokens',
      'Enterprise Figma component libraries',
      'User journey mapping & friction reduction',
      'High-contrast accessible color sciences',
    ],
  },
  {
    id: '04',
    num: '04',
    name: 'Raja Mustafa',
    role: 'STRATEGY / GROWTH',
    headline: 'Accelerating Market Capture & Unit Economics',
    description:
      'Driving business growth through data-driven strategy and targeted product positioning for long-term impact.',
    githubUrl: 'https://github.com/Raja-Mustafa',
    linkedinUrl: 'https://linkedin.com/in/raja-mustafa',
    officialAvatarUrl: '/images/team/mustafa.webp',
    fallbackAvatarUrl: '/images/team/mustafa.png',
    initials: 'RM',
    specCode: 'SCALE // 004',
    staggerClass: 'lg:translate-y-20 xl:translate-y-24',
    frontType: 'strategy',
    skills: [
      { name: 'GTM Strategy & Product Positioning', level: 96 },
      { name: 'Viral Growth Loops & CAC/LTV Ratios', level: 95 },
      { name: 'Funnel Optimization & CRO Mastery', level: 94 },
      { name: 'Data Telemetry & Predictive Analytics', level: 92 },
    ],
    philosophy:
      'Exceptional engineering is only as valuable as the distribution engine driving it. We position products to dominate market mindshare.',
    keyDeliverables: [
      'Data-driven product monetization models',
      'Conversion rate optimization audit & lift',
      'Viral referral loops & acquisition channels',
      'Strategic market differentiation frameworks',
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ZERO-DEPENDENCY WEB AUDIO API SFX ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function playTacticalSfx(type: 'hover' | 'lock' | 'click' | 'dossier') {
  if (typeof window === 'undefined') return
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    if (type === 'hover') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.035)
      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.045)
    } else if (type === 'lock') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1400, now)
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.05)
      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.07)
    } else if (type === 'click') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1100, now)
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.045)
      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
    } else if (type === 'dossier') {
      // Sci-fi two-tone confirm
      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.setValueAtTime(880, now + 0.05)
      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.14)
    }
  } catch {
    // Audio context may be restricted by browser until user interaction
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL WIREFRAME / MONOGRAM FALLBACK AVATAR
// ─────────────────────────────────────────────────────────────────────────────

function BlueprintAvatarFallback({
  initials,
  specCode,
  isDark,
}: {
  initials: string
  specCode: string
  isDark: boolean
}) {
  const strokeColor = isDark ? '#c8f542' : '#2D3139'
  const textColor = isDark ? '#ffffff' : '#121316'
  const subColor = isDark ? '#6b6b6b' : '#767A82'

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#111111]' : 'bg-[#E3E3DF]'
      }`}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${strokeColor} 1px, transparent 1px), linear-gradient(to bottom, ${strokeColor} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      >
        <circle cx="50" cy="50" r="38" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
        <circle cx="50" cy="50" r="24" stroke={strokeColor} strokeWidth="0.5" fill="none" />
        <line x1="50" y1="6" x2="50" y2="94" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="6" y1="50" x2="94" y2="50" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="text-3xl sm:text-4xl font-extrabold tracking-tighter font-mono"
          style={{ color: textColor }}
        >
          {initials}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.25em] mt-1"
          style={{ color: subColor }}
        >
          {specCode}
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SAFE AVATAR COMPONENT WITH DYNAMIC FALLBACK
// ─────────────────────────────────────────────────────────────────────────────

function MemberPortrait({
  member,
  isDark,
}: {
  member: TeamMember
  isDark: boolean
}) {
  const [imgSrc, setImgSrc] = useState<string>(member.officialAvatarUrl)
  const [loadError, setLoadError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    if (imgSrc !== member.fallbackAvatarUrl) {
      setImgSrc(member.fallbackAvatarUrl)
    } else {
      setLoadError(true)
    }
  }

  if (loadError) {
    return (
      <BlueprintAvatarFallback
        initials={member.initials}
        specCode={member.specCode}
        isDark={isDark}
      />
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#DFDFDB]">
      {isLoading && (
        <div
          className={`absolute inset-0 z-10 animate-pulse ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-200'
          }`}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={`${member.name} - ${member.role}`}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROLE-SPECIFIC "COMMAND FRONT" INTERACTIVE VISUALIZERS
// ─────────────────────────────────────────────────────────────────────────────

function FrontDomainEngine({
  frontType,
  isHovered,
}: {
  frontType: TeamMember['frontType']
  isHovered: boolean
}) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0 z-30 overflow-hidden pointer-events-none"
        >
          {/* FRONT 01: FRONTEND / ENGINEERING (Matrix Code & 120FPS GPU Canvas) */}
          {frontType === 'frontend' && (
            <div className="w-full h-full bg-[#0B0C0E]/88 backdrop-blur-[3px] p-3 flex flex-col justify-between font-mono text-[9px] text-[#c8f542]">
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-[#c8f542]/30 pb-1.5">
                <span className="flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-ping" />
                  DOM MATRIX
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#c8f542]/20 text-[8.5px] font-bold text-white">
                  120.0 FPS
                </span>
              </div>

              {/* Kinetic Code Tokens */}
              <div className="space-y-1.5 text-[8.5px] leading-tight my-auto opacity-95">
                <div className="text-white/90 font-semibold">
                  &lt;<span className="text-[#c8f542]">MotionCanvas</span> shader=&quot;fluid&quot; /&gt;
                </div>
                <div className="text-white/60">GPU.dispatch(&apos;compute&apos;, 60);</div>
                <div className="text-[#38bdf8]">
                  const [spring] = useSpring(&#123; damping: 24 &#125;);
                </div>
                <div className="text-[#c8f542]/80 font-mono">
                  DOM.hydrate(&apos;zero-layout-shift&apos;);
                </div>
              </div>

              {/* Bottom Telemetry */}
              <div className="flex items-center justify-between pt-1 border-t border-[#c8f542]/25 text-[8px] text-white/70">
                <span>HYDRATION // INSTANT</span>
                <span className="text-[#c8f542] font-semibold">TURBOPACK 15</span>
              </div>
            </div>
          )}

          {/* FRONT 02: BACKEND / ARCHITECTURE (Distributed Nodes & Microservices) */}
          {frontType === 'backend' && (
            <div className="w-full h-full bg-[#0B0C0E]/90 backdrop-blur-[3px] p-3 flex flex-col justify-between font-mono text-[9px] text-[#38bdf8]">
              <div className="flex items-center justify-between border-b border-[#38bdf8]/30 pb-1.5">
                <span className="flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                  ARCH PIPELINE
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#38bdf8]/20 text-[8.5px] font-bold text-white">
                  99.99% SLA
                </span>
              </div>

              {/* 4 Microservice Topology Nodes */}
              <div className="grid grid-cols-2 gap-1.5 my-auto text-[8px]">
                <div className="p-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-center">
                  <div className="text-white font-bold">API GATEWAY</div>
                  <div className="text-[#38bdf8] text-[7.5px]">12ms latency</div>
                </div>
                <div className="p-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-center">
                  <div className="text-white font-bold">KAFKA STREAM</div>
                  <div className="text-[#38bdf8] text-[7.5px]">14.2k evt/s</div>
                </div>
                <div className="p-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-center">
                  <div className="text-white font-bold">POSTGRES DB</div>
                  <div className="text-[#38bdf8] text-[7.5px]">ACID Pooled</div>
                </div>
                <div className="p-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-center">
                  <div className="text-white font-bold">REDIS CACHE</div>
                  <div className="text-[#38bdf8] text-[7.5px]">98.6% Hit</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#38bdf8]/25 text-[8px] text-white/70">
                <span>K8S // ZERO DOWNTIME</span>
                <span className="text-[#38bdf8] font-semibold">TLS 1.3 SYNC</span>
              </div>
            </div>
          )}

          {/* FRONT 03: UX/UI DESIGN SYSTEM (Interactive Bézier & Tokens) */}
          {frontType === 'design' && (
            <div className="w-full h-full bg-[#0B0C0E]/90 backdrop-blur-[3px] p-3 flex flex-col justify-between font-mono text-[9px] text-[#f472b6]">
              <div className="flex items-center justify-between border-b border-[#f472b6]/30 pb-1.5">
                <span className="flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] animate-ping" />
                  DESIGN MATRIX
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#f472b6]/20 text-[8.5px] font-bold text-white">
                  8PT GRID
                </span>
              </div>

              {/* Bézier SVG Curve with Anchors */}
              <div className="relative my-auto py-1 flex flex-col items-center">
                <svg viewBox="0 0 150 48" className="w-full h-11 stroke-[#f472b6] fill-none">
                  <line
                    x1="10"
                    y1="40"
                    x2="45"
                    y2="8"
                    stroke="#f472b6"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                  <line
                    x1="140"
                    y1="8"
                    x2="105"
                    y2="40"
                    stroke="#f472b6"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                  <path d="M 10 40 C 45 8, 105 40, 140 8" stroke="#f472b6" strokeWidth="2" />
                  <circle cx="45" cy="8" r="2.5" fill="#f472b6" />
                  <circle cx="105" cy="40" r="2.5" fill="#f472b6" />
                  <circle cx="10" cy="40" r="2.5" fill="#ffffff" />
                  <circle cx="140" cy="8" r="2.5" fill="#ffffff" />
                </svg>

                {/* Floating Token Swatches */}
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="px-1 py-0.5 rounded bg-[#c8f542]/20 text-[#c8f542] text-[7.5px] border border-[#c8f542]/30">
                    #C8F542
                  </span>
                  <span className="px-1 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] text-[7.5px] border border-[#38bdf8]/30">
                    #38BDF8
                  </span>
                  <span className="px-1 py-0.5 rounded bg-[#f472b6]/20 text-[#f472b6] text-[7.5px] border border-[#f472b6]/30">
                    #F472B6
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f472b6]/25 text-[8px] text-white/70">
                <span>TOKENS // AUTO-SYNC</span>
                <span className="text-[#f472b6] font-semibold">WCAG AAA</span>
              </div>
            </div>
          )}

          {/* FRONT 04: STRATEGY / GROWTH (Telemetry Growth Vector & Parabola) */}
          {frontType === 'strategy' && (
            <div className="w-full h-full bg-[#0B0C0E]/90 backdrop-blur-[3px] p-3 flex flex-col justify-between font-mono text-[9px] text-[#f59e0b]">
              <div className="flex items-center justify-between border-b border-[#f59e0b]/30 pb-1.5">
                <span className="flex items-center gap-1.5 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
                  GROWTH VECTOR
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#f59e0b]/20 text-[8.5px] font-bold text-white">
                  10X SCALE
                </span>
              </div>

              {/* Glowing SVG Parabolic Growth Curve */}
              <div className="relative my-auto py-1">
                <svg viewBox="0 0 150 50" className="w-full h-11">
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="10"
                    y1="45"
                    x2="145"
                    y2="45"
                    stroke="#f59e0b"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    opacity="0.3"
                  />
                  <path d="M 10 45 Q 65 42, 105 26 T 145 8 L 145 45 Z" fill="url(#growthGrad)" />
                  <path d="M 10 45 Q 65 42, 105 26 T 145 8" stroke="#f59e0b" strokeWidth="2.2" fill="none" />
                  <circle cx="145" cy="8" r="3" fill="#f59e0b" />
                  <circle cx="145" cy="8" r="6" stroke="#f59e0b" strokeWidth="1" className="animate-ping" />
                </svg>

                <div className="flex items-center justify-between text-[8px] mt-1 text-white/90">
                  <span>
                    LTV:CAC // <strong className="text-[#f59e0b]">7.2:1</strong>
                  </span>
                  <span>
                    ARR // <strong className="text-[#f59e0b]">+340%</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f59e0b]/25 text-[8px] text-white/70">
                <span>POSITIONING ENGINE</span>
                <span className="text-[#f59e0b] font-semibold">MAX CONVERSION</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D HOLOGRAPHIC PARALLAX CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function HolographicCard({
  member,
  index,
  isDark,
  activeHoverIndex,
  setActiveHoverIndex,
  onOpenDossier,
  soundEnabled,
}: {
  member: TeamMember
  index: number
  isDark: boolean
  activeHoverIndex: number | null
  setActiveHoverIndex: (idx: number | null) => void
  onOpenDossier: (member: TeamMember) => void
  soundEnabled: boolean
}) {
  const isHovered = activeHoverIndex === index

  // Framer Motion 3D Physics Springs
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 22, stiffness: 220 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseEnter = () => {
    setActiveHoverIndex(index)
    if (soundEnabled) playTacticalSfx('hover')
  }

  const handleMouseLeave = () => {
    setActiveHoverIndex(null)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1200 }}
      className="relative flex flex-col h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`group relative flex flex-col justify-between h-full rounded-xl p-4 sm:p-5 border transition-all duration-300 ${
          isDark
            ? isHovered
              ? 'bg-[#151820] border-[#c8f542]/80 shadow-[0_16px_48px_rgba(200,245,66,0.18)]'
              : 'bg-[#14161B] border-[#252A34] shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
            : isHovered
            ? 'bg-white border-[#121316] shadow-[0_20px_40px_rgba(0,0,0,0.12)]'
            : 'bg-white border-[#D4D7D1] shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
        } backdrop-blur-md cursor-pointer`}
      >
        {/* Prismatic Dynamic Holographic Glare Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: useMotionTemplate`radial-gradient(circle 320px at ${glareX} ${glareY}, ${
              isDark ? 'rgba(200, 245, 66, 0.35)' : 'rgba(255, 255, 255, 0.65)'
            }, transparent 75%)`,
          }}
        />

        {/* 1. Inset Portrait Frame with Thin Architectural Border */}
        <div
          style={{ transform: 'translateZ(26px)' }}
          className={`relative w-full aspect-[4/5] rounded-md overflow-hidden border mb-4 transition-colors duration-300 ${
            isDark
              ? isHovered
                ? 'border-[#c8f542]/70'
                : 'border-[#2A2F3A]'
              : isHovered
              ? 'border-[#121316]'
              : 'border-[#22252A]'
          }`}
        >
          {/* Main Portrait with safe fallback */}
          <MemberPortrait member={member} isDark={isDark} />

          {/* Tactical Corner HUD Lock Brackets */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <span
              className={`absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 ${
                isHovered
                  ? 'border-[#c8f542] scale-110'
                  : isDark
                  ? 'border-white/20'
                  : 'border-black/20'
              }`}
            />
            <span
              className={`absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 ${
                isHovered
                  ? 'border-[#c8f542] scale-110'
                  : isDark
                  ? 'border-white/20'
                  : 'border-black/20'
              }`}
            />
            <span
              className={`absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 ${
                isHovered
                  ? 'border-[#c8f542] scale-110'
                  : isDark
                  ? 'border-white/20'
                  : 'border-black/20'
              }`}
            />
            <span
              className={`absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 ${
                isHovered
                  ? 'border-[#c8f542] scale-110'
                  : isDark
                  ? 'border-white/20'
                  : 'border-black/20'
              }`}
            />
          </div>

          {/* Vertical Laser Biometric Scanline on Hover */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={
              isHovered
                ? { y: ['-100%', '240%'], opacity: [0, 0.9, 0.9, 0] }
                : { y: '-100%', opacity: 0 }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="pointer-events-none absolute inset-x-0 h-12 z-20"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(200, 245, 66, 0.3), rgba(200, 245, 66, 0.75), transparent)',
              boxShadow: '0 0 16px rgba(200, 245, 66, 0.65)',
            }}
          />

          {/* Role-Specific "Command Front" Interactive Visualizer Engine */}
          <FrontDomainEngine frontType={member.frontType} isHovered={isHovered} />

          {/* Top-Right Badge: Spec Code */}
          <div
            style={{ transform: 'translateZ(38px)' }}
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-semibold border backdrop-blur-md z-30 transition-all ${
              isDark
                ? isHovered
                  ? 'bg-[#c8f542] text-black border-[#c8f542]'
                  : 'bg-[#0B0C0E]/85 text-[#c8f542] border-[#2A2F3A]'
                : isHovered
                ? 'bg-[#121316] text-[#c8f542] border-[#121316]'
                : 'bg-[#F4F4F1]/90 text-[#121316] border-[#22252A]'
            }`}
          >
            {member.specCode}
          </div>

          {/* Live Status Pill: bottom left */}
          <div
            style={{ transform: 'translateZ(38px)' }}
            className={`absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[8.5px] uppercase tracking-wider border backdrop-blur-md z-30 ${
              isDark
                ? 'bg-[#0B0C0E]/80 text-white/80 border-white/10'
                : 'bg-white/90 text-neutral-800 border-neutral-300'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isHovered ? 'bg-[#c8f542] animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span>{isHovered ? 'ENGAGED' : 'ONLINE'}</span>
          </div>
        </div>

        {/* 2. Member Name & Role */}
        <div style={{ transform: 'translateZ(30px)' }}>
          <h3
            className={`text-lg sm:text-xl font-bold tracking-tight mb-1 transition-colors ${
              isDark
                ? isHovered
                  ? 'text-[#c8f542]'
                  : 'text-[#F5F5F0]'
                : isHovered
                ? 'text-black'
                : 'text-[#121316]'
            }`}
          >
            {member.name}
          </h3>

          <div
            className={`w-full h-px mb-2 transition-colors ${
              isHovered
                ? isDark
                  ? 'bg-[#c8f542]/60'
                  : 'bg-black'
                : isDark
                ? 'bg-[#2A2F3A]'
                : 'bg-[#22252A]/25'
            }`}
          />

          <span
            className={`block font-mono text-[10px] tracking-[0.16em] uppercase font-bold mb-2.5 ${
              isDark ? 'text-[#8E929A]' : 'text-[#484D56]'
            }`}
          >
            {member.role}
          </span>

          <p
            className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
              isDark ? 'text-[#9DA1A8]' : 'text-[#40444C]'
            }`}
          >
            {member.description}
          </p>
        </div>

        {/* 3. Interactive Quick Dossier Launcher Button */}
        <div style={{ transform: 'translateZ(34px)' }} className="mb-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (soundEnabled) playTacticalSfx('dossier')
              onOpenDossier(member)
            }}
            className={`w-full py-1.5 px-2.5 rounded font-mono text-[9.5px] uppercase tracking-wider font-semibold border flex items-center justify-between transition-all duration-200 ${
              isDark
                ? isHovered
                  ? 'bg-[#c8f542]/15 text-[#c8f542] border-[#c8f542]/60 hover:bg-[#c8f542] hover:text-black'
                  : 'bg-[#1A1D24] text-[#A6ABB5] border-[#2A2F3A] hover:border-white/40'
                : isHovered
                ? 'bg-black text-[#c8f542] border-black hover:bg-black/90'
                : 'bg-neutral-100 text-[#40444C] border-neutral-300 hover:border-neutral-500'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 stroke-[2]" />
              INSPECT DOSSIER
            </span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4. Bottom Actions: GitHub, LinkedIn & Index Tag */}
        <div
          style={{ transform: 'translateZ(24px)' }}
          className={`pt-3 border-t flex items-center justify-between ${
            isDark ? 'border-[#2A2F3A]' : 'border-[#22252A]/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                if (soundEnabled) playTacticalSfx('click')
              }}
              className={`p-1.5 rounded transition-all ${
                isDark
                  ? 'text-[#8E929A] hover:text-white hover:bg-[#1E222A]'
                  : 'text-[#555860] hover:text-[#121316] hover:bg-black/5'
              }`}
              title={`${member.name} on GitHub`}
            >
              <Github className="w-4 h-4 stroke-[1.8]" />
            </a>

            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation()
                if (soundEnabled) playTacticalSfx('click')
              }}
              className={`p-1.5 rounded transition-all ${
                isDark
                  ? 'text-[#8E929A] hover:text-white hover:bg-[#1E222A]'
                  : 'text-[#555860] hover:text-[#121316] hover:bg-black/5'
              }`}
              title={`${member.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4 stroke-[1.8]" />
            </a>
          </div>

          <span
            className={`font-mono text-[10px] font-semibold tracking-wider ${
              isHovered
                ? isDark
                  ? 'text-[#c8f542]'
                  : 'text-black font-bold'
                : isDark
                ? 'text-[#555A64]'
                : 'text-[#8A8F98]'
            }`}
          >
            [ {member.num} ]
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// "THE SYNAPSE": INTER-CARD CONNECTIVE CONDUIT (CIRCUIT BUS)
// ─────────────────────────────────────────────────────────────────────────────

function SynapseConduit({
  activeHoverIndex,
  isDark,
}: {
  activeHoverIndex: number | null
  isDark: boolean
}) {
  const lineBase = isDark ? '#262D38' : '#D0D4CC'
  const activeColor = '#c8f542'

  return (
    <div className="hidden lg:block relative w-full mb-6 py-3 px-2 border rounded-lg overflow-hidden bg-black/5 dark:bg-white/[0.02] border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest mb-2 px-2 text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#c8f542]" />
          <span>FOUR FRONTS // SYNAPSE CONDUIT</span>
        </span>
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          {activeHoverIndex !== null
            ? `STREAMING: FRONT 0${activeHoverIndex + 1} ENGAGED WITH REST OF FLEET`
            : 'ALL 4 TECHNICAL NODES FULLY SYNCHRONIZED'}
        </span>
      </div>

      {/* SVG Circuit Line Connecting All 4 Cards */}
      <div className="relative h-6 w-full flex items-center px-8">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 20">
          {/* Base Wire */}
          <line
            x1="10"
            y1="10"
            x2="390"
            y2="10"
            stroke={lineBase}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Active Glowing Pulse Line */}
          {activeHoverIndex !== null && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              x1="10"
              y1="10"
              x2="390"
              y2="10"
              stroke={activeColor}
              strokeWidth="2"
              strokeDasharray="6 3"
            />
          )}

          {/* 4 Connection Pin Nodes */}
          {[50, 150, 250, 350].map((cx, idx) => {
            const isNodeActive = activeHoverIndex === idx
            return (
              <g key={idx}>
                <circle
                  cx={cx}
                  cy="10"
                  r={isNodeActive ? 6 : 4}
                  fill={isNodeActive ? activeColor : lineBase}
                  className="transition-all duration-300"
                />
                {isNodeActive && (
                  <circle
                    cx={cx}
                    cy="10"
                    r="10"
                    stroke={activeColor}
                    strokeWidth="1.2"
                    fill="none"
                    className="animate-ping"
                  />
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DEEP DOSSIER INSPECTOR MODAL
// ─────────────────────────────────────────────────────────────────────────────

function DossierModal({
  member,
  onClose,
  isDark,
  soundEnabled,
}: {
  member: TeamMember | null
  onClose: () => void
  isDark: boolean
  soundEnabled: boolean
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!member) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 ${
            isDark
              ? 'bg-[#121419] border-[#2A2F3A] text-white shadow-[0_24px_64px_rgba(0,0,0,0.8)]'
              : 'bg-white border-neutral-300 text-neutral-900 shadow-[0_24px_64px_rgba(0,0,0,0.18)]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b pb-4 mb-6 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#c8f542] bg-[#c8f542]/10 px-2.5 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CLASSIFIED TECHNICAL DOSSIER // {member.specCode}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) playTacticalSfx('click')
                onClose()
              }}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* Left Column: Portrait & Identity */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-36 h-44 rounded-xl overflow-hidden border-2 border-[#c8f542] mb-4 shadow-lg relative">
                <MemberPortrait member={member} isDark={isDark} />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-1">{member.name}</h3>
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#c8f542] mb-3">
                {member.role}
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 italic mb-4 leading-relaxed">
                &ldquo;{member.philosophy}&rdquo;
              </p>

              {/* Direct Profile Links */}
              <div className="flex items-center gap-3 w-full">
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-mono text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-[#c8f542] hover:text-black transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-mono text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-[#c8f542] hover:text-black transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right 2 Columns: Capabilities & Deliverables */}
            <div className="md:col-span-2 space-y-6">
              {/* Core Skill Bars */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#c8f542]" />
                  TECHNICAL MASTERY & RADAR
                </h4>
                <div className="space-y-3">
                  {member.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[#c8f542] font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * idx, ease: 'easeOut' }}
                          className="h-full bg-[#c8f542] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Deliverables */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#c8f542]" />
                  DIRECT PARTNER DELIVERABLES
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {member.keyDeliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-lg border text-xs leading-snug bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Senior Access Guarantee Box */}
              <div className="p-4 rounded-xl border border-[#c8f542]/40 bg-[#c8f542]/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="font-mono text-[10px] text-[#c8f542] uppercase tracking-wider block font-bold">
                    100% DIRECT SENIOR ACCESS
                  </span>
                  <span className="text-xs text-neutral-600 dark:text-neutral-300">
                    No account managers or junior buffers. You work directly with {member.name.split(' ')[0]}.
                  </span>
                </div>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="whitespace-nowrap px-4 py-2 rounded-lg font-mono text-xs font-bold bg-[#c8f542] text-black hover:bg-white transition-colors"
                >
                  START SPRINT &rarr;
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT GOLDEN PARTICLES (PRESERVED AESTHETIC)
// ─────────────────────────────────────────────────────────────────────────────

function AmbientGoldenParticles() {
  const particles = [
    { top: '15%', left: '68%', delay: 0, duration: 6, size: 3.5 },
    { top: '28%', left: '74%', delay: 1.2, duration: 7, size: 4 },
    { top: '35%', left: '82%', delay: 2.1, duration: 5.5, size: 3 },
    { top: '48%', left: '70%', delay: 0.8, duration: 6.5, size: 4.5 },
    { top: '56%', left: '88%', delay: 2.7, duration: 8, size: 3 },
    { top: '68%', left: '76%', delay: 1.5, duration: 6, size: 3.5 },
    { top: '75%', left: '84%', delay: 3.2, duration: 7.5, size: 4 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, y: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.9, 0.3],
            y: [-12, 12, -12],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full shadow-[0_0_12px_rgba(230,165,60,0.85)]"
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
  const iconColor = isDark ? 'text-[#888888] hover:text-white' : 'text-[#666A73] hover:text-[#121316]'

  return (
    <div className="hidden 2xl:flex flex-col items-center gap-6 absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
      <button type="button" aria-label="Toggle menu" className={`p-2 transition-colors ${iconColor}`}>
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

      <button type="button" aria-label="Search" className={`p-2 transition-colors ${iconColor}`}>
        <Search className="w-3.5 h-3.5 stroke-[1.5]" />
      </button>

      <div className={`w-px h-12 my-1 ${isDark ? 'bg-[#2A2A2A]' : 'bg-[#D4D7D1]'}`} />
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180 ${
          isDark ? 'text-[#555555]' : 'text-[#8E929A]'
        }`}
      >
        FOUR FRONT LAB // SPEC
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: TeamEditorial ("The Four Fronts")
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamEditorial() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null)
  const [selectedDossier, setSelectedDossier] = useState<TeamMember | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="team"
      className="relative w-full py-20 sm:py-28 lg:py-36 px-6 lg:px-14 xl:px-20 border-b border-[var(--dm-border)] bg-[var(--dm-bg)] text-[var(--dm-text)] transition-colors duration-300 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 1: Subtle Blueprint Grid & Measurement Annotations
      ───────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 2: Left Technical Circular Draft Sketch & "01" Watermark
      ───────────────────────────────────────────────────────────────── */}
      <div className="absolute top-12 left-4 sm:left-12 lg:left-16 w-[340px] sm:w-[480px] h-[480px] pointer-events-none z-0 opacity-35">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
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
          <circle
            cx="140"
            cy="240"
            r="110"
            stroke={isDark ? '#222730' : '#CCD1C7'}
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle cx="140" cy="240" r="85" stroke={isDark ? '#262D38' : '#C2C8BC'} strokeWidth="0.8" />
          <circle cx="140" cy="240" r="50" stroke={isDark ? '#2B3340' : '#B8BFB0'} strokeWidth="1" />
          <circle cx="140" cy="240" r="20" stroke={isDark ? '#333D4D' : '#AAB2A2'} strokeWidth="1.2" />
          <line
            x1="30"
            y1="240"
            x2="250"
            y2="240"
            stroke={isDark ? '#262D38' : '#CCD1C7'}
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
          <line
            x1="140"
            y1="130"
            x2="140"
            y2="350"
            stroke={isDark ? '#262D38' : '#CCD1C7'}
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          BACKGROUND LAYER 3: Ambient Golden Particle Accents
      ───────────────────────────────────────────────────────────────── */}
      <div className="absolute top-0 right-0 w-[55vw] max-w-[920px] h-full pointer-events-none select-none z-0 overflow-hidden">
        <AmbientGoldenParticles />
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          LEFT FLOATING DOCK (Architectural Utility Icons)
      ───────────────────────────────────────────────────────────────── */}
      <LeftSideFloatingDock isDark={isDark} />

      {/* ─────────────────────────────────────────────────────────────────
          CONTENT CONTAINER
      ───────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* ─────────────────────────────────────────────────────────────
            HEADER ROW: Large Typography + Tactical SFX & Mode Controls
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            {/* Tactical Super-Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 font-mono text-[10px] uppercase tracking-widest bg-black/5 dark:bg-white/5 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#c8f542] animate-pulse" />
              <span>THE 4 COMMAND FRONTS // DISTRIBUTED SENIOR PARTNERSHIP</span>
            </div>

            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4 ${
                isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
              }`}
            >
              The Four Fronts.
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-[#9DA1A8]' : 'text-[#4A4E57]'
              }`}
            >
              FourFrontLab isn&apos;t a massive agency with layers of account managers. We are four
              dedicated partners, each commanding a specific technical front. When you work with us,
              you work directly with the experts building your product.
            </p>
          </div>

          {/* Interactive Tactical Utility Dock: Sound SFX Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playTacticalSfx('lock')
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                soundEnabled
                  ? 'bg-[#c8f542]/20 border-[#c8f542] text-[#c8f542]'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-500'
              }`}
              title="Toggle Web Audio Tactical Sound FX"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>SFX: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            "THE SYNAPSE": CONNECTIVE CIRCUIT BUS CONDUIT
        ───────────────────────────────────────────────────────────── */}
        <SynapseConduit activeHoverIndex={activeHoverIndex} isDark={isDark} />

        {/* ─────────────────────────────────────────────────────────────
            4 HOLOGRAPHIC 3D TILT CARDS WITH ROLE ENGINES
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-2 pb-16 sm:pb-20">
          {teamMembers.map((member, index) => (
            <HolographicCard
              key={member.id}
              member={member}
              index={index}
              isDark={isDark}
              activeHoverIndex={activeHoverIndex}
              setActiveHoverIndex={setActiveHoverIndex}
              onOpenDossier={(m) => setSelectedDossier(m)}
              soundEnabled={soundEnabled}
            />
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM ARCHITECTURAL SPECS BAR + ACTIVE AUDIO SPECTRUM
        ───────────────────────────────────────────────────────────── */}
        <div
          className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest ${
            isDark ? 'border-[#1F2228] text-[#6B707B]' : 'border-[#DFE2DC] text-[#7A7E86]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-[#c8f542]' : 'bg-[#687D3B]'
              } animate-pulse`}
            />
            <span>DISTRIBUTED SENIOR PARTNERSHIP</span>

            {/* Audio Spectrum Graphic Visualizer */}
            <div className="hidden sm:flex items-center gap-1 ml-2">
              {[8, 14, 18, 10, 16, 12, 20, 9].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, h, 6] }}
                  transition={{
                    duration: 1 + (i % 3) * 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  className={`w-0.5 rounded-full ${isDark ? 'bg-[#c8f542]' : 'bg-black'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span>ISLAMABAD // REMOTE</span>
            <span className="hidden sm:inline font-bold text-neutral-800 dark:text-neutral-200">
              100% DIRECT SENIOR ACCESS
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          DEEP DOSSIER INSPECTOR MODAL POPUP
      ───────────────────────────────────────────────────────────────── */}
      <DossierModal
        member={selectedDossier}
        onClose={() => setSelectedDossier(null)}
        isDark={isDark}
        soundEnabled={soundEnabled}
      />
    </section>
  )
}

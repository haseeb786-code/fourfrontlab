'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import {
  Github,
  Linkedin,
  Sparkles,
  ExternalLink,
  Menu,
  Twitter,
  Search,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBER DEFINITIONS & OFFICIAL SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  num: string
  name: string
  role: string
  description: string
  githubUrl: string
  linkedinUrl: string
  officialAvatarUrl: string
  fallbackAvatarUrl: string
  initials: string
  specCode: string
  staggerClass: string
}

const teamMembers: TeamMember[] = [
  {
    id: '01',
    num: '01',
    name: 'M. Taha Nadeem',
    role: 'FRONTEND / ENGINEERING',
    description:
      'Architecting responsive, highly interactive frontend experiences that fuse robust engineering with premium aesthetics.',
    githubUrl: 'https://github.com/MTahaNadeem',
    linkedinUrl: 'https://linkedin.com/in/mtahanadeem',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/184400188?v=4',
    fallbackAvatarUrl: '/images/team/taha-reference.webp',
    initials: 'TN',
    specCode: 'LEAD // 001',
    staggerClass: 'lg:translate-y-0',
  },
  {
    id: '02',
    num: '02',
    name: 'Abdul Haseeb',
    role: 'BACKEND / ARCHITECTURE',
    description:
      'Designing resilient backend architectures and optimized data pipelines that scale reliably under pressure.',
    githubUrl: 'https://github.com/haseeb786-code',
    linkedinUrl: 'https://linkedin.com/in/abdul-haseeb',
    officialAvatarUrl: '/images/team/abdul-haseeb.webp',
    fallbackAvatarUrl: '/images/team/abdul-haseeb.png',
    initials: 'AH',
    specCode: 'CORE // 002',
    staggerClass: 'lg:translate-y-4 xl:translate-y-6',
  },
  {
    id: '03',
    num: '03',
    name: 'Syed Haseeb Badshah',
    role: 'UX/UI / DESIGN SYSTEM',
    description:
      'Crafting intuitive user interfaces and cohesive design systems that elevate brand identity and user engagement.',
    githubUrl: 'https://github.com/syed-haseeb-badshah',
    linkedinUrl: 'https://linkedin.com/in/syed-haseeb-badshah',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/286664773?v=4',
    fallbackAvatarUrl: '/images/team/syed-reference.webp',
    initials: 'SB',
    specCode: 'SYSTEM // 003',
    staggerClass: 'lg:translate-y-12 xl:translate-y-16',
  },
  {
    id: '04',
    num: '04',
    name: 'Raja Mustafa',
    role: 'STRATEGY / GROWTH',
    description:
      'Driving business growth through data-driven strategy and targeted product positioning for long-term impact.',
    githubUrl: 'https://github.com/Raja-Mustafa',
    linkedinUrl: 'https://linkedin.com/in/raja-mustafa',
    officialAvatarUrl: '/images/team/mustafa.webp',
    fallbackAvatarUrl: '/images/team/mustafa.png',
    initials: 'RM',
    specCode: 'SCALE // 004',
    staggerClass: 'lg:translate-y-20 xl:translate-y-24',
  },
]

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
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${strokeColor} 1px, transparent 1px), linear-gradient(to bottom, ${strokeColor} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Decorative Target Reticle */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      >
        <circle cx="50" cy="50" r="38" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
        <circle cx="50" cy="50" r="24" stroke={strokeColor} strokeWidth="0.5" fill="none" />
        <line x1="50" y1="6" x2="50" y2="94" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="6" y1="50" x2="94" y2="50" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      {/* Centered Monogram & Technical Annotation */}
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
      {/* Loading Skeleton */}
      {isLoading && (
        <div
          className={`absolute inset-0 z-10 animate-pulse ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-200'
          }`}
        />
      )}

      {/* Official Portrait */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={`${member.name} - ${member.role}`}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle Blueprint Scanline Texture */}
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
// FLOATING DIGITAL PARTICLES ACCENT
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
// LEFT DOCK ICONS (From Reference Design)
// ─────────────────────────────────────────────────────────────────────────────

function LeftSideFloatingDock({ isDark }: { isDark: boolean }) {
  const iconColor = isDark ? 'text-[#888888] hover:text-white' : 'text-[#666A73] hover:text-[#121316]'

  return (
    <div className="hidden 2xl:flex flex-col items-center gap-6 absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-auto">
      <button
        type="button"
        aria-label="Toggle menu"
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
  const isStaggered = false
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

          {/* Technical Circle Guide and Crosshairs */}
          <circle
            cx="140"
            cy="240"
            r="110"
            stroke={isDark ? '#222730' : '#CCD1C7'}
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <circle
            cx="140"
            cy="240"
            r="85"
            stroke={isDark ? '#262D38' : '#C2C8BC'}
            strokeWidth="0.8"
          />
          <circle
            cx="140"
            cy="240"
            r="50"
            stroke={isDark ? '#2B3340' : '#B8BFB0'}
            strokeWidth="1"
          />
          <circle
            cx="140"
            cy="240"
            r="20"
            stroke={isDark ? '#333D4D' : '#AAB2A2'}
            strokeWidth="1.2"
          />

          {/* Dimension Lines */}
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
          <line
            x1="22"
            y1="180"
            x2="22"
            y2="300"
            stroke={isDark ? '#333D4D' : '#AAB2A2'}
            strokeWidth="0.8"
          />
          <path
            d="M18 180h8M18 300h8"
            stroke={isDark ? '#333D4D' : '#AAB2A2'}
            strokeWidth="0.8"
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
            HEADER ROW: Large Typography + Supporting Copy
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          {/* Large High-Contrast Sans-Serif Type */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 ${
              isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
            }`}
          >
            The Four Fronts.
          </h2>

          {/* Supporting Copy */}
          <div
            className={`space-y-4 text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9DA1A8]' : 'text-[#4A4E57]'
            }`}
          >
            <p>
              FourFrontLab isn&apos;t a massive agency with layers of account
              managers. We are four dedicated partners, each commanding a
              specific technical front.
            </p>
            <p>
              When you work with us, you work directly with the experts
              building your product. We prioritize performance, clean
              architecture, and delivering actual business value.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4 BALANCED & STRUCTURED ARCHITECTURAL CARDS
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-2 pb-16 sm:pb-20">
          {teamMembers.map((member, index) => {
            const staggerStyle = isStaggered ? member.staggerClass : ''

            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col justify-between rounded-xl p-4 sm:p-5 border transition-all duration-300 ${staggerStyle} ${
                  isDark
                    ? 'bg-[#14161B] border-[#252A34] hover:border-[#c8f542]/60 shadow-[0_12px_36px_rgba(0,0,0,0.5)]'
                    : 'bg-white border-[#D4D7D1] hover:border-[#121316] shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                } backdrop-blur-md hover:-translate-y-1`}
              >
                {/* 1. Inset Portrait Frame with Thin Dark Border */}
                <div
                  className={`relative w-full aspect-[4/5] rounded-md overflow-hidden border mb-4 ${
                    isDark
                      ? 'border-[#2A2F3A] group-hover:border-[#c8f542]/40'
                      : 'border-[#22252A] group-hover:border-[#121316]'
                  }`}
                >
                  <MemberPortrait member={member} isDark={isDark} />

                  {/* Top-Right Badge: Spec Code */}
                  <div
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-semibold border backdrop-blur-md ${
                      isDark
                        ? 'bg-[#0B0C0E]/85 text-[#c8f542] border-[#2A2F3A]'
                        : 'bg-[#F4F4F1]/90 text-[#121316] border-[#22252A]'
                    }`}
                  >
                    {member.specCode}
                  </div>
                </div>

                {/* 2. Member Name */}
                <h3
                  className={`text-lg sm:text-xl font-bold tracking-tight mb-1.5 transition-colors ${
                    isDark
                      ? 'text-[#F5F5F0] group-hover:text-[#c8f542]'
                      : 'text-[#121316] group-hover:text-[#121316]'
                  }`}
                >
                  {member.name}
                </h3>

                {/* Thin Divider Line */}
                <div
                  className={`w-full h-px mb-2 ${
                    isDark ? 'bg-[#2A2F3A]' : 'bg-[#22252A]/25'
                  }`}
                />

                {/* 3. Small-Caps Role Label */}
                <span
                  className={`font-mono text-[10px] tracking-[0.16em] uppercase font-bold mb-2.5 ${
                    isDark ? 'text-[#8E929A]' : 'text-[#484D56]'
                  }`}
                >
                  {member.role}
                </span>

                {/* 4. Description Copy */}
                <p
                  className={`text-xs leading-relaxed mb-5 flex-grow ${
                    isDark ? 'text-[#9DA1A8]' : 'text-[#40444C]'
                  }`}
                >
                  {member.description}
                </p>

                {/* 5. Bottom Actions: GitHub & LinkedIn Official Profile Icons */}
                <div
                  className={`pt-3 border-t flex items-center justify-between ${
                    isDark ? 'border-[#2A2F3A]' : 'border-[#22252A]/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* GitHub Link */}
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded transition-all ${
                        isDark
                          ? 'text-[#8E929A] hover:text-white hover:bg-[#1E222A]'
                          : 'text-[#555860] hover:text-[#121316] hover:bg-black/5'
                      }`}
                      title={`${member.name} on GitHub`}
                    >
                      <Github className="w-4 h-4 stroke-[1.8]" />
                    </a>

                    {/* LinkedIn Link */}
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
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

                  {/* Corner Index Tag */}
                  <span
                    className={`font-mono text-[10px] font-semibold tracking-wider ${
                      isDark ? 'text-[#555A64]' : 'text-[#8A8F98]'
                    }`}
                  >
                    [ {member.num} ]
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM ARCHITECTURAL SPECS BAR
        ───────────────────────────────────────────────────────────── */}
        <div
          className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest ${
            isDark
              ? 'border-[#1F2228] text-[#6B707B]'
              : 'border-[#DFE2DC] text-[#7A7E86]'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-[#c8f542]' : 'bg-[#687D3B]'
              }`}
            />
            <span>DISTRIBUTED SENIOR PARTNERSHIP</span>
          </div>

          <div className="flex items-center gap-6">
            <span>ISLAMABAD // REMOTE</span>
            <span className="hidden sm:inline">100% DIRECT SENIOR ACCESS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

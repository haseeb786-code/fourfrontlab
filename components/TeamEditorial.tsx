'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import {
  Github,
  Linkedin,
  LayoutGrid,
  Rows3,
  Sparkles,
  Sun,
  Moon,
  ExternalLink,
  Cpu,
  Activity,
  Layers,
  Terminal,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// 01. KINETIC 3D POLYHEDRON / CRYSTAL (M. Taha Nadeem - Founder / Engineering)
// ─────────────────────────────────────────────────────────────────────────────

function KineticPolyhedron({ isDark }: { isDark: boolean }) {
  const strokeColor = isDark ? '#c8f542' : '#1a3b36'
  const secondaryStroke = isDark ? '#4ade80' : '#2b5951'

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #c8f542 0%, transparent 70%)'
            : 'radial-gradient(circle, #2b5951 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="w-full h-full relative z-10 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="polyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="1" />
            <stop offset="100%" stopColor={secondaryStroke} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Base Foundation with Pulsing Energy */}
        <polygon
          points="44,172 196,172 178,186 62,186"
          stroke="url(#polyGradient)"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="transition-all duration-500"
        />
        <line x1="44" y1="172" x2="62" y2="186" stroke={strokeColor} strokeWidth="1.2" opacity="0.6" />
        <line x1="196" y1="172" x2="178" y2="186" stroke={strokeColor} strokeWidth="1.2" opacity="0.6" />
        <line x1="120" y1="172" x2="120" y2="186" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" />

        {/* Outer Faceted Hull */}
        <polygon
          points="120,32 176,74 196,172 44,172 64,74"
          stroke={strokeColor}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Rotating Internal Geometric Facet Cage */}
        <g className="origin-[120px_110px] animate-[spin_18s_linear_infinite]">
          <circle cx="120" cy="110" r="38" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="4 6" opacity="0.35" />
          <polygon
            points="120,72 152,128 88,128"
            stroke={secondaryStroke}
            strokeWidth="0.8"
            opacity="0.5"
            strokeDasharray="2 4"
          />
        </g>

        {/* Primary Radial Wireframe Struts */}
        <line x1="120" y1="32" x2="120" y2="172" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="120" y1="110" x2="64" y2="74" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="120" y1="110" x2="176" y2="74" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="120" y1="110" x2="44" y2="172" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="120" y1="110" x2="196" y2="172" stroke={strokeColor} strokeWidth="1.2" />

        {/* Tension Cross Struts */}
        <line x1="64" y1="74" x2="176" y2="74" stroke={strokeColor} strokeWidth="0.9" opacity="0.6" strokeDasharray="3 3" />
        <line x1="64" y1="74" x2="120" y2="172" stroke={secondaryStroke} strokeWidth="0.9" opacity="0.75" />
        <line x1="176" y1="74" x2="120" y2="172" stroke={secondaryStroke} strokeWidth="0.9" opacity="0.75" />

        {/* Pulsing Quantum Vertex Nodes */}
        <circle cx="120" cy="32" r="3" fill={strokeColor} className="animate-ping origin-[120px_32px] opacity-75" />
        <circle cx="120" cy="32" r="2.5" fill={strokeColor} />
        <circle cx="120" cy="110" r="3.5" fill={strokeColor} className="animate-pulse" />
        <circle cx="64" cy="74" r="2" fill={strokeColor} />
        <circle cx="176" cy="74" r="2" fill={strokeColor} />
        <circle cx="44" cy="172" r="2" fill={strokeColor} />
        <circle cx="196" cy="172" r="2" fill={strokeColor} />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 02. KINETIC ROMAN ARCH VAULT & QUANTUM MATRIX (Abdul Haseeb - Backend)
// ─────────────────────────────────────────────────────────────────────────────

function KineticArchVault({ isDark }: { isDark: boolean }) {
  const strokeColor = isDark ? '#c8f542' : '#1a3b36'
  const secondaryStroke = isDark ? '#38bdf8' : '#2b5951'

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #38bdf8 0%, transparent 70%)'
            : 'radial-gradient(circle, #2b5951 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="w-full h-full relative z-10 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric Arches with Sequential Energy Flow */}
        <path
          d="M 36 182 V 104 A 84 84 0 0 1 204 104 V 182"
          stroke={strokeColor}
          strokeWidth="1.3"
          className="transition-all duration-300"
        />
        <path
          d="M 52 182 V 108 A 68 68 0 0 1 188 108 V 182"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray="6 3"
          className="animate-[dash_12s_linear_infinite]"
        />
        <path
          d="M 68 182 V 112 A 52 52 0 0 1 172 112 V 182"
          stroke={secondaryStroke}
          strokeWidth="1.2"
        />
        <path
          d="M 84 182 V 116 A 36 36 0 0 1 156 116 V 182"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
        <path
          d="M 100 182 V 120 A 20 20 0 0 1 140 120 V 182"
          stroke={secondaryStroke}
          strokeWidth="1.3"
        />
        <path
          d="M 112 182 V 124 A 8 8 0 0 1 128 124 V 182"
          stroke={strokeColor}
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Foundation Server Matrix */}
        <rect x="36" y="142" width="168" height="40" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="36" y1="155" x2="204" y2="155" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
        <line x1="36" y1="168" x2="204" y2="168" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />

        {/* Vertical Data Bus Lines with Alternating Blinks */}
        {[52, 68, 84, 100, 120, 140, 156, 172, 188].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1={142}
            x2={x}
            y2={182}
            stroke={i % 2 === 0 ? strokeColor : secondaryStroke}
            strokeWidth="0.9"
            opacity={0.7}
          />
        ))}

        {/* Live Active Server Node Lights */}
        <circle cx="52" cy="155" r="1.8" fill={secondaryStroke} className="animate-ping" />
        <circle cx="120" cy="155" r="2" fill={strokeColor} className="animate-pulse" />
        <circle cx="188" cy="168" r="1.8" fill={secondaryStroke} className="animate-ping" />

        {/* Keystone Apex Beacon */}
        <circle cx="120" cy="20" r="2.5" fill={strokeColor} className="animate-pulse" />
        <line x1="120" y1="20" x2="120" y2="104" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 03. KINETIC ROTATING 3D GLOBE / ORBITAL SPHERE (Syed Haseeb - UI/UX)
// ─────────────────────────────────────────────────────────────────────────────

function KineticGlobe({ isDark }: { isDark: boolean }) {
  const strokeColor = isDark ? '#c8f542' : '#1a3b36'
  const secondaryStroke = isDark ? '#a78bfa' : '#2b5951'

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #a78bfa 0%, transparent 70%)'
            : 'radial-gradient(circle, #2b5951 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="w-full h-full relative z-10 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Boundary Ring */}
        <circle cx="120" cy="120" r="76" stroke={strokeColor} strokeWidth="1.4" />

        {/* Equatorial & Prime Meridian Cardinal Axes */}
        <line x1="44" y1="120" x2="196" y2="120" stroke={strokeColor} strokeWidth="1.2" />
        <line x1="120" y1="44" x2="120" y2="196" stroke={strokeColor} strokeWidth="1.2" />

        {/* Latitudes */}
        <ellipse cx="120" cy="120" rx="76" ry="24" stroke={secondaryStroke} strokeWidth="1" />
        <ellipse cx="120" cy="120" rx="76" ry="48" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 2" />
        <ellipse cx="120" cy="120" rx="76" ry="66" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />

        {/* Kinetic Rotating Longitudes Group */}
        <g className="origin-[120px_120px]">
          <ellipse cx="120" cy="120" rx="26" ry="76" stroke={strokeColor} strokeWidth="1.1" />
          <ellipse cx="120" cy="120" rx="52" ry="76" stroke={secondaryStroke} strokeWidth="1.1" />
          <ellipse cx="120" cy="120" rx="68" ry="76" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Orbiting Satellite Ring at 45 Degree Angle */}
        <g className="origin-[120px_120px] animate-[spin_10s_linear_infinite]">
          <ellipse cx="120" cy="120" rx="88" ry="32" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="6 6" opacity="0.4" />
          {/* Orbiting Satellite Beacon */}
          <circle cx="208" cy="120" r="3" fill={strokeColor} className="animate-pulse" />
          <circle cx="208" cy="120" r="5" stroke={strokeColor} strokeWidth="0.8" className="animate-ping" />
        </g>

        {/* Center Core Coordinate Node */}
        <circle cx="120" cy="120" r="3" fill={strokeColor} />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 04. KINETIC 3D ISOMETRIC MATRIX PRISM (Mustafa Arfat - Strategy / Growth)
// ─────────────────────────────────────────────────────────────────────────────

function KineticIsometricMatrix({ isDark }: { isDark: boolean }) {
  const strokeColor = isDark ? '#c8f542' : '#1a3b36'
  const secondaryStroke = isDark ? '#f59e0b' : '#2b5951'

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
            : 'radial-gradient(circle, #2b5951 0%, transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        className="w-full h-full relative z-10 drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Isometric Hull */}
        <polygon
          points="65,124 165,66 205,89 105,147"
          stroke={strokeColor}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <polygon
          points="65,124 105,147 105,190 65,167"
          stroke={strokeColor}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <polygon
          points="105,147 205,89 205,132 105,190"
          stroke={strokeColor}
          strokeWidth="1.3"
          strokeLinejoin="round"
        />

        {/* Top Face Matrix Subdivisions */}
        <line x1="85" y1="112" x2="125" y2="135" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="105" y1="101" x2="145" y2="124" stroke={secondaryStroke} strokeWidth="0.9" />
        <line x1="125" y1="89" x2="165" y2="112" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="145" y1="78" x2="185" y2="101" stroke={secondaryStroke} strokeWidth="0.9" />
        <line x1="85" y1="135" x2="185" y2="78" stroke={strokeColor} strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Left Face Subdivisions */}
        <line x1="85" y1="135" x2="85" y2="178" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="65" y1="145" x2="105" y2="168" stroke={secondaryStroke} strokeWidth="0.9" />

        {/* Right Face Subdivisions */}
        <line x1="125" y1="135" x2="125" y2="178" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="145" y1="124" x2="145" y2="167" stroke={secondaryStroke} strokeWidth="0.9" />
        <line x1="165" y1="112" x2="165" y2="155" stroke={strokeColor} strokeWidth="0.9" />
        <line x1="185" y1="101" x2="185" y2="144" stroke={secondaryStroke} strokeWidth="0.9" />
        <line x1="105" y1="168" x2="205" y2="110" stroke={strokeColor} strokeWidth="0.9" strokeDasharray="3 2" />

        {/* Scanning Laser HUD Plane Sweeping Down */}
        <g className="animate-[bounce_4s_easeInOut_infinite]">
          <line
            x1="55"
            y1="130"
            x2="215"
            y2="80"
            stroke={strokeColor}
            strokeWidth="1.2"
            opacity="0.8"
            strokeDasharray="4 4"
          />
          <circle cx="135" cy="105" r="2.5" fill={strokeColor} className="animate-ping" />
        </g>

        {/* Isometric Growth Arrow Vector */}
        <g className="origin-[105px_147px] transition-transform duration-500">
          <line x1="105" y1="147" x2="165" y2="45" stroke={strokeColor} strokeWidth="1.4" strokeDasharray="5 3" />
          <polygon points="165,45 158,55 172,52" fill={strokeColor} />
        </g>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D PERSPECTIVE TILT CARD CONTAINER
// Calculates mouse coordinates to tilt card dynamically with specular sheen
// ─────────────────────────────────────────────────────────────────────────────

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  isDark: boolean
}

function TiltCard({ children, className = '', isDark }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery-smooth non-jerky rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 280,
    damping: 24,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const width = el.offsetWidth || 300
    const height = el.offsetHeight || 400

    const clientX = e.nativeEvent.offsetX
    const clientY = e.nativeEvent.offsetY

    x.set(clientX / width - 0.5)
    y.set(clientY / height - 0.5)

    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

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
      className={`relative will-change-transform ${className}`}
    >
      {/* Specular Glare/Sheen on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"
        style={{
          background: isDark
            ? 'radial-gradient(400px circle at 50% 50%, rgba(200, 245, 66, 0.12), transparent 75%)'
            : 'radial-gradient(400px circle at 50% 50%, rgba(26, 59, 54, 0.08), transparent 75%)',
        }}
      />
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA RECORD (Verbatim from Figma design)
// ─────────────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  code: string
  name: string
  role: string
  bio: string
  metric: string
  getGraphic: (isDark: boolean) => React.ReactNode
  githubUrl: string
  linkedinUrl: string
  staggerClass: string
}

const teamMembers: TeamMember[] = [
  {
    id: '01',
    code: 'LEAD // 001',
    name: 'M. Taha Nadeem',
    role: 'FOUNDER / ENGINEERING',
    metric: '99.9% RELIABILITY',
    bio: 'Architecting responsive, highly interactive frontend experiences that fuse robust engineering with premium aesthetics.',
    getGraphic: (isDark) => <KineticPolyhedron isDark={isDark} />,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    staggerClass: 'lg:translate-y-0',
  },
  {
    id: '02',
    code: 'CORE // 002',
    name: 'Abdul Haseeb',
    role: 'BACKEND / ARCHITECTURE',
    metric: '12ms EDGE LATENCY',
    bio: 'Designing resilient backend infrastructures and optimized data pipelines that scale reliably under pressure.',
    getGraphic: (isDark) => <KineticArchVault isDark={isDark} />,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    staggerClass: 'lg:translate-y-12 xl:translate-y-16',
  },
  {
    id: '03',
    code: 'SYSTEM // 003',
    name: 'Syed Haseeb Badshah',
    role: 'UI/UX / DESIGN SYSTEMS',
    metric: 'PIXEL PERFECT 100',
    bio: 'Crafting intuitive user interfaces and cohesive design systems that elevate brand identity and user engagement.',
    getGraphic: (isDark) => <KineticGlobe isDark={isDark} />,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    staggerClass: 'lg:translate-y-24 xl:translate-y-32',
  },
  {
    id: '04',
    code: 'SCALE // 004',
    name: 'Mustafa Arfat',
    role: 'STRATEGY / GROWTH',
    metric: '10X ACQUISITION',
    bio: 'Driving business growth through data-driven decisions and targeted market positioning for long-term impact.',
    getGraphic: (isDark) => <KineticIsometricMatrix isDark={isDark} />,
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    staggerClass: 'lg:translate-y-36 xl:translate-y-48',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: TeamEditorial
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamEditorial() {
  const [isStaggered, setIsStaggered] = useState(true)
  // Default to Dark Mode so it matches the website's dark aesthetic natively,
  // with a 1-click toggle to the Figma light sage aesthetic!
  const [isDark, setIsDark] = useState(true)

  return (
    <section
      id="team"
      className={`relative w-full py-28 sm:py-36 px-6 lg:px-12 border-b transition-colors duration-700 overflow-hidden ${
        isDark
          ? 'bg-[#080808] text-[#f5f5f0] border-[#1f1f1f] selection:bg-[#c8f542] selection:text-[#080808]'
          : 'bg-[#f2f4ef] text-[#112421] border-[#d8ddd3] selection:bg-[#1a3b36] selection:text-[#f2f4ef]'
      }`}
    >
      {/* Background Interactive Dot Grid & Ambient Atmosphere */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-dot-grid opacity-25' : 'opacity-10'
        }`}
      />

      {/* Cyber Laser Scanline Across the Section Header */}
      <div
        className={`absolute top-0 left-0 right-0 h-px transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-[#c8f542] to-transparent opacity-40'
            : 'bg-gradient-to-r from-transparent via-[#1a3b36] to-transparent opacity-30'
        }`}
      />

      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Top Editorial Eyebrow Bar */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? 'bg-[#c8f542]' : 'bg-[#1a3b36]'
              }`}
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.2em] font-medium ${
                isDark ? 'text-[#c8f542]' : 'text-[#2b5951]'
              }`}
            >
              05 / CORE ENGINEERING SQUAD
            </span>
            <span
              className={`hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest ${
                isDark ? 'text-[#444444]' : 'text-[#7a8a84]'
              }`}
            >
              [ 4 DEDICATED ARCHITECTS ]
            </span>
          </div>

          {/* Interactive Control Pill (Theme + Layout Toggle) */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher: Dark Obsidian vs Figma Sage */}
            <button
              onClick={() => setIsDark((prev) => !prev)}
              title={isDark ? 'Switch to Figma Light Editorial Theme' : 'Switch to Obsidian Dark Cyber Theme'}
              className={`px-3 py-1.5 border text-[11px] font-mono uppercase tracking-[0.15em] flex items-center gap-2 transition-all ${
                isDark
                  ? 'border-[#1f1f1f] bg-[#111111] hover:border-[#c8f542] text-[#f5f5f0]'
                  : 'border-[#1a3b36]/20 bg-[#e4eae1] hover:border-[#1a3b36] text-[#112421]'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#c8f542]" />
                  <span className="hidden md:inline">OBSIDIAN MODE</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#1a3b36]" />
                  <span className="hidden md:inline">FIGMA LIGHT</span>
                </>
              )}
            </button>

            {/* Layout Toggle: Staggered Cascade vs Aligned Grid */}
            <button
              onClick={() => setIsStaggered((prev) => !prev)}
              title={isStaggered ? 'Switch to aligned grid' : 'Switch to staggered editorial flow'}
              aria-label="Toggle layout alignment"
              className={`p-2 border transition-all group ${
                isDark
                  ? 'border-[#1f1f1f] bg-[#111111] hover:border-[#c8f542] text-[#f5f5f0]'
                  : 'border-[#1a3b36]/20 bg-[#e4eae1] hover:border-[#1a3b36] text-[#112421]'
              }`}
            >
              {isStaggered ? (
                <LayoutGrid
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isDark ? 'text-[#c8f542]' : 'text-[#1a3b36]'
                  }`}
                />
              ) : (
                <Rows3
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isDark ? 'text-[#c8f542]' : 'text-[#1a3b36]'
                  }`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Massive High-Fashion Editorial Heading */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2
              className={`font-editorial text-[clamp(64px,9vw,130px)] font-normal leading-[0.88] tracking-[-0.035em] transition-colors duration-700 ${
                isDark ? 'text-[#f5f5f0]' : 'text-[#112421]'
              }`}
            >
              Team
            </h2>
          </div>
          <p
            className={`hidden md:block max-w-xs font-mono text-[11px] leading-[1.7] uppercase tracking-[0.14em] text-right ${
              isDark ? 'text-[#6b6b6b]' : 'text-[#4a5f59]'
            }`}
          >
            Engineering scalable code, sub-second latency, and uncompromising visual precision.
          </p>
        </div>

        {/* Section Divider Line */}
        <div
          className={`w-full h-px mb-14 sm:mb-20 transition-colors duration-700 ${
            isDark ? 'bg-[#1f1f1f]' : 'bg-[#d2d8ce]'
          }`}
        />

        {/* Interactive 3D Perspective Cards Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 transition-all duration-700 ease-out ${
            isStaggered ? 'pb-16 lg:pb-36 xl:pb-48' : 'pb-16'
          }`}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col group transition-transform duration-500 ${
                isStaggered ? member.staggerClass : 'lg:translate-y-0'
              }`}
            >
              <TiltCard isDark={isDark} className="h-full flex flex-col">
                {/* 3D Kinetic Artwork Box */}
                <div
                  className={`relative aspect-square w-full border transition-all duration-500 overflow-hidden flex items-center justify-center p-7 sm:p-8 ${
                    isDark
                      ? 'bg-[#111111] border-[#1f1f1f] group-hover:border-[#c8f542]/60 group-hover:shadow-[0_0_30px_rgba(200,245,66,0.1)]'
                      : 'bg-[#e2e8df] border-[#1a3b36]/15 group-hover:border-[#1a3b36]/50 group-hover:shadow-[0_0_24px_rgba(26,59,54,0.08)]'
                  }`}
                >
                  {/* Top-Left Corner Bracket (┌) with Interactive Hover Pop */}
                  <div
                    className={`absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none transition-all duration-300 group-hover:scale-125 ${
                      isDark ? 'border-[#c8f542]' : 'border-[#1a3b36]'
                    }`}
                  />

                  {/* Top-Right Member Code Tag */}
                  <div
                    className={`absolute top-3.5 right-3.5 font-mono text-[9px] uppercase tracking-widest font-semibold ${
                      isDark ? 'text-[#444444] group-hover:text-[#c8f542]' : 'text-[#7a8a84] group-hover:text-[#1a3b36]'
                    } transition-colors`}
                  >
                    {member.code}
                  </div>

                  {/* Bottom-Right Accent Dot (●) */}
                  <div
                    className={`absolute bottom-3.5 right-3.5 w-1.5 h-1.5 rounded-full pointer-events-none transition-all duration-300 group-hover:scale-150 ${
                      isDark ? 'bg-[#c8f542] shadow-[0_0_8px_#c8f542]' : 'bg-[#1a3b36]'
                    }`}
                  />

                  {/* Kinetic Live Wireframe SVG Component */}
                  <div className="w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 ease-out">
                    {member.getGraphic(isDark)}
                  </div>
                </div>

                {/* Member Details */}
                <div className="pt-6 flex flex-col flex-grow">
                  {/* Name with subtle letter spacing */}
                  <h3
                    className={`text-xl sm:text-[23px] font-semibold tracking-[-0.015em] font-sans transition-colors duration-300 ${
                      isDark
                        ? 'text-[#f5f5f0] group-hover:text-white'
                        : 'text-[#112421]'
                    }`}
                  >
                    {member.name}
                  </h3>

                  {/* Role Tag & Metric Pill */}
                  <div className="flex items-center justify-between mt-1.5 mb-3">
                    <span
                      className={`font-mono text-[10.5px] uppercase tracking-[0.18em] font-medium transition-colors ${
                        isDark ? 'text-[#c8f542]' : 'text-[#2b5951]'
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>

                  {/* Hairline Divider with Hover Glow */}
                  <div
                    className={`w-full h-px mb-3.5 transition-colors duration-500 ${
                      isDark
                        ? 'bg-[#1f1f1f] group-hover:bg-[#c8f542]/40'
                        : 'bg-[#d8ddd3] group-hover:bg-[#1a3b36]/40'
                    }`}
                  />

                  {/* Description / Bio */}
                  <p
                    className={`text-[13.5px] leading-[1.68] font-normal mb-5 flex-grow transition-colors ${
                      isDark ? 'text-[#8a8a85] group-hover:text-[#b5b5b0]' : 'text-[#4a5f59]'
                    }`}
                  >
                    {member.bio}
                  </p>

                  {/* Interactive Social Buttons */}
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className={`p-2 border rounded-none transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'border-[#1f1f1f] bg-[#111111] hover:border-[#c8f542] text-[#8a8a85] hover:text-[#c8f542]'
                          : 'border-[#1a3b36]/15 bg-[#e4eae1] hover:border-[#1a3b36] text-[#1a3b36]/70 hover:text-[#112421]'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className={`p-2 border rounded-none transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'border-[#1f1f1f] bg-[#111111] hover:border-[#c8f542] text-[#8a8a85] hover:text-[#c8f542]'
                          : 'border-[#1a3b36]/15 bg-[#e4eae1] hover:border-[#1a3b36] text-[#1a3b36]/70 hover:text-[#112421]'
                      }`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>

                    <div className="ml-auto">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border ${
                          isDark
                            ? 'border-[#1f1f1f] text-[#555555] bg-black/40'
                            : 'border-[#1a3b36]/15 text-[#5a6f69] bg-white/40'
                        }`}
                      >
                        {member.metric}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom Border */}
        <div
          className={`w-full h-px mt-12 transition-colors duration-700 ${
            isDark ? 'bg-[#1f1f1f]' : 'bg-[#d2d8ce]'
          }`}
        />
      </div>
    </section>
  )
}

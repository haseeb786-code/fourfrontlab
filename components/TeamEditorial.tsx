'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Github, Linkedin, Terminal, Shield } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// DATA: EXACTLY 4 TEAM MEMBERS (THE FOUR FRONTS)
// Strict architectural standard: Dark Slate Obsidian, Crisp CAD lines,
// subtle acid-green / olive accent. Zero funky colors.
// ─────────────────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  num: string
  name: string
  role: string
  description: string
  techStack: string
  githubUrl: string
  linkedinUrl: string
  officialAvatarUrl: string
  fallbackAvatarUrl: string
  initials: string
  specCode: string
}

const teamMembers: TeamMember[] = [
  {
    id: '01',
    num: '01',
    name: 'M. Taha Nadeem',
    role: 'FRONTEND / ENGINEERING',
    description:
      'Architecting responsive, highly interactive frontend experiences that fuse robust engineering with premium aesthetics.',
    techStack: 'NEXT.JS 14 • THREE.JS • TAILWIND',
    githubUrl: 'https://github.com/MTahaNadeem',
    linkedinUrl: 'https://www.linkedin.com/in/mtahanadeem/',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/184400188?v=4',
    fallbackAvatarUrl: '/images/team/taha-reference.webp',
    initials: 'TN',
    specCode: 'LEAD // 001',
  },
  {
    id: '02',
    num: '02',
    name: 'Abdul Haseeb',
    role: 'BACKEND / ARCHITECTURE',
    description:
      'Designing resilient backend architectures and optimized data pipelines that scale reliably under pressure.',
    techStack: 'POSTGRESQL • FASTAPI • DOCKER',
    githubUrl: 'https://github.com/haseeb786-code',
    linkedinUrl: 'https://www.linkedin.com/in/abdul-haseeb-asim/',
    officialAvatarUrl: '/images/team/abdul-haseeb.webp',
    fallbackAvatarUrl: '/images/team/abdul-haseeb.png',
    initials: 'AH',
    specCode: 'CORE // 002',
  },
  {
    id: '03',
    num: '03',
    name: 'Syed Haseeb Badshah',
    role: 'UX/UI / DESIGN SYSTEM',
    description:
      'Crafting intuitive user interfaces and cohesive design systems that elevate brand identity and user engagement.',
    techStack: 'FIGMA • DESIGN SYSTEMS • UX',
    githubUrl: 'https://github.com/syed-haseeb-badshah',
    linkedinUrl: 'https://www.linkedin.com/in/syed-haseeb-badshah/',
    officialAvatarUrl: 'https://avatars.githubusercontent.com/u/286664773?v=4',
    fallbackAvatarUrl: '/images/team/syed-reference.webp',
    initials: 'SB',
    specCode: 'SYSTEM // 003',
  },
  {
    id: '04',
    num: '04',
    name: 'Raja Mustafa',
    role: 'STRATEGY / GROWTH',
    description:
      'Driving business growth through data-driven strategy and targeted product positioning for long-term impact.',
    techStack: 'PRODUCT GROWTH • STRATEGY • ANALYTICS',
    githubUrl: 'https://github.com/MustafaArfat',
    linkedinUrl: 'https://www.linkedin.com/in/mustafa-arfat/',
    officialAvatarUrl: '/images/team/mustafa-arfat.webp',
    fallbackAvatarUrl: '/images/team/mustafa.webp',
    initials: 'RM',
    specCode: 'GROWTH // 004',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SAFE PORTRAIT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function MemberPortrait({
  member,
  isDark,
}: {
  member: TeamMember
  isDark: boolean
}) {
  const [imgSrc, setImgSrc] = useState(member.officialAvatarUrl)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-full h-full bg-[#13161F] dark:bg-[#13161F] overflow-hidden">
      {!hasError ? (
        <Image
          src={imgSrc}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover object-top filter grayscale contrast-110 brightness-95 group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-105 transition-all duration-400 ease-out"
          priority={member.id === '01' || member.id === '02'}
          onError={() => {
            if (imgSrc !== member.fallbackAvatarUrl) {
              setImgSrc(member.fallbackAvatarUrl)
            } else {
              setHasError(true)
            }
          }}
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center font-mono font-bold text-2xl ${
            isDark ? 'bg-[#181B24] text-[#c8f542]' : 'bg-[#EAEAEA] text-[#121316]'
          }`}
        >
          <span>{member.initials}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-60 mt-1">
            {member.specCode}
          </span>
        </div>
      )}

      {/* Subtle bottom vignette to ensure crisp edge */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL FOUNDER CARD (ONE SINGLE STREAM)
// ─────────────────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  isDark,
}: {
  member: TeamMember
  isDark: boolean
}) {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 border transition-all duration-300 w-[310px] sm:w-[340px] md:w-[360px] shrink-0 select-none ${
        isDark
          ? 'bg-[#0E1117] border-[#1F242D] hover:border-[#c8f542]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)]'
          : 'bg-[#FFFFFF] border-[#E0E2DE] hover:border-[#687D3B]/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div>
        {/* High-Contrast Portrait Container */}
        <div className="relative w-full aspect-[4/4.5] rounded-xl overflow-hidden mb-4 border border-black/5 dark:border-white/10 shadow-xs">
          <MemberPortrait member={member} isDark={isDark} />

          {/* Top-Right Micro Spec Badge */}
          <div
            className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold border backdrop-blur-md ${
              isDark
                ? 'bg-[#0E1117]/90 text-[#c8f542] border-[#c8f542]/30'
                : 'bg-white/90 text-[#687D3B] border-[#687D3B]/30'
            }`}
          >
            {member.specCode}
          </div>

          {/* Founder Status Tag */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[9px] tracking-wider uppercase font-semibold">
            <Shield className="w-2.5 h-2.5 opacity-80" />
            <span>PARTNER</span>
          </div>
        </div>

        {/* Member Name */}
        <h3
          className={`text-base sm:text-lg font-bold tracking-tight mb-1 transition-colors ${
            isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
          }`}
        >
          {member.name}
        </h3>

        {/* Role Micro-Label in Accent Color */}
        <span
          className={`block font-mono text-[10px] tracking-[0.14em] uppercase font-bold mb-2.5 ${
            isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'
          }`}
        >
          {member.role}
        </span>

        {/* Description Copy */}
        <p
          className={`text-xs leading-relaxed mb-3.5 font-normal min-h-[48px] ${
            isDark ? 'text-[#9DA1A8]' : 'text-[#555A64]'
          }`}
        >
          {member.description}
        </p>

        {/* Tech Stack Pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[9px] font-mono font-medium uppercase tracking-wider mb-4 border ${
            isDark
              ? 'bg-[#151922] text-[#8E939E] border-[#252C38]'
              : 'bg-[#F4F4F2] text-[#666A73] border-[#E0E2DE]'
          }`}
        >
          <Terminal className="w-3 h-3 opacity-60" />
          <span className="truncate max-w-[260px]">{member.techStack}</span>
        </div>
      </div>

      {/* Bottom Action Row: Socials + Index */}
      <div
        className={`pt-3 border-t flex items-center justify-between ${
          isDark ? 'border-[#1F242D]' : 'border-[#E0E2DE]'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* GitHub Profile */}
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded transition-colors ${
              isDark
                ? 'text-[#7E8594] hover:text-white'
                : 'text-[#666A73] hover:text-[#121316]'
            }`}
            title={`${member.name} on GitHub`}
            aria-label={`${member.name} GitHub`}
          >
            <Github className="w-4 h-4 stroke-[1.8]" />
          </a>

          {/* LinkedIn Profile */}
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded transition-colors ${
              isDark
                ? 'text-[#7E8594] hover:text-[#c8f542]'
                : 'text-[#666A73] hover:text-[#121316]'
            }`}
            title={`${member.name} on LinkedIn`}
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="w-4 h-4 stroke-[1.8]" />
          </a>
        </div>

        {/* Corner Index Tag */}
        <span
          className={`font-mono text-[10px] font-bold ${
            isDark ? 'text-[#555A64]' : 'text-[#8E929A]'
          }`}
        >
          [ #{member.num} ]
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION: TeamEditorial ("The Four Fronts.")
// STRICTLY ONE SINGLE CONTINUOUS LINE (4 MEMBERS)
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamEditorial() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : true

  return (
    <section
      id="team"
      className={`relative w-full py-20 sm:py-28 border-b select-none transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#080808] text-[#F5F5F0] border-[#1F2228]'
          : 'bg-[#F4F4F2] text-[#121316] border-[#E0E2DE]'
      }`}
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────────────
          MAIN CONTENT HEADER: CLEAN EDITORIAL HEADLINE
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 mb-12">
        <div className="max-w-2xl">
          {/* Tag / Monospace Status Indicator in website theme accent */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.15em] font-bold ${
                isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'
              }`}
            >
              06
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#8E929A]">
              / THE FOUR FRONTS • LEADERSHIP
            </span>
          </div>

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] mb-4 ${
              isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
            }`}
          >
            The Four Fronts.
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#9DA1A8]' : 'text-[#555A64]'
            }`}
          >
            FourFrontLab isn&apos;t a massive agency with layers of account managers. We are four dedicated partners, each commanding a specific technical front to deliver sub-second performance.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          THE CONTINUOUS MOVING STREAM: STRICTLY ONE SINGLE LINE
          Exactly 4 members, seamlessly looping with duplicate set.
          No twice lines, no clutter, no extra buttons.
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Edge Subtle Fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #080808 20%, transparent 100%)'
              : 'linear-gradient(to right, #F4F4F2 20%, transparent 100%)',
          }}
        />

        {/* Right Edge Subtle Fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to left, #080808 20%, transparent 100%)'
              : 'linear-gradient(to left, #F4F4F2 20%, transparent 100%)',
          }}
        />

        {/* ONLY ONE CONTINUOUS MOVING LINE */}
        <motion.div
          className="flex w-max"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
        >
          {/* Set 1: Exactly 4 authentic founder cards */}
          <div className="flex gap-6 pr-6 shrink-0">
            {teamMembers.map((member) => (
              <TeamCard
                key={`single-line-a-${member.id}`}
                member={member}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Set 2: Exact duplicate for infinite seamless loop */}
          <div className="flex gap-6 pr-6 shrink-0" aria-hidden="true">
            {teamMembers.map((member) => (
              <TeamCard
                key={`single-line-b-${member.id}`}
                member={member}
                isDark={isDark}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

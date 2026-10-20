'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Github, Linkedin } from 'lucide-react'

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
    githubUrl: 'https://github.com/MustafaArfat',
    linkedinUrl: 'https://www.linkedin.com/in/mustafa-arfat/',
    officialAvatarUrl: '/images/team/mustafa-arfat.webp',
    fallbackAvatarUrl: '/images/team/mustafa.webp',
    initials: 'RM',
    specCode: 'GROWTH // 004',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SAFE AVATAR COMPONENT WITH AUTOMATIC FALLBACK
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
    <div className="relative w-full h-full bg-[#EAE6DC] dark:bg-[#1A1E26]">
      {!hasError ? (
        <Image
          src={imgSrc}
          alt={`${member.name} - ${member.role}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
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
            isDark ? 'bg-[#181B20] text-[#c8f542]' : 'bg-[#E4E7DF] text-[#121316]'
          }`}
        >
          <span>{member.initials}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-60 mt-1">
            {member.specCode}
          </span>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL TEAM CARD COMPONENT (Matching User Theme & Structure Mockup)
// ─────────────────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  index,
  isDark,
}: {
  member: TeamMember
  index: number
  isDark: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between rounded-2xl p-2.5 sm:p-3 border transition-all duration-300 select-none ${
        isDark
          ? 'bg-[#0E1015] border-[#222731] hover:border-[#c8f542]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]'
          : 'bg-[#FAF9F6] border-[#E5E0D6] shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:border-[#8C7A5B]/80 hover:shadow-[0_20px_35px_rgba(140,122,91,0.14)]'
      } hover:-translate-y-1`}
    >
      {/* 1. Portrait Container */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 border border-black/5 dark:border-white/5">
        <MemberPortrait member={member} isDark={isDark} />

        {/* Top-Right Micro Spec Badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm font-mono text-[9px] uppercase tracking-wider font-semibold border backdrop-blur-md ${
            isDark
              ? 'bg-[#0B0C0E]/85 text-[#c8f542] border-[#2A2F3A]'
              : 'bg-white/90 text-[#121316] border-[#D6D0C4] shadow-xs'
          }`}
        >
          {member.specCode}
        </div>
      </div>

      {/* 2. Text Details */}
      <div className="px-1.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Member Name */}
          <h3
            className={`text-base sm:text-[17px] font-bold tracking-tight mb-1 transition-colors ${
              isDark
                ? 'text-[#F5F5F0] group-hover:text-[#c8f542]'
                : 'text-[#121316] group-hover:text-[#121316]'
            }`}
          >
            {member.name}
          </h3>

          {/* Hairline Divider */}
          <div
            className={`w-full h-px my-1.5 ${
              isDark ? 'bg-[#222731]' : 'bg-[#E8E2D6]'
            }`}
          />

          {/* Role Micro-Label */}
          <span
            className={`block font-mono text-[9px] sm:text-[9.5px] tracking-[0.16em] uppercase font-bold mb-2 ${
              isDark ? 'text-[#8E929A]' : 'text-[#666A73]'
            }`}
          >
            {member.role}
          </span>

          {/* Description Copy */}
          <p
            className={`text-[11.5px] sm:text-[12px] leading-relaxed mb-4 ${
              isDark ? 'text-[#9DA1A8]' : 'text-[#555860]'
            }`}
          >
            {member.description}
          </p>
        </div>

        {/* 3. Bottom Action Row: Socials + Index */}
        <div
          className={`pt-2.5 border-t flex items-center justify-between ${
            isDark ? 'border-[#222731]' : 'border-[#E8E2D6]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {/* GitHub Profile */}
            <a
              href={member.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1 rounded transition-colors ${
                isDark
                  ? 'text-[#8E929A] hover:text-[#c8f542]'
                  : 'text-[#666A73] hover:text-[#121316]'
              }`}
              title={`${member.name} on GitHub`}
              aria-label={`${member.name} GitHub`}
            >
              <Github className="w-3.5 h-3.5 stroke-[1.8]" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1 rounded transition-colors ${
                isDark
                  ? 'text-[#8E929A] hover:text-[#c8f542]'
                  : 'text-[#666A73] hover:text-[#121316]'
              }`}
              title={`${member.name} on LinkedIn`}
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="w-3.5 h-3.5 stroke-[1.8]" />
            </a>
          </div>

          {/* Corner Index Tag */}
          <span
            className={`font-mono text-[10px] font-semibold tracking-wider ${
              isDark ? 'text-[#555A64]' : 'text-[#8A8F98]'
            }`}
          >
            [ #{member.num} ]
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION: TeamEditorial ("The Four Fronts.")
// ─────────────────────────────────────────────────────────────────────────────

export default function TeamEditorial() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : false

  return (
    <section
      id="team"
      className={`relative w-full py-24 sm:py-32 lg:py-36 px-6 lg:px-12 border-b select-none transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#080808] text-[#F5F5F0] border-[#1F2228]'
          : 'bg-[#ECE8DE] text-[#121316] border-[#D6D0C4]'
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────────────
          BACKGROUND: In light mode, renders the uploaded architectural theme
          backdrop (folded 3D plane, botanical leaves, drafting crosshairs).
          In dark mode, renders midnight blueprint styling.
      ───────────────────────────────────────────────────────────────────── */}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src="/images/team/team-architectural-theme.png"
            alt="The Four Fronts Architectural Theme Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-100"
          />
          {/* Subtle gradient edges for seamless section blending */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#ECE8DE]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#ECE8DE]/60 to-transparent pointer-events-none" />
        </div>
      )}

      {isDark && (
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#080808]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,245,66,0.03),rgba(255,255,255,0))]" />
          {/* Subtle blueprint watermark on left */}
          <div className="absolute -left-10 top-1/4 w-80 h-80 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#c8f542]">
              <circle cx="100" cy="100" r="90" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="60" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="30" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="10" y1="100" x2="190" y2="100" strokeWidth="0.5" />
              <line x1="100" y1="10" x2="100" y2="190" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER: Split Layout matching User Mockup
          - Left: Section Title "The Four Fronts." + Supporting Copy
          - Right: 4 Team Cards side-by-side in horizontal row
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Section Title & Copy (lg:col-span-4) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center">
            {/* Large High-Contrast Heading: "The Four Fronts." on two lines */}
            <h2
              className={`text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.04] mb-6 ${
                isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
              }`}
            >
              The Four<br />Fronts.
            </h2>

            {/* Supporting Copy */}
            <div
              className={`space-y-4 text-sm sm:text-base leading-relaxed ${
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

          {/* RIGHT COLUMN: 4 Team Member Cards in a Row (lg:col-span-8) */}
          <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-4 lg:gap-4 items-stretch">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={index}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

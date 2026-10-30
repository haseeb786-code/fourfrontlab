'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Terminal, ShieldCheck, Cpu, Code2, Database } from 'lucide-react'
import { useTheme } from './ThemeProvider'

// ─────────────────────────────────────────────────────────────────────────────
// DATA: EXACTLY 4 AUTHENTIC CLIENT TESTIMONIALS
// Strict architectural standard: Dark Slate Obsidian, Crisp CAD lines,
// subtle acid-green / olive accent. Zero funky colors.
// ─────────────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: string
  scope: string
  metric: string
  quote: string
  techStack: string
  authorName: string
  authorRole: string
  authorCompany: string
  avatarSrc: string
  iconType: 'code' | 'pipeline' | 'database' | 'ai'
}

const testimonials: Testimonial[] = [
  {
    id: '01',
    scope: 'WEB FLAGSHIP ARCHITECTURE',
    metric: '4.2S ➔ 0.35S EDGE LCP',
    quote:
      'Four Front Lab engineered our web flagship from scratch. We went from a sluggish 4.2s page load to a 0.35s sub-second edge response with custom 3D canvas physics. Working directly with dedicated engineers made delivery effortlessly fast.',
    techStack: 'NEXT.JS 14 • THREE.JS • TAILWIND',
    authorName: 'Marcus Vanco',
    authorRole: 'CO-FOUNDER & CTO',
    authorCompany: 'SHOGUN',
    avatarSrc: '/images/avatar-marcus.jpg',
    iconType: 'code',
  },
  {
    id: '02',
    scope: 'EVENT-DRIVEN WEBHOOK PIPELINE',
    metric: '140+ HRS / MO SAVED',
    quote:
      'Constructed an event-driven webhook pipeline that eliminated 140+ hours of monthly manual reconciliation. Zero dropped transactions across 50,000 daily events. The architecture is self-healing, airtight, and dependable.',
    techStack: 'NODE.JS • FASTAPI • POSTGRESQL',
    authorName: 'Elena Rostova',
    authorRole: 'DIRECTOR OF ENGINEERING',
    authorCompany: 'TRUST',
    avatarSrc: '/images/avatar-elena.jpg',
    iconType: 'pipeline',
  },
  {
    id: '03',
    scope: 'MULTI-TENANT ADMIN PORTAL',
    metric: 'ZERO TECH DEBT SLA',
    quote:
      'Built our internal multi-tenant administrative portal with complex role-based PostgreSQL schemas and real-time telemetry. Zero technical debt, modular Prisma migrations, and rock-solid JWT auth. True senior engineering execution.',
    techStack: 'POSTGRESQL • NEXT.JS • PRISMA',
    authorName: 'David Sterling',
    authorRole: 'VP OF PRODUCT',
    authorCompany: 'STERLING CORE',
    avatarSrc: '/images/avatar-david.jpg',
    iconType: 'database',
  },
  {
    id: '04',
    scope: 'ENTERPRISE AI RAG PIPELINE',
    metric: '99.8% RETRIEVAL ACCURACY',
    quote:
      'Integrated an air-gapped private RAG pipeline indexing our proprietary technical documentation. High-precision vector cosine similarity retrieval with guaranteed zero data leakage. Fast inference, clean APIs, and total data isolation.',
    techStack: 'PYTHON • CHROMA • FASTAPI',
    authorName: 'Sophia Chen',
    authorRole: 'HEAD OF RESEARCH',
    authorCompany: 'OMNISC_AI',
    avatarSrc: '/images/avatar-sarah.jpg',
    iconType: 'ai',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIAL CARD: MINIMALIST, HIGH-TECH, ARCHITECTURAL
// Styled strictly to match website standards and infrastructure card aesthetics
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({
  item,
  isDark,
}: {
  item: Testimonial
  isDark: boolean
}) {
  const renderIcon = () => {
    switch (item.iconType) {
      case 'code':
        return <Code2 className="w-4 h-4" />
      case 'pipeline':
        return <Cpu className="w-4 h-4" />
      case 'database':
        return <Database className="w-4 h-4" />
      case 'ai':
        return <Terminal className="w-4 h-4" />
      default:
        return <Terminal className="w-4 h-4" />
    }
  }

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 border transition-all duration-300 w-[380px] sm:w-[420px] md:w-[450px] shrink-0 select-none ${
        isDark
          ? 'bg-[#0E1117] border-[#1F242D] hover:border-[#c8f542]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)]'
          : 'bg-[#FFFFFF] border-[#E0E2DE] hover:border-[#687D3B]/50 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div>
        {/* Top Header: Tech Icon + Scope Title + Spec Metric */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            {/* Clean square icon badge */}
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                isDark
                  ? 'bg-[#151922] border-[#252C38] text-[#c8f542]'
                  : 'bg-[#F4F4F2] border-[#E0E2DE] text-[#687D3B]'
              }`}
            >
              {renderIcon()}
            </div>

            <div className="flex flex-col min-w-0">
              <span
                className={`font-mono text-[10px] tracking-wider uppercase font-semibold truncate ${
                  isDark ? 'text-[#8E939E]' : 'text-[#555A64]'
                }`}
              >
                {item.scope}
              </span>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider font-bold ${
                  isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'
                }`}
              >
                {item.metric}
              </span>
            </div>
          </div>

          {/* Verified Badge */}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-semibold border shrink-0 ${
              isDark
                ? 'bg-[#151922] text-[#8E939E] border-[#252C38]'
                : 'bg-[#F4F4F2] text-[#666A73] border-[#E0E2DE]'
            }`}
          >
            <ShieldCheck className="w-3 h-3 opacity-80" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Testimonial Quote */}
        <p
          className={`text-xs sm:text-[13px] leading-relaxed mb-6 font-normal min-h-[76px] ${
            isDark ? 'text-[#C5CAD4]' : 'text-[#2D3139]'
          }`}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div>
        {/* Tech Stack Spec Line */}
        <div
          className={`flex items-center justify-between pt-3 pb-3 mb-4 border-t font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ${
            isDark
              ? 'border-[#1F242D] text-[#7E8594]'
              : 'border-[#E0E2DE] text-[#666A73]'
          }`}
        >
          <span className="font-semibold flex items-center gap-1.5">
            <Terminal className="w-3 h-3 opacity-60" />
            <span>TECH STACK</span>
          </span>
          <span className="truncate max-w-[240px] text-right font-medium">
            {item.techStack}
          </span>
        </div>

        {/* Author Details */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`relative w-9 h-9 rounded-full overflow-hidden shrink-0 border ${
                isDark ? 'border-[#262C38]' : 'border-[#D4D7D1]'
              }`}
            >
              <Image
                src={item.avatarSrc}
                alt={item.authorName}
                fill
                sizes="36px"
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span
                className={`text-xs sm:text-sm font-bold tracking-tight truncate ${
                  isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
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

          <span
            className={`font-mono text-[10px] font-bold ${
              isDark ? 'text-[#555A64]' : 'text-[#8E929A]'
            }`}
          >
            [ #{item.id} ]
          </span>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN TESTIMONIALS SECTION: STRICTLY ONE SINGLE CONTINUOUS LINE (4 CARDS)
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsEditorial() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : true

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 sm:py-28 border-b border-[var(--dm-border)] bg-[var(--dm-bg)] text-[var(--dm-text)] transition-colors duration-300 overflow-hidden select-none"
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none z-0" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION CONTAINER: CLEAN EDITORIAL HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 mb-12">
        <div className="max-w-2xl">
          {/* Tag / Monospace Status Indicator in website theme accent */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.15em] font-bold ${
                isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'
              }`}
            >
              07
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#8E929A]">
              / EXECUTIVE ENDORSEMENTS
            </span>
          </div>

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] mb-4 ${
              isDark ? 'text-[#F5F5F0]' : 'text-[#121316]'
            }`}
          >
            Tested in production.
            <br />
            Proven at scale.
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#9DA1A8]' : 'text-[#555A64]'
            }`}
          >
            Direct assessments from technical leaders and founders who partnered with our four engineers to eliminate critical software bottlenecks.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          THE CONTINUOUS MOVING STREAM: STRICTLY ONE SINGLE LINE
          Exactly 4 cards, seamlessly looping with duplicate set.
          No twice lines, no clutter, no extra buttons.
      ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Left Side Subtle Gradient Fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to right, #080808 20%, transparent 100%)'
              : 'linear-gradient(to right, #F4F4F2 20%, transparent 100%)',
          }}
        />

        {/* Right Side Subtle Gradient Fade */}
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
              duration: 32,
              ease: 'linear',
            },
          }}
        >
          {/* Set 1: Exactly 4 authentic feedback cards */}
          <div className="flex gap-6 pr-6 shrink-0">
            {testimonials.map((item) => (
              <TestimonialCard
                key={`single-line-a-${item.id}`}
                item={item}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Set 2: Exact duplicate for infinite seamless loop */}
          <div className="flex gap-6 pr-6 shrink-0" aria-hidden="true">
            {testimonials.map((item) => (
              <TestimonialCard
                key={`single-line-b-${item.id}`}
                item={item}
                isDark={isDark}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

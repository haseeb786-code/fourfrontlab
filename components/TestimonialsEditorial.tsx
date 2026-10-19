'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Activity,
  ArrowUpRight,
} from 'lucide-react'

type CategoryType = 'all' | 'web' | 'automation' | 'software' | 'ai'

interface Endorsement {
  id: string
  category: CategoryType
  categoryLabel: string
  accentColor: string
  quote: string
  author: string
  role: string
  company: string
  metric: string
  image: string
  tags: string[]
}

const endorsements: Endorsement[] = [
  {
    id: '01',
    category: 'web',
    categoryLabel: 'NEXT.JS 14 FLAGSHIP',
    accentColor: '#c8f542',
    quote:
      'Four Front Lab engineered our web flagship from scratch. We went from a sluggish 4.2s page load to a 0.35s sub-second edge response with custom 3D canvas physics. Working directly with dedicated engineers made delivery effortlessly fast.',
    author: 'Marcus Vance',
    role: 'VP OF PRODUCT',
    company: 'VANCE SCALEWORKS',
    metric: '0.35s LCP • 100/100 CORE VITALS',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format',
    tags: ['Next.js 14', 'Three.js', 'Core Web Vitals'],
  },
  {
    id: '02',
    category: 'automation',
    categoryLabel: 'EVENT PIPELINE & CRM',
    accentColor: '#e8d5b7',
    quote:
      'Constructed an event-driven webhook pipeline that eliminated 140+ hours of monthly manual reconciliation. Zero dropped transactions across 50,000 daily events. The architecture is self-healing, airtight, and dependable.',
    author: 'Elena Rostova',
    role: 'OPERATIONS DIRECTOR',
    company: 'NEXUS LOGISTICS',
    metric: '50k DAILY EVENTS • 0% LOSS',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format',
    tags: ['Webhook Bridges', 'Idempotent Queues', 'ERP Sync'],
  },
  {
    id: '03',
    category: 'software',
    categoryLabel: 'MULTI-TENANT PORTAL',
    accentColor: '#38bdf8',
    quote:
      'Built our internal multi-tenant administrative portal with complex role-based PostgreSQL schemas and real-time telemetry. Zero technical debt, modular Prisma migrations, and rock-solid JWT auth. True senior engineering execution.',
    author: 'David Sterling',
    role: 'CHIEF TECHNOLOGY OFFICER',
    company: 'STERLING CLOUD LABS',
    metric: '<15ms QUERY TIME • RBAC AUTH',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format',
    tags: ['PostgreSQL', 'Prisma ORM', 'Multi-Tenant'],
  },
  {
    id: '04',
    category: 'ai',
    categoryLabel: 'ENTERPRISE RAG PIPELINE',
    accentColor: '#c084fc',
    quote:
      'Integrated an airgapped private RAG pipeline indexing our proprietary technical documentation. High-precision vector cosine similarity retrieval with guaranteed zero data leakage. Fast inference, clean APIs, and total data isolation.',
    author: 'Sophia Chen',
    role: 'HEAD OF RESEARCH',
    company: 'SYNAPSE COGNITIVE',
    metric: '98.4% ACCURACY • ZERO DATA RETENTION',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format',
    tags: ['pgvector', 'Cosine Search', 'Isolated RAG'],
  },
]

const filterTabs: Array<{ id: CategoryType; label: string }> = [
  { id: 'all', label: 'All Feedbacks' },
  { id: 'web', label: 'Web & Vitals' },
  { id: 'automation', label: 'Automation' },
  { id: 'software', label: 'Cloud Portals' },
  { id: 'ai', label: 'Enterprise AI' },
]

export default function TestimonialsEditorial() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')

  const filtered =
    activeCategory === 'all'
      ? endorsements
      : endorsements.filter((item) => item.category === activeCategory)

  return (
    <section className="relative w-full bg-[#0a0a0a] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          PREMIUM TEXTURE SYSTEM:
          Subtle tactile dot grid, ambient radial spotlight,
          and SVG dark carbon noise texture
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.015] blur-[150px]" />

        {/* Tactile 32px Dot Grid Texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-25" />

        {/* Subtle Static Carbon Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-white/[0.01] pointer-events-none" />

        {/* Lateral & Edge Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              05
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / VERIFIED ENDORSEMENTS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b]">
              DIRECT EXECUTIVE FEEDBACK
            </span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Tested in production. Proven at scale.
          </h2>
          <p className="text-base sm:text-lg leading-[1.8] text-[#6b6b6b]">
            Direct client assessments from founders and technical leaders who partnered with our four engineers to eliminate critical software bottlenecks.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE CATEGORY FILTER TABS
            Filter feedbacks by domain: Web, Automation, Portals, Enterprise AI
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-14 sm:mb-16 pb-6 border-b border-[#1f1f1f]">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id
            const count =
              tab.id === 'all'
                ? endorsements.length
                : endorsements.filter((e) => e.category === tab.id).length

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 rounded-sm ${
                  isActive
                    ? 'bg-[#f5f5f0] text-[#080808] font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'bg-[#111111]/80 hover:bg-[#161616] border border-[#1f1f1f] text-[#888888] hover:text-[#f5f5f0] hover:border-[#333333]'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
                )}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-[#080808] text-[#f5f5f0]'
                      : 'bg-[#181818] text-[#555555]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FLOATING AESTHETIC FEEDBACK CARDS:
            - Gentle asynchronous levitation animation (floating physics)
            - 3D hover elevation & deep ambient shadow
            - Verified enterprise stamp and live performance metric pill
            - Large editorial accent quote mark
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{
                  layout: { duration: 0.35, ease: 'easeInOut' },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                className="relative p-8 sm:p-12 bg-[#0c0c0c]/90 border border-[#1f1f1f] hover:border-[#333333] transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{
                  borderLeft: `2px solid ${item.accentColor}`,
                }}
              >
                {/* Subtle Ambient Backlight Glow on Card Corner */}
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none opacity-10 group-hover:opacity-20 blur-3xl transition-opacity duration-500"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div>
                  {/* Card Header: Category Chip & Verified Badge */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#a0a0a0]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#222222] bg-[#141414] font-mono text-[9px] text-[#c8f542]">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Large Opening Quote Mark */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-editorial text-5xl sm:text-6xl leading-none select-none"
                      style={{ color: item.accentColor }}
                    >
                      &ldquo;
                    </span>
                    <span className="font-mono text-xs text-[#3a3a3a] group-hover:text-[#6b6b6b] transition-colors">
                      [{item.id}]
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="font-editorial text-xl sm:text-2xl font-light leading-[1.65] text-[#f5f5f0] mb-8 group-hover:text-white transition-colors">
                    {item.quote}
                  </p>

                  {/* Metric Telemetry Pill */}
                  <div className="mb-8 p-3 rounded bg-[#111111] border border-[#1a1a1a] flex items-center justify-between font-mono text-[10px]">
                    <div className="flex items-center gap-2 text-[#6b6b6b]">
                      <Activity className="w-3 h-3 text-[#c8f542]" />
                      <span>BENCHMARK:</span>
                    </div>
                    <span className="text-white font-bold tracking-wider">
                      {item.metric}
                    </span>
                  </div>
                </div>

                {/* Author Metadata with Grayscale-to-Color Avatar */}
                <div className="flex items-center justify-between pt-6 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-[#141414] border border-[#222222] overflow-hidden shrink-0 group-hover:border-white transition-colors">
                      <Image
                        src={item.image}
                        alt={item.author}
                        fill
                        sizes="48px"
                        className="object-cover filter grayscale contrast-115 group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.author}
                      </h4>
                      <p className="font-mono text-[10px] tracking-wider uppercase text-[#6b6b6b] mt-0.5">
                        {item.role} • {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="hidden sm:flex flex-wrap gap-1 max-w-[140px] justify-end">
                    {item.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#222222] bg-[#121212] text-[#6b6b6b]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

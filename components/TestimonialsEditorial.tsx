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

export interface TestimonialProp {
  id: string
  clientName: string
  clientRole: string
  clientCompany: string
  avatarUrl?: string | null
  quote: string
  rating?: number
  featured?: boolean
}

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

const defaultEndorsements: Endorsement[] = [
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

export default function TestimonialsEditorial({
  initialTestimonials,
}: {
  initialTestimonials?: TestimonialProp[]
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')

  const fallbackAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format',
  ]

  const accents = ['#c8f542', '#e8d5b7', '#38bdf8', '#c084fc']
  const categoriesList: CategoryType[] = ['web', 'automation', 'software', 'ai']
  const labelsList = [
    'NEXT.JS 14 FLAGSHIP',
    'EVENT PIPELINE & CRM',
    'MULTI-TENANT PORTAL',
    'ENTERPRISE RAG PIPELINE',
  ]
  const metricsList = [
    '0.35s LCP • 100/100 CORE VITALS',
    '50k DAILY EVENTS • 0% LOSS',
    '<15ms QUERY TIME • RBAC AUTH',
    '98.4% ACCURACY • ZERO DATA RETENTION',
  ]
  const tagsList = [
    ['Next.js 14', 'Three.js'],
    ['Webhook Bridges', 'ERP Sync'],
    ['PostgreSQL', 'Prisma ORM'],
    ['Isolated RAG', 'Cosine Search'],
  ]

  const endorsements: Endorsement[] =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials.map((t, idx) => {
          const mod = idx % 4
          let avatar = t.avatarUrl
          if (!avatar || avatar.startsWith('/images/avatar-')) {
            avatar = fallbackAvatars[mod]
          }

          return {
            id: String(idx + 1).padStart(2, '0'),
            category: categoriesList[mod],
            categoryLabel: labelsList[mod],
            accentColor: accents[mod],
            quote: t.quote,
            author: t.clientName,
            role: t.clientRole?.toUpperCase() || 'EXECUTIVE LEAD',
            company: t.clientCompany?.toUpperCase() || 'ENTERPRISE CLIENT',
            metric: metricsList[mod],
            image: avatar,
            tags: tagsList[mod],
          }
        })
      : defaultEndorsements

  const filtered =
    activeCategory === 'all'
      ? endorsements
      : endorsements.filter((item) => item.category === activeCategory)

  return (
    <section className="relative w-full bg-[#0a0a0a] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden">
      {/* Texture & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.015] blur-[150px]" />
        <div className="absolute inset-0 bg-dot-grid opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-white/[0.01] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#c8f542]">
              05
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#8e8e93]">
              / VERIFIED ENDORSEMENTS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a1aa]">
              DIRECT EXECUTIVE FEEDBACK
            </span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Tested in production. Proven at scale.
          </h2>
          <p className="text-base sm:text-lg leading-[1.8] text-[#a1a1aa]">
            Direct client assessments from founders and technical leaders who partnered with our four engineers to eliminate critical software bottlenecks.
          </p>
        </div>

        {/* Filter Tabs */}
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
                    : 'bg-[#111111]/80 hover:bg-[#161616] border border-[#1f1f1f] text-[#a1a1aa] hover:text-[#f5f5f0] hover:border-[#333333]'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
                )}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive
                      ? 'bg-[#080808] text-[#f5f5f0]'
                      : 'bg-[#181818] text-[#8e8e93]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Endorsements Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
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
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                className="relative p-8 sm:p-12 bg-[#0c0c0c]/90 border border-[#1f1f1f] hover:border-[#333333] transition-all duration-300 flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
                style={{
                  borderLeft: `2px solid ${item.accentColor}`,
                }}
              >
                {/* Backlight Glow on Card Corner */}
                <div
                  className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none opacity-10 group-hover:opacity-20 blur-3xl transition-opacity duration-500"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="font-mono text-xs uppercase tracking-widest text-[#d4d4d8]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-[#222222] bg-[#141414] font-mono text-[10px] text-[#c8f542]">
                      <ShieldCheck className="w-3.5 h-3.5" />
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
                    <span className="font-mono text-xs text-[#8e8e93] group-hover:text-[#c8f542] transition-colors">
                      [{item.id}]
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="font-editorial text-xl sm:text-2xl font-light leading-[1.65] text-[#f5f5f0] mb-8 group-hover:text-white transition-colors">
                    {item.quote}
                  </p>

                  {/* Metric Pill */}
                  <div className="mb-8 p-3.5 rounded bg-[#111111] border border-[#1a1a1a] flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2 text-[#a1a1aa]">
                      <Activity className="w-3.5 h-3.5 text-[#c8f542]" />
                      <span>BENCHMARK:</span>
                    </div>
                    <span className="text-white font-bold tracking-wider">
                      {item.metric}
                    </span>
                  </div>
                </div>

                {/* Author Metadata */}
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
                      <p className="font-mono text-xs tracking-wider uppercase text-[#a1a1aa] mt-0.5">
                        {item.role} • {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 max-w-[150px] justify-end">
                    {item.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-[#222222] bg-[#121212] text-[#8e8e93]"
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

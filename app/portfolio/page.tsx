'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Filter,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'

interface ProjectItem {
  id: string
  title: string
  slug: string
  client: string
  industry: string
  overview: string
  coverImage: string
  liveUrl?: string
  results: string | Record<string, string>
  techStack: string | string[]
  category: {
    name: string
    slug: string
  }
}

const initialProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Aetheris AI - Autonomous Financial Intelligence',
    slug: 'aetheris-ai',
    client: 'Aetheris Capital Group',
    industry: 'Fintech & Asset Management',
    overview: 'An enterprise intelligence platform ingesting real-time SEC filings and market telemetry to generate predictive macro-risk models.',
    coverImage: '/images/portfolio-aetheris.jpg',
    results: {
      'Turnaround Time': '78% faster brief generation',
      'Extraction Precision': '99.4% entity accuracy',
    },
    techStack: ['Next.js 14', 'Python', 'FastAPI', 'pgvector'],
    category: {
      name: 'AI & Intelligent Systems',
      slug: 'ai-solutions',
    },
  },
  {
    id: 'p2',
    title: 'Veloce Motors - 3D Luxury Hypercar Configurator',
    slug: 'veloce-motors',
    client: 'Veloce Bespoke Automotive',
    industry: 'Luxury Automotive & Retail',
    overview: 'Immersive WebGL digital showroom allowing ultra-high-net-worth clients to customize bespoke hypercars in real time with dynamic lighting shaders.',
    coverImage: '/images/portfolio-veloce.jpg',
    results: {
      'Inquiry Surge': '+320% bookings',
      'Dwell Time': '4.2x increase',
    },
    techStack: ['Three.js', 'React Three Fiber', 'Next.js 14', 'GLSL'],
    category: {
      name: 'Websites & Experiences',
      slug: 'websites',
    },
  },
  {
    id: 'p3',
    title: 'OmniFlow - Autonomous Supply Chain Orchestration',
    slug: 'omniflow-automation',
    client: 'OmniLogistics Global',
    industry: 'Freight & Supply Chain',
    overview: 'Automated dispatching, customs clearance OCR parsing, carrier invoice reconciliation, and proactive exception handling across 12 countries.',
    coverImage: '/images/portfolio-omniflow.jpg',
    results: {
      'Hours Saved': '1,200 hrs/month',
      'Clerical Error Rate': 'Cut to 0.04%',
    },
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Redis'],
    category: {
      name: 'Business Automation',
      slug: 'automation',
    },
  },
  {
    id: 'p4',
    title: 'Nexus Operations OS',
    slug: 'nexus-enterprise-os',
    client: 'Nexus Enterprise Solutions',
    industry: 'SaaS / ERP / Cloud Architecture',
    overview: 'A multi-tenant enterprise operating system unifying procurement, workforce scheduling, live asset telemetry, and real-time ledger accounting.',
    coverImage: '/images/portfolio-aetheris.jpg',
    results: {
      'Active Users': '14,000+ daily active',
      'API Latency': 'Sub-200ms average',
    },
    techStack: ['Next.js App Router', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
    category: {
      name: 'Web Applications & SaaS',
      slug: 'web-apps',
    },
  },
]

const categories = [
  { name: 'All Work', slug: 'all' },
  { name: 'AI & Intelligent Systems', slug: 'ai-solutions' },
  { name: 'Websites & Experiences', slug: 'websites' },
  { name: 'Business Automation', slug: 'automation' },
  { name: 'Web Applications & SaaS', slug: 'web-apps' },
]

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [categoriesList, setCategoriesList] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    Promise.all([
      fetch('/api/projects', { signal: controller.signal }).then((res) => (res.ok ? res.json() : null)),
      fetch('/api/categories', { signal: controller.signal }).then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([projData, catData]) => {
        if (!isMounted) return
        if (projData && Array.isArray(projData) && projData.length > 0) {
          setProjects(projData)
        }
        if (catData && Array.isArray(catData) && catData.length > 0) {
          setCategoriesList([
            { name: 'All Work', slug: 'all' },
            ...catData.map((c: any) => ({ name: c.name, slug: c.slug })),
          ])
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' ||
      p.category?.slug === selectedCategory

    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q)

    return matchesCat && matchesQuery
  })

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#080808] text-[#f5f5f0] min-h-screen">
        {/* Header Section */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#c8f542]">
              INDEX
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#8e8e93]">
              / CASE STUDIES &amp; PRODUCTION PLATFORMS
            </span>
          </div>

          <h1 className="font-editorial text-[clamp(40px,6vw,84px)] font-normal text-[#f5f5f0] tracking-[-0.02em] leading-[1.05] mb-6">
            Engineered for <span className="text-[#c8f542] italic">measurable</span> business leverage.
          </h1>
          <p className="text-base sm:text-lg text-[#a1a1aa] max-w-2xl leading-[1.8]">
            Explore our portfolio of high-performance web platforms, autonomous automation pipelines, and custom AI systems delivered for forward-thinking enterprises.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#1f1f1f]">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {categoriesList.map((cat) => {
                const isSelected = selectedCategory === cat.slug
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-[#f5f5f0] text-[#080808] font-bold border-[#f5f5f0]'
                        : 'bg-[#111111] text-[#a1a1aa] hover:text-[#f5f5f0] border-[#1f1f1f] hover:border-[#333333]'
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e93]" />
              <input
                type="text"
                placeholder="Search platforms, tech, client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#1f1f1f] text-[#f5f5f0] placeholder-[#6b7280] text-xs font-mono focus:outline-none focus:border-[#c8f542] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-[#111111] border border-[#1f1f1f]">
              <p className="text-base text-[#a1a1aa] mb-4">No case studies found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-[#f5f5f0] text-[#080808] font-semibold hover:bg-[#c8f542] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => {
                let parsedResults: Record<string, string> = {}
                try {
                  parsedResults = typeof proj.results === 'string' ? JSON.parse(proj.results) : proj.results
                } catch (e) {}

                let parsedTech: string[] = []
                try {
                  parsedTech = typeof proj.techStack === 'string' ? JSON.parse(proj.techStack) : proj.techStack
                } catch (e) {}

                return (
                  <div
                    key={proj.slug}
                    className="group border border-[#1f1f1f] bg-[#111111] hover:border-[#c8f542] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Banner */}
                      <div className="relative h-52 bg-[#0c0c0c] border-b border-[#1f1f1f] flex flex-col justify-between p-6 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#c8f542]">
                            {proj.industry}
                          </span>
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 border border-[#1f1f1f] bg-[#141414] text-[#8e8e93] hover:text-[#c8f542] hover:border-[#c8f542] transition-colors"
                              aria-label="View live platform"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <div>
                          <span className="font-editorial text-2xl font-normal text-[#f5f5f0] group-hover:text-white transition-colors block">
                            {proj.client}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <span className="font-mono text-xs text-[#8e8e93] uppercase tracking-wider block mb-2">
                          {proj.category?.name || 'Case Study'}
                        </span>
                        <h2 className="font-editorial text-xl font-normal text-[#f5f5f0] mb-3 group-hover:text-white transition-colors">
                          {proj.title}
                        </h2>
                        <p className="text-sm text-[#a1a1aa] line-clamp-3 leading-relaxed mb-6">
                          {proj.overview}
                        </p>

                        {/* Results Strip */}
                        {Object.entries(parsedResults).length > 0 && (
                          <div className="p-3.5 bg-[#0c0c0c] border border-[#1f1f1f] mb-6 space-y-1.5">
                            {Object.entries(parsedResults).slice(0, 2).map(([k, v]) => (
                              <div key={k} className="flex items-center justify-between font-mono text-xs">
                                <span className="text-[#8e8e93]">{k}:</span>
                                <span className="font-bold text-[#c8f542]">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {parsedTech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#141414] text-[#8e8e93] border border-[#1f1f1f]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/portfolio/${proj.slug}`}
                        className="inline-flex items-center justify-between w-full py-3.5 px-4 font-mono text-xs uppercase tracking-wider bg-[#141414] hover:bg-[#c8f542] hover:text-[#080808] text-[#f5f5f0] border border-[#1f1f1f] hover:border-[#c8f542] font-semibold transition-all group/btn"
                      >
                        <span>Inspect Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

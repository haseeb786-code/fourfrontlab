'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Filter,
  CheckCircle2
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
    title: 'Hanaz Luxury Skincare',
    slug: 'hanaz-luxury-skincare',
    client: 'Hanaz Skincare',
    industry: 'E-Commerce / Direct-to-Consumer',
    overview: 'Engineered an ultra-fast headless storefront with custom dynamic bundles, sub-second product pages, and an automated inventory management bridge.',
    coverImage: '/projects/hanaz_main.webp',
    results: {
      'Mobile Conversion': '+240% increase',
      'Average Load Time': '840ms LCP',
      'Reliability': 'Zero downtime architecture',
    },
    techStack: ['Next.js 14', 'Tailwind CSS', 'Shopify Storefront API', 'Vercel Edge'],
    category: {
      name: 'E-Commerce',
      slug: 'ecommerce',
    },
  },
  {
    id: 'p2',
    title: 'Nexus Operations OS',
    slug: 'nexus-enterprise-os',
    client: 'Nexus Enterprise Solutions',
    industry: 'SaaS / ERP / Cloud Architecture',
    overview: 'A multi-tenant enterprise operating system unifying procurement, workforce scheduling, live asset telemetry, and real-time ledger accounting.',
    coverImage: '/projects/nexus_main.jpg',
    results: {
      'Active Users': '14,000+ daily active',
      'Uptime SLA': '99.99% availability',
      'Response Time': 'Sub-200ms API latency',
    },
    techStack: ['Next.js App Router', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Docker'],
    category: {
      name: 'Web Apps & SaaS',
      slug: 'web-apps',
    },
  },
  {
    id: 'p3',
    title: 'RoamEase Kinetic Booking',
    slug: 'roamease-booking',
    client: 'RoamEase Experiences',
    industry: 'Travel & Interactive Maps',
    overview: 'Curated experiential travel platform featuring interactive geospatial routing, offline itineraries, and frictionless one-tap payment processing.',
    coverImage: '/projects/roamease_main.webp',
    results: {
      'Booking Volume': '+185% repeat bookings',
      'Satisfaction': '4.9/5 user rating',
      'CDN Speed': 'Global edge acceleration',
    },
    techStack: ['Next.js 14', 'Framer Motion', 'Stripe API', 'Mapbox GL'],
    category: {
      name: 'Websites & Digital Experiences',
      slug: 'websites',
    },
  },
  {
    id: 'p4',
    title: 'EduTrack Global Learning',
    slug: 'edutrack-learning-hub',
    client: 'EduTrack International',
    industry: 'EdTech / Web Platform',
    overview: 'Cloud-scale educational platform supporting live synchronous classrooms, adaptive AI assessment quizzes, and comprehensive student metrics.',
    coverImage: '/projects/edutrack_main.webp',
    results: {
      'Student Enrollment': '50,000+ active students',
      'Infrastructure Cost': '42% lower server costs',
      'Streaming': 'Zero lag live delivery',
    },
    techStack: ['React 18', 'WebSockets', 'Tailwind CSS', 'Serverless Functions'],
    category: {
      name: 'Web Apps & SaaS',
      slug: 'web-apps',
    },
  },
]

const categories = [
  { name: 'All Work', slug: 'all' },
  { name: 'E-Commerce', slug: 'ecommerce' },
  { name: 'Web Apps & SaaS', slug: 'web-apps' },
  { name: 'Websites & Digital Experiences', slug: 'websites' },
]

export default function PortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [categoriesList, setCategoriesList] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch latest projects and categories from API
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

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' ||
      p.category?.slug === selectedCategory ||
      (selectedCategory === 'websites' && p.category?.slug === 'websites')

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

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case Studies & Production Implementations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Engineered For <span className="text-gradient-cyan">Measurable Impact</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of high-performance web platforms, autonomous automation pipelines, and custom AI systems delivered for forward-thinking enterprises.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categoriesList.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-cyan text-black shadow-glow-cyan'
                      : 'bg-[#0d121c] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, client, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d121c] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-cyan transition-all"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-[#0b0f19] rounded-3xl border border-white/5">
              <p className="text-base text-slate-400">No case studies found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-cyan text-black"
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
                    className="group rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/40 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview Banner */}
                      <div className="relative h-56 bg-gradient-to-tr from-[#0a101d] via-[#101b2f] to-[#15233e] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                        <div className="relative z-10 text-center">
                          <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan block mb-1">
                            {proj.industry}
                          </span>
                          <span className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                            {proj.client}
                          </span>
                        </div>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-slate-300 hover:text-brand-cyan border border-white/10 transition-colors"
                            aria-label="View live deployment"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          {proj.category?.name || 'Case Study'}
                        </span>
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                          {proj.title}
                        </h2>
                        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-6">
                          {proj.overview}
                        </p>

                        {/* Results Strip */}
                        {Object.entries(parsedResults).length > 0 && (
                          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-6 space-y-1.5">
                            {Object.entries(parsedResults).slice(0, 2).map(([k, v]) => (
                              <div key={k} className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">{k}:</span>
                                <span className="font-bold text-brand-cyan font-mono">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {parsedTech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#090d15] text-slate-300 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <a
                        href={`/portfolio/${proj.slug}`}
                        className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-brand-cyan hover:text-black text-slate-200 border border-white/10 transition-all"
                      >
                        <span>Read In-Depth Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
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

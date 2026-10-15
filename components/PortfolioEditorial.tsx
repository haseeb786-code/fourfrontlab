import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export interface ProjectProp {
  id?: string
  slug: string
  title: string
  client: string
  industry?: string
  overview?: string
  scope?: string
  year?: string
  coverImage?: string
  image?: string
  techStack?: string | string[]
  tags?: string[]
  createdAt?: string | Date
  category?: { name: string; slug: string }
}

const defaultProjects = [
  {
    num: '01',
    slug: 'nexus-enterprise-os',
    title: 'Nexus Enterprise OS',
    client: 'Vance Logistics Global',
    scope: 'Cloud ERP & Telemetry Architecture',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75&auto=format',
    tags: ['Next.js 14', 'PostgreSQL', 'Docker', 'Prisma'],
  },
  {
    num: '02',
    slug: 'aetheris-ai',
    title: 'Aetheris AI Intelligence',
    client: 'Aetheris Autonomous Systems',
    scope: 'Domain LLM Orchestration & RAG Pipeline',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=75&auto=format',
    tags: ['Python', 'FastAPI', 'Vector Embeddings', 'Next.js'],
  },
  {
    num: '03',
    slug: 'veloce-motors',
    title: 'Veloce Hypercar Configurator',
    client: 'Veloce Bespoke Automotive',
    scope: 'Kinetic WebGL Showroom & Shaders Engine',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=75&auto=format',
    tags: ['Three.js', 'Next.js 14', 'GLSL', 'Tailwind'],
  },
  {
    num: '04',
    slug: 'omniflow-automation',
    title: 'OmniFlow Automation Core',
    client: 'OmniFlow Infrastructure',
    scope: 'Event-Driven Webhook Queues & CRM Bridge',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=75&auto=format',
    tags: ['Redis', 'Microservices', 'Webhooks', 'Cloud SLA'],
  },
]

export default function PortfolioEditorial({
  initialProjects,
}: {
  initialProjects?: ProjectProp[]
}) {
  const displayProjects =
    initialProjects && initialProjects.length > 0
      ? initialProjects.map((p, idx) => {
          let tags: string[] = []
          if (Array.isArray(p.techStack)) {
            tags = p.techStack
          } else if (typeof p.techStack === 'string') {
            try {
              tags = JSON.parse(p.techStack)
            } catch {
              tags = [p.techStack]
            }
          } else if (p.tags) {
            tags = p.tags
          }

          let year = '2026'
          if (p.createdAt) {
            try {
              year = new Date(p.createdAt).getFullYear().toString()
            } catch {}
          } else if (p.year) {
            year = p.year
          }

          return {
            num: String(idx + 1).padStart(2, '0'),
            slug: p.slug || 'case-study',
            title: p.title,
            client: p.client || 'Enterprise Partner',
            scope: p.overview || p.scope || p.industry || 'Digital Architecture & Platform Engineering',
            year,
            image: p.coverImage || p.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=75&auto=format',
            tags: tags.slice(0, 4),
          }
        })
      : defaultProjects

  return (
    <section id="work" className="w-full bg-[#080808] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#c8f542]">
              04
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#8e8e93]">
              / SELECTED WORKS
            </span>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a1aa] hidden sm:block">
            {displayProjects.length} PRODUCTION SHIPS
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Proven platforms. Built to scale.
          </h2>
          <p className="text-base sm:text-lg leading-[1.8] text-[#a1a1aa]">
            A curated index of production systems engineered with obsessive attention to latency, typography, and clean code.
          </p>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {displayProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col justify-between border border-[#1f1f1f] bg-[#111111] overflow-hidden hover:border-[#c8f542] transition-all duration-300 cursor-pointer"
            >
              {/* Editorial Image: 100% grayscale by default, reveals full color on hover over 400ms */}
              <div className="relative w-full h-[320px] sm:h-[400px] bg-[#080808] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover img-editorial group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#080808]/90 border border-[#1f1f1f] flex items-center justify-center text-[#f5f5f0] group-hover:border-[#c8f542] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#8e8e93] group-hover:text-[#c8f542] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>

              {/* Metadata Container */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#111111]">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs tracking-widest uppercase text-[#8e8e93] mb-3">
                    <span>[{project.num}] {project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#f5f5f0] mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-[#a1a1aa] mb-6 line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#8e8e93] group-hover:text-[#c8f542] transition-colors"
                    >
                      {tag}
                      {idx < project.tags.length - 1 && ' /'}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Works Footer Gateway */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e93] block mb-1">
              PRODUCTION CATALOG
            </span>
            <p className="text-sm text-[#a1a1aa]">
              Review enterprise blueprints, tech stacks, and verified metric reports.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="font-mono text-xs uppercase tracking-[0.15em] text-[#080808] bg-[#f5f5f0] hover:bg-[#c8f542] px-6 py-4 font-semibold transition-colors flex items-center gap-2 group shrink-0"
          >
            <span>Explore All Case Studies</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

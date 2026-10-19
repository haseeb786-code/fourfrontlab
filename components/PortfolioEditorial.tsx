
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    num: '01',
    title: 'Nexus Enterprise OS',
    client: 'Vance Logistics Global',
    scope: 'Cloud ERP & Telemetry Architecture',
    year: '2026',
    image: '/projects/nexus_main.jpg',
    tags: ['Next.js 14', 'PostgreSQL', 'Docker', 'Prisma'],
  },
  {
    num: '02',
    title: 'Aetheris AI Intelligence',
    client: 'Aetheris Autonomous Systems',
    scope: 'Domain LLM Orchestration & RAG Pipeline',
    year: '2026',
    image: '/images/portfolio-aetheris.jpg',
    tags: ['Python', 'FastAPI', 'Vector Embeddings', 'Next.js'],
  },
  {
    num: '03',
    title: 'Hanaz Luxury Commerce',
    client: 'Hanaz Atelier London',
    scope: 'Kinetic WebGL Storefront & Checkout Engine',
    year: '2025',
    image: '/projects/hanaz_main.webp',
    tags: ['Three.js', 'Next.js 14', 'Stripe API', 'Tailwind'],
  },
  {
    num: '04',
    title: 'OmniFlow Automation Core',
    client: 'OmniFlow Infrastructure',
    scope: 'Event-Driven Webhook Queues & CRM Bridge',
    year: '2025',
    image: '/images/portfolio-omniflow.jpg',
    tags: ['Redis', 'Microservices', 'Webhooks', 'Cloud SLA'],
  },
]

export default function PortfolioEditorial() {
  return (
    <section id="work" className="w-full bg-[#080808] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              04
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / SELECTED WORKS
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hidden sm:block">
            4 PRODUCTION SHIPS
          </div>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Proven platforms. Built to scale.
          </h2>
          <p className="text-base leading-[1.8] text-[#6b6b6b]">
            A curated index of production systems engineered with obsessive attention to latency, typography, and clean code.
          </p>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {projects.map((project) => (
            <div
              key={project.num}
              className="group flex flex-col justify-between border border-[#1f1f1f] bg-[#111111] overflow-hidden hover:border-[#c8f542] transition-colors duration-300"
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
                <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#080808] border border-[#1f1f1f] flex items-center justify-center text-[#f5f5f0] group-hover:border-[#c8f542] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#c8f542] transition-colors" />
                </div>
              </div>

              {/* Metadata Container */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-[#111111]">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase text-[#3a3a3a] mb-3">
                    <span>[{project.num}] {project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#f5f5f0] mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-[1.8] text-[#6b6b6b] mb-6">
                    {project.scope}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] uppercase tracking-wider text-[#3a3a3a] group-hover:text-[#6b6b6b] transition-colors"
                    >
                      {tag}
                      {idx < project.tags.length - 1 && ' /'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// Minimal 24px Line SVGs (Pure White)
function CodeIcon() {
  return (
    <svg className="w-6 h-6 stroke-white fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function AutomationIcon() {
  return (
    <svg className="w-6 h-6 stroke-white fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function SoftwareIcon() {
  return (
    <svg className="w-6 h-6 stroke-white fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function IntelligenceIcon() {
  return (
    <svg className="w-6 h-6 stroke-white fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

const services = [
  {
    num: '01',
    title: 'Kinetic Web Development',
    desc: 'Ultra-fast Next.js 14 web flagships with custom 3D WebGL canvases, fluid animations, and sub-second load times engineered for high conversion.',
    icon: CodeIcon,
    deliverables: ['Next.js 14 Architecture', 'Three.js / Canvas Physics', '100/100 Core Web Vitals', 'Headless CMS Integration'],
  },
  {
    num: '02',
    title: 'Business Automation',
    desc: 'Eliminate repetitive manual operations by constructing event-driven pipelines, webhook bridges, ERP synchronizations, and CRM workflows.',
    icon: AutomationIcon,
    deliverables: ['API & Webhook Pipelines', 'Custom CRM Integrations', 'Automated Lead Routing', 'Asynchronous Queues'],
  },
  {
    num: '03',
    title: 'Custom Software & Portals',
    desc: 'Bespoke client dashboards, internal administrative portals, and scalable cloud systems built with secure relational database schemas.',
    icon: SoftwareIcon,
    deliverables: ['Role-Based Authentication', 'PostgreSQL & Prisma', 'Multi-Tenant Architecture', 'Real-time Telemetry'],
  },
  {
    num: '04',
    title: 'Enterprise AI Solutions',
    desc: 'Domain-grounded AI assistants, automated data extraction agents, and retrieval-augmented intelligence strictly isolated on private company data.',
    icon: IntelligenceIcon,
    deliverables: ['Private RAG Pipelines', 'Automated Document Parsing', 'Custom LLM Agents', 'Zero Data Retention API'],
  },
]

export default function ServicesEditorial() {
  return (
    <section id="services" className="w-full bg-[#111111] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              03
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / CAPABILITIES
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hidden sm:block">
            END-TO-END EXECUTION
          </div>
        </div>

        {/* Section Intro */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Engineered for performance, not decoration.
          </h2>
          <p className="text-base leading-[1.8] text-[#6b6b6b]">
            We build tools that solve genuine operational bottlenecks and move businesses forward. No bloatware. No generic templates.
          </p>
        </div>

        {/* 4 Service Cards Grid (Sharp Bordered Boxes with Acid Green Knife-Edge Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.num}
                className="p-8 sm:p-10 bg-[#080808] border border-[#1f1f1f] hover:border-[#c8f542] transition-colors duration-200 flex flex-col justify-between group min-h-[360px]"
              >
                <div>
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-10 h-10 border border-[#1f1f1f] flex items-center justify-center bg-[#111111]">
                      <Icon />
                    </div>
                    <span className="font-mono text-xs text-[#3a3a3a] group-hover:text-[#c8f542] transition-colors">
                      [{service.num}]
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#f5f5f0] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-[#6b6b6b] mb-8">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1f1f1f] flex flex-wrap gap-y-2 gap-x-4">
                  {service.deliverables.map((item, idx) => (
                    <span key={idx} className="font-mono text-[10px] uppercase tracking-wider text-[#3a3a3a] group-hover:text-[#6b6b6b] transition-colors">
                      • {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    num: '01',
    title: 'Website Development & Kinetic Architecture',
    slug: 'website-development',
    tag: 'Awwwards-Tier Production',
    description:
      'We design and engineer bespoke web applications with fluid kinetic physics, micro-interactions, responsive 60fps animations, and sub-second TTFB on Next.js 14 App Router.',
    deliverables: [
      'Custom 3D / WebGL interactive elements',
      'Framer Motion scroll-linked choreography',
      'SEO-hardened SSR & dynamic metadata',
      'Automated CI/CD & global edge caching',
    ],
  },
  {
    num: '02',
    title: 'Business Automation & Autonomous Workflows',
    slug: 'business-automation',
    tag: 'Operational Velocity',
    description:
      'Eliminate repetitive bottlenecks with custom multi-system automation pipelines. We seamlessly bridge your CRM, accounting, inventory, and communication channels into one continuous engine.',
    deliverables: [
      'Webhook orchestration & API bridges',
      'Zapier / Make / n8n custom enterprise integrations',
      'Automated invoice & lead routing triggers',
      'Error-resilient event logging & failover alerts',
    ],
  },
  {
    num: '03',
    title: 'AI Solutions & Domain-Specific Integrations',
    slug: 'ai-solutions',
    tag: 'Enterprise Intelligence',
    description:
      'Deploy state-of-the-art generative intelligence into your core business. From domain-specific RAG knowledge bases to autonomous customer care agents and automated media generation.',
    deliverables: [
      'Retrieval-Augmented Generation (RAG) on private data',
      'Fine-tuned Gemini & OpenAI function calling',
      'Multimodal document understanding & parsing',
      'End-to-end data privacy & zero-training compliance',
    ],
  },
  {
    num: '04',
    title: 'Digital Marketing & Conversion Architecture',
    slug: 'digital-marketing',
    tag: 'Measurable ROI',
    description:
      'Transform traffic into predictable revenue. We combine data-driven conversion rate optimization (CRO), high-intent SEO authority, and algorithmic paid acquisition to scale your market presence.',
    deliverables: [
      'Comprehensive funnel & friction auditing',
      'Technical SEO architecture & schema graph',
      'High-converting landing page variants',
      'Realtime analytics dashboards & attribution tracking',
    ],
  },
]

export default function InvertedServices() {
  return (
    <section
      id="services"
      className="relative w-full bg-white text-[#0C0C0C] rounded-t-[50px] sm:rounded-t-[70px] lg:rounded-t-[90px] pt-24 sm:pt-32 pb-24 sm:pb-36 px-6 sm:px-12 lg:px-20 z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 sm:pb-24 border-b border-[rgba(12,12,12,0.15)]">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-[0.3em] text-[#0C0C0C]/60 mb-3">
              [ Four Front Services • 03 ]
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0C0C0C] leading-[0.95]">
              Capabilities <br />
              &amp; Systems
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#0C0C0C]/75 font-normal leading-relaxed">
            Every engagement is engineered from clean code up. No off-the-shelf templates, no bloat—only bespoke digital excellence built to outperform.
          </p>
        </div>

        {/* Services List with Gigantic Typographic Counters */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)]">
          {services.map((service) => (
            <div
              key={service.num}
              className="py-16 sm:py-24 group transition-colors duration-500 hover:bg-[#0C0C0C]/[0.02] -mx-6 px-6 sm:-mx-12 sm:px-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Counter */}
                <div className="lg:col-span-3">
                  <span className="text-[clamp(3.5rem,10vw,120px)] font-black text-[#0C0C0C]/20 group-hover:text-[#0C0C0C] transition-colors duration-500 leading-none block font-mono select-none">
                    {service.num}
                  </span>
                  <span className="inline-block mt-2 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C]/70">
                    {service.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="lg:col-span-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#0C0C0C] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0C0C0C]/70 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#0C0C0C]/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0C0C0C] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="lg:col-span-3 flex lg:justify-end items-center pt-4 lg:pt-0">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0C0C0C] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B600A8] transition-colors shadow-md group-hover:scale-105 duration-300"
                  >
                    <span>Inspect Specs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Challenge Banner */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-[#0C0C0C] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/60">
              [ Bespoke Problem Solving ]
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
              Have a unique technical challenge?
            </h4>
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-1 max-w-lg">
              We engineer custom software architectures, private internal tools, and high-security customer portals tailored to exact specifications.
            </p>
          </div>

          <Link
            href="/services/custom-software"
            className="btn-kinetic-cta inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-xs font-semibold uppercase tracking-widest shrink-0"
          >
            <span>Describe Challenge</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

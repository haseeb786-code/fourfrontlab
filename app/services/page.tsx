import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { 
  Code, 
  Cpu, 
  Bot, 
  BarChart, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react'

const iconMap: Record<string, any> = {
  Code,
  Cpu,
  Bot,
  BarChart,
  Layers,
}

const defaultServices = [
  {
    title: 'Website Development',
    slug: 'website-development',
    icon: 'Code',
    shortDesc: 'Bespoke, lightning-fast digital flagships crafted with Next.js 14, 3D WebGL interactions, and conversion-engineered architecture.',
    deliverables: JSON.stringify([
      'Custom 3D & WebGL Visual Centers',
      'Sub-Second Edge Rendering (Core Web Vitals 99+)',
      'Headless CMS & Content Workflows',
      'Multi-Device Responsive Optimization',
    ]),
    benefits: JSON.stringify([
      'Sub-second load speeds boost search rankings',
      'Distinctive visual branding separates you from competitors',
      'Intuitive admin CMS allows effortless updates without developers',
    ]),
  },
  {
    title: 'Business Automation',
    slug: 'business-automation',
    icon: 'Cpu',
    shortDesc: 'Eliminate repetitive manual tasks, eradicate human data entry errors, and interconnect your entire software stack with self-healing workflows.',
    deliverables: JSON.stringify([
      'Cross-System API & Webhook Bridges',
      'Automated Invoice & Document OCR Extraction',
      'Multi-Tier CRM Lead Routing Engines',
      'Failure-Proof Queue Workers & Error Alerts',
    ]),
    benefits: JSON.stringify([
      'Save 150+ employee hours monthly per department',
      'Reduce operational data entry errors to practically 0%',
      'Scale transaction volume 10x without hiring proportional back-office staff',
    ]),
  },
  {
    title: 'AI Solutions & Integrations',
    slug: 'ai-solutions',
    icon: 'Bot',
    shortDesc: 'Custom LLM agents, proprietary vector retrieval (RAG), multimodal assistants, and predictive models tailored to your business knowledge base.',
    deliverables: JSON.stringify([
      'Proprietary RAG & Vector Knowledge Retrieval',
      'Autonomous Task-Execution AI Agents',
      'Intelligent Multimodal Document Extraction',
      'Zero-Data-Retention Enterprise Boundaries',
    ]),
    benefits: JSON.stringify([
      'Empower teams to interrogate complex company databases in natural language',
      'Automate 80% of customer support queries with contextual accuracy',
      'Accelerate executive document synthesis from hours to seconds',
    ]),
  },
  {
    title: 'Digital Marketing & Growth',
    slug: 'digital-marketing',
    icon: 'BarChart',
    shortDesc: 'Data-backed performance marketing, programmatic SEO engines, and conversion rate optimization that transform clicks into enterprise pipeline.',
    deliverables: JSON.stringify([
      'High-Converting Funnel & Landing Architecture',
      'Technical & Programmatic SEO Systems',
      'Advanced Multi-Touch Attribution Tracking',
      'Systematic Multivariate A/B Testing',
    ]),
    benefits: JSON.stringify([
      'Lower customer acquisition cost through laser-targeted messaging',
      'Multiply conversion rates on existing traffic by 2x to 4x',
      'Unify marketing spend and closed revenue in real-time dashboards',
    ]),
  },
  {
    title: 'Custom Business Solutions',
    slug: 'custom-software',
    icon: 'Layers',
    shortDesc: 'Tailored web applications, internal operational hubs, customer portals, and specialized software engineered precisely to your exact business workflow.',
    deliverables: JSON.stringify([
      'Custom Web Portals & Enterprise Dashboards',
      'Role-Based Access Control (RBAC) & Security',
      'Interactive Data Visualizations & Reporting',
      'Scalable Relational Database Schemas',
    ]),
    benefits: JSON.stringify([
      'Own your software asset entirely with zero recurring per-seat SaaS tax',
      'Unify fragmented spreadsheets into a single source of operational truth',
      'Give clients a branded, white-glove digital portal that builds loyalty',
    ]),
  },
]

import type { Metadata } from 'next'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Services | Next.js Agency & AI Automation Pakistan',
  description:
    'Next.js development agency in Islamabad offering custom web apps, autonomous business automation, and AI integrations for startups.',
  alternates: {
    canonical: 'https://fourfrontlab.tech/services',
  },
  openGraph: {
    title: 'Services | Next.js Agency & AI Automation Pakistan',
    description:
      'Next.js development agency in Islamabad offering custom web apps, autonomous business automation, and AI integrations for startups.',
    url: 'https://fourfrontlab.tech/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Four Front Lab Services' }],
  },
}

export default async function ServicesPage() {
  let services = defaultServices

  try {
    const dbServices = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    if (dbServices.length > 0) {
      services = dbServices as any
    }
  } catch (e) {}

  return (
    <>
      <ServiceJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Spectrum Digital Engineering</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Our Core <span className="text-gradient-cyan">Specializations</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our specialized engineering disciplines. Every solution is customized to your exact technical architecture with guaranteed performance and zero fluff.
          </p>
        </div>

        {/* Services List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code

              let deliverables: string[] = []
              try {
                deliverables = typeof service.deliverables === 'string' ? JSON.parse(service.deliverables) : service.deliverables
              } catch (e) {}

              let benefits: string[] = []
              try {
                benefits = typeof service.benefits === 'string' ? JSON.parse(service.benefits) : service.benefits
              } catch (e) {}

              const isEven = index % 2 === 0

              return (
                <div
                  key={service.slug}
                  className="p-8 sm:p-12 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block mb-2 font-semibold">
                      Discipline 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-2 mb-8">
                      {benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-brand-cyan hover:bg-white text-black transition-colors"
                    >
                      <span>Explore Deliverables & Tech Stack</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="p-6 rounded-2xl bg-[#090d15] border border-white/5 space-y-4">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2">
                        Included Deliverables
                      </div>
                      <ul className="space-y-2.5">
                        {deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0"></span>
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> Full code transfer & production warranty
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-[#0d1627] to-[#120e24] border border-brand-cyan/30 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Need Multiple Services or a Custom Architecture?
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
              Our engineering team builds cross-functional solutions combining Web, AI, and Automation into a unified platform.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-cyan to-brand-blue text-black shadow-glow-cyan hover:scale-105 transition-all"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

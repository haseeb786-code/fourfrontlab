import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import type { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const revalidate = 60

const fallbackCaseStudies: Record<string, any> = {
  'hanaz-luxury-skincare': {
    title: 'Hanaz Luxury Skincare',
    slug: 'hanaz-luxury-skincare',
    client: 'Hanaz Skincare',
    industry: 'E-Commerce / Direct-to-Consumer',
    overview: 'Engineered an ultra-fast headless storefront with custom dynamic bundles, sub-second product pages, and an automated inventory management bridge.',
    problem: 'The client faced high mobile bounce rates and cart drop-offs due to a monolithic legacy store with 4+ second load times and fragmented manual stock reconciliation.',
    solution: 'Re-architected the storefront using Next.js 14 App Router, headless Shopify Storefront API, automated dynamic bundling, and edge-cached product catalogs.',
    techStack: JSON.stringify(['Next.js 14', 'Tailwind CSS', 'Shopify Storefront API', 'Vercel Edge', 'TypeScript']),
    results: JSON.stringify({
      'Mobile Conversion': '+240% increase',
      'Average Load Time': '840ms LCP',
      'Architecture': 'Zero downtime deployment',
      'Catalog Indexing': 'Sub-second search',
    }),
    category: { name: 'E-Commerce' },
  },
  'nexus-enterprise-os': {
    title: 'Nexus Operations OS',
    slug: 'nexus-enterprise-os',
    client: 'Nexus Enterprise Solutions',
    industry: 'SaaS / ERP / Cloud Architecture',
    overview: 'A multi-tenant enterprise operating system unifying procurement, workforce scheduling, live asset telemetry, and real-time ledger accounting.',
    problem: 'Siloed spreadsheets and fragmented legacy ERP tools caused manual clerical errors, slow data retrieval, and lack of real-time operational visibility across departments.',
    solution: 'Engineered a modern unified operations cloud OS featuring modular microservices, multi-tenant role-based access control, Prisma ORM, and automated ledger workflows.',
    techStack: JSON.stringify(['Next.js App Router', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Docker', 'Tailwind CSS']),
    results: JSON.stringify({
      'Active Users': '14,000+ daily active',
      'System Uptime': '99.99% enterprise SLA',
      'API Response Time': 'Sub-200ms average',
      'Clerical Friction': '85% reduction in manual data entry',
    }),
    category: { name: 'Web Apps & SaaS' },
  },
  'aetheris-ai': {
    title: 'Aetheris AI - Autonomous Financial Intelligence',
    slug: 'aetheris-ai',
    client: 'Aetheris Capital Group',
    industry: 'Fintech & Asset Management',
    overview: 'An enterprise intelligence platform ingesting real-time SEC filings and market telemetry to generate predictive macro-risk models and automated portfolio rebalancing briefs.',
    problem: 'Investment analysts spent 14+ manual hours compiling risk dossiers across Bloomberg terminals, PDF reports, and spreadsheets, delaying time-critical trading decisions.',
    solution: 'Engineered a real-time reactive Next.js 14 mission control connected to Python vector microservices. Analysts query complex filings using natural language with zero-latency streaming responses.',
    techStack: JSON.stringify(['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Claude 3.5 Sonnet', 'pgvector', 'Three.js']),
    results: JSON.stringify({
      'Turnaround Time': '78% faster brief generation',
      'Model Accuracy': '99.4% entity extraction precision',
      'Annual Savings': '$1.4M saved in research labor',
    }),
    category: { name: 'AI & Intelligent Systems' },
  },
  'veloce-motors': {
    title: 'Veloce Motors - 3D Luxury Hypercar Configurator',
    slug: 'veloce-motors',
    client: 'Veloce Bespoke Automotive',
    industry: 'Luxury Automotive & Retail',
    overview: 'Immersive WebGL digital showroom allowing ultra-high-net-worth clients to customize bespoke hypercars in real time with dynamic lighting, paint reflection shaders, and concierge booking.',
    problem: 'Static brochure websites suffered high bounce rates and could not convey the tactile precision of bespoke carbon fiber options, causing low private-viewing bookings.',
    solution: 'Constructed a 60fps WebGL / Three.js 3D configurator featuring procedural material shaders, realistic audio feedback, and instant VIP WhatsApp concierge reservations.',
    techStack: JSON.stringify(['Three.js', 'React Three Fiber', 'Next.js 14', 'GLSL Shaders', 'Tailwind CSS', 'Web Audio API', 'Stripe']),
    results: JSON.stringify({
      'Test Drive Inquiries': '+320% qualified bookings',
      'Average Dwell Time': '4.2x increase in session length',
      'Industry Recognition': 'Awwwards Site of the Day Nominee',
    }),
    category: { name: 'Websites & Digital Experiences' },
  },
  'omniflow-automation': {
    title: 'OmniFlow - Autonomous Supply Chain Orchestration',
    slug: 'omniflow-automation',
    client: 'OmniLogistics Global',
    industry: 'Freight & Supply Chain',
    overview: 'Automated dispatching, customs clearance OCR parsing, carrier invoice reconciliation, and proactive exception handling across 12 countries.',
    problem: 'Fragmented legacy ERP systems forced 25 back-office operators to manually re-key manifests, producing costly 4.2% error rates and shipping delays.',
    solution: 'Designed an event-driven automation engine with OCR document processors, self-healing webhook queues, and an executive telemetry dashboard.',
    techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Redis', 'Python OCR', 'WhatsApp Business API']),
    results: JSON.stringify({
      'Hours Saved': '1,200 hours / month eliminated',
      'Error Reduction': 'Clerical errors cut to 0.04%',
      'Break-Even': 'Full ROI achieved in 47 days',
    }),
    category: { name: 'Business Automation' },
  },
}

const getProject = cache(async (slug: string) => {
  let project = fallbackCaseStudies[slug] || null
  try {
    const dbProj = await prisma.project.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (dbProj) {
      project = dbProj
    }
  } catch (e) {}
  return project
})

export async function generateStaticParams() {
  const fallbackSlugs = Object.keys(fallbackCaseStudies).map((slug) => ({ slug }))
  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
    })
    const allSlugs = new Set([...fallbackSlugs.map((s) => s.slug), ...dbProjects.map((p) => p.slug)])
    return Array.from(allSlugs).map((slug) => ({ slug }))
  } catch {
    return fallbackSlugs
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const project = await getProject(slug)

  if (!project) return { title: 'Case Study | Four Front Lab' }

  return {
    title: `${project.title} | Four Front Lab Case Study`,
    description: project.overview.slice(0, 150),
    alternates: {
      canonical: `https://fourfrontlab.tech/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Four Front Lab`,
      description: project.overview.slice(0, 150),
      url: `https://fourfrontlab.tech/portfolio/${slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: project.title }],
    },
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  if (project.published === false) {
    const admin = await getCurrentAdmin()
    if (!admin) {
      notFound()
    }
  }

  let parsedResults: Record<string, string> = {}
  try {
    parsedResults = typeof project.results === 'string' ? JSON.parse(project.results) : project.results
  } catch (e) {}

  let parsedTech: string[] = []
  try {
    parsedTech = typeof project.techStack === 'string' ? JSON.parse(project.techStack) : project.techStack
  } catch (e) {}

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Portfolio', url: '/portfolio' },
          { name: project.title, url: `/portfolio/${slug}` },
        ]}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#080808] text-[#f5f5f0] min-h-screen">
        {/* Back Link */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8e8e93] hover:text-[#c8f542] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-16">
          <div className="p-8 sm:p-14 bg-[#111111] border border-[#1f1f1f] relative overflow-hidden">
            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[#0c0c0c] text-[#c8f542] border border-[#1f1f1f]">
                  {project.category?.name || 'Case Study'}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8e8e93]">
                  Client: <strong className="text-white">{project.client}</strong>
                </span>
                <span className="text-[#333333]">•</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8e8e93]">
                  Industry: <strong className="text-white">{project.industry}</strong>
                </span>
              </div>

              <h1 className="font-editorial text-[clamp(36px,5vw,72px)] font-normal text-white tracking-[-0.02em] leading-[1.05] mb-6">
                {project.title}
              </h1>

              <p className="text-base sm:text-xl text-[#a1a1aa] leading-relaxed mb-8">
                {project.overview}
              </p>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 font-mono text-xs uppercase tracking-wider font-semibold bg-[#f5f5f0] hover:bg-[#c8f542] text-[#080808] transition-colors group"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Quantifiable Results Banner */}
        {Object.entries(parsedResults).length > 0 && (
          <section className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-16">
            <div className="p-8 bg-[#0c0c0c] border border-[#1f1f1f]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#c8f542] mb-6 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Verified Business Metrics &amp; Operational ROI</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(parsedResults).map(([key, val]) => (
                  <div key={key} className="p-4 bg-[#111111] border border-[#1f1f1f]">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
                      {val}
                    </div>
                    <div className="text-xs font-mono text-[#8e8e93] uppercase tracking-wider">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The Challenge & Solution Deep Dive */}
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              {/* The Problem */}
              <div className="p-8 sm:p-10 bg-[#111111] border border-[#1f1f1f]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8e8e93] block mb-2">
                  // THE CHALLENGE
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-4">
                  The Operational Bottleneck
                </h2>
                <p className="text-[#a1a1aa] text-base leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* The Solution */}
              <div className="p-8 sm:p-10 bg-[#111111] border border-[#1f1f1f]">
                <span className="font-mono text-xs uppercase tracking-widest text-[#c8f542] block mb-2">
                  // THE SOLUTION
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-4">
                  The Engineered Platform
                </h2>
                <p className="text-[#a1a1aa] text-base leading-relaxed mb-6">
                  {project.solution}
                </p>
                <div className="space-y-3 pt-6 border-t border-[#1f1f1f]">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#d4d4d8]">
                    <CheckCircle2 className="w-4 h-4 text-[#c8f542] shrink-0" />
                    <span>Engineered from scratch without templates or technical debt</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#d4d4d8]">
                    <CheckCircle2 className="w-4 h-4 text-[#c8f542] shrink-0" />
                    <span>Delivered on global edge CDN with sub-second execution runtime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack & Metadata Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-[#111111] border border-[#1f1f1f]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#c8f542]" />
                  <span>Technical Stack</span>
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {parsedTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono uppercase bg-[#0c0c0c] text-[#c8f542] border border-[#1f1f1f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#1f1f1f] space-y-2 font-mono text-xs text-[#8e8e93]">
                  <div><strong className="text-white">Architecture:</strong> Edge Microservices</div>
                  <div><strong className="text-white">Security:</strong> Role-Based Auth + Encrypted VPC</div>
                  <div><strong className="text-white">Deployment:</strong> Automated CI/CD</div>
                </div>
              </div>

              {/* Inquiry prompt */}
              <div className="p-6 bg-[#111111] border border-[#1f1f1f]">
                <h4 className="font-editorial text-xl font-normal text-white mb-2">
                  Need a Similar Platform?
                </h4>
                <p className="text-xs text-[#a1a1aa] mb-4 leading-relaxed">
                  Our engineering leads can scope an identical architecture tailored to your business operations.
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#c8f542] hover:text-white transition-colors"
                >
                  <span>Request Scoping Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Project Inquiry Section */}
        <section id="inquiry" className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="p-8 sm:p-12 bg-[#111111] border border-[#1f1f1f]">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono text-[#c8f542] uppercase tracking-wider block mb-2 font-semibold">
                Direct Engineering Scoping
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl font-normal text-white mb-2">
                Deploy an Engine Like {project.client}
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa]">
                Share your requirements to receive a customized technical plan and budget breakdown within 12 business hours.
              </p>
            </div>

            <InquiryForm initialService={project.category?.name || 'Custom Business Solutions'} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

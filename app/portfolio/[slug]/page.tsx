import React from 'react'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
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
} from 'lucide-react'
import type { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

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
  'roamease-booking': {
    title: 'RoamEase Kinetic Booking',
    slug: 'roamease-booking',
    client: 'RoamEase Experiences',
    industry: 'Travel & Interactive Maps',
    overview: 'Curated experiential travel platform featuring interactive geospatial routing, offline itineraries, and frictionless one-tap payment processing.',
    problem: 'Travelers struggled with slow, disjointed map interfaces, confusing checkout flows, and unreliable connectivity during on-location journey exploration.',
    solution: 'Designed and deployed an interactive geospatial web application featuring Mapbox GL routing, Framer Motion transitions, offline itinerary sync, and seamless Stripe checkout.',
    techStack: JSON.stringify(['Next.js 14', 'Framer Motion', 'Stripe API', 'Mapbox GL', 'Tailwind CSS', 'TypeScript']),
    results: JSON.stringify({
      'Booking Volume': '+185% repeat bookings',
      'User Satisfaction': '4.9/5 user rating',
      'Global CDN': 'Edge accelerated worldwide',
      'Cart Checkout': 'Frictionless one-tap flow',
    }),
    category: { name: 'Websites & Digital Experiences' },
  },
  'edutrack-learning-hub': {
    title: 'EduTrack Global Learning',
    slug: 'edutrack-learning-hub',
    client: 'EduTrack International',
    industry: 'EdTech / Web Platform',
    overview: 'Cloud-scale educational platform supporting live synchronous classrooms, adaptive AI assessment quizzes, and comprehensive student metrics.',
    problem: 'Existing learning systems suffered severe latency during peak exam traffic, with frequent disconnects during live lectures and zero granular student telemetry.',
    solution: 'Built an elastic educational platform utilizing React 18, persistent WebSockets, serverless API functions, and adaptive quiz assessment engines.',
    techStack: JSON.stringify(['React 18', 'WebSockets', 'Tailwind CSS', 'Serverless Functions', 'PostgreSQL', 'TypeScript']),
    results: JSON.stringify({
      'Active Students': '50,000+ enrolled',
      'Server Cost': '42% lower infrastructure spend',
      'Streaming Latency': 'Zero lag live lecture delivery',
      'Quiz Completion': '94% course completion rate',
    }),
    category: { name: 'Web Apps & SaaS' },
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  let project = fallbackCaseStudies[slug]
  try {
    const dbProj = await prisma.project.findUnique({ where: { slug } })
    if (dbProj) project = dbProj
  } catch (e) {}

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

  let project = fallbackCaseStudies[slug]

  try {
    const dbProj = await prisma.project.findUnique({
      where: { slug },
      include: { category: true },
    })
    if (dbProj) {
      project = dbProj
    }
  } catch (e) {}

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

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </a>
        </div>

        {/* Hero Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0b0f19] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                  {project.category?.name || 'Case Study'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Client: <strong className="text-white">{project.client}</strong>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  Industry: <strong className="text-white">{project.industry}</strong>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
                {project.title}
              </h1>

              <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8">
                {project.overview}
              </p>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-cyan to-brand-blue text-black shadow-glow-cyan hover:scale-105 transition-all"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Quantifiable Results Banner */}
        {Object.entries(parsedResults).length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="p-8 rounded-3xl bg-[#090d15] border border-brand-cyan/20">
              <div className="text-xs font-mono uppercase tracking-wider text-brand-cyan mb-6 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Verified Business Metrics & ROI</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(parsedResults).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xl sm:text-2xl font-bold font-mono text-brand-cyan mb-1">
                      {val}
                    </div>
                    <div className="text-xs text-slate-400">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The Challenge & Solution Deep Dive */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              {/* The Problem */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19] border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4 text-gradient">
                  The Operational Challenge
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* The Solution */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19] border border-brand-cyan/30">
                <h2 className="text-2xl font-bold text-white mb-4 text-gradient-cyan">
                  The Engineered Solution
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {project.solution}
                </p>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Engineered from scratch without templates or technical debt</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Delivered on global edge CDN with 99.8% uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack & Metadata Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brand-cyan" />
                  Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {parsedTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#090d15] text-brand-cyan border border-brand-cyan/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
                  <div><strong className="text-white">Architecture:</strong> Edge Microservices</div>
                  <div><strong className="text-white">Security:</strong> Role-Based Auth + Encrypted VPC</div>
                  <div><strong className="text-white">Deployment:</strong> Automated CI/CD</div>
                </div>
              </div>

              {/* Inquiry prompt */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0e1726] to-[#120f26] border border-brand-cyan/40">
                <h4 className="text-base font-bold text-white mb-2">
                  Need a Similar Platform?
                </h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Our engineering leads can scope an identical architecture tailored to your business operations.
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:text-white transition-colors"
                >
                  <span>Request Scoping Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Project Inquiry Section */}
        <section id="inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0f19] border border-brand-cyan/40 shadow-2xl backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block mb-2 font-semibold">
                Direct Engineering Scoping
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Deploy an Engine Like {project.client}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Share your requirements to receive a customized technical plan and budget breakdown.
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

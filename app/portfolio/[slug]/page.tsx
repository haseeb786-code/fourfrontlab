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
  Layers
} from 'lucide-react'

const fallbackCaseStudies: Record<string, any> = {
  'aetheris-ai': {
    title: 'Aetheris AI - Autonomous Financial Intelligence',
    slug: 'aetheris-ai',
    client: 'Aetheris Capital Group',
    industry: 'Fintech & Asset Management',
    overview: 'An enterprise intelligence platform ingesting real-time SEC filings and market telemetry to generate predictive macro-risk models and automated portfolio rebalancing briefs.',
    problem: 'Investment analysts spent 14+ manual hours compiling risk dossiers across Bloomberg terminals, PDF reports, and spreadsheets, delaying time-critical trading decisions and introducing human synthesis errors.',
    solution: 'Engineered a real-time reactive Next.js 14 mission control connected to Python vector microservices. Analysts query complex filings using natural language with zero-latency streaming responses and private VPC inference.',
    techStack: JSON.stringify(['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Claude 3.5 Sonnet', 'pgvector', 'Three.js']),
    results: JSON.stringify({
      'Turnaround Time': '78% faster brief generation',
      'Model Precision': '99.4% entity extraction precision',
      'Annual Labor Savings': '$1.4M saved in research costs',
      'Active User Adoption': '100% analyst team retention',
    }),
    liveUrl: 'https://aetheris-demo.fourfrontlab.com',
    category: { name: 'AI & Intelligent Systems' },
  },
  'veloce-motors': {
    title: 'Veloce Motors - 3D Luxury Hypercar Configurator',
    slug: 'veloce-motors',
    client: 'Veloce Bespoke Automotive',
    industry: 'Luxury Automotive & Retail',
    overview: 'Immersive WebGL digital showroom allowing ultra-high-net-worth clients to customize bespoke hypercars in real time with dynamic lighting, paint reflection shaders, and concierge booking.',
    problem: 'Static brochure websites suffered high bounce rates (68%) and could not convey the tactile precision of bespoke carbon fiber options, causing low private-viewing bookings for multi-million dollar allocations.',
    solution: 'Constructed a 60fps WebGL / Three.js 3D configurator featuring procedural material shaders, realistic audio feedback, and instant VIP WhatsApp concierge reservations.',
    techStack: JSON.stringify(['Three.js', 'React Three Fiber', 'Next.js 14', 'GLSL Shaders', 'Tailwind CSS', 'Web Audio API', 'Stripe']),
    results: JSON.stringify({
      'Private Viewings': '+320% qualified bookings',
      'Average Dwell Time': '4.2x increase in session length',
      'Industry Recognition': 'Awwwards Site of the Day Nominee',
      'Mobile Performance': '60 FPS on iOS and Android',
    }),
    liveUrl: 'https://veloce.fourfrontlab.com',
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
      'Manual Labor Eliminated': '1,200 hours / month saved',
      'Error Rate': 'Reduced from 4.2% to 0.04%',
      'ROI Break-Even': 'Full payback achieved in 47 days',
      'Carrier Sync': 'Sub-second real-time tracking updates',
    }),
    liveUrl: 'https://omniflow.fourfrontlab.com',
    category: { name: 'Business Automation' },
  },
  'kura-health': {
    title: 'Kura Health - Intelligent Telehealth & Clinician Hub',
    slug: 'kura-health',
    client: 'Kura Health Systems',
    industry: 'Healthcare & Medtech',
    overview: 'HIPAA-grade telemedicine web application combining encrypted video consultations with AI clinician note transcription and instant prescription dispatch.',
    problem: 'Clinicians were overwhelmed with administrative charting, spending up to two hours after clinic hours filling EHR records.',
    solution: 'Built an elegant Next.js patient/clinician platform featuring automated speech-to-structured-SOAP-notes and automated pharmacy integration.',
    techStack: JSON.stringify(['Next.js 14', 'TypeScript', 'WebRTC', 'OpenAI Whisper', 'Prisma', 'Tailwind CSS', 'PostgreSQL']),
    results: JSON.stringify({
      'Admin Reduction': '-65% clinician charting time',
      'Clinician NPS': '88 Net Promoter Score',
      'Consultations': '120,000+ completed visits',
      'Compliance': '100% HIPAA & SOC2 compliant',
    }),
    liveUrl: 'https://kurahealth.fourfrontlab.com',
    category: { name: 'Web Applications & SaaS' },
  },
  'novus-atelier': {
    title: 'Novus Atelier - Headless Luxury Commerce Flagship',
    slug: 'novus-atelier',
    client: 'Novus Atelier Paris',
    industry: 'High Fashion & Luxury Retail',
    overview: 'Sub-second headless e-commerce experience with multi-currency localized checkouts, predictive search, and personalized VIP styling.',
    problem: 'Legacy monolithic storefront had 4.8s mobile load times, causing 64% cart abandonment among European and Asian shoppers.',
    solution: 'Re-architected on Next.js edge runtime with instant Algolia search, custom cart state management, and automated VIP SMS/WhatsApp retargeting.',
    techStack: JSON.stringify(['Next.js 14', 'Shopify Storefront API', 'Tailwind CSS', 'Algolia', 'Cloudflare Edge', 'Framer Motion']),
    results: JSON.stringify({
      'Mobile Speed': '0.7s Largest Contentful Paint',
      'Global Revenue': '+185% YoY international sales',
      'Cart Recovery': '42% decrease in abandoned checkouts',
      'Conversion Rate': '3.9% global conversion rate',
    }),
    liveUrl: 'https://novusatelier.fourfrontlab.com',
    category: { name: 'E-Commerce & Growth Engines' },
  },
  'pulsescale': {
    title: 'PulseScale - Predictive Lead Scoring & SDR Router',
    slug: 'pulsescale',
    client: 'ScaleDirect B2B',
    industry: 'B2B SaaS & Growth',
    overview: 'Inbound prospect qualification system matching website behavior and firmographic data to instantly route high-value leads to senior reps.',
    problem: 'High lead volume meant SDRs spent 60% of their workday pursuing unqualified contacts while enterprise opportunities sat cold.',
    solution: 'Engineered an automated enrichment pipeline that scores inbound leads in under 2 seconds and fires priority calendar invitations and alerts.',
    techStack: JSON.stringify(['Next.js', 'Python', 'FastAPI', 'Prisma', 'PostgreSQL', 'Twilio API', 'Slack API']),
    results: JSON.stringify({
      'Sales Qualified Leads': '+210% pipeline increase',
      'Response Time': 'Under 60 seconds from form submit',
      'Deal Velocity': 'Sales cycle reduced from 44 to 18 days',
      'Pipeline Impact': '$3.2M pipeline generated in Q1',
    }),
    liveUrl: 'https://pulsescale.fourfrontlab.com',
    category: { name: 'AI & Intelligent Systems' },
  },
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

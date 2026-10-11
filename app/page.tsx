import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero3D from '@/components/Hero3D'
import StatsSection from '@/components/StatsSection'
import ProblemsSolved from '@/components/ProblemsSolved'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import InquiryForm from '@/components/InquiryForm'
import { prisma } from '@/lib/prisma'
import { 
  ArrowRight, 
  ArrowUpRight, 
  Code, 
  Cpu, 
  Bot, 
  BarChart, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react'

// Default fallback projects for zero-downtime resilience
const defaultProjects = [
  {
    id: 'p1',
    title: 'Aetheris AI - Autonomous Financial Intelligence',
    slug: 'aetheris-ai',
    client: 'Aetheris Capital',
    industry: 'Fintech & Asset Management',
    overview: 'Ingesting real-time SEC filings and market telemetry to generate predictive macro-risk models and automated portfolio rebalancing briefs.',
    coverImage: '/images/portfolio-aetheris.jpg',
    liveUrl: 'https://aetheris-demo.fourfrontlab.com',
    results: JSON.stringify({
      'Efficiency': '+78% faster brief generation',
      'Accuracy': '99.4% precision',
      'Saved': '$1.4M saved in research labor',
    }),
    category: { name: 'AI & Intelligent Systems' },
    techStack: JSON.stringify(['Next.js 14', 'Python', 'FastAPI', 'Claude 3.5 Sonnet', 'pgvector']),
  },
  {
    id: 'p2',
    title: 'Veloce Motors - 3D Luxury Hypercar Configurator',
    slug: 'veloce-motors',
    client: 'Veloce Bespoke Automotive',
    industry: 'Luxury Automotive',
    overview: 'Immersive WebGL digital showroom allowing clients to customize bespoke hypercars in real time with dynamic lighting and VIP WhatsApp concierge.',
    coverImage: '/images/portfolio-veloce.jpg',
    liveUrl: 'https://veloce.fourfrontlab.com',
    results: JSON.stringify({
      'Conversion': '+320% test drive inquiries',
      'Dwell Time': '4.2x increase in session length',
      'Award': 'Awwwards Nominee',
    }),
    category: { name: 'Websites & Digital Experiences' },
    techStack: JSON.stringify(['Three.js', 'React Three Fiber', 'Next.js 14', 'GLSL Shaders']),
  },
  {
    id: 'p3',
    title: 'OmniFlow - Autonomous Supply Chain Orchestration',
    slug: 'omniflow-automation',
    client: 'OmniLogistics Global',
    industry: 'Supply Chain & Freight',
    overview: 'Automated dispatching, customs clearance OCR parsing, carrier invoice reconciliation, and proactive exception handling across 12 countries.',
    coverImage: '/images/portfolio-omniflow.jpg',
    liveUrl: 'https://omniflow.fourfrontlab.com',
    results: JSON.stringify({
      'Hours Saved': '1,200 hrs/month eliminated',
      'Errors': 'Cut from 4.2% to 0.04%',
      'ROI': 'Payback in 47 days',
    }),
    category: { name: 'Business Automation' },
    techStack: JSON.stringify(['Next.js', 'Prisma', 'BullMQ', 'Redis', 'Python OCR']),
  },
]

const servicesList = [
  {
    title: 'Website Development',
    slug: 'website-development',
    icon: Code,
    desc: 'Bespoke, lightning-fast digital flagships crafted with Next.js 14, 3D WebGL interactions, and conversion-engineered architecture.',
    deliverables: ['Custom 3D / WebGL Centers', 'Sub-second Edge Rendering', 'Headless CMS Architecture', 'Core Web Vitals (99+)'],
  },
  {
    title: 'Business Process Automation',
    slug: 'business-automation',
    icon: Cpu,
    desc: 'Eliminate repetitive manual tasks, eradicate human data errors, and interconnect your entire software stack with self-healing workflows.',
    deliverables: ['Cross-System Webhook Bridges', 'Automated OCR & Invoicing', 'CRM Lead Routing Engines', 'Fault-Tolerant Queue Workers'],
  },
  {
    title: 'AI Solutions & Integrations',
    slug: 'ai-solutions',
    icon: Bot,
    desc: 'Custom LLM agents, private vector retrieval (RAG), and domain-specific assistants that safely operate on your proprietary company data.',
    deliverables: ['Proprietary Vector RAG Search', 'Autonomous Task Agents', 'Intelligent Document Extraction', 'Zero-Data-Retention Security'],
  },
  {
    title: 'Digital Marketing & Growth',
    slug: 'digital-marketing',
    icon: BarChart,
    desc: 'Data-backed performance marketing, programmatic SEO engines, and conversion rate optimization that transform clicks into enterprise pipeline.',
    deliverables: ['High-Converting Landing Architecture', 'Programmatic SEO Engines', 'Multi-Touch Attribution', 'Systematic CRO Testing'],
  },
  {
    title: 'Custom Business Solutions',
    slug: 'custom-software',
    icon: Layers,
    desc: 'Tailored web applications, internal operational hubs, and client portals engineered precisely to your exact business workflow.',
    deliverables: ['Custom Portals & Dashboards', 'Role-Based Access Control', 'Zero Per-Seat SaaS Taxes', '100% IP & Source Ownership'],
  },
]

export default async function HomePage() {
  let projects = defaultProjects
  let testimonials: any[] = []

  try {
    const dbProjects = await prisma.project.findMany({
      where: { featured: true, published: true },
      take: 3,
      include: { category: true },
      orderBy: { order: 'asc' },
    })
    if (dbProjects.length > 0) {
      projects = dbProjects as any
    }

    const dbTestimonials = await prisma.testimonial.findMany({
      where: { featured: true },
      take: 4,
    })
    if (dbTestimonials.length > 0) {
      testimonials = dbTestimonials
    }
  } catch (e) {
    // Graceful fallback to static data
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Subtle glowing radial background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Agency Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-white/5 border border-brand-cyan/30 text-white backdrop-blur-md mb-6 shadow-glow-cyan">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                  <span className="text-brand-cyan font-semibold">FOUR FRONT LAB</span>
                  <span className="text-slate-400">• Digital Engineering & AI</span>
                </div>

                {/* Primary Hero Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                  Engineering <span className="text-gradient">Next-Gen Digital</span> Experiences &amp;{' '}
                  <span className="text-gradient-cyan">Autonomous Systems.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                  We unite bespoke 3D WebGL development, intelligent business automation, domain-specific AI copilots, and scalable custom software to give ambitious companies unmatched operational leverage.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-black bg-gradient-to-r from-brand-cyan via-brand-teal to-brand-blue hover:opacity-95 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  <a
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <span>Explore Case Studies</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-cyan" />
                  </a>
                </div>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
                  <div>
                    <div className="text-2xl font-bold font-mono text-white text-gradient-cyan">99.8%</div>
                    <div className="text-xs text-slate-400 mt-0.5">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-white text-gradient-cyan">45+</div>
                    <div className="text-xs text-slate-400 mt-0.5">Deployed Systems</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-white text-gradient-cyan">3.8x</div>
                    <div className="text-xs text-slate-400 mt-0.5">Average Client ROI</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive 3D Brand Centerpiece */}
              <div className="lg:col-span-5 relative">
                <Hero3D />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST & STATS STRIP */}
        <StatsSection />

        {/* SERVICES OVERVIEW SECTION */}
        <section id="services" className="py-24 relative bg-[#07090e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-4">
                <span>End-to-End Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                The Four Fronts of <span className="text-gradient-cyan">Engineering Mastery</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400">
                Whether you need a flagship brand presence that commands authority or an autonomous automation pipeline that eliminates manual labor, our integrated teams build to the highest technical standard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesList.map((service, index) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.slug}
                    className="p-8 rounded-3xl bg-[#0b0f19]/70 border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-black transition-all">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    <div>
                      <div className="pt-4 border-t border-white/5 mb-6">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                          Core Capabilities:
                        </div>
                        <ul className="space-y-1.5">
                          {service.deliverables.map((d) => (
                            <li key={d} className="text-xs text-slate-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0"></span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-brand-cyan hover:text-white transition-colors"
                      >
                        <span>Explore Full Service Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}

              {/* Special 6th Card: "Describe Your Challenge" */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0f1b2b] to-[#120d22] border border-brand-cyan/50 shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-cyan text-black flex items-center justify-center mb-6 shadow-glow-cyan">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Have a Bespoke Enterprise Challenge?
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Not sure which category fits your requirements? Describe your system goals, legacy databases, or workflow friction directly to our technical directors.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-white text-black hover:bg-brand-cyan transition-colors"
                  >
                    <span>Request Custom Solution Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK / PORTFOLIO SHOWCASE */}
        <section id="work" className="py-24 relative bg-[#090d15] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-4">
                  <span>Selected Case Studies</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Proven Real-World <span className="text-gradient-cyan">Deployments</span>
                </h2>
                <p className="mt-3 text-base text-slate-400 max-w-xl">
                  Inspect the architecture, quantifiable results, and technical stack behind our most successful enterprise launches.
                </p>
              </div>

              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-brand-cyan hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-fit"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj: any) => {
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
                      <div className="relative h-52 bg-gradient-to-tr from-[#0a101d] via-[#101b2f] to-[#15233e] flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                        <div className="relative z-10 text-center">
                          <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan block mb-2">
                            {proj.industry}
                          </span>
                          <span className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                            {proj.client}
                          </span>
                        </div>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-slate-300 hover:text-brand-cyan border border-white/10 transition-colors"
                            aria-label="View live demonstration"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          {proj.category?.name || 'Enterprise Solution'}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                          {proj.title}
                        </h3>
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
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <a
                        href={`/portfolio/${proj.slug}`}
                        className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-brand-cyan hover:text-black text-slate-200 border border-white/10 transition-all"
                      >
                        <span>View Full Architecture Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* BUSINESS PROBLEMS WE SOLVE */}
        <ProblemsSolved />

        {/* 6-STEP METHODOLOGY */}
        <ProcessSection />

        {/* CLIENT PROOF & TESTIMONIALS */}
        <TestimonialsSection testimonials={testimonials} />

        {/* FINAL CONVERSION INQUIRY SECTION */}
        <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Conversion Copy */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start a Confidential Conversation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                  Ready to Engineer Your <span className="text-gradient-cyan">Competitive Edge?</span>
                </h2>
                <p className="text-base text-slate-300 leading-relaxed mb-8">
                  Submit your requirements below or fast-track directly on WhatsApp. Every inquiry is reviewed directly by our Principal Systems Engineers, not junior account reps.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">48-Hour Technical Feasibility Assessment</div>
                      <div className="text-xs text-slate-400">We outline architecture schemas and estimated ROI upfront.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">Zero Vendor Lock-In</div>
                      <div className="text-xs text-slate-400">Full source code, IP ownership, and Dockerized deployments provided.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white">Direct Executive Communication</div>
                      <div className="text-xs text-slate-400">Dedicated private Slack or WhatsApp channel with your engineering lead.</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Need Immediate Consultation?
                  </div>
                  <div className="text-sm text-white font-medium mb-3">
                    Chat directly with our team on WhatsApp:
                  </div>
                  <a
                    href="https://wa.me/18004368736?text=Hi%20Four%20Front%20Lab%2C%20I'd%20like%20to%20discuss%20a%20new%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                  >
                    <span>Open WhatsApp Hotline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl backdrop-blur-xl">
                  <InquiryForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

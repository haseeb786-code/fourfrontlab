import React from 'react'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import { prisma } from '@/lib/prisma'
import { 
  Code, 
  Cpu, 
  Bot, 
  BarChart, 
  Layers, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

const iconMap: Record<string, any> = {
  Code,
  Cpu,
  Bot,
  BarChart,
  Layers,
}

const fallbackServices: Record<string, any> = {
  'website-development': {
    title: 'Website Development',
    slug: 'website-development',
    icon: 'Code',
    shortDesc: 'Bespoke, lightning-fast digital flagships crafted with modern frameworks, 3D interactions, and conversion-engineered architecture.',
    fullDesc: 'At Four Front Lab, we treat your website as your highest-leverage business asset. We do not use cookie-cutter templates or bloated page builders. Every digital experience we engineer is custom-built with Next.js 14, TypeScript, and modern styling, yielding sub-second load times, world-class SEO rankings, and immersive 3D/interactive brand narratives that captivate your target market.',
    deliverables: JSON.stringify([
      'Custom Next.js & React Architecture',
      'Interactive 3D / WebGL Visual Centers',
      'Headless CMS & Content Workflows',
      'Technical SEO & Core Web Vitals (99+)',
      'Multi-Device Responsive Optimization',
      'Analytics & Conversion Tracking',
    ]),
    benefits: JSON.stringify([
      'Sub-second load speeds boost search rankings and reduce bounce rates',
      'Distinctive visual branding separates you from generic competitors',
      'Custom admin CMS allows effortless content updates without developers',
      'Zero security vulnerabilities compared to traditional WordPress setups',
    ]),
    techStack: JSON.stringify(['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js / R3F', 'Prisma', 'Cloudflare Edge']),
    faqs: JSON.stringify([
      {
        question: 'How long does a custom website build take?',
        answer: 'Typical production timelines range from 3 to 6 weeks depending on custom 3D requirements, CMS scope, and complex integrations.',
      },
      {
        question: 'Can our marketing team update text and images easily?',
        answer: 'Yes. Every website comes with our intuitive Four Front Lab Admin CMS where you can modify copy, upload media, publish case studies, and manage inquiries.',
      },
      {
        question: 'Do you provide hosting and post-launch maintenance?',
        answer: 'We provide end-to-end deployment on global edge CDNs with 99.99% uptime guarantees, automated backups, and ongoing optimization retainers.',
      },
    ]),
  },
  'business-automation': {
    title: 'Business Automation',
    slug: 'business-automation',
    icon: 'Cpu',
    shortDesc: 'Eliminate repetitive manual tasks, eradicate human data entry errors, and interconnect your entire software stack with self-healing workflows.',
    fullDesc: 'Manual operational friction is the single greatest bottleneck to scaling profitability. Four Front Lab designs and deploys autonomous automation engines that bridge ERPs, CRMs, accounting systems, and customer channels into synchronized, real-time pipelines. Free your high-value talent to focus on revenue while automated systems handle the rest.',
    deliverables: JSON.stringify([
      'Cross-System API & Webhook Bridges',
      'Automated Invoice & Document OCR Extraction',
      'Multi-Tier CRM Lead Routing & Notification Engines',
      'Inventory, Shipping & Logistics Sync',
      'Automated WhatsApp & Email Customer Triggers',
      'Failure-Proof Queue Workers & Error Alerts',
    ]),
    benefits: JSON.stringify([
      'Save 150+ employee hours every month per department',
      'Reduce operational data entry errors to practically 0%',
      'Achieve instant sub-second response times for inbound business inquiries',
      'Scale transaction volume 10x without hiring proportional back-office staff',
    ]),
    techStack: JSON.stringify(['Node.js / TypeScript', 'Python Workflows', 'Redis / BullMQ', 'Prisma ORM', 'Stripe API', 'Make / n8n', 'WhatsApp Business API']),
    faqs: JSON.stringify([
      {
        question: 'What tools and software can you automate?',
        answer: 'Virtually any modern system with an API or webhook: Salesforce, HubSpot, QuickBooks, Xero, Stripe, Shopify, Google Workspace, Slack, custom SQL databases, and legacy endpoints.',
      },
      {
        question: 'What happens if a third-party service experiences downtime?',
        answer: 'We build fault-tolerant architectures with automatic exponential backoff retry queues, transaction idempotency, and immediate escalation alerts so no data is ever lost.',
      },
    ]),
  },
  'ai-solutions': {
    title: 'AI Solutions & Integrations',
    slug: 'ai-solutions',
    icon: 'Bot',
    shortDesc: 'Custom LLM agents, proprietary vector retrieval (RAG), multimodal assistants, and predictive models tailored to your business knowledge base.',
    fullDesc: 'Artificial intelligence is only valuable when it produces concrete business leverage. We do not ship generic wrappers. Four Front Lab engineers domain-specific AI workflows, intelligent document processors, autonomous customer agents, and internal analytical assistants that operate securely on your private company data.',
    deliverables: JSON.stringify([
      'Proprietary RAG & Vector Knowledge Retrieval',
      'Autonomous Task-Execution AI Agents',
      'Intelligent Multimodal Document Extraction',
      'Custom Fine-Tuning & Prompt Optimization',
      'Role-Based Secure LLM Copilots for Teams',
      'Real-Time AI Audio & Transcription Pipelines',
    ]),
    benefits: JSON.stringify([
      'Empower teams to interrogate complex company databases in natural language',
      'Automate 80% of customer support queries with contextual accuracy',
      'Accelerate executive document synthesis from hours to seconds',
      'Protect enterprise data privacy with isolated, secure inference boundaries',
    ]),
    techStack: JSON.stringify(['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Google Gemini 1.5 Pro', 'LangChain / LlamaIndex', 'Pinecone / pgvector', 'FastAPI', 'Next.js UI']),
    faqs: JSON.stringify([
      {
        question: 'Is our private company data used to train public AI models?',
        answer: 'Never. We enforce strict enterprise zero-data-retention APIs and self-hosted vector databases, ensuring your proprietary IP remains 100% confidential and compliant.',
      },
      {
        question: 'Can the AI perform actions rather than just answering questions?',
        answer: 'Yes. We specialize in tool-augmented agents that can verify user permissions, query internal databases, generate PDF reports, trigger emails, and create CRM records automatically.',
      },
    ]),
  },
  'digital-marketing': {
    title: 'Digital Marketing & Growth',
    slug: 'digital-marketing',
    icon: 'BarChart',
    shortDesc: 'Data-backed performance marketing, programmatic SEO engines, and conversion rate optimization that transform clicks into enterprise pipeline.',
    fullDesc: 'Traffic without conversion is vanity. Four Front Lab fuses technical engineering with high-intent performance marketing. From high-converting landing page architectures and programmatic SEO pages to dynamic retargeting funnels and granular multi-touch attribution, we build sustainable growth engines.',
    deliverables: JSON.stringify([
      'High-Converting Funnel & Landing Page Architecture',
      'Technical & Programmatic SEO Systems',
      'Advanced Multi-Touch Attribution & Event Tracking',
      'Automated A/B Testing Infrastructure',
      'Paid Acquisition Strategy (Meta, Google, LinkedIn)',
      'Full-Funnel CRO & Heatmap Analysis',
    ]),
    benefits: JSON.stringify([
      'Lower customer acquisition cost (CAC) through laser-targeted messaging',
      'Multiply conversion rates on existing traffic by 2x to 4x',
      'Dominate high-intent search queries with automated programmatic landing pages',
      'Unify marketing spend and actual closed revenue in real-time dashboards',
    ]),
    techStack: JSON.stringify(['Google Tag Manager', 'PostHog', 'Mixpanel', 'Meta Pixel / CAPI', 'Google Ads', 'Vercel Edge Config', 'Tailwind CSS']),
    faqs: JSON.stringify([
      {
        question: 'How do you approach Conversion Rate Optimization (CRO)?',
        answer: 'We combine user session recordings, heatmaps, and systematic multivariate tests on headlines, social proof placement, and form micro-interactions to continually push conversion rates higher.',
      },
      {
        question: 'What makes your SEO different from traditional agencies?',
        answer: 'We build programmatic, server-rendered architectures that load in 200ms and programmatically generate high-intent search landing pages with perfect Core Web Vitals.',
      },
    ]),
  },
  'custom-software': {
    title: 'Custom Business Solutions',
    slug: 'custom-software',
    icon: 'Layers',
    shortDesc: 'Tailored web applications, internal operational hubs, customer portals, and specialized software engineered precisely to your exact business workflow.',
    fullDesc: 'Off-the-shelf software forces your business into someone else\'s rigid box. When your operational advantage demands bespoke tooling, Four Front Lab develops tailored SaaS platforms, internal management portals, and client portals built to scale reliably under heavy enterprise usage.',
    deliverables: JSON.stringify([
      'Custom Web Portals & Enterprise Dashboards',
      'Role-Based Access Control (RBAC) & Security',
      'Interactive Data Visualizations & Reporting',
      'Scalable Relational Database Schemas',
      'Third-Party Payment & Billing Integrations',
      'Comprehensive API Documentation & Testing',
    ]),
    benefits: JSON.stringify([
      'Own your software asset entirely with zero recurring per-seat SaaS tax',
      'Unify fragmented spreadsheets into a single source of operational truth',
      'Give clients a branded, white-glove digital portal that builds loyalty',
      'Scale your system freely without arbitrary vendor limitations',
    ]),
    techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL / SQLite', 'Tailwind CSS', 'Docker', 'Stripe Connect']),
    faqs: JSON.stringify([
      {
        question: 'How do we get started if we only have a rough concept?',
        answer: 'We run a structured 1-week Discovery & Scoping Sprint where our technical leads map out system architecture, database models, interactive wireframes, and an exact milestone roadmap.',
      },
      {
        question: 'Do we own the intellectual property (IP) and source code?',
        answer: '100%. Upon completion, full copyright, source code repositories, and deployment assets are completely transferred to your organization.',
      },
    ]),
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  let service = fallbackServices[slug]
  try {
    const dbService = await prisma.service.findUnique({
      where: { slug },
    })
    if (dbService) service = dbService
  } catch (e) {}

  if (!service) return { title: 'Service | Four Front Lab' }

  return {
    title: `${service.title} | Four Front Lab Pakistan`,
    description: service.shortDesc.slice(0, 150),
    alternates: {
      canonical: `https://fourfrontlab.tech/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Four Front Lab`,
      description: service.shortDesc.slice(0, 150),
      url: `https://fourfrontlab.tech/services/${slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: service.title }],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  let service = fallbackServices[slug]

  try {
    const dbService = await prisma.service.findUnique({
      where: { slug },
    })
    if (dbService) {
      service = dbService
    }
  } catch (e) {}

  if (!service) {
    notFound()
  }

  const Icon = iconMap[service.icon] || Code

  let deliverables: string[] = []
  try {
    deliverables = typeof service.deliverables === 'string' ? JSON.parse(service.deliverables) : service.deliverables
  } catch (e) {}

  let benefits: string[] = []
  try {
    benefits = typeof service.benefits === 'string' ? JSON.parse(service.benefits) : service.benefits
  } catch (e) {}

  let techStack: string[] = []
  try {
    techStack = typeof service.techStack === 'string' ? JSON.parse(service.techStack) : service.techStack
  } catch (e) {}

  let faqs: { question: string; answer: string }[] = []
  try {
    faqs = typeof service.faqs === 'string' ? JSON.parse(service.faqs) : service.faqs
  } catch (e) {}

  return (
    <>
      <ServiceJsonLd name={service.title} description={service.shortDesc} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.title, url: `/services/${slug}` },
        ]}
      />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Back Link & Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Specializations</span>
          </a>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0b0f19] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center mb-6 shadow-glow-cyan">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                {service.title}
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8">
                {service.shortDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-cyan to-brand-blue text-black shadow-glow-cyan hover:scale-105 transition-all"
                >
                  <span>Request Dedicated Architecture Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Overview & Value Proposition */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                Architecture & Engineering Standard
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                {service.fullDesc}
              </p>

              {/* Measurable Benefits */}
              <h3 className="text-xl font-bold text-white mb-4">
                Quantifiable Business Benefits
              </h3>
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#0b0f19] border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Deliverables & Tech Stack */}
            <div className="lg:col-span-5 space-y-8">
              {/* Deliverables Card */}
              <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  What You Receive
                </h3>
                <ul className="space-y-3">
                  {deliverables.map((del, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0"></span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Card */}
              <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">
                  Technologies Employed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 text-brand-cyan border border-brand-cyan/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        {faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Frequently Asked Technical Questions
              </h2>
              <p className="text-sm text-slate-400">
                Direct answers to common scoping and implementation considerations.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/30 transition-colors"
                >
                  <h4 className="text-base font-bold text-white flex items-center gap-2.5 mb-2">
                    <HelpCircle className="w-4 h-4 text-brand-cyan shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed pl-6.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tailored Inquiry Form Box */}
        <section id="inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0f19] border border-brand-cyan/40 shadow-2xl backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider block mb-2 font-semibold">
                Direct Engineering Lead Engagement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Initiate Your {service.title} Project
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Fill out the technical brief below to receive a scoped system proposal within 24-48 hours.
              </p>
            </div>

            <InquiryForm initialService={service.title} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

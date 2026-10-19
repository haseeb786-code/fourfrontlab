import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Compass, 
  Code2, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Users, 
  Sparkles,
  GraduationCap
} from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata = {
  title: 'About Us | Next.js Web Development Agency Islamabad',
  description:
    'Learn about Four Front Lab, an affordable web development agency in Pakistan founded by CUST engineers building fast Next.js applications.',
  alternates: {
    canonical: 'https://fourfrontlab.tech/about',
  },
  openGraph: {
    title: 'About Four Front Lab | Next.js Agency Islamabad',
    description:
      'Learn about Four Front Lab, an affordable web development agency in Pakistan founded by CUST engineers building fast Next.js applications.',
    url: 'https://fourfrontlab.tech/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Four Front Lab' }],
  },
}

export default function AboutPage() {
  const fronts = [
    {
      step: '01',
      title: 'Discovery & Strategic Deconstruction',
      desc: 'We do not sell generic services. We start by interrogating your actual operational bottleneck, unit economics, and competitive moat to design an exact technical blueprint.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Modern Software Engineering',
      desc: 'Zero bloated templates or fragile page builders. Every experience is engineered with Next.js, TypeScript, custom 3D WebGL, and scalable relational schemas built for sub-second speeds.',
      icon: Code2,
    },
    {
      step: '03',
      title: 'Autonomous Automation & AI',
      desc: 'We eradicate manual friction by constructing fault-tolerant event queues, ERP/CRM bridges, and domain-grounded AI copilots that operate securely on your private company data.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Conversion Architecture & Scale',
      desc: 'A digital system is only successful when it moves the business forward. We engineer programmatic SEO pipelines, high-converting checkout funnels, and real-time telemetry.',
      icon: TrendingUp,
    },
  ]

  const principles = [
    {
      title: 'Real Problems, Not Generic Technology',
      desc: 'We never suggest AI or 3D because it is trendy. We implement modern technologies exclusively when they create measurable operational leverage and defensible revenue.',
    },
    {
      title: 'Sub-Second Performance as a Standard',
      desc: 'Speed is not a cosmetic feature—it directly dictates search rankings, bounce rates, and checkout conversion. Every platform we deploy targets sub-second Core Web Vitals.',
    },
    {
      title: 'Complete IP Ownership',
      desc: 'When we build for you, you own the asset completely. Full source code, database architectures, and deployment pipelines are transferred without recurring per-seat agency licensing fees.',
    },
    {
      title: 'Enterprise Data Isolation',
      desc: 'Your business intelligence and customer records remain strictly isolated. We enforce zero-data-retention inference APIs and self-hosted vector infrastructure.',
    },
  ]

  const teamMembers = [
    {
      name: 'Principal Systems Architect',
      role: 'Full-Stack & Distributed Architecture',
      university: 'CUST — Capital University of Science and Technology',
      bio: 'Leading high-performance Next.js App Router engineering, sub-second API pipelines, and interactive 3D WebGL experiences.',
      initials: 'PSA',
    },
    {
      name: 'AI & Automation Lead',
      role: 'Autonomous Workflows & RAG Systems',
      university: 'CUST — Capital University of Science and Technology',
      bio: 'Architecting fault-tolerant event queues, ERP/CRM webhooks, and private vector database intelligence on corporate data.',
      initials: 'AAL',
    },
    {
      name: 'Senior Frontend Engineer',
      role: 'Kinetic Interfaces & Web Performance',
      university: 'CUST — Capital University of Science and Technology',
      bio: 'Engineering sub-second Core Web Vitals, conversion-driven fluid interfaces, and accessible design system components.',
      initials: 'SFE',
    },
    {
      name: 'DevOps & Reliability Engineer',
      role: 'Cloud Infrastructure & Security',
      university: 'CUST — Capital University of Science and Technology',
      bio: 'Managing automated edge deployment networks, Dockerized services, database schema migrations, and enterprise data isolation.',
      initials: 'DRE',
    },
  ]

  return (
    <div className="min-h-screen bg-[#080A10] text-[#E2E8F0]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> About Four Front Lab
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-8">
            We Engineer Digital Systems That Move Businesses Forward.
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-3xl leading-relaxed mb-10">
            We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain. We don’t just develop websites, we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#22D3EE] text-black font-semibold text-sm hover:bg-[#67E8F9] transition-all shadow-lg shadow-[#22D3EE]/20"
            >
              Start a Project Discussion <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Explore Our Portfolio
            </Link>
          </div>
        </section>

        {/* The Four Fronts Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#22D3EE] tracking-widest uppercase">Our Methodology</span>
            <h2 className="text-3xl font-bold text-white mt-2">The Four Fronts Framework</h2>
            <p className="text-[#94A3B8] text-sm md:text-base mt-2 max-w-2xl">
              Every system we engineer progresses through four tightly integrated disciplines to guarantee operational impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fronts.map((front) => {
              const Icon = front.icon
              return (
                <div
                  key={front.step}
                  className="p-8 rounded-2xl bg-[#0D111A] border border-[#1E293B] hover:border-[#22D3EE]/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE] group-hover:bg-[#22D3EE] group-hover:text-black transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-mono font-bold text-white/20 group-hover:text-[#22D3EE]/40 transition-colors">
                      {front.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#22D3EE] transition-colors">
                    {front.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {front.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Agency Principles */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="p-8 md:p-12 rounded-3xl bg-[#0B0F19] border border-[#1E293B]">
            <div className="mb-10">
              <span className="text-xs font-mono text-[#22D3EE] tracking-widest uppercase">Operating Values</span>
              <h2 className="text-3xl font-bold text-white mt-2">Principles That Guide Our Engineering</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((p, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0" />
                    {p.title}
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed pl-7">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Team Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-12">
            <span className="text-xs font-mono text-[#22D3EE] tracking-widest uppercase">The Engineering Team</span>
            <h2 className="text-3xl font-bold text-white mt-2">Built by Engineers, Grounded in Academia</h2>
            <p className="text-[#94A3B8] text-sm md:text-base mt-2 max-w-2xl">
              Four Front Lab was founded by software engineers from <strong className="text-white">CUST (Capital University of Science and Technology, Islamabad)</strong>. We bridge formal computational theory with battle-tested production engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E293B] hover:border-[#22D3EE]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] font-mono font-bold text-sm mb-5 group-hover:scale-105 group-hover:bg-[#22D3EE] group-hover:text-black transition-all">
                    {member.initials}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#22D3EE] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-[#22D3EE] mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E293B] flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <GraduationCap className="w-4 h-4 text-[#22D3EE] shrink-0" />
                  <span className="truncate" title={member.university}>CUST Islamabad</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Deconstruct Your Next Digital Challenge?
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto mb-8 text-sm md:text-base">
            Book an introductory architecture consultation directly with our engineering leads. No sales pitches—just practical technical solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#22D3EE] text-black font-bold text-base hover:bg-[#67E8F9] transition-all shadow-xl shadow-[#22D3EE]/25"
          >
            Start a Project with Us <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import React from 'react'
import { 
  Compass, 
  Palette, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Rocket 
} from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'Discovery & Strategic Architecture',
    desc: 'We map your operational bottlenecks, technical constraints, data schemas, and high-impact revenue levers before a single line of code is written.',
    icon: Compass,
    deliverables: ['System Architecture Blueprint', 'Tech Stack Matrix', 'Milestone Roadmap'],
  },
  {
    step: '02',
    title: 'UI/UX & Interactive Prototyping',
    desc: 'Bespoke design systems, responsive wireframes, and interactive 3D WebGL proofs-of-concept that reflect high-tier brand prestige.',
    icon: Palette,
    deliverables: ['Figma Component Library', 'Interactive Clickable Prototype', '3D Asset Shader Tests'],
  },
  {
    step: '03',
    title: 'Full-Stack Engineering',
    desc: 'Next.js 14 App Router, TypeScript, and clean modular code with zero technical debt, sub-second edge rendering, and rock-solid relational databases.',
    icon: Code2,
    deliverables: ['Production Next.js Codebase', 'Prisma Database Layer', 'Secure API Endpoints'],
  },
  {
    step: '04',
    title: 'AI & Automation Integration',
    desc: 'We plug in custom LLM agents, private vector retrieval (RAG), and event-driven automation queues connecting your disparate business tools.',
    icon: Cpu,
    deliverables: ['Autonomous Webhook Pipelines', 'Vector Embedding Indexing', 'WhatsApp & CRM Routing'],
  },
  {
    step: '05',
    title: 'Security & QA Hardening',
    desc: 'Rigorous end-to-end testing, OWASP security validations, cross-browser compatibility, and Core Web Vitals score optimization (99+).',
    icon: ShieldCheck,
    deliverables: ['Audit & Performance Pass', 'Penetration & Auth Checks', 'Stress & Load Testing'],
  },
  {
    step: '06',
    title: 'Launch, Training & Evolution',
    desc: 'Global edge deployment with automated zero-downtime CI/CD pipelines, full Four Front Lab Admin CMS staff training, and continuous growth retainers.',
    icon: Rocket,
    deliverables: ['Zero-Downtime Deployment', 'Admin CMS Walkthrough', 'Monitoring & Backup Config'],
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-4">
            <span>Rigorous Engineering Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our 6-Step <span className="text-gradient-cyan">Execution System</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            From initial technical scoping to production edge deployment, our methodology eliminates guesswork and delivers predictable business ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="group relative p-8 rounded-3xl bg-[#0b0f19]/80 border border-white/10 hover:border-brand-cyan/40 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-black transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-slate-600 group-hover:text-brand-cyan/60 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Key Deliverables Pill Box */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                    Core Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.deliverables.map((del) => (
                      <span
                        key={del}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5 group-hover:border-white/10"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, ArrowRight, Zap, Database, Clock, TrendingUp } from 'lucide-react'

const problems = [
  {
    id: 'manual',
    tab: 'Manual Bottlenecks',
    icon: Clock,
    painTitle: 'The Reality of Operational Friction',
    painDesc: 'Skilled knowledge workers spending 20+ hours every week copying data across ERPs, spreadsheets, email threads, and invoicing portals — leading to costly human mistakes and employee burnout.',
    solutionTitle: 'Autonomous Self-Healing Pipelines',
    solutionDesc: 'We build event-driven automation engines with webhooks, OCR document extractors, and proactive exception handling that process operations 24/7 with 99.9% accuracy.',
    metric: '1,200+ hours saved monthly per organization',
  },
  {
    id: 'outdated-web',
    tab: 'Conversion & Brand Blindspots',
    icon: TrendingUp,
    painTitle: 'Slow, Generic Websites That Bleed Leads',
    painDesc: 'Outdated, bloated WordPress templates taking 4+ seconds to load on mobile, losing up to 60% of high-intent traffic before the first paragraph renders.',
    solutionTitle: 'Sub-Second 3D Flagship Platforms',
    solutionDesc: 'Custom Next.js 14 engineering with Three.js interactive visual storytelling, 0.7s Core Web Vitals, and conversion funnels engineered to convert high-ticket buyers.',
    metric: '320% increase in qualified inquiries',
  },
  {
    id: 'ai-silos',
    tab: 'Untapped AI Advantage',
    icon: Zap,
    painTitle: 'Superficial AI Experiments Without ROI',
    painDesc: 'Companies paying for ChatGPT seats while employees copy-paste disconnected prompts, risking proprietary IP and failing to integrate AI into real business workflows.',
    solutionTitle: 'Enterprise RAG & Private Agent Copilots',
    solutionDesc: 'Custom retrieval-augmented generation (RAG) models and tool-calling agents running in private VPCs that safely query proprietary data, draft reports, and execute actions.',
    metric: '78% reduction in analytical turnaround time',
  },
  {
    id: 'fragmented-tech',
    tab: 'Fragmented Tech Debt',
    icon: Database,
    painTitle: 'Bloated SaaS Tax & Disjointed Tools',
    painDesc: '15 separate per-seat SaaS tools that don\'t talk to each other, creating massive recurring software bills, duplicate records, and blindspots for leadership.',
    solutionTitle: 'Unified Custom Business Software',
    solutionDesc: 'Custom bespoke portals and centralized operational hubs built on clean relational databases with tailored permissions, zero seat taxes, and 100% source code ownership.',
    metric: '100% IP ownership & zero per-seat fees',
  },
]

export default function ProblemsSolved() {
  const [activeTab, setActiveTab] = useState(problems[0].id)
  const current = problems.find((p) => p.id === activeTab) || problems[0]

  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-violet/10 text-brand-violet border border-brand-violet/20 mb-4">
            <span>High-Impact Business Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Business Problems <span className="text-gradient-cyan">We Eradicate</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            We don't build software for the sake of technology. We engineer targeted solutions that eliminate your deepest operational and revenue bottlenecks.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {problems.map((p) => {
            const Icon = p.icon
            const isActive = activeTab === p.id
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-blue text-black shadow-glow-cyan scale-105'
                    : 'bg-[#0d121c] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-brand-cyan'}`} />
                <span>{p.tab}</span>
              </button>
            )
          })}
        </div>

        {/* Comparison Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Pain */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#120e14]/60 border border-red-500/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Industry Friction</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {current.painTitle}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {current.painDesc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-red-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              Causes missed deadlines, administrative burnout & revenue leakage
            </div>
          </div>

          {/* Right: Four Front Lab Engineered Solution */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#091522]/80 border border-brand-cyan/40 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle glow orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 mb-6">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>The Four Front Solution</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {current.solutionTitle}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {current.solutionDesc}
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-brand-cyan/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Measured Outcome:
                </span>
                <span className="text-base font-bold text-brand-cyan font-mono">
                  {current.metric}
                </span>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-black border border-brand-cyan/40 transition-colors w-fit"
              >
                <span>Engineer This Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

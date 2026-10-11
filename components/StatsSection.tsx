import React from 'react'
import { ShieldCheck, TrendingUp, Zap, Clock } from 'lucide-react'

const stats = [
  {
    icon: ShieldCheck,
    value: '99.8%',
    label: 'Platform Reliability & Uptime',
    subtext: 'Global edge-distributed clusters with automated failover',
  },
  {
    icon: Zap,
    value: '45+',
    label: 'Enterprise Systems Shipped',
    subtext: 'Across fintech, luxury commerce, healthcare & logistics',
  },
  {
    icon: TrendingUp,
    value: '3.8x',
    label: 'Average Client ROI',
    subtext: 'Measured in quantifiable labor savings and revenue growth',
  },
  {
    icon: Clock,
    value: '< 15m',
    label: 'Response Time on WhatsApp',
    subtext: 'Direct communication with dedicated system architects',
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 relative bg-[#07090e] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0b0f19]/60 border border-white/5 hover:border-brand-cyan/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-1 text-gradient-cyan">
                  {s.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">
                  {s.label}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {s.subtext}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

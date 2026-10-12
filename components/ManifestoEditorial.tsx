'use client'

import React from 'react'

const pillars = [
  {
    step: '01',
    title: 'We Build',
    desc: 'From stunning web designs to full-scale business software. Engineered with Next.js 14, TypeScript, and robust database architectures.',
  },
  {
    step: '02',
    title: 'We Launch',
    desc: 'Sub-second edge performance and airtight CI/CD pipelines. Every platform is deployed production-ready on day one.',
  },
  {
    step: '03',
    title: 'We Maintain',
    desc: 'Active monitoring, security updates, and performance tuning. Zero technical debt left behind for your team to deal with.',
  },
  {
    step: '04',
    title: 'We Scale',
    desc: 'We don’t just develop websites—we craft practical, defensible digital tools that help your business grow and capture market share.',
  },
]

export default function ManifestoEditorial() {
  return (
    <section id="manifesto" className="w-full bg-[#080808] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
            02
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
            / THE MANIFESTO
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-8">
            Every project gets our full attention, fresh thinking, and clean execution.
          </h2>
          <p className="text-base sm:text-xl leading-[1.8] text-[#6b6b6b] max-w-2xl">
            Young, skilled, and hungry to deliver — we are your next tech partners. We operate without bureaucratic layers or junior handoffs. You work directly with the four engineers writing your code.
          </p>
        </div>

        {/* 4 Pillars Grid (Sharp 1px Border Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#1f1f1f]">
          {pillars.map((pillar) => (
            <div
              key={pillar.step}
              className="p-8 border-r border-b border-[#1f1f1f] bg-[#080808] hover:bg-[#111111] transition-colors flex flex-col justify-between min-h-[260px] group"
            >
              <div className="font-mono text-xs text-[#3a3a3a] group-hover:text-[#c8f542] transition-colors mb-6">
                [{pillar.step}]
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-normal text-[#f5f5f0] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-[1.8] text-[#6b6b6b]">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

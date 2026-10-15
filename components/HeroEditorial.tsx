'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function HeroEditorial() {
  // Exact intro copy
  const paragraphOne =
    'We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="about"
      className="relative w-full bg-[#080808] text-[#f5f5f0] pt-28 sm:pt-36 pb-24 sm:pb-32 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none z-0" />

      {/* Lightweight Ambient Radial Glow (0ms JS Cost) */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[350px] bg-[#c8f542]/[0.025] rounded-full pointer-events-none" />

      {/* Animated Horizontal Rule Line Drawing Across */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[#1f1f1f] animate-draw-line z-[2]" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top Section Metadata Label */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#c8f542]">
              01
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a1aa]">
              / COLLECTIVE SPECIFICATION
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#a1a1aa] hidden sm:block">
              EST. 2026 • GLOBALLY DISTRIBUTED
            </div>
          </div>
        </div>

        {/* Hero Split Layout: Left Typography & Copy / Right Editorial Image Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Massive Thin Serif H1 & High-Contrast Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-editorial text-[clamp(48px,7.5vw,110px)] font-light leading-[0.95] tracking-[-0.03em] text-[#f5f5f0] mb-8 select-none">
                We build digital products for{' '}
                <span className="text-[#c8f542] italic font-normal">
                  ambitious
                </span>{' '}
                companies.
              </h1>

              {/* High-Contrast Readable Editorial Copy */}
              <div className="max-w-xl space-y-4">
                <p className="text-base sm:text-lg leading-[1.8] font-normal text-[#f5f5f0]">
                  {paragraphOne}
                </p>

                <p className="text-sm sm:text-base leading-[1.8] font-normal text-[#a3a39e]">
                  {paragraphTwo}
                </p>
              </div>
            </div>

            {/* Action Triggers & Four Operational Pillars Pill */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 pt-8 border-t border-[#1f1f1f]">
              <Link
                href="#contact"
                className="font-mono text-xs uppercase tracking-[0.15em] text-[#080808] bg-[#f5f5f0] hover:bg-[#c8f542] px-6 py-4 font-semibold transition-colors flex items-center gap-2 group"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#work"
                className="font-mono text-xs uppercase tracking-[0.15em] text-[#f5f5f0] px-6 py-4 border border-[#1f1f1f] hover:border-[#c8f542] bg-[#111111] transition-colors"
              >
                Selected Work
              </Link>

              <div className="w-full sm:w-auto font-mono text-xs text-[#8e8e93] uppercase tracking-widest sm:ml-auto">
                [ BUILD • LAUNCH • MAINTAIN • SCALE ]
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Editorial Real Photo Canvas with Grayscale-to-Color Reveal */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[580px] bg-[#111111] border border-[#1f1f1f] overflow-hidden group">
            <Image
              src="/images/react-code-sharp.jpg"
              alt="Next.js Full-Stack Architecture Showcase"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-left-top img-editorial group-hover:scale-105"
            />
            {/* Minimal Corner Monospace Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#080808]/90 border-t border-[#1f1f1f] flex items-center justify-between font-mono text-[11px] tracking-widest uppercase text-[#a1a1aa]">
              <span>FULL-STACK STUDIO</span>
              <span>NEXT.JS &amp; AI INTEGRATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

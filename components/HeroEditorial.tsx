'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function HeroEditorial() {
  return (
    <section className="relative w-full bg-[#080808] text-[#f5f5f0] pt-28 sm:pt-36 pb-24 sm:pb-32 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden">
      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Animated Horizontal Rule Line Drawing Across */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[#1f1f1f] animate-draw-line" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top Section Metadata Label */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / COLLECTIVE SPECIFICATION
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hidden sm:block">
            EST. 2026 • GLOBALLY DISTRIBUTED
          </div>
        </div>

        {/* Hero Split Layout: Left Massive Typography / Right Dark Editorial Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Massive Thin Serif H1 & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-editorial text-[clamp(48px,7.5vw,110px)] font-light leading-[0.95] tracking-[-0.03em] text-[#f5f5f0] mb-8 select-none">
                We build digital products for{' '}
                <span className="text-[#c8f542] italic font-normal">
                  ambitious
                </span>{' '}
                companies.
              </h1>

              {/* Confident Human Copy (Team of Four SE Students) */}
              <div className="max-w-xl space-y-4">
                <p className="text-base sm:text-lg leading-[1.8] text-[#6b6b6b] font-normal">
                  We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.
                </p>
                <p className="text-sm sm:text-base leading-[1.8] text-[#6b6b6b] font-normal">
                  We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.
                </p>
              </div>
            </div>

            {/* Sharp Action Triggers */}
            <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 pt-8 border-t border-[#1f1f1f]">
              <Link
                href="#contact"
                className="font-mono text-xs uppercase tracking-[0.15em] text-[#080808] bg-[#f5f5f0] hover:bg-[#c8f542] px-6 py-4 font-medium transition-colors flex items-center gap-2 group"
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

              <div className="w-full sm:w-auto font-mono text-[11px] text-[#3a3a3a] uppercase tracking-widest sm:ml-auto">
                [ 100% FOCUS • 0% CORPORATE BLOAT ]
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Grayscale Real Studio Photography with Sharp 1px Border */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[580px] bg-[#111111] border border-[#1f1f1f] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format"
              alt="Four Front Lab Studio Architecture"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover img-editorial group-hover:scale-105"
            />
            {/* Minimal Corner Monospace Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#080808]/90 border-t border-[#1f1f1f] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#6b6b6b]">
              <span>LAB_HEADQUARTERS</span>
              <span>4 CO-FOUNDERS / DEV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

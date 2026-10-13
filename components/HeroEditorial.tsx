'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function HeroEditorial() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll scrub bound to hero container: starts at top and scrubs as user scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end 0.3'],
  })

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const paragraphOneColor = useTransform(
    scrollYProgress,
    [0, 0.45],
    ['#8a8a86', '#f5f5f0']
  )
  const paragraphOneOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    [0.75, 1]
  )
  const paragraphTwoColor = useTransform(
    scrollYProgress,
    [0.35, 0.85],
    ['#555555', '#f5f5f0']
  )
  const paragraphTwoOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.85],
    [0.4, 1]
  )

  // Exact intro copy as requested
  const paragraphOne =
    'We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative w-full bg-[#080808] text-[#f5f5f0] pt-28 sm:pt-36 pb-24 sm:pb-32 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none z-0" />

      {/* Razor-Sharp Crystal-Clear Next.js & Web Engineering Background Canvas */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-[1]">
        <Image
          src="/images/react-code-sharp.jpg"
          alt="Razor-Sharp Next.js Code Canvas"
          fill
          sizes="100vw"
          className="object-cover object-right-top lg:object-right opacity-65 contrast-125 brightness-105"
        />
        {/* Cinematic Translucent Overlays: keeps typography 100% crisp while code syntax shines through without blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/85 via-transparent to-[#080808]" />
      </div>

      {/* Animated Horizontal Rule Line Drawing Across */}
      <div className="absolute top-20 left-0 right-0 h-[1px] bg-[#1f1f1f] animate-draw-line z-[2]" />

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

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#444444] hidden sm:inline-block">
              [ SCROLL TO ILLUMINATE ]
            </span>
            <div className="w-16 h-[1.5px] bg-[#1f1f1f] overflow-hidden hidden sm:block">
              <motion.div
                style={{ width: progressBarWidth }}
                className="h-full bg-[#f5f5f0]"
              />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hidden sm:block">
              EST. 2026 • GLOBALLY DISTRIBUTED
            </div>
          </div>
        </div>

        {/* Hero Split Layout: Left Typography & Scroll Scrub Copy / Right Editorial Image Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Massive Thin Serif H1 & Scroll-Scrubbed Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-editorial text-[clamp(48px,7.5vw,110px)] font-light leading-[0.95] tracking-[-0.03em] text-[#f5f5f0] mb-8 select-none">
                We build digital products for{' '}
                <span className="text-[#c8f542] italic font-normal">
                  ambitious
                </span>{' '}
                companies.
              </h1>

              {/* ─────────────────────────────────────────────────────────────
                  SCROLL-SCRUBBED INTRO COPY:
                  - Width preserved at max-w-xl (no increase)
                  - Typography size maintained (text-base sm:text-lg & text-sm sm:text-base)
                  - "Your next tech partner" as opening line
                  - Illuminates smoothly as user scrolls with zero per-word overhead
              ───────────────────────────────────────────────────────────── */}
              <div className="max-w-xl space-y-4">
                <motion.p
                  style={{ color: paragraphOneColor, opacity: paragraphOneOpacity }}
                  className="text-base sm:text-lg leading-[1.8] font-normal select-none"
                >
                  {paragraphOne}
                </motion.p>

                <motion.p
                  style={{ color: paragraphTwoColor, opacity: paragraphTwoOpacity }}
                  className="text-sm sm:text-base leading-[1.8] font-normal select-none"
                >
                  {paragraphTwo}
                </motion.p>
              </div>
            </div>

            {/* Action Triggers & Four Operational Pillars Pill */}
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#080808]/90 border-t border-[#1f1f1f] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[#6b6b6b]">
              <span>SYS_ARCHITECTURE</span>
              <span>NEXT.JS & FULL-STACK ENG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

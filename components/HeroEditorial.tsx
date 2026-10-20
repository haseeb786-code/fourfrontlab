'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AntiGravityCanvas from './AntiGravityCanvas'
import HeroSplitShowcase from './HeroSplitShowcase'
import { useTheme } from './ThemeProvider'

function ScrollWord({
  word,
  progress,
  range,
  isDark,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isDark: boolean
}) {
  const opacity = useTransform(progress, range, [0.55, 1])
  const fontWeight = useTransform(progress, range, [400, 700])
  const color = useTransform(progress, range, [
    isDark ? '#8E929A' : '#6B6E76',
    isDark ? '#f0ede8' : '#121316',
  ])

  return (
    <motion.span
      style={{ opacity, fontWeight, color }}
      className="inline-block mr-[0.28em] will-change-[font-weight,color,opacity]"
    >
      {word}
    </motion.span>
  )
}

function ScrollBoldParagraph({
  text,
  progress,
  startRange,
  endRange,
  className,
  isDark,
}: {
  text: string
  progress: MotionValue<number>
  startRange: number
  endRange: number
  className?: string
  isDark: boolean
}) {
  const words = text.split(' ')
  const count = words.length
  const step = (endRange - startRange) / count

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = startRange + i * step
        const end = Math.min(start + step * 1.2, endRange)
        return (
          <ScrollWord
            key={`${word}-${i}`}
            word={word}
            progress={progress}
            range={[start, end]}
            isDark={isDark}
          />
        )
      })}
    </p>
  )
}

export default function HeroEditorial() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll scrub bound to hero container: illuminates & bolds words sequentially on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const paragraphOne =
    'We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="about"
      ref={heroRef}
      className={`relative w-full transition-colors duration-300 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-6 lg:px-12 border-b overflow-hidden select-none ${
        isDark
          ? 'bg-[var(--dm-bg)] text-[var(--dm-text)] border-[var(--dm-border)]'
          : 'bg-[#F4F4F2] text-[#121316] border-[#E0E2DE]'
      }`}
    >
      {/* ─────────────────────────────────────────────────────────────
          ORGANIC WAVE & PARTICLES THEME BACKGROUND (Uploaded Theme Image)
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/images/hero-bg-theme.png"
          alt="Ethereal Anti-Gravity Wave & Bokeh Theme"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            isDark
              ? 'opacity-25 invert-[0.9] hue-rotate-180 brightness-[0.7] contrast-[1.2]'
              : 'opacity-95'
          }`}
        />
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
      </div>

      {/* Crosshair guide lines across canvas */}
      <div
        className={`absolute top-16 sm:top-20 left-0 right-0 h-[1px] pointer-events-none z-[1] ${
          isDark ? 'bg-[var(--dm-border)]/60' : 'bg-[#E0E2DE]'
        }`}
      />
      <div
        className={`absolute left-8 lg:left-12 top-0 bottom-0 w-[1px] pointer-events-none z-[1] ${
          isDark ? 'bg-[var(--dm-border)]/50' : 'bg-[#E0E2DE]/70'
        }`}
      />
      <div
        className={`absolute right-8 lg:right-12 top-0 bottom-0 w-[1px] pointer-events-none z-[1] ${
          isDark ? 'bg-[var(--dm-border)]/50' : 'bg-[#E0E2DE]/70'
        }`}
      />

      {/* ─────────────────────────────────────────────────────────────
          LEFT MARGIN: CALIPER DRAFTING GRAPHIC, STATUS '=' & SOCIALS
      ───────────────────────────────────────────────────────────── */}
      {/* Drafting caliper circle watermark behind top-left */}
      <div className="absolute top-24 left-2 sm:left-4 pointer-events-none select-none z-[1] opacity-70 hidden md:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Faint watermark number 01 */}
          <text
            x="36"
            y="74"
            fill={isDark ? '#f0ede8' : '#121316'}
            fillOpacity={isDark ? '0.06' : '0.08'}
            fontFamily="var(--font-serif), Georgia, serif"
            fontSize="56"
            fontWeight="400"
          >
            01
          </text>
          {/* Caliper circles */}
          <circle cx="110" cy="110" r="90" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.09' : '0.14'} strokeDasharray="3 3" strokeWidth="1" />
          <circle cx="110" cy="110" r="64" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.07' : '0.10'} strokeWidth="1" />
          <circle cx="110" cy="110" r="38" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.05' : '0.08'} strokeDasharray="2 4" strokeWidth="1" />
          <circle cx="110" cy="110" r="4" fill={isDark ? '#c8f542' : '#687D3B'} fillOpacity="0.45" />
          {/* Crosshairs */}
          <line x1="10" y1="110" x2="210" y2="110" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.08' : '0.12'} strokeWidth="1" />
          <line x1="110" y1="10" x2="110" y2="210" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.08' : '0.12'} strokeWidth="1" />
          {/* Caliper angle ticks */}
          <line x1="174" y1="46" x2="182" y2="38" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.18' : '0.25'} strokeWidth="1" />
          <line x1="46" y1="174" x2="38" y2="182" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.18' : '0.25'} strokeWidth="1" />
          {/* Measurement labels */}
          <text x="180" y="32" fill={isDark ? '#8E929A' : '#666A73'} fontSize="8" fontFamily="var(--font-mono), monospace">R:90</text>
          <text x="12" y="106" fill={isDark ? '#8E929A' : '#666A73'} fontSize="7" fontFamily="var(--font-mono), monospace">0.5</text>
        </svg>
      </div>

      {/* Left-edge status indicator (= in accent) & Social links */}
      <div className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 hidden lg:flex">
        {/* Accent double-dash '=' */}
        <div className="flex flex-col gap-1 select-none">
          <span className={`w-3.5 h-[2px] rounded-full ${isDark ? 'bg-[#c8f542]' : 'bg-[#687D3B]'}`} />
          <span className={`w-3.5 h-[2px] rounded-full ${isDark ? 'bg-[#c8f542]' : 'bg-[#687D3B]'}`} />
        </div>

        {/* Minimal Social Links */}
        <div className={`flex flex-col items-center gap-4 ${isDark ? 'text-[#8E929A]' : 'text-[#767A82]'}`}>
          {/* X / Twitter */}
          <a
            href="https://x.com/FourFrontLab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter X"
            className={`transition-colors p-1 ${isDark ? 'hover:text-white' : 'hover:text-[#121316]'}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/fourfrontlab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`transition-colors p-1 ${isDark ? 'hover:text-white' : 'hover:text-[#121316]'}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom-left mechanical blueprint drafting flange watermark */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none select-none z-[1] opacity-40 hidden md:block">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="140" r="115" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.08' : '0.12'} strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="140" cy="140" r="85" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.10' : '0.14'} strokeWidth="1" />
          <circle cx="140" cy="140" r="55" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.12' : '0.16'} strokeWidth="1" />
          <circle cx="140" cy="140" r="28" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.14' : '0.18'} strokeWidth="1" />
          <circle cx="140" cy="140" r="4" fill={isDark ? '#c8f542' : '#687D3B'} fillOpacity="0.4" />
          <line x1="15" y1="140" x2="265" y2="140" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.08' : '0.12'} strokeWidth="1" />
          <line x1="140" y1="15" x2="140" y2="265" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.08' : '0.12'} strokeWidth="1" />
          <path d="M100 100 L115 85 M120 100 L135 85 M100 120 L115 105 M140 100 L155 85 M160 140 L185 115 M170 150 L195 125 M180 160 L205 135" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.10' : '0.15'} strokeWidth="1" />
          <path d="M55 140 H25 V170 H55" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.12' : '0.16'} strokeWidth="1" />
          <path d="M225 140 H255 V170 H225" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.12' : '0.16'} strokeWidth="1" />
          <line x1="25" y1="175" x2="55" y2="175" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.15' : '0.2'} strokeWidth="0.75" />
          <line x1="25" y1="172" x2="25" y2="178" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.2' : '0.25'} strokeWidth="0.75" />
          <line x1="55" y1="172" x2="55" y2="178" stroke={isDark ? '#f0ede8' : '#121316'} strokeOpacity={isDark ? '0.2' : '0.25'} strokeWidth="0.75" />
          <text x="34" y="185" fill={isDark ? '#8E929A' : '#666A73'} fontSize="6.5" fontFamily="var(--font-mono), monospace">Ø30</text>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto relative z-10">

        {/* Hero Split Layout: Left Typography & Copy / Right Floating Tablet Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (6 cols): Massive High-Contrast Serif H1 & Body Copy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h1 className={`font-editorial text-[clamp(44px,6.2vw,92px)] font-bold leading-[0.98] tracking-[-0.03em] mb-8 select-none ${isDark ? 'text-[#f0ede8]' : 'text-[#121316]'}`}>
                We build<br />
                digital<br />
                products for<br />
                <span className={`font-serif italic font-bold ${isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'}`}>
                  ambitious
                </span><br />
                companies.
              </h1>

              {/* Body Copy with Interactive Scroll-to-Bold Illumination */}
              <div className="max-w-2xl space-y-4">
                <ScrollBoldParagraph
                  text={paragraphOne}
                  progress={scrollYProgress}
                  startRange={0.01}
                  endRange={0.16}
                  className="text-[17px] sm:text-[18.5px] lg:text-[19.5px] leading-[1.68]"
                  isDark={isDark}
                />

                <ScrollBoldParagraph
                  text={paragraphTwo}
                  progress={scrollYProgress}
                  startRange={0.11}
                  endRange={0.28}
                  className="text-[16px] sm:text-[17.5px] lg:text-[18px] leading-[1.68]"
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Dual Pill CTA Buttons */}
            <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className={`font-mono text-xs uppercase tracking-[0.16em] px-7 py-3.5 rounded-full border shadow-sm font-semibold transition-all flex items-center gap-2 group ${
                  isDark
                    ? 'text-[#f0ede8] hover:text-[#c8f542] bg-[#181B20] hover:bg-[#222730] border-[#2A2F3A] hover:border-[#c8f542]'
                    : 'text-[#121316] hover:text-[#687D3B] bg-white hover:bg-[#F9F9F7] border-[#D4D7D1] hover:border-[#687D3B]'
                }`}
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isDark ? 'text-[#8E929A] group-hover:text-[#c8f542]' : 'text-[#666A73] group-hover:text-[#687D3B]'
                  }`}
                />
              </Link>

              <Link
                href="#work"
                className={`font-mono text-xs uppercase tracking-[0.16em] px-7 py-3.5 rounded-full font-semibold shadow-sm transition-all ${
                  isDark
                    ? 'text-black bg-[#c8f542] hover:bg-[#d8ff4e]'
                    : 'text-white bg-[#121316] hover:bg-[#687D3B]'
                }`}
              >
                Selected Work
              </Link>
            </div>
          </div>

          {/* Right Column (6 cols): Interactive Split Before/After Showcase (Pic 2) */}
          <div className="lg:col-span-6 relative w-full">
            <HeroSplitShowcase isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  )
}

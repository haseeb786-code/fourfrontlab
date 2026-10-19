'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AntiGravityCanvas from './AntiGravityCanvas'

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.38, 1])
  const fontWeight = useTransform(progress, range, [400, 700])
  const color = useTransform(progress, range, ['#787C86', '#121316'])

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
}: {
  text: string
  progress: MotionValue<number>
  startRange: number
  endRange: number
  className?: string
}) {
  const words = text.split(' ')
  const count = words.length
  const step = (endRange - startRange) / count

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = startRange + i * step
        const end = Math.min(start + step * 1.5, endRange)
        return (
          <ScrollWord
            key={`${word}-${i}`}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}

export default function HeroEditorial() {
  const heroRef = useRef<HTMLDivElement>(null)

  // 3D Parallax Tilt for the zero-gravity tablet showcase
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleCardMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Scroll scrub bound to hero container: illuminates & bolds words sequentially on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const progressBarWidth = useTransform(scrollYProgress, [0, 0.75], ['0%', '100%'])

  const paragraphOne =
    'We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative w-full bg-[#F4F4F2] text-[#121316] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-6 lg:px-12 border-b border-[#E0E2DE] overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL BLUEPRINT GRID & DRAFTING GUIDE LINES
      ───────────────────────────────────────────────────────────── */}
      {/* Main architectural grid background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none z-0" />

      {/* Crosshair guide lines across canvas */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 h-[1px] bg-[#E0E2DE] pointer-events-none z-[1]" />
      <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-[1px] bg-[#E0E2DE]/70 pointer-events-none z-[1]" />
      <div className="absolute right-8 lg:right-12 top-0 bottom-0 w-[1px] bg-[#E0E2DE]/70 pointer-events-none z-[1]" />

      {/* ─────────────────────────────────────────────────────────────
          LEFT MARGIN: CALIPER DRAFTING GRAPHIC, STATUS '=' & SOCIALS
      ───────────────────────────────────────────────────────────── */}
      {/* Drafting caliper circle watermark behind top-left */}
      <div className="absolute top-24 left-2 sm:left-4 pointer-events-none select-none z-[1] opacity-70 hidden md:block">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Faint watermark number 01 */}
          <text x="36" y="74" fill="#121316" fillOpacity="0.08" fontFamily="var(--font-serif), Georgia, serif" fontSize="56" fontWeight="400">01</text>
          {/* Caliper circles */}
          <circle cx="110" cy="110" r="90" stroke="#121316" strokeOpacity="0.14" strokeDasharray="3 3" strokeWidth="1" />
          <circle cx="110" cy="110" r="64" stroke="#121316" strokeOpacity="0.10" strokeWidth="1" />
          <circle cx="110" cy="110" r="38" stroke="#121316" strokeOpacity="0.08" strokeDasharray="2 4" strokeWidth="1" />
          <circle cx="110" cy="110" r="4" fill="#687D3B" fillOpacity="0.45" />
          {/* Crosshairs */}
          <line x1="10" y1="110" x2="210" y2="110" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          <line x1="110" y1="10" x2="110" y2="210" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          {/* Caliper angle ticks */}
          <line x1="174" y1="46" x2="182" y2="38" stroke="#121316" strokeOpacity="0.25" strokeWidth="1" />
          <line x1="46" y1="174" x2="38" y2="182" stroke="#121316" strokeOpacity="0.25" strokeWidth="1" />
          {/* Measurement labels */}
          <text x="180" y="32" fill="#666A73" fontSize="8" fontFamily="var(--font-mono), monospace">R:90</text>
          <text x="12" y="106" fill="#666A73" fontSize="7" fontFamily="var(--font-mono), monospace">0.5</text>
        </svg>
      </div>

      {/* Left-edge status indicator (= in olive green) & Social links */}
      <div className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 hidden lg:flex">
        {/* Olive green double-dash '=' */}
        <div className="flex flex-col gap-1 select-none">
          <span className="w-3.5 h-[2px] bg-[#687D3B] rounded-full" />
          <span className="w-3.5 h-[2px] bg-[#687D3B] rounded-full" />
        </div>

        {/* Minimal Social Links */}
        <div className="flex flex-col items-center gap-4 text-[#767A82]">
          {/* X / Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter X"
            className="hover:text-[#121316] transition-colors p-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#121316] transition-colors p-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66a1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom-left mechanical blueprint drafting flange watermark */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none select-none z-[1] opacity-45 hidden md:block">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Center concentric circles */}
          <circle cx="140" cy="140" r="115" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="140" cy="140" r="85" stroke="#121316" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="140" cy="140" r="55" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          <circle cx="140" cy="140" r="28" stroke="#121316" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="140" cy="140" r="4" fill="#687D3B" fillOpacity="0.4" />
          {/* Extended crosshairs */}
          <line x1="15" y1="140" x2="265" y2="140" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          <line x1="140" y1="15" x2="140" y2="265" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          {/* Section hatching (45 degree lines) */}
          <path d="M100 100 L115 85 M120 100 L135 85 M100 120 L115 105 M140 100 L155 85 M160 140 L185 115 M170 150 L195 125 M180 160 L205 135" stroke="#121316" strokeOpacity="0.15" strokeWidth="1" />
          {/* Flange mounting steps */}
          <path d="M55 140 H25 V170 H55" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          <path d="M225 140 H255 V170 H225" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          {/* Dimension ticks */}
          <line x1="25" y1="175" x2="55" y2="175" stroke="#121316" strokeOpacity="0.2" strokeWidth="0.75" />
          <line x1="25" y1="172" x2="25" y2="178" stroke="#121316" strokeOpacity="0.25" strokeWidth="0.75" />
          <line x1="55" y1="172" x2="55" y2="178" stroke="#121316" strokeOpacity="0.25" strokeWidth="0.75" />
          <text x="34" y="185" fill="#666A73" fontSize="6.5" fontFamily="var(--font-mono), monospace">Ø30</text>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Top Section Metadata Label & Status Indicator */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E0E2DE]/80">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#687D3B] font-bold">
              01
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#121316] font-bold">
              / COLLECTIVE SPECIFICATION
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#121316] font-bold">
                [ SCROLL TO ILLUMINATE ]
              </span>
              <div className="w-10 sm:w-14 h-[3px] bg-[#D4D7D1] rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressBarWidth }}
                  className="h-full bg-[#687D3B] rounded-full"
                />
              </div>
            </div>
            <span className="w-4 sm:w-6 h-[1px] bg-[#D4D7D1] hidden sm:inline-block" />
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#121316] hidden md:block font-bold">
              EST. 2026 • GLOBALLY DISTRIBUTED
            </div>
          </div>
        </div>

        {/* Hero Split Layout: Left Typography & Copy / Right Floating Tablet Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (6 cols): Massive High-Contrast Serif H1 & Body Copy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h1 className="font-editorial text-[clamp(44px,6.2vw,92px)] font-bold leading-[0.98] tracking-[-0.03em] text-[#121316] mb-8 select-none">
                We build<br />
                digital<br />
                products for<br />
                <span className="font-serif italic font-bold text-[#687D3B]">
                  ambitious
                </span><br />
                companies.
              </h1>

              {/* Body Copy with Interactive Scroll-to-Bold Illumination */}
              <div className="max-w-xl space-y-4">
                <ScrollBoldParagraph
                  text={paragraphOne}
                  progress={scrollYProgress}
                  startRange={0.02}
                  endRange={0.42}
                  className="text-[15px] sm:text-[16.5px] leading-[1.75]"
                />

                <ScrollBoldParagraph
                  text={paragraphTwo}
                  progress={scrollYProgress}
                  startRange={0.32}
                  endRange={0.78}
                  className="text-[14px] sm:text-[15px] leading-[1.75]"
                />
              </div>
            </div>

            {/* Dual Pill CTA Buttons */}
            <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="font-mono text-xs uppercase tracking-[0.16em] text-[#121316] hover:text-[#687D3B] bg-white hover:bg-[#F9F9F7] px-7 py-3.5 rounded-full border border-[#D4D7D1] hover:border-[#687D3B] shadow-sm font-semibold transition-all flex items-center gap-2 group"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 text-[#666A73] group-hover:text-[#687D3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="#work"
                className="font-mono text-xs uppercase tracking-[0.16em] text-white bg-[#121316] hover:bg-[#687D3B] px-7 py-3.5 rounded-full font-semibold shadow-sm transition-all"
              >
                Selected Work
              </Link>
            </div>
          </div>

          {/* Right Column (6 cols): Floating Isometric Tablet Showcase with Zero-Gravity Code */}
          <div className="lg:col-span-6 relative w-full perspective-[1200px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[509/456] rounded-xl overflow-hidden shadow-xl border border-[#E0E2DE]/80 bg-[#EFEFEA]/30 group cursor-crosshair"
            >
              <Image
                src="/images/architectural-antigravity-pure.webp"
                alt="Architectural Wireframe & Zero-Gravity 3D Code IDE Tablet"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
              />

              {/* Ambient Golden Rim Light on the Tablet Edge */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-[#E5A93C]/10 mix-blend-screen" />

              {/* Interactive Zero-Gravity HTML5 Canvas Particle Overlay */}
              <AntiGravityCanvas />

              {/* Floating Zero-Gravity Code Tags with CSS Keyframes */}
              {/* <div/> Tag (Top Right) */}
              <div className="absolute top-[32%] right-[20%] z-20 pointer-events-none animate-float-slow">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#E5A93C] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
                  &lt;div/&gt;
                </span>
              </div>

              {/* <div/> & js Tags (Left side) */}
              <div className="absolute top-[48%] left-[4%] z-20 pointer-events-none animate-float-medium flex items-center gap-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#4ADE80] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
                  &lt;div/&gt;
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#A3E635] font-semibold px-1.5 py-0.5 rounded code-tag-antigravity shadow-sm">
                  js
                </span>
              </div>

              {/* {} Brackets Tag (Bottom Left) */}
              <div className="absolute bottom-[24%] left-[17%] z-20 pointer-events-none animate-float-fast">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-wide text-[#F59E0B] font-bold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
                  &#123;&#125;
                </span>
              </div>

              {/* fn() Function Tag (Bottom Right) */}
              <div className="absolute bottom-[28%] right-[22%] z-20 pointer-events-none animate-float-medium">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#38BDF8] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
                  fn()
                </span>
              </div>

              {/* Razor-Sharp Monospace Labels on Tablet Bottom Bezel */}
              <div className="absolute top-[60.2%] left-[12%] w-[44.5%] flex items-center justify-between pointer-events-none px-2 select-none z-20">
                <span className="font-mono text-[7px] sm:text-[8.5px] lg:text-[9.5px] uppercase tracking-[0.16em] text-[#C2C6CF] font-semibold drop-shadow-sm">
                  SYS_ARCHITECTS
                </span>
                <span className="font-mono text-[7px] sm:text-[8.5px] lg:text-[9.5px] uppercase tracking-[0.16em] text-[#C2C6CF] font-semibold drop-shadow-sm">
                  NEXT.JS &amp; FULL-STACK ENG
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


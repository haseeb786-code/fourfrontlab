'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface ScrubWordProps {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isFirstPhrase?: boolean
}

function HeroScrubWord({
  word,
  progress,
  range,
  isFirstPhrase = false,
}: ScrubWordProps) {
  // Smooth scrub: unread words start subdued, illuminating into bold stark white as user scrolls
  const activeOpacity = useTransform(
    progress,
    range,
    [isFirstPhrase ? 0.85 : 0.25, 1]
  )
  const dimOpacity = useTransform(
    progress,
    range,
    [isFirstPhrase ? 0.15 : 0.75, 0]
  )

  return (
    <span className="relative inline-block mr-[0.26em] my-[0.02em] select-none">
      {/* Ghost word to permanently reserve bold width, guaranteeing zero layout jitter */}
      <span
        className="opacity-0 font-bold select-none pointer-events-none"
        aria-hidden="true"
      >
        {word}
      </span>

      {/* Dimmed unread state: thin subdued text */}
      <motion.span
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 text-[#6b6b6b] font-normal transition-colors"
      >
        {word}
      </motion.span>

      {/* Illuminated active state: stark bold white with editorial clarity */}
      <motion.span
        style={{ opacity: activeOpacity }}
        className="absolute inset-0 text-[#f5f5f0] font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
      >
        {word}
      </motion.span>
    </span>
  )
}

interface ScrubParagraphProps {
  paragraph: string
  progress: MotionValue<number>
  startProgress: number
  endProgress: number
  isFirstParagraph?: boolean
  className?: string
}

function ScrubParagraph({
  paragraph,
  progress,
  startProgress,
  endProgress,
  isFirstParagraph = false,
  className = '',
}: ScrubParagraphProps) {
  const words = paragraph.split(/\s+/)
  const totalWords = words.length
  const span = endProgress - startProgress

  return (
    <p className={`select-none ${className}`}>
      {words.map((word, index) => {
        const wordStart = startProgress + (index / totalWords) * span
        const wordEnd = Math.min(1, wordStart + (1 / totalWords) * span * 1.5)
        const isFirstPhrase = isFirstParagraph && index < 4 // "Your next tech partner" is visible on initial load
        return (
          <HeroScrubWord
            key={index}
            word={word}
            progress={progress}
            range={[wordStart, wordEnd]}
            isFirstPhrase={isFirstPhrase}
          />
        )
      })}
    </p>
  )
}

export default function HeroEditorial() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll scrub bound to hero container: starts at top and scrubs as user scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end 0.3'],
  })

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Updated intro copy with "Your next tech partner" replacing the previous phrase
  const paragraphOne =
    'Your next tech partner turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative w-full bg-[#080808] text-[#f5f5f0] pt-28 sm:pt-36 pb-24 sm:pb-32 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* Background Coding / Web Design Visual Canvas */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/images/hero-code-bg.jpg"
          alt="Web Architecture and Code Canvas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center grayscale contrast-125 brightness-[0.24] opacity-40"
        />
        {/* Multi-directional Luxury Vignette Masks to preserve high-contrast typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]/85" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 45% 45%, transparent 25%, #080808 88%)',
          }}
        />
      </div>

      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none z-[1]" />

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
                  - Words illuminate into bold stark white as user scrolls
                  - Pauses exactly when scrolling stops
              ───────────────────────────────────────────────────────────── */}
              <div className="max-w-xl space-y-4">
                <ScrubParagraph
                  paragraph={paragraphOne}
                  progress={scrollYProgress}
                  startProgress={0.0}
                  endProgress={0.48}
                  isFirstParagraph={true}
                  className="text-base sm:text-lg leading-[1.8] font-normal"
                />

                <ScrubParagraph
                  paragraph={paragraphTwo}
                  progress={scrollYProgress}
                  startProgress={0.48}
                  endProgress={0.95}
                  isFirstParagraph={false}
                  className="text-sm sm:text-base leading-[1.8] font-normal"
                />
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
              src="/images/manifesto-bg.jpg"
              alt="Four Front Lab Engineering Foundation"
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

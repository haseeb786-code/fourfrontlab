'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrubWordProps {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}

function ScrubWord({ word, progress, range }: ScrubWordProps) {
  // Smooth cross-fade between unread dim state and illuminated bold state
  const activeOpacity = useTransform(progress, range, [0, 1])
  const dimOpacity = useTransform(progress, range, [1, 0])

  return (
    <span className="relative inline-block mr-[0.26em] my-[0.06em] select-none">
      {/* Ghost text for layout stability: reserves exact bold width so zero jumping occurs */}
      <span className="opacity-0 font-bold select-none pointer-events-none" aria-hidden="true">
        {word}
      </span>

      {/* Dimmed unread state: thin, dark charcoal */}
      <motion.span
        style={{ opacity: dimOpacity }}
        className="absolute inset-0 text-[#333333] font-light transition-colors"
      >
        {word}
      </motion.span>

      {/* Illuminated bold state: pure crisp white with radiant editorial clarity */}
      <motion.span
        style={{ opacity: activeOpacity }}
        className="absolute inset-0 text-[#f5f5f0] font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.22)]"
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
  className?: string
}

function ScrubParagraph({
  paragraph,
  progress,
  startProgress,
  endProgress,
  className = '',
}: ScrubParagraphProps) {
  const words = paragraph.split(/\s+/)
  const totalWords = words.length
  const span = endProgress - startProgress

  return (
    <p className={`font-editorial leading-[1.3] tracking-[-0.02em] select-none ${className}`}>
      {words.map((word, index) => {
        const wordStart = startProgress + (index / totalWords) * span
        const wordEnd = Math.min(1, wordStart + (1 / totalWords) * span * 1.5)
        return (
          <ScrubWord
            key={index}
            word={word}
            progress={progress}
            range={[wordStart, wordEnd]}
          />
        )
      })}
    </p>
  )
}

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
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll scrub bound strictly to user scroll position
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.25'],
  })

  // Subtle luxury parallax translation on the background image
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const paragraphOne =
    'We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences. From stunning web designs to full-scale business solutions — we build, we launch, we maintain.'

  const paragraphTwo =
    'We don’t just develop websites; we craft tools that help your business grow. Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners.'

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-[#f5f5f0] py-28 sm:py-40 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          PREMIUM BACKGROUND SYSTEM:
          Uploaded editorial image treated with grayscale, dark contrast,
          ambient vignette overlays, and seamless #080808 blending
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          style={{ y: backgroundY }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/manifesto-bg.jpg"
            alt="Four Front Lab Engineering Foundation"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-125 brightness-[0.20] opacity-35"
            priority={false}
          />
        </motion.div>

        {/* Multi-layered dark vignette masks to merge invisibly into pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-[#080808]/65" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, transparent 20%, #080808 85%)',
          }}
        />
        {/* Subtle tactile dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top Section Header & Scroll Scrub Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14 sm:mb-20 pb-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              02
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / THE MANIFESTO
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b]">
              [ SCROLL TO ILLUMINATE ]
            </span>
            {/* Live Scroll Progress Line Indicator */}
            <div className="w-24 sm:w-32 h-[2px] bg-[#1f1f1f] overflow-hidden">
              <motion.div
                style={{ width: progressBarWidth }}
                className="h-full bg-[#f5f5f0]"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SCROLL-SCRUBBED TEXT REVEAL:
            Words start thin & dimmed charcoal (#333333).
            As user scrolls, each word illuminates into bold stark white (#f5f5f0).
            When user stops scrolling, the animation halts immediately.
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mb-20 sm:mb-28 space-y-12 sm:space-y-16">
          {/* Paragraph 1: Foundation & Build Identity */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a] mb-4">
              [ IDENTITY & MISSION ]
            </div>
            <ScrubParagraph
              paragraph={paragraphOne}
              progress={scrollYProgress}
              startProgress={0.05}
              endProgress={0.48}
              className="text-[clamp(26px,4.2vw,56px)]"
            />
          </div>

          {/* Paragraph 2: Craft & Partnership */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3a3a3a] mb-4">
              [ PHILOSOPHY & COMMITMENT ]
            </div>
            <ScrubParagraph
              paragraph={paragraphTwo}
              progress={scrollYProgress}
              startProgress={0.52}
              endProgress={0.95}
              className="text-[clamp(26px,4.2vw,56px)]"
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4 PILLARS GRID:
            Sharp 1px border boxes with acid green knife-edge hover
        ───────────────────────────────────────────────────────────── */}
        <div className="pt-10 border-t border-[#1f1f1f]">
          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a] mb-8">
            // OUR FOUR OPERATIONAL PILLARS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#1f1f1f]">
            {pillars.map((pillar) => (
              <div
                key={pillar.step}
                className="p-8 border-r border-b border-[#1f1f1f] bg-[#080808]/90 hover:bg-[#111111] transition-colors flex flex-col justify-between min-h-[260px] group backdrop-blur-[2px]"
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
      </div>
    </section>
  )
}

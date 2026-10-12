'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import {
  Code2,
  Rocket,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Terminal,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react'

interface CharacterProps {
  children: string
  range: [number, number]
  progress: MotionValue<number>
  highlight?: boolean
}

function Character({ children, range, progress, highlight = false }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.18, 1.0])
  const color = useTransform(
    progress,
    range,
    highlight ? ['#4B5563', '#FFFFFF'] : ['#4B5563', '#D7E2EA']
  )

  return (
    <motion.span
      style={{ opacity, color }}
      className={`inline-block transition-colors duration-75 select-none ${
        highlight ? 'drop-shadow-[0_0_12px_rgba(182,0,168,0.35)]' : ''
      }`}
    >
      {children === ' ' ? '\u00A0' : children}
    </motion.span>
  )
}

interface ScrubParagraphProps {
  text: string
  progress: MotionValue<number>
  startProgress: number
  endProgress: number
  highlight?: boolean
  className?: string
}

function ScrubParagraph({
  text,
  progress,
  startProgress,
  endProgress,
  highlight = false,
  className = '',
}: ScrubParagraphProps) {
  const characters = text.split('')
  const totalLength = characters.length
  const span = endProgress - startProgress

  return (
    <p className={`font-black uppercase tracking-tight leading-[1.2] text-left select-none ${className}`}>
      {characters.map((char, i) => {
        const start = startProgress + (i / totalLength) * span
        const end = start + (1 / totalLength) * span
        return (
          <Character
            key={i}
            range={[start, end]}
            progress={progress}
            highlight={highlight}
          >
            {char}
          </Character>
        )
      })}
    </p>
  )
}

export default function ScrollScrubReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.2'],
  })

  // Floating 3D Parallax Badges
  const yIcon1 = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const yIcon2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const yIcon3 = useTransform(scrollYProgress, [0, 1], [-30, 70])

  const pillars = [
    {
      num: '01',
      title: 'Stunning Web Designs',
      desc: 'Bespoke kinetic 3D architectures, WebGL physics, and sub-second Next.js frontends.',
      icon: Code2,
      accent: 'from-[#B600A8] to-[#7621B0]',
    },
    {
      num: '02',
      title: 'Full-Scale Solutions',
      desc: 'Custom software portals, serverless architectures, and relational cloud schemas.',
      icon: Layers,
      accent: 'from-[#00F2FE] to-[#7621B0]',
    },
    {
      num: '03',
      title: 'We Build, Launch & Maintain',
      desc: 'End-to-end delivery from initial technical scoping to continuous zero-downtime maintenance.',
      icon: Rocket,
      accent: 'from-[#BE4C00] to-[#B600A8]',
    },
    {
      num: '04',
      title: 'Tools That Drive Growth',
      desc: 'Zero generic templates. Practical, high-leverage tools engineered to scale your revenue.',
      icon: Zap,
      accent: 'from-emerald-400 to-teal-500',
    },
  ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-[140vh] py-32 sm:py-48 bg-[#0C0C0C] flex flex-col justify-center px-4 sm:px-8 lg:px-16 overflow-hidden border-b border-[#D7E2EA]/10 select-none"
    >
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#B600A8]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-[#BE4C00]/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-[#7621B0]/10 blur-[120px]" />

      {/* Floating 3D Parallax Badges */}
      <motion.div
        style={{ y: yIcon1 }}
        className="pointer-events-none absolute top-24 right-6 sm:right-20 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-[#D7E2EA]/[0.04] border border-[#D7E2EA]/15 backdrop-blur-2xl shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white shadow-lg">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">
            4 Software Engineers
          </p>
          <p className="text-[10px] text-[#D7E2EA]/50 font-mono">
            Direct Co-Founder Attention
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yIcon2 }}
        className="pointer-events-none absolute bottom-36 left-6 sm:left-20 hidden md:flex items-center gap-3.5 p-4 rounded-2xl bg-[#D7E2EA]/[0.04] border border-[#D7E2EA]/15 backdrop-blur-2xl shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BE4C00] to-[#B600A8] flex items-center justify-center text-white shadow-lg">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">
            Fresh Thinking &amp; Clean Execution
          </p>
          <p className="text-[10px] text-[#D7E2EA]/50 font-mono">
            Zero Corporate Bloat • 100% Focus
          </p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yIcon3 }}
        className="pointer-events-none absolute top-1/2 right-10 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-[#D7E2EA]/[0.04] border border-[#D7E2EA]/15 backdrop-blur-2xl shadow-2xl"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/80">
          We Build • We Launch • We Maintain
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/90 mb-10 sm:mb-14 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
          [ 02 • THE FOUNDING COLLECTIVE • FOUR FRONT LAB ]
        </div>

        {/* Character-by-Character Scroll-Scrub Reveal (Sentence 1) */}
        <div className="mb-6 sm:mb-8">
          <ScrubParagraph
            text="We are a team of four passionate Software Engineering students turning ideas into powerful digital experiences."
            progress={scrollYProgress}
            startProgress={0.02}
            endProgress={0.32}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white"
          />
        </div>

        {/* Character-by-Character Scroll-Scrub Reveal (Sentence 2) */}
        <div className="mb-6 sm:mb-8">
          <ScrubParagraph
            text="From stunning web designs to full-scale business solutions — we build, we launch, we maintain. We don’t just develop websites, we craft tools that help your business grow."
            progress={scrollYProgress}
            startProgress={0.3}
            endProgress={0.65}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#D7E2EA]/90"
          />
        </div>

        {/* Character-by-Character Scroll-Scrub Reveal (Sentence 3 - Highlighted Climax) */}
        <div className="mb-14 sm:mb-20">
          <ScrubParagraph
            text="Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver — we are your next tech partners."
            progress={scrollYProgress}
            startProgress={0.63}
            endProgress={0.96}
            highlight={true}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black"
          />
        </div>

        {/* The 4 Fronts Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-12 border-t border-[#D7E2EA]/15">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-3xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] hover:bg-[#D7E2EA]/[0.05] hover:border-[#D7E2EA]/25 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/40 font-bold">
                    [ FRONT {pillar.num} ]
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#D7E2EA]/65 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Live Agency Metrics */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-[#D7E2EA]/10 text-left">
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight flex items-center gap-1">
              4
              <span className="text-xs font-mono text-[#B600A8] uppercase tracking-widest font-normal">
                Engineers
              </span>
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">
              Passionate SE Students
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              100%
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">
              Full Attention to Every Project
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              0%
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">
              Corporate Bloat or Delay
            </p>
          </div>

          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              24/7
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">
              Hungry &amp; Committed to Deliver
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

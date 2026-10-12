'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { Cpu, ShieldCheck, Zap, Globe } from 'lucide-react'

interface CharacterProps {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}

function Character({ children, range, progress }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1.0])
  const color = useTransform(progress, range, ['#646973', '#FFFFFF'])

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75 select-none"
    >
      {children === ' ' ? '\u00A0' : children}
    </motion.span>
  )
}

interface ScrubParagraphProps {
  text: string
  progress: MotionValue<number>
}

function ScrubParagraph({ text, progress }: ScrubParagraphProps) {
  const characters = text.split('')
  const totalLength = characters.length

  return (
    <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.25] text-left">
      {characters.map((char, i) => {
        const start = i / totalLength
        const end = start + 1 / totalLength
        return (
          <Character key={i} range={[start, end]} progress={progress}>
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
    offset: ['start 0.8', 'end 0.2'],
  })

  // Subtle floating icon parallax offsets
  const yIcon1 = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const yIcon2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yIcon3 = useTransform(scrollYProgress, [0, 1], [-20, 60])

  const storyText =
    'WE DO NOT BUILD GENERIC WEBSITES. WE CRAFT KINETIC DIGITAL REALITIES ENGINEERED FOR SPEED, POWERED BY INTELLIGENT AUTOMATION, AND DESIGNED TO CONVERT YOUR AUDIENCE ON FIRST SIGHT.'

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen py-32 sm:py-44 bg-[#0C0C0C] flex flex-col justify-center px-6 sm:px-12 lg:px-24 overflow-hidden border-b border-[#D7E2EA]/10"
    >
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#B600A8]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[#BE4C00]/10 blur-[140px]" />

      {/* Floating 3D Parallax Badges */}
      <motion.div
        style={{ y: yIcon1 }}
        className="pointer-events-none absolute top-20 right-8 sm:right-24 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/15 backdrop-blur-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B600A8] to-[#7621B0] flex items-center justify-center text-white shadow-lg">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">Sub-Second Execution</p>
          <p className="text-[10px] text-[#D7E2EA]/50 font-mono">100/100 Core Web Vitals</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yIcon2 }}
        className="pointer-events-none absolute bottom-24 left-8 sm:left-24 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/15 backdrop-blur-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#BE4C00] to-[#B600A8] flex items-center justify-center text-white shadow-lg">
          <Cpu className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">Autonomous AI Logic</p>
          <p className="text-[10px] text-[#D7E2EA]/50 font-mono">Custom Integrations & CRM</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yIcon3 }}
        className="pointer-events-none absolute top-1/2 right-12 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/15 backdrop-blur-xl"
      >
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/80">Zero Technical Debt</span>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 mb-8 sm:mb-12">
          <Globe className="w-3.5 h-3.5 text-[#B600A8]" />
          [ The Agency Philosophy • 02 ]
        </div>

        {/* Character-by-Character Scroll-Scrub Reveal */}
        <ScrubParagraph text={storyText} progress={scrollYProgress} />

        <div className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-[#D7E2EA]/15">
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">100%</p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">Custom Engineering</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">3.8x</p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">Average Conversion Lift</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">60+ fps</p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">Kinetic Physics Engine</p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">&lt; 300ms</p>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/50 mt-1">Global Edge Latency</p>
          </div>
        </div>
      </div>
    </section>
  )
}

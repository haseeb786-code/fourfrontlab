'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function KineticHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const [isInside, setIsInside] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const face = faceRef.current
    if (!container || !face) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = face.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)

      const triggerRadius = rect.width / 2 + 150

      if (dist < triggerRadius) {
        setIsInside(true)
        setTransform({
          x: dx / 3,
          y: dy / 3,
        })
      } else {
        if (isInside) {
          setIsInside(false)
          setTransform({ x: 0, y: 0 })
        }
      }
    }

    const handleMouseLeave = () => {
      setIsInside(false)
      setTransform({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isInside])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0C0C0C] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-6 lg:px-12 select-none"
    >
      {/* Ambient Lighting Orbs */}
      <div
        className="pointer-events-none absolute -top-10 -left-10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-[#B600A8]/20 to-[#7621B0]/20 blur-3xl z-0 animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-10 w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full bg-gradient-to-bl from-[#BE4C00]/20 to-[#B600A8]/20 blur-3xl z-0 animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#7621B0]/15 blur-3xl z-0" />

      {/* Top Bar / Status Badges */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto w-full pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#D7E2EA]/90">
            4 Software Engineering Students • Next-Gen Tech Partners
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-mono">
          <span>Kinetic Architecture</span>
          <span className="text-white/20">/</span>
          <span>Next-Gen Systems</span>
          <span className="text-white/20">/</span>
          <span>Awwwards Tier</span>
        </div>
      </div>

      {/* Center 2.5D Depth Arena */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center my-6 min-h-[480px] sm:min-h-[580px] lg:min-h-[660px]">
        {/* Layer 0: Giant Metallic Hero Title (Behind the subject) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[14.5vw] text-center select-none drop-shadow-2xl opacity-90 transition-all duration-300">
            FOUR FRONT
          </h1>
          <div className="w-full flex items-center justify-between max-w-6xl px-4 mt-[-1vw] sm:mt-[-2vw]">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#D7E2EA]/60">
              [ 01 — DIGITAL AGENCY ]
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#D7E2EA]/60">
              [ EST. 2026 ]
            </span>
          </div>
        </div>

        {/* Layer 1: Magnetic Face / Subject Follower (In front of text, behind overlay cards) */}
        <div
          ref={faceRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[290px] sm:w-[380px] md:w-[460px] lg:w-[520px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[660px] pointer-events-none"
          style={{
            transform: `translate3d(calc(-50% + ${transform.x}px), ${transform.y}px, 0)`,
            transition: isInside ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
            willChange: 'transform',
          }}
        >
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Soft bottom vignette mask so subject blends into base #0C0C0C */}
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-subject.jpg"
                alt="Four Front Lab Creative Director"
                fill
                priority
                sizes="(max-width: 768px) 380px, 520px"
                className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-105"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, black 14%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 14%, black 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Foreground Depth Elements */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-12 z-20 hidden sm:block max-w-[280px] p-4.5 rounded-2xl bg-[#0C0C0C]/85 border border-[#D7E2EA]/15 backdrop-blur-xl shadow-2xl">
          <p className="text-[10px] font-mono text-[#B600A8] uppercase tracking-widest mb-1 font-bold">
            01 / The Team
          </p>
          <p className="text-xs text-[#D7E2EA] font-medium leading-relaxed">
            Four passionate Software Engineering students turning ideas into powerful digital experiences. We build, launch, and maintain.
          </p>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 right-4 sm:right-12 z-20 hidden sm:block max-w-[280px] p-4.5 rounded-2xl bg-[#0C0C0C]/85 border border-[#D7E2EA]/15 backdrop-blur-xl text-right shadow-2xl">
          <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1 font-bold">
            02 / Fresh Execution
          </p>
          <p className="text-xs text-[#D7E2EA] font-medium leading-relaxed">
            Every project gets our full attention, fresh thinking, and clean execution. Young, skilled, and hungry to deliver.
          </p>
        </div>
      </div>

      {/* Bottom Kinetic CTA Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-[#D7E2EA]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center bg-white/5">
            <Sparkles className="w-4 h-4 text-[#B600A8]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-mono text-white font-bold">
              We Craft Tools That Help Your Business Grow
            </p>
            <p className="text-[11px] text-[#D7E2EA]/60 font-sans">
              From stunning web designs to full-scale business solutions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Link
            href="#contact"
            className="btn-kinetic-cta flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white text-xs sm:text-sm font-semibold uppercase tracking-widest text-center shadow-lg cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/60 hover:bg-white/5 transition-colors text-xs font-medium uppercase tracking-widest text-[#D7E2EA]"
          >
            Explore Work
          </Link>
        </div>
      </div>
    </section>
  )
}

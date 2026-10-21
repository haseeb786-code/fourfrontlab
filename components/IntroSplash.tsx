'use client'

import React, { useEffect, useState } from 'react'

export default function IntroSplash() {
  const [mounted, setMounted] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Check if user already saw the intro in this browser session
    try {
      if (typeof window !== 'undefined') {
        const hasSeenIntro = sessionStorage.getItem('fourfront_intro_seen')
        if (hasSeenIntro) {
          return // Skip completely for returning subpage navigation
        }
        sessionStorage.setItem('fourfront_intro_seen', '1')
      }
    } catch {
      // sessionStorage unavailable
    }

    setMounted(true)

    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Initiate smooth curtain slide up at 1.55s
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 1550)

    // Completely unmount component from DOM at 2.05s
    const unmountTimer = setTimeout(() => {
      setMounted(false)
      document.body.style.overflow = originalOverflow
    }, 2050)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(unmountTimer)
      document.body.style.overflow = originalOverflow
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[99999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? '-translate-y-full pointer-events-none' : 'translate-y-0 pointer-events-auto'
      }`}
    >
      {/* 32px Dot Grid Texture */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1f1f1f 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Editorial Crosshairs */}
      <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-[#333] pointer-events-none" />
      <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-[#333] pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-[#333] pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-[#333] pointer-events-none" />

      {/* Corner Telemetry */}
      <div className="absolute top-7 left-12 font-mono text-[11px] uppercase tracking-[0.18em] text-[#555] hidden sm:block">
        FOUR FRONT LAB // SEQUENCE_01
      </div>
      <div className="absolute top-7 right-12 font-mono text-[11px] uppercase tracking-[0.18em] text-[#777] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f5f5f0] opacity-80" />
        <span>EST. 2026</span>
      </div>

      {/* Main Kinetic Typography Group */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-4 transition-all duration-300 ${
          isExiting ? 'opacity-0 -translate-y-4 blur-[2px]' : 'opacity-100'
        }`}
      >
        {/* Top Monospace Pill */}
        <div className="animate-intro-slide-down flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#888888] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#888888]" />
          <span>DIGITAL ARCHITECTURE &bull; AI WORKFLOWS</span>
        </div>

        {/* Staggered Spring Bounce Title */}
        <div className="flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold uppercase text-[#f5f5f0] tracking-tight mb-4 select-none">
          <span className="animate-spring-bounce-1 inline-block">FOUR</span>
          <span className="animate-spring-bounce-2 inline-block">FRONT</span>
          <span className="animate-spring-bounce-3 inline-block font-serif italic font-normal text-[#fafaf8] lowercase tracking-normal">
            lab
          </span>
        </div>

        {/* Editorial Razor Divider Line Drawing Across */}
        <div className="w-64 sm:w-96 h-[1px] bg-[#1f1f1f] relative mb-4 overflow-hidden">
          <div className="animate-draw-line-expand absolute inset-0 bg-gradient-to-r from-transparent via-[#f5f5f0] to-transparent" />
        </div>

        {/* Bottom Subtitle Sliding in */}
        <div className="animate-intro-slide-up font-mono text-xs uppercase tracking-[0.25em] text-[#888888]">
          SOFTWARE ENGINEERING &bull; ISLAMABAD
        </div>
      </div>
    </div>
  )
}

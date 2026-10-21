'use client'

import React, { useEffect, useState } from 'react'

export default function IntroSplash() {
  // Always start mounted so the intro is immediately visible in frame 0 (no flash of content)
  const [mounted, setMounted] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Initiate smooth cinematic fade out (NO curtain slide) at 1.85s
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 1850)

    // Completely unmount component from DOM at 2.45s
    const unmountTimer = setTimeout(() => {
      setMounted(false)
      document.body.style.overflow = originalOverflow
    }, 2450)

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
      className={`fixed inset-0 z-[99999] bg-[#080808] flex items-center justify-center overflow-hidden transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100 blur-0 pointer-events-auto'
      }`}
    >
      {/* 32px Dot Grid Texture matching Homepage */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #1f1f1f 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient Neon Aura */}
      <div className="absolute w-[450px] h-[350px] bg-[#c8f542]/[0.035] rounded-full blur-3xl pointer-events-none" />

      {/* Main Kinetic Typography Group + Client Hook Line */}
      <div className="relative z-10 flex flex-col items-center select-none animate-float-life text-center px-4">
        {/* Brand Words with Glowing Active Beacon Dot */}
        <div className="flex items-center gap-3.5 mb-3 sm:mb-4">
          {/* Glowing Active Beacon Dot */}
          <span className="w-3.5 h-3.5 rounded-full bg-[#c8f542] shadow-[0_0_16px_#c8f542,0_0_32px_rgba(200,245,66,0.6)] animate-pulse shrink-0" />

          {/* Staggered Spring Bounce Brand Title */}
          <div className="flex items-baseline gap-3 text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight">
            {/* FOUR: Crisp Off-White */}
            <span className="animate-spring-bounce-1 inline-block text-[#f5f5f0] drop-shadow-[0_0_20px_rgba(245,245,240,0.2)]">
              FOUR
            </span>

            {/* FRONT: Pure White */}
            <span className="animate-spring-bounce-2 inline-block text-[#fafaf8] drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              FRONT
            </span>

            {/* LAB: Vibrant Electric Lime with Neon Glow */}
            <span className="animate-spring-bounce-3 inline-block">
              <span className="animate-glow-pulse inline-block text-[#c8f542] font-serif italic font-normal lowercase tracking-normal">
                lab
              </span>
            </span>
          </div>
        </div>

        {/* Client-Attracting Hook Line for Web Development */}
        <div className="animate-intro-slide-up flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase">
          <span className="text-[#8e939e]">High-Performance Web Development</span>
          <span className="text-[#c8f542] font-bold select-none">&bull;</span>
          <span className="text-[#f5f5f0] font-semibold">Engineered To Convert</span>
        </div>
      </div>
    </div>
  )
}

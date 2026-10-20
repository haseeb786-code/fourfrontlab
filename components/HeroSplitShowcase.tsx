'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import AntiGravityCanvas from './AntiGravityCanvas'

interface HeroSplitShowcaseProps {
  isDark: boolean
}

export default function HeroSplitShowcase({ isDark }: HeroSplitShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPos, setSliderPos] = useState<number>(50)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // 3D Parallax Tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  // Idle sweeping scanner animation when not hovered or dragged
  useEffect(() => {
    if (isHovered || isDragging) return

    let animId: number
    let startTime = performance.now()

    const animateIdle = (now: number) => {
      const elapsed = (now - startTime) / 1000
      // Gentle sine-wave sweep between 42% and 58%
      const newPos = 50 + Math.sin(elapsed * 1.6) * 10
      setSliderPos(newPos)
      animId = requestAnimationFrame(animateIdle)
    }

    animId = requestAnimationFrame(animateIdle)
    return () => cancelAnimationFrame(animId)
  }, [isHovered, isDragging])

  // Update slider position from clientX
  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const rawPos = ((clientX - rect.left) / rect.width) * 100
    const clampedPos = Math.max(8, Math.min(92, rawPos))
    setSliderPos(clampedPos)
  }, [])

  // Mouse move handler (tracks 3D tilt + slider position)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)

    updateSliderFromClientX(e.clientX)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsDragging(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderFromClientX(e.clientX)
  }

  // Touch move handlers for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setIsHovered(true)
      updateSliderFromClientX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
    setIsDragging(false)
  }

  return (
    <div className="relative w-full perspective-[1200px] select-none">
      <motion.div
        ref={containerRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full aspect-[509/456] rounded-xl overflow-hidden cursor-ew-resize transition-all duration-300 ${
          isDark
            ? 'border border-[#2A2F3A] bg-[#0E1014] shadow-[0_20px_50px_rgba(0,0,0,0.65)]'
            : 'border border-[#E0E2DE]/90 bg-[#EFEFEA]/50 shadow-2xl'
        }`}
      >
        {/* ─────────────────────────────────────────────────────────────
            LAYER 1 (LEFT SIDE): "GENERAL" - ARCHITECTURAL BLUEPRINT WIREFRAME
            Monochrome CAD drafting styling, technical measuring coordinates,
            blueprint grid, and raw wireframe aesthetic.
        ───────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Base Wireframe Image (High contrast monochrome blueprint) */}
          <Image
            src="/images/architectural-antigravity-pure.webp"
            alt="Architectural Blueprint Draft"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover object-center ${
              isDark
                ? 'grayscale contrast-[1.6] brightness-[0.55] invert-[0.1]'
                : 'grayscale contrast-[1.3] brightness-[0.92]'
            }`}
          />

          {/* Blueprint Drafting Coordinate Grid Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none opacity-40 ${
              isDark ? 'mix-blend-screen' : 'mix-blend-multiply'
            }`}
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)'
                : 'linear-gradient(to right, rgba(18,19,22,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,19,22,0.12) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Technical Drawing Calipers & Crosshairs SVG Watermark */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 select-none"
            viewBox="0 0 500 450"
            fill="none"
          >
            {/* Corner Alignment Crosshairs */}
            <circle cx="36" cy="36" r="14" stroke={isDark ? '#F5F5F0' : '#121316'} strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="18" y1="36" x2="54" y2="36" stroke={isDark ? '#F5F5F0' : '#121316'} strokeWidth="0.8" />
            <line x1="36" y1="18" x2="36" y2="54" stroke={isDark ? '#F5F5F0' : '#121316'} strokeWidth="0.8" />

            <circle cx="120" cy="180" r="48" stroke={isDark ? '#c8f542' : '#687D3B'} strokeWidth="0.6" strokeDasharray="3 3" />
            <circle cx="120" cy="180" r="2" fill={isDark ? '#c8f542' : '#687D3B'} />

            {/* Technical Measurement Axis */}
            <line x1="60" y1="410" x2="220" y2="410" stroke={isDark ? '#8E929A' : '#666A73'} strokeWidth="0.8" />
            <line x1="60" y1="405" x2="60" y2="415" stroke={isDark ? '#8E929A' : '#666A73'} strokeWidth="0.8" />
            <line x1="220" y1="405" x2="220" y2="415" stroke={isDark ? '#8E929A' : '#666A73'} strokeWidth="0.8" />
            <text x="110" y="404" fill={isDark ? '#8E929A' : '#666A73'} fontSize="8" fontFamily="monospace">
              240.0mm // DRAFT
            </text>
          </svg>

          {/* Left Watermark Stamp */}
          <div className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] font-bold opacity-60">
            <span className={isDark ? 'text-[#8E929A]' : 'text-[#666A73]'}>
              [ 01 // DRAFT SPEC ]
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            LAYER 2 (RIGHT SIDE): "ELITE" - ILLUMINATED PRODUCTION RENDER
            Clipped dynamically using CSS clipPath: inset(0 0 0 sliderPos%)
            Full color, glowing ambient lights, particles, zero-gravity tags.
        ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none will-change-[clip-path]"
          style={{
            clipPath: `inset(0 0 0 ${sliderPos}%)`,
          }}
        >
          {/* Full Color Vibrant Render */}
          <Image
            src="/images/architectural-antigravity-pure.webp"
            alt="Elite Production 3D Engine"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700"
          />

          {/* Golden Warm Rim Light on the Tablet */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-transparent to-[#E5A93C]/20 mix-blend-screen" />

          {/* Interactive Zero-Gravity HTML5 Canvas Particle Overlay */}
          <AntiGravityCanvas />

          {/* Floating Zero-Gravity Code Tags */}
          <div className="absolute top-[32%] right-[20%] z-20 pointer-events-none animate-float-slow">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#E5A93C] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
              &lt;div/&gt;
            </span>
          </div>

          <div className="absolute top-[48%] left-[4%] z-20 pointer-events-none animate-float-medium flex items-center gap-1.5">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#4ADE80] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
              &lt;div/&gt;
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#A3E635] font-semibold px-1.5 py-0.5 rounded code-tag-antigravity shadow-sm">
              js
            </span>
          </div>

          <div className="absolute bottom-[24%] left-[17%] z-20 pointer-events-none animate-float-fast">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-wide text-[#F59E0B] font-bold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
              &#123;&#125;
            </span>
          </div>

          <div className="absolute bottom-[28%] right-[22%] z-20 pointer-events-none animate-float-medium">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wide text-[#38BDF8] font-semibold px-2 py-0.5 rounded code-tag-antigravity shadow-sm">
              fn()
            </span>
          </div>

          {/* Right Watermark Stamp */}
          <div className="absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.2em] font-bold opacity-80">
            <span className="text-[#c8f542] drop-shadow-[0_0_8px_rgba(200,245,66,0.6)]">
              [ 02 // ELITE PROD ]
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HEADER LABELS: "GENERAL" (Left) vs "ELITE" (Right)
            Exact match to the reference style in Pic 2!
        ───────────────────────────────────────────────────────────── */}
        <div className="absolute top-5 left-0 right-0 px-6 sm:px-8 flex items-center justify-between pointer-events-none z-30 select-none">
          {/* Left Label: GENERAL */}
          <div className="flex flex-col items-start">
            <span
              className={`font-editorial text-xs sm:text-sm md:text-base tracking-[0.3em] font-semibold uppercase drop-shadow-md ${
                isDark ? 'text-[#C5CAD4]' : 'text-[#121316]'
              }`}
            >
              GENERAL
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-60 text-[#767A82]">
              WIREFRAME
            </span>
          </div>

          {/* Right Label: ELITE */}
          <div className="flex flex-col items-end">
            <span
              className={`font-editorial text-xs sm:text-sm md:text-base tracking-[0.3em] font-semibold uppercase drop-shadow-md ${
                isDark ? 'text-[#c8f542]' : 'text-[#687D3B]'
              }`}
            >
              ELITE
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-80 text-[#c8f542]">
              60FPS LIVE
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SPLIT DIVIDER LINE & DRAGGABLE HANDLE (Exact match to Pic 2!)
            Vertical glowing line with centered circular slider pill with < >
        ───────────────────────────────────────────────────────────── */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none z-30 flex items-center justify-center -translate-x-1/2 will-change-[left]"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Laser-Sharp Vertical Divider Line */}
          <div
            className={`w-[1.5px] h-full shadow-[0_0_12px_rgba(200,245,66,0.8)] ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-[#c8f542] to-transparent'
                : 'bg-gradient-to-b from-transparent via-[#121316] to-transparent'
            }`}
          />

          {/* Secondary ambient glow line */}
          <div
            className="absolute inset-y-0 w-[4px] -left-[1.25px] opacity-40 blur-[2px] pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, transparent, #c8f542 50%, transparent)'
                : 'linear-gradient(to bottom, transparent, #687D3B 50%, transparent)',
            }}
          />

          {/* Center Circular Handle Button with < > arrows (Pic 2) */}
          <div
            className={`absolute w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center pointer-events-auto cursor-ew-resize transition-transform duration-150 hover:scale-110 active:scale-95 shadow-xl ${
              isDark
                ? 'bg-[#0B0C0E]/95 border border-[#c8f542] text-[#c8f542] shadow-[0_0_16px_rgba(200,245,66,0.4)]'
                : 'bg-white/95 border border-[#121316] text-[#121316] shadow-[0_0_14px_rgba(0,0,0,0.18)]'
            } backdrop-blur-md`}
            title="Drag or slide to compare General vs Elite"
          >
            {/* Outer pulsating ring */}
            <span
              className={`absolute inset-0 rounded-full animate-ping opacity-25 ${
                isDark ? 'bg-[#c8f542]' : 'bg-[#121316]'
              }`}
            />

            {/* Left & Right Chevrons: < > */}
            <svg
              className="w-4 h-4 relative z-10 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="8 7 3 12 8 17" />
              <polyline points="16 7 21 12 16 17" />
            </svg>
          </div>
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
  )
}

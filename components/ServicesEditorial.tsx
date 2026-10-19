'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  X,
  Sparkles,
  Activity,
  Database,
  Bot,
  Zap,
  RotateCw,
  Shield,
  Layers,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// KINETIC CYBER BACKGROUND CANVAS
// Subtle coordinate grid, laser lines, and reactive ambient illumination
// ─────────────────────────────────────────────────────────────────────────────

function KineticCyberBackground({ activeColor }: { activeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = false
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize, { passive: true })

    let mouse = { x: -1000, y: -1000, radius: 140 }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const particleCount = isMobile ? 18 : 36
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseAlpha: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.3 + 0.15,
      })
    }

    const render = () => {
      if (!isVisible || document.hidden) return

      ctx.clearRect(0, 0, width, height)

      // 1. Technical Drafting Coordinate Grid Lines
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)'
      const gridSize = 48
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 2. Micro Nodes & Constellation Laser Links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x -= (dx / dist) * force * 1.5
          p.y -= (dy / dist) * force * 1.5
        }

        ctx.fillStyle = `rgba(200, 245, 66, ${p.baseAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist2 < 95) {
            const alpha = (1 - dist2 / 95) * 0.08
            ctx.strokeStyle = `rgba(200, 245, 66, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // 3. Interactive Mouse Spotlight
      if (mouse.x > 0 && mouse.y > 0) {
        const radGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          220
        )
        radGrad.addColorStop(0, 'rgba(200, 245, 66, 0.035)')
        radGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = radGrad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible
        isVisible = entry.isIntersecting
        if (isVisible && !document.hidden) {
          if (!wasVisible) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(render)
          }
        } else {
          cancelAnimationFrame(animationFrameId)
        }
      },
      { threshold: 0 }
    )

    observer.observe(canvas)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId)
      } else if (isVisible) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.width = 0
      canvas.height = 0
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* CAD/Blueprint Technical Drafting Wireframe on Left Background */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[360px] sm:w-[440px] lg:w-[500px] pointer-events-none select-none z-0 opacity-40 mix-blend-screen bg-no-repeat bg-left-top bg-contain"
        style={{ backgroundImage: "url('/images/services-cad-wireframe.png')" }}
      />

      {/* 3D Isometric Dark Tech Server/Laptop Terminal Rendering on Right Background */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[400px] sm:w-[480px] lg:w-[540px] pointer-events-none select-none z-0 opacity-55 bg-no-repeat bg-right-top bg-contain"
        style={{ backgroundImage: "url('/images/services-tech-terminal.png')" }}
      />

      {/* Top-Right Warm Amber / Golden Atmospheric Illumination */}
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] bg-[#e5a93c]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Bottom-Right Cyan & Emerald Illumination */}
      <div className="absolute -bottom-24 right-12 w-[480px] h-[480px] bg-[#00f0ff]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Center Teal / Cyan Ambient Glow */}
      <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-[#00e5ff]/6 rounded-full blur-[130px] pointer-events-none" />

      {/* Interactive Micro Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto opacity-40"
      />

      {/* Active Service Dynamic Ambient Color Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-10 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activeColor }}
      />

      {/* Edge Vignettes into base dark tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0e] via-transparent to-[#0a0c0e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e]/80 via-transparent to-[#0a0c0e]/80 pointer-events-none" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE HIGH-TECH SCHEMATIC VISUALS (EXACT 1:1 TO SCREENSHOTS)
// ─────────────────────────────────────────────────────────────────────────────

// Card 01: Kinetic Web Development — Green Glowing Parametric Physics Arc
function WebVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-40 sm:h-44 relative rounded border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Schematic Header */}
      <div className="flex items-center justify-between border-b border-[#181b1d] pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#333a3d]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#333a3d]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#333a3d]" />
          <span className="font-mono text-[9px] text-[#6b6b6b] ml-1.5 uppercase tracking-wider">
            webgl://canvas-physics
          </span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#262c2e] text-[#8e959b] bg-[#121517]">
          [ 60FPS • 100/100 ]
        </div>
      </div>

      {/* SVG Parametric Physics Arc Graphic */}
      <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 250 80"
          fill="none"
        >
          <defs>
            <filter id="glow-green-arc" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background drafting coordinate grid lines */}
          <line x1="20" y1="20" x2="230" y2="20" stroke="#16191b" strokeWidth="0.8" />
          <line x1="20" y1="40" x2="230" y2="40" stroke="#16191b" strokeWidth="0.8" />
          <line x1="20" y1="60" x2="230" y2="60" stroke="#1c2022" strokeWidth="1" />
          <line x1="75" y1="15" x2="75" y2="65" stroke="#16191b" strokeWidth="0.8" />
          <line x1="125" y1="15" x2="125" y2="65" stroke="#1e2326" strokeWidth="0.8" />
          <line x1="175" y1="15" x2="175" y2="65" stroke="#16191b" strokeWidth="0.8" />

          {/* Lower dashed chord arc */}
          <path
            d="M 28 60 Q 125 36 222 60"
            stroke="#84cc16"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.65"
          />

          {/* Main glowing green parametric curve */}
          <path
            d="M 28 60 Q 125 14 222 60"
            stroke={color}
            strokeWidth="2.2"
            filter="url(#glow-green-arc)"
          />

          {/* Apex vertical measurement line */}
          <line
            x1="125"
            y1="14"
            x2="125"
            y2="60"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.75"
          />

          {/* Apex glowing dot with pulse ring */}
          <circle cx="125" cy="14" r="7" fill={color} opacity="0.2" className="animate-pulse" />
          <circle cx="125" cy="14" r="3.5" fill={color} />

          {/* Key geometric nodal dots */}
          <circle cx="28" cy="60" r="3" fill="#f5f5f0" />
          <circle cx="222" cy="60" r="3" fill="#f5f5f0" />
          <circle cx="76.5" cy="37" r="2.2" fill={color} />
          <circle cx="173.5" cy="37" r="2.2" fill={color} />
        </svg>
      </div>

      {/* Gauges Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#181b1d] pt-1.5 text-[#6b6b6b]">
        <span>CANVAS PHYSICS: 60FPS</span>
        <span className="text-[#f5f5f0] font-bold">100/100 VITALS</span>
      </div>
    </div>
  )
}

// Card 02: Business Automation — High-Tech Event Pipeline Flowchart
function AutomationVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-40 sm:h-44 relative rounded border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Schematic Header */}
      <div className="flex items-center justify-between border-b border-[#181b1d] pb-2">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-[#c8f542]" />
          <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-wider">
            DATA 04 #000127010
          </span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#262c2e] text-[#8e959b] bg-[#121517]">
          [ 00ms RETRY ]
        </div>
      </div>

      {/* SVG Pipeline Flowchart Graphic: [WEBHOOK] -> [ROUTER] -> [DB / CRM] */}
      <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 250 80"
          fill="none"
        >
          {/* Main bus backbone line */}
          <line
            x1="18"
            y1="40"
            x2="232"
            y2="40"
            stroke="#1c2022"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="40"
            x2="232"
            y2="40"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.6"
            className="animate-pulse"
          />

          {/* Node 1: [WEBHOOK] */}
          <rect
            x="20"
            y="25"
            width="58"
            height="30"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="49"
            y="43"
            fill="#f5f5f0"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            WEBHOOK
          </text>

          {/* Connector 1 with animated pulse */}
          <line x1="78" y1="40" x2="98" y2="40" stroke={color} strokeWidth="1.2" />
          <circle cx="88" cy="40" r="2.5" fill={color} />
          <polygon points="98,37 103,40 98,43" fill={color} />

          {/* Node 2: [ROUTER] */}
          <rect
            x="103"
            y="25"
            width="54"
            height="30"
            rx="3"
            fill="#121416"
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x="130"
            y="43"
            fill={color}
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            ROUTER
          </text>

          {/* Connector 2 with animated pulse */}
          <line x1="157" y1="40" x2="177" y2="40" stroke={color} strokeWidth="1.2" />
          <circle cx="167" cy="40" r="2.5" fill={color} />
          <polygon points="177,37 182,40 177,43" fill={color} />

          {/* Node 3: [DB / CRM] */}
          <rect
            x="182"
            y="25"
            width="58"
            height="30"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="211"
            y="43"
            fill="#f5f5f0"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            DB / CRM
          </text>
        </svg>
      </div>

      {/* Gauges Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#181b1d] pt-1.5 text-[#6b6b6b]">
        <span>DATA: 30.000 00120</span>
        <span className="text-[#f5f5f0] font-bold">00ms RETRY</span>
      </div>
    </div>
  )
}

// Card 03: Custom Software & Portals — Relational Database Architecture Diagram
function SoftwareVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-40 sm:h-44 relative rounded border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Schematic Header */}
      <div className="flex items-center justify-between border-b border-[#181b1d] pb-2">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3 text-[#38bdf8]" />
          <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-wider">
            schema //relational.core
          </span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#0284c7]/40 text-[#38bdf8] bg-[#0284c7]/10">
          9 PORTALS + SCEN
        </div>
      </div>

      {/* SVG Relational Database Diagram */}
      <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 250 80"
          fill="none"
        >
          {/* Top Row: [ext_database] -> [multi-tenant] -> checkmark */}
          {/* ext_database Node */}
          <rect
            x="20"
            y="14"
            width="62"
            height="26"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="51"
            y="27"
            fill="#f5f5f0"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
          >
            ext_database
          </text>
          <text
            x="51"
            y="35"
            fill="#6b6b6b"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
          >
            [PK] tenant_id
          </text>

          {/* Connector dashed line */}
          <line
            x1="82"
            y1="27"
            x2="114"
            y2="27"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <polygon points="113,24 117,27 113,30" fill={color} />

          {/* multi-tenant Node */}
          <rect
            x="117"
            y="14"
            width="62"
            height="26"
            rx="3"
            fill="#121416"
            stroke={color}
            strokeWidth="1.2"
          />
          <text
            x="148"
            y="27"
            fill={color}
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            multi-tenant
          </text>
          <text
            x="148"
            y="35"
            fill="#8e959b"
            fontSize="6"
            fontFamily="monospace"
            textAnchor="middle"
          >
            [FK] RBAC_role
          </text>

          {/* Verified Checkmark Badge */}
          <circle
            cx="198"
            cy="27"
            r="8"
            fill="#121416"
            stroke={color}
            strokeWidth="1.2"
          />
          <path
            d="M 194.5 27 L 197 29.5 L 201.5 24.5"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Row: Database Cylinder -> Portal */}
          {/* Database 3D Cylinder */}
          <g transform="translate(42, 48)">
            <ellipse cx="14" cy="5" rx="12" ry="4" fill="#14171a" stroke={color} strokeWidth="1.2" />
            <path d="M 2 5 V 20 A 12 4 0 0 0 26 20 V 5" fill="#14171a" stroke={color} strokeWidth="1.2" />
            <path d="M 2 12 A 12 4 0 0 0 26 12" stroke={color} strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Connector to Portal */}
          <line x1="72" y1="60" x2="114" y2="60" stroke="#333a3d" strokeWidth="1" strokeDasharray="2 2" />
          <polygon points="113,58 117,60 113,62" fill="#38bdf8" />

          {/* Portal Node */}
          <rect
            x="117"
            y="50"
            width="62"
            height="20"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="148"
            y="63"
            fill="#f5f5f0"
            fontSize="7.5"
            fontFamily="monospace"
            textAnchor="middle"
          >
            Portal Hub
          </text>
        </svg>
      </div>

      {/* Gauges Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#181b1d] pt-1.5 text-[#6b6b6b]">
        <span>PORTALS + SCEN</span>
        <span className="text-[#f5f5f0] font-bold">15ms VITALS</span>
      </div>
    </div>
  )
}

// Card 04: Enterprise AI Solutions — Glowing Purple Neural Network Lattice & RAG Pipeline
function AiVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-40 sm:h-44 relative rounded border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Schematic Header */}
      <div className="flex items-center justify-between border-b border-[#181b1d] pb-2">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3 h-3 text-[#c084fc]" />
          <span className="font-mono text-[9px] text-[#6b6b6b] uppercase tracking-wider">
            vector //isolated-rag
          </span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#9333ea]/40 text-[#c084fc] bg-[#9333ea]/10">
          [ 95%COS • 4.2UI ]
        </div>
      </div>

      {/* SVG Glowing Purple Neural Network Lattice */}
      <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 250 80"
          fill="none"
        >
          <defs>
            <filter id="glow-purple-nn" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Synaptic Grid Lines */}
          {/* Layer 1 (x: 40) to Layer 2 (x: 105) */}
          <line x1="40" y1="20" x2="105" y2="15" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="40" y1="20" x2="105" y2="32" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="40" y1="40" x2="105" y2="32" stroke={color} strokeWidth="1.2" opacity="0.8" />
          <line x1="40" y1="40" x2="105" y2="48" stroke={color} strokeWidth="1.2" opacity="0.8" />
          <line x1="40" y1="60" x2="105" y2="48" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="40" y1="60" x2="105" y2="65" stroke="#2a1a38" strokeWidth="0.8" />

          {/* Layer 2 (x: 105) to Layer 3 (x: 170) */}
          <line x1="105" y1="15" x2="170" y2="22" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="105" y1="32" x2="170" y2="22" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="105" y1="32" x2="170" y2="40" stroke={color} strokeWidth="1.4" opacity="0.9" />
          <line x1="105" y1="48" x2="170" y2="40" stroke={color} strokeWidth="1.4" opacity="0.9" />
          <line x1="105" y1="48" x2="170" y2="58" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="105" y1="65" x2="170" y2="58" stroke="#2a1a38" strokeWidth="0.8" />

          {/* Layer 3 (x: 170) to Apex Synthesis (x: 215) */}
          <line x1="170" y1="22" x2="215" y2="40" stroke="#2a1a38" strokeWidth="0.8" />
          <line x1="170" y1="40" x2="215" y2="40" stroke={color} strokeWidth="1.5" opacity="0.9" />
          <line x1="170" y1="58" x2="215" y2="40" stroke="#2a1a38" strokeWidth="0.8" />

          {/* Layer 1 Nodes (Input / Scraped Data) */}
          <circle cx="40" cy="20" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
          <circle cx="40" cy="40" r="4.5" fill={color} filter="url(#glow-purple-nn)" />
          <circle cx="40" cy="60" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

          {/* Layer 2 Nodes (Hidden / Embeddings Vector) */}
          <circle cx="105" cy="15" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
          <circle cx="105" cy="32" r="5" fill={color} filter="url(#glow-purple-nn)" />
          <circle cx="105" cy="48" r="5" fill={color} filter="url(#glow-purple-nn)" />
          <circle cx="105" cy="65" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

          {/* Layer 3 Nodes (Output / Cosine RAG) */}
          <circle cx="170" cy="22" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
          <circle cx="170" cy="40" r="5.5" fill={color} filter="url(#glow-purple-nn)" />
          <circle cx="170" cy="58" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

          {/* Apex Synthesis Node */}
          <circle cx="215" cy="40" r="6" fill="#f5f5f0" stroke={color} strokeWidth="2" />

          {/* Diagram Labels */}
          <text x="40" y="75" fill="#6b6b6b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
            SCRAPED DATA
          </text>
          <text x="135" y="75" fill={color} fontSize="6.5" fontFamily="monospace" textAnchor="middle">
            PRIVATE EMBEDDINGS_DB
          </text>
        </svg>
      </div>

      {/* Gauges Footer */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#181b1d] pt-1.5 text-[#6b6b6b]">
        <span>DATA: 38.000 00120</span>
        <span className="text-[#f5f5f0] font-bold">48ms RUNTIME</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES MASTER DATA SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceItem {
  num: string
  headerTag: string
  title: string
  desc: string
  color: string
  colorName: string
  visual: React.ComponentType<{ color: string; isActive?: boolean }>
  deliverables: string[]
  footerAction: string
  deepDiveSpecs: {
    architecture: string
    benchmark: string
    stack: string[]
    idealFor: string
  }
}

const services: ServiceItem[] = [
  {
    num: '01',
    headerTag: '#17.25 IX • OPNAI • 10',
    title: 'Kinetic Web Development',
    desc: 'Ultra-fast Next.js web experiences with custom 3D WebGL canvases, fluid animations, and sub-second load times engineered for high conversion.',
    color: '#c8f542', // Acid Green
    colorName: 'Acid Green',
    visual: WebVisual,
    footerAction: 'CLICK TO VIEW SPEC',
    deliverables: [
      'Next.js Architecture',
      'Canvas Physics',
      'Core Web Vitals',
      'Headless CMS Integration',
    ],
    deepDiveSpecs: {
      architecture:
        'Hybrid App Router with edge-rendered static chunks, client-side WebGL canvas physics, dynamic GPU acceleration, and micro-interactions.',
      benchmark: '0.34s LCP, 0.00 CLS, 100/100 Mobile & Desktop PageSpeed score.',
      stack: ['Next.js 14', 'Three.js / Canvas', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      idealFor: 'High-growth startups, luxury flagships, design agencies, and funded tech products.',
    },
  },
  {
    num: '02',
    headerTag: 'PERKLNOVK • BERRIICS • AP',
    title: 'Business Automation',
    desc: 'Eliminate repetitive manual operations by constructing event-driven pipelines, webhook bridges, CRM workflows, and automation that scales.',
    color: '#c8f542', // Acid Green Accent
    colorName: 'Acid Green',
    visual: AutomationVisual,
    footerAction: 'CLICK TO VIEW SPEC',
    deliverables: [
      'API & Webhook Pipelines',
      'Custom CRM Integrations',
      'Automated Lead Routing',
      'Asynchronous Queues',
    ],
    deepDiveSpecs: {
      architecture:
        'Resilient message brokers with automatic dead-letter queues, idempotent webhook handlers, secure credential vaults, and bi-directional synchronizations.',
      benchmark: 'Sub-50ms execution runtime, 99.999% queue delivery guarantee.',
      stack: ['Node.js Worker Runtimes', 'Redis BullMQ', 'REST/GraphQL APIs', 'Stripe/HubSpot Webhooks'],
      idealFor: 'E-commerce operations, real estate firms, SaaS client onboarding, and logistics networks.',
    },
  },
  {
    num: '03',
    headerTag: 'PORTALS • PRISMA • CLOUD',
    title: 'Custom Software & Portals',
    desc: 'Bespoke client dashboards, internal administrative portals, and scalable cloud systems built with secure relational database schemas.',
    color: '#38bdf8', // Ice Cyan
    colorName: 'Ice Cyan',
    visual: SoftwareVisual,
    footerAction: 'CLICK TO POP UP SPEC',
    deliverables: [
      'Role-Based Authentication',
      'PostgreSQL & Prisma',
      'Multi-Tenant Architecture',
      'Real-time Telemetry',
    ],
    deepDiveSpecs: {
      architecture:
        'Enterprise multi-tenant isolation, row-level security policies, PostgreSQL relational models, automated migration scripts, and real-time WebSockets.',
      benchmark: '<15ms database read queries, strict zero-trust JWT sessions.',
      stack: ['PostgreSQL', 'Prisma ORM', 'NextAuth / Jose JWT', 'Server Actions', 'Docker'],
      idealFor: 'B2B enterprise portals, client billing hubs, inventory managers, and bespoke CRMs.',
    },
  },
  {
    num: '04',
    headerTag: 'NEURAL • RAG • LLM',
    title: 'Enterprise AI Solutions',
    desc: 'Domain-grounded AI assistants, automated data extraction agents, and retrieval augmented intelligence strictly isolated on private company data.',
    color: '#c084fc', // Lilac Orchid
    colorName: 'Lilac Orchid',
    visual: AiVisual,
    footerAction: 'CLICK TO VIEW SPEC',
    deliverables: [
      'Private RAG Pipelines',
      'Automated Document Parsing',
      'Custom LLM Agents',
      'Zero Data Retention API',
    ],
    deepDiveSpecs: {
      architecture:
        'Vector database embeddings (Pinecone/pgvector), semantic chunking, guarded context injection, hallucination verification filters, and zero data storage guarantees.',
      benchmark: 'Cosine similarity recall >96%, inference response streaming <250ms.',
      stack: ['pgvector / Pinecone', 'LangChain / LlamaIndex', 'Claude / Gemini Models', 'Python FastAPIs'],
      idealFor: 'Legal document analysis, automated customer intelligence, medical records, and enterprise knowledge bases.',
    },
  },
]

export default function ServicesEditorial() {
  const [selectedServiceNum, setSelectedServiceNum] = useState<string>('01')
  const [modalService, setModalService] = useState<ServiceItem | null>(null)

  const activeService =
    services.find((s) => s.num === selectedServiceNum) || services[0]

  const handleCardClick = (service: ServiceItem) => {
    setSelectedServiceNum(service.num)
    setModalService(service)
  }

  return (
    <section
      id="services"
      className="relative w-full bg-[#0a0c0e] text-[#f5f5f0] py-24 sm:py-32 px-6 lg:px-12 border-b border-[#1c2022] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          ATMOSPHERE & BACKGROUND:
          - Left: Dark CAD/blueprint technical drafting wireframe
          - Right: 3D isometric dark tech server/laptop terminal rendering
          - Ambient cyan, emerald, and warm amber illumination
          - Clean dark background styling (#111111 / #0a0a0a / #0a0c0e)
      ───────────────────────────────────────────────────────────── */}
      <KineticCyberBackground activeColor={activeService.color} />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* ───────────────────────────────────────────────────────────
            1. SECTION HEADER:
            - Counter tag: "02 / CAPABILITIES & ARCHITECTURE" in green accent (#c8f542)
            - Right badge: "[ CLICK ANY SERVICE TO VIEW DETAILS ]" in muted text (#6b6b6b)
            - Headline: "Engineered for performance, not decoration." in high-contrast serif typography
            - Subtitle: "We build production-ready systems..."
        ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-14 pb-5 border-b border-[#1c2022]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]">
            <span className="text-[#c8f542] font-semibold">02 /</span>
            <span className="text-[#c8f542] font-semibold">
              CAPABILITIES &amp; ARCHITECTURE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#6b6b6b]">
              [ CLICK ANY SERVICE TO VIEW DETAILS ]
            </span>
          </div>
        </div>

        {/* Section Intro Headline & Subtitle */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-[-0.02em] text-[#f5f5f0] mb-5">
            Engineered for<br className="hidden sm:inline" /> performance, not<br className="hidden sm:inline" /> decoration.
          </h2>
          <p className="text-sm sm:text-base leading-[1.75] text-[#737882] font-sans">
            We build production-ready systems that eliminate bottlenecks and scale business revenue. Select any service below to inspect its technical architecture and telemetry.
          </p>
        </div>

        {/* ───────────────────────────────────────────────────────────
            2. THE 4 CARDS IN 2-COLUMN LAYOUT:
            - Card 01: Kinetic Web Development
            - Card 02: Business Automation
            - Card 03: Custom Software & Portals
            - Card 04: Enterprise AI Solutions
        ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {services.map((service) => {
            const isSelected = selectedServiceNum === service.num
            const VisualComponent = service.visual

            return (
              <motion.div
                key={service.num}
                whileHover={{ y: -3 }}
                onClick={() => handleCardClick(service)}
                className={`relative cursor-pointer transition-all duration-300 text-left flex flex-col justify-between rounded-xl p-6 sm:p-7 overflow-hidden group ${
                  isSelected
                    ? 'bg-[#0d0f11] border border-[#c8f542]/60 shadow-[0_0_35px_rgba(200,245,66,0.1)]'
                    : 'bg-[#0d0f11]/90 hover:bg-[#0f1214] border border-[#1c2022] hover:border-[#384144] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div>
                  {/* Card Header Row: Left identifier badge + Right [0X] index */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-[#22272a] bg-[#14171a] text-[#888888] group-hover:text-[#a0a5aa] transition-colors">
                      {service.headerTag}
                    </span>

                    <span
                      className="font-mono text-xs font-semibold transition-colors"
                      style={{
                        color: isSelected ? service.color : '#6b6b6b',
                      }}
                    >
                      [{service.num}]
                    </span>
                  </div>

                  {/* High-Tech Visual Schematic Box */}
                  <div className="my-2">
                    <VisualComponent
                      color={service.color}
                      isActive={isSelected}
                    />
                  </div>

                  {/* Service Title in High-Contrast Serif */}
                  <h3 className="font-editorial text-2xl sm:text-[26px] font-normal leading-tight text-[#f5f5f0] group-hover:text-white transition-colors tracking-tight mt-6 mb-3">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm sm:text-[14.5px] leading-[1.7] text-[#888c94] group-hover:text-[#9ea3ab] mb-6 font-normal">
                    {service.desc}
                  </p>

                  {/* Deliverables Section with "+" prefix bullets in 2-column grid */}
                  <div className="pt-4 border-t border-[#1c2022]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#52565c] mb-3">
                      // DELIVERABLE CAPABILITIES
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs text-[#cccccc]">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 truncate">
                          <span className="text-[#888888] font-bold">+</span>
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Trigger + Status Indicator */}
                <div className="pt-4 mt-6 border-t border-[#1c2022] flex items-center justify-between font-mono text-[10px] text-[#6b6b6b] group-hover:text-[#8e959b] transition-colors">
                  <span className="tracking-wider flex items-center gap-1">
                    <span>{service.footerAction}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span
                    className="font-semibold tracking-wider transition-colors"
                    style={{ color: isSelected ? service.color : '#6b6b6b' }}
                  >
                    SPEC_READY
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN ARCHITECTURAL INSPECTOR MODAL
          Allows inspecting complete technical architecture, benchmarks,
          deep-dive telemetry, stack, and direct implementation CTA
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060708]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#0c0e10] border border-[#22272a] rounded-xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-left shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              style={{
                borderColor: `${modalService.color}60`,
                boxShadow: `0 0 50px ${modalService.color}15`,
              }}
            >
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="absolute top-6 right-6 p-2 rounded border border-[#1e2224] text-[#6b6b6b] hover:text-white hover:border-white transition-colors bg-[#121517]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-xs uppercase px-2.5 py-1 rounded border font-bold"
                  style={{
                    borderColor: `${modalService.color}60`,
                    color: modalService.color,
                    backgroundColor: `${modalService.color}15`,
                  }}
                >
                  [{modalService.num}] {modalService.colorName} Architecture
                </span>
                <span className="font-mono text-xs text-[#6b6b6b]">
                  ENTERPRISE GRADE SPEC
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-white mb-4">
                {modalService.title}
              </h3>
              <p className="text-base sm:text-lg text-[#9ea3ab] mb-8 leading-relaxed font-sans">
                {modalService.desc}
              </p>

              <div className="mb-8">
                {React.createElement(modalService.visual, {
                  color: modalService.color,
                  isActive: true,
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-[#111417] border border-[#1c2022]">
                  <div className="font-mono text-[10px] text-[#6b6b6b] uppercase mb-1">
                    PERFORMANCE &amp; BENCHMARK
                  </div>
                  <div className="font-mono text-xs font-bold text-white">
                    {modalService.deepDiveSpecs.benchmark}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#111417] border border-[#1c2022]">
                  <div className="font-mono text-[10px] text-[#6b6b6b] uppercase mb-1">
                    TARGET ENTERPRISE FIT
                  </div>
                  <div className="font-mono text-xs font-bold text-white">
                    {modalService.deepDiveSpecs.idealFor}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="font-mono text-xs uppercase tracking-wider text-[#6b6b6b] mb-4">
                  INCLUDED DELIVERABLES &amp; CAPABILITIES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modalService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#121518] border border-[#1e2326] flex items-center gap-2.5 font-mono text-xs text-white"
                    >
                      <Check
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: modalService.color }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 pt-6 border-t border-[#1c2022]">
                <div className="font-mono text-xs uppercase tracking-wider text-[#6b6b6b] mb-3">
                  TECHNOLOGY STACK:
                </div>
                <div className="flex flex-wrap gap-2">
                  {modalService.deepDiveSpecs.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-3 py-1.5 rounded border border-[#22272a] bg-[#111417] text-[#f5f5f0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1c2022] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="#contact"
                  onClick={() => setModalService(null)}
                  className="font-mono text-xs uppercase tracking-widest px-6 py-4 rounded text-[#080808] font-bold transition-transform hover:scale-[1.02] flex items-center gap-2"
                  style={{ backgroundColor: modalService.color }}
                >
                  <span>Build This Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setModalService(null)}
                  className="font-mono text-xs uppercase tracking-widest px-6 py-4 rounded border border-[#262c2e] text-[#888888] hover:text-white transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

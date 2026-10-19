'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  Zap,
  Database,
  Bot,
  ArrowUpRight,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// KINETIC CYBER BACKGROUND CANVAS
// Precise CAD drafting blueprint on left, 3D dark tech terminal on right,
// coordinate drafting grid lines, interactive particle lattice, and ambient glows
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
    const particleCount = isMobile ? 16 : 32
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
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.25 + 0.12,
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
          if (dist2 < 90) {
            const alpha = (1 - dist2 / 90) * 0.07
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
        radGrad.addColorStop(0, 'rgba(200, 245, 66, 0.03)')
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
        className="absolute left-0 top-0 bottom-0 w-[380px] sm:w-[460px] lg:w-[540px] pointer-events-none select-none z-0 opacity-45 mix-blend-screen bg-no-repeat bg-left-top bg-cover"
        style={{ backgroundImage: "url('/images/services-cad-wireframe.png')" }}
      />

      {/* 3D Isometric Dark Tech Server/Laptop Terminal Rendering on Right Background */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[420px] sm:w-[500px] lg:w-[580px] pointer-events-none select-none z-0 opacity-60 bg-no-repeat bg-right-top bg-cover"
        style={{ backgroundImage: "url('/images/services-tech-terminal.png')" }}
      />

      {/* Top-Right Warm Amber / Golden Atmospheric Illumination */}
      <div className="absolute -top-20 -right-20 w-[560px] h-[560px] bg-[#e5a93c]/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Bottom-Right Cyan & Emerald Illumination */}
      <div className="absolute -bottom-24 right-10 w-[500px] h-[500px] bg-[#00f0ff]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Center Teal / Cyan Ambient Glow */}
      <div className="absolute top-1/3 -left-20 w-[440px] h-[440px] bg-[#00e5ff]/6 rounded-full blur-[130px] pointer-events-none" />

      {/* Interactive Micro Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto opacity-35"
      />

      {/* Active Service Dynamic Ambient Color Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-10 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activeColor }}
      />

      {/* Edge Vignettes into base dark tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0e] via-transparent to-[#0a0c0e] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e]/70 via-transparent to-[#0a0c0e]/70 pointer-events-none" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE HIGH-TECH SCHEMATIC VISUALS (EXACT 1:1 TO SCREENSHOTS)
// ─────────────────────────────────────────────────────────────────────────────

// CARD 01: Kinetic Web Development — Green Glowing Parametric Physics Arc
function WebVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-44 sm:h-48 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Top Header Row inside schematic box */}
      <div className="flex items-center justify-between border-b border-[#15181a] pb-2">
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
          <span className="text-[#888888]">:::</span>
          <span>/PASS</span>
          <span className="text-[#555860]">0012010450</span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#c8f542]/40 text-[#c8f542] bg-[#c8f542]/10 font-bold">
          CF 100.00
        </div>
      </div>

      {/* SVG Parametric Physics Arc Graphic */}
      <div className="relative flex-1 flex items-center justify-center my-1 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 260 85"
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

          {/* Coordinate drafting grid lines */}
          <line x1="20" y1="20" x2="240" y2="20" stroke="#141719" strokeWidth="0.8" />
          <line x1="20" y1="42" x2="240" y2="42" stroke="#141719" strokeWidth="0.8" />
          <line x1="20" y1="64" x2="240" y2="64" stroke="#1a1e20" strokeWidth="1" />
          <line x1="75" y1="15" x2="75" y2="70" stroke="#141719" strokeWidth="0.8" />
          <line x1="130" y1="15" x2="130" y2="70" stroke="#1e2225" strokeWidth="0.8" />
          <line x1="185" y1="15" x2="185" y2="70" stroke="#141719" strokeWidth="0.8" />

          {/* Horizontal baseline between endpoints */}
          <line
            x1="28"
            y1="64"
            x2="232"
            y2="64"
            stroke="#262c2e"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Lower dashed chord arc */}
          <path
            d="M 28 64 Q 130 40 232 64"
            stroke="#84cc16"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.65"
          />

          {/* Main glowing green parametric curve */}
          <path
            d="M 28 64 Q 130 16 232 64"
            stroke={color}
            strokeWidth="2.2"
            filter="url(#glow-green-arc)"
          />

          {/* Vertical measurement drop line from apex to baseline */}
          <line
            x1="130"
            y1="16"
            x2="130"
            y2="64"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.75"
          />

          {/* Apex glowing dot with pulse ring */}
          <circle cx="130" cy="16" r="7" fill={color} opacity="0.2" className="animate-pulse" />
          <circle cx="130" cy="16" r="3.5" fill={color} />

          {/* Key geometric nodal dots */}
          <circle cx="28" cy="64" r="3" fill="#f5f5f0" />
          <circle cx="232" cy="64" r="3" fill="#f5f5f0" />
          <circle cx="79" cy="40" r="2.2" fill={color} />
          <circle cx="181" cy="40" r="2.2" fill={color} />
        </svg>
      </div>

      {/* Gauges Footer inside schematic box */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
        <span>CANVAS PHYSICS: 60FPS</span>
        <span className="text-[#f5f5f0] font-bold">100/100 VITALS</span>
      </div>
    </div>
  )
}

// CARD 02: Business Automation — High-Tech Event Pipeline Flowchart
function AutomationVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full h-44 sm:h-48 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
      {/* Top Header Row inside schematic box */}
      <div className="flex items-center justify-between border-b border-[#15181a] pb-2">
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
          <Zap className="w-3 h-3 text-[#c8f542]" />
          <span>ROUTE ok</span>
          <span className="text-[#555860]">*30052761c</span>
        </div>
        <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#262c2e] text-[#8e959b] bg-[#121517]">
          01 0700:00100:00
        </div>
      </div>

      {/* SVG Pipeline Flowchart Graphic: [WEBHOOK] -> [ROUTER] -> [DB / CRM] */}
      <div className="relative flex-1 flex items-center justify-center my-1 overflow-hidden">
        <svg
          className="w-full h-full max-h-24"
          viewBox="0 0 260 85"
          fill="none"
        >
          {/* Main bus backbone line */}
          <line
            x1="18"
            y1="42"
            x2="242"
            y2="42"
            stroke="#1c2022"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="42"
            x2="242"
            y2="42"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.6"
            className="animate-pulse"
          />

          {/* Node 1: [WEBHOOK] */}
          <rect
            x="18"
            y="26"
            width="62"
            height="32"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="49"
            y="45"
            fill="#f5f5f0"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            WEBHOOK
          </text>

          {/* Connector 1 with animated pulse packet */}
          <line x1="80" y1="42" x2="101" y2="42" stroke={color} strokeWidth="1.2" />
          <circle cx="90.5" cy="42" r="2.5" fill={color} />
          <polygon points="101,39 106,42 101,45" fill={color} />

          {/* Node 2: [ROUTER] (Highlighted Neon Lime Green) */}
          <rect
            x="106"
            y="26"
            width="58"
            height="32"
            rx="3"
            fill="#121416"
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x="135"
            y="45"
            fill={color}
            fontSize="8.5"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            ROUTER
          </text>

          {/* Connector 2 with animated pulse packet */}
          <line x1="164" y1="42" x2="185" y2="42" stroke={color} strokeWidth="1.2" />
          <circle cx="174.5" cy="42" r="2.5" fill={color} />
          <polygon points="185,39 190,42 185,45" fill={color} />

          {/* Node 3: [DB / CRM] */}
          <rect
            x="190"
            y="26"
            width="62"
            height="32"
            rx="3"
            fill="#121416"
            stroke="#262c2e"
            strokeWidth="1.2"
          />
          <text
            x="221"
            y="45"
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

      {/* Gauges Footer inside schematic box */}
      <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
        <span>DATA: 30.000 00120</span>
        <span className="text-[#f5f5f0] font-bold">00ms RETRY</span>
      </div>
    </div>
  )
}

// CARD 03: Custom Software & Portals — DUAL SCHEMATICS (1:1 to Reference Screenshot 2)
// Box 1: Relational Schema Diagram [ext_database] -> [multi-tenant] -> (✓)
// Sub-Header: #:27.25 IX • DB01 • 20 [01]
// Box 2: Database 3D Cylinder to Portal Architecture Diagram
function SoftwareVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* ─── SCHEMATIC PANEL 1: Relational Schema Diagram ─── */}
      <div className="w-full h-36 sm:h-40 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-[#15181a] pb-1.5">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
            <Database className="w-3 h-3 text-[#38bdf8]" />
            <span>server /relations.core</span>
          </div>
          <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#0284c7]/40 text-[#38bdf8] bg-[#0284c7]/10 font-bold">
            9 PORTALS + SCEN
          </div>
        </div>

        {/* SVG Graphic 1: [ext_database] -> [multi-tenant] -> (✓) */}
        <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
          <svg
            className="w-full h-full max-h-20"
            viewBox="0 0 260 70"
            fill="none"
          >
            {/* ext_database Node */}
            <rect
              x="16"
              y="16"
              width="68"
              height="30"
              rx="3"
              fill="#121416"
              stroke="#262c2e"
              strokeWidth="1.2"
            />
            <text
              x="50"
              y="30"
              fill="#f5f5f0"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              ext_database
            </text>
            <text
              x="50"
              y="40"
              fill="#6b6b6b"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              [PK] tenant_id
            </text>

            {/* Dashed connector line with arrow */}
            <line
              x1="84"
              y1="31"
              x2="114"
              y2="31"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <polygon points="113,28 117,31 113,34" fill={color} />

            {/* multi-tenant Node (Cyan highlighted) */}
            <rect
              x="117"
              y="16"
              width="70"
              height="30"
              rx="3"
              fill="#121416"
              stroke={color}
              strokeWidth="1.4"
            />
            <text
              x="152"
              y="30"
              fill={color}
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="bold"
            >
              multi-tenant
            </text>
            <text
              x="152"
              y="40"
              fill="#8e959b"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              [FK] RBAC_role
            </text>

            {/* Connector to Verified Checkmark Badge */}
            <line
              x1="187"
              y1="31"
              x2="204"
              y2="31"
              stroke="#333a3d"
              strokeWidth="1"
            />

            {/* Checkmark Badge */}
            <circle
              cx="214"
              cy="31"
              r="8"
              fill="#121416"
              stroke={color}
              strokeWidth="1.2"
            />
            <path
              d="M 210.5 31 L 213 33.5 L 217.5 28.5"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Panel 1 Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
          <span>SCHEMAS: NONCRITIC</span>
          <span className="text-[#38bdf8] font-bold">c1000: RELIABLE</span>
        </div>
      </div>

      {/* ─── SUB-HEADER: #:27.25 IX • DB01 • 20  [01] ─── */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
          #:27.25 IX • DB01 • 20
        </span>
        <span className="font-mono text-xs text-[#6b6b6b]">
          [01]
        </span>
      </div>

      {/* ─── SCHEMATIC PANEL 2: Database 3D Cylinder to Portal Architecture ─── */}
      <div className="w-full h-36 sm:h-40 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-[#15181a] pb-1.5">
          <div className="font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
            db://cluster-mesh
          </div>
          <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#0284c7]/40 text-[#38bdf8] bg-[#0284c7]/10 font-bold">
            15ms VITALS
          </div>
        </div>

        {/* SVG Graphic 2: [ext_database] -> 3D Cylinder Database -> [Portal] */}
        <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
          <svg
            className="w-full h-full max-h-20"
            viewBox="0 0 260 70"
            fill="none"
          >
            {/* ext_database Node */}
            <rect
              x="16"
              y="18"
              width="64"
              height="28"
              rx="3"
              fill="#121416"
              stroke="#262c2e"
              strokeWidth="1.2"
            />
            <text
              x="48"
              y="32"
              fill="#f5f5f0"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              ext_database
            </text>
            <text
              x="48"
              y="40"
              fill="#6b6b6b"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              [PK] id
            </text>

            {/* Connector to Database */}
            <line
              x1="80"
              y1="32"
              x2="110"
              y2="32"
              stroke={color}
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <polygon points="109,29 113,32 109,35" fill={color} />

            {/* 3D Database Cylinder in center */}
            <g transform="translate(118, 12)">
              {/* Cylinder top ellipse */}
              <ellipse
                cx="15"
                cy="7"
                rx="14"
                ry="5"
                fill="#161a1e"
                stroke={color}
                strokeWidth="1.3"
              />
              {/* Cylinder body */}
              <path
                d="M 1 7 V 26 A 14 5 0 0 0 29 26 V 7"
                fill="#121518"
                stroke={color}
                strokeWidth="1.3"
              />
              {/* Intermediate segment rings */}
              <path
                d="M 1 13 A 14 5 0 0 0 29 13"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.7"
              />
              <path
                d="M 1 19 A 14 5 0 0 0 29 19"
                stroke={color}
                strokeWidth="0.9"
                opacity="0.7"
              />
            </g>

            {/* Connector to Portal */}
            <line
              x1="150"
              y1="32"
              x2="180"
              y2="32"
              stroke="#333a3d"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <polygon points="179,29 183,32 179,35" fill="#38bdf8" />

            {/* Portal Hub Node */}
            <rect
              x="183"
              y="18"
              width="62"
              height="28"
              rx="3"
              fill="#121416"
              stroke="#262c2e"
              strokeWidth="1.2"
            />
            <text
              x="214"
              y="32"
              fill="#f5f5f0"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
            >
              Portal
            </text>
            <text
              x="214"
              y="40"
              fill="#8e959b"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              Client UI
            </text>
          </svg>
        </div>

        {/* Panel 2 Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
          <span>SCHEMAS: NOMICAL: UCRWS</span>
          <span className="text-[#f5f5f0] font-bold">15ms VITALS</span>
        </div>
      </div>
    </div>
  )
}

// CARD 04: Enterprise AI Solutions — DUAL SCHEMATICS (1:1 to Reference Screenshot 2 & 3)
// Box 1: Private RAG Pipeline with Vector Embeddings Diagram
// Sub-Header: PERKLNOVK • DARKEDGE • ZP  [03]
// Box 2: Glowing Purple Multi-Layer Neural Network Lattice
function AiVisual({ color }: { color: string; isActive?: boolean }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* ─── SCHEMATIC PANEL 1: Private RAG & Vector Embeddings Pipeline ─── */}
      <div className="w-full h-36 sm:h-40 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-[#15181a] pb-1.5">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
            <Bot className="w-3 h-3 text-[#c084fc]" />
            <span>vector /textEmbed-vlm</span>
          </div>
          <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#9333ea]/40 text-[#c084fc] bg-[#9333ea]/10 font-bold">
            95504L - 4.2UI
          </div>
        </div>

        {/* SVG Graphic 1: Vector Embeddings Cluster & RAG Pipeline */}
        <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
          <svg
            className="w-full h-full max-h-20"
            viewBox="0 0 260 70"
            fill="none"
          >
            {/* Background Cluster Box */}
            <rect
              x="70"
              y="10"
              width="120"
              height="45"
              rx="4"
              fill="#100b17"
              stroke="#2c1a3b"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />

            {/* Vector links inside cluster */}
            <line x1="88" y1="32" x2="118" y2="20" stroke="#5b21b6" strokeWidth="0.8" />
            <line x1="88" y1="32" x2="125" y2="42" stroke="#5b21b6" strokeWidth="0.8" />
            <line x1="118" y1="20" x2="152" y2="26" stroke={color} strokeWidth="1.2" />
            <line x1="125" y1="42" x2="152" y2="26" stroke={color} strokeWidth="1.2" />
            <line x1="152" y1="26" x2="175" y2="35" stroke="#5b21b6" strokeWidth="0.8" />

            {/* Cluster Nodes */}
            <circle cx="88" cy="32" r="3.5" fill="#1b1226" stroke={color} strokeWidth="1" />
            <circle cx="118" cy="20" r="3" fill="#3b1d5c" />
            <circle cx="125" cy="42" r="3" fill="#3b1d5c" />
            <circle cx="152" cy="26" r="4.5" fill={color} className="animate-pulse" />
            <circle cx="175" cy="35" r="3" fill="#1b1226" stroke="#5b21b6" strokeWidth="1" />

            {/* Left Tag: PRIVATE EMBEDDINGS_DB */}
            <text
              x="42"
              y="35"
              fill="#888888"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              EMBED_DB
            </text>

            {/* Right Tag: SCRAPED DATA */}
            <text
              x="222"
              y="35"
              fill="#888888"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
            >
              PARSED_DATA
            </text>
          </svg>
        </div>

        {/* Panel 1 Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
          <span className="text-[#c084fc]">PRIVATE EMBEDDINGS_DB</span>
          <span className="text-[#8e959b]">SCRAPED DATA</span>
        </div>
      </div>

      {/* ─── SUB-HEADER: PERKLNOVK • DARKEDGE • ZP  [03] ─── */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
          PERKLNOVK • DARKEDGE • ZP
        </span>
        <span className="font-mono text-xs text-[#6b6b6b]">
          [03]
        </span>
      </div>

      {/* ─── SCHEMATIC PANEL 2: Glowing Purple Neural Network Lattice ─── */}
      <div className="w-full h-36 sm:h-40 relative rounded-lg border border-[#1e2224] bg-[#08090a] overflow-hidden p-3 flex flex-col justify-between group-hover:border-[#333a3d] transition-colors">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-[#15181a] pb-1.5">
          <div className="font-mono text-[9px] text-[#6b6b6b] tracking-wider uppercase">
            nn://graph-lattice
          </div>
          <div className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#262c2e] text-[#8e959b] bg-[#121517]">
            01 0700: REPOD:00
          </div>
        </div>

        {/* SVG Graphic 2: Multi-Layer Neural Network Graph */}
        <div className="relative flex-1 flex items-center justify-center my-0.5 overflow-hidden">
          <svg
            className="w-full h-full max-h-20"
            viewBox="0 0 260 75"
            fill="none"
          >
            <defs>
              <filter id="glow-purple-nn-card" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Synaptic interconnect lines */}
            {/* L1 (x=38) to L2 (x=98) */}
            <line x1="38" y1="20" x2="98" y2="14" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="38" y1="20" x2="98" y2="30" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="38" y1="38" x2="98" y2="30" stroke={color} strokeWidth="1.2" opacity="0.85" />
            <line x1="38" y1="38" x2="98" y2="46" stroke={color} strokeWidth="1.2" opacity="0.85" />
            <line x1="38" y1="56" x2="98" y2="46" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="38" y1="56" x2="98" y2="62" stroke="#2a1a38" strokeWidth="0.8" />

            {/* L2 (x=98) to L3 (x=160) */}
            <line x1="98" y1="14" x2="160" y2="22" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="98" y1="30" x2="160" y2="22" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="98" y1="30" x2="160" y2="38" stroke={color} strokeWidth="1.4" opacity="0.9" />
            <line x1="98" y1="46" x2="160" y2="38" stroke={color} strokeWidth="1.4" opacity="0.9" />
            <line x1="98" y1="46" x2="160" y2="54" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="98" y1="62" x2="160" y2="54" stroke="#2a1a38" strokeWidth="0.8" />

            {/* L3 (x=160) to L4 (x=218) */}
            <line x1="160" y1="22" x2="218" y2="38" stroke="#2a1a38" strokeWidth="0.8" />
            <line x1="160" y1="38" x2="218" y2="38" stroke={color} strokeWidth="1.6" opacity="0.95" />
            <line x1="160" y1="54" x2="218" y2="38" stroke="#2a1a38" strokeWidth="0.8" />

            {/* Layer 1 Nodes (Input) */}
            <circle cx="38" cy="20" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
            <circle cx="38" cy="38" r="4.5" fill={color} filter="url(#glow-purple-nn-card)" />
            <circle cx="38" cy="56" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

            {/* Layer 2 Nodes (Hidden Dense) */}
            <circle cx="98" cy="14" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
            <circle cx="98" cy="30" r="5" fill={color} filter="url(#glow-purple-nn-card)" />
            <circle cx="98" cy="46" r="5" fill={color} filter="url(#glow-purple-nn-card)" />
            <circle cx="98" cy="62" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

            {/* Layer 3 Nodes (Latent) */}
            <circle cx="160" cy="22" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />
            <circle cx="160" cy="38" r="5.5" fill={color} filter="url(#glow-purple-nn-card)" />
            <circle cx="160" cy="54" r="3.5" fill="#181220" stroke="#4a3060" strokeWidth="1.2" />

            {/* Layer 4 Node (Output Synthesis) */}
            <circle cx="218" cy="38" r="6" fill="#f5f5f0" stroke={color} strokeWidth="2.2" />
          </svg>
        </div>

        {/* Panel 2 Footer */}
        <div className="flex items-center justify-between text-[10px] font-mono border-t border-[#15181a] pt-1.5 text-[#6b6b6b]">
          <span>DATA: 30.000 00120</span>
          <span className="text-[#f5f5f0] font-bold">48ms RUNTIME</span>
        </div>
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
            (Notice: NO horizontal border divider separating the counter row and headline)
        ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
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
            - Card 03: Custom Software & Portals (Dual Schematics)
            - Card 04: Enterprise AI Solutions (Dual Schematics)
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
                  {/* Card Header Row: Left identifier text (NO pill box) + Right [0X] index */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#888888] group-hover:text-[#a0a5aa] transition-colors">
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

                {/* Card Footer: Action Trigger + Status Indicator (Clean Monospace, NO arrow icon) */}
                <div className="pt-4 mt-6 border-t border-[#1c2022] flex items-center justify-between font-mono text-[10px] text-[#6b6b6b] group-hover:text-[#8e959b] transition-colors">
                  <span className="tracking-wider">
                    {service.footerAction}
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

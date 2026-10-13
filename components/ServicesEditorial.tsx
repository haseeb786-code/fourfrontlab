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
  Play,
  RotateCw,
  Sliders,
  Shield,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// CRAZY KINETIC CYBER BACKGROUND CANVAS
// Interactive particle constellation, cyber grid wave, and reactive light rays
// ─────────────────────────────────────────────────────────────────────────────

function KineticCyberBackground({ activeColor }: { activeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Mouse coordinates for interactive repulsion
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
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Particles system
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 22 : 45
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
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 1,
        baseAlpha: Math.random() * 0.4 + 0.2,
      })
    }

    let waveOffset = 0

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      waveOffset += 0.015

      // 1. Draw Subtle Cyber Grid Lines
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)'
      const gridSize = 64
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

      // 2. Draw Kinetic Sinusoidal Cyber Wave along bottom
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      for (let x = 0; x < width; x += 6) {
        const y =
          height -
          80 +
          Math.sin(x * 0.008 + waveOffset) * 25 +
          Math.cos(x * 0.004 + waveOffset * 0.8) * 15
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // 3. Update & Draw Interactive Particle Constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around bounds
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Mouse repulsion
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x -= (dx / dist) * force * 2
          p.y -= (dy / dist) * force * 2
        }

        // Draw particle node
        ctx.fillStyle = `rgba(245, 245, 240, ${p.baseAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Connect adjacent nodes with laser lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist2 < 110) {
            const alpha = (1 - dist2 / 110) * 0.12
            ctx.strokeStyle = `rgba(245, 245, 240, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // 4. Mouse Interactive Spotlight Glow
      if (mouse.x > 0 && mouse.y > 0) {
        const radGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        )
        radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)')
        radGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = radGrad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 260, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Live Cyber Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-auto opacity-75"
      />

      {/* Sweeping Laser Radar Beam */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent h-40 animate-[radar_9s_ease-in-out_infinite] pointer-events-none" />

      {/* Dynamic Ambient Color Orb tied to selected service */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] opacity-15 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: activeColor }}
      />

      {/* Editorial Vignettes to merge with #111111 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-[#111111] pointer-events-none" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE HIGH-TECH SCHEMATIC VISUALS WITH LIVE SIMULATION TOGGLES
// ─────────────────────────────────────────────────────────────────────────────

function WebVisual({ color, isActive }: { color: string; isActive: boolean }) {
  const [wireframeAngle, setWireframeAngle] = useState(0)

  const spinWireframe = (e: React.MouseEvent) => {
    e.stopPropagation()
    setWireframeAngle((prev) => prev + 45)
  }

  return (
    <div className="w-full h-36 relative rounded border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333333] transition-colors">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#1f1f1f]" />
          <div className="w-2 h-2 rounded-full bg-[#1f1f1f]" />
          <div className="w-2 h-2 rounded-full bg-[#1f1f1f]" />
          <span className="font-mono text-[9px] text-[#6b6b6b] ml-1.5">
            webgl://runtime-renderer
          </span>
        </div>
        <button
          type="button"
          onClick={spinWireframe}
          className="flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border transition-colors hover:scale-105"
          style={{
            borderColor: `${color}50`,
            color: color,
            backgroundColor: `${color}10`,
          }}
        >
          <RotateCw className="w-2.5 h-2.5" />
          <span>ROT 3D</span>
        </button>
      </div>

      {/* 3D Wireframe Canvas Graphic */}
      <div className="relative flex-1 flex items-center justify-center my-1">
        <svg
          className="w-full h-full max-h-20 transition-transform duration-500"
          style={{ transform: `rotate(${wireframeAngle}deg)` }}
          viewBox="0 0 240 70"
          fill="none"
        >
          <path
            d="M20 50 L120 15 L220 50 L120 68 Z"
            stroke="#262626"
            strokeWidth="1"
          />
          <path d="M50 42 L120 22 L190 42" stroke="#333333" strokeWidth="1" />
          <line
            x1="120"
            y1="15"
            x2="120"
            y2="68"
            stroke={color}
            strokeWidth={isActive ? '2' : '1.5'}
            strokeDasharray="3 3"
            className="animate-pulse"
          />
          <circle cx="120" cy="15" r="3" fill={color} />
          <circle cx="20" cy="50" r="2.5" fill="#f5f5f0" />
          <circle cx="220" cy="50" r="2.5" fill="#f5f5f0" />
          <circle cx="120" cy="68" r="2.5" fill={color} />
          <path
            d="M70 28 Q 120 5 170 28"
            stroke={color}
            strokeWidth="1.5"
            opacity={isActive ? 1 : 0.75}
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6b6b]">
        <span>CANVAS_PHYSICS: 60FPS</span>
        <span className="text-[#f5f5f0] font-bold">100/100 VITALS</span>
      </div>
    </div>
  )
}

function AutomationVisual({
  color,
  isActive,
}: {
  color: string
  isActive: boolean
}) {
  const [pulseKey, setPulseKey] = useState(0)

  const triggerWebhookPulse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPulseKey((prev) => prev + 1)
  }

  return (
    <div className="w-full h-36 relative rounded border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333333] transition-colors">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#6b6b6b]" />
          <span className="font-mono text-[9px] text-[#6b6b6b]">
            pipeline://event-bus
          </span>
        </div>
        <button
          type="button"
          onClick={triggerWebhookPulse}
          className="flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border transition-colors hover:scale-105"
          style={{
            borderColor: `${color}50`,
            color: color,
            backgroundColor: `${color}10`,
          }}
        >
          <Play className="w-2.5 h-2.5" />
          <span>FIRE WEBHOOK</span>
        </button>
      </div>

      {/* Event Pipeline Bus Schematic */}
      <div className="relative flex-1 flex items-center justify-center my-1">
        <svg
          key={pulseKey}
          className="w-full h-full max-h-20"
          viewBox="0 0 240 70"
          fill="none"
        >
          <line
            x1="20"
            y1="35"
            x2="220"
            y2="35"
            stroke="#262626"
            strokeWidth="2"
          />
          <line
            x1="20"
            y1="35"
            x2="220"
            y2="35"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          <rect
            x="25"
            y="20"
            width="45"
            height="30"
            rx="3"
            fill="#141414"
            stroke="#2a2a2a"
          />
          <text
            x="47"
            y="38"
            fill="#f5f5f0"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
          >
            WEBHOOK
          </text>

          <rect
            x="98"
            y="20"
            width="44"
            height="30"
            rx="3"
            fill="#141414"
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x="120"
            y="38"
            fill={color}
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            ROUTER
          </text>

          <rect
            x="170"
            y="20"
            width="45"
            height="30"
            rx="3"
            fill="#141414"
            stroke="#2a2a2a"
          />
          <text
            x="192"
            y="38"
            fill="#f5f5f0"
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
          >
            ERP/CRM
          </text>

          <circle cx="85" cy="35" r="2.5" fill={color} />
          <circle cx="157" cy="35" r="2.5" fill={color} />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6b6b]">
        <span>QUEUE: 10,000 OPS/S</span>
        <span className="text-[#f5f5f0] font-bold">42ms RUNTIME</span>
      </div>
    </div>
  )
}

function SoftwareVisual({
  color,
  isActive,
}: {
  color: string
  isActive: boolean
}) {
  return (
    <div className="w-full h-36 relative rounded border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333333] transition-colors">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2">
        <div className="flex items-center gap-1.5">
          <Database className="w-3 h-3 text-[#6b6b6b]" />
          <span className="font-mono text-[9px] text-[#6b6b6b]">
            schema://relational-core
          </span>
        </div>
        <div
          className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border"
          style={{
            borderColor: `${color}40`,
            color: color,
            backgroundColor: `${color}10`,
          }}
        >
          POSTGRESQL • RBAC
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-1">
        <svg className="w-full h-full max-h-20" viewBox="0 0 240 70" fill="none">
          <rect
            x="15"
            y="16"
            width="60"
            height="38"
            rx="2"
            fill="#141414"
            stroke="#2a2a2a"
          />
          <rect x="15" y="16" width="60" height="12" fill="#1a1a1a" />
          <text
            x="45"
            y="25"
            fill="#a0a0a0"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
          >
            tbl_tenants
          </text>
          <text x="22" y="38" fill={color} fontSize="7" fontFamily="monospace">
            [PK] id
          </text>
          <text x="22" y="48" fill="#666" fontSize="6" fontFamily="monospace">
            auth_token
          </text>

          <path
            d="M75 35 H 100 V 35 H 125"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray={isActive ? 'none' : '3 3'}
          />

          <rect
            x="125"
            y="16"
            width="60"
            height="38"
            rx="2"
            fill="#141414"
            stroke={color}
            strokeWidth="1.2"
          />
          <rect x="125" y="16" width="60" height="12" fill="#1a1a1a" />
          <text
            x="155"
            y="25"
            fill={color}
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
          >
            tbl_security
          </text>
          <text
            x="132"
            y="38"
            fill="#f5f5f0"
            fontSize="7"
            fontFamily="monospace"
          >
            [FK] tenant_id
          </text>
          <text x="132" y="48" fill="#666" fontSize="6" fontFamily="monospace">
            roles: [&apos;ADMIN&apos;]
          </text>

          <circle
            cx="215"
            cy="35"
            r="10"
            fill="#141414"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M211 35 L214 38 L219 32"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6b6b]">
        <span>AES-256 ENCRYPTED</span>
        <span className="text-[#f5f5f0] font-bold">&lt;15ms QUERIES</span>
      </div>
    </div>
  )
}

function AiVisual({ color, isActive }: { color: string; isActive: boolean }) {
  const [similarityScore, setSimilarityScore] = useState(0.984)

  const regenerateEmbedding = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSimilarityScore(
      Number((0.95 + Math.random() * 0.048).toFixed(3))
    )
  }

  return (
    <div className="w-full h-36 relative rounded border border-[#1f1f1f] bg-[#0c0c0c] overflow-hidden p-3.5 flex flex-col justify-between group-hover:border-[#333333] transition-colors">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2">
        <div className="flex items-center gap-1.5">
          <Bot className="w-3 h-3 text-[#6b6b6b]" />
          <span className="font-mono text-[9px] text-[#6b6b6b]">
            vector://isolated-rag
          </span>
        </div>
        <button
          type="button"
          onClick={regenerateEmbedding}
          className="flex items-center gap-1 font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border transition-colors hover:scale-105"
          style={{
            borderColor: `${color}50`,
            color: color,
            backgroundColor: `${color}10`,
          }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          <span>COSINE: {similarityScore}</span>
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-1">
        <svg className="w-full h-full max-h-20" viewBox="0 0 240 70" fill="none">
          <rect
            x="30"
            y="12"
            width="180"
            height="46"
            rx="4"
            stroke={color}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            fill="#121212"
          />

          <line x1="55" y1="35" x2="85" y2="25" stroke="#333" strokeWidth="1" />
          <line x1="55" y1="35" x2="85" y2="45" stroke="#333" strokeWidth="1" />
          <line
            x1="85"
            y1="25"
            x2="130"
            y2="35"
            stroke={color}
            strokeWidth="1.2"
          />
          <line
            x1="85"
            y1="45"
            x2="130"
            y2="35"
            stroke={color}
            strokeWidth="1.2"
          />
          <line
            x1="130"
            y1="35"
            x2="175"
            y2="25"
            stroke={color}
            strokeWidth="1.5"
          />
          <line x1="130" y1="35" x2="175" y2="45" stroke="#333" strokeWidth="1" />

          <circle cx="55" cy="35" r="4" fill="#222" stroke="#444" />
          <circle cx="85" cy="25" r="3" fill="#222" stroke={color} />
          <circle cx="85" cy="45" r="3" fill="#222" stroke="#444" />
          <circle cx="130" cy="35" r="5" fill={color} />
          <circle cx="175" cy="25" r="4" fill="#f5f5f0" />
          <circle cx="175" cy="45" r="3" fill="#222" stroke="#444" />

          <text
            x="55"
            y="55"
            fill="#666"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
          >
            QUERY
          </text>
          <text
            x="130"
            y="55"
            fill={color}
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            COSINE RAG
          </text>
          <text
            x="175"
            y="55"
            fill="#f5f5f0"
            fontSize="7"
            fontFamily="monospace"
            textAnchor="middle"
          >
            OUTPUT
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#6b6b6b]">
        <span>PRIVATE_ENTERPRISE_RAG</span>
        <span className="text-[#f5f5f0] font-bold">AIRGAPPED DATA</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES MASTER DATA SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceItem {
  num: string
  title: string
  desc: string
  color: string
  colorName: string
  tag: string
  visual: React.ComponentType<{ color: string; isActive: boolean }>
  deliverables: string[]
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
    title: 'Kinetic Web Development',
    desc: 'Ultra-fast Next.js 14 web flagships with custom 3D WebGL canvases, fluid animations, and sub-second load times engineered for high conversion.',
    color: '#c8f542', // Acid Green
    colorName: 'Acid Green',
    tag: 'NEXT.JS 14 • WEBGL • 3D',
    visual: WebVisual,
    deliverables: [
      'Next.js 14 Architecture',
      'Three.js / Canvas Physics',
      '100/100 Core Web Vitals',
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
    title: 'Business Automation',
    desc: 'Eliminate repetitive manual operations by constructing event-driven pipelines, webhook bridges, ERP synchronizations, and CRM workflows.',
    color: '#e8d5b7', // Warm Gold
    colorName: 'Warm Gold',
    tag: 'PIPELINES • WEBHOOKS • ERP',
    visual: AutomationVisual,
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
    title: 'Custom Software & Portals',
    desc: 'Bespoke client dashboards, internal administrative portals, and scalable cloud systems built with secure relational database schemas.',
    color: '#38bdf8', // Ice Cyan
    colorName: 'Ice Cyan',
    tag: 'PORTALS • PRISMA • CLOUD',
    visual: SoftwareVisual,
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
    title: 'Enterprise AI Solutions',
    desc: 'Domain-grounded AI assistants, automated data extraction agents, and retrieval-augmented intelligence strictly isolated on private company data.',
    color: '#c084fc', // Lilac Orchid
    colorName: 'Lilac Orchid',
    tag: 'NEURAL • RAG • LLM',
    visual: AiVisual,
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

  const toggleSelectCard = (num: string) => {
    setSelectedServiceNum((prev) => (prev === num ? '' : num))
  }

  return (
    <section
      id="services"
      className="relative w-full bg-[#111111] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          CRAZY KINETIC CYBER BACKGROUND
          Interactive 60fps particle constellations, cyber wave,
          and dynamic ambient color orbs
      ───────────────────────────────────────────────────────────── */}
      <KineticCyberBackground activeColor={activeService.color} />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              03
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / CAPABILITIES &amp; ARCHITECTURE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b]">
              [ CLICK ANY SERVICE TO POP UP ARCHITECTURE ]
            </span>
          </div>
        </div>

        {/* Section Intro */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <h2 className="font-editorial text-[clamp(32px,5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f5f5f0] mb-6">
            Engineered for performance, not decoration.
          </h2>
          <p className="text-base sm:text-lg leading-[1.8] text-[#6b6b6b]">
            We build production-ready systems that eliminate bottlenecks and scale business revenue. Select any service below to inspect its technical architecture and telemetry.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4 SERVICE CARDS GRID:
            - Click any card -> pops up with elevated scale, border glow & ambient backlight
            - ALL text inside turns BOLD (title, description, deliverables)
            - Embedded interactive visual schematics with test triggers
            - Aesthetic jewel colors: Acid Green, Warm Gold, Ice Cyan, Lilac Orchid
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {services.map((service) => {
            const isSelected = selectedServiceNum === service.num
            const VisualComponent = service.visual

            return (
              <motion.div
                key={service.num}
                layout
                onClick={() => toggleSelectCard(service.num)}
                className={`relative cursor-pointer transition-all duration-300 text-left flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'p-8 sm:p-10 bg-[#0c0c0c] scale-[1.015] z-20 shadow-[0_25px_70px_rgba(0,0,0,0.95)]'
                    : 'p-8 sm:p-10 bg-[#080808]/90 hover:bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#333333]'
                }`}
                style={{
                  border: isSelected
                    ? `1.5px solid ${service.color}`
                    : undefined,
                  boxShadow: isSelected
                    ? `0 0 50px ${service.color}20, 0 25px 60px rgba(0,0,0,0.95)`
                    : undefined,
                }}
              >
                {/* Subtle Ambient Colored Glow on Selected Card */}
                {isSelected && (
                  <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-25 blur-3xl"
                    style={{ backgroundColor: service.color }}
                  />
                )}

                <div>
                  {/* Card Header: Category Tag & Pop-up Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border transition-colors"
                        style={{
                          borderColor: isSelected
                            ? `${service.color}60`
                            : '#222222',
                          color: isSelected ? service.color : '#888888',
                          backgroundColor: isSelected
                            ? `${service.color}12`
                            : '#141414',
                        }}
                      >
                        {service.tag}
                      </span>

                      {isSelected && (
                        <span
                          className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border hidden sm:inline-block animate-pulse"
                          style={{
                            borderColor: `${service.color}50`,
                            color: service.color,
                            backgroundColor: `${service.color}08`,
                          }}
                        >
                          ● POPPED UP &amp; BOLD
                        </span>
                      )}
                    </div>

                    <span
                      className="font-mono text-xs transition-colors font-semibold"
                      style={{
                        color: isSelected ? service.color : '#444444',
                      }}
                    >
                      [{service.num}]
                    </span>
                  </div>

                  {/* High-Tech Visual Schematic */}
                  <div className="mb-8">
                    <VisualComponent
                      color={service.color}
                      isActive={isSelected}
                    />
                  </div>

                  {/* ─── TITLE: Bolds significantly when clicked ─── */}
                  <h3
                    className={`font-editorial text-2xl sm:text-3xl mb-4 transition-all ${
                      isSelected
                        ? 'font-bold text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]'
                        : 'font-normal text-[#f5f5f0] group-hover:text-white'
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* ─── DESCRIPTION: Bolds significantly when clicked ─── */}
                  <p
                    className={`text-sm sm:text-base leading-[1.8] mb-8 transition-all ${
                      isSelected
                        ? 'font-bold text-[#f5f5f0]'
                        : 'font-normal text-[#6b6b6b] group-hover:text-[#a0a0a0]'
                    }`}
                  >
                    {service.desc}
                  </p>

                  {/* ─── DELIVERABLES: Bolds & illuminates when clicked ─── */}
                  <div className="pt-6 border-t border-[#1f1f1f] space-y-2.5 mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#444444] mb-3">
                      // DELIVERABLE CAPABILITIES
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded transition-all text-xs font-mono ${
                            isSelected
                              ? 'bg-[#141414] border border-[#2a2a2a] font-bold text-white'
                              : 'font-normal text-[#6b6b6b] group-hover:text-[#a0a0a0]'
                          }`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: isSelected
                                ? service.color
                                : '#333333',
                            }}
                          />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── EXPANDED ARCHITECTURE BLUEPRINT (Shows on Click) ─── */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6 pt-6 border-t border-[#222222] space-y-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 rounded bg-[#111111] border border-[#1f1f1f] space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#6b6b6b]">BENCHMARK:</span>
                          <span className="text-white font-bold">
                            {service.deepDiveSpecs.benchmark}
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-xs font-mono gap-4">
                          <span className="text-[#6b6b6b] flex-shrink-0">
                            SYSTEM CORE:
                          </span>
                          <span className="text-[#a0a0a0] font-medium text-right">
                            {service.deepDiveSpecs.architecture}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setModalService(service)}
                          className="font-mono text-xs uppercase tracking-wider px-5 py-3 rounded text-[#080808] font-bold transition-transform hover:scale-[1.02] flex items-center gap-2"
                          style={{ backgroundColor: service.color }}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Full Architecture Blueprint</span>
                        </button>

                        <Link
                          href="#contact"
                          className="font-mono text-xs uppercase tracking-wider px-4 py-3 rounded border border-[#2a2a2a] text-[#f5f5f0] hover:border-white font-medium bg-[#141414] transition-colors flex items-center gap-1.5"
                        >
                          <span>Deploy This Stack</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Card Footer Hint */}
                <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center justify-between font-mono text-[10px] text-[#444444]">
                  <span>
                    {isSelected
                      ? 'CLICK AGAIN TO MINIMIZE'
                      : 'CLICK TO POP UP & BOLD'}
                  </span>
                  <span
                    className="transition-colors font-semibold"
                    style={{ color: isSelected ? service.color : undefined }}
                  >
                    {isSelected ? 'EXPANDED' : 'SPEC_READY'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN ARCHITECTURAL INSPECTOR MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080808]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#0c0c0c] border border-[#222222] rounded-lg p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-left shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
              style={{
                borderColor: `${modalService.color}50`,
                boxShadow: `0 0 50px ${modalService.color}15`,
              }}
            >
              <button
                type="button"
                onClick={() => setModalService(null)}
                className="absolute top-6 right-6 p-2 rounded border border-[#1f1f1f] text-[#6b6b6b] hover:text-white hover:border-white transition-colors bg-[#111111]"
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
                  ENTERPRISE GRADE
                </span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white mb-4">
                {modalService.title}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-[#f5f5f0] mb-8 leading-[1.8]">
                {modalService.desc}
              </p>

              <div className="mb-8">
                {React.createElement(modalService.visual, {
                  color: modalService.color,
                  isActive: true,
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded bg-[#111111] border border-[#1f1f1f]">
                  <div className="font-mono text-[10px] text-[#6b6b6b] uppercase mb-1">
                    PERFORMANCE &amp; BENCHMARK
                  </div>
                  <div className="font-mono text-xs font-bold text-white">
                    {modalService.deepDiveSpecs.benchmark}
                  </div>
                </div>

                <div className="p-4 rounded bg-[#111111] border border-[#1f1f1f]">
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
                      className="p-3 rounded bg-[#141414] border border-[#222222] flex items-center gap-2.5 font-mono text-xs font-bold text-white"
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

              <div className="mb-8 pt-6 border-t border-[#1f1f1f]">
                <div className="font-mono text-xs uppercase tracking-wider text-[#6b6b6b] mb-3">
                  TECHNOLOGY STACK:
                </div>
                <div className="flex flex-wrap gap-2">
                  {modalService.deepDiveSpecs.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-3 py-1.5 rounded border border-[#222222] bg-[#111111] text-[#f5f5f0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4">
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
                  className="font-mono text-xs uppercase tracking-widest px-6 py-4 rounded border border-[#2a2a2a] text-[#888888] hover:text-white transition-colors"
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

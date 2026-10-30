'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, Check, X } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE SCROLL-TO-BOLD & ILLUMINATION TYPOGRAPHY ENGINE
// Progressively increases font weight (400 -> 700) and shifts color to pure white
// ─────────────────────────────────────────────────────────────────────────────
function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.42, 1])
  const fontWeight = useTransform(progress, range, [400, 700])
  const color = useTransform(progress, range, ['#808a98', '#ffffff'])

  return (
    <motion.span
      style={{ opacity, fontWeight, color }}
      className="inline-block mr-[0.28em] will-change-[font-weight,color,opacity]"
    >
      {word}
    </motion.span>
  )
}

function ScrollBoldParagraph({
  text,
  progress,
  startRange = 0.05,
  endRange = 0.72,
  className,
}: {
  text: string
  progress: MotionValue<number>
  startRange?: number
  endRange?: number
  className?: string
}) {
  const words = text.split(' ')
  const count = words.length
  const step = (endRange - startRange) / count

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = startRange + i * step
        const end = Math.min(start + step * 1.35, 1)
        return (
          <ScrollWord
            key={`${word}-${i}`}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIFICATION DATA (100% Verbatim Technical Telemetry & Deliverables)
// ─────────────────────────────────────────────────────────────────────────────
interface TelemetryBlock {
  topLeft: string
  topRight: string
  midNodes?: string
  bottomLeft: string
  bottomRight: string
}

interface ServiceSpec {
  id: string
  index: string
  meta: string
  title: string
  description: string
  accentColor: string
  activeGlowClass: string
  hudMetric: string
  telemetryBlocks: TelemetryBlock[]
  capabilities: string[]
  footerTrigger: string
  status: string
}

const SERVICE_SPEC_DATA: Record<string, ServiceSpec> = {
  '01': {
    id: '01',
    index: '[01]',
    meta: '#:17.25 IX • OPNAI • 10',
    title: 'Kinetic Web Development',
    description:
      'Ultra-fast Next.js web experiences with custom 3D WebGL canvases, fluid animations, and sub-second load times engineered for high conversion.',
    accentColor: '#a3e635',
    activeGlowClass: 'active-lime',
    hudMetric: '100/100 VITALS',
    telemetryBlocks: [
      {
        topLeft: '::: /PASS 0012010450',
        topRight: 'CF 100.00',
        bottomLeft: 'CANVAS PHYSICS: 60FPS',
        bottomRight: '100/100 VITALS',
      },
    ],
    capabilities: [
      '+ Next.js Architecture',
      '+ Canvas Physics',
      '+ Core Web Vitals',
      '+ Headless CMS Integration',
    ],
    footerTrigger: 'CLICK TO VIEW SPEC',
    status: 'SPEC_READY',
  },
  '02': {
    id: '02',
    index: '[02]',
    meta: 'PERKLNOVK • BERRTICS • AP',
    title: 'Business Automation',
    description:
      'Eliminate repetitive manual operations by constructing event-driven pipelines, webhook bridges, CRM workflows, and automation that scales.',
    accentColor: '#a3e635',
    activeGlowClass: 'active-lime',
    hudMetric: '00ms RETRY',
    telemetryBlocks: [
      {
        topLeft: '⚡ ROUTE OK +30052761C',
        topRight: '01 0700:00100:00',
        midNodes: 'WEBHOOK → ROUTER → DB / CRM',
        bottomLeft: 'DATA: 30.800 00120',
        bottomRight: '00ms RETRY',
      },
    ],
    capabilities: [
      '+ API & Webhook Pipelines',
      '+ Custom CRM Integrations',
      '+ Automated Lead Routing',
      '+ Asynchronous Queues',
    ],
    footerTrigger: 'CLICK TO VIEW SPEC',
    status: 'SPEC_READY',
  },
  '03': {
    id: '03',
    index: '[03]',
    meta: 'PORTALS • PRISMA • CLOUD',
    title: 'Custom Software & Portals',
    description:
      'Bespoke client dashboards, internal administrative portals, and scalable cloud systems built with secure relational database schemas.',
    accentColor: '#38bdf8',
    activeGlowClass: 'active-cyan',
    hudMetric: '15ms VITALS',
    telemetryBlocks: [
      {
        topLeft: 'SERVER /RELATIONS.CORE',
        topRight: '9 PORTALS + SCEN',
        midNodes: 'ext_database ([PK] tenant_id) → multi-tenant ([FK] RBAC_role) ✓',
        bottomLeft: 'SCHEMAS: NONCRITICAL',
        bottomRight: 'c1000: RELIABLE',
      },
      {
        topLeft: 'DB://CLUSTER-MESH',
        topRight: '15MS VITALS',
        midNodes: 'ext_database ([PK] id) → [3D_CLUSTER_DB] → Portal (Client UI)',
        bottomLeft: 'SCHEMAS: NOMINAL',
        bottomRight: '15ms VITALS',
      },
    ],
    capabilities: [
      '+ Role-Based Authentication',
      '+ PostgreSQL & Prisma',
      '+ Multi-Tenant Architecture',
      '+ Real-time Telemetry',
    ],
    footerTrigger: 'CLICK TO POP UP SPEC',
    status: 'SPEC_READY',
  },
  '04': {
    id: '04',
    index: '[04]',
    meta: 'NEURAL • RAG • LLM',
    title: 'Enterprise AI Solutions',
    description:
      'Domain-grounded AI assistants, automated data extraction agents, and retrieval augmented intelligence strictly isolated on private company data.',
    accentColor: '#a855f7',
    activeGlowClass: 'active-violet',
    hudMetric: '48ms RUNTIME',
    telemetryBlocks: [
      {
        topLeft: 'VECTOR /TEXTEMBED-VLM',
        topRight: '95504L - 4.2UI',
        midNodes: 'EMBED_DB ⟷ [3D_VECTOR_CONSTELLATION] ⟷ PARSED_DATA',
        bottomLeft: 'PRIVATE EMBEDDINGS_DB',
        bottomRight: 'SCRAPED DATA',
      },
      {
        topLeft: 'NN://GRAPH-LATTICE',
        topRight: '01 0700: REPOD:00',
        bottomLeft: 'DATA: 30.800 00120',
        bottomRight: '48ms RUNTIME',
      },
    ],
    capabilities: [
      '+ Private RAG Pipelines',
      '+ Automated Document Parsing',
      '+ Custom LLM Agents',
      '+ Zero Data Retention API',
    ],
    footerTrigger: 'CLICK TO VIEW SPEC',
    status: 'SPEC_READY',
  },
}

export default function ServicesEditorial() {
  const [activeCardId, setActiveCardId] = useState<string>('01')
  const [viewMode, setViewMode] = useState<'bento' | 'isometric'>('bento')
  const [isExploded, setIsExploded] = useState<boolean>(false)
  const [specModalCardId, setSpecModalCardId] = useState<string | null>(null)

  // Section & Canvas Refs
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement>(null)
  const kinCanvasRef = useRef<HTMLCanvasElement>(null)
  const vecCanvasRef = useRef<HTMLCanvasElement>(null)

  // Scroll scrub bound directly to the header text container:
  // As the text enters the viewport and moves toward the center,
  // each word sequentially illuminates from grey (400) to bold white (700).
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start 90%', 'end 25%'],
  })

  // Card Refs for 3D Tilt Physics
  const cardRefs = useRef<Record<string, HTMLElement | null>>({})

  // Interactive Spline State for Card 01
  const [waveMouse, setWaveMouse] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.35 })

  // Active spec item
  const activeSpec = SERVICE_SPEC_DATA[activeCardId] || SERVICE_SPEC_DATA['01']
  const modalSpec = specModalCardId ? SERVICE_SPEC_DATA[specModalCardId] : null

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. 3D MULTI-CANVAS RENDER LOOP (Blueprint, Hero Hologram Stack, Wave, Vector)
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let animationFrameId: number
    let isVisible = false
    let t = 0
    let globalMouseX = 0
    let globalMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      globalMouseX = e.clientX / window.innerWidth - 0.5
      globalMouseY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 3D Vector Constellation Points for Card [04]
    const vecPoints = Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 95,
      y: (Math.random() - 0.5) * 34,
      z: (Math.random() - 0.5) * 60,
      r: 1.2 + Math.random() * 1.4,
    }))

    const resizeCanvases = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      const bg = bgCanvasRef.current
      if (bg && bg.parentElement) {
        bg.width = bg.parentElement.offsetWidth * dpr
        bg.height = bg.parentElement.offsetHeight * dpr
      }

      const hero = heroCanvasRef.current
      if (hero && hero.parentElement) {
        hero.width = hero.parentElement.offsetWidth * dpr
        hero.height = hero.parentElement.offsetHeight * dpr
      }

      const kin = kinCanvasRef.current
      if (kin && kin.parentElement) {
        kin.width = kin.parentElement.offsetWidth * dpr
        kin.height = kin.parentElement.offsetHeight * dpr
      }

      const vec = vecCanvasRef.current
      if (vec && vec.parentElement) {
        vec.width = vec.parentElement.offsetWidth * dpr
        vec.height = vec.parentElement.offsetHeight * dpr
      }
    }

    resizeCanvases()
    window.addEventListener('resize', resizeCanvases, { passive: true })

    const render = () => {
      if (!isVisible || document.hidden) return
      t += 0.022
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      // ── A. Render Background 3D Isometric Architectural Wireframe Grid
      const bg = bgCanvasRef.current
      if (bg) {
        const ctx = bg.getContext('2d')
        if (ctx) {
          ctx.save()
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          const w = bg.width / dpr
          const h = bg.height / dpr
          ctx.clearRect(0, 0, w, h)

          ctx.translate(w * 0.72 + globalMouseX * -35, h * 0.45 + globalMouseY * -25)
          ctx.rotate(-0.22)

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.028)'
          ctx.lineWidth = 1

          for (let layer = 0; layer < 3; layer++) {
            const offsetZ = layer * 26
            const rectW = 520
            const rectH = 340
            ctx.strokeRect(-rectW / 2 + offsetZ, -rectH / 2 - offsetZ, rectW, rectH)
          }

          const step = 44
          ctx.beginPath()
          for (let gx = -260; gx <= 260; gx += step) {
            ctx.moveTo(gx, -170)
            ctx.lineTo(gx, 170)
          }
          for (let gy = -170; gy <= 170; gy += step) {
            ctx.moveTo(-260, gy)
            ctx.lineTo(260, gy)
          }
          ctx.stroke()
          ctx.restore()
        }
      }

      // ── B. Render Hero 3D Isometric System Stack Hologram
      const hero = heroCanvasRef.current
      if (hero) {
        const ctx = hero.getContext('2d')
        if (ctx) {
          ctx.save()
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          const w = hero.width / dpr
          const h = hero.height / dpr
          ctx.clearRect(0, 0, w, h)

          const cx = w / 2
          const cy = h / 2 + 18
          const layers = [
            { id: '04', label: '[04] NEURAL', color: '#a855f7', z: 42 },
            { id: '03', label: '[03] PORTALS', color: '#38bdf8', z: 14 },
            { id: '02', label: '[02] ROUTER', color: '#84cc16', z: -14 },
            { id: '01', label: '[01] KINETIC', color: '#a3e635', z: -42 },
          ]

          const rotAngle = t * 0.35 + globalMouseX * 0.9

          layers.forEach((layer, idx) => {
            const isSelected = layer.id === activeCardId
            const floatY = Math.sin(t * 1.4 + idx * 0.8) * 3
            const yPos = cy - layer.z + floatY
            const rx = isSelected ? 102 : 88
            const ry = isSelected ? 36 : 30

            ctx.save()
            ctx.translate(cx, yPos)

            // Draw 3D Isometric Diamond Slab
            ctx.beginPath()
            for (let i = 0; i < 4; i++) {
              const ang = rotAngle + (i * Math.PI) / 2
              const px = Math.cos(ang) * rx
              const py = Math.sin(ang) * ry
              if (i === 0) ctx.moveTo(px, py)
              else ctx.lineTo(px, py)
            }
            ctx.closePath()

            ctx.fillStyle = isSelected ? `${layer.color}28` : 'rgba(15, 19, 28, 0.78)'
            ctx.strokeStyle = isSelected ? layer.color : 'rgba(255, 255, 255, 0.15)'
            ctx.lineWidth = isSelected ? 1.8 : 1
            ctx.fill()
            ctx.stroke()

            // Center core node
            ctx.beginPath()
            ctx.arc(0, 0, isSelected ? 4 : 2.2, 0, Math.PI * 2)
            ctx.fillStyle = isSelected ? '#ffffff' : layer.color
            ctx.fill()

            ctx.restore()
          })

          ctx.restore()
        }
      }

      // ── C. Render Card [01] 3D Perspective Wave Ribbon Surface
      const kin = kinCanvasRef.current
      if (kin) {
        const ctx = kin.getContext('2d')
        if (ctx) {
          ctx.save()
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          const w = kin.width / dpr
          const h = kin.height / dpr
          ctx.clearRect(0, 0, w, h)

          const rows = 5
          const cols = 24
          for (let row = 0; row < rows; row++) {
            ctx.beginPath()
            const depthRatio = row / (rows - 1)
            for (let col = 0; col <= cols; col++) {
              const u = col / cols
              const x = w * 0.14 + u * (w * 0.72)
              const archWave = Math.sin(u * Math.PI) * (32 + (1 - waveMouse.y) * 18)
              const harmonic = Math.sin(u * 6 + t * 2 + row * 0.6) * 4
              const y = h * 0.78 - archWave * (0.45 + depthRatio * 0.55) + harmonic + row * 4

              if (col === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            ctx.strokeStyle = `rgba(163, 230, 53, ${0.06 + depthRatio * 0.12})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
          ctx.restore()
        }
      }

      // ── D. Render Card [04] 3D Rotating Point-Cloud inside VECTOR /TEXTEMBED-VLM
      const vec = vecCanvasRef.current
      if (vec) {
        const ctx = vec.getContext('2d')
        if (ctx) {
          ctx.save()
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          const w = vec.width / dpr
          const h = vec.height / dpr
          ctx.clearRect(0, 0, w, h)

          const cx = w / 2
          const cy = h / 2
          const cosY = Math.cos(t * 0.8)
          const sinY = Math.sin(t * 0.8)

          vecPoints.forEach((pt) => {
            const rx = pt.x * cosY - pt.z * sinY
            const rz = pt.z * cosY + pt.x * sinY
            const scale = 180 / (180 + rz)
            const sx = cx + rx * scale
            const sy = cy + pt.y * scale

            ctx.beginPath()
            ctx.arc(sx, sy, pt.r * scale, 0, Math.PI * 2)
            ctx.fillStyle = rz < 0 ? 'rgba(216, 180, 254, 0.65)' : 'rgba(168, 85, 247, 0.28)'
            ctx.fill()
          })

          ctx.restore()
        }
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
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId)
      } else if (isVisible) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvases)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [activeCardId, waveMouse.y])

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. 3D PERSPECTIVE TILT & SPECULAR SPOTLIGHT HANDLER FOR SERVICE CARDS
  // ─────────────────────────────────────────────────────────────────────────────
  const handleCardMouseMove = useCallback(
    (cardId: string, e: React.MouseEvent<HTMLElement>) => {
      const card = cardRefs.current[cardId]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -4.2
      const rotateY = ((x - centerX) / centerX) * 4.2

      card.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`
    },
    []
  )

  const handleCardMouseEnter = useCallback((cardId: string) => {
    setActiveCardId(cardId)
  }, [])

  const handleCardMouseLeave = useCallback((cardId: string) => {
    const card = cardRefs.current[cardId]
    if (!card) return
    card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. CARD [01] INTERACTIVE SPLINE DRAG/HOVER CALCULATION
  // ─────────────────────────────────────────────────────────────────────────────
  const handleKineticMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    setWaveMouse({ x, y })
  }, [])

  const handleKineticMouseLeave = useCallback(() => {
    setWaveMouse({ x: 0.5, y: 0.35 })
  }, [])

  // Dynamic values for Card 01 Bezier Curve
  const splineCtrlX = 190 + (waveMouse.x - 0.5) * 90
  const splineCtrlY = 6 + waveMouse.y * 52
  const splineApexY = 0.25 * 84 + 0.5 * splineCtrlY + 0.25 * 84

  // ESC to close spec modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSpecModalCardId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-10 w-full min-h-screen bg-transparent text-[#f8fafc] py-16 sm:py-24 px-4 sm:px-8 border-b border-white/[0.08] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────────────────
          0. PROFESSIONAL & PREMIUM ARCHITECTURAL MULTI-LAYER BACKGROUND
          ───────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Base Gradient Surface */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/40 via-transparent to-[#040507]/40" />

        {/* CAD/Blueprint Technical Drafting Wireframe on Left Flank */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[420px] sm:w-[540px] lg:w-[680px] pointer-events-none select-none opacity-[0.28] mix-blend-screen bg-no-repeat bg-left-top bg-cover"
          style={{
            backgroundImage: "url('/images/services-cad-wireframe.png')",
            maskImage: 'radial-gradient(ellipse 90% 70% at 20% 40%, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 20% 40%, black 30%, transparent 85%)',
          }}
        />

        {/* 3D Isometric Dark Tech Server/Laptop Terminal Rendering on Right Flank */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[440px] sm:w-[560px] lg:w-[720px] pointer-events-none select-none opacity-[0.38] mix-blend-screen bg-no-repeat bg-right-top bg-cover"
          style={{
            backgroundImage: "url('/images/services-tech-terminal.png')",
            maskImage: 'radial-gradient(ellipse 90% 70% at 80% 50%, black 25%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 80% 50%, black 25%, transparent 85%)',
          }}
        />

        {/* Technical Coordinate Drafting Micro-Grid Matrix */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Subtle Engineering Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Live Interactive 3D Architectural Blueprint Canvas */}
        <canvas
          ref={bgCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
        />

        {/* Ambient Volumetric Lighting Blooms */}
        <div className="absolute -top-24 left-[8%] w-[580px] h-[580px] rounded-full bg-limeAccent/[0.055] blur-[140px] transition-all duration-700" />
        <div className="absolute top-[40%] right-[10%] w-[540px] h-[540px] rounded-full bg-cyanAccent/[0.045] blur-[150px] transition-all duration-700" />
        <div className="absolute -bottom-20 left-[25%] w-[600px] h-[600px] rounded-full bg-violetAccent/[0.045] blur-[160px] transition-all duration-700" />

        {/* Dynamic Active Service Glow Aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[180px] opacity-[0.09] transition-all duration-700"
          style={{ backgroundColor: activeSpec.accentColor }}
        />

        {/* Edge Vignettes into adjacent dark sections */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050608] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1340px] w-full mx-auto">
        {/* ─────────────────────────────────────────────────────────────────────────
            1. HERO / SECTION HEADER + 3D VIEW CONTROLS + ISOMETRIC STACK VISUALIZER
            ───────────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          {/* Left Column: Verbatim Hero Headline & Spatial Mode Switchers */}
          <div ref={headerRef} className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-limeAccent font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-limeAccent shadow-[0_0_8px_#a3e635]" />
              <span>02 // CAPABILITIES &amp; ARCHITECTURE</span>
            </div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                },
              }}
              className="editorial-heading text-[44px] sm:text-[60px] xl:text-[68px] text-white tracking-tight mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] select-none"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="block"
              >
                Engineered for
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="block"
              >
                performance, not
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block relative group/deco cursor-default"
              >
                <span className="italic font-serif text-limeAccent drop-shadow-[0_0_24px_rgba(163,230,53,0.4)] transition-all duration-300 group-hover/deco:brightness-110">
                  decoration.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-0.5 w-full h-[2.5px] bg-gradient-to-r from-limeAccent via-white/80 to-transparent origin-left"
                />
              </motion.span>
            </motion.h2>

            {/* Body Copy with Interactive Scroll-to-Bold & White Illumination */}
            <ScrollBoldParagraph
              text="We build production-ready systems that eliminate bottlenecks and scale business revenue. Select any service below to inspect its technical architecture and telemetry."
              progress={scrollYProgress}
              startRange={0.02}
              endRange={0.7}
              className="text-[#949ca9] text-[15px] sm:text-[16px] leading-[1.68] font-normal max-w-[560px] mb-8 font-sans"
            />

            {/* Interactive 3D Spatial Controls Bar */}
            <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0c0e14]/90 border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode('bento')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.12em] uppercase transition-all ${
                  viewMode === 'bento'
                    ? 'bg-limeAccent/15 text-limeAccent border border-limeAccent/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                01 // 3D Bento Matrix
              </button>
              <button
                type="button"
                onClick={() => setViewMode('isometric')}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.12em] uppercase transition-all ${
                  viewMode === 'isometric'
                    ? 'bg-limeAccent/15 text-limeAccent border border-limeAccent/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                02 // Isometric Deck
              </button>
              <div className="h-4 w-[1px] bg-white/10 mx-0.5 hidden sm:block" />
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-[0.12em] uppercase transition-all text-neutral-300 hover:text-white bg-white/[0.03] border border-white/10 flex items-center gap-1.5"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isExploded
                      ? 'bg-limeAccent shadow-[0_0_8px_#a3e635]'
                      : 'bg-neutral-500'
                  }`}
                />
                <span>Z-Axis Explode</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive 3D Isometric System Stack Visualizer */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative w-full h-[270px] rounded-2xl bg-gradient-to-b from-[#11141d]/80 to-[#07090d]/90 border border-white/[0.08] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between group">
              {/* Top HUD Overlay */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-neutral-400">
                <span
                  className="font-semibold transition-colors duration-300"
                  style={{ color: activeSpec.accentColor }}
                >
                  {activeSpec.meta.split('|')[0].trim()}
                </span>
                <span
                  className="px-2 py-0.5 rounded font-semibold transition-all duration-300 border"
                  style={{
                    color: activeSpec.accentColor,
                    backgroundColor: `${activeSpec.accentColor}18`,
                    borderColor: `${activeSpec.accentColor}55`,
                  }}
                >
                  {activeSpec.index} {activeSpec.status}
                </span>
              </div>

              {/* 3D Isometric Extruded Stack Canvas */}
              <canvas
                ref={heroCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
              />

              {/* Bottom HUD Overlay */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.1em] text-neutral-400 pt-2 border-t border-white/[0.06]">
                <span className="text-white font-medium">{activeSpec.title}</span>
                <span
                  className="font-semibold transition-colors duration-300"
                  style={{ color: activeSpec.accentColor }}
                >
                  {activeSpec.hudMetric}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            2. UNIFIED 4-CARD 3D SPATIAL ARCHITECTURE GRID
            ───────────────────────────────────────────────────────────────────────── */}
        <div className={`scene-3d-wrapper ${isExploded ? 'exploded-3d' : ''}`}>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-7 xl:gap-8 items-stretch ${
              viewMode === 'isometric' ? 'grid-isometric-mode' : 'grid-standard-mode'
            }`}
          >
            {/* ═══════════════════════════════════════════════════════════════════
                 CARD [01] — Kinetic Web Development (Acid Lime Accent)
                 ═══════════════════════════════════════════════════════════════════ */}
            <article
              ref={(el) => {
                cardRefs.current['01'] = el
              }}
              data-card-id="01"
              onMouseMove={(e) => handleCardMouseMove('01', e)}
              onMouseEnter={() => handleCardMouseEnter('01')}
              onMouseLeave={() => handleCardMouseLeave('01')}
              onClick={() => {
                setActiveCardId('01')
                setSpecModalCardId('01')
              }}
              className={`card-3d-chassis p-6 sm:p-8 flex flex-col justify-between cursor-pointer group ${
                activeCardId === '01' ? 'active-lime' : ''
              }`}
            >
              <div className="relative z-10">
                {/* Top Meta Bar (Layer Z-10) */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] mb-4">
                  <span className="text-[#8e96a4] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-limeAccent shadow-[0_0_8px_#a3e635]" />
                    <span>#:17.25 IX • OPNAI • 10</span>
                  </span>
                  <span className="text-limeAccent font-semibold px-2 py-0.5 rounded bg-limeAccent/10 border border-limeAccent/30">
                    [01]
                  </span>
                </div>

                {/* 3D Telemetry Chamber [01] (Layer Z-20) */}
                <div
                  onMouseMove={handleKineticMouseMove}
                  onMouseLeave={handleKineticMouseLeave}
                  className="layer-z-20 telemetry-chamber-3d p-4 sm:p-5 mb-6 cursor-crosshair"
                >
                  <div className="chamber-floor-grid" />

                  {/* Chamber Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] mb-2">
                    <span className="text-[#8e96a4] flex items-center gap-2">
                      <span className="text-neutral-500">:::</span>
                      <span>/PASS 0012010450</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-limeAccent/15 border border-limeAccent/40 text-limeAccent font-bold">
                      CF 100.00
                    </span>
                  </div>

                  {/* Interactive Dynamic 3D Spline & Wave Canvas Box */}
                  <div className="relative z-10 h-[150px] sm:h-[164px] w-full flex items-center justify-center my-1 select-none">
                    <canvas
                      ref={kinCanvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
                    />

                    <svg
                      className="relative z-10 w-full h-full overflow-visible pointer-events-none"
                      viewBox="0 0 380 120"
                      fill="none"
                    >
                      <defs>
                        <filter id="limeGlow3D" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="4.5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="archGrad3D" x1="70" y1="84" x2="310" y2="84" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#a3e635" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#a3e635" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="archSurfaceFill" x1="190" y1="26" x2="190" y2="95" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#a3e635" stopOpacity="0.14" />
                          <stop offset="100%" stopColor="#a3e635" stopOpacity="0.00" />
                        </linearGradient>
                      </defs>

                      {/* Coordinate Grid Guides */}
                      <line x1="86" y1="94" x2="294" y2="94" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="86" y1="84" x2="294" y2="84" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="3 3" />
                      <line
                        x1={splineCtrlX.toFixed(1)}
                        y1={splineApexY.toFixed(1)}
                        x2={splineCtrlX.toFixed(1)}
                        y2="96"
                        stroke="rgba(163,230,53,0.35)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />

                      {/* Translucent Surface Fill */}
                      <path
                        d={`M 86 84 Q ${splineCtrlX.toFixed(1)} ${splineCtrlY.toFixed(1)} 294 84 L 294 94 L 86 94 Z`}
                        fill="url(#archSurfaceFill)"
                      />

                      {/* Ghost Reference Arc */}
                      <path
                        d="M 86 84 Q 190 42 294 84"
                        stroke="rgba(163,230,53,0.35)"
                        strokeWidth="1.1"
                        strokeDasharray="3 3"
                        fill="none"
                      />

                      {/* Dynamic Control Tangents */}
                      <line
                        x1="86"
                        y1="84"
                        x2={splineCtrlX.toFixed(1)}
                        y2={splineApexY.toFixed(1)}
                        stroke="rgba(163,230,53,0.28)"
                        strokeWidth="0.9"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="294"
                        y1="84"
                        x2={splineCtrlX.toFixed(1)}
                        y2={splineApexY.toFixed(1)}
                        stroke="rgba(163,230,53,0.28)"
                        strokeWidth="0.9"
                        strokeDasharray="2 2"
                      />

                      {/* Main Parametric Kinetic Arc */}
                      <path
                        d={`M 86 84 Q ${splineCtrlX.toFixed(1)} ${splineCtrlY.toFixed(1)} 294 84`}
                        stroke="url(#archGrad3D)"
                        strokeWidth="2.8"
                        filter="url(#limeGlow3D)"
                        fill="none"
                        strokeLinecap="round"
                      />

                      {/* Baseline Endpoints */}
                      <circle cx="86" cy="84" r="3.2" fill="#0c0e14" stroke="#a3e635" strokeWidth="1.5" />
                      <circle cx="294" cy="84" r="3.2" fill="#0c0e14" stroke="#a3e635" strokeWidth="1.5" />

                      {/* Moving Apex Control Node */}
                      <g className="pulse-halo">
                        <circle
                          cx={splineCtrlX.toFixed(1)}
                          cy={splineApexY.toFixed(1)}
                          r="7.5"
                          fill="rgba(163,230,53,0.2)"
                          stroke="#a3e635"
                          strokeWidth="1.4"
                        />
                        <circle
                          cx={splineCtrlX.toFixed(1)}
                          cy={splineApexY.toFixed(1)}
                          r="3"
                          fill="#ffffff"
                        />
                      </g>
                    </svg>
                  </div>

                  {/* Chamber Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#7c8492]">CANVAS PHYSICS: 60FPS</span>
                    <span className="text-limeAccent font-semibold tracking-wider">100/100 VITALS</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="layer-z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mb-2.5"
                  >
                    <h3 className="card-serif-title text-[26px] sm:text-[29px] text-white transition-all duration-300 group-hover:text-limeAccent group-hover:drop-shadow-[0_0_18px_rgba(163,230,53,0.35)]">
                      Kinetic Web Development
                    </h3>
                    <span className="block h-[1.5px] w-0 bg-limeAccent transition-all duration-300 group-hover:w-full mt-1 opacity-80" />
                  </motion.div>
                  <p className="text-[#8e96a4] text-[14px] sm:text-[14.5px] leading-[1.65] mb-6 font-sans">
                    Ultra-fast Next.js web experiences with custom 3D WebGL canvases, fluid animations, and sub-second load times engineered for high conversion.
                  </p>
                </div>
              </div>

              {/* Deliverable Capabilities + Card Footer */}
              <div className="relative z-10 layer-z-10">
                <div className="border-t border-white/[0.08] pt-4 mb-5">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#5e6673] mb-3">
                    // DELIVERABLE CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[11px] text-[#d4dae3]">
                    {SERVICE_SPEC_DATA['01'].capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/[0.015] px-2.5 py-1.5 rounded-md border border-white/[0.04]"
                      >
                        <span className="text-limeAccent font-bold">+</span>
                        <span>{cap.replace(/^\+\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Trigger Bar */}
                <div className="border-t border-white/[0.08] pt-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em]">
                  <span className="text-[#8e96a4] group-hover:text-white transition-colors">
                    CLICK TO VIEW SPEC
                  </span>
                  <span className="text-limeAccent font-semibold">SPEC_READY</span>
                </div>
              </div>
            </article>

            {/* ═══════════════════════════════════════════════════════════════════
                 CARD [02] — Business Automation (Emerald / Lime Accent)
                 ═══════════════════════════════════════════════════════════════════ */}
            <article
              ref={(el) => {
                cardRefs.current['02'] = el
              }}
              data-card-id="02"
              onMouseMove={(e) => handleCardMouseMove('02', e)}
              onMouseEnter={() => handleCardMouseEnter('02')}
              onMouseLeave={() => handleCardMouseLeave('02')}
              onClick={() => {
                setActiveCardId('02')
                setSpecModalCardId('02')
              }}
              className={`card-3d-chassis p-6 sm:p-8 flex flex-col justify-between cursor-pointer group ${
                activeCardId === '02' ? 'active-lime' : ''
              }`}
            >
              <div className="relative z-10">
                {/* Top Meta Bar (Layer Z-10) */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] mb-4">
                  <span className="text-[#8e96a4] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-limeAccent/60" />
                    <span>PERKLNOVK • BERRTICS • AP</span>
                  </span>
                  <span className="text-[#8e96a4] group-hover:text-limeAccent font-semibold px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 transition-colors">
                    [02]
                  </span>
                </div>

                {/* 3D Telemetry Chamber [02] (Layer Z-20) */}
                <div className="layer-z-20 telemetry-chamber-3d p-4 sm:p-5 mb-6">
                  <div className="chamber-floor-grid" />

                  {/* Viewport Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] mb-2">
                    <span className="text-[#8e96a4] flex items-center gap-1.5">
                      <span className="text-limeAccent">⚡</span>
                      <span>ROUTE OK +30052761C</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/15 text-[#94a3b8]">
                      01 0700:00100:00
                    </span>
                  </div>

                  {/* 3D Extruded Isometric Pipeline Diagram: WEBHOOK -> ROUTER -> DB / CRM */}
                  <div className="relative z-10 h-[150px] sm:h-[164px] w-full flex items-center justify-center my-1">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 380 120" fill="none">
                      <defs>
                        <filter id="router3DGlow" x="-25%" y="-25%" width="150%" height="150%">
                          <feGaussianBlur stdDeviation="5" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* 3D Isometric Base Platform Rail */}
                      <polygon
                        points="32,82 348,82 362,98 18,98"
                        fill="rgba(255,255,255,0.02)"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.8"
                      />

                      {/* 3D Node 1: WEBHOOK (Extruded Dual-Layer Block) */}
                      <g className="float-3d" style={{ animationDelay: '0s' }}>
                        <rect x="38" y="45" width="84" height="36" rx="5" fill="#07080c" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                        <rect x="38" y="39" width="84" height="36" rx="5" fill="rgba(20, 24, 33, 0.95)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1" />
                        <line x1="46" y1="45" x2="64" y2="45" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                        <text x="80" y="61" textAnchor="middle" fill="#e2e8f0" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" letterSpacing="0.06em">
                          WEBHOOK
                        </text>
                      </g>

                      {/* 3D Conduit Tube 1: WEBHOOK -> ROUTER */}
                      <line x1="122" y1="57" x2="152" y2="57" stroke="rgba(163,230,53,0.25)" strokeWidth="4" strokeLinecap="round" />
                      <line x1="122" y1="57" x2="152" y2="57" stroke="#a3e635" strokeWidth="1.5" strokeDasharray="4 3" className="animate-stream" />
                      <circle cx="148" cy="57" r="2.6" fill="#a3e635" />

                      {/* 3D Node 2: ROUTER (Elevated Glowing Acid-Lime Core) */}
                      <g className="float-3d" style={{ animationDelay: '0.6s' }}>
                        <rect x="152" y="44" width="76" height="40" rx="6" fill="rgba(163,230,53,0.08)" stroke="rgba(163,230,53,0.35)" strokeWidth="1" />
                        <rect x="152" y="36" width="76" height="40" rx="6" fill="rgba(18, 28, 14, 0.96)" stroke="#a3e635" strokeWidth="1.5" filter="url(#router3DGlow)" />
                        <circle cx="163" cy="44" r="2" fill="#a3e635" />
                        <text x="190" y="60" textAnchor="middle" fill="#ffffff" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" letterSpacing="0.08em">
                          ROUTER
                        </text>
                      </g>

                      {/* 3D Conduit Tube 2: ROUTER -> DB / CRM */}
                      <line x1="228" y1="57" x2="258" y2="57" stroke="rgba(163,230,53,0.25)" strokeWidth="4" strokeLinecap="round" />
                      <line x1="228" y1="57" x2="258" y2="57" stroke="#a3e635" strokeWidth="1.5" strokeDasharray="4 3" className="animate-stream" />
                      <circle cx="254" cy="57" r="2.6" fill="#a3e635" />

                      {/* 3D Node 3: DB / CRM (Extruded Dual-Layer Block) */}
                      <g className="float-3d" style={{ animationDelay: '1.2s' }}>
                        <rect x="258" y="45" width="84" height="36" rx="5" fill="#07080c" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                        <rect x="258" y="39" width="84" height="36" rx="5" fill="rgba(20, 24, 33, 0.95)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1" />
                        <line x1="266" y1="45" x2="284" y2="45" stroke="rgba(163,230,53,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        <text x="300" y="61" textAnchor="middle" fill="#e2e8f0" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" letterSpacing="0.06em">
                          DB / CRM
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Viewport Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#7c8492]">DATA: 30.800 00120</span>
                    <span className="text-white font-semibold tracking-wider">00ms RETRY</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="layer-z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mb-2.5"
                  >
                    <h3 className="card-serif-title text-[26px] sm:text-[29px] text-white transition-all duration-300 group-hover:text-limeAccent group-hover:drop-shadow-[0_0_18px_rgba(163,230,53,0.35)]">
                      Business Automation
                    </h3>
                    <span className="block h-[1.5px] w-0 bg-limeAccent transition-all duration-300 group-hover:w-full mt-1 opacity-80" />
                  </motion.div>
                  <p className="text-[#8e96a4] text-[14px] sm:text-[14.5px] leading-[1.65] mb-6 font-sans">
                    Eliminate repetitive manual operations by constructing event-driven pipelines, webhook bridges, CRM workflows, and automation that scales.
                  </p>
                </div>
              </div>

              {/* Deliverable Capabilities + Card Footer */}
              <div className="relative z-10 layer-z-10">
                <div className="border-t border-white/[0.08] pt-4 mb-5">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#5e6673] mb-3">
                    // DELIVERABLE CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[11px] text-[#d4dae3]">
                    {SERVICE_SPEC_DATA['02'].capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/[0.015] px-2.5 py-1.5 rounded-md border border-white/[0.04]"
                      >
                        <span className="text-limeAccent font-bold">+</span>
                        <span>{cap.replace(/^\+\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Trigger Bar */}
                <div className="border-t border-white/[0.08] pt-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em]">
                  <span className="text-[#8e96a4] group-hover:text-white transition-colors">
                    CLICK TO VIEW SPEC
                  </span>
                  <span className="text-[#8e96a4] group-hover:text-limeAccent transition-colors font-semibold">
                    SPEC_READY
                  </span>
                </div>
              </div>
            </article>

            {/* ═══════════════════════════════════════════════════════════════════
                 CARD [03] — Custom Software & Portals (Cyan / Electric Blue Accent)
                 ═══════════════════════════════════════════════════════════════════ */}
            <article
              ref={(el) => {
                cardRefs.current['03'] = el
              }}
              data-card-id="03"
              onMouseMove={(e) => handleCardMouseMove('03', e)}
              onMouseEnter={() => handleCardMouseEnter('03')}
              onMouseLeave={() => handleCardMouseLeave('03')}
              onClick={() => {
                setActiveCardId('03')
                setSpecModalCardId('03')
              }}
              className={`card-3d-chassis p-6 sm:p-8 flex flex-col justify-between cursor-pointer group ${
                activeCardId === '03' ? 'active-cyan' : ''
              }`}
            >
              <div className="relative z-10">
                {/* Outer Primary Top Bar (Layer Z-10) */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] mb-3.5">
                  <span className="text-[#94a3b8] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent shadow-[0_0_8px_#38bdf8]" />
                    <span>PORTALS • PRISMA • CLOUD</span>
                  </span>
                  <span className="text-cyanAccent font-semibold px-2 py-0.5 rounded bg-cyanAccent/10 border border-cyanAccent/30">
                    [03]
                  </span>
                </div>

                {/* MODULE 3A: SERVER /RELATIONS.CORE (Layer Z-20) */}
                <div className="layer-z-20 telemetry-chamber-3d p-3.5 sm:p-4 mb-3.5">
                  <div className="chamber-floor-grid" />

                  {/* Module 3A Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] mb-1.5">
                    <span className="text-[#8e96a4] flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-cyanAccent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                      <span>SERVER /RELATIONS.CORE</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyanAccent/15 border border-cyanAccent/40 text-cyanAccent font-medium">
                      9 PORTALS + SCEN
                    </span>
                  </div>

                  {/* Module 3A 3D Extruded Schema Diagram */}
                  <div className="relative z-10 h-[86px] w-full flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 380 84" fill="none">
                      {/* Node 1 */}
                      <rect x="46" y="24" width="96" height="42" rx="5" fill="#06080d" stroke="rgba(255,255,255,0.07)" />
                      <rect x="46" y="19" width="96" height="42" rx="5" fill="#10141d" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
                      <text x="94" y="37" textAnchor="middle" fill="#f1f5f9" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="600">
                        ext_database
                      </text>
                      <text x="94" y="51" textAnchor="middle" fill="#64748b" fontFamily="JetBrains Mono, monospace" fontSize="7.2">
                        [PK] tenant_id
                      </text>

                      {/* Bridge */}
                      <line x1="142" y1="40" x2="178" y2="40" stroke="rgba(56,189,248,0.22)" strokeWidth="3.5" />
                      <line x1="142" y1="40" x2="178" y2="40" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 2" className="animate-stream" />
                      <polygon points="178,40 172,36.5 172,43.5" fill="#38bdf8" />

                      {/* Node 2 */}
                      <rect x="180" y="24" width="96" height="42" rx="5" fill="rgba(56,189,248,0.05)" stroke="rgba(56,189,248,0.25)" />
                      <rect x="180" y="19" width="96" height="42" rx="5" fill="rgba(14, 29, 43, 0.92)" stroke="#38bdf8" strokeWidth="1.4" />
                      <text x="228" y="37" textAnchor="middle" fill="#38bdf8" fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="700">
                        multi-tenant
                      </text>
                      <text x="228" y="51" textAnchor="middle" fill="#94a3b8" fontFamily="JetBrains Mono, monospace" fontSize="7.2">
                        [FK] RBAC_role
                      </text>

                      {/* Checkmark Sphere */}
                      <g className="pulse-halo">
                        <circle cx="304" cy="40" r="11" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="1.3" />
                        <path d="M299.5 40.2L302.5 43.2L308.5 37" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                  </div>

                  {/* Module 3A Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#7c8492]">SCHEMAS: NONCRITICAL</span>
                    <span className="text-cyanAccent font-semibold tracking-wider">c1000: RELIABLE</span>
                  </div>
                </div>

                {/* Secondary Meta Bar */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] mb-2.5 px-1">
                  <span className="text-[#8e96a4]">#:27.25 IX • D801 • 20</span>
                  <span className="text-[#7c8492]">[01]</span>
                </div>

                {/* MODULE 3B: DB://CLUSTER-MESH (Layer Z-30 Elevated) */}
                <div className="layer-z-30 telemetry-chamber-3d p-3.5 sm:p-4 mb-6">
                  <div className="chamber-floor-grid" />

                  {/* Module 3B Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] mb-1.5">
                    <span className="text-[#7c8492]">DB://CLUSTER-MESH</span>
                    <span className="px-2 py-0.5 rounded bg-cyanAccent/15 border border-cyanAccent/40 text-cyanAccent font-medium">
                      15MS VITALS
                    </span>
                  </div>

                  {/* Module 3B 3D Volumetric Cylinder & Portal UI Diagram */}
                  <div className="relative z-10 h-[86px] w-full flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 380 84" fill="none">
                      {/* Node 1 */}
                      <rect x="38" y="24" width="88" height="40" rx="5" fill="#06080d" stroke="rgba(255,255,255,0.07)" />
                      <rect x="38" y="19" width="88" height="40" rx="5" fill="#10141d" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
                      <text x="82" y="36" textAnchor="middle" fill="#f1f5f9" fontFamily="JetBrains Mono, monospace" fontSize="8.2" fontWeight="600">
                        ext_database
                      </text>
                      <text x="82" y="50" textAnchor="middle" fill="#64748b" fontFamily="JetBrains Mono, monospace" fontSize="7.2">
                        [PK] id
                      </text>

                      {/* Stream 1 */}
                      <line x1="126" y1="39" x2="164" y2="39" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="3 2" className="animate-stream" />
                      <polygon points="164,39 158,36 158,42" fill="#38bdf8" />

                      {/* Center 3D Cylinder */}
                      <g transform="translate(173, 18)" className="float-3d">
                        <ellipse cx="17" cy="38" rx="18" ry="5" fill="rgba(56,189,248,0.12)" />
                        <ellipse cx="17" cy="6" rx="16" ry="5.5" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth="1.4" />
                        <path d="M1 6V19C1 22 8.2 24.5 17 24.5C25.8 24.5 33 22 33 19V6" fill="rgba(14, 32, 48, 0.85)" stroke="#38bdf8" strokeWidth="1.4" />
                        <path d="M1 19V32C1 35 8.2 37.5 17 37.5C25.8 37.5 33 35 33 32V19" fill="rgba(14, 32, 48, 0.9)" stroke="#38bdf8" strokeWidth="1.4" />
                        <circle cx="17" cy="15" r="1.5" fill="#bae6fd" />
                        <circle cx="17" cy="28" r="1.5" fill="#bae6fd" />
                      </g>

                      {/* Stream 2 */}
                      <line x1="214" y1="39" x2="250" y2="39" stroke="rgba(56,189,248,0.65)" strokeWidth="1.3" strokeDasharray="3 2" className="animate-stream" />
                      <polygon points="250,39 244,36 244,42" fill="#e2e8f0" />

                      {/* Node 2: Portal */}
                      <rect x="254" y="24" width="88" height="40" rx="5" fill="#06080d" stroke="rgba(255,255,255,0.07)" />
                      <rect x="254" y="19" width="88" height="40" rx="5" fill="#10141d" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                      <text x="298" y="36" textAnchor="middle" fill="#f1f5f9" fontFamily="JetBrains Mono, monospace" fontSize="8.2" fontWeight="600">
                        Portal
                      </text>
                      <text x="298" y="50" textAnchor="middle" fill="#64748b" fontFamily="JetBrains Mono, monospace" fontSize="7.2">
                        Client UI
                      </text>
                    </svg>
                  </div>

                  {/* Module 3B Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#7c8492]">SCHEMAS: NOMINAL</span>
                    <span className="text-white font-semibold tracking-wider">15ms VITALS</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="layer-z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mb-2.5"
                  >
                    <h3 className="card-serif-title text-[26px] sm:text-[29px] text-white transition-all duration-300 group-hover:text-cyanAccent group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                      Custom Software &amp; Portals
                    </h3>
                    <span className="block h-[1.5px] w-0 bg-cyanAccent transition-all duration-300 group-hover:w-full mt-1 opacity-80" />
                  </motion.div>
                  <p className="text-[#8e96a4] text-[14px] sm:text-[14.5px] leading-[1.65] mb-6 font-sans">
                    Bespoke client dashboards, internal administrative portals, and scalable cloud systems built with secure relational database schemas.
                  </p>
                </div>
              </div>

              {/* Deliverable Capabilities + Card Footer */}
              <div className="relative z-10 layer-z-10">
                <div className="border-t border-white/[0.08] pt-4 mb-5">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#5e6673] mb-3">
                    // DELIVERABLE CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[11px] text-[#d4dae3]">
                    {SERVICE_SPEC_DATA['03'].capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/[0.015] px-2.5 py-1.5 rounded-md border border-white/[0.04]"
                      >
                        <span className="text-cyanAccent font-bold">+</span>
                        <span>{cap.replace(/^\+\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Trigger Bar */}
                <div className="border-t border-white/[0.08] pt-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em]">
                  <span className="text-[#8e96a4] group-hover:text-white transition-colors">
                    CLICK TO POP UP SPEC
                  </span>
                  <span className="text-cyanAccent font-semibold">SPEC_READY</span>
                </div>
              </div>
            </article>

            {/* ═══════════════════════════════════════════════════════════════════
                 CARD [04] — Enterprise AI Solutions (Electric Violet Accent)
                 ═══════════════════════════════════════════════════════════════════ */}
            <article
              ref={(el) => {
                cardRefs.current['04'] = el
              }}
              data-card-id="04"
              onMouseMove={(e) => handleCardMouseMove('04', e)}
              onMouseEnter={() => handleCardMouseEnter('04')}
              onMouseLeave={() => handleCardMouseLeave('04')}
              onClick={() => {
                setActiveCardId('04')
                setSpecModalCardId('04')
              }}
              className={`card-3d-chassis p-6 sm:p-8 flex flex-col justify-between cursor-pointer group ${
                activeCardId === '04' ? 'active-violet' : ''
              }`}
            >
              <div className="relative z-10">
                {/* Outer Primary Top Bar (Layer Z-10) */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] mb-3.5">
                  <span className="text-[#94a3b8] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violetAccent shadow-[0_0_8px_#a855f7]" />
                    <span>NEURAL • RAG • LLM</span>
                  </span>
                  <span className="text-violetAccent font-semibold px-2 py-0.5 rounded bg-violetAccent/10 border border-violetAccent/30">
                    [04]
                  </span>
                </div>

                {/* MODULE 4A: VECTOR /TEXTEMBED-VLM (Layer Z-20) */}
                <div className="layer-z-20 telemetry-chamber-3d p-3.5 sm:p-4 mb-3.5">
                  <div className="chamber-floor-grid" />

                  {/* Module 4A Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] mb-1.5">
                    <span className="text-[#8e96a4] flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-violetAccent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                      <span>VECTOR /TEXTEMBED-VLM</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-violetAccent/15 border border-violetAccent/45 text-[#e9d5ff] font-medium">
                      95504L - 4.2UI
                    </span>
                  </div>

                  {/* Module 4A Live 3D Rotating Vector Point Cloud */}
                  <div className="relative z-10 h-[86px] w-full flex items-center justify-center">
                    <canvas ref={vecCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                    <svg className="relative z-10 w-full h-full overflow-visible" viewBox="0 0 380 84" fill="none">
                      <text x="94" y="45" textAnchor="end" fill="#94a3b8" fontFamily="JetBrains Mono, monospace" fontSize="7.5" letterSpacing="0.06em">
                        EMBED_DB
                      </text>

                      {/* Vector Cube Bounding Box */}
                      <rect
                        x="108"
                        y="13"
                        width="164"
                        height="56"
                        rx="6"
                        fill="rgba(168, 85, 247, 0.045)"
                        stroke="rgba(168, 85, 247, 0.35)"
                        strokeWidth="1.1"
                        strokeDasharray="3 2"
                      />

                      {/* Vector Graph Overlay */}
                      <line x1="132" y1="45" x2="168" y2="26" stroke="rgba(168,85,247,0.55)" strokeWidth="1.1" />
                      <line x1="132" y1="45" x2="180" y2="57" stroke="rgba(168,85,247,0.45)" strokeWidth="1.1" />
                      <line x1="168" y1="26" x2="212" y2="37" stroke="#c084fc" strokeWidth="1.4" />
                      <line x1="180" y1="57" x2="212" y2="37" stroke="#c084fc" strokeWidth="1.4" />
                      <line x1="212" y1="37" x2="248" y2="47" stroke="rgba(168,85,247,0.6)" strokeWidth="1.2" />

                      <circle cx="132" cy="45" r="3.5" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.4" />
                      <circle cx="168" cy="26" r="3.4" fill="#d8b4fe" className="pulse-halo" />
                      <circle cx="180" cy="57" r="2.8" fill="#9333ea" />
                      <circle cx="212" cy="37" r="4" fill="#ffffff" stroke="#a855f7" strokeWidth="1.4" />
                      <circle cx="248" cy="47" r="3" fill="#1e1b2e" stroke="#c084fc" strokeWidth="1.3" />

                      <text x="286" y="45" textAnchor="start" fill="#94a3b8" fontFamily="JetBrains Mono, monospace" fontSize="7.5" letterSpacing="0.06em">
                        PARSED_DATA
                      </text>
                    </svg>
                  </div>

                  {/* Module 4A Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#c084fc] font-semibold">PRIVATE EMBEDDINGS_DB</span>
                    <span className="text-[#8e96a4]">SCRAPED DATA</span>
                  </div>
                </div>

                {/* Secondary Meta Bar */}
                <div className="layer-z-10 flex items-center justify-between font-mono text-[10.5px] tracking-[0.12em] mb-2.5 px-1">
                  <span className="text-[#8e96a4]">PERKLNOVK • DARKEDGE • ZP</span>
                  <span className="text-[#7c8492]">[03]</span>
                </div>

                {/* MODULE 4B: NN://GRAPH-LATTICE (Layer Z-30 Elevated) */}
                <div className="layer-z-30 telemetry-chamber-3d p-3.5 sm:p-4 mb-6">
                  <div className="chamber-floor-grid" />

                  {/* Module 4B Header */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] mb-1.5">
                    <span className="text-[#7c8492]">NN://GRAPH-LATTICE</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/15 text-[#94a3b8]">
                      01 0700: REPOD:00
                    </span>
                  </div>

                  {/* Module 4B 3D Volumetric Neural Lattice Graph */}
                  <div className="relative z-10 h-[86px] w-full flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 380 84" fill="none">
                      <defs>
                        <filter id="violetLatticeGlow" x="-40%" y="-40%" width="180%" height="180%">
                          <feGaussianBlur stdDeviation="3.8" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Outer 3D Depth Lattice Web */}
                      <line x1="96" y1="19" x2="158" y2="13" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                      <line x1="96" y1="65" x2="158" y2="71" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                      <line x1="158" y1="13" x2="222" y2="23" stroke="rgba(168,85,247,0.28)" strokeWidth="1" />
                      <line x1="158" y1="71" x2="222" y2="61" stroke="rgba(168,85,247,0.28)" strokeWidth="1" />

                      {/* Firing Synaptic Core Pathways */}
                      <line x1="96" y1="42" x2="158" y2="30" stroke="#a855f7" strokeWidth="1.5" />
                      <line x1="96" y1="42" x2="158" y2="54" stroke="#a855f7" strokeWidth="1.5" />
                      <line x1="96" y1="19" x2="158" y2="30" stroke="rgba(168,85,247,0.45)" strokeWidth="1" />
                      <line x1="96" y1="65" x2="158" y2="54" stroke="rgba(168,85,247,0.45)" strokeWidth="1" />

                      <line x1="158" y1="30" x2="222" y2="42" stroke="#d8b4fe" strokeWidth="1.8" strokeDasharray="4 2" className="animate-stream" />
                      <line x1="158" y1="54" x2="222" y2="42" stroke="#d8b4fe" strokeWidth="1.8" strokeDasharray="4 2" className="animate-stream" />
                      <line x1="158" y1="30" x2="222" y2="23" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
                      <line x1="158" y1="54" x2="222" y2="61" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />

                      <line x1="222" y1="42" x2="284" y2="42" stroke="#f3e8ff" strokeWidth="2.4" filter="url(#violetLatticeGlow)" />
                      <line x1="222" y1="23" x2="284" y2="42" stroke="rgba(168,85,247,0.45)" strokeWidth="1.1" />
                      <line x1="222" y1="61" x2="284" y2="42" stroke="rgba(168,85,247,0.45)" strokeWidth="1.1" />

                      {/* Nodes */}
                      <circle cx="96" cy="19" r="2.8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.2" />
                      <circle cx="96" cy="42" r="4.5" fill="#c084fc" filter="url(#violetLatticeGlow)" />
                      <circle cx="96" cy="65" r="2.8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.2" />

                      <circle cx="158" cy="13" r="2.4" fill="#1e1b2e" stroke="#7e22ce" strokeWidth="1.1" />
                      <circle cx="158" cy="30" r="4.5" fill="#d8b4fe" filter="url(#violetLatticeGlow)" />
                      <circle cx="158" cy="54" r="4.5" fill="#d8b4fe" filter="url(#violetLatticeGlow)" />
                      <circle cx="158" cy="71" r="2.4" fill="#1e1b2e" stroke="#7e22ce" strokeWidth="1.1" />

                      <circle cx="222" cy="23" r="2.8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.2" />
                      <circle cx="222" cy="42" r="5.2" fill="#e9d5ff" filter="url(#violetLatticeGlow)" />
                      <circle cx="222" cy="61" r="2.8" fill="#1e1b2e" stroke="#a855f7" strokeWidth="1.2" />

                      {/* Singularity Node */}
                      <circle cx="284" cy="42" r="8" fill="rgba(168,85,247,0.35)" className="pulse-halo" />
                      <circle cx="284" cy="42" r="5" fill="#ffffff" stroke="#c084fc" strokeWidth="1.8" filter="url(#violetLatticeGlow)" />
                    </svg>
                  </div>

                  {/* Module 4B Footer */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9.5px] tracking-[0.08em] pt-1 border-t border-white/[0.05]">
                    <span className="text-[#7c8492]">DATA: 30.800 00120</span>
                    <span className="text-white font-semibold tracking-wider">48ms RUNTIME</span>
                  </div>
                </div>

                {/* Card Title & Description */}
                <div className="layer-z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mb-2.5"
                  >
                    <h3 className="card-serif-title text-[26px] sm:text-[29px] text-white transition-all duration-300 group-hover:text-violetAccent group-hover:drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                      Enterprise AI Solutions
                    </h3>
                    <span className="block h-[1.5px] w-0 bg-violetAccent transition-all duration-300 group-hover:w-full mt-1 opacity-80" />
                  </motion.div>
                  <p className="text-[#8e96a4] text-[14px] sm:text-[14.5px] leading-[1.65] mb-6 font-sans">
                    Domain-grounded AI assistants, automated data extraction agents, and retrieval augmented intelligence strictly isolated on private company data.
                  </p>
                </div>
              </div>

              {/* Deliverable Capabilities + Card Footer */}
              <div className="relative z-10 layer-z-10">
                <div className="border-t border-white/[0.08] pt-4 mb-5">
                  <div className="font-mono text-[9.5px] tracking-[0.14em] text-[#5e6673] mb-3">
                    // DELIVERABLE CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-[11px] text-[#d4dae3]">
                    {SERVICE_SPEC_DATA['04'].capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/[0.015] px-2.5 py-1.5 rounded-md border border-white/[0.04]"
                      >
                        <span className="text-violetAccent font-bold">+</span>
                        <span>{cap.replace(/^\+\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Spec Trigger Bar */}
                <div className="border-t border-white/[0.08] pt-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em]">
                  <span className="text-[#8e96a4] group-hover:text-white transition-colors">
                    CLICK TO VIEW SPEC
                  </span>
                  <span className="text-violetAccent font-semibold">SPEC_READY</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          3. 3D ARCHITECTURAL SPECIFICATION MODAL
          ───────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalSpec && (
          <div
            id="specModalBackdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSpecModalCardId(null)
            }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[680px] rounded-2xl bg-gradient-to-b from-[#131722] to-[#090b10] border border-white/15 p-6 sm:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.95)] relative max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px]"
                    style={{
                      backgroundColor: modalSpec.accentColor,
                      boxShadow: `0 0 10px ${modalSpec.accentColor}`,
                    }}
                  />
                  <span className="text-neutral-200 tracking-wider">{modalSpec.meta}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="font-semibold"
                    style={{ color: modalSpec.accentColor }}
                  >
                    {modalSpec.index}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSpecModalCardId(null)}
                    className="text-neutral-400 hover:text-white px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[10px] flex items-center gap-1"
                  >
                    <span>ESC</span>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="card-serif-title text-3xl sm:text-4xl text-white mb-3"
                style={{
                  textShadow: `0 0 25px ${modalSpec.accentColor}40`,
                }}
              >
                {modalSpec.title}
              </motion.h3>
              <p className="text-neutral-400 text-sm sm:text-[15px] leading-relaxed mb-6 font-sans">
                {modalSpec.description}
              </p>

              {/* Telemetry Blocks */}
              <div className="space-y-3.5 mb-6">
                {modalSpec.telemetryBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="telemetry-chamber-3d p-4 font-mono text-[11px] space-y-2"
                  >
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>{block.topLeft}</span>
                      <span className="px-2 py-0.5 rounded border border-white/15 text-white">
                        {block.topRight}
                      </span>
                    </div>
                    {block.midNodes && (
                      <div className="py-2 text-center text-xs text-white/95 border-y border-white/5 font-semibold">
                        {block.midNodes}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>{block.bottomLeft}</span>
                      <span
                        className="font-semibold"
                        style={{ color: modalSpec.accentColor }}
                      >
                        {block.bottomRight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverable Capabilities */}
              <div className="border-t border-white/10 pt-4">
                <div className="font-mono text-[10px] tracking-[0.14em] text-neutral-500 mb-3">
                  // DELIVERABLE CAPABILITIES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs text-neutral-200">
                  {modalSpec.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-2"
                    >
                      <Check
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: modalSpec.accentColor }}
                      />
                      <span>{cap.replace(/^\+\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/10 mt-6 pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
                <span className="text-neutral-400">• FOUR FRONT LAB / 2026</span>
                <div className="flex items-center gap-4">
                  <span
                    className="font-semibold"
                    style={{ color: modalSpec.accentColor }}
                  >
                    {modalSpec.status}
                  </span>
                  <Link
                    href="#contact"
                    onClick={() => setSpecModalCardId(null)}
                    className="px-4 py-2 rounded-lg font-mono text-xs font-bold text-black flex items-center gap-1.5 transition-transform hover:scale-[1.03]"
                    style={{ backgroundColor: modalSpec.accentColor }}
                  >
                    <span>LET&apos;S TALK</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

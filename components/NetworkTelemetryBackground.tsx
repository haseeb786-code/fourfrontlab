'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from './ThemeProvider'

// ─────────────────────────────────────────────────────────────────────────────
// FOUR FRONT LAB - INTERACTIVE DATA PACKET & TELEMETRY STREAM SIMULATION
// Pure HTML5 Canvas 2D engine with 60 FPS physics, packet routing, and mouse shockwaves
// Active in Start & Middle (Hero, Services, Portfolio, Team) - Fades out before End
// ─────────────────────────────────────────────────────────────────────────────

interface Hub {
  x: number
  y: number
  label: string
  conn: 'ai' | 'cloud' | 'queue'
  angle: number
  phase: number
}

interface SensorNode {
  x: number
  y: number
  origX: number
  origY: number
  vx: number
  vy: number
  name: string
  conn: 'ai' | 'cloud' | 'queue'
  cat: string
  size: number
  phase: number
  speed: number
  hubIdx: number
  alive: boolean
  respawnTimer: number
}

interface Packet {
  fx: number
  fy: number
  tx: number
  ty: number
  p: number
  sp: number
  conn: 'ai' | 'cloud' | 'queue'
  stage: 'sensor-hub' | 'hub-core'
}

interface Blast {
  x: number
  y: number
  age: number
  max: number
}

// Four Front Lab Tech Nodes
const TECH_NODES_DEF: Array<{ name: string; cat: string; conn: 'ai' | 'cloud' | 'queue' }> = [
  // AI & RAG Pipeline Nodes
  { name: 'FastAPI', cat: 'ai', conn: 'ai' },
  { name: 'pgvector', cat: 'ai', conn: 'ai' },
  { name: 'OpenAI API', cat: 'ai', conn: 'ai' },
  { name: 'Gemini 1.5', cat: 'ai', conn: 'ai' },
  { name: 'LangChain', cat: 'ai', conn: 'ai' },
  { name: 'Embeddings', cat: 'ai', conn: 'ai' },
  { name: 'LLM Orchestrator', cat: 'ai', conn: 'ai' },
  { name: 'Token Stream', cat: 'ai', conn: 'ai' },

  // Cloud SaaS & Production Web Nodes
  { name: 'Next.js 15', cat: 'saas', conn: 'cloud' },
  { name: 'React 18', cat: 'saas', conn: 'cloud' },
  { name: 'TypeScript', cat: 'saas', conn: 'cloud' },
  { name: 'Prisma ORM', cat: 'saas', conn: 'cloud' },
  { name: 'PostgreSQL', cat: 'saas', conn: 'cloud' },
  { name: 'Tailwind CSS', cat: 'saas', conn: 'cloud' },
  { name: 'Docker Engine', cat: 'saas', conn: 'cloud' },
  { name: 'Vercel Edge', cat: 'saas', conn: 'cloud' },
  { name: 'GraphQL', cat: 'saas', conn: 'cloud' },

  // Autonomous Event Queues & Infrastructure
  { name: 'WebSockets', cat: 'infra', conn: 'queue' },
  { name: 'Webhook Queue', cat: 'infra', conn: 'queue' },
  { name: 'Redis Cache', cat: 'infra', conn: 'queue' },
  { name: 'Cron Worker', cat: 'infra', conn: 'queue' },
  { name: 'Event Bridge', cat: 'infra', conn: 'queue' },
  { name: 'Telemetry Daemon', cat: 'infra', conn: 'queue' },
  { name: 'API Gateway', cat: 'infra', conn: 'queue' },
]

export default function NetworkTelemetryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const stateRef = useRef<{
    sensors: SensorNode[]
    hubs: Hub[]
    core: { x: number; y: number }
    packets: Packet[]
    blasts: Blast[]
    mouse: { x: number; y: number; active: boolean }
    frame: number
    init: boolean
    coreSurge: number
  }>({
    sensors: [],
    hubs: [],
    core: { x: 0, y: 0 },
    packets: [],
    blasts: [],
    mouse: { x: -9999, y: -9999, active: false },
    frame: 0,
    init: false,
    coreSurge: 0,
  })

  const animFrameId = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === 'dark' : true

  // Colors based on theme
  const palette = isDark
    ? {
        primary: { r: 200, g: 245, b: 66 }, // Signature Acid Green (#c8f542)
        cyan: { r: 56, g: 189, b: 248 },    // Electric Cyan (#38bdf8)
        gold: { r: 234, g: 179, b: 8 },     // Amber Gold (#eab308)
        lineHub: 'rgba(200, 245, 66, 0.08)',
        lineCore: 'rgba(234, 179, 8, 0.12)',
      }
    : {
        primary: { r: 16, g: 185, b: 129 }, // Emerald
        cyan: { r: 14, g: 116, b: 144 },    // Deep Cyan
        gold: { r: 180, g: 83, b: 9 },      // Deep Amber
        lineHub: 'rgba(16, 185, 129, 0.1)',
        lineCore: 'rgba(180, 83, 9, 0.14)',
      }

  // Layout distribution of hubs and tech nodes across the screen
  const initPositions = useCallback((width: number, height: number) => {
    const s = stateRef.current
    const cx = width / 2
    const cy = height / 2
    s.core = { x: cx, y: cy }

    const hubOrbitRadius = 0.33 * Math.min(width, height)
    s.hubs = [
      { label: 'AI & RAG Pipeline', conn: 'ai' as const, angle: -(0.75 * Math.PI), phase: 0, x: 0, y: 0 },
      { label: 'Cloud SaaS Backbone', conn: 'cloud' as const, angle: 0.05 * Math.PI, phase: 2, x: 0, y: 0 },
      { label: 'Autonomous Queues', conn: 'queue' as const, angle: 0.68 * Math.PI, phase: 4, x: 0, y: 0 },
    ].map((h) => ({
      ...h,
      x: cx + Math.cos(h.angle) * hubOrbitRadius,
      y: cy + Math.sin(h.angle) * hubOrbitRadius,
    }))

    const total = TECH_NODES_DEF.length
    const cols = Math.ceil(Math.sqrt((width / height) * total))
    const rows = Math.ceil(total / cols)
    const cellW = (width - 140) / cols
    const cellH = (height - 140) / rows

    s.sensors = TECH_NODES_DEF.map((node, i) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      const baseX = 70 + col * cellW + cellW * 0.5
      const baseY = 70 + row * cellH + cellH * 0.5
      const jitterX = (Math.random() - 0.5) * cellW * 0.65
      const jitterY = (Math.random() - 0.5) * cellH * 0.65
      const finalX = Math.max(60, Math.min(width - 60, baseX + jitterX))
      const finalY = Math.max(60, Math.min(height - 60, baseY + jitterY))

      const hubIndex = s.hubs.findIndex((h) => h.conn === node.conn)

      return {
        x: finalX,
        y: finalY,
        origX: finalX,
        origY: finalY,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        name: node.name,
        conn: node.conn,
        cat: node.cat,
        size: 4 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.01,
        hubIdx: hubIndex >= 0 ? hubIndex : 0,
        alive: true,
        respawnTimer: 0,
      }
    })

    s.packets = []
    s.blasts = []
    s.init = true
  }, [])

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const s = stateRef.current
    let width = 0
    let height = 0

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (s.init) {
        const cx = width / 2
        const cy = height / 2
        s.core = { x: cx, y: cy }
        const r = 0.33 * Math.min(width, height)
        const angles = [-(0.75 * Math.PI), 0.05 * Math.PI, 0.68 * Math.PI]
        s.hubs.forEach((hub, idx) => {
          hub.x = cx + Math.cos(angles[idx]) * r
          hub.y = cy + Math.sin(angles[idx]) * r
        })
      } else {
        initPositions(width, height)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Global cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      s.mouse = { x: e.clientX, y: e.clientY, active: true }
    }
    const handleMouseLeave = () => {
      s.mouse.active = false
    }

    // Click triggers manual detonation blast on nearby nodes
    const handleClick = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      for (const node of s.sensors) {
        if (!node.alive) continue
        const dist = Math.hypot(node.x - mx, node.y - my)
        if (dist < 80) {
          node.alive = false
          node.respawnTimer = 180
          s.blasts.push({ x: node.x, y: node.y, age: 0, max: 60 })
        }
      }
    }

    // Scroll fade-out detection: Active in start & middle, fades out at the end
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const scrollFraction = window.scrollY / docHeight
      // When scroll passes 75% (entering Contact/Footer area), fade out completely
      setIsVisible(scrollFraction < 0.76)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation variables
    let globalTime = 0

    const render = () => {
      s.frame++
      globalTime += 0.02
      ctx.clearRect(0, 0, width, height)

      const { sensors, hubs, core, packets, blasts, mouse } = s

      // ─────────────────────────────────────────────────────────────────────
      // 1. UPDATE TECH NODES (Physics, Border Bounce & Mouse Repulsion)
      // ─────────────────────────────────────────────────────────────────────
      for (const node of sensors) {
        if (!node.alive) {
          node.respawnTimer--
          if (node.respawnTimer <= 0) {
            node.alive = true
            node.x = node.origX
            node.y = node.origY
            node.vx = (Math.random() - 0.5) * 0.3
            node.vy = (Math.random() - 0.5) * 0.3
          }
          continue
        }

        // Float drift
        node.x += node.vx
        node.y += node.vy
        node.phase += node.speed

        // Cursor Repulsion & Detonation
        if (mouse.active) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.hypot(dx, dy)

          // Smooth magnetic push away
          if (dist < 180 && dist > 0) {
            const push = (1 - dist / 180) * 0.4
            node.x += (dx / dist) * push
            node.y += (dy / dist) * push
          }

          // Detonation blast on direct cursor touch
          if (dist < 26) {
            node.alive = false
            node.respawnTimer = 180
            blasts.push({ x: node.x, y: node.y, age: 0, max: 60 })
          }
        }

        // Screen boundary soft bounce
        if (node.x < 30 || node.x > width - 30) node.vx *= -1
        if (node.y < 30 || node.y > height - 30) node.vy *= -1
        node.x = Math.max(30, Math.min(width - 30, node.x))
        node.y = Math.max(30, Math.min(height - 30, node.y))
      }

      // ─────────────────────────────────────────────────────────────────────
      // 2. DRAW CONNECTIVITY MESH (Node -> Hub Lines)
      // ─────────────────────────────────────────────────────────────────────
      for (const node of sensors) {
        if (!node.alive) continue
        const hub = hubs[node.hubIdx]
        if (!hub) continue

        const dist = Math.hypot(node.x - hub.x, node.y - hub.y)
        const maxDist = 0.65 * Math.max(width, height)

        if (dist < maxDist) {
          const alpha = 0.05 * (1 - dist / maxDist)
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(hub.x, hub.y)
          ctx.strokeStyle = `rgba(${palette.cyan.r}, ${palette.cyan.g}, ${palette.cyan.b}, ${alpha})`
          ctx.lineWidth = 0.5

          // Protocol dash styles
          if (node.conn === 'ai') {
            ctx.setLineDash([2, 5])
          } else if (node.conn === 'cloud') {
            ctx.setLineDash([])
          } else {
            ctx.setLineDash([4, 4])
          }
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // ─────────────────────────────────────────────────────────────────────
      // 3. DRAW HUB -> CORE BACKBONE LINES
      // ─────────────────────────────────────────────────────────────────────
      for (const hub of hubs) {
        ctx.beginPath()
        ctx.moveTo(hub.x, hub.y)
        ctx.lineTo(core.x, core.y)
        ctx.strokeStyle = palette.lineCore
        ctx.lineWidth = 0.8
        ctx.setLineDash([6, 6])
        ctx.stroke()
        ctx.setLineDash([])

        // Telemetry Stream Tag on backbone
        const mx = (hub.x + core.x) / 2
        const my = (hub.y + core.y) / 2
        ctx.font = 'bold 7px monospace'
        ctx.fillStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.22)`
        ctx.textAlign = 'center'
        ctx.fillText('LIVE TELEMETRY STREAM', mx, my - 6)
      }

      // ─────────────────────────────────────────────────────────────────────
      // 4. DRAW SENSOR NODES (Glowing Orbs & Labels)
      // ─────────────────────────────────────────────────────────────────────
      for (const node of sensors) {
        if (!node.alive) continue

        let mouseProximity = 0
        if (mouse.active) {
          const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y)
          if (dist < 130) mouseProximity = 1 - dist / 130
        }

        const pulse = 0.5 + 0.5 * Math.sin(node.phase)
        const alpha = Math.min(0.25 + 0.3 * pulse + 0.5 * mouseProximity, 1)
        const scale = 1 + 0.4 * mouseProximity
        const color = node.conn === 'ai' ? palette.primary : palette.cyan

        // Glowing outer aura
        const auraRadius = (node.size + 4) * scale
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, auraRadius * 2)
        grad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.45})`)
        grad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        ctx.beginPath()
        ctx.arc(node.x, node.y, auraRadius * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Solid core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
        ctx.fill()
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`
        ctx.lineWidth = 0.6
        ctx.stroke()

        // Node Label
        ctx.font = `bold ${8 + (mouseProximity > 0 ? 1 : 0)}px monospace`
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(alpha * 1.2, 0.95)})`
        ctx.textAlign = 'center'
        ctx.fillText(node.name, node.x, node.y - node.size * scale - 5)

        // Protocol badge
        ctx.font = 'bold 6px monospace'
        ctx.fillStyle = isDark ? 'rgba(156, 163, 175, 0.4)' : 'rgba(71, 85, 105, 0.5)'
        ctx.fillText(node.conn.toUpperCase(), node.x, node.y + node.size * scale + 8)
      }

      // ─────────────────────────────────────────────────────────────────────
      // 5. DRAW PROTOCOL HUBS (Rotating Radar Stations)
      // ─────────────────────────────────────────────────────────────────────
      for (const hub of hubs) {
        hub.phase += 0.015
        const radarR = 15 + 4 * Math.sin(hub.phase)

        // Outer radar pulse circle
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, radarR + 10, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, ${
          (0.08 + 0.04 * Math.sin(hub.phase)) * 0.7
        })`
        ctx.lineWidth = 0.6
        ctx.stroke()

        // Inner solid hub circle
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, radarR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.25)`
        ctx.lineWidth = 1
        ctx.stroke()

        // Center hub dot
        ctx.beginPath()
        ctx.arc(hub.x, hub.y, 5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.55)`
        ctx.fill()

        // Multi-bar server LED activity meters
        for (let i = -2; i <= 2; i++) {
          ctx.fillStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.15)`
          ctx.fillRect(hub.x - 7, hub.y + 4.5 * i - 1.5, 14, 2.5)

          // Blinking green/gold LED
          ctx.beginPath()
          ctx.arc(hub.x + 4.5, hub.y + 4.5 * i - 0.25, 0.9, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, ${
            0.4 + 0.3 * Math.sin(hub.phase + i * 1.5)
          })`
          ctx.fill()
        }

        // Hub Label
        ctx.font = 'bold 9px monospace'
        ctx.fillStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.75)`
        ctx.textAlign = 'center'
        ctx.fillText(hub.label, hub.x, hub.y + radarR + 18)
      }

      // ─────────────────────────────────────────────────────────────────────
      // 6. DRAW FOUR FRONT LAB CENTRAL CORE
      // ─────────────────────────────────────────────────────────────────────
      const { x: cx, y: cy } = core
      const surge = s.coreSurge > 0 ? s.coreSurge : 0
      if (s.coreSurge > 0) s.coreSurge -= 0.03

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(0.25 * globalTime)

      // Outer rotating hexagon
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const rad = 42 + surge * 8
        if (i === 0) ctx.moveTo(rad * Math.cos(angle), rad * Math.sin(angle))
        else ctx.lineTo(rad * Math.cos(angle), rad * Math.sin(angle))
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, ${
        0.25 + surge * 0.45
      })`
      ctx.lineWidth = 1.3
      ctx.stroke()
      ctx.restore()

      // Orbiting planetary dashed ring
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.15 * globalTime)
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.arc(0, 0, 56, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, 0.12)`
      ctx.lineWidth = 0.6
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()

      // Inner concentric rings
      ctx.beginPath()
      ctx.arc(cx, cy, 32 + surge * 4, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, ${0.3 + surge * 0.5})`
      ctx.lineWidth = 1.2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, 22, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.18)`
      ctx.lineWidth = 0.6
      ctx.stroke()

      // Technical reticle crosshairs
      ctx.strokeStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, 0.12)`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(cx - 36, cy)
      ctx.lineTo(cx + 36, cy)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx, cy - 36)
      ctx.lineTo(cx, cy + 36)
      ctx.stroke()

      // Core pulsing center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 6 + surge * 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, ${
        0.65 + surge * 0.35 + 0.1 * Math.sin(2 * globalTime)
      })`
      ctx.fill()

      // Core radial breathing ambient glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70 + surge * 20)
      coreGlow.addColorStop(0, `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, ${0.12 + surge * 0.25})`)
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 70 + surge * 20, 0, Math.PI * 2)
      ctx.fillStyle = coreGlow
      ctx.fill()

      // Core Typography Labels
      ctx.font = 'bold 12px monospace'
      ctx.fillStyle = `rgba(${palette.primary.r}, ${palette.primary.g}, ${palette.primary.b}, 0.65)`
      ctx.textAlign = 'center'
      ctx.fillText('FOUR FRONT LAB', cx, cy + 36 + 32)

      ctx.font = 'bold 7px monospace'
      ctx.fillStyle = `rgba(${palette.gold.r}, ${palette.gold.g}, ${palette.gold.b}, 0.45)`
      ctx.fillText('TELEMETRY CORE ENGINE', cx, cy + 36 + 44)

      // ─────────────────────────────────────────────────────────────────────
      // 7. SPAWN DATA PACKETS ("FIRING BALLS")
      // ─────────────────────────────────────────────────────────────────────
      // Every 45 frames, spawn a new packet from a live node to its Hub
      if (s.frame % 42 === 0) {
        const liveNodes = sensors.filter((n) => n.alive)
        if (liveNodes.length > 0) {
          const originNode = liveNodes[Math.floor(Math.random() * liveNodes.length)]
          const targetHub = hubs[originNode.hubIdx]
          if (targetHub) {
            packets.push({
              fx: originNode.x,
              fy: originNode.y,
              tx: targetHub.x,
              ty: targetHub.y,
              p: 0,
              sp: 0.007 + Math.random() * 0.005,
              conn: originNode.conn,
              stage: 'sensor-hub',
            })
          }
        }
      }

      // ─────────────────────────────────────────────────────────────────────
      // 8. UPDATE & DRAW DATA PACKETS WITH COMET TAILS
      // ─────────────────────────────────────────────────────────────────────
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i]
        pkt.p += pkt.sp

        // When packet reaches destination
        if (pkt.p >= 1) {
          if (pkt.stage === 'sensor-hub') {
            // Stage 2: Hub ingests packet and fires an energized golden packet to Core
            const sourceHub = hubs.find((h) => h.conn === pkt.conn)
            if (sourceHub) {
              packets.push({
                fx: sourceHub.x,
                fy: sourceHub.y,
                tx: core.x,
                ty: core.y,
                p: 0,
                sp: 0.005 + Math.random() * 0.003,
                conn: pkt.conn,
                stage: 'hub-core',
              })
            }
            packets.splice(i, 1)
          } else {
            // Packet hits central Core: trigger core surge glow!
            s.coreSurge = 0.35
            packets.splice(i, 1)
          }
          continue
        }

        // Current packet position
        const px = pkt.fx + (pkt.tx - pkt.fx) * pkt.p
        const py = pkt.fy + (pkt.ty - pkt.fy) * pkt.p

        // Tail position (trailing 4% behind)
        const tailP = Math.max(0, pkt.p - 0.05)
        const tailX = pkt.fx + (pkt.tx - pkt.fx) * tailP
        const tailY = pkt.fy + (pkt.ty - pkt.fy) * tailP

        const pktColor = pkt.stage === 'hub-core' ? palette.gold : palette.primary
        const pktRadius = pkt.stage === 'hub-core' ? 4 : 3

        // Glowing packet aura
        const aura = ctx.createRadialGradient(px, py, 0, px, py, pktRadius + 4)
        aura.addColorStop(0, `rgba(${pktColor.r}, ${pktColor.g}, ${pktColor.b}, 0.8)`)
        aura.addColorStop(1, `rgba(${pktColor.r}, ${pktColor.g}, ${pktColor.b}, 0)`)
        ctx.beginPath()
        ctx.arc(px, py, pktRadius + 4, 0, Math.PI * 2)
        ctx.fillStyle = aura
        ctx.fill()

        // Solid packet head
        ctx.beginPath()
        ctx.arc(px, py, pktRadius * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`
        ctx.fill()

        // Trailing laser comet motion trail
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(px, py)
        ctx.strokeStyle = `rgba(${pktColor.r}, ${pktColor.g}, ${pktColor.b}, 0.45)`
        ctx.lineWidth = pkt.stage === 'hub-core' ? 2 : 1.3
        ctx.stroke()
      }

      // ─────────────────────────────────────────────────────────────────────
      // 9. DRAW DETONATION BLAST SHOCKWAVES & PARTICLES
      // ─────────────────────────────────────────────────────────────────────
      for (let i = blasts.length - 1; i >= 0; i--) {
        const b = blasts[i]
        b.age++
        if (b.age >= b.max) {
          blasts.splice(i, 1)
          continue
        }

        const t = b.age / b.max
        const fade = 1 - t

        // 16 radial spark lines shooting outwards
        for (let j = 0; j < 16; j++) {
          const angle = (2 * Math.PI * j) / 16
          const dist = (40 + 60 * t) * (0.5 + 0.5 * Math.sin(2.5 * j + 0.2 * b.age))
          const sx = b.x + Math.cos(angle) * dist
          const sy = b.y + Math.sin(angle) * dist

          ctx.beginPath()
          ctx.moveTo(b.x, b.y)
          ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(200, 245, 66, ${0.6 * fade})`
          ctx.lineWidth = 1.2
          ctx.stroke()

          // Spark particle head
          ctx.beginPath()
          ctx.arc(sx, sy, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * fade})`
          ctx.fill()
        }

        // Dual expanding shockwave rings
        ctx.beginPath()
        ctx.arc(b.x, b.y, 14 + 75 * t, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(200, 245, 66, ${0.45 * fade})`
        ctx.lineWidth = 1.8
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(b.x, b.y, 8 + 35 * t, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * fade})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Flash explosion center
        const flashR = 18 + 28 * t
        const flash = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, flashR)
        flash.addColorStop(0, `rgba(255, 255, 255, ${0.5 * fade})`)
        flash.addColorStop(1, 'rgba(200, 245, 66, 0)')
        ctx.beginPath()
        ctx.arc(b.x, b.y, flashR, 0, Math.PI * 2)
        ctx.fillStyle = flash
        ctx.fill()
      }

      // Memory safeguard limits
      if (packets.length > 35) packets.splice(0, packets.length - 35)
      if (blasts.length > 12) blasts.splice(0, blasts.length - 12)

      animFrameId.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animFrameId.current)
    }
  }, [initPositions, isDark, palette])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-screen w-screen transition-opacity duration-700 pointer-events-none select-none ${
        isVisible ? (isDark ? 'opacity-90' : 'opacity-70') : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  )
}

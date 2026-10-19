'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  baseAlpha: number
  pulseSpeed: number
  pulseOffset: number
  type: 'dot' | 'glyph' | 'node'
  glyph?: string
}

export default function AntiGravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false })
  const animFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize)

    // Palette: glowing neon green, amber gold, electric cyan, warm white
    const colors = [
      'rgba(74, 222, 128, ', // green
      'rgba(245, 158, 11, ',  // amber
      'rgba(56, 189, 248, ',  // cyan
      'rgba(248, 250, 252, ', // white/silver
    ]

    const glyphs = ['<div/>', 'js', '{}', 'fn()', '01', ';', '=>', '[]']

    // Create 36 zero-gravity particles
    const particles: Particle[] = []
    const particleCount = 36

    for (let i = 0; i < particleCount; i++) {
      const isGlyph = i < 8
      const isNode = i >= 8 && i < 16
      const baseAlpha = isGlyph ? 0.65 : Math.random() * 0.5 + 0.35

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.4 - 0.15, // gentle upward zero-gravity drift
        size: isGlyph ? 10 : isNode ? 3.5 : Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        type: isGlyph ? 'glyph' : isNode ? 'node' : 'dot',
        glyph: isGlyph ? glyphs[i % glyphs.length] : undefined,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      // Draw faint connecting thread-like lines between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 75) {
            const lineAlpha = (1 - dist / 75) * 0.18
            ctx.strokeStyle = `rgba(229, 169, 60, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Zero-gravity brownian floating motion
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.2
        p.y += p.vy + Math.cos(time + p.pulseOffset) * 0.15

        // Zero-gravity physical mouse interaction: gentle repulsion on hover
        if (mouse.active) {
          const mdx = p.x - mouse.x
          const mdy = p.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          const maxDist = 110

          if (mdist < maxDist && mdist > 0) {
            const force = (1 - mdist / maxDist) * 1.8
            p.x += (mdx / mdist) * force
            p.y += (mdy / mdist) * force
          }
        }

        // Screen wrap (upward drifting respawn at bottom)
        if (p.y < -20) {
          p.y = height + 10
          p.x = Math.random() * width
        } else if (p.y > height + 20) {
          p.y = -10
        }
        if (p.x < -20) p.x = width + 10
        if (p.x > width + 20) p.x = -10

        // Pulsing glow
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.2
        const safeAlpha = Math.max(0.1, Math.min(1, currentAlpha))

        if (p.type === 'glyph' && p.glyph) {
          // Render floating code tag
          ctx.font = '600 10px var(--font-mono), monospace'
          ctx.fillStyle = p.color + safeAlpha + ')'
          ctx.shadowColor = p.color + '0.6)'
          ctx.shadowBlur = 6
          ctx.fillText(p.glyph, p.x, p.y)
          ctx.shadowBlur = 0
        } else if (p.type === 'node') {
          // Render glowing circuit node
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color + safeAlpha + ')'
          ctx.shadowColor = p.color + '0.8)'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          // Render digital debris dot
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = p.color + safeAlpha * 0.8 + ')'
          ctx.fill()
        }
      }

      if (isVisible) {
        animFrameRef.current = requestAnimationFrame(render)
      }
    }

    let isVisible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
          animFrameRef.current = requestAnimationFrame(render)
        } else if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(canvas)
    render()

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  )
}

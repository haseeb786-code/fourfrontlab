'use client'

import React, { useEffect, useState, useRef } from 'react'

/**
 * Editorial Inverting Difference Cursor
 * - 8px dot at rest
 * - Expands to 40px circle over interactive elements (a, button, input, [data-cursor="expand"])
 * - pure white with mix-blend-mode: difference to invert underlying pixels
 * - hidden on touch screens
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only mount on devices that support fine pointer (mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches
    if (!isPointerFine) return

    setMounted(true)

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)

      // Check if target is interactive
      const target = e.target as HTMLElement | null
      const interactive = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="expand"]'
      )
      setHovered(Boolean(interactive))
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    // Smooth lerp loop for confident, weightless cursor movement
    const loop = () => {
      const ease = 0.2
      currentX += (mouseX - currentX) * ease
      currentY += (mouseY - currentY) * ease

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [visible])

  if (!mounted) return null

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`rounded-full bg-white transition-all duration-200 ease-out ${
          hovered ? 'w-10 h-10' : 'w-2 h-2'
        }`}
        style={{
          mixBlendMode: 'difference',
        }}
      />
    </div>
  )
}

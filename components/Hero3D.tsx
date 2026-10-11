'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Verify WebGL availability
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setHasWebGL(false)
        return
      }
    } catch (e) {
      setHasWebGL(false)
      return
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 7.5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x00f2fe, 4, 20)
    cyanLight.position.set(4, 3, 4)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.5, 20)
    violetLight.position.set(-4, -3, 3)
    scene.add(violetLight)

    // Group for the 4-Front Centerpiece
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Central Faceted Polyhedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 0)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a101d,
      roughness: 0.15,
      metalness: 0.85,
      transmission: 0.6,
      thickness: 1.2,
      wireframe: false,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    mainGroup.add(coreMesh)

    // Core Wireframe Overlay
    const wireGeo = new THREE.WireframeGeometry(coreGeo)
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.8,
    })
    const wireframe = new THREE.LineSegments(wireGeo, wireMat)
    mainGroup.add(wireframe)

    // 2. Four Intersecting Orbital Front Rings
    const ringRadii = [2.2, 2.4, 2.6, 2.8]
    const ringColors = [0x00f2fe, 0x6366f1, 0x00e5ff, 0x10b981]
    const ringRotations = [
      new THREE.Euler(0.4, 0.3, 0),
      new THREE.Euler(-0.5, 0.6, 0.4),
      new THREE.Euler(0.8, -0.4, -0.3),
      new THREE.Euler(-0.3, -0.7, 0.5),
    ]

    const rings: THREE.Mesh[] = []
    const nodes: THREE.Mesh[] = []

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.025, 16, 100)
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i],
        emissive: ringColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.9,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.copy(ringRotations[i])
      mainGroup.add(ring)
      rings.push(ring)

      // Add circuit node spheres along each front
      for (let j = 0; j < 3; j++) {
        const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16)
        const nodeMat = new THREE.MeshBasicMaterial({
          color: ringColors[i],
        })
        const node = new THREE.Mesh(nodeGeo, nodeMat)
        const angle = (j / 3) * Math.PI * 2 + i * 0.5
        node.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
        ring.add(node)
        nodes.push(node)
      }
    })

    // 3. Ambient Particle Constellation Field
    const particleCount = 450
    const particlePositions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16
      particlePositions[i + 1] = (Math.random() - 0.5) * 16
      particlePositions[i + 2] = (Math.random() - 0.5) * 12
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    )
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Mouse and Touch Interaction Tracking
    let targetRotationX = 0
    let targetRotationY = 0
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const w = rect.width || 1
      const h = rect.height || 1
      mouseX = ((event.clientX - rect.left) / w) * 2 - 1
      mouseY = -(((event.clientY - rect.top) / h) * 2 - 1)
      targetRotationY = mouseX * 0.6
      targetRotationX = -mouseY * 0.6
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        const rect = container.getBoundingClientRect()
        const w = rect.width || 1
        const h = rect.height || 1
        mouseX = ((touch.clientX - rect.left) / w) * 2 - 1
        mouseY = -(((touch.clientY - rect.top) / h) * 2 - 1)
        targetRotationY = mouseX * 0.6
        targetRotationX = -mouseY * 0.6
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = Math.max(container.clientWidth || 300, 1)
      const height = Math.max(container.clientHeight || 300, 1)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth camera / group rotation damping (lerp)
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05 + 0.003
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05

      // Counter-rotate rings individually
      rings.forEach((ring, index) => {
        const speed = (index % 2 === 0 ? 1 : -1) * 0.004 * (index + 1)
        ring.rotation.z += speed
      })

      // Pulse core mesh slightly
      const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.03
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale)
      wireframe.scale.set(pulseScale, pulseScale, pulseScale)

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.02
      particles.rotation.x = elapsedTime * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[520px] lg:h-[640px] flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Fallback for devices without WebGL */}
      {!hasWebGL && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-72 h-72 rounded-full border border-brand-cyan/30 animate-spin flex items-center justify-center shadow-glow-cyan">
            <div className="w-56 h-56 rounded-full border border-brand-violet/40 animate-pulse flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border-2 border-brand-cyan/60 flex items-center justify-center bg-black/60 backdrop-blur-md">
                <img src="/logo.jpeg" alt="Four Front Lab" className="w-20 h-20 rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom gradient mask for seamless blending into page */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#07090e] to-transparent"></div>
    </div>
  )
}

'use client'

import React from 'react'

const techStack = [
  'NEXT.JS 14',
  'TYPESCRIPT',
  'REACT 18',
  'TAILWIND CSS',
  'PYTHON',
  'POSTGRESQL',
  'PRISMA ORM',
  'DOCKER',
  'THREE.JS',
  'FASTAPI',
  'AUTONOMOUS WORKFLOWS',
  'EDGE DEPLOYMENT',
]

export default function MarqueeEditorial() {
  return (
    <div className="w-full bg-[#111111] border-b border-[#1f1f1f] py-4 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous seamless loop */}
        <div className="flex items-center gap-12 shrink-0 pr-12">
          {techStack.map((tech, i) => (
            <div key={`a-${i}`} className="flex items-center gap-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                {tech}
              </span>
              <span className="w-1 h-1 bg-[#1f1f1f]" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-12 shrink-0 pr-12" aria-hidden="true">
          {techStack.map((tech, i) => (
            <div key={`b-${i}`} className="flex items-center gap-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                {tech}
              </span>
              <span className="w-1 h-1 bg-[#1f1f1f]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

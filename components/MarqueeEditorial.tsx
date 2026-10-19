
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
    <div className="w-full bg-[var(--dm-surface)] border-y border-[var(--dm-border)] py-3.5 overflow-hidden select-none transition-colors duration-300">
      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous seamless loop */}
        <div className="flex items-center gap-10 shrink-0 pr-10">
          {techStack.map((tech, i) => (
            <div key={`a-${i}`} className="flex items-center gap-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--dm-text)] font-medium hover:text-[var(--dm-accent)] transition-colors">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dm-text-muted)] shrink-0" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-10 shrink-0 pr-10" aria-hidden="true">
          {techStack.map((tech, i) => (
            <div key={`b-${i}`} className="flex items-center gap-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--dm-text)] font-medium hover:text-[var(--dm-accent)] transition-colors">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--dm-text-muted)] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

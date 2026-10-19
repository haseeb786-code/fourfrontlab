
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
    <div className="w-full bg-[#EBEBE7] border-y border-[#DCDED9] py-3.5 overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Render twice for continuous seamless loop */}
        <div className="flex items-center gap-10 shrink-0 pr-10">
          {techStack.map((tech, i) => (
            <div key={`a-${i}`} className="flex items-center gap-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#121316] font-medium hover:text-[#687D3B] transition-colors">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#121316]/70 shrink-0" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-10 shrink-0 pr-10" aria-hidden="true">
          {techStack.map((tech, i) => (
            <div key={`b-${i}`} className="flex items-center gap-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#121316] font-medium hover:text-[#687D3B] transition-colors">
                {tech}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#121316]/70 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

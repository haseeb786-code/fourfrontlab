'use client'

import React from 'react'
import Image from 'next/image'

const endorsements = [
  {
    quote:
      'Four Front Lab delivered a high-performance Next.js architecture with clean code and sub-second page response. Working directly with dedicated engineers made all the difference.',
    author: 'Client Partner',
    role: 'HEAD OF ENGINEERING',
    company: 'ENTERPRISE PARTNER',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format',
  },
  {
    quote:
      'Engineered an automated data pipeline that eliminated repetitive manual tasks and streamlined reporting across departments. Efficient, reliable, and responsive.',
    author: 'Startup Founder',
    role: 'PRODUCT DIRECTOR',
    company: 'GROWTH VENTURE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format',
  },
]

export default function TestimonialsEditorial() {
  return (
    <section className="w-full bg-[#111111] text-[#f5f5f0] py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
              05
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
              / ENDORSEMENTS
            </span>
          </div>

          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hidden sm:block">
            EXECUTIVE FEEDBACK
          </div>
        </div>

        {/* Testimonials Grid (Full-Width Dark Cards with Large Accent Quote Glyph) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {endorsements.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-12 bg-[#080808] border border-[#1f1f1f] flex flex-col justify-between"
            >
              <div>
                {/* Large Opening Quote Mark in Acid Green */}
                <span className="font-editorial text-5xl sm:text-6xl text-[#c8f542] leading-none block mb-6 select-none">
                  &ldquo;
                </span>

                <p className="font-editorial text-xl sm:text-2xl font-light leading-[1.6] text-[#f5f5f0] mb-10">
                  {item.quote}
                </p>
              </div>

              {/* Author Metadata with Real Grayscale Photography */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#1f1f1f]">
                <div className="relative w-12 h-12 bg-[#111111] border border-[#1f1f1f] overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.author}
                    fill
                    sizes="48px"
                    className="object-cover filter grayscale contrast-110"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#f5f5f0]">
                    {item.author}
                  </h4>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-[#3a3a3a] mt-0.5">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

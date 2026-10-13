'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'Team', href: '#team' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808] border-b border-[#1f1f1f]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Active Accent Dot */}
          <span className="w-1.5 h-1.5 bg-[#c8f542] shrink-0" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0] font-medium group-hover:text-white transition-colors">
            FOUR FRONT LAB
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a]">
            / 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors relative py-1"
              >
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#c8f542]" />
                )}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#f5f5f0] px-4 py-2 border border-[#1f1f1f] hover:border-[#c8f542] bg-[#111111] hover:bg-black transition-colors flex items-center gap-2 group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3 h-3 text-[#6b6b6b] group-hover:text-[#c8f542] transition-colors" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#6b6b6b] hover:text-[#f5f5f0]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#080808] border-b border-[#1f1f1f] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.15em] text-[#6b6b6b] hover:text-[#f5f5f0] py-2 border-b border-[#1f1f1f]/50"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-xs uppercase tracking-[0.15em] text-[#080808] bg-[#f5f5f0] hover:bg-[#c8f542] px-4 py-3 text-center font-medium mt-2 transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </header>
  )
}

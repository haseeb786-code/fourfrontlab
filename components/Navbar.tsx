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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4F4F2]/95 backdrop-blur-md border-b border-[#E0E2DE] transition-colors">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Active Accent Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#687D3B] shrink-0" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#121316] font-bold group-hover:text-[#687D3B] transition-colors">
            FOUR FRONT LAB
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#767A82] font-semibold">
            / 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#121316] font-bold hover:text-[#687D3B] transition-colors relative py-1"
              >
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#687D3B]" />
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
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#121316] hover:text-[#687D3B] px-5 py-2 rounded-full border border-[#121316] hover:border-[#687D3B] bg-white hover:bg-[#F9F9F7] shadow-sm transition-all flex items-center gap-2 group font-bold"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#121316] group-hover:text-[#687D3B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#555860] hover:text-[#121316]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F4F4F2] border-b border-[#E0E2DE] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#121316] hover:text-[#687D3B] py-2 border-b border-[#E0E2DE] font-bold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-xs uppercase tracking-[0.16em] text-white bg-[#121316] hover:bg-[#687D3B] px-4 py-3 rounded-full text-center font-bold mt-2 transition-colors flex items-center justify-center gap-2"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  )
}

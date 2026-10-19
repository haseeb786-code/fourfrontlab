'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--dm-navbar-bg)] backdrop-blur-md border-b border-[var(--dm-border)] transition-colors duration-300">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Active Accent Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--dm-accent)] shrink-0" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--dm-text)] font-bold group-hover:text-[var(--dm-accent)] transition-colors">
            FOUR FRONT LAB
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--dm-text-muted)] font-semibold">
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
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--dm-text)] font-bold hover:text-[var(--dm-accent)] transition-colors relative py-1"
              >
                {isActive && (
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--dm-accent)]" />
                )}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA + Dark Mode Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <DarkModeToggle />
          <Link
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--dm-text)] hover:text-[var(--dm-accent)] px-5 py-2 rounded-full border border-[var(--dm-text)] hover:border-[var(--dm-accent)] bg-[var(--dm-surface)] hover:bg-[var(--dm-bg)] shadow-sm transition-all flex items-center gap-2 group font-bold"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--dm-text)] group-hover:text-[var(--dm-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile: Toggle + Menu */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--dm-text-muted)] hover:text-[var(--dm-text)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--dm-bg)] border-b border-[var(--dm-border)] px-6 py-6 flex flex-col gap-4 transition-colors duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--dm-text)] hover:text-[var(--dm-accent)] py-2 border-b border-[var(--dm-border)] font-bold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--dm-bg)] bg-[var(--dm-text)] hover:bg-[var(--dm-accent)] hover:text-[var(--dm-bg)] px-4 py-3 rounded-full text-center font-bold mt-2 transition-colors flex items-center justify-center gap-2"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  )
}

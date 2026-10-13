'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  Activity,
  ShieldCheck,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react'

// Minimal 16px Line Icons for Social Badges
function InstaLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function XLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function GitHubLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function MailLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  )
}

function PhoneLineIcon() {
  return (
    <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

const pktTimeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Karachi',
  hour12: true,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function StudioClock() {
  const [timeStr, setTimeStr] = useState<string>('')
  const clockRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = clockRef.current
    if (!el) return

    let interval: NodeJS.Timeout | null = null

    const updateTime = () => {
      try {
        const now = new Date()
        setTimeStr(`${pktTimeFormatter.format(now)} PKT`)
      } catch {
        setTimeStr('08:30:00 PKT')
      }
    }

    const startTimer = () => {
      if (interval) return
      updateTime()
      interval = setInterval(updateTime, 1000)
    }

    const stopTimer = () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }

    let isVisible = false

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer()
      } else if (isVisible) {
        startTimer()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !document.hidden) {
          startTimer()
        } else {
          stopTimer()
        }
      },
      { threshold: 0 }
    )

    observer.observe(el)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopTimer()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <span ref={clockRef} className="text-white font-bold">
      {timeStr || 'LIVE PKT'}
    </span>
  )
}

export default function Footer() {
  const currentYear = 2026
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  const handleCopy = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current)
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev))
    }, 2000)
  }

  return (
    <footer className="relative w-full bg-[#080808] text-[#f5f5f0] pt-16 sm:pt-24 pb-12 select-none overflow-hidden border-t border-[#1f1f1f]">
      {/* ─────────────────────────────────────────────────────────────
          COOL STATIC PREMIUM ARCHITECTURAL BACKGROUND IMAGE:
          Dark architectural studio interior treated with editorial monochrome,
          subtle vignette fades, and ambient dot-grid texture
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=70&auto=format"
          alt="Four Front Lab Architectural Studio Foundation"
          fill
          sizes="100vw"
          className="object-cover object-center grayscale contrast-125 brightness-[0.12] opacity-35"
          priority={false}
        />

        {/* Multi-layered dark vignette masks to melt into #080808 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-[#080808]/75" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, transparent 20%, #080808 85%)',
          }}
        />

        {/* Tactile Dot Grid */}
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
      </div>

      <div className="relative z-10 w-full">
        {/* ─────────────────────────────────────────────────────────────
            1. KINETIC MARQUEE STREAM: "FOUR FRONT LAB"
            Infinite smooth horizontal gliding typography moving left-to-right.
            Eliminates static casual bold text; gives active cinematic energy!
        ───────────────────────────────────────────────────────────── */}
        <div className="w-full overflow-hidden border-b border-[#1f1f1f] pb-8 mb-12 sm:mb-16 group">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 sm:gap-16 px-4 sm:px-8 select-none"
              >
                <span className="font-editorial text-[clamp(48px,9vw,135px)] font-light leading-none tracking-[-0.03em] text-[#f5f5f0] uppercase whitespace-nowrap transition-colors duration-300 group-hover:text-white">
                  FOUR FRONT LAB
                </span>
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#c8f542] shrink-0 animate-pulse shadow-[0_0_12px_#c8f542]" />
              </div>
            ))}
          </div>

          {/* Interactive Specification Chips */}
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#6b6b6b]">
            <div className="flex items-center gap-2 px-3 py-1 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm rounded-sm hover:border-[#c8f542] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542]" />
              <span>DIGITAL PRODUCTS</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm rounded-sm hover:border-[#38bdf8] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>4 SOFTWARE ENGINEERS</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm rounded-sm hover:border-[#e8d5b7] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8d5b7]" />
              <span>AMBITIOUS ENTERPRISES</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. VISUAL NAVIGATION CARDS & INTERACTIVE STATION COLUMNS:
            High-tech visual cards replacing plain casual text links
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 sm:pb-24 border-b border-[#1f1f1f]">
            {/* ─── Column 1: DIRECT DISPATCH (Interactive Live Hub) ─── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#444444]">
                  DIRECT DISPATCH
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#c8f542] bg-[#c8f542]/10 px-2 py-0.5 rounded border border-[#c8f542]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-ping" />
                  ONLINE
                </span>
              </div>

              <p className="text-xs text-[#6b6b6b] leading-relaxed">
                We engineer digital flagships and autonomous software for ambitious teams worldwide.
              </p>

              {/* Visual Interactive Contact Pill: Gmail */}
              <div className="p-3 border border-[#1f1f1f] bg-[#0c0c0c]/90 backdrop-blur-sm hover:border-[#c8f542] transition-colors flex items-center justify-between group">
                <a
                  href="mailto:fourfrontlab@gmail.com"
                  className="flex items-center gap-2 text-xs font-mono text-[#f5f5f0] group-hover:text-white transition-colors truncate mr-2"
                >
                  <MailLineIcon />
                  <span className="truncate">fourfrontlab@gmail.com</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('fourfrontlab@gmail.com', 'mail', e)}
                  className="font-mono text-[9px] uppercase px-2 py-1 border border-[#1f1f1f] text-[#6b6b6b] hover:text-[#f5f5f0] hover:border-white transition-colors"
                  title="Copy Gmail"
                >
                  {copiedKey === 'mail' ? (
                    <span className="text-[#c8f542] flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Copied
                    </span>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>

              {/* Visual Interactive Contact Pill: WhatsApp */}
              <div className="p-3 border border-[#1f1f1f] bg-[#0c0c0c]/90 backdrop-blur-sm hover:border-[#c8f542] transition-colors flex items-center justify-between group">
                <a
                  href="https://wa.me/923444741603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-[#f5f5f0] group-hover:text-white transition-colors truncate mr-2"
                >
                  <PhoneLineIcon />
                  <span>+92 344 474 1603</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('+923444741603', 'wa', e)}
                  className="font-mono text-[9px] uppercase px-2 py-1 border border-[#1f1f1f] text-[#6b6b6b] hover:text-[#f5f5f0] hover:border-white transition-colors"
                  title="Copy WhatsApp"
                >
                  {copiedKey === 'wa' ? (
                    <span className="text-[#c8f542] flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> Copied
                    </span>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>
            </div>

            {/* ─── Column 2: INDEX (Visual Numbered Route Cards) ─── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#444444]">
                  SITE NAVIGATION
                </span>
                <span className="font-mono text-[9px] text-[#6b6b6b]">
                  [ 04 ROUTES ]
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { num: '01', name: 'Selected Work', href: '#work', tag: 'CASES' },
                  { num: '02', name: 'Capabilities & Stack', href: '#services', tag: 'SPEC' },
                  { num: '03', name: 'Collective Spec', href: '#about', tag: 'ABOUT' },
                  { num: '04', name: 'Start a Project', href: '#contact', tag: 'DISPATCH' },
                ].map((route) => (
                  <Link
                    key={route.num}
                    href={route.href}
                    className="p-2.5 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm hover:bg-[#141414] hover:border-[#c8f542] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-[#444444] group-hover:text-[#c8f542] transition-colors">
                        [{route.num}]
                      </span>
                      <span className="font-mono text-xs text-[#a0a0a0] group-hover:text-white transition-colors">
                        {route.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#444444] group-hover:text-[#c8f542] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ─── Column 3: NETWORK (Visual Social Cards) ─── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#444444]">
                  OFFICIAL CHANNELS
                </span>
                <span className="font-mono text-[9px] text-[#6b6b6b]">
                  [ SOCIAL ]
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    name: 'Instagram',
                    handle: '@fourfrontlab',
                    href: 'https://instagram.com/fourfrontlab',
                    icon: <InstaLineIcon />,
                  },
                  {
                    name: 'X (Twitter)',
                    handle: '@FourFrontLab',
                    href: 'https://x.com/FourFrontLab',
                    icon: <XLineIcon />,
                  },
                  {
                    name: 'Facebook',
                    handle: 'fourfrontlab',
                    href: 'https://facebook.com/fourfrontlab',
                    icon: <FacebookLineIcon />,
                  },
                  {
                    name: 'GitHub',
                    handle: '@fourfrontlab',
                    href: 'https://github.com/fourfrontlab',
                    icon: <GitHubLineIcon />,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm hover:border-white transition-colors flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#6b6b6b] group-hover:text-white transition-colors">
                        {social.icon}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#444444] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[#f5f5f0] block group-hover:text-white">
                        {social.name}
                      </span>
                      <span className="font-mono text-[9px] text-[#444444] block truncate">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ─── Column 4: HEADQUARTERS (Station Terminal Box) ─── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f1f1f]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#444444]">
                  STUDIO TELEMETRY
                </span>
                <span className="font-mono text-[9px] text-[#6b6b6b]">
                  [ ISB ]
                </span>
              </div>

              <div className="p-4 border border-[#1f1f1f] bg-[#0c0c0c]/90 backdrop-blur-sm space-y-3">
                {/* Live Islamabad Clock */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-[#6b6b6b]">
                    <Clock className="w-3 h-3 text-[#c8f542]" />
                    STUDIO TIME:
                  </span>
                  <StudioClock />
                </div>

                {/* Geolocation Coordinates */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-[#6b6b6b]">
                    <MapPin className="w-3 h-3 text-[#6b6b6b]" />
                    LOCATION:
                  </span>
                  <span className="text-[#f5f5f0]">Islamabad, PK</span>
                </div>

                {/* IP Ownership Security Badge */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="flex items-center gap-1.5 text-[#6b6b6b]">
                    <ShieldCheck className="w-3 h-3 text-[#6b6b6b]" />
                    IP OWNERSHIP:
                  </span>
                  <span className="text-[#c8f542] font-semibold">100% CLIENT</span>
                </div>

                {/* Admin Access Chip */}
                <div className="pt-2 border-t border-[#1f1f1f]">
                  <Link
                    href="/admin/login"
                    className="flex items-center justify-between p-2 rounded border border-[#1f1f1f] hover:border-[#c8f542] bg-[#141414] transition-colors group"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b6b6b] group-hover:text-[#c8f542]">
                      [ ACCESS ADMIN PORTAL ]
                    </span>
                    <Terminal className="w-3 h-3 text-[#444444] group-hover:text-[#c8f542]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. BOTTOM LEGAL & METRICS STRIP
          ───────────────────────────────────────────────────────────── */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#444444]">
            <p>© {currentYear} Four Front Lab. Engineered with Next.js 14.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#f5f5f0] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#f5f5f0] transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-[#f5f5f0] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

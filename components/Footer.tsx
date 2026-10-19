'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
} from 'lucide-react'

// Minimal Line Icons for Social Badges
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

function StudioClock() {
  const [timeStr, setTimeStr] = useState<string>('04:44:23 PM PKT')

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        setTimeStr(`${formatted} PKT`)
      } catch {
        setTimeStr('04:44:23 PM PKT')
      }
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-[#121316] font-bold font-mono">
      {timeStr}
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
    <footer className="relative w-full bg-[#F4F4F2] text-[#121316] pt-12 sm:pt-14 pb-12 px-6 lg:px-12 border-t border-[#E0E2DE] overflow-hidden select-none">
      {/* ─────────────────────────────────────────────────────────────
          ARCHITECTURAL BLUEPRINT GRID & DRAFTING GUIDE LINES
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none z-0" />

      {/* Guide lines across canvas */}
      <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-[1px] bg-[#E0E2DE]/70 pointer-events-none z-[1]" />
      <div className="absolute right-8 lg:right-12 top-0 bottom-0 w-[1px] bg-[#E0E2DE]/70 pointer-events-none z-[1]" />

      {/* ─────────────────────────────────────────────────────────────
          LEFT MARGIN: WATERMARK 01, STATUS '=' & SOCIALS
      ───────────────────────────────────────────────────────────── */}
      {/* Faint watermark number 01 on top-left */}
      <div className="absolute top-10 left-3 sm:left-5 pointer-events-none select-none z-[1] opacity-70 hidden md:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="70" fill="#121316" fillOpacity="0.08" fontFamily="var(--font-serif), Georgia, serif" fontSize="64" fontWeight="400">01</text>
        </svg>
      </div>

      {/* Left-edge status indicator (= in olive green) & Social links */}
      <div className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-20 hidden lg:flex">
        {/* Olive green double-dash '=' */}
        <div className="flex flex-col gap-1 select-none">
          <span className="w-3.5 h-[2px] bg-[#687D3B] rounded-full" />
          <span className="w-3.5 h-[2px] bg-[#687D3B] rounded-full" />
        </div>

        {/* Minimal Social Links */}
        <div className="flex flex-col items-center gap-3.5 text-[#767A82]">
          <a
            href="https://x.com/FourFrontLab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter X"
            className="hover:text-[#121316] transition-colors p-1"
          >
            <XLineIcon />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#121316] transition-colors p-1"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66a1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom-left mechanical blueprint drafting flange watermark */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none select-none z-[1] opacity-50 hidden md:block">
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="140" r="115" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="140" cy="140" r="85" stroke="#121316" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="140" cy="140" r="55" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          <circle cx="140" cy="140" r="28" stroke="#121316" strokeOpacity="0.18" strokeWidth="1" />
          <circle cx="140" cy="140" r="4" fill="#687D3B" fillOpacity="0.4" />
          <line x1="15" y1="140" x2="265" y2="140" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          <line x1="140" y1="15" x2="140" y2="265" stroke="#121316" strokeOpacity="0.12" strokeWidth="1" />
          <path d="M100 100 L115 85 M120 100 L135 85 M100 120 L115 105 M140 100 L155 85 M160 140 L185 115 M170 150 L195 125 M180 160 L205 135" stroke="#121316" strokeOpacity="0.15" strokeWidth="1" />
          <path d="M55 140 H25 V170 H55" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          <path d="M225 140 H255 V170 H225" stroke="#121316" strokeOpacity="0.16" strokeWidth="1" />
          <line x1="25" y1="175" x2="55" y2="175" stroke="#121316" strokeOpacity="0.2" strokeWidth="0.75" />
          <line x1="25" y1="172" x2="25" y2="178" stroke="#121316" strokeOpacity="0.25" strokeWidth="0.75" />
          <line x1="55" y1="172" x2="55" y2="178" stroke="#121316" strokeOpacity="0.25" strokeWidth="0.75" />
          <text x="34" y="185" fill="#666A73" fontSize="6.5" fontFamily="var(--font-mono), monospace">Ø30</text>
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT MARGIN: 3D ISOMETRIC ARCHITECTURAL STRUCTURE BACKDROP
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute right-0 bottom-0 w-[55%] max-w-[700px] h-[360px] pointer-events-none select-none z-[1] opacity-75 hidden sm:block">
        <Image
          src="/images/footer-arch-backdrop.webp"
          alt="Architectural Blueprint Structure"
          fill
          className="object-contain object-bottom-right mix-blend-multiply"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Prominent Architectural Top Line Divider */}
        <div className="w-full h-[2px] bg-[#121316] mb-8 sm:mb-10" />

        {/* 4 Floating Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {/* ─── CARD 1: DIRECT DISPATCH ─── */}
          <div className="rounded-2xl border border-[#D4D7D1] bg-[#F8F8F6]/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-[#121316]/40 hover:shadow-[0_12px_36px_rgb(0,0,0,0.06)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0E2DE]/80">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#121316] font-bold">
                  DIRECT DISPATCH
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#687D3B] bg-[#687D3B]/10 px-2 py-0.5 rounded border border-[#687D3B]/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#687D3B] animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Description */}
              <p className="text-[13px] text-[#454950] leading-[1.65] font-normal mb-5">
                We engineer digital flagships and autonomous software for ambitious teams worldwide.
              </p>
            </div>

            <div className="space-y-2.5">
              {/* Email Box */}
              <div className="rounded-lg border border-[#DCDFD9] bg-[#EFEFEA]/50 hover:bg-white hover:border-[#121316] transition-all p-3 flex items-center justify-between group">
                <a
                  href="mailto:fourfrontlab@gmail.com"
                  className="flex items-center gap-2.5 text-xs font-mono text-[#121316] font-medium truncate mr-2"
                >
                  <MailLineIcon />
                  <span className="truncate">fourfrontlab@gmail.com</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('fourfrontlab@gmail.com', 'mail', e)}
                  className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-1 border border-[#C2C6CF] bg-white hover:bg-[#F4F4F2] text-[#555860] hover:text-[#121316] font-bold rounded shadow-2xs transition-all shrink-0"
                  title="Copy Gmail"
                >
                  {copiedKey === 'mail' ? (
                    <span className="text-[#687D3B] flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> COPIED
                    </span>
                  ) : (
                    'COPY'
                  )}
                </button>
              </div>

              {/* Phone / WhatsApp Box */}
              <div className="rounded-lg border border-[#DCDFD9] bg-[#EFEFEA]/50 hover:bg-white hover:border-[#121316] transition-all p-3 flex items-center justify-between group">
                <a
                  href="https://wa.me/923444741603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono text-[#121316] font-medium truncate mr-2"
                >
                  <PhoneLineIcon />
                  <span>+92 344 474 1603</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy('+923444741603', 'wa', e)}
                  className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-1 border border-[#C2C6CF] bg-white hover:bg-[#F4F4F2] text-[#555860] hover:text-[#121316] font-bold rounded shadow-2xs transition-all shrink-0"
                  title="Copy WhatsApp"
                >
                  {copiedKey === 'wa' ? (
                    <span className="text-[#687D3B] flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> COPIED
                    </span>
                  ) : (
                    'COPY'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ─── CARD 2: SITE NAVIGATION ─── */}
          <div className="rounded-2xl border border-[#D4D7D1] bg-[#F8F8F6]/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-[#121316]/40 hover:shadow-[0_12px_36px_rgb(0,0,0,0.06)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0E2DE]/80">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#121316] font-bold">
                  SITE NAVIGATION
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#767A82] font-semibold">
                  [ 04 ROUTES ]
                </span>
              </div>

              {/* Navigation Items */}
              <div className="space-y-2">
                {[
                  { num: '01', name: 'Selected Work', href: '#work' },
                  { num: '02', name: 'Capabilities & Stack', href: '#services' },
                  { num: '03', name: 'Collective Spec', href: '#about' },
                  { num: '04', name: 'Start a Project', href: '#contact' },
                  { num: '04', name: 'Start a Project', href: '#contact' },
                ].map((route, idx) => (
                  <Link
                    key={`${route.num}-${idx}`}
                    href={route.href}
                    className="rounded-lg border border-[#DCDFD9] bg-[#EFEFEA]/50 hover:bg-white hover:border-[#121316] p-2.5 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] text-[#767A82] font-semibold group-hover:text-[#687D3B] transition-colors">
                        [{route.num}]
                      </span>
                      <span className="font-mono text-xs text-[#121316] font-bold group-hover:text-[#121316] transition-colors">
                        {route.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#767A82] group-hover:text-[#121316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ─── CARD 3: OFFICIAL CHANNELS ─── */}
          <div className="rounded-2xl border border-[#D4D7D1] bg-[#F8F8F6]/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-[#121316]/40 hover:shadow-[0_12px_36px_rgb(0,0,0,0.06)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0E2DE]/80">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#121316] font-bold">
                  OFFICIAL CHANNELS
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#767A82] font-semibold">
                  [ SOCIAL ]
                </span>
              </div>

              {/* 2x2 Social Grid */}
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
                    handle: '@fourfrontlab',
                    href: 'https://facebook.com/fourfrontlab',
                    icon: <FacebookLineIcon />,
                  },
                  {
                    name: 'GitHub',
                    handle: '@FourFrontLab',
                    href: 'https://github.com/fourfrontlab',
                    icon: <GitHubLineIcon />,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#DCDFD9] bg-[#EFEFEA]/50 hover:bg-white hover:border-[#121316] p-2.5 sm:p-3 flex flex-col justify-between group transition-all min-h-[74px]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#121316] group-hover:text-[#687D3B] transition-colors">
                        {social.icon}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#767A82] group-hover:text-[#121316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#121316] block leading-tight">
                        {social.name}
                      </span>
                      <span className="font-mono text-[9.5px] text-[#767A82] block truncate mt-0.5">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ─── CARD 4: STUDIO TELEMETRY ─── */}
          <div className="rounded-2xl border border-[#D4D7D1] bg-[#F8F8F6]/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-300 hover:border-[#121316]/40 hover:shadow-[0_12px_36px_rgb(0,0,0,0.06)]">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E0E2DE]/80">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#121316] font-bold">
                  STUDIO TELEMETRY
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#767A82] font-semibold">
                  [ ISB ]
                </span>
              </div>

              {/* Telemetry Data Box */}
              <div className="rounded-lg border border-[#DCDFD9] bg-[#EFEFEA]/50 p-3 sm:p-3.5 space-y-2.5 mb-3.5">
                {/* Studio Time */}
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="flex items-center gap-1.5 text-[#555860] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#687D3B]" />
                    STUDIO TIME:
                  </span>
                  <StudioClock />
                </div>

                {/* Location */}
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="flex items-center gap-1.5 text-[#555860] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#555860]" />
                    LOCATION:
                  </span>
                  <span className="text-[#121316] font-bold">Islamabad, PK</span>
                </div>

                {/* IP Ownership */}
                <div className="flex items-center justify-between font-mono text-[10.5px]">
                  <span className="flex items-center gap-1.5 text-[#555860] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#555860]" />
                    IP OWNERSHIP:
                  </span>
                  <span className="text-[#121316] font-bold">100% CLIENT</span>
                </div>
              </div>
            </div>

            {/* Access Admin Portal Button */}
            <Link
              href="/admin/login"
              className="w-full bg-[#26282B] hover:bg-[#121316] text-[#F4F4F2] px-4 py-3 rounded-lg flex items-center justify-between font-mono text-[11px] uppercase tracking-wider font-bold transition-all shadow-sm group"
            >
              <span>[ ACCESS ADMIN PORTAL ]</span>
              <span className="text-[#A0A4AB] group-hover:text-white font-mono transition-colors">&gt;_</span>
            </Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM LEGAL & METRICS STRIP
        ───────────────────────────────────────────────────────────── */}
        <div className="pt-8 mt-12 sm:mt-16 border-t border-[#D4D7D1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#555860]">
          <p>© {currentYear} Four Front Lab. Engineered with Next.js 14.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#121316] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#121316] transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#121316] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

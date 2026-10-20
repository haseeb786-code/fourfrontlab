'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import {
  ArrowUpRight,
  Copy,
  Check,
  Loader2,
  CheckCircle2,
  Sparkles,
  Terminal,
  Activity,
  ShieldCheck,
} from 'lucide-react'

// Minimal 20px Line Icons
function MailLineIcon() {
  return (
    <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  )
}

function InstaLineIcon() {
  return (
    <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function XLineIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookLineIcon() {
  return (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function PhoneLineIcon() {
  return (
    <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function ContactEditorial() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax depth translation for the workstation background image
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!isMountedRef.current) return
      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        const data = await res.json()
        if (!isMountedRef.current) return
        setError(data.error || 'Failed to submit inquiry.')
      }
    } catch {
      if (isMountedRef.current) {
        setError('A network error occurred. Please reach us via Gmail or WhatsApp.')
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }

  const channels = [
    {
      id: 'gmail',
      label: 'Gmail',
      handle: 'fourfrontlab@gmail.com',
      copyValue: 'fourfrontlab@gmail.com',
      href: 'mailto:fourfrontlab@gmail.com',
      icon: <MailLineIcon />,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      handle: '+92 344 474 1603',
      copyValue: '+923444741603',
      href: 'https://wa.me/923444741603?text=Hi%20Four%20Front%20Lab%2C%20let%27s%20talk%20about%20a%20project.',
      icon: <PhoneLineIcon />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@fourfrontlab',
      copyValue: 'fourfrontlab',
      href: 'https://instagram.com/fourfrontlab',
      icon: <InstaLineIcon />,
    },
    {
      id: 'x',
      label: 'X (Twitter)',
      handle: '@FourFrontLab',
      copyValue: 'FourFrontLab',
      href: 'https://x.com/FourFrontLab',
      icon: <XLineIcon />,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'fourfrontlab@gmail.com',
      copyValue: 'fourfrontlab@gmail.com',
      href: 'https://facebook.com/fourfrontlab',
      icon: <FacebookLineIcon />,
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-[#f5f5f0] border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP-NOTCH DARK PC WORKSTATION BACKGROUND VISUAL:
          High-res developer hardware setup treated with editorial grayscale,
          dark contrast, parallax drift, and seamless vignette blending
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          style={{ y: bgY }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          <Image
            src="/images/contact-hardware-bg.webp"
            alt="Four Front Lab Engineering Hardware & PC Workstation"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-125 brightness-[0.18] opacity-40 transition-all duration-700"
            priority={false}
          />
        </motion.div>

        {/* Multi-layered dark vignette masks to melt image into pure #080808 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <div className="absolute inset-0 bg-[#080808]/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, transparent 20%, #080808 85%)',
          }}
        />

        {/* Sweeping Laser Radar Beam */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c8f542]/[0.02] to-transparent h-48 animate-[radar_10s_ease-in-out_infinite]" />

        {/* Subtle Tactile Dot Grid Texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-25" />
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            1. PROFESSIONAL HIGH-TECH WORKSTATION CTA HERO BANNER
            - Architectural CAD drafting & dark titanium wireframe chassis
            - Unobstructed, high-contrast, crystal-clear center stage
            - Clean bold typography with engineering precision
        ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full border-b border-[#E0E2DE] dark:border-[#1F2228] overflow-hidden bg-[#F4F4F2] dark:bg-[#0B0C0E]">
          {/* Panoramic Container */}
          <div className="relative w-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[500px] flex flex-col items-center justify-center px-6 py-14 sm:py-16 select-none overflow-hidden">
            {/* Dark Mode High-Tech Titanium Wireframe Chassis */}
            <Image
              src="/images/contact-cta-tech-dark.webp"
              alt="Four Front Lab Architectural High-Tech Engineering Chassis"
              fill
              priority
              sizes="100vw"
              className="hidden dark:block object-cover object-center pointer-events-none transition-opacity duration-700 brightness-[0.88] contrast-[1.12]"
            />

            {/* Light Mode Architectural Blueprint Drafting Schematics */}
            <Image
              src="/images/contact-cta-tech-light.webp"
              alt="Four Front Lab Architectural Engineering Blueprint Drafting"
              fill
              priority
              sizes="100vw"
              className="block dark:hidden object-cover object-center pointer-events-none transition-opacity duration-700 opacity-80"
            />

            {/* Subtle Gradient Veil for Perfect Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F4F4F2]/30 via-transparent to-[#F4F4F2]/20 dark:from-[#0B0C0E]/50 dark:via-transparent dark:to-[#0B0C0E]/40 pointer-events-none" />

            {/* Corner HUD Telemetry - Crisp Technical Brackets */}
            <div className="absolute top-4 sm:top-6 left-5 sm:left-8 md:left-12 flex items-center gap-2 px-3 py-1 rounded-md border border-[#D4D7D1] dark:border-[#2A2F3A] bg-[#FFFFFF]/85 dark:bg-[#13161B]/85 backdrop-blur-md shadow-xs z-10">
              <span className="text-[#687D3B] dark:text-[#c8f542] font-mono font-bold text-xs">&gt;_</span>
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-[#121316] dark:text-[#F5F5F0]">
                SYS_WORKBENCH://FOUR_FRONT_STATION_04
              </span>
            </div>

            <div className="absolute top-4 sm:top-6 right-5 sm:right-8 md:right-12 hidden xs:flex items-center gap-2 px-3 py-1 rounded-md border border-[#D4D7D1] dark:border-[#2A2F3A] bg-[#FFFFFF]/85 dark:bg-[#13161B]/85 backdrop-blur-md shadow-xs z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-[#121316] dark:text-[#F5F5F0]">
                ENCRYPTED_PIPELINE • 12H_DISPATCH_SLA
              </span>
            </div>

            {/* Center Content Stack: Unobstructed, Professional & Bold */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto mt-6 sm:mt-4">
              {/* Ready Badge with Live Ping Beacon */}
              <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#D4D7D1] dark:border-[#2A2F3A] bg-[#FFFFFF]/90 dark:bg-[#13161B]/90 backdrop-blur-md shadow-xs mb-5 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                </span>
                <span className="font-mono font-bold text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#121316] dark:text-[#F5F5F0]">
                  READY TO DEPLOY • WORKSTATION ACTIVE
                </span>
              </div>

              {/* Main Headline: Bold, High-Contrast & Authoritative */}
              <h2 className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px] leading-[1.06] tracking-tight text-[#121316] dark:text-[#FFFFFF] mb-6 sm:mb-8">
                <span>Have an </span>
                <span className="relative inline-block text-[#121316] dark:text-[#FFFFFF]">
                  ambitious
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#687D3B] dark:bg-[#c8f542] rounded-full" />
                </span>
                <span> project</span>
                <span className="block mt-1 sm:mt-2 text-[#555A64] dark:text-[#D1D5DB]">
                  in mind?
                </span>
              </h2>

              {/* High-Impact Professional Action Button */}
              <div className="relative group/btn inline-block">
                <a
                  href="mailto:fourfrontlab@gmail.com"
                  className="relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-md font-mono font-bold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-[#121316] bg-[#121316] text-[#FFFFFF] hover:bg-[#22252B] dark:border-[#c8f542] dark:bg-[#c8f542] dark:text-[#0B0C0E] dark:hover:bg-[#d4fb52] dark:hover:shadow-[0_0_30px_rgba(200,245,66,0.35)]"
                >
                  <span className="tracking-wider">Start a direct conversation</span>

                  {/* Directional Arrow */}
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 dark:bg-black/15 text-sm transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. DIRECT CHANNELS & SHARP INQUIRY GRID
        ───────────────────────────────────────────────────────────── */}
        <div className="py-24 sm:py-32 px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (5 cols): Direct Touchpoints */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
                    05
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
                    / TOUCHPOINTS
                  </span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[#f5f5f0] mb-3">
                  Direct Coordinates
                </h3>
                <p className="text-xs leading-[1.8] text-[#6b6b6b]">
                  Reach our engineering desk directly. We operate without intermediaries and respond within 12 business hours.
                </p>
              </div>

              {/* Sharp Channel List */}
              <div className="border-t border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm border-l border-r">
                {channels.map((ch) => {
                  const isCopied = copiedKey === ch.id
                  return (
                    <div
                      key={ch.id}
                      className="p-4 border-b border-[#1f1f1f] flex items-center justify-between group hover:bg-[#111111]/90 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-[#1f1f1f] bg-[#141414] flex items-center justify-center text-[#6b6b6b] group-hover:text-white transition-colors">
                          {ch.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#444444] block">
                            {ch.label}
                          </span>
                          <span className="text-xs font-medium text-[#f5f5f0]">
                            {ch.handle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCopy(ch.copyValue, ch.id, e)}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border border-[#1f1f1f] hover:border-[#c8f542] text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors"
                          title={`Copy ${ch.handle}`}
                        >
                          {isCopied ? (
                            <span className="text-[#c8f542] flex items-center gap-1">
                              <Check className="w-3 h-3" /> Copied
                            </span>
                          ) : (
                            'Copy'
                          )}
                        </button>

                        <a
                          href={ch.href}
                          target={ch.href.startsWith('mailto:') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="w-7 h-7 border border-[#1f1f1f] hover:border-[#c8f542] flex items-center justify-center text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors"
                          aria-label={`Open ${ch.label}`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Station SLA Metric Strip */}
              <div className="p-4 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm flex items-center justify-between font-mono text-[10px] text-[#6b6b6b]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#c8f542]" />
                  <span>RESPONSE TIME: &lt;12 HOURS</span>
                </div>
                <span className="text-[#f5f5f0]">GLOBAL DISPATCH</span>
              </div>
            </div>

            {/* Right Column (7 cols): Sharp Brief Form with Backdrop Filter */}
            <div className="lg:col-span-7 bg-[#0c0c0c]/90 backdrop-blur-md border border-[#1f1f1f] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#f5f5f0] mb-2">
                Send a Project Brief
              </h3>
              <p className="text-xs text-[#6b6b6b] mb-8">
                No generic questionnaires. Outline your technical requirements, goals, and desired launch timeline.
              </p>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[#c8f542] mx-auto" />
                  <h4 className="font-editorial text-2xl text-[#f5f5f0]">
                    Brief Received.
                  </h4>
                  <p className="text-xs text-[#6b6b6b] max-w-sm mx-auto">
                    Our engineering team will review your specifications and reply within 12 business hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b6b] hover:text-[#f5f5f0] pt-4 underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#444444] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Vance"
                        className="w-full bg-[#111111] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-[#444444] mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="vance@company.com"
                        className="w-full bg-[#111111] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#444444] mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="e.g. Vance Global"
                      className="w-full bg-[#111111] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#444444] mb-2">
                      Project Vision / Technical Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your current bottleneck, timeline, or required deliverables..."
                      className="w-full bg-[#111111] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-xs text-rose-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#f5f5f0] hover:bg-[#c8f542] text-[#080808] font-mono text-xs uppercase tracking-[0.15em] py-4 font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <span>Let&apos;s Talk</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

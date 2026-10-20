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
            1. ETHEREAL GOLDEN WAVE CTA HERO BANNER (8K Luxury HD + Bold Animated Typography)
        ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full border-b border-[#D8CEBF] dark:border-[#2A2318] overflow-hidden bg-[#ECE3DA] dark:bg-[#120F0B]">
          {/* Panoramic Container with Golden Mesh Wave and Radar Schematics */}
          <div className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] flex flex-col items-center justify-center px-6 py-14 sm:py-16 select-none overflow-hidden">
            {/* Pristine 8K Luxury Golden Mesh Wave Image */}
            <Image
              src="/images/contact-cta-gold-luxury-hd.webp"
              alt="Four Front Lab Architectural Luxury Golden Mesh Wave"
              fill
              priority
              sizes="100vw"
              className={`object-cover object-center pointer-events-none transition-all duration-700 ${
                isDark ? 'brightness-[0.72] contrast-[1.22] saturate-[1.15]' : 'brightness-[0.98] contrast-[1.04]'
              }`}
            />

            {/* Subtle Vignette & Contrast Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ECE3DA]/50 via-transparent to-[#ECE3DA]/40 dark:from-[#120F0B]/80 dark:via-transparent dark:to-[#120F0B]/60 pointer-events-none" />

            {/* Animated Ambient Light Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] dark:via-white/[0.04] to-transparent pointer-events-none animate-[light-sweep_9s_ease-in-out_infinite]" />

            {/* Floating Golden Dust Particles (CSS Keyframe Animated) */}
            <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] pointer-events-none animate-[gold-drift_6s_ease-in-out_infinite]" />
            <div className="absolute top-[35%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FFEAA7] blur-[1px] pointer-events-none animate-[gold-drift-alt_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[25%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#E2B755] pointer-events-none animate-[gold-drift_7s_ease-in-out_infinite]" />
            <div className="absolute top-[65%] right-[25%] w-2 h-2 rounded-full bg-[#F8DE7E] blur-[1px] pointer-events-none animate-[gold-drift-alt_6.5s_ease-in-out_infinite]" />

            {/* Corner HUD Telemetry - Crisp Glass Capsules */}
            <div className="absolute top-4 sm:top-6 left-5 sm:left-8 md:left-12 flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFA885]/40 dark:border-[#D4AF37]/30 bg-[#FAF5EE]/80 dark:bg-[#15120E]/80 backdrop-blur-md shadow-xs z-10">
              <span className="text-[#8C6D3B] dark:text-[#E2C79E] font-bold text-xs">&gt;_</span>
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-[#3E3426] dark:text-[#E5D0AD]">
                SYS_WORKBENCH://FOUR_FRONT_STATION_04
              </span>
            </div>

            <div className="absolute top-4 sm:top-6 right-5 sm:right-8 md:right-12 hidden xs:flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFA885]/40 dark:border-[#D4AF37]/30 bg-[#FAF5EE]/80 dark:bg-[#15120E]/80 backdrop-blur-md shadow-xs z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wider text-[#3E3426] dark:text-[#E5D0AD]">
                ENCRYPTED_PIPELINE • 12H_DISPATCH_SLA
              </span>
            </div>

            {/* Center Content Stack: Bold, Sculptural & Animated */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto mt-6 sm:mt-4">
              {/* Ready Badge with Live Ping Beacon */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C5A059]/70 dark:border-[#D4AF37]/60 bg-[#FAF5EE]/90 dark:bg-[#18140F]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(197,160,89,0.25)] dark:shadow-[0_4px_25px_rgba(212,175,55,0.2)] mb-5 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono font-bold text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-[#3A2D1C] dark:text-[#F3DFBD]">
                  READY TO DEPLOY • WORKSTATION ACTIVE
                </span>
              </div>

              {/* Main Headline: Bold Weight + Animated Metallic Gold Shimmer */}
              <h2 className="font-serif font-bold sm:font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] leading-[1.08] tracking-tight text-[#140F08] dark:text-[#FFFFFF] mb-6 sm:mb-8 drop-shadow-[0_2px_14px_rgba(180,140,80,0.25)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                <span>Have an </span>
                <span className="relative inline-block">
                  <em className="italic font-serif font-black bg-gradient-to-r from-[#9A6F29] via-[#E2B755] via-[#F8DE7E] to-[#9A6F29] dark:from-[#FFEAA7] dark:via-[#FFD700] dark:via-[#FFF3B0] dark:to-[#FFEAA7] bg-[length:200%_auto] bg-clip-text text-transparent animate-[text-shimmer_4.5s_ease-in-out_infinite] pr-1">
                    ambitious
                  </em>
                </span>
                <span> project</span>
                <span className="block mt-1 sm:mt-2 text-[#1E1810] dark:text-[#FAF6F0]">
                  in mind?
                </span>
              </h2>

              {/* High-Impact Interactive Luxury Button */}
              <div className="relative group/btn inline-block">
                {/* Golden Aurora Glow behind button */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C5A059] via-[#F3D7A4] to-[#C5A059] opacity-70 blur-md group-hover/btn:opacity-100 group-hover/btn:blur-lg transition-all duration-500 animate-pulse" />

                <a
                  href="mailto:fourfrontlab@gmail.com"
                  className="relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-[#D4AF37] dark:border-[#F3D7A4] bg-gradient-to-r from-[#1B150E] via-[#2A2116] to-[#1B150E] dark:from-[#FAF5EE] dark:via-[#FFFFFF] dark:to-[#FAF5EE] text-[#FAF5EE] dark:text-[#18130C] font-serif font-bold text-base sm:text-lg md:text-xl shadow-[0_12px_36px_rgba(180,130,60,0.4)] dark:shadow-[0_12px_40px_rgba(212,175,55,0.45)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                >
                  {/* Sweeping Light Glint on Button */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[btn-sweep_0.9s_ease-in-out_forwards]" />

                  <span className="tracking-wide">Start a direct conversation</span>

                  {/* Arrow circle */}
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4AF37]/25 dark:bg-[#18130C]/10 text-base sm:text-lg font-sans transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
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

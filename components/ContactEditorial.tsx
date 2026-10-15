'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
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
      className="relative w-full bg-[#080808] text-[#f5f5f0] border-b border-[#1f1f1f] overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP-NOTCH DARK PC WORKSTATION BACKGROUND VISUAL:
          High-res developer hardware setup treated with editorial grayscale,
          dark contrast, and seamless vignette blending
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&q=70&auto=format"
            alt="Four Front Lab Engineering Hardware & PC Workstation"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-125 brightness-[0.18] opacity-40 transition-all duration-700"
            priority={false}
          />
        </div>

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

        {/* Ambient Corner Monospace HUD Telemetry */}
        <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#444444]">
          <Terminal className="w-3 h-3 text-[#c8f542]" />
          <span>SYS_WORKBENCH://FOUR_FRONT_STATION_04</span>
        </div>

        <div className="absolute top-8 right-8 hidden lg:flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#444444]">
          <ShieldCheck className="w-3 h-3 text-[#6b6b6b]" />
          <span>ENCRYPTED_PIPELINE • 12H_DISPATCH_SLA</span>
        </div>
      </div>

      <div className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            1. COLD MINIMALIST FULL-WIDTH CTA HERO BANNER
        ───────────────────────────────────────────────────────────── */}
        <div className="py-28 sm:py-36 px-6 lg:px-10 border-b border-[#1f1f1f] text-center relative group">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#3a3a3a] mb-6 px-3.5 py-1.5 border border-[#1f1f1f] bg-[#0c0c0c]/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8f542] animate-pulse" />
              <span>READY TO DEPLOY • WORKSTATION ACTIVE</span>
            </div>

            <h2 className="font-editorial text-[clamp(40px,7vw,98px)] font-light leading-[0.98] tracking-[-0.03em] text-[#f5f5f0] mb-8 select-none">
              Have an ambitious project in mind?
            </h2>

            <div>
              <a
                href="mailto:fourfrontlab@gmail.com"
                className="font-editorial text-2xl sm:text-4xl text-[#f5f5f0] hover:text-[#c8f542] underline underline-offset-8 transition-colors inline-flex items-center gap-2 group/link"
              >
                <span>Start a direct conversation</span>
                <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 text-[#c8f542]" />
              </a>
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
                  {/* Anti-spam honeypot (hidden from human visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="hp_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={(formData as any).hp_website || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, hp_website: e.target.value } as any)
                      }
                    />
                  </div>

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

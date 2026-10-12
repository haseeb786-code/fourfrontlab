'use client'

import React, { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react'

// Custom Authentic Brand Icons
function GmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5 4H3.5C2.67 4 2 4.67 2 5.5V18.5C2 19.33 2.67 20 3.5 20H20.5C21.33 20 22 19.33 22 18.5V5.5C22 4.67 21.33 4 20.5 4Z"
        fill="#1F2937"
        fillOpacity="0.4"
      />
      <path
        d="M2 5.5L12 13L22 5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 18.5L8.5 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M22 18.5L15.5 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.507 14.307l-.009.075c-.236-.12-1.398-.69-1.615-.77-.217-.08-.374-.12-.532.12-.158.24-.613.77-.751.93-.138.16-.277.18-.514.06-.237-.12-1.002-.37-1.908-1.18-.705-.63-1.182-1.41-1.32-1.65-.138-.24-.015-.37.104-.49.107-.107.237-.28.356-.42.119-.14.158-.24.237-.4.079-.16.04-.3-.02-.42-.059-.12-.533-1.28-.73-1.76-.193-.46-.388-.4-.533-.41l-.454-.01c-.158 0-.414.06-.631.3-.217.24-.83.81-.83 1.98 0 1.17.85 2.3 0.97 2.46.12.16 1.674 2.56 4.056 3.59.566.24 1.008.39 1.353.5.568.18 1.085.15 1.493.09.455-.07 1.398-.57 1.595-1.13.197-.55.197-1.03.138-1.13-.059-.1-.217-.16-.454-.28zM12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.84.5 3.56 1.37 5.05L2 22l5.12-1.34c1.44.79 3.09 1.24 4.88 1.24 5.52 0 10-4.48 10-10S17.56 2 12.04 2zm0 18.25c-1.6 0-3.08-.45-4.35-1.23l-.31-.19-3.23.85.86-3.15-.2-.33c-.87-1.35-1.33-2.93-1.33-4.57 0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25z" />
    </svg>
  )
}

export default function GlassContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$5,000 - $15,000',
    service: 'Website Development',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev))
    }, 2200)
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
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          budget: '$5,000 - $15,000',
          service: 'Website Development',
          message: '',
        })
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.')
      }
    } catch {
      setError('A network error occurred. Please contact us via Gmail or WhatsApp directly.')
    } finally {
      setLoading(false)
    }
  }

  const channels = [
    {
      id: 'gmail',
      title: 'Gmail Executive Inbox',
      handle: 'fourfrontlab@gmail.com',
      copyValue: 'fourfrontlab@gmail.com',
      badge: 'Official Direct',
      href: 'mailto:fourfrontlab@gmail.com',
      actionLabel: 'Compose Email',
      glow: 'group-hover:shadow-[0_0_35px_rgba(234,67,53,0.35)]',
      borderGlow: 'hover:border-rose-500/60',
      iconBox: 'bg-rose-500/10 text-rose-400 border border-rose-500/30 group-hover:bg-rose-500 group-hover:text-white',
      badgeStyle: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
      icon: <GmailIcon className="w-5 h-5" />,
      subtext: 'Direct communication for high-stakes builds, RFPs & inquiries',
    },
    {
      id: 'instagram',
      title: 'Instagram',
      handle: '@fourfrontlab',
      copyValue: 'fourfrontlab',
      badge: 'Visuals & Motion',
      href: 'https://instagram.com/fourfrontlab',
      actionLabel: 'View Feed',
      glow: 'group-hover:shadow-[0_0_35px_rgba(225,48,108,0.35)]',
      borderGlow: 'hover:border-pink-500/60',
      iconBox: 'bg-pink-500/10 text-pink-400 border border-pink-500/30 group-hover:bg-gradient-to-tr group-hover:from-[#F77737] group-hover:via-[#FD1D1D] group-hover:to-[#833AB4] group-hover:text-white',
      badgeStyle: 'text-pink-400 bg-pink-500/10 border-pink-500/25',
      icon: <InstagramIcon className="w-5 h-5" />,
      subtext: 'Behind-the-scenes engineering, motion UI & live release reels',
    },
    {
      id: 'x',
      title: 'X (Formerly Twitter)',
      handle: '@FourFrontLab',
      copyValue: 'FourFrontLab',
      badge: 'Tech Dispatches',
      href: 'https://x.com/FourFrontLab',
      actionLabel: 'Follow on X',
      glow: 'group-hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]',
      borderGlow: 'hover:border-white/60',
      iconBox: 'bg-white/10 text-white border border-white/25 group-hover:bg-white group-hover:text-black',
      badgeStyle: 'text-white bg-white/10 border-white/20',
      icon: <XIcon className="w-4 h-4" />,
      subtext: 'Real-time performance benchmarks, architecture notes & logs',
    },
    {
      id: 'facebook',
      title: 'Facebook Official',
      handle: 'fourfrontlab@gmail.com',
      copyValue: 'fourfrontlab@gmail.com',
      badge: 'Client Network',
      href: 'https://facebook.com/fourfrontlab',
      actionLabel: 'Message Page',
      glow: 'group-hover:shadow-[0_0_35px_rgba(24,119,242,0.35)]',
      borderGlow: 'hover:border-blue-500/60',
      iconBox: 'bg-blue-500/10 text-blue-400 border border-blue-500/30 group-hover:bg-[#1877F2] group-hover:text-white',
      badgeStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
      icon: <FacebookIcon className="w-5 h-5" />,
      subtext: 'Enterprise client correspondence & verified community updates',
    },
    {
      id: 'whatsapp',
      title: 'Priority WhatsApp Hotline',
      handle: '+1 (800) 436-8736',
      copyValue: '+18004368736',
      badge: 'Fastest Reply',
      href: 'https://wa.me/18004368736?text=Hi%20Four%20Front%20Lab%2C%20I%20would%20like%20to%20discuss%20a%20new%20project.',
      actionLabel: 'Start Chat',
      glow: 'group-hover:shadow-[0_0_35px_rgba(37,211,102,0.35)]',
      borderGlow: 'hover:border-emerald-500/60',
      iconBox: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black',
      badgeStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: <WhatsAppIcon className="w-5 h-5" />,
      subtext: 'Real-time scoping with our lead creative technical architects',
    },
  ]

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#0C0C0C] px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-[#D7E2EA]/10"
    >
      {/* Dual Cosmic Gradient Blur Backgrounds */}
      <div className="pointer-events-none absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#B600A8]/20 to-[#7621B0]/20 blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#BE4C00]/20 to-[#B600A8]/20 blur-3xl z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/90 mb-3 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              [ FOUR FRONT LAB • DIRECT CHANNELS ]
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Initiate Project. <br />
              <span className="hero-heading-bright">Accelerate Growth.</span>
            </h2>
          </div>
          <div className="max-w-md">
            {/* Live Operational Status Banner */}
            <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 mb-3 flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-xs">
                <span className="font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  SYSTEM ONLINE • ACTIVE RECEPTION
                </span>
                <span className="text-[#D7E2EA]/70 text-[11px]">
                  Direct access to partners. Guaranteed response within 12 hours.
                </span>
              </div>
            </div>
            <p className="text-xs text-[#D7E2EA]/70 font-light leading-relaxed">
              Reach out directly on any channel below or submit your project scope for immediate architectural review.
            </p>
          </div>
        </div>

        {/* Omnichannel Grid & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Top-Notch Interactive Kinetic Contact Matrix */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D7E2EA]/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                Primary Touchpoints (Click to Open or Copy)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Average reply &lt; 15m
              </span>
            </div>

            {channels.map((channel) => {
              const isCopied = copiedKey === channel.id
              return (
                <div
                  key={channel.id}
                  className={`group relative p-5 sm:p-6 rounded-3xl border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] backdrop-blur-xl transition-all duration-300 ${channel.borderGlow} ${channel.glow} hover:-translate-y-1 hover:bg-[#D7E2EA]/[0.06]`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Channel Branding & Handle */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg ${channel.iconBox}`}
                      >
                        {channel.icon}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                            {channel.title}
                          </span>
                          <span
                            className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${channel.badgeStyle}`}
                          >
                            {channel.badge}
                          </span>
                        </div>
                        <p className="text-base sm:text-lg font-bold text-white tracking-tight break-all">
                          {channel.handle}
                        </p>
                        <p className="text-[11px] text-[#D7E2EA]/60 leading-snug">
                          {channel.subtext}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                      {/* Copy Button with tactile status */}
                      <button
                        onClick={(e) => handleCopy(channel.copyValue, channel.id, e)}
                        title={`Copy ${channel.handle}`}
                        className={`h-9 px-3 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
                          isCopied
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-white/5 border-white/10 text-[#D7E2EA]/80 hover:bg-white/15 hover:text-white hover:border-white/30'
                        }`}
                        aria-label={`Copy ${channel.handle}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Direct External Action Button */}
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="h-9 px-3.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-md"
                        aria-label={`${channel.actionLabel} for ${channel.title}`}
                      >
                        <span>{channel.actionLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Studio Headquarters & Trust Architecture */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B600A8] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">
                    Studio Engineering Hub
                  </p>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    Tech Quarter Innovation Tower
                  </p>
                  <p className="text-[11px] text-[#D7E2EA]/60 font-mono mt-0.5">
                    Global Distributed Delivery
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">
                    Client Security SLA
                  </p>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    100% Client IP Ownership
                  </p>
                  <p className="text-[11px] text-[#D7E2EA]/60 font-mono mt-0.5">
                    Strict NDA &amp; Milestone Vault
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Performance Glass Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] border-2 border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              {/* Inner subtle glow line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#B600A8]/50 to-transparent" />

              <div className="mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B600A8] font-bold block mb-1">
                  [ BESPOKE PROJECT SCOPING ]
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Send Technical Brief
                </h3>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">
                  Fill in your requirements. All submissions are encrypted and routed directly to our lead engineering architect.
                </p>
              </div>

              {success ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/70 max-w-md mx-auto mb-6">
                    Our lead creative engineer will review your project requirements and respond with a technical briefing within 12 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alexander@company.com"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Vance Global Corp"
                        className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#141414] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                      >
                        <option value="Under $5,000">Under $5,000</option>
                        <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                        <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                        <option value="$30,000+">$30,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                      Primary Service Objective
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#141414] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                    >
                      <option value="Website Development">Website Development &amp; Kinetic 3D</option>
                      <option value="Business Automation">Business Automation &amp; Workflows</option>
                      <option value="AI Solutions">AI Solutions &amp; Integrations</option>
                      <option value="Digital Marketing">Digital Marketing &amp; SEO Growth</option>
                      <option value="Custom Business Solutions">Custom Business Software &amp; Portal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                      Project Vision / Technical Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your objectives, timeline, or key technical challenges..."
                      className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-400 font-mono">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-kinetic-cta w-full py-4 rounded-full text-white text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
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

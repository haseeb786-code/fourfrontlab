'use client'

import React, { useState } from 'react'
import {
  ArrowUpRight,
  Copy,
  Check,
  Loader2,
  CheckCircle2,
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

  const handleCopy = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
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
      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to submit inquiry.')
      }
    } catch {
      setError('A network error occurred. Please reach us via Gmail or WhatsApp.')
    } finally {
      setLoading(false)
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
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      handle: '+92 344 474 1603',
      copyValue: '+923444741603',
      href: 'https://wa.me/923444741603?text=Hi%20Four%20Front%20Lab%2C%20let%27s%20talk%20about%20a%20project.',
      icon: <PhoneLineIcon />,
    },
  ]

  return (
    <section id="contact" className="w-full bg-[#080808] text-[#f5f5f0] border-b border-[#1f1f1f]">
      {/* 1. Cold Minimalist Full-Width CTA Anchor */}
      <div className="py-24 sm:py-32 px-6 lg:px-10 border-b border-[#1f1f1f] text-center">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3a3a3a] mb-6">
            [ READY TO DEPLOY ]
          </p>
          <h2 className="font-editorial text-[clamp(36px,6vw,92px)] font-light leading-[1.0] tracking-[-0.03em] text-[#f5f5f0] mb-8">
            Have an ambitious project in mind?
          </h2>
          <a
            href="mailto:fourfrontlab@gmail.com"
            className="font-editorial text-2xl sm:text-4xl text-[#f5f5f0] hover:text-[#c8f542] underline underline-offset-8 transition-colors inline-block"
          >
            Start a direct conversation &rarr;
          </a>
        </div>
      </div>

      {/* 2. Direct Channels & Sharp Inquiry Grid */}
      <div className="py-24 sm:py-32 px-6 lg:px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Direct Touchpoints */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#c8f542]">
                  06
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#3a3a3a]">
                  / TOUCHPOINTS
                </span>
              </div>
              <h3 className="font-editorial text-3xl font-normal text-[#f5f5f0] mb-3">
                Direct Coordinates
              </h3>
              <p className="text-xs leading-[1.8] text-[#6b6b6b]">
                Reach our engineering desk directly. We respond within 12 business hours.
              </p>
            </div>

            {/* Sharp Channel List */}
            <div className="border-t border-[#1f1f1f]">
              {channels.map((ch) => {
                const isCopied = copiedKey === ch.id
                return (
                  <div
                    key={ch.id}
                    className="py-4 border-b border-[#1f1f1f] flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-[#1f1f1f] bg-[#111111] flex items-center justify-center text-[#6b6b6b] group-hover:text-white transition-colors">
                        {ch.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#3a3a3a] block">
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
          </div>

          {/* Right Column (7 cols): Sharp Brief Form */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#1f1f1f] p-8 sm:p-12">
            <h3 className="font-editorial text-2xl font-normal text-[#f5f5f0] mb-2">
              Send a Project Brief
            </h3>
            <p className="text-xs text-[#6b6b6b] mb-8">
              No generic questionnaires. Outline your operational challenge and timeline.
            </p>

            {success ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#c8f542] mx-auto" />
                <h4 className="font-editorial text-2xl text-[#f5f5f0]">Brief Received.</h4>
                <p className="text-xs text-[#6b6b6b] max-w-sm mx-auto">
                  Our engineering team will review your specifications and reply within 12 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b6b] hover:text-[#f5f5f0] pt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vance"
                      className="w-full bg-[#080808] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vance@company.com"
                      className="w-full bg-[#080808] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Vance Global"
                    className="w-full bg-[#080808] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] mb-2">
                    Project Vision / Technical Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current bottleneck, timeline, or required deliverables..."
                    className="w-full bg-[#080808] border border-[#1f1f1f] px-4 py-3 text-sm text-[#f5f5f0] placeholder-[#3a3a3a] focus:border-[#c8f542] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {error && <p className="font-mono text-xs text-rose-400">{error}</p>}

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
    </section>
  )
}

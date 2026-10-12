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
} from 'lucide-react'

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
      setError('A network error occurred. Please contact us via WhatsApp directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#0C0C0C] px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-[#D7E2EA]/10"
    >
      {/* Dual Cosmic Gradient Blur Backgrounds */}
      <div className="pointer-events-none absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#B600A8]/20 to-[#7621B0]/20 blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#BE4C00]/20 to-[#B600A8]/20 blur-3xl z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              [ Direct Engagement • 05 ]
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Initiate Project. <br />
              Accelerate Growth.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-[#D7E2EA]/70 font-light leading-relaxed mb-3">
              We accept a limited number of high-stakes builds per quarter to ensure obsessive attention to detail and flawless execution.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Guaranteed Response within 12 Hours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Communication Channels in Glass Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Email Card */}
            <a
              href="mailto:contact@fourfrontlab.com"
              className="group p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">Direct Inquiries</p>
                  <p className="text-base sm:text-lg font-bold text-white tracking-tight">contact@fourfrontlab.com</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/18004368736?text=Hi%20Four%20Front%20Lab%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">Priority WhatsApp</p>
                  <p className="text-base sm:text-lg font-bold text-white tracking-tight">+1 (800) 436-8736</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
            </a>

            {/* Studio Headquarters */}
            <div className="p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <MapPin className="w-5 h-5 text-[#B600A8]" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">Studio Headquarters</p>
                <p className="text-sm font-semibold text-white">Tech Quarter Innovation Tower, Suite 400</p>
                <p className="text-xs text-[#D7E2EA]/60 font-mono mt-0.5">Global Distributed Engineering</p>
              </div>
            </div>

            {/* Engagement Principles */}
            <div className="p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/5 flex flex-col gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/50">Engagement Standards</span>
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Client Intellectual Property Ownership</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict Non-Disclosure &amp; Security Compliance</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Milestone Delivery Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Performance Glass Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA]/10 bg-[#D7E2EA]/5 backdrop-blur-2xl shadow-2xl">
              {success ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#D7E2EA]/70 max-w-md mx-auto mb-6">
                    Our lead creative engineer will review your project requirements and respond with a technical briefing within 12 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/5"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
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
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Vance Global Corp"
                        className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/70 mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
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
                      className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
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
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
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

'use client'

import React, { useState } from 'react'
import { Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'

interface InquiryFormProps {
  initialService?: string
  whatsappNumber?: string
}

const serviceOptions = [
  'Website Development',
  'Business Automation',
  'AI Solutions & Integrations',
  'Digital Marketing & Growth',
  'Custom Business Solutions',
  'Full Digital Transformation',
]

const budgetOptions = [
  'Under $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
]

const timelineOptions = [
  'Immediate (< 2 weeks)',
  '1 - 2 Months',
  '2 - 3 Months',
  'Flexible / Planning',
]

export default function InquiryForm({
  initialService = 'Website Development',
  whatsappNumber = '+18004368736',
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    budget: '$10,000 - $25,000',
    timeline: '1 - 2 Months',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again or reach out on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  // Pre-filled WhatsApp message for immediate follow up
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappSummary = encodeURIComponent(
    `Hi Four Front Lab! I just submitted an inquiry on your website.\n\n` +
    `Name: ${formData.name}\n` +
    `Service: ${formData.service}\n` +
    `Budget: ${formData.budget}\n` +
    `Timeline: ${formData.timeline}\n` +
    `Overview: ${formData.message.slice(0, 150)}...`
  )
  const whatsappFollowupUrl = `https://wa.me/${cleanPhone}?text=${whatsappSummary}`

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0d121c]/90 border border-brand-cyan/40 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Inquiry Successfully Dispatched!
        </h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Thank you, <span className="text-brand-cyan font-medium">{formData.name}</span>. Our lead architects have received your requirements and will review feasibility within 4 hours.
        </p>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto mb-8 text-left">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Inquiry Summary
          </div>
          <div className="text-sm text-slate-200 space-y-1">
            <p><span className="text-slate-400">Service:</span> {formData.service}</p>
            <p><span className="text-slate-400">Estimated Budget:</span> {formData.budget}</p>
            <p><span className="text-slate-400">Timeline:</span> {formData.timeline}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappFollowupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Fast-Track on WhatsApp
          </a>
          <button
            onClick={() => {
              setSubmitted(false)
              setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: initialService,
                budget: '$10,000 - $25,000',
                timeline: '1 - 2 Months',
                message: '',
              })
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Marcus Vance"
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Work Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="marcus@company.com"
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
          />
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Phone / WhatsApp (Optional)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Aetheris Capital"
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm"
          />
        </div>
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Service of Interest *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {serviceOptions.map((srv) => (
            <button
              type="button"
              key={srv}
              onClick={() => setFormData({ ...formData, service: srv })}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                formData.service === srv
                  ? 'bg-brand-cyan/15 border-brand-cyan text-brand-cyan shadow-sm shadow-brand-cyan/20'
                  : 'bg-[#090d15] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              {srv}
            </button>
          ))}
        </div>
      </div>

      {/* Budget & Timeline Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Target Investment Range
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm cursor-pointer"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#090d15] text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Desired Launch Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm cursor-pointer"
          >
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#090d15] text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Description Message */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
          Project Goals & System Requirements *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your current bottleneck, desired features, integrations, or specific 3D/AI capabilities you need..."
          className="w-full px-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-sm resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-brand-cyan via-brand-teal to-brand-blue hover:opacity-95 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            <span>Encrypting & Dispatching...</span>
          </>
        ) : (
          <>
            <span>Submit Project Architecture Request</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        Strict NDA guaranteed. We never outsource client projects or compromise proprietary code.
      </p>
    </form>
  )
}

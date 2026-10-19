'use client'

import React, { useState, useEffect } from 'react'
import { 
  Edit, 
  Check, 
  X, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Cpu, 
  Code, 
  Bot, 
  BarChart,
  ArrowRight
} from 'lucide-react'

export default function ServicesManagerPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    shortDesc: '',
    fullDesc: '',
    deliverables: '',
    benefits: '',
    techStack: '',
    faqs: [] as { question: string; answer: string }[],
  })

  const loadServices = async (signal?: AbortSignal, checkMounted?: () => boolean) => {
    try {
      setLoading(true)
      const res = await fetch('/api/services', { signal })
      if (checkMounted && !checkMounted()) return
      const data = await res.json()
      if (checkMounted && !checkMounted()) return
      if (Array.isArray(data)) {
        setServices(data)
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') return
      console.error(e)
    } finally {
      if (!checkMounted || checkMounted()) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    loadServices(controller.signal, () => isMounted)
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleOpenEdit = (srv: any) => {
    let delStr = ''
    try {
      const arr = typeof srv.deliverables === 'string' ? JSON.parse(srv.deliverables) : srv.deliverables
      delStr = Array.isArray(arr) ? arr.join('\n') : ''
    } catch (e) {}

    let benStr = ''
    try {
      const arr = typeof srv.benefits === 'string' ? JSON.parse(srv.benefits) : srv.benefits
      benStr = Array.isArray(arr) ? arr.join('\n') : ''
    } catch (e) {}

    let techStr = ''
    try {
      const arr = typeof srv.techStack === 'string' ? JSON.parse(srv.techStack) : srv.techStack
      techStr = Array.isArray(arr) ? arr.join(', ') : ''
    } catch (e) {}

    let parsedFaqs = []
    try {
      parsedFaqs = typeof srv.faqs === 'string' ? JSON.parse(srv.faqs) : srv.faqs
    } catch (e) {}

    setFormData({
      id: srv.id,
      title: srv.title,
      shortDesc: srv.shortDesc,
      fullDesc: srv.fullDesc,
      deliverables: delStr,
      benefits: benStr,
      techStack: techStr,
      faqs: parsedFaqs || [],
    })
    setEditingService(srv)
    setModalOpen(true)
  }

  const handleAddFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: 'New Question?', answer: 'Answer details...' }],
    })
  }

  const handleRemoveFaq = (idx: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== idx),
    })
  }

  const handleFaqChange = (idx: number, field: 'question' | 'answer', val: string) => {
    const updated = [...formData.faqs]
    updated[idx][field] = val
    setFormData({ ...formData, faqs: updated })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const deliverablesArray = formData.deliverables
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const benefitsArray = formData.benefits
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const techArray = formData.techStack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      id: formData.id,
      title: formData.title,
      shortDesc: formData.shortDesc,
      fullDesc: formData.fullDesc,
      deliverables: deliverablesArray,
      benefits: benefitsArray,
      techStack: techArray,
      faqs: formData.faqs,
    }

    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setModalOpen(false)
        loadServices()
      }
    } catch (e) {
      alert('Error updating service')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Services &amp; Specializations CMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize service descriptions, deliverables, value benefits, and interactive FAQs across all detail pages.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => {
          let delCount = 0
          try {
            const arr = typeof srv.deliverables === 'string' ? JSON.parse(srv.deliverables) : srv.deliverables
            delCount = Array.isArray(arr) ? arr.length : 0
          } catch (e) {}

          let faqCount = 0
          try {
            const arr = typeof srv.faqs === 'string' ? JSON.parse(srv.faqs) : srv.faqs
            faqCount = Array.isArray(arr) ? arr.length : 0
          } catch (e) {}

          return (
            <div
              key={srv.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">
                    /{srv.slug}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-brand-cyan hover:text-black text-slate-200 border border-white/10 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Service</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {srv.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{delCount} Deliverables</span>
                <span>{faqCount} FAQs Configured</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl my-8 p-8 rounded-3xl bg-[#0d121c] border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white">
                Edit {formData.title}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Short Summary (Cards &amp; Hero)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Full In-Depth Architecture Overview
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Benefits (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Technologies Employed (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              {/* FAQs Editor */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-slate-400">
                    Frequently Asked Questions ({formData.faqs.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-brand-cyan border border-white/10"
                  >
                    + Add FAQ
                  </button>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {formData.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#090d15] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                          placeholder="Question?"
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0d121c] border border-white/10 text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(idx)}
                          className="text-red-400 hover:text-red-300 text-xs px-2"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                        placeholder="Detailed answer..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0d121c] border border-white/10 text-white text-xs resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

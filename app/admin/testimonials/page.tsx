'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Star, X } from 'lucide-react'

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    quote: '',
    rating: 5,
    featured: true,
  })

  const loadTestimonials = async (signal?: AbortSignal, checkMounted?: () => boolean) => {
    try {
      setLoading(true)
      const res = await fetch('/api/testimonials', { signal })
      if (checkMounted && !checkMounted()) return
      const data = await res.json()
      if (checkMounted && !checkMounted()) return
      if (Array.isArray(data)) {
        setTestimonials(data)
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
    loadTestimonials(controller.signal, () => isMounted)
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      clientName: '',
      clientRole: 'Executive',
      clientCompany: '',
      quote: '',
      rating: 5,
      featured: true,
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (t: any) => {
    setEditingId(t.id)
    setFormData({
      clientName: t.clientName,
      clientRole: t.clientRole,
      clientCompany: t.clientCompany,
      quote: t.quote,
      rating: t.rating || 5,
      featured: Boolean(t.featured),
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id))
      }
    } catch (e) {
      alert('Failed to delete testimonial')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        const res = await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        })
        if (res.ok) {
          setModalOpen(false)
          loadTestimonials()
        }
      } else {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setModalOpen(false)
          loadTestimonials()
        }
      }
    } catch (e) {
      alert('Failed to save testimonial')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Client Testimonials Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage executive reviews, star ratings, and featured status shown on the public site.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-2 rounded-lg bg-white/5 hover:text-white text-slate-400 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                <p className="text-xs text-slate-400">
                  {t.clientRole} • <strong className="text-slate-300">{t.clientCompany}</strong>
                </p>
              </div>
              {t.featured && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-8 rounded-3xl bg-[#0d121c] border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-lg font-bold text-white">
                {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.clientCompany}
                    onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Review Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="featuredTestimonial"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-cyan bg-[#090d15]"
                  />
                  <label htmlFor="featuredTestimonial" className="text-xs text-white cursor-pointer">
                    Display on Homepage
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-cyan text-black"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

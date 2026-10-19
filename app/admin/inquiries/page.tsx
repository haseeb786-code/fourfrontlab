'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Download, 
  Search, 
  MessageSquare, 
  Trash2, 
  Save, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react'

export default function InquiriesCrmPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [notesState, setNotesState] = useState<Record<string, string>>({})
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const loadInquiries = async (signal?: AbortSignal, checkMounted?: () => boolean) => {
    try {
      setLoading(true)
      const res = await fetch('/api/inquiries', { signal })
      if (checkMounted && !checkMounted()) return
      const data = await res.json()
      if (checkMounted && !checkMounted()) return
      if (Array.isArray(data)) {
        setInquiries(data)
        const notesMap: Record<string, string> = {}
        data.forEach((inq) => {
          notesMap[inq.id] = inq.notes || ''
        })
        setNotesState(notesMap)
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
    loadInquiries(controller.signal, () => isMounted)
    return () => {
      isMounted = false
      controller.abort()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setInquiries(
          inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        )
      }
    } catch (e) {
      alert('Failed to update status')
    }
  }

  const handleSaveNotes = async (id: string) => {
    const notes = notesState[id] || ''
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
      if (res.ok) {
        setSaveSuccess(id)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setSaveSuccess(null), 3000)
      }
    } catch (e) {
      alert('Failed to save notes')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id))
      }
    } catch (e) {
      alert('Failed to delete lead')
    }
  }

  const statuses = [
    { label: 'All Leads', value: 'all' },
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Converted', value: 'converted' },
    { label: 'Closed', value: 'closed' },
  ]

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = selectedStatus === 'all' || inq.status === selectedStatus
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.company?.toLowerCase().includes(q) ||
      inq.service?.toLowerCase().includes(q)
    return matchesStatus && matchesQuery
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Client Inquiries &amp; CRM Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage incoming project requests, update qualification stages, add internal notes, and export to CSV.
          </p>
        </div>

        <a
          href="/api/inquiries/export"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors w-fit"
        >
          <Download className="w-4 h-4" />
          <span>Export All Leads (CSV)</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setSelectedStatus(s.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedStatus === s.value
                  ? 'bg-brand-cyan text-black shadow-glow-cyan'
                  : 'bg-[#0d121c] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0d121c] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>
      </div>

      {/* Inquiries List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#0b0f19] rounded-3xl border border-white/5">
          <p className="text-slate-400 text-sm">No inquiries found in this view.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((inq) => {
            const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '')
            const whatsappText = encodeURIComponent(
              `Hi ${inq.name}! This is the engineering leadership team at Four Front Lab following up on your inquiry for ${inq.service}.`
            )
            const whatsappLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=${whatsappText}` : null

            return (
              <div
                key={inq.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/30 transition-all flex flex-col justify-between"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{inq.name}</h3>
                      {inq.company && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                          <Building className="w-3.5 h-3.5 text-slate-500" />
                          {inq.company}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-slate-300 hover:text-brand-cyan">
                        <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          {inq.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 uppercase">Stage:</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase font-mono border focus:outline-none cursor-pointer ${
                        inq.status === 'new'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : inq.status === 'qualified'
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                          : inq.status === 'converted'
                          ? 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40'
                          : 'bg-white/10 text-slate-300 border-white/20'
                      }`}
                    >
                      <option value="new" className="bg-[#090d15] text-white">New</option>
                      <option value="contacted" className="bg-[#090d15] text-white">Contacted</option>
                      <option value="qualified" className="bg-[#090d15] text-white">Qualified</option>
                      <option value="converted" className="bg-[#090d15] text-white">Converted</option>
                      <option value="closed" className="bg-[#090d15] text-white">Closed</option>
                    </select>

                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scope details pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                  <div className="p-3 rounded-xl bg-[#090d15] border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Service Interested</span>
                    <span className="text-xs font-bold text-white">{inq.service}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d15] border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Target Budget</span>
                    <span className="text-xs font-bold text-brand-cyan font-mono">{inq.budget}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d15] border border-white/5">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Timeline</span>
                    <span className="text-xs font-bold text-white">{inq.timeline}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-[#080c13] border border-white/5 mb-5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Requirements &amp; Goals:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {inq.message}
                  </p>
                </div>

                {/* Internal Notes & Quick Action Row */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add confidential internal notes (e.g. Call scheduled, Sent proposal)..."
                      value={notesState[inq.id] || ''}
                      onChange={(e) =>
                        setNotesState({ ...notesState, [inq.id]: e.target.value })
                      }
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-cyan"
                    />
                    <button
                      onClick={() => handleSaveNotes(inq.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{saveSuccess === inq.id ? 'Saved!' : 'Save'}</span>
                    </button>
                  </div>

                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

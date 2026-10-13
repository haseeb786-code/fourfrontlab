'use client'

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Star, 
  ExternalLink, 
  Check, 
  X, 
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react'

export default function PortfolioManagerPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [catModalOpen, setCatModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // New Category Form State
  const [newCatName, setNewCatName] = useState('')
  const [newCatSlug, setNewCatSlug] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')
  const [catError, setCatError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    client: '',
    industry: '',
    categoryId: '',
    overview: '',
    problem: '',
    solution: '',
    techStack: 'Next.js 14, TypeScript, Tailwind CSS, Prisma',
    resultsKey1: 'Efficiency',
    resultsVal1: '+75% speed',
    resultsKey2: 'ROI',
    resultsVal2: '$1M+ saved',
    coverImage: '/images/portfolio-default.jpg',
    liveUrl: '',
    featured: true,
    published: true,
    order: 0,
  })

  const loadData = async (signal?: AbortSignal, checkMounted?: () => boolean) => {
    try {
      setLoading(true)
      const [projRes, catRes] = await Promise.all([
        fetch('/api/projects?all=true', { signal }),
        fetch('/api/categories', { signal }),
      ])
      if (checkMounted && !checkMounted()) return
      
      const projData = await projRes.json()
      const catData = await catRes.json()
      if (checkMounted && !checkMounted()) return

      if (Array.isArray(projData)) {
        setProjects(projData)
      }
      if (Array.isArray(catData)) {
        setCategories(catData)
        if (catData.length > 0 && !formData.categoryId) {
          setFormData((prev) => ({ ...prev, categoryId: catData[0].id }))
        }
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
    loadData(controller.signal, () => isMounted)
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleOpenCreate = () => {
    setEditingId(null)
    setFormData({
      title: '',
      slug: '',
      client: '',
      industry: 'Enterprise Technology',
      categoryId: categories[0]?.id || '',
      overview: '',
      problem: '',
      solution: '',
      techStack: 'Next.js 14, TypeScript, Tailwind CSS, Prisma',
      resultsKey1: 'Efficiency',
      resultsVal1: '+75% speed',
      resultsKey2: 'ROI',
      resultsVal2: '$1M+ saved',
      coverImage: '/images/portfolio-default.jpg',
      liveUrl: '',
      featured: true,
      published: true,
      order: projects.length + 1,
    })
    setModalOpen(true)
  }

  const handleOpenEdit = (proj: any) => {
    setEditingId(proj.id)

    let parsedResults: Record<string, string> = {}
    try {
      parsedResults = typeof proj.results === 'string' ? JSON.parse(proj.results) : proj.results
    } catch (e) {}
    const entries = Object.entries(parsedResults)

    let parsedTech = ''
    try {
      const arr = typeof proj.techStack === 'string' ? JSON.parse(proj.techStack) : proj.techStack
      parsedTech = Array.isArray(arr) ? arr.join(', ') : arr
    } catch (e) {
      parsedTech = proj.techStack || ''
    }

    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      client: proj.client || '',
      industry: proj.industry || '',
      categoryId: proj.categoryId || categories[0]?.id || '',
      overview: proj.overview || '',
      problem: proj.problem || '',
      solution: proj.solution || '',
      techStack: parsedTech,
      resultsKey1: entries[0]?.[0] || 'Efficiency',
      resultsVal1: entries[0]?.[1] || '+75%',
      resultsKey2: entries[1]?.[0] || 'ROI',
      resultsVal2: entries[1]?.[1] || 'Positive',
      coverImage: proj.coverImage || '/images/portfolio-default.jpg',
      liveUrl: proj.liveUrl || '',
      featured: Boolean(proj.featured),
      published: proj.published !== undefined ? Boolean(proj.published) : true,
      order: proj.order || 0,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (e) {
      alert('Failed to delete project')
    }
  }

  const handleToggleFeatured = async (proj: any) => {
    const newFeatured = !proj.featured
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured }),
      })
      if (res.ok) {
        setProjects(
          projects.map((p) => (p.id === proj.id ? { ...p, featured: newFeatured } : p))
        )
      }
    } catch (e) {}
  }

  const handleTogglePublished = async (proj: any) => {
    const newPublished = proj.published === false ? true : false
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newPublished }),
      })
      if (res.ok) {
        setProjects(
          projects.map((p) => (p.id === proj.id ? { ...p, published: newPublished } : p))
        )
      }
    } catch (e) {}
  }

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return

    const currentProj = projects[index]
    const targetProj = projects[targetIndex]

    const newOrderCurrent = targetProj.order || targetIndex + 1
    const newOrderTarget = currentProj.order || index + 1

    try {
      await Promise.all([
        fetch(`/api/projects/${currentProj.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: newOrderCurrent }),
        }),
        fetch(`/api/projects/${targetProj.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: newOrderTarget }),
        }),
      ])
      await loadData()
    } catch (err) {
      alert('Failed to update project order')
    }
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setCatError(null)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCatName,
          slug: newCatSlug || undefined,
          description: newCatDesc,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewCatName('')
        setNewCatSlug('')
        setNewCatDesc('')
        await loadData()
      } else {
        setCatError(data.error || 'Failed to create category')
      }
    } catch (err: any) {
      setCatError('Network error creating category')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        await loadData()
      } else {
        alert(data.error || 'Cannot delete category')
      }
    } catch (err) {
      alert('Failed to delete category')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const techArray = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const resultsObj: Record<string, string> = {}
    if (formData.resultsKey1 && formData.resultsVal1) {
      resultsObj[formData.resultsKey1] = formData.resultsVal1
    }
    if (formData.resultsKey2 && formData.resultsVal2) {
      resultsObj[formData.resultsKey2] = formData.resultsVal2
    }

    const payload = {
      title: formData.title,
      slug: formData.slug || undefined,
      client: formData.client,
      industry: formData.industry,
      categoryId: formData.categoryId,
      overview: formData.overview,
      problem: formData.problem,
      solution: formData.solution,
      techStack: JSON.stringify(techArray),
      results: JSON.stringify(resultsObj),
      coverImage: formData.coverImage,
      liveUrl: formData.liveUrl,
      featured: formData.featured,
      published: formData.published,
      order: Number(formData.order) || 0,
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          setModalOpen(false)
          loadData()
        } else {
          alert('Failed to update project')
        }
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          setModalOpen(false)
          loadData()
        } else {
          alert('Failed to create project')
        }
      }
    } catch (e) {
      alert('Error saving project')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portfolio &amp; Case Studies Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage case studies, configurable categories, draft/published status, and display sequence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCatModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <Layers className="w-4 h-4 text-brand-cyan" />
            <span>Manage Categories ({categories.length})</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Case Study</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3 px-3 w-16">Order</th>
                <th className="py-3 px-4">Case Study</th>
                <th className="py-3 px-4">Client / Industry</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((proj, idx) => (
                <tr key={proj.id} className="hover:bg-white/5 transition-colors">
                  {/* Order controls */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-1 font-mono text-slate-400">
                      <span className="w-5 text-center font-bold text-white">{proj.order || idx + 1}</span>
                      <div className="flex flex-col">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveOrder(idx, 'up')}
                          className="p-0.5 text-slate-500 hover:text-brand-cyan disabled:opacity-20"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          disabled={idx === projects.length - 1}
                          onClick={() => handleMoveOrder(idx, 'down')}
                          className="p-0.5 text-slate-500 hover:text-brand-cyan disabled:opacity-20"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{proj.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">/portfolio/{proj.slug}</div>
                  </td>

                  {/* Client & Industry */}
                  <td className="py-4 px-4">
                    <div className="text-slate-200 font-medium">{proj.client}</div>
                    <div className="text-slate-400">{proj.industry}</div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 text-brand-cyan border border-brand-cyan/20">
                      {proj.category?.name || 'General'}
                    </span>
                  </td>

                  {/* Draft / Published status */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleTogglePublished(proj)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-colors ${
                        proj.published !== false
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                      title="Click to toggle status"
                    >
                      {proj.published !== false ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Featured status */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border transition-colors ${
                        proj.featured
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-white/5 text-slate-500 border-white/10'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${proj.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span>{proj.featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/portfolio/${proj.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:text-brand-cyan text-slate-400 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-2 rounded-lg bg-white/5 hover:text-white text-slate-400 transition-colors"
                        title="Edit Case Study"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Case Study"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Categories Management */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl p-8 rounded-3xl bg-[#0d121c] border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-cyan" />
                <span>Configurable Categories Manager</span>
              </h2>
              <button onClick={() => setCatModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Existing Categories List */}
            <div className="mb-6 space-y-2 max-h-52 overflow-y-auto pr-1">
              {categories.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#090d15] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{c.name}</div>
                    <div className="text-[10px] text-brand-cyan font-mono">slug: {c.slug} • {c._count?.projects ?? 0} projects</div>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(c.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Create New Category Form */}
            <form onSubmit={handleCreateCategory} className="p-4 rounded-2xl bg-[#090d15] border border-white/10 space-y-3">
              <div className="text-xs font-mono uppercase text-brand-cyan font-semibold">
                Add New Category
              </div>

              {catError && (
                <div className="text-xs text-red-400 font-mono">{catError}</div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Category Name (e.g. Mobile Apps)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0d121c] border border-white/10 text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="Slug (optional, auto-generated)"
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0d121c] border border-white/10 text-white text-xs"
                />
              </div>

              <input
                type="text"
                placeholder="Description..."
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0d121c] border border-white/10 text-white text-xs"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-cyan text-black shadow-glow-cyan"
              >
                + Create Category
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Case Study */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl my-8 p-8 rounded-3xl bg-[#0d121c] border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Case Study' : 'Publish New Case Study'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Project Title *
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
                    URL Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Executive Overview *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    The Problem / Bottleneck
                  </label>
                  <textarea
                    rows={3}
                    value={formData.problem}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    The Engineered Solution
                  </label>
                  <textarea
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Next.js 14, TypeScript, Tailwind CSS, Python, FastAPI"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                />
              </div>

              {/* Quantifiable Results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Metric 1 Name</label>
                  <input
                    type="text"
                    value={formData.resultsKey1}
                    onChange={(e) => setFormData({ ...formData, resultsKey1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d15] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Metric 1 Value</label>
                  <input
                    type="text"
                    value={formData.resultsVal1}
                    onChange={(e) => setFormData({ ...formData, resultsVal1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d15] border border-white/10 text-white text-xs font-mono text-brand-cyan"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Metric 2 Name</label>
                  <input
                    type="text"
                    value={formData.resultsKey2}
                    onChange={(e) => setFormData({ ...formData, resultsKey2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d15] border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Metric 2 Value</label>
                  <input
                    type="text"
                    value={formData.resultsVal2}
                    onChange={(e) => setFormData({ ...formData, resultsVal2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#090d15] border border-white/10 text-white text-xs font-mono text-brand-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                    Live Demo / Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="publishedToggle"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-400 bg-[#090d15] border-white/20"
                  />
                  <label htmlFor="publishedToggle" className="text-xs text-white font-medium cursor-pointer">
                    Live / Published Status
                  </label>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="featuredToggle"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-cyan bg-[#090d15] border-white/20"
                  />
                  <label htmlFor="featuredToggle" className="text-xs text-white font-medium cursor-pointer">
                    Feature on Homepage
                  </label>
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
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

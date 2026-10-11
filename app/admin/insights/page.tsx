'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Search, ExternalLink, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  readTime: string
  featured: boolean
  published: boolean
  createdAt: string
}

export default function AdminInsightsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Engineering',
    author: 'Four Front Lab',
    readTime: '5 min read',
    featured: false,
    published: true,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?all=true')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Engineering',
      author: 'Four Front Lab',
      readTime: '5 min read',
      featured: false,
      published: true,
    })
    setShowModal(true)
  }

  const handleOpenEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      readTime: post.readTime,
      featured: post.featured,
      published: post.published,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingPost ? `/api/posts/${editingPost.id}` : '/api/posts'
      const method = editingPost ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setShowModal(false)
        fetchPosts()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save post')
      }
    } catch (err) {
      console.error('Save error:', err)
      alert('Error saving post')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this publication?')) return
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleTogglePublish = async (post: Post) => {
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error('Toggle error:', err)
    }
  }

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" /> Content Management System
          </div>
          <h1 className="text-2xl font-bold text-white">Insights & Publications</h1>
          <p className="text-sm text-slate-400">Manage technical briefs, architectural articles, and research notes</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22D3EE] text-black font-semibold text-sm hover:bg-[#67E8F9] transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> New Publication
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search publications by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0D111A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading publications...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No publications found. Click &ldquo;New Publication&rdquo; to draft one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/30 border-b border-[#1E293B] text-xs font-mono uppercase text-slate-400">
                <tr>
                  <th className="px-6 py-4">Title & Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/60">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{post.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 max-w-md mt-0.5">{post.excerpt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300 font-mono">
                      {post.author}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          post.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {post.published ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {post.published && (
                          <Link
                            href={`/insights/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                            title="View Public Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#22D3EE] hover:bg-white/5 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingPost ? 'Edit Publication' : 'Draft New Publication'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                  placeholder="e.g. Modern Web Architecture Patterns"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                    placeholder="e.g. Engineering, Architecture, AI"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Author Name / Team</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                  placeholder="e.g. Four Front Lab Systems Group"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Executive Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                  placeholder="Brief 1-2 sentence overview shown on index cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Article Content (Markdown supported) *</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#0D111A] border border-[#1E293B] rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#22D3EE]"
                  placeholder="Write the full content body..."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#22D3EE] focus:ring-0"
                  />
                  Feature as Hero Article
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#22D3EE] focus:ring-0"
                  />
                  Publish Immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#22D3EE] text-black font-semibold text-sm hover:bg-[#67E8F9] transition-all shadow-md"
                >
                  {editingPost ? 'Save Changes' : 'Create Publication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

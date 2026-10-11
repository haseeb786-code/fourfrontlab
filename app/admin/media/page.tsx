'use client'

import React, { useState, useEffect } from 'react'
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  ExternalLink,
  Sparkles
} from 'lucide-react'

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const loadMedia = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/media')
      const data = await res.json()
      if (Array.isArray(data)) {
        setMedia(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedia()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('altText', file.name)

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        await loadMedia()
      } else {
        alert('Failed to upload file')
      }
    } catch (err) {
      alert('Upload error')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMedia(media.filter((m) => m.id !== id))
      }
    } catch (e) {
      alert('Delete failed')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Media &amp; Asset Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload and reuse brand photography, logos, project graphics, and case study media.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan transition-all cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image Asset'}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Grid of assets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-brand-cyan/40 overflow-hidden transition-all flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative h-40 bg-[#07090e] flex items-center justify-center p-2 overflow-hidden">
              <img
                src={item.fileUrl}
                alt={item.altText || item.fileName}
                className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  // Fallback for missing file
                  (e.target as any).src = '/logo.jpeg'
                }}
              />
            </div>

            {/* Meta details */}
            <div className="p-4 border-t border-white/5 space-y-3">
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate" title={item.fileName}>
                  {item.fileName}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {Math.round((item.sizeBytes || 0) / 1024)} KB • {item.mimeType}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopy(item.fileUrl, item.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 hover:text-brand-cyan transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

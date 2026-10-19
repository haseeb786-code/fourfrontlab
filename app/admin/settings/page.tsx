'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Save, Check, Sparkles, Phone, Mail, MapPin, Globe, Share2 } from 'lucide-react'

export default function SiteSettingsManagerPage() {
  const [settings, setSettings] = useState({
    site_name: 'Four Front Lab',
    site_tagline: 'Engineering Next-Generation Digital Experiences, Intelligent Automation & Scalable Software',
    whatsapp_number: '+92 344 474 1603',
    whatsapp_raw: '+923444741603',
    contact_email: 'contact@fourfrontlab.com',
    office_address: 'Islamabad, Pakistan',
    social_twitter: 'https://x.com/fourfrontlab',
    social_linkedin: 'https://linkedin.com/company/fourfrontlab',
    social_github: 'https://github.com/fourfrontlab',
    meta_title: 'Four Front Lab | Premium Digital Agency & Software Engineering',
    meta_description: 'Four Front Lab is an elite digital engineering agency specializing in bespoke web development, business process automation, AI integration, and high-performance custom software.',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    fetch('/api/settings', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }))
        }
      })
      .catch((e) => {
        if (e?.name === 'AbortError') return
        console.error(e)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
      controller.abort()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSaved(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setSaved(false), 3000)
      } else {
        alert('Failed to save settings')
      }
    } catch (e) {
      alert('Error updating settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Homepage &amp; Global Site Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure agency contact coordinates, WhatsApp hotline, SEO metadata, and social profiles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact & WhatsApp Channel Section */}
        <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-brand-cyan text-sm font-bold pb-3 border-b border-white/5">
            <Phone className="w-4 h-4" />
            <span>Direct WhatsApp &amp; Inquiries Channel</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                WhatsApp Display Number
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="+1 (800) 436-8736"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                WhatsApp Raw Digits (for wa.me links)
              </label>
              <input
                type="text"
                value={settings.whatsapp_raw}
                onChange={(e) => setSettings({ ...settings, whatsapp_raw: e.target.value })}
                placeholder="+923444741603"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                placeholder="contact@fourfrontlab.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={settings.office_address}
                onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
                placeholder="Islamabad, Pakistan"
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>

        {/* Agency Identity & SEO Meta */}
        <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-brand-cyan text-sm font-bold pb-3 border-b border-white/5">
            <Globe className="w-4 h-4" />
            <span>Brand Identity &amp; Global SEO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Meta SEO Title
              </label>
              <input
                type="text"
                value={settings.meta_title}
                onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Global Agency Tagline
            </label>
            <input
              type="text"
              value={settings.site_tagline}
              onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Meta SEO Description
            </label>
            <textarea
              rows={3}
              value={settings.meta_description}
              onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan resize-none"
            />
          </div>
        </div>

        {/* Social Network Profiles */}
        <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-brand-cyan text-sm font-bold pb-3 border-b border-white/5">
            <Share2 className="w-4 h-4" />
            <span>Social Network Profiles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={settings.social_twitter}
                onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={settings.social_linkedin}
                onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={settings.social_github}
                onChange={(e) => setSettings({ ...settings, social_github: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#090d15] border border-white/10 text-white text-xs focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-[#090d15] border border-white/5">
          <span className="text-xs text-slate-400">
            {saved ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Settings updated successfully!
              </span>
            ) : (
              'Changes are updated immediately in production database.'
            )}
          </span>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Persisting...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

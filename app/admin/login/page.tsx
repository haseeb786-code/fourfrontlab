'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@fourfrontlab.com')
  const [password, setPassword] = useState('admin123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-brand-cyan/40 p-0.5 bg-black/60 shadow-glow-cyan mx-auto mb-4">
            <img
              src="/logo.jpeg"
              alt="Four Front Lab Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            FOUR FRONT LAB
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-brand-cyan mt-1">
            Enterprise Admin CMS Portal
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fourfrontlab.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090d15] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-cyan transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-brand-cyan to-brand-blue hover:opacity-95 shadow-glow-cyan transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Mission Control</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Development credentials reminder */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-slate-400">
              <Sparkles className="w-3 h-3 text-brand-cyan" />
              <span>Default: admin@fourfrontlab.com / admin123456</span>
            </div>
            <div className="mt-3">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-brand-cyan transition-colors"
              >
                ← Return to Public Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

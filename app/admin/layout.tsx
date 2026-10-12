'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Briefcase, 
  Cpu, 
  Inbox, 
  Star, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  BookOpen
} from 'lucide-react'

const navItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Portfolio CMS', href: '/admin/portfolio', icon: Briefcase },
  { name: 'Services CMS', href: '/admin/services', icon: Cpu },
  { name: 'Insights & Blog', href: '/admin/insights', icon: BookOpen },
  { name: 'Inquiries & CRM', href: '/admin/inquiries', icon: Inbox },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [adminUser, setAdminUser] = useState<any>(null)

  // Check login route to bypass sidebar
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) return

    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.user) {
          setAdminUser(data.user)
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
  }, [pathname, isLoginPage, router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0a0e17] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-brand-cyan/40 bg-black">
            <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-extrabold text-sm text-white font-mono">
            FOUR FRONT CMS
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#090d15] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-cyan/40 p-0.5 bg-black/60 shadow-glow-cyan shrink-0">
              <img src="/logo.jpeg" alt="Four Front Lab" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-wide">
                FOUR FRONT LAB
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan">
                Operations CMS
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-cyan text-black font-semibold shadow-glow-cyan'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer Actions & Current Admin User */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-brand-cyan bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {adminUser && (
            <div className="px-3 py-2 rounded-xl bg-[#0d121c] border border-white/5 flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="text-xs font-semibold text-white truncate">{adminUser.name}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{adminUser.email}</div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Active Session"></span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

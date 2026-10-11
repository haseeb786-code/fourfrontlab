'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Code, 
  Cpu, 
  Bot, 
  BarChart, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  ChevronDown 
} from 'lucide-react'

const navServices = [
  { name: 'Website Development', href: '/services/website-development', icon: Code, desc: '3D, WebGL & High-Speed Next.js Experiences' },
  { name: 'Business Automation', href: '/services/business-automation', icon: Cpu, desc: 'Self-healing workflows & API integrations' },
  { name: 'AI Solutions & Integrations', href: '/services/ai-solutions', icon: Bot, desc: 'Custom LLMs, RAG & domain copilots' },
  { name: 'Digital Marketing & Growth', href: '/services/digital-marketing', icon: BarChart, desc: 'Programmatic SEO & conversion engines' },
  { name: 'Custom Software & Portals', href: '/services/custom-software', icon: Layers, desc: 'Enterprise SaaS & tailored portals' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isLinkActive = (path: string) => pathname === path

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-brand-cyan/40 p-0.5 bg-black/60 shadow-glow-cyan transition-transform group-hover:scale-105">
              <img 
                src="/logo.jpeg" 
                alt="Four Front Lab Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-lg text-white group-hover:text-brand-cyan transition-colors flex items-center gap-1.5">
                FOUR FRONT LAB
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono -mt-0.5">
                Digital Engineering & AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link 
              href="/" 
              className={`transition-colors hover:text-brand-cyan ${pathname === '/' ? 'text-brand-cyan font-semibold' : 'text-slate-300'}`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 py-1 transition-colors hover:text-brand-cyan ${
                  pathname.startsWith('/services') ? 'text-brand-cyan font-semibold' : 'text-slate-300'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-brand-cyan' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 pt-2 z-50">
                  <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/80 backdrop-blur-xl">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5 mb-1 border-b border-white/5">
                      Core Specializations
                    </div>
                    {navServices.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-black transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-brand-cyan transition-colors">
                              {service.name}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1">
                              {service.desc}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <Link 
                        href="/services" 
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-brand-cyan hover:text-white transition-colors"
                      >
                        <span>View All Solutions Overview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/portfolio" 
              className={`transition-colors hover:text-brand-cyan ${
                pathname.startsWith('/portfolio') ? 'text-brand-cyan font-semibold' : 'text-slate-300'
              }`}
            >
              Work & Case Studies
            </Link>

            <Link 
              href="/about" 
              className={`transition-colors hover:text-brand-cyan ${
                pathname === '/about' ? 'text-brand-cyan font-semibold' : 'text-slate-300'
              }`}
            >
              About
            </Link>

            <Link 
              href="/insights" 
              className={`transition-colors hover:text-brand-cyan ${
                pathname.startsWith('/insights') ? 'text-brand-cyan font-semibold' : 'text-slate-300'
              }`}
            >
              Insights
            </Link>

            <Link 
              href="/contact" 
              className={`transition-colors hover:text-brand-cyan ${
                pathname === '/contact' ? 'text-brand-cyan font-semibold' : 'text-slate-300'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/admin"
              className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors px-2.5 py-1.5 rounded-lg border border-white/5 hover:border-white/20"
              title="Admin Portal"
            >
              CMS Portal
            </a>
            <a
              href="/contact"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-brand-cyan to-brand-blue hover:opacity-95 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="/contact"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-cyan text-black"
            >
              Inquire
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#07090e]/95 backdrop-blur-2xl px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <a 
              href="/" 
              className="text-slate-200 hover:text-brand-cyan py-1"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <div className="py-1">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                Services
              </div>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {navServices.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="text-slate-300 hover:text-brand-cyan py-1 text-sm flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <a 
              href="/portfolio" 
              className="text-slate-200 hover:text-brand-cyan py-1"
              onClick={() => setIsOpen(false)}
            >
              Work & Case Studies
            </a>
            <a 
              href="/about" 
              className="text-slate-200 hover:text-brand-cyan py-1"
              onClick={() => setIsOpen(false)}
            >
              About Agency
            </a>
            <a 
              href="/insights" 
              className="text-slate-200 hover:text-brand-cyan py-1"
              onClick={() => setIsOpen(false)}
            >
              Insights & Blog
            </a>
            <a 
              href="/contact" 
              className="text-slate-200 hover:text-brand-cyan py-1"
              onClick={() => setIsOpen(false)}
            >
              Contact & Inquiry
            </a>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href="/admin"
                className="text-xs font-mono text-slate-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Admin CMS Access
              </a>
              <a
                href="/contact"
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-black"
                onClick={() => setIsOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

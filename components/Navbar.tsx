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
  ChevronDown,
  Sparkles,
} from 'lucide-react'

const navServices = [
  { name: 'Website Development', href: '/services/website-development', icon: Code, desc: 'Kinetic 3D, WebGL & Sub-Second Next.js' },
  { name: 'Business Automation', href: '/services/business-automation', icon: Cpu, desc: 'Autonomous pipelines & API integrations' },
  { name: 'AI Solutions & RAG', href: '/services/ai-solutions', icon: Bot, desc: 'Domain LLMs & enterprise copilots' },
  { name: 'Digital Marketing', href: '/services/digital-marketing', icon: BarChart, desc: 'Algorithmic SEO & CRO conversion engines' },
  { name: 'Custom Software', href: '/services/custom-software', icon: Layers, desc: 'Bespoke client portals & cloud software' },
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

  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-[#D7E2EA]/15 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-[#D7E2EA]/20 bg-white/5 p-1 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.webp"
                alt="Four Front Lab Logo"
                fill
                sizes="36px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-wider text-base sm:text-lg text-white group-hover:text-[#D7E2EA] transition-colors flex items-center gap-1.5 font-mono uppercase">
                FOUR FRONT LAB
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#D7E2EA]/50 font-mono -mt-0.5">
                Kinetic Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
            <Link
              href="/"
              className={`transition-colors hover:text-white ${
                pathname === '/' ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
              }`}
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
                className={`flex items-center gap-1.5 py-1 transition-colors hover:text-white uppercase ${
                  pathname.startsWith('/services') ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
                }`}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-84 pt-3 z-50">
                  <div className="bg-[#121212] border border-[#D7E2EA]/20 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl">
                    <div className="text-[10px] font-mono text-[#D7E2EA]/40 uppercase tracking-widest px-3 py-1.5 mb-1 border-b border-white/5">
                      Engineering Disciplines
                    </div>
                    {navServices.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-white/5 text-white group-hover:bg-[#B600A8] transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-[#D7E2EA] transition-colors">
                              {service.name}
                            </div>
                            <div className="text-[10px] text-[#D7E2EA]/50 line-clamp-1 font-sans">
                              {service.desc}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={`transition-colors hover:text-white ${
                pathname.startsWith('/portfolio') ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
              }`}
            >
              Work
            </Link>

            <Link
              href="/about"
              className={`transition-colors hover:text-white ${
                pathname === '/about' ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
              }`}
            >
              About
            </Link>

            <Link
              href="/insights"
              className={`transition-colors hover:text-white ${
                pathname.startsWith('/insights') ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
              }`}
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className={`transition-colors hover:text-white ${
                pathname === '/contact' ? 'text-white font-bold' : 'text-[#D7E2EA]/70'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-[11px] font-mono uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors"
            >
              CMS
            </Link>

            <Link
              href="#contact"
              className="btn-kinetic-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] font-semibold uppercase tracking-widest"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#D7E2EA]/20 text-white bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0C0C0C]/95 border-b border-[#D7E2EA]/20 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
          <Link href="/" className="py-2 text-white hover:text-[#B600A8]">
            Home
          </Link>
          <Link href="/services" className="py-2 text-white hover:text-[#B600A8]">
            Services
          </Link>
          <Link href="/portfolio" className="py-2 text-white hover:text-[#B600A8]">
            Case Studies
          </Link>
          <Link href="/about" className="py-2 text-white hover:text-[#B600A8]">
            About Us
          </Link>
          <Link href="/insights" className="py-2 text-white hover:text-[#B600A8]">
            Insights
          </Link>
          <Link href="/contact" className="py-2 text-white hover:text-[#B600A8]">
            Contact
          </Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="#contact"
              className="btn-kinetic-cta w-full py-3 rounded-full text-center text-white text-xs font-semibold uppercase tracking-widest"
            >
              Start Project
            </Link>
            <Link
              href="/admin/login"
              className="w-full py-2.5 rounded-full border border-white/20 text-center text-white/70 text-xs"
            >
              Admin CMS Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

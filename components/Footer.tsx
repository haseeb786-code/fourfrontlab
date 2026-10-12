import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="border-t border-[#D7E2EA]/15 bg-[#0C0C0C] text-[#D7E2EA]/70 text-xs font-mono relative overflow-hidden select-none">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#B600A8]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D7E2EA]/20 bg-white/5 p-1 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.webp"
                  alt="Four Front Lab Logo"
                  fill
                  sizes="40px"
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-black tracking-wider text-xl text-white group-hover:text-[#D7E2EA] transition-colors uppercase">
                FOUR FRONT LAB
              </span>
            </Link>
            <p className="text-[#D7E2EA]/60 text-xs leading-relaxed max-w-sm mt-1 font-sans">
              Engineering Awwwards-caliber digital experiences, kinetic web architectures, autonomous workflows, and domain-specific AI integrations for ambitious enterprises globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-[#D7E2EA]/50 transition-colors"
                aria-label="Follow Four Front Lab on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-[#D7E2EA]/50 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-[#D7E2EA]/50 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-mono">
              [ Specializations ]
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs">
              <li>
                <Link href="/services/website-development" className="hover:text-white transition-colors">
                  Kinetic Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/business-automation" className="hover:text-white transition-colors">
                  Autonomous Business Automation
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" className="hover:text-white transition-colors">
                  Enterprise AI Solutions &amp; RAG
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="hover:text-white transition-colors">
                  Algorithmic Marketing &amp; CRO
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software" className="hover:text-white transition-colors">
                  Bespoke Software Portals
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-mono">
              [ Navigation ]
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  The Four Fronts Framework
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Selected Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights &amp; Architecture
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book a Discovery Call
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors text-emerald-400 font-mono">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Office Contacts */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-mono">
              [ Direct Reach ]
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-xs">
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#B600A8] shrink-0" />
                <a href="mailto:contact@fourfrontlab.com" className="hover:text-white transition-colors">
                  contact@fourfrontlab.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/18004368736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +1 (800) 436-8736 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#BE4C00] shrink-0 mt-0.5" />
                <span>Tech Quarter Innovation Tower, Suite 400</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D7E2EA]/50">
          <p>© {currentYear} Four Front Lab. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react'

// Custom SVGs for official social branding
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

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

            {/* Social & Direct Contact Channels */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-pink-500/60 hover:bg-gradient-to-tr hover:from-[#F77737] hover:via-[#FD1D1D] hover:to-[#833AB4] hover:shadow-[0_0_18px_rgba(225,48,108,0.4)] transition-all duration-300"
                aria-label="Follow Four Front Lab on Instagram (@fourfrontlab)"
                title="Instagram: @fourfrontlab"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {/* X.com */}
              <a
                href="https://x.com/FourFrontLab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-black hover:border-white hover:bg-white hover:shadow-[0_0_18px_rgba(255,255,255,0.4)] transition-all duration-300"
                aria-label="Follow Four Front Lab on X (@FourFrontLab)"
                title="X.com: @FourFrontLab"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-blue-500 hover:bg-[#1877F2] hover:shadow-[0_0_18px_rgba(24,119,242,0.4)] transition-all duration-300"
                aria-label="Connect with Four Front Lab on Facebook"
                title="Facebook: fourfrontlab@gmail.com"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              {/* Gmail Direct */}
              <a
                href="mailto:fourfrontlab@gmail.com"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-rose-500/60 hover:bg-rose-500 hover:shadow-[0_0_18px_rgba(234,67,53,0.4)] transition-all duration-300"
                aria-label="Send Email to fourfrontlab@gmail.com"
                title="Gmail: fourfrontlab@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:shadow-[0_0_18px_rgba(10,102,194,0.4)] transition-all duration-300"
                aria-label="Connect on LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D7E2EA] hover:text-white hover:border-[#D7E2EA]/50 transition-colors"
                aria-label="GitHub Repository"
                title="GitHub"
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

          {/* Direct Reach */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-4 font-mono">
              [ Direct Reach ]
            </h4>
            <ul className="flex flex-col gap-3 font-sans text-xs">
              <li className="flex items-center gap-2.5 group">
                <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:fourfrontlab@gmail.com"
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  fourfrontlab@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 group">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="https://instagram.com/fourfrontlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @fourfrontlab (Instagram)
                </a>
              </li>
              <li className="flex items-center gap-2.5 group">
                <XIcon className="w-3.5 h-3.5 text-slate-300 shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="https://x.com/FourFrontLab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @FourFrontLab (X)
                </a>
              </li>
              <li className="flex items-center gap-2.5 group">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
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

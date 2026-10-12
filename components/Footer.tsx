import React from 'react'
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="border-t border-white/10 bg-[#06080d] text-slate-400 text-sm relative overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-cyan/40 p-0.5 bg-black/60 shadow-glow-cyan">
                <img 
                  src="/logo.jpeg" 
                  alt="Four Front Lab Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="font-extrabold tracking-wider text-xl text-white group-hover:text-brand-cyan transition-colors">
                FOUR FRONT LAB
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-1">
              Engineering high-performance digital experiences, autonomous business automation, and custom AI systems for ambitious enterprises worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                aria-label="Follow Four Front Lab on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/fourfrontlab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="/services/website-development" className="hover:text-brand-cyan transition-colors">
                  Website Development
                </a>
              </li>
              <li>
                <a href="/services/business-automation" className="hover:text-brand-cyan transition-colors">
                  Business Automation
                </a>
              </li>
              <li>
                <a href="/services/ai-solutions" className="hover:text-brand-cyan transition-colors">
                  AI Solutions & RAG
                </a>
              </li>
              <li>
                <a href="/services/digital-marketing" className="hover:text-brand-cyan transition-colors">
                  Digital Marketing & CRO
                </a>
              </li>
              <li>
                <a href="/services/custom-software" className="hover:text-brand-cyan transition-colors">
                  Custom Software & Portals
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Company & Work
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="/about" className="hover:text-brand-cyan transition-colors">
                  About the Agency
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-brand-cyan transition-colors">
                  Featured Case Studies
                </a>
              </li>
              <li>
                <a href="/insights" className="hover:text-brand-cyan transition-colors">
                  Insights & Research
                </a>
              </li>
              <li>
                <a href="/#process" className="hover:text-brand-cyan transition-colors">
                  6-Step Methodology
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-cyan transition-colors">
                  Book a Discovery Call
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Hotline */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Direct Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2.5 text-xs">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="mailto:contact@fourfrontlab.com" className="hover:text-white transition-colors">
                  contact@fourfrontlab.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-xs">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/18004368736" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +1 (800) 436-8736 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <span>Tech Quarter Innovation Tower, Suite 400</span>
              </li>
            </ul>
            <div className="mt-4 pt-3 border-t border-white/5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Accepting New Q4 Projects
              </span>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Four Front Lab. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
              Sitemap
            </a>
            <a href="/admin" className="text-slate-400 hover:text-brand-cyan font-mono transition-colors">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

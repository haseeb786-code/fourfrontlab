'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="w-full bg-[#080808] text-[#f5f5f0] pt-24 sm:pt-36 pb-12 px-6 lg:px-10 select-none overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Massive Full-Bleed Thin Typography */}
        <div className="border-b border-[#1f1f1f] pb-12 sm:pb-16 mb-16 sm:mb-20">
          <h2 className="font-editorial text-[clamp(44px,11vw,160px)] font-light leading-[0.88] tracking-[-0.04em] text-[#f5f5f0] uppercase whitespace-nowrap overflow-hidden">
            FOUR FRONT LAB
          </h2>
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#3a3a3a] mt-4 sm:mt-6">
            <span>[ DIGITAL PRODUCTS ]</span>
            <span>[ 4 SOFTWARE ENGINEERS ]</span>
            <span>[ AMBITIOUS COMPANIES ]</span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 pb-16 sm:pb-24 border-b border-[#1f1f1f]">
          {/* Identity & Direct Coordinates */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] block">
              DIRECT DISPATCH
            </span>
            <p className="text-xs text-[#6b6b6b] leading-relaxed">
              We engineer digital flagships and autonomous software for ambitious teams worldwide.
            </p>
            <div className="pt-2">
              <a
                href="mailto:fourfrontlab@gmail.com"
                className="font-mono text-xs text-[#f5f5f0] hover:text-[#c8f542] transition-colors block"
              >
                fourfrontlab@gmail.com
              </a>
              <a
                href="https://wa.me/923444741603"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors block mt-1"
              >
                +92 344 474 1603 (WhatsApp)
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] block">
              INDEX
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="#work" className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                  Capabilities &amp; Stack
                </Link>
              </li>
              <li>
                <Link href="#manifesto" className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                  Founding Manifesto
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] block">
              NETWORK
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://instagram.com/fourfrontlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/FourFrontLab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors flex items-center gap-1.5"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/fourfrontlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fourfrontlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b6b6b] hover:text-[#f5f5f0] transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Studio Location */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#3a3a3a] block">
              HEADQUARTERS
            </span>
            <p className="font-mono text-xs text-[#6b6b6b]">
              Islamabad, Pakistan<br />
              Remote-First Engineering<br />
              100% Client IP Ownership
            </p>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="font-mono text-[10px] uppercase tracking-wider text-[#3a3a3a] hover:text-[#c8f542] transition-colors"
              >
                [ Admin Portal ]
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#3a3a3a]">
          <p>© {currentYear} Four Front Lab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#6b6b6b] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#6b6b6b] transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#6b6b6b] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

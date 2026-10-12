import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InquiryForm from '@/components/InquiryForm'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowUpRight,
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

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#B600A8]/10 text-[#D7E2EA] border border-[#B600A8]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>Four Front Lab • Direct Engagement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Initiate Your <span className="hero-heading-bright">System Architecture</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discuss your requirements directly with our principal software architects. Every engagement begins with a rapid architectural scoping breakdown.
          </p>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct channels and reassurance */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Fast Track Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c1f1f] to-[#0a1523] border border-emerald-500/40 shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Prefer Real-Time Messaging?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Skip the contact form and chat directly with our engineering team on WhatsApp. Average first response time is under 15 minutes.
                </p>
                <a
                  href="https://wa.me/923444741603?text=Hi%20Four%20Front%20Lab%2C%20I'm%20ready%20to%20discuss%20a%20project%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Details Box */}
              <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-5">
                <h4 className="text-base font-bold text-white border-b border-white/5 pb-3">
                  Direct Contact Coordinates
                </h4>

                {/* Gmail */}
                <div className="flex items-start gap-4 text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Official Gmail Inbox</span>
                    <a href="mailto:fourfrontlab@gmail.com" className="text-white font-medium hover:text-rose-400 transition-colors">
                      fourfrontlab@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4 text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Instagram Official</span>
                    <a href="https://instagram.com/fourfrontlab" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-pink-400 transition-colors">
                      @fourfrontlab
                    </a>
                  </div>
                </div>

                {/* X (Twitter) */}
                <div className="flex items-start gap-4 text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <XIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">X.com (Twitter)</span>
                    <a href="https://x.com/FourFrontLab" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-slate-300 transition-colors">
                      @FourFrontLab
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4 text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Facebook Official</span>
                    <a href="https://facebook.com/fourfrontlab" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-blue-400 transition-colors">
                      FourFrontLab (fourfrontlab@gmail.com)
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">WhatsApp Hotline</span>
                    <a href="https://wa.me/923444741603" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-emerald-400 transition-colors">
                      +92 344 474 1603
                    </a>
                  </div>
                </div>

                {/* HQ */}
                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#BE4C00] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Location</span>
                    <span className="text-white font-medium">
                      Islamabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Guarantees */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mutual NDA signed before detailed scoping begins</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-[#B600A8] shrink-0" />
                  <span>Formal system proposal delivered within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Submit Project Scoping Brief
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Provide as much context as possible. All submissions are encrypted and routed directly to our lead engineering architects.
                  </p>
                </div>

                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

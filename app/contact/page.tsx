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
  ArrowUpRight 
} from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-32 pb-24 bg-[#07090e]">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Initiate Your <span className="text-gradient-cyan">System Architecture</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discuss your requirements directly with our principal software architects. Every engagement begins with a rigorous 48-hour technical feasibility breakdown.
          </p>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct channels and reassurance */}
            <div className="lg:col-span-5 space-y-8">
              {/* WhatsApp Fast Track Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c1f1f] to-[#0a1523] border border-emerald-500/40 shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Prefer Real-Time Messaging?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Skip the contact form and chat directly with our engineering team on WhatsApp. Average first response time is under 15 minutes during business hours.
                </p>
                <a
                  href="https://wa.me/18004368736?text=Hi%20Four%20Front%20Lab%2C%20I'm%20ready%20to%20discuss%20a%20project%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Details Box */}
              <div className="p-8 rounded-3xl bg-[#0b0f19] border border-white/10 space-y-6">
                <h4 className="text-base font-bold text-white border-b border-white/5 pb-3">
                  Direct Contact Coordinates
                </h4>

                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">General & Technical Inquiries</span>
                    <a href="mailto:contact@fourfrontlab.com" className="text-white font-medium hover:text-brand-cyan transition-colors">
                      contact@fourfrontlab.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">WhatsApp Business Hotline</span>
                    <a href="https://wa.me/18004368736" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-emerald-400 transition-colors">
                      +1 (800) 436-8736
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-violet shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Engineering Headquarters</span>
                    <span className="text-white font-medium">
                      Tech Quarter Innovation Tower, Suite 400
                    </span>
                  </div>
                </div>
              </div>

              {/* Engineering Guarantees */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Mutual NDA signed before detailed scoping begins</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Formal system proposal delivered within 48 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0f19] border border-brand-cyan/30 shadow-2xl backdrop-blur-xl">
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

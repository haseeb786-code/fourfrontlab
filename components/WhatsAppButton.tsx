'use client'

import React, { useState } from 'react'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber?: string
  defaultMessage?: string
}

export default function WhatsAppButton({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923444741603',
  defaultMessage = "Hi Four Front Lab! I'm interested in discussing a project for my business.",
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const activeNumber = phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923444741603'
  // Clean phone number for wa.me URL (remove spaces, parentheses, dashes)
  const cleanPhone = activeNumber.replace(/[^0-9]/g, '')
  const encodedMsg = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Preview Tooltip Card */}
      {showTooltip && (
        <div className="mb-3 w-72 sm:w-80 p-4 rounded-2xl bg-[#0d121c] border border-brand-cyan/30 shadow-2xl shadow-black/80 backdrop-blur-xl animate-float">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-white tracking-wide">
                Direct WhatsApp Channel
              </span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close message preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
            Have a project in mind or need quick feasibility feedback? Speak directly with our lead architects on WhatsApp.
          </p>
          <div className="mt-3 pt-2.5 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Average response: &lt;15 mins
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
            >
              Chat Now
              <Send className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Contact Four Front Lab on WhatsApp"
        >
          {/* Glowing pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400/40 blur-sm animate-pulse pointer-events-none"></span>

          {/* SVG WhatsApp Icon */}
          <svg
            className="w-7 h-7 relative z-10 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.507 14.307l-.009.075c-.236-.12-1.398-.69-1.615-.77-.217-.08-.374-.12-.532.12-.158.24-.613.77-.751.93-.138.16-.277.18-.514.06-.237-.12-1.002-.37-1.908-1.18-.705-.63-1.182-1.41-1.32-1.65-.138-.24-.015-.37.104-.49.107-.107.237-.28.356-.42.119-.14.158-.24.237-.4.079-.16.04-.3-.02-.42-.059-.12-.533-1.28-.73-1.76-.193-.46-.388-.4-.533-.41l-.454-.01c-.158 0-.414.06-.631.3-.217.24-.83.81-.83 1.98 0 1.17.85 2.3 0.97 2.46.12.16 1.674 2.56 4.056 3.59.566.24 1.008.39 1.353.5.568.18 1.085.15 1.493.09.455-.07 1.398-.57 1.595-1.13.197-.55.197-1.03.138-1.13-.059-.1-.217-.16-.454-.28zM12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.84.5 3.56 1.37 5.05L2 22l5.12-1.34c1.44.79 3.09 1.24 4.88 1.24 5.52 0 10-4.48 10-10S17.56 2 12.04 2zm0 18.25c-1.6 0-3.08-.45-4.35-1.23l-.31-.19-3.23.85.86-3.15-.2-.33c-.87-1.35-1.33-2.93-1.33-4.57 0-4.55 3.7-8.25 8.25-8.25s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

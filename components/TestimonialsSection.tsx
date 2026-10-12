import React from 'react'
import { Star, Quote } from 'lucide-react'

interface TestimonialItem {
  id: string
  clientName: string
  clientRole: string
  clientCompany: string
  quote: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[]
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: '1',
    clientName: 'Marcus Vance',
    clientRole: 'Chief Technology Officer',
    clientCompany: 'Aetheris Capital',
    quote: 'Four Front Lab engineered our market intelligence platform in record time. Their fusion of high-performance Next.js interfaces with secure AI models delivered an immediate 78% reduction in research turnaround. Unmatched technical caliber.',
    rating: 5,
  },
  {
    id: '2',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Brand & Innovation',
    clientCompany: 'Veloce Motors',
    quote: 'The 3D interactive showroom they built exceeded every expectation. It won accolades across the design community and drove a 320% surge in qualified private viewings. They are truly in a league of their own.',
    rating: 5,
  },
  {
    id: '3',
    clientName: 'David Chen',
    clientRole: 'Head of Global Operations',
    clientCompany: 'OmniLogistics',
    quote: 'Before Four Front Lab, our team spent half their day manually reconciling freight manifests. Their custom automation workflows saved us over 1,200 hours monthly and paid for themselves in under seven weeks.',
    rating: 5,
  },
  {
    id: '4',
    clientName: 'Sarah Jenkins',
    clientRole: 'Chief Commercial Officer',
    clientCompany: 'Novus Paris',
    quote: 'Our international conversion rate jumped by 185% after Four Front Lab rebuilt our digital flagship. Sub-second page loads, effortless admin controls, and seamless WhatsApp lead routing. Simply exceptional.',
    rating: 5,
  },
]

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const displayItems = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 mb-4">
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Proof of <span className="text-gradient-cyan">Measurable Impact</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Hear directly from the technology leaders and executives who scaled their operations and revenues with Four Front Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#0b0f19]/70 border border-white/10 hover:border-brand-cyan/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between group"
            >
              <div>
                {/* 5-star ratings */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0b0f19] flex items-center justify-center text-brand-cyan font-bold font-mono text-sm">
                    {item.clientName.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {item.clientRole} • <span className="text-slate-300 font-medium">{item.clientCompany}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { Star, Quote, Sparkles } from 'lucide-react'

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
    quote:
      'Four Front Lab engineered our market intelligence platform in record time. Their fusion of high-performance Next.js interfaces with kinetic physics and secure AI models delivered an immediate 78% reduction in research turnaround. Unmatched technical caliber.',
    rating: 5,
  },
  {
    id: '2',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Brand & Innovation',
    clientCompany: 'Veloce Motors',
    quote:
      'The interactive digital showroom they built exceeded every expectation. It won accolades across the design community and drove a 320% surge in qualified private viewings. They are truly in a league of their own.',
    rating: 5,
  },
  {
    id: '3',
    clientName: 'David Chen',
    clientRole: 'Head of Global Operations',
    clientCompany: 'OmniLogistics',
    quote:
      'Before Four Front Lab, our team spent half their day manually reconciling freight manifests. Their custom automation workflows saved us over 1,200 hours monthly and paid for themselves in under seven weeks.',
    rating: 5,
  },
  {
    id: '4',
    clientName: 'Sarah Jenkins',
    clientRole: 'Chief Commercial Officer',
    clientCompany: 'Novus Paris',
    quote:
      'Our international conversion rate jumped by 185% after Four Front Lab rebuilt our digital flagship. Sub-second page loads, effortless admin controls, and seamless lead routing. Simply exceptional.',
    rating: 5,
  },
]

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const displayItems = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section id="testimonials" className="py-28 sm:py-36 relative overflow-hidden bg-[#0C0C0C] border-t border-[#D7E2EA]/10 select-none">
      {/* Ambient background atmosphere */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#B600A8]/10 via-[#7621B0]/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 text-[11px] font-mono uppercase tracking-[0.25em] text-[#D7E2EA]/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
              [ Executive Endorsements • 06 ]
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              Client Trust. <br />
              Measured Results.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#D7E2EA]/60 font-light leading-relaxed">
            Direct feedback from corporate partners who scaled their digital presence, streamlined operations, and multiplied conversion rates with Four Front Lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[30px] sm:rounded-[36px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-8 sm:p-10 backdrop-blur-xl hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/8 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#D7E2EA]/20 group-hover:text-[#B600A8]/40 transition-colors" />
                </div>
                <p className="text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed font-light italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-[#D7E2EA]/60 font-mono mt-0.5">
                    {item.clientRole} • {item.clientCompany}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                  Verified Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

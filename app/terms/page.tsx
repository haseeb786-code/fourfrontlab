import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FileCode2, ArrowLeft, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Four Front Lab',
  description: 'Terms and conditions governing consulting, development, and digital agency services by Four Front Lab.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080A10] text-[#E2E8F0]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE]">
            <FileCode2 className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#22D3EE] font-mono">Agreements & Governance</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-[#94A3B8] mb-12">
          Effective Date: October 2026 · Last Updated: October 2026
        </p>

        <div className="space-y-10 text-[#CBD5E1] leading-relaxed text-sm md:text-base">
          <section className="p-6 rounded-xl bg-[#0D111A] border border-[#1E293B]">
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Engagement & Scope of Work
            </h2>
            <p>
              Four Front Lab delivers custom digital solutions including bespoke web applications, enterprise business automation, AI integrations, performance marketing systems, and software engineering. All bespoke engineering services are executed pursuant to written Statements of Work (SOW) or mutually signed service agreements defining deliverables, milestones, and timelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Intellectual Property & Ownership
            </h2>
            <div className="space-y-3">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                <span><strong className="text-white">Client Work Product:</strong> Upon complete milestone settlement, all custom source code, design assets, and proprietary logic engineered specifically for the client are 100% transferred to the client.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                <span><strong className="text-white">Agency Pre-Existing IP:</strong> Open-source utilities, proprietary foundational boilerplates, and common libraries utilized across projects remain licensed on a royalty-free, perpetual basis to the client.</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Client Responsibilities & Access
            </h2>
            <p>
              Timely delivery requires prompt provision of requisite third-party API credentials, domain access, brand assets, and milestone sign-offs. Four Front Lab will not be liable for delivery delays attributable to client-side credential bottlenecks or third-party platform API outages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Warranties & Quality Assurance
            </h2>
            <p>
              All software engineered by Four Front Lab undergoes comprehensive automated and manual testing prior to launch. We provide an initial 30-day post-launch warranty covering any reproducible functional defects at zero additional charge, followed by optional ongoing maintenance retainers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Governing Law
            </h2>
            <p>
              These Terms and any project engagements entered into hereunder shall be governed by and construed in accordance with standard commercial commercial arbitration regulations.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

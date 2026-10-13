import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, ArrowLeft, Lock, Eye, FileText } from 'lucide-react'

import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata = {
  title: 'Privacy Policy | Four Front Lab',
  description:
    'Privacy Policy for Four Front Lab, an affordable web development agency in Pakistan protecting client data and intellectual property.',
  alternates: {
    canonical: 'https://fourfrontlab.tech/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080A10] text-[#E2E8F0]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />
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
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#22D3EE] font-mono">Legal & Compliance</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#94A3B8] mb-12">
          Effective Date: October 2026 · Last Updated: October 2026
        </p>

        <div className="space-y-10 text-[#CBD5E1] leading-relaxed text-sm md:text-base">
          <section className="p-6 rounded-xl bg-[#0D111A] border border-[#1E293B]">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#22D3EE]" /> 1. Our Commitment to Data Confidentiality
            </h2>
            <p>
              Four Front Lab (&ldquo;the Agency&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates as an engineering-driven digital agency. We recognize that our clients entrust us with sensitive commercial architectures, intellectual property, and strategic roadmap details. We enforce strict data minimization, robust encryption in transit and at rest, and zero-knowledge storage protocols for proprietary client data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#22D3EE]" /> 2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
              <li><strong className="text-white">Inquiry Details:</strong> When you submit a project brief or contact form, we collect your name, business email, company name, phone number, and project technical requirements.</li>
              <li><strong className="text-white">Technical Telemetry:</strong> Anonymized server logs, browser type, device capabilities, and interaction metrics to optimize Core Web Vitals and 3D WebGL performance.</li>
              <li><strong className="text-white">Zero Public Model Training:</strong> Client project specifications, proprietary datasets, and business logic are never used to train public generative AI models.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#22D3EE]" /> 3. How We Use Collected Data
            </h2>
            <p className="mb-3">
              We process inquiry information solely for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#94A3B8]">
              <li>Evaluating technical feasibility and preparing bespoke project architecture proposals.</li>
              <li>Communicating regarding scheduled consultations, sprints, and ongoing software delivery.</li>
              <li>Fulfilling legal, tax, and contractual obligations under mutual Non-Disclosure Agreements (NDAs).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Security Measures & Retention</h2>
            <p>
              We implement enterprise-grade security controls including salted bcrypt hashing, stateless JWT session tokens with HTTP-only cookies, strict CORS headers, and MIME-type validation for all uploaded documents. Inactive inquiry records are archived or permanently expunged in accordance with statutory retention regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contact Our Privacy Officer</h2>
            <p>
              For data access requests, deletion requests, or questions regarding our security protocols, contact us at:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-[#0F1420] border border-[#1E293B] text-sm font-mono text-[#22D3EE]">
              privacy@fourfrontlab.com · Four Front Lab Innovation Tower
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

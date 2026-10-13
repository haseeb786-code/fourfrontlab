import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { Sparkles, ArrowRight, Clock, Calendar, User, Tag } from 'lucide-react'

import { BreadcrumbJsonLd } from '@/components/JsonLd'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Insights & Tech Blog | Four Front Lab Pakistan',
  description:
    'Engineering guides, Next.js architecture insights, and business automation strategies from our software agency team in Islamabad.',
  alternates: {
    canonical: 'https://fourfrontlab.tech/insights',
  },
  openGraph: {
    title: 'Insights & Tech Blog | Four Front Lab Pakistan',
    description:
      'Engineering guides, Next.js architecture insights, and business automation strategies from our software agency team in Islamabad.',
    url: 'https://fourfrontlab.tech/insights',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Four Front Lab Insights' }],
  },
}

export default async function InsightsPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  const featuredPost = posts.find((p) => p.featured) || posts[0]
  const regularPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts

  return (
    <div className="min-h-screen bg-[#080A10] text-[#E2E8F0]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Insights', url: '/insights' },
        ]}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Agency Insights & Research
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Architectural Insights & Engineering Notes
          </h1>

          <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
            Technical briefs, real-world case notes, and operational strategies for scaling digital platforms without accumulating technical debt.
          </p>
        </section>

        {/* Featured Post Hero */}
        {featuredPost && (
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <div className="p-8 md:p-12 rounded-3xl bg-[#0D111A] border border-[#1E293B] hover:border-[#22D3EE]/30 transition-all group">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] mb-4">
                <span className="px-3 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 font-semibold">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22D3EE]" /> {featuredPost.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#94A3B8]" /> {featuredPost.author}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#22D3EE] transition-colors">
                <Link href={`/insights/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                {featuredPost.excerpt}
              </p>

              <Link
                href={`/insights/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#22D3EE] hover:text-[#67E8F9] transition-colors"
              >
                Read Technical Brief <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1E293B]">
            <h3 className="text-xl font-bold text-white">Recent Publications</h3>
            <span className="text-xs font-mono text-[#94A3B8]">{posts.length} articles published</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E293B] hover:border-[#22D3EE]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#22D3EE]" /> {post.readTime}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-[#22D3EE] transition-colors line-clamp-2">
                    <Link href={`/insights/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E293B]/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    {post.author}
                  </span>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-[#67E8F9] transition-colors"
                  >
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

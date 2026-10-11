import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post) return { title: 'Insight Not Found | Four Front Lab' }

  return {
    title: `${post.title} | Four Front Lab Insights`,
    description: post.excerpt,
  }
}

export default async function InsightDetailPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post) {
    notFound()
  }

  // Related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      NOT: { id: post.id },
    },
    take: 2,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-[#080A10] text-[#E2E8F0]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Insights
        </Link>

        {/* Article Meta Header */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] mb-6">
          <span className="px-3 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20 font-semibold">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#22D3EE]" /> {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#94A3B8]" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8 leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed mb-12 pb-8 border-b border-[#1E293B]">
          {post.excerpt}
        </p>

        {/* Content Body */}
        <div className="space-y-6 text-[#CBD5E1] text-base md:text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Article Footer CTA Box */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-[#0D111A] border border-[#22D3EE]/30 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-mono text-[#22D3EE] tracking-widest uppercase">Next Generation Architecture</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">
              Facing Similar Engineering Challenges?
            </h3>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-xl mb-6">
              Our engineering team designs custom high-speed web flagships, fault-tolerant business automation, and secure enterprise AI systems.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#22D3EE] text-black font-semibold text-sm hover:bg-[#67E8F9] transition-all"
            >
              Consult with Senior Engineers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#1E293B]">
            <h3 className="text-xl font-bold text-white mb-6">Related Publications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  href={`/insights/${r.slug}`}
                  className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E293B] hover:border-[#22D3EE]/30 transition-all group block"
                >
                  <span className="text-xs font-mono text-[#22D3EE] mb-2 block">{r.category}</span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors mb-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

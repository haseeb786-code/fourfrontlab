import React from 'react'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'
import { 
  Briefcase, 
  Inbox, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Plus, 
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardOverview() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect('/admin/login')
  }

  let projectCount = 0
  let inquiryCount = 0
  let newInquiryCount = 0
  let serviceCount = 0
  let recentInquiries: any[] = []
  let whatsappNumber = '+92 344 474 1603'

  try {
    projectCount = await prisma.project.count()
    inquiryCount = await prisma.inquiry.count()
    newInquiryCount = await prisma.inquiry.count({ where: { status: 'new' } })
    serviceCount = await prisma.service.count()
    recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'whatsapp_number' },
    })
    if (setting) {
      whatsappNumber = setting.value
    }
  } catch (e) {}

  const statusColorMap: Record<string, string> = {
    new: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    converted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    closed: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Executive Mission Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry, lead pipeline, portfolio management, and site settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/inquiries/export"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Leads CSV</span>
          </a>
          <a
            href="/admin/portfolio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-cyan hover:opacity-95 text-black shadow-glow-cyan transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </a>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 hover:border-brand-cyan/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Live Inquiries
            </span>
            <div className="p-2 rounded-xl bg-brand-cyan/10 text-brand-cyan">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mb-1">
            {inquiryCount}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{newInquiryCount} uncontacted leads</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 hover:border-brand-cyan/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Case Studies
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mb-1">
            {projectCount}
          </div>
          <div className="text-xs text-slate-400">
            Published in production
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 hover:border-brand-cyan/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Core Services
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono text-white mb-1">
            {serviceCount}
          </div>
          <div className="text-xs text-slate-400">
            Active specializations
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/5 hover:border-brand-cyan/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              WhatsApp Channel
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold font-mono text-emerald-400 truncate mb-1">
            {whatsappNumber}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hotline Connected</span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Lead Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              Recent Enterprise Inquiries
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inbound prospects submitted through the website & consultation funnels
            </p>
          </div>
          <a
            href="/admin/inquiries"
            className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
          >
            <span>Open Full CRM Pipeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{inq.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{inq.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {inq.service}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-brand-cyan">
                    {inq.budget}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                        statusColorMap[inq.status] || 'bg-slate-500/10 text-slate-400'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href="/admin/inquiries"
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-brand-cyan hover:text-black text-slate-200 transition-colors inline-block"
                    >
                      Inspect
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/portfolio"
          className="p-6 rounded-2xl bg-[#0d121c] border border-white/5 hover:border-brand-cyan/30 transition-all flex items-start justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mb-1">
              Portfolio Manager
            </h3>
            <p className="text-xs text-slate-400">
              Add new case studies, toggle featured projects, and update technical metrics.
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan transition-colors shrink-0" />
        </a>

        <a
          href="/admin/services"
          className="p-6 rounded-2xl bg-[#0d121c] border border-white/5 hover:border-brand-cyan/30 transition-all flex items-start justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mb-1">
              Services & Deliverables
            </h3>
            <p className="text-xs text-slate-400">
              Edit service descriptions, deliverables lists, and technical FAQs.
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan transition-colors shrink-0" />
        </a>

        <a
          href="/admin/settings"
          className="p-6 rounded-2xl bg-[#0d121c] border border-white/5 hover:border-brand-cyan/30 transition-all flex items-start justify-between group"
        >
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors mb-1">
              General & SEO Settings
            </h3>
            <p className="text-xs text-slate-400">
              Configure WhatsApp phone number, corporate email, office location, and meta tags.
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan transition-colors shrink-0" />
        </a>
      </div>
    </div>
  )
}

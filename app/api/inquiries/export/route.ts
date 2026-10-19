import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const escapeCsv = (str: any) => {
      if (str === null || str === undefined) return '""'
      const val = String(str).replace(/"/g, '""')
      return `"${val}"`
    }

    const headers = [
      'ID',
      'Created At',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Service',
      'Budget',
      'Timeline',
      'Status',
      'Priority',
      'Internal Notes',
      'Message',
    ]

    const rows = inquiries.map((inq) => [
      escapeCsv(inq.id),
      escapeCsv(inq.createdAt.toISOString()),
      escapeCsv(inq.name),
      escapeCsv(inq.email),
      escapeCsv(inq.phone),
      escapeCsv(inq.company),
      escapeCsv(inq.service),
      escapeCsv(inq.budget),
      escapeCsv(inq.timeline),
      escapeCsv(inq.status),
      escapeCsv(inq.priority),
      escapeCsv(inq.notes),
      escapeCsv(inq.message),
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n')

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="four-front-lab-leads-export.csv"',
      },
    })
  } catch (error: any) {
    console.error('CSV export error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to export CSV' },
      { status: 500 }
    )
  }
}

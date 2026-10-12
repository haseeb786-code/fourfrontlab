import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany()
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))
    return NextResponse.json(settingsMap)
  } catch (error: any) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Loop through keys and upsert
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      }
    }

    const updated = await prisma.siteSetting.findMany()
    const settingsMap = Object.fromEntries(updated.map((s) => [s.key, s.value]))

    return NextResponse.json({ success: true, settings: settingsMap })
  } catch (error: any) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update settings' },
      { status: 500 }
    )
  }
}

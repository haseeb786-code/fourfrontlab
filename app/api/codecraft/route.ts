import { NextResponse } from 'next/server'
import { callCodeCraft, getCodeCraftConfig } from '@/lib/codecraft'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { apiKey, apiUrl } = getCodeCraftConfig()

  return NextResponse.json({
    configured: Boolean(apiKey),
    apiUrl,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const systemPrompt = typeof body?.systemPrompt === 'string' ? body.systemPrompt : ''
    const model = typeof body?.model === 'string' ? body.model : 'gpt-4o-mini'
    const max_tokens = Number(body?.max_tokens ?? 2000)
    const temperature = Number(body?.temperature ?? 0.4)

    const result = await callCodeCraft({
      prompt,
      systemPrompt,
      model,
      max_tokens: Number.isFinite(max_tokens) ? max_tokens : 2000,
      temperature: Number.isFinite(temperature) ? temperature : 0.4,
    })

    return NextResponse.json({
      success: true,
      response: result.content,
      raw: result.raw,
    })
  } catch (error: any) {
    console.error('Code Craft API error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Code Craft request failed',
      },
      { status: 500 }
    )
  }
}

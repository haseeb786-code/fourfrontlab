type CodeCraftMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

type CodeCraftCallInput = {
  prompt: string
  model?: string
  systemPrompt?: string
  max_tokens?: number
  temperature?: number
}

const buildCandidateUrls = (baseUrl: string) => {
  const trimmed = baseUrl.replace(/\/+$/, '')
  const withV1 = trimmed.includes('/v1') ? trimmed : `${trimmed}/v1`

  return Array.from(
    new Set([
      `${withV1}/chat/completions`,
      `${trimmed}/chat/completions`,
      `${withV1}/completions`,
      `${trimmed}/completions`,
      `${withV1}/generate`,
      `${trimmed}/generate`,
    ])
  )
}

export function getCodeCraftConfig() {
  const apiKey = process.env.CODECRAFT_API_KEY || process.env.CODE_CRAFT_API_KEY || ''
  const apiUrl = process.env.CODECRAFT_API_URL || process.env.CODE_CRAFT_API_URL || 'https://api.codecraft.ai'

  return {
    apiKey,
    apiUrl,
  }
}

export async function callCodeCraft({
  prompt,
  model = 'gpt-4o-mini',
  systemPrompt,
  max_tokens = 2000,
  temperature = 0.4,
}: CodeCraftCallInput) {
  const { apiKey, apiUrl } = getCodeCraftConfig()

  if (!apiKey) {
    throw new Error('Missing CODECRAFT_API_KEY environment variable')
  }

  const messages: CodeCraftMessage[] = []

  if (systemPrompt && systemPrompt.trim()) {
    messages.push({ role: 'system', content: systemPrompt.trim() })
  }

  messages.push({ role: 'user', content: prompt })

  const payload = {
    model,
    messages,
    temperature,
    max_tokens,
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'X-API-Key': apiKey,
  }

  let lastError: Error | null = null

  for (const url of buildCandidateUrls(apiUrl)) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()

      if (!response.ok) {
        lastError = new Error(`Code Craft API request failed (${response.status}): ${responseText}`)
        continue
      }

      const data = responseText ? JSON.parse(responseText) : {}
      const content =
        data?.choices?.[0]?.message?.content ??
        data?.output_text ??
        data?.content ??
        data?.text ??
        ''

      return {
        content,
        raw: data,
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
    }
  }

  throw lastError ?? new Error('Code Craft API request failed')
}

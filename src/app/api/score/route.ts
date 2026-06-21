import { NextResponse } from 'next/server'

type ScoreLeadPayload = {
  businessName?: string
  contactName?: string
  whatsapp?: string
  email?: string
  url?: string
  channel?: string
  category?: string
  products?: string
  revenue?: string
  fulfillment?: string
  tools?: string
  brandStatus?: string
  problem?: string
  consent?: boolean
  source?: string
}

const requiredFields: Array<keyof ScoreLeadPayload> = [
  'businessName',
  'contactName',
  'whatsapp',
  'email',
  'url',
  'channel',
  'category',
  'problem'
]

export async function POST(request: Request) {
  let payload: ScoreLeadPayload

  try {
    payload = await request.json() as ScoreLeadPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const missing = requiredFields.filter((field) => !String(payload[field] ?? '').trim())

  if (missing.length > 0 || !payload.consent) {
    return NextResponse.json({ ok: false, error: 'Missing required fields', missing }, { status: 400 })
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const row = {
    business_name: payload.businessName,
    contact_name: payload.contactName,
    whatsapp: payload.whatsapp,
    email: payload.email,
    store_url: payload.url,
    main_channel: payload.channel,
    category: payload.category,
    products: payload.products,
    revenue_range: payload.revenue,
    fulfillment_method: payload.fulfillment,
    tools: payload.tools,
    brand_status: payload.brandStatus,
    main_problem: payload.problem,
    consent: payload.consent,
    source: payload.source ?? 'website',
    raw_payload: payload,
    created_at: new Date().toISOString()
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: true, stored: false, reason: 'Supabase environment variables are not configured yet.' })
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/commerce_score_leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    })

    if (!response.ok) {
      const detail = await response.text()
      return NextResponse.json({ ok: true, stored: false, reason: 'Supabase insert failed', detail }, { status: 202 })
    }

    return NextResponse.json({ ok: true, stored: true })
  } catch (error) {
    return NextResponse.json(
      { ok: true, stored: false, reason: 'Supabase request failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 202 }
    )
  }
}

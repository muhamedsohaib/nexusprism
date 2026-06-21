'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { whatsappLink } from '@/lib/constants'

type ScoreFormState = {
  url: string
  channel: string
  revenue: string
  problem: string
}

export function ScoreForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<ScoreFormState>({
    url: '',
    channel: 'Amazon.ae',
    revenue: 'Under AED 50k/month',
    problem: ''
  })

  const update = (field: keyof ScoreFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Hi Nexus Prism, I want my AI Commerce Score.',
      '',
      `Store / listing URL: ${form.url}`,
      `Main channel: ${form.channel}`,
      `Monthly online revenue: ${form.revenue}`,
      `Main problem: ${form.problem}`,
      '',
      'Please review this and tell me the highest-impact fixes first.'
    ].join('\n')

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form className={compact ? 'score-form compact-card' : 'score-form glass-card'} onSubmit={submit}>
      <div className="form-heading">
        <span className="pill success">Free first review</span>
        <h2>Submit for AI Commerce Score</h2>
        <p>Paste one URL and describe the main problem. The first version routes the request to WhatsApp so the audit can be fulfilled manually.</p>
      </div>

      <label>
        <span>Store, listing, or product URL</span>
        <input value={form.url} onChange={(event) => update('url', event.target.value)} placeholder="Amazon, noon, Shopify, or website URL" required />
      </label>

      <label>
        <span>Main sales channel</span>
        <select value={form.channel} onChange={(event) => update('channel', event.target.value)}>
          <option>Amazon.ae</option>
          <option>noon</option>
          <option>Shopify</option>
          <option>Own website</option>
          <option>Instagram / WhatsApp selling</option>
        </select>
      </label>

      <label>
        <span>Approximate monthly online revenue</span>
        <select value={form.revenue} onChange={(event) => update('revenue', event.target.value)}>
          <option>Pre-launch</option>
          <option>Under AED 50k/month</option>
          <option>AED 50k - 250k/month</option>
          <option>AED 250k - 1m/month</option>
          <option>Above AED 1m/month</option>
        </select>
      </label>

      <label>
        <span>Main problem</span>
        <textarea value={form.problem} onChange={(event) => update('problem', event.target.value)} placeholder="Low sales, poor listing images, messy operations, weak website, no automation, bad reporting..." required />
      </label>

      <button className="button primary full" type="submit">Open WhatsApp with my score request</button>
      <p className="microcopy">Database integration can come after the first real submissions. Speed matters more than overbuilding.</p>
    </form>
  )
}

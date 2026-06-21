'use client'

import type { FormEvent, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { whatsappLink } from '@/lib/constants'

type Language = 'en' | 'ar'

type ScoreFormState = {
  businessName: string
  contactName: string
  whatsapp: string
  email: string
  url: string
  channel: string
  category: string
  products: string
  revenue: string
  fulfillment: string
  tools: string
  brandStatus: string
  problem: string
  consent: boolean
}

const initialForm: ScoreFormState = {
  businessName: '',
  contactName: '',
  whatsapp: '',
  email: '',
  url: '',
  channel: 'Amazon.ae',
  category: '',
  products: '',
  revenue: 'Under AED 50k/month',
  fulfillment: 'Unknown',
  tools: '',
  brandStatus: 'Not sure',
  problem: '',
  consent: false
}

const labels = {
  en: {
    pill: 'Free first review',
    title: 'Submit your store for review',
    body: 'Your score is manually reviewed with AI support. We store the request, then open WhatsApp so the handoff stays fast.',
    businessName: 'Business name',
    contactName: 'Contact name',
    whatsappNumber: 'WhatsApp number',
    email: 'Email',
    url: 'Store, listing, or product URL',
    channel: 'Main sales channel',
    category: 'Marketplace/store category',
    products: 'Top ASINs, SKUs, or products',
    revenue: 'Approximate monthly online revenue',
    fulfillment: 'Fulfillment method',
    tools: 'Current tools/platforms used',
    brandStatus: 'Brand registry / trademark status',
    problem: 'Main problem',
    consent: 'I allow Nexus Prism to manually review the submitted public/store information and contact me about the score.',
    submit: 'Submit My Store for Review',
    submitting: 'Submitting...',
    success: 'Your request is received. Continue on WhatsApp so we can send your Commerce Score after review.',
    error: 'Something went wrong. Please try again or use WhatsApp directly.',
    whatsappCta: 'Continue on WhatsApp',
    microcopy: 'No private seller account access is needed for the first review.'
  },
  ar: {
    pill: 'مراجعة أولى مجانية',
    title: 'أرسل متجرك للمراجعة',
    body: 'يتم مراجعة تقييمك يدوياً مع دعم الذكاء الاصطناعي. نحفظ الطلب ثم نفتح واتساب لتسريع المتابعة.',
    businessName: 'اسم النشاط التجاري',
    contactName: 'اسم الشخص المسؤول',
    whatsappNumber: 'رقم واتساب',
    email: 'البريد الإلكتروني',
    url: 'رابط المتجر أو المنتج',
    channel: 'قناة البيع الرئيسية',
    category: 'فئة المتجر أو المنتجات',
    products: 'أهم ASIN أو SKU أو المنتجات',
    revenue: 'إيراد المبيعات الشهري التقريبي',
    fulfillment: 'طريقة الشحن والتنفيذ',
    tools: 'الأدوات أو المنصات المستخدمة حالياً',
    brandStatus: 'حالة تسجيل العلامة أو الملكية',
    problem: 'المشكلة الرئيسية',
    consent: 'أسمح لـ Nexus Prism بمراجعة المعلومات المرسلة والتواصل معي بخصوص التقييم.',
    submit: 'أرسل متجري للمراجعة',
    submitting: 'جاري الإرسال...',
    success: 'تم استلام طلبك. تابع عبر واتساب حتى نرسل لك التقييم بعد المراجعة.',
    error: 'حدث خطأ. حاول مرة أخرى أو استخدم واتساب مباشرة.',
    whatsappCta: 'المتابعة عبر واتساب',
    microcopy: 'لا نحتاج إلى صلاحية دخول خاصة لحساب البائع في المراجعة الأولى.'
  }
} as const

export function ScoreForm({ language = 'en', compact = false }: { language?: Language; compact?: boolean }) {
  const [form, setForm] = useState<ScoreFormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [whatsappUrl, setWhatsappUrl] = useState<string>('')
  const t = labels[language]

  const message = useMemo(() => [
    'Hi Nexus Prism, I want my AI Commerce Score.',
    '',
    `Business: ${form.businessName}`,
    `Contact: ${form.contactName}`,
    `WhatsApp: ${form.whatsapp}`,
    `Email: ${form.email}`,
    `Store / listing URL: ${form.url}`,
    `Main channel: ${form.channel}`,
    `Category: ${form.category}`,
    `Top products: ${form.products}`,
    `Monthly revenue: ${form.revenue}`,
    `Fulfillment: ${form.fulfillment}`,
    `Tools: ${form.tools}`,
    `Brand status: ${form.brandStatus}`,
    `Main problem: ${form.problem}`,
    '',
    'Please review this and send the highest-impact fixes first.'
  ].join('\n'), [form])

  const update = <K extends keyof ScoreFormState>(field: K, value: ScoreFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    const url = whatsappLink(message)
    setWhatsappUrl(url)

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage-score-form' })
      })

      if (!response.ok) throw new Error('Lead submission failed')

      setStatus('success')
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className={compact ? 'score-form compact-card' : 'score-form glass-card'} onSubmit={submit}>
      <div className="form-heading">
        <span className="pill success">{t.pill}</span>
        <h2>{t.title}</h2>
        <p>{t.body}</p>
      </div>

      <div className="form-grid two">
        <Field label={t.businessName}><input value={form.businessName} onChange={(event) => update('businessName', event.target.value)} required /></Field>
        <Field label={t.contactName}><input value={form.contactName} onChange={(event) => update('contactName', event.target.value)} required /></Field>
        <Field label={t.whatsappNumber}><input value={form.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} placeholder="+971..." required /></Field>
        <Field label={t.email}><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></Field>
      </div>

      <Field label={t.url}><input value={form.url} onChange={(event) => update('url', event.target.value)} placeholder="Amazon, noon, Shopify, or website URL" required /></Field>

      <div className="form-grid two">
        <Field label={t.channel}>
          <select value={form.channel} onChange={(event) => update('channel', event.target.value)}>
            <option>Amazon.ae</option>
            <option>noon</option>
            <option>Shopify</option>
            <option>Own website</option>
            <option>Instagram / WhatsApp selling</option>
          </select>
        </Field>
        <Field label={t.category}><input value={form.category} onChange={(event) => update('category', event.target.value)} placeholder="Electronics, car accessories, beauty..." required /></Field>
      </div>

      <Field label={t.products}><textarea value={form.products} onChange={(event) => update('products', event.target.value)} placeholder="Optional, but useful for deeper review" /></Field>

      <div className="form-grid two">
        <Field label={t.revenue}>
          <select value={form.revenue} onChange={(event) => update('revenue', event.target.value)}>
            <option>Pre-launch</option>
            <option>Under AED 50k/month</option>
            <option>AED 50k - 250k/month</option>
            <option>AED 250k - 1m/month</option>
            <option>Above AED 1m/month</option>
          </select>
        </Field>
        <Field label={t.fulfillment}>
          <select value={form.fulfillment} onChange={(event) => update('fulfillment', event.target.value)}>
            <option>Unknown</option>
            <option>FBA</option>
            <option>FBN</option>
            <option>FBM</option>
            <option>Own fulfillment</option>
            <option>Third-party logistics</option>
          </select>
        </Field>
      </div>

      <div className="form-grid two">
        <Field label={t.tools}><input value={form.tools} onChange={(event) => update('tools', event.target.value)} placeholder="Seller Central, Shopify, Sheets, WhatsApp..." /></Field>
        <Field label={t.brandStatus}>
          <select value={form.brandStatus} onChange={(event) => update('brandStatus', event.target.value)}>
            <option>Not sure</option>
            <option>Brand registered</option>
            <option>Trademark available</option>
            <option>No brand registry yet</option>
            <option>Selling third-party products</option>
          </select>
        </Field>
      </div>

      <Field label={t.problem}><textarea value={form.problem} onChange={(event) => update('problem', event.target.value)} placeholder="Low sales, weak images, poor listings, no automation, messy operations..." required /></Field>

      <label className="consent-row">
        <input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} required />
        <span>{t.consent}</span>
      </label>

      <button className="button primary full" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? t.submitting : t.submit}
      </button>

      {status === 'success' && (
        <div className="form-alert success-alert">
          <p>{t.success}</p>
          <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">{t.whatsappCta}</a>
        </div>
      )}

      {status === 'error' && <p className="form-alert error-alert">{t.error}</p>}
      <p className="microcopy">{t.microcopy}</p>
    </form>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label>
      <span>{label}</span>
      {children}
    </label>
  )
}

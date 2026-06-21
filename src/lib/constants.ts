export const WHATSAPP_NUMBER = '971586244790'

export const site = {
  name: 'Nexus Prism',
  url: 'https://nexusprism.ai',
  tagline: 'The AI operating layer for UAE sellers',
  description:
    'A premium UAE-first commerce operations firm helping Amazon.ae sellers diagnose catalog, content, conversion, trust, automation, and marketplace execution gaps.'
}

export const navItems = [
  { href: '/score', label: 'Score' },
  { href: '/services', label: 'Sprints' },
  { href: '/proof', label: 'Lab' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' }
]

export const services = [
  {
    title: 'AI Commerce Score Audit',
    price: 'AED 0',
    body: 'A free first review of one Amazon.ae listing, storefront, or commerce presence, manually reviewed with AI support.',
    cta: 'Start free'
  },
  {
    title: 'Marketplace Rescue Sprint',
    price: 'From AED 1,500',
    body: 'Listing structure, image direction, keyword readiness, content cleanup, and marketplace trust improvements for Amazon.ae sellers.',
    cta: 'Start after score'
  },
  {
    title: 'Store Launch Sprint',
    price: 'From AED 3,500',
    body: 'Premium storefront or landing-page setup with trust sections, lead capture, WhatsApp routing, and conversion-focused copy.',
    cta: 'View sprint'
  },
  {
    title: 'Automation Setup',
    price: 'From AED 4,000',
    body: 'Workflow cleanup, approvals, reporting, customer-service routing, task queues, and repetitive process automation.',
    cta: 'View setup'
  },
  {
    title: 'Growth Retainer',
    price: 'From AED 1,500/mo',
    body: 'Monthly commerce operations, listing updates, reporting, score refreshes, and continuous improvement cycles.',
    cta: 'Apply after score'
  }
]

export const proofItems = [
  {
    title: 'Listing clarity',
    before: 'Keyword-stuffed title with weak buying signal and unclear product value.',
    after: 'Search-aware structure with clearer product value, cleaner reading flow, and stronger trust cues.'
  },
  {
    title: 'Image direction',
    before: 'Supplier-style image that blends into the marketplace and does not explain scale, quality, or fit.',
    after: 'Marketplace-ready image direction built around clarity, trust, scale, and premium product presentation.'
  },
  {
    title: 'Operations flow',
    before: 'Customer requests, listing updates, approvals, and reporting scattered across chats and memory.',
    after: 'Structured task flow with review, approval, next action, and follow-up visible before work disappears.'
  }
]

export const capabilities = [
  ['Catalog quality', 'Titles, bullets, product data, variant clarity, and suppression-risk signals reviewed for marketplace readiness.'],
  ['Product images', 'Main-image direction, secondary-image storytelling, trust cues, scale, and visual consistency.'],
  ['Keyword readiness', 'Search behavior, relevance mapping, visible content gaps, and listing structure.'],
  ['Store trust', 'Brand credibility, storefront consistency, WhatsApp path, proof, and buying-confidence signals.'],
  ['Conversion risk', 'Friction points that make shoppers hesitate before clicking, messaging, or purchasing.'],
  ['Automation gaps', 'Manual follow-ups, approvals, reporting, SOPs, and repetitive work that can become a system.'],
  ['Compliance readiness', 'Visible readiness around marketplace rules, claim safety, content discipline, and operational records.']
] as const

export const dashboardModules = [
  'Commerce Health',
  'Catalog Quality',
  'Image Quality',
  'Search Readiness',
  'Store Trust',
  'Conversion Risk',
  'Automation Gaps',
  'Compliance Readiness',
  'Active Sprint',
  'Pending Approvals'
]

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

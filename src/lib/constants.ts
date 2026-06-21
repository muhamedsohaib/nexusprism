export const WHATSAPP_NUMBER = '971586244790'

export const site = {
  name: 'Nexus Prism',
  url: 'https://nexusprism.ai',
  tagline: 'AI commerce operations for UAE sellers',
  description:
    'Nexus Prism scores Amazon, noon, Shopify, and e-commerce operations, then turns the biggest revenue leaks into done-for-you fix sprints and retainers.'
}

export const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/score', label: 'Score' },
  { href: '/services', label: 'Sprints' },
  { href: '/proof', label: 'Proof' },
  { href: '/contact', label: 'Contact' }
]

export const services = [
  {
    title: 'AI Commerce Score Audit',
    price: 'AED 199 - 499',
    body: 'A concise scorecard, visible issue list, ranked action plan, and founder-led WhatsApp debrief.'
  },
  {
    title: 'Marketplace Rescue Sprint',
    price: 'AED 1,500 - 4,500',
    body: 'Amazon/noon listing fixes, main image direction, title, bullets, keywords, and catalog cleanup.'
  },
  {
    title: 'Store Launch Sprint',
    price: 'AED 3,500 - 12,000',
    body: 'Premium Shopify or landing-page setup with trust blocks, analytics, WhatsApp capture, and launch copy.'
  },
  {
    title: 'Automation Setup',
    price: 'AED 4,000 - 15,000',
    body: 'CRM, inquiry routing, SOPs, reporting, task queues, approvals, and support workflows.'
  },
  {
    title: 'Growth Retainer',
    price: 'AED 1,500 - 6,000/mo',
    body: 'Ongoing listing updates, content refreshes, reporting, monthly score improvement, and optimization support.'
  }
]

export const proofItems = [
  {
    title: 'Marketplace listing rescue',
    before: 'Weak title, poor image hierarchy, missing keywords, and unclear product benefit.',
    after: 'Benefit-led title, main image brief, keyword map, bullet rewrite, and A+ content plan.'
  },
  {
    title: 'Storefront trust upgrade',
    before: 'Generic homepage, scattered copy, weak proof, and no obvious path to WhatsApp or checkout.',
    after: 'Luxury-tech product page with proof blocks, score CTA, WhatsApp rail, and clear offer hierarchy.'
  },
  {
    title: 'Operations automation',
    before: 'Manual order updates, repeated customer replies, no reporting, and no approval workflow.',
    after: 'Task queue, response templates, reporting dashboard, SOPs, and owner approval workflow.'
  }
]

export const capabilities = [
  ['Brand system', 'Positioning, visual language, storytelling, bilingual-ready guidelines, and launch assets.'],
  ['Marketplace ops', 'Amazon.ae and noon listing repair, catalog cleanup, keywords, image direction, and suppression checks.'],
  ['Storefront builds', 'Shopify and landing pages built for trust, speed, WhatsApp capture, and conversion.'],
  ['AI automations', 'Inquiry routing, repeat replies, dashboards, task queues, SOPs, approvals, and reminders.'],
  ['Analytics layer', 'Commerce score refreshes, weekly dashboards, growth blockers, and retainer reporting.'],
  ['Content engine', 'Product stories, ads, email, reels scripts, before/after proof, and bilingual content direction.']
] as const

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

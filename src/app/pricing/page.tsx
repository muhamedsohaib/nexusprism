import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Starter pricing for Nexus Prism Commerce Score, marketplace rescue, store launch, automation, and retainer offers.'
}

export default function PricingPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Start here</p>
          <h1>Start free. Pay only when there is something worth fixing.</h1>
          <p>The first Commerce Score is free. Paid sprints begin only when the audit reveals a clear execution path.</p>
        </div>
        <div className="card-grid pricing-grid">
          {services.map((service, index) => (
            <article className={index === 0 ? 'pricing-card glass-card featured-card' : 'pricing-card glass-card'} key={service.title}>
              <span>{service.title}</span>
              <strong>{service.price}</strong>
              <p>{service.body}</p>
              <Link className="button ghost full" href={index === 0 ? '/score' : '/contact'}>{service.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

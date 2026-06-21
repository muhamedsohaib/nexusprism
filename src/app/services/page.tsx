import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Fix Sprints',
  description: 'Service-led Nexus Prism offers for AI commerce audits, marketplace rescue, store launches, automation, and retainers.'
}

export default function ServicesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Fix sprints</p>
          <h1>Paid offers that prove demand before the app is built.</h1>
          <p>
            Nexus Prism starts with standardized, measurable implementation work. The repeated delivery patterns later become workflow software.
          </p>
        </div>
        <div className="card-grid services-grid">
          {services.map((service) => (
            <article className="service-card glass-card" key={service.title}>
              <span className="price">{service.price}</span>
              <h2>{service.title}</h2>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
        <div className="center-block">
          <Link className="button primary" href="/score">Start with AI Commerce Score</Link>
        </div>
      </div>
    </section>
  )
}

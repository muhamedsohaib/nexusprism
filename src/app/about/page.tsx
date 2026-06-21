import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Founder-led Nexus Prism positioning and commerce operations experience.'
}

const points = [
  'Amazon marketplace operations experience',
  'Listing and catalog optimization',
  'Product image direction and editing',
  'Seller support and customer-service workflows',
  'Product opportunity thinking',
  'Automation mindset for repetitive work'
]

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="container split-grid align-start">
        <div className="section-copy sticky-copy">
          <p className="eyebrow">Operator experience</p>
          <h1>Built from real marketplace operations, not theory.</h1>
          <p>Nexus Prism is a premium consulting direction shaped around hands-on e-commerce work: listings, catalog fixes, product images, customer service, and operational systems.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/score">Get Free Commerce Score</Link>
            <Link className="button ghost" href="/proof">View the Lab</Link>
          </div>
        </div>
        <div className="proof-list glass-card">
          {points.map((point) => <div key={point}><span className="status-dot" />{point}</div>)}
        </div>
      </div>
    </section>
  )
}

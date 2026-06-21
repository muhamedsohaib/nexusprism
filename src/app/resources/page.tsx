import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Nexus Prism resources for UAE e-commerce and marketplace operators.'
}

export default function ResourcesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Resources</p>
          <h1>Operator notes for UAE sellers are coming next.</h1>
          <p>The resources section will publish practical notes on Amazon.ae listings, images, catalog quality, automation, and commerce operations.</p>
          <Link className="button primary" href="/score">Start with the free score</Link>
        </div>
      </div>
    </section>
  )
}

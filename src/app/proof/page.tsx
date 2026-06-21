import type { Metadata } from 'next'
import { proofItems } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Before / After Proof Lab',
  description: 'Nexus Prism before-and-after examples for marketplace listings, storefronts, and AI-assisted commerce operations.'
}

export default function ProofPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Proof lab</p>
          <h1>The site must prove execution, not just promise AI.</h1>
          <p>
            Use these first as demo examples. Replace them with real client transformations as soon as the first paid sprints are delivered.
          </p>
        </div>
        <div className="card-grid three">
          {proofItems.map((item) => (
            <article className="proof-card glass-card" key={item.title}>
              <h2>{item.title}</h2>
              <div className="before-after">
                <div><span>Before</span><p>{item.before}</p></div>
                <div><span>After</span><p>{item.after}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

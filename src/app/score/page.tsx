import type { Metadata } from 'next'
import { ScoreForm } from '@/components/score-form'

export const metadata: Metadata = {
  title: 'AI Commerce Score',
  description: 'Submit your Amazon, noon, Shopify, or e-commerce URL for a Nexus Prism AI Commerce Score.'
}

export default function ScorePage() {
  return (
    <section className="page-section">
      <div className="container split-grid align-start">
        <div className="section-copy">
          <p className="eyebrow">AI Commerce Score</p>
          <h1>One URL is enough to start finding the leaks.</h1>
          <p className="hero-lede">
            The score reviews visible commerce blockers across catalog quality, storefront trust, content strength, automation readiness, analytics hygiene, and growth priority.
          </p>
          <div className="score-breakdown glass-card">
            <h2>What gets reviewed</h2>
            <ul>
              <li>Marketplace listing clarity and keyword fit</li>
              <li>Main image and product-story quality</li>
              <li>Trust signals and conversion friction</li>
              <li>Automation gaps in inquiry and delivery workflows</li>
              <li>Best paid sprint to fix the problem first</li>
            </ul>
          </div>
        </div>
        <ScoreForm />
      </div>
    </section>
  )
}

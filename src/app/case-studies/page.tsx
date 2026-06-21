import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Nexus Prism case studies and founder-led demonstration work.'
}

export default function CaseStudiesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Case studies</p>
          <h1>Real case studies will only appear when real work is complete.</h1>
          <p>No fake testimonials, no fake client logos, and no fake revenue claims. For now, use the Before/After Lab to see demonstration work and operator thinking.</p>
          <div className="hero-actions center-actions">
            <Link className="button primary" href="/proof">View the Lab</Link>
            <Link className="button ghost" href="/score">Get Free Commerce Score</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

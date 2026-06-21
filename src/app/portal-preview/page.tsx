import type { Metadata } from 'next'
import Link from 'next/link'
import { dashboardModules } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Portal Preview',
  description: 'A preview of the future Nexus Prism dashboard experience.'
}

export default function PortalPreviewPage() {
  return (
    <section className="page-section">
      <div className="container dashboard-shell glass-card">
        <div className="section-copy">
          <p className="eyebrow">Portal preview</p>
          <h1>See the future dashboard before the full app is built.</h1>
          <p>The first website sells services. The portal preview shows how scores, active sprints, approvals, and reporting can become clearer over time.</p>
          <Link className="button primary" href="/score">Get Free Commerce Score</Link>
        </div>
        <div className="dashboard-grid">
          {dashboardModules.map((module, index) => (
            <article className={index === 0 || index === 8 ? 'dash-card wide' : 'dash-card'} key={module}>
              <span>{module}</span>
              <strong>{index === 0 ? 'Manual review' : index === 8 ? 'Sprint in progress' : 'Check pending'}</strong>
              <div className="bar"><i style={{ width: `${55 + (index % 4) * 10}%` }} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

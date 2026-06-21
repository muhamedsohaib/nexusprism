import Link from 'next/link'
import { site } from '@/lib/constants'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{site.name}</p>
          <p>{site.description}</p>
        </div>
        <div>
          <h3>Website</h3>
          <Link href="/score">AI Commerce Score</Link>
          <Link href="/proof">Before/After Lab</Link>
          <Link href="/services">Fix Sprints</Link>
          <Link href="/pricing">Pricing</Link>
        </div>
        <div>
          <h3>Operating model</h3>
          <p>Premium consulting first. Human-reviewed AI scoring. Paid sprints only when the first diagnosis reveals something worth fixing.</p>
        </div>
      </div>
    </footer>
  )
}

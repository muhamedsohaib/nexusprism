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
          <Link href="/proof">Proof lab</Link>
          <Link href="/services">Fix sprints</Link>
        </div>
        <div>
          <h3>Launch model</h3>
          <p>Service-led first. Software later. Build the app only after real score submissions and paid sprints validate the workflow.</p>
        </div>
      </div>
    </footer>
  )
}

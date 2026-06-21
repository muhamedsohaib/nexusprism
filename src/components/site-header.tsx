import Link from 'next/link'
import { navItems, site, whatsappLink } from '@/lib/constants'

const markSrc = '/nexus-prism-logo.png'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Nexus Prism home">
          <span className="brand-mark image-mark" aria-hidden="true">
            <img src={markSrc} alt="" style={{ width: '86%', height: '86%', objectFit: 'contain' }} />
          </span>
          <span className="brand-copy">
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="language-pill" href="/">العربية</Link>
          <a className="nav-cta" href={whatsappLink('Hi Nexus Prism, I want my free AI Commerce Score.')} target="_blank" rel="noreferrer">Free Score</a>
        </div>
      </div>
    </header>
  )
}

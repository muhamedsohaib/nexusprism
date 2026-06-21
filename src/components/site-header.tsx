import Link from 'next/link'
import { navItems, site, whatsappLink } from '@/lib/constants'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" href="/home" aria-label="Nexus Prism home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-copy">
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <a className="nav-cta" href={whatsappLink('Hi Nexus Prism, I want my AI Commerce Score.')} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </header>
  )
}

import Link from 'next/link'
import { capabilities, proofItems, services, whatsappLink } from '@/lib/constants'
import { ScoreForm } from '@/components/score-form'

export function HeroCommandCenter() {
  return (
    <section className="hero-section" id="top">
      <div className="aura aura-gold" />
      <div className="aura aura-cyan" />
      <div className="prism-beam" />
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">UAE-first · AI commerce command center</p>
          <h1>Fix the revenue leaks hiding inside your online store.</h1>
          <p className="hero-lede">
            Nexus Prism scores Amazon, noon, Shopify, and e-commerce operations, then turns the highest-impact fixes into done-for-you sprints, dashboards, and monthly growth systems.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/score">Get your AI Commerce Score</Link>
            <a className="button ghost" href={whatsappLink('Hi Nexus Prism, I want to audit my e-commerce business.')} target="_blank" rel="noreferrer">WhatsApp the founder</a>
          </div>
          <div className="assurance-row" role="list">
            <span>Amazon.ae / noon / Shopify</span>
            <span>Manual expert review first</span>
            <span>Built for UAE sellers</span>
          </div>
        </div>

        <div className="command-visual glass-card" aria-label="AI Commerce Score dashboard preview">
          <div className="console-topbar"><i /><i /><i /><strong>AI Commerce Score</strong></div>
          <div className="score-orb"><div className="score-ring" /><strong>82</strong><span>Growth-ready</span></div>
          <div className="diagnostic-grid">
            <Metric label="Catalog quality" value="74%" />
            <Metric label="Store trust" value="88%" />
            <Metric label="Automation" value="41%" />
            <Metric label="Revenue leak" value="AED 18k" />
          </div>
          <div className="floating-ticket ticket-left"><span className="status-dot" /> 12 listing fixes queued</div>
          <div className="floating-ticket ticket-right">Before → After proof ready</div>
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>
}

export function ScoreSection() {
  return (
    <section className="section" id="score">
      <div className="container split-grid">
        <div className="section-copy">
          <p className="eyebrow">Lead magnet</p>
          <h2>The website starts with a score, not a sales pitch.</h2>
          <p>
            The first MVP goal is simple: collect seller URLs, diagnose visible growth blockers, and convert the best leads into paid fix sprints.
          </p>
          <div className="chip-row">
            <span>Catalog quality</span><span>Store trust</span><span>Creative quality</span><span>Automation gaps</span><span>Analytics readiness</span>
          </div>
        </div>
        <ScoreForm />
      </div>
    </section>
  )
}

export function BeforeAfterLab() {
  return (
    <section className="section muted-section" id="proof">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Before / after lab</p>
          <h2>Make the value visible before people book a call.</h2>
          <p>Your site should prove that Nexus Prism fixes real commerce problems, not just creates generic AI content.</p>
        </div>
        <div className="card-grid three">
          {proofItems.map((item) => (
            <article className="proof-card glass-card" key={item.title}>
              <h3>{item.title}</h3>
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

export function CapabilityConstellation() {
  return (
    <section className="section" id="capabilities">
      <div className="container split-grid align-start">
        <div className="section-copy sticky-copy">
          <p className="eyebrow">Capability constellation</p>
          <h2>One operating layer over the messy parts of selling online.</h2>
          <p>Do not present this as random services. Present it as a connected command system for commerce growth.</p>
        </div>
        <div className="capability-stack">
          {capabilities.map(([title, body], index) => (
            <article className="capability-card glass-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DashboardPreview() {
  return (
    <section className="section">
      <div className="container dashboard-shell glass-card">
        <div className="section-copy">
          <p className="eyebrow">Dashboard-as-brand</p>
          <h2>Preview the future app from day one.</h2>
          <p>Show the client portal before it exists fully: score history, active tasks, pending approvals, content briefs, and automation status.</p>
        </div>
        <div className="dashboard-grid">
          <div className="dash-card wide"><span>Commerce health</span><strong>82 / 100</strong><div className="bar"><i /></div></div>
          <div className="dash-card"><span>Pending approvals</span><strong>7</strong><small>Images, copy, automation</small></div>
          <div className="dash-card"><span>Revenue leaks</span><strong>AED 18k</strong><small>Estimated monthly opportunity</small></div>
          <div className="dash-card wide"><span>Active sprint</span><strong>Amazon listing rescue</strong><ul><li>Main image brief approved</li><li>Keyword map in progress</li><li>A+ layout awaiting assets</li></ul></div>
        </div>
      </div>
    </section>
  )
}

export function ServiceCards() {
  return (
    <section className="section muted-section" id="services">
      <div className="container">
        <div className="section-heading center">
          <p className="eyebrow">Commercial model</p>
          <h2>Start service-led. Turn repetition into software.</h2>
          <p>These offers are designed to get paid quickly, create proof, and reveal which workflows deserve software later.</p>
        </div>
        <div className="card-grid services-grid">
          {services.map((service) => (
            <article className="service-card glass-card" key={service.title}>
              <span className="price">{service.price}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LaunchPlan() {
  const steps = [
    ['01', 'Launch website + score form', 'Collect the first 50 seller submissions through WhatsApp and direct outreach.'],
    ['02', 'Manual audit delivery', 'Complete 20-30 audits and close the first paid fix sprints.'],
    ['03', 'Productize retainers', 'Turn repeated work into templates, dashboards, checklists, and monthly score refreshes.']
  ]

  return (
    <section className="section compact-section">
      <div className="container launch-grid">
        {steps.map(([no, title, body]) => (
          <article className="launch-card" key={title}>
            <span>{no}</span><h3>{title}</h3><p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function WhatsAppCTA() {
  return (
    <section className="section" id="contact">
      <div className="container contact-card glass-card">
        <p className="eyebrow">Founder-led close</p>
        <h2>Send one URL. Get the first diagnosis.</h2>
        <p>In the first version, WhatsApp is the sales rail. Use the website to look premium, collect structured demand, and close manually.</p>
        <div className="hero-actions center-actions">
          <Link className="button primary" href="/score">Start with the score</Link>
          <a className="button ghost" href={whatsappLink('Hi Nexus Prism, I want to discuss the AI Commerce Score and fix sprint.')} target="_blank" rel="noreferrer">Open WhatsApp</a>
        </div>
      </div>
    </section>
  )
}

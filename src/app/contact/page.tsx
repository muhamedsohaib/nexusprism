import type { Metadata } from 'next'
import { ScoreForm } from '@/components/score-form'
import { whatsappLink } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nexus Prism for AI Commerce Score audits, marketplace rescue sprints, and UAE e-commerce operations support.'
}

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="container split-grid align-start">
        <div className="section-copy">
          <p className="eyebrow">Contact</p>
          <h1>Send one URL and start the diagnosis.</h1>
          <p className="hero-lede">
            The first launch version is founder-led and WhatsApp-first. Submit a score request or send a direct message with your store link and main bottleneck.
          </p>
          <a className="button primary" href={whatsappLink('Hi Nexus Prism, I want to discuss my e-commerce business.')} target="_blank" rel="noreferrer">
            Open WhatsApp directly
          </a>
        </div>
        <ScoreForm compact />
      </div>
    </section>
  )
}

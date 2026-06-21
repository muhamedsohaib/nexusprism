import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the Nexus Prism Commerce Score and fix sprints.'
}

const faqs = [
  ['Is the first Commerce Score really free?', 'Yes. The first review is free so we can see whether there is a real fix worth discussing.'],
  ['Will I get an instant AI-generated score?', 'No. The first version is manually reviewed with AI support so the advice stays practical and avoids fake automated promises.'],
  ['Do you only work with Amazon.ae sellers?', 'Amazon.ae sellers are the first focus, but the system is being built for noon, Shopify, and wider e-commerce operations as well.'],
  ['Do I need to share private seller account access?', 'No for the first review. We start with visible links and information you choose to submit.'],
  ['Can you guarantee sales improvement?', 'No. We avoid fake guarantees. The goal is to identify and fix visible operational gaps that can improve the conditions for better performance.']
]

export default function FAQPage() {
  return (
    <section className="page-section">
      <div className="container split-grid align-start">
        <div className="section-copy sticky-copy">
          <p className="eyebrow">Questions</p>
          <h1>What serious sellers ask before they send a store.</h1>
          <p>The first step is a free review, not a commitment. The goal is to identify whether there is a practical fix worth discussing.</p>
          <Link className="button primary" href="/score">Get Free Commerce Score</Link>
        </div>
        <div className="faq-stack">
          {faqs.map(([question, answer]) => (
            <details className="faq-item glass-card" key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

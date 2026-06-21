import { whatsappLink } from '@/lib/constants'

export function ScoreForm({ compact = false }: { compact?: boolean }) {
  const message = [
    'Hi Nexus Prism, I want my AI Commerce Score.',
    '',
    'Store / listing URL:',
    'Main channel: Amazon.ae / noon / Shopify / Website',
    'Monthly online revenue:',
    'Main problem:',
    '',
    'Please review this and tell me the highest-impact fixes first.'
  ].join('\n')

  return (
    <form className={compact ? 'score-form compact-card' : 'score-form glass-card'} action={whatsappLink(message)} target="_blank">
      <div className="form-heading">
        <span className="pill success">Free first review</span>
        <h2>Submit for AI Commerce Score</h2>
        <p>Paste one URL and describe the main problem. The first version routes the request to WhatsApp so the audit can be fulfilled manually.</p>
      </div>

      <label>
        <span>Store, listing, or product URL</span>
        <input name="url" placeholder="Amazon, noon, Shopify, or website URL" required />
      </label>

      <label>
        <span>Main sales channel</span>
        <select name="channel" defaultValue="Amazon.ae">
          <option>Amazon.ae</option>
          <option>noon</option>
          <option>Shopify</option>
          <option>Own website</option>
          <option>Instagram / WhatsApp selling</option>
        </select>
      </label>

      <label>
        <span>Approximate monthly online revenue</span>
        <select name="revenue" defaultValue="Under AED 50k/month">
          <option>Pre-launch</option>
          <option>Under AED 50k/month</option>
          <option>AED 50k - 250k/month</option>
          <option>AED 250k - 1m/month</option>
          <option>Above AED 1m/month</option>
        </select>
      </label>

      <label>
        <span>Main problem</span>
        <textarea name="problem" placeholder="Low sales, poor listing images, messy operations, weak website, no automation, bad reporting..." required />
      </label>

      <button className="button primary full" type="submit">Open WhatsApp with my score request</button>
      <p className="microcopy">Database integration can come after the first real submissions. Speed matters more than overbuilding.</p>
    </form>
  )
}

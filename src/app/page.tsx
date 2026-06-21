import Link from 'next/link'
import { DottedSurface } from '@/components/dotted-surface'

export default function EntryPage() {
  return (
    <section className="entry-page" aria-label="Nexus Prism entry screen">
      <DottedSurface className="entry-dotted-surface" />
      <Link className="proceed-button" href="/home" aria-label="Proceed to Nexus Prism website">
        Proceed
      </Link>
    </section>
  )
}

import Link from 'next/link'
import { CinematicShaderHomepage } from '@/components/cinematic-shader-homepage'

export default function HomePage() {
  return (
    <>
      <div className="chrome-prism-core" aria-hidden="true">
        <img src="/nexus-prism-logo.png" alt="" />
      </div>
      <CinematicShaderHomepage />
      <Link className="bottom-score-cta" href="/score" aria-label="Get your score">
        <span className="bottom-score-logo" aria-hidden="true" />
        <span>Get your score</span>
      </Link>
    </>
  )
}

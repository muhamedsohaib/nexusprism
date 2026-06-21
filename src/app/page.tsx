import Link from 'next/link'
import { CinematicShaderHomepage } from '@/components/ui/animated-shader-hero'

export default function HomePage() {
  return (
    <>
      <CinematicShaderHomepage />
      <Link className="bottom-score-cta" href="/score" aria-label="Get your score">
        <span className="bottom-score-logo" aria-hidden="true" />
        <span>Get your score</span>
      </Link>
    </>
  )
}

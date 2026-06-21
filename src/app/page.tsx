import { CinematicShaderHomepage } from '@/components/cinematic-shader-homepage'

const markSrc = '/' + 'nexus-prism-logo-actual.svg'

export default function HomePage() {
  return (
    <>
      <div className="chrome-prism-core" aria-hidden="true">
        <img src={markSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <CinematicShaderHomepage />
    </>
  )
}

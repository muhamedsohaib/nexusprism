import { CinematicShaderHomepage } from '@/components/cinematic-shader-homepage'
import { nexusPrismLogoSrc } from '@/lib/logo-data'

export default function HomePage() {
  return (
    <>
      <div className="chrome-prism-core" aria-hidden="true">
        <img src={nexusPrismLogoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <CinematicShaderHomepage />
    </>
  )
}

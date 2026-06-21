import { CinematicShaderHomepage } from '@/components/cinematic-shader-homepage'

export default function HomePage() {
  const src = '/nexus-prism-logo-actual.svg'
  return (
    <>
      <div className="chrome-prism-core" aria-hidden="true">
        <img src={src} alt="" />
      </div>
      <CinematicShaderHomepage />
    </>
  )
}

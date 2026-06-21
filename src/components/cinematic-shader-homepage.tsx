'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { whatsappLink } from '@/lib/constants'

type HeroProps = {
  trustBadge?: { text: string; icons?: string[] }
  headline: { line1: string; line2: string }
  subtitle: string
  buttons?: {
    primary?: { text: string; href: string }
    secondary?: { text: string; href: string }
  }
  className?: string
}

function useChromeRedShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false })
    if (!gl) return

    const vertex = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, vertex)
    const fs = compile(gl.FRAGMENT_SHADER, chromeRedShaderSource)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolution = gl.getUniformLocation(program, 'resolution')
    const time = gl.getUniformLocation(program, 'time')
    const pointer = gl.getUniformLocation(program, 'pointer')
    let pointerCoords = [0, 0]

    const resize = () => {
      const dpr = Math.max(1, Math.min(1.35, window.devicePixelRatio * 0.62))
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerCoords = [event.clientX, window.innerHeight - event.clientY]
    }

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform1f(time, now * 0.001)
      gl.uniform2f(pointer, pointerCoords[0], pointerCoords[1])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameRef.current = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return canvasRef
}

function Hero({ trustBadge, headline, subtitle, buttons, className = '' }: HeroProps) {
  const canvasRef = useChromeRedShader()

  return (
    <section className={`chrome-hero ${className}`}>
      <style>{chromeHeroStyles}</style>
      <canvas ref={canvasRef} className="chrome-hero-canvas" aria-hidden="true" />
      <div className="chrome-static-aura" aria-hidden="true">
        <span className="aura-red-one" />
        <span className="aura-red-two" />
        <span className="aura-chrome" />
      </div>
      <div className="chrome-grid" aria-hidden="true" />
      <div className="chrome-prism-core" aria-hidden="true">
        <i className="prism-triangle prism-one" />
        <i className="prism-triangle prism-two" />
        <i className="prism-triangle prism-three" />
        <i className="prism-ring ring-a" />
        <i className="prism-ring ring-b" />
      </div>
      <div className="chrome-red-beam" aria-hidden="true" />
      <div className="chrome-hero-vignette" aria-hidden="true" />

      <div className="chrome-hero-content">
        <div className="chrome-copy-panel">
          {trustBadge && (
            <div className="chrome-trust-badge">
              {trustBadge.icons && (
                <div className="chrome-trust-icons">
                  {trustBadge.icons.map((icon, index) => <span key={index}>{icon}</span>)}
                </div>
              )}
              <span>{trustBadge.text}</span>
            </div>
          )}

          <div className="chrome-headline-wrap">
            <h1 className="chrome-headline chrome-headline-primary">{headline.line1}</h1>
            <h1 className="chrome-headline chrome-headline-secondary">{headline.line2}</h1>
          </div>

          <p className="chrome-subtitle">{subtitle}</p>

          {buttons && (
            <div className="chrome-actions">
              {buttons.primary && <Link className="chrome-button chrome-button-primary" href={buttons.primary.href}>{buttons.primary.text}</Link>}
              {buttons.secondary && <a className="chrome-button chrome-button-secondary" href={buttons.secondary.href} target="_blank" rel="noreferrer">{buttons.secondary.text}</a>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function CinematicShaderHomepage() {
  return (
    <Hero
      trustBadge={{ text: 'Amazon.ae first · UAE-first · Human-reviewed AI commerce score', icons: ['◆', '◇', '◆'] }}
      headline={{ line1: 'The AI operating layer', line2: 'for UAE sellers.' }}
      subtitle="Nexus Prism reviews your Amazon.ae presence, identifies operational gaps, and turns the highest-impact fixes into focused execution sprints."
      buttons={{
        primary: { text: 'Check Your Actual Worth', href: '/score' },
        secondary: { text: 'WhatsApp the Founder', href: whatsappLink('Hi Nexus Prism, I want my free AI Commerce Score for my Amazon.ae store.') }
      }}
    />
  )
}

const chromeHeroStyles = `
.chrome-hero {
  position: relative;
  width: 100%;
  min-height: calc(100svh - 78px);
  overflow: hidden;
  background:
    radial-gradient(circle at 58% 43%, rgba(208, 24, 36, .18), transparent 20rem),
    radial-gradient(circle at 18% 16%, rgba(244, 239, 231, .08), transparent 18rem),
    linear-gradient(135deg, #000 0%, #070204 44%, #120406 100%);
  isolation: isolate;
}

.chrome-hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  touch-action: none;
  z-index: 1;
  opacity: .82;
  mix-blend-mode: screen;
}

.chrome-static-aura,
.chrome-grid,
.chrome-prism-core,
.chrome-red-beam,
.chrome-hero-vignette {
  position: absolute;
  pointer-events: none;
}

.chrome-static-aura {
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.chrome-static-aura span {
  position: absolute;
  display: block;
  border-radius: 999px;
  filter: blur(30px);
  opacity: .9;
}

.aura-red-one {
  width: 44rem;
  height: 44rem;
  left: 62%;
  top: 48%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(226, 34, 48, .34), rgba(139, 14, 22, .16) 38%, transparent 68%);
  animation: auraPulse 5.6s ease-in-out infinite;
}

.aura-red-two {
  width: 34rem;
  height: 34rem;
  right: -9rem;
  top: 9rem;
  background: radial-gradient(circle, rgba(226, 34, 48, .28), transparent 64%);
  animation: auraFloat 7s ease-in-out infinite;
}

.aura-chrome {
  width: 30rem;
  height: 30rem;
  left: -8rem;
  bottom: 2rem;
  background: radial-gradient(circle, rgba(244, 239, 231, .13), rgba(184, 192, 200, .07), transparent 68%);
  animation: auraFloat 8s ease-in-out infinite reverse;
}

.chrome-grid {
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(rgba(244, 239, 231, .045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244, 239, 231, .035) 1px, transparent 1px);
  background-size: 82px 82px;
  mask-image: radial-gradient(circle at 62% 44%, #000 0 34%, transparent 76%);
  opacity: .32;
}

.chrome-prism-core {
  z-index: 2;
  width: min(46vw, 520px);
  height: min(46vw, 520px);
  left: 66%;
  top: 48%;
  transform: translate(-50%, -50%);
  opacity: .74;
  filter: drop-shadow(0 0 58px rgba(226, 34, 48, .32));
}

.prism-triangle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52%;
  aspect-ratio: 1 / .86;
  transform: translate(-50%, -50%);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  border: 1px solid rgba(244,239,231,.44);
  background:
    linear-gradient(135deg, rgba(244,239,231,.18), rgba(226,34,48,.16) 45%, rgba(0,0,0,.02)),
    radial-gradient(circle at 50% 12%, rgba(255,255,255,.36), transparent 22%);
  box-shadow: inset 0 0 34px rgba(244,239,231,.11), 0 0 62px rgba(226,34,48,.18);
}

.prism-one { transform: translate(-50%, -62%) scale(1.04); }
.prism-two { transform: translate(-91%, -18%) scale(.74) rotate(-2deg); opacity: .74; }
.prism-three { transform: translate(-8%, -18%) scale(.74) rotate(2deg); opacity: .74; }

.prism-ring {
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  border: 1px solid rgba(226,34,48,.24);
  box-shadow: inset 0 0 70px rgba(226,34,48,.08), 0 0 70px rgba(226,34,48,.12);
}

.ring-a { animation: slowSpin 18s linear infinite; }
.ring-b { inset: 20%; border-color: rgba(244,239,231,.20); animation: slowSpin 12s linear infinite reverse; }

.chrome-red-beam {
  z-index: 3;
  left: 62%;
  top: 49%;
  width: min(960px, 78vw);
  height: 3px;
  transform: translate(-50%, -50%) rotate(-7deg);
  background: linear-gradient(90deg, transparent, rgba(128, 7, 17, .24), rgba(226, 34, 48, .9), rgba(238, 232, 224, .72), rgba(226, 34, 48, .44), transparent);
  filter: blur(.25px) drop-shadow(0 0 32px rgba(226, 34, 48, .68));
  animation: chromeBeam 4.8s cubic-bezier(.22,1,.36,1) infinite;
  opacity: .9;
}

.chrome-hero-vignette {
  inset: 0;
  z-index: 4;
  background:
    linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.62) 30%, rgba(0,0,0,.16) 60%, rgba(0,0,0,.76) 100%),
    radial-gradient(circle at 64% 48%, transparent 0 22%, rgba(0, 0, 0, .18) 50%, rgba(0, 0, 0, .84) 90%),
    linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.06) 36%, rgba(0,0,0,.82));
}

.chrome-hero-content {
  position: relative;
  z-index: 5;
  min-height: calc(100svh - 78px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #f4efe7;
  padding: clamp(44px, 8vw, 96px) clamp(22px, 9vw, 142px);
}

.chrome-copy-panel {
  width: min(620px, 100%);
  text-align: left;
  transform: translateY(-1vh);
}

.chrome-trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 16px;
  margin-bottom: 28px;
  border: 1px solid rgba(238, 232, 224, .22);
  border-radius: 999px;
  color: rgba(244, 239, 231, .84);
  background: linear-gradient(135deg, rgba(208, 24, 36, .16), rgba(244, 239, 231, .055));
  backdrop-filter: blur(18px) saturate(135%);
  box-shadow: 0 18px 70px rgba(208, 24, 36, .14);
  font-size: .88rem;
  animation: fadeDown .85s ease-out both;
}

.chrome-trust-icons {
  display: flex;
  gap: 2px;
  color: #ff3342;
  text-shadow: 0 0 18px rgba(255, 51, 66, .82);
}

.chrome-headline-wrap {
  display: grid;
  gap: 7px;
  width: 100%;
}

.chrome-headline {
  margin: 0;
  font-family: var(--font-display), Georgia, serif;
  font-size: clamp(3rem, 5.7vw, 5.95rem);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.055em;
  animation: fadeUp .9s ease-out both;
}

.chrome-headline-primary {
  background: linear-gradient(90deg, #ffffff, #d7dde3 20%, #ff3342 58%, #eef1f4 82%);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 46px rgba(226, 34, 48, .18);
  animation-delay: .18s;
}

.chrome-headline-secondary {
  background: linear-gradient(90deg, #ff3342, #f4efe7 42%, #b8c0c8 72%, #7a0912);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation-delay: .32s;
}

.chrome-subtitle {
  max-width: 520px;
  margin: 24px 0 0;
  color: rgba(244, 239, 231, .74);
  font-size: clamp(.98rem, 1.22vw, 1.16rem);
  line-height: 1.75;
  font-weight: 400;
  animation: fadeUp .9s ease-out .52s both;
}

.chrome-actions {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 32px;
  animation: fadeUp .9s ease-out .72s both;
}

.chrome-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 21px;
  border-radius: 999px;
  font-size: .94rem;
  font-weight: 900;
  transition: transform .32s ease, border-color .32s ease, box-shadow .32s ease;
}

.chrome-button:hover { transform: translateY(-3px) scale(1.015); }

.chrome-button-primary {
  color: #fff;
  background: linear-gradient(135deg, #ff3342, #a10d18 56%, #3a0307);
  box-shadow: 0 18px 68px rgba(226, 34, 48, .34), inset 0 1px 0 rgba(255,255,255,.24);
}

.chrome-button-secondary {
  color: rgba(244, 239, 231, .9);
  border: 1px solid rgba(244, 239, 231, .20);
  background: rgba(244, 239, 231, .055);
  backdrop-filter: blur(14px);
}

.chrome-button-secondary:hover {
  border-color: rgba(226, 34, 48, .64);
  box-shadow: 0 16px 48px rgba(226, 34, 48, .20);
}

@keyframes fadeDown { from { opacity: 0; transform: translateY(-18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes chromeBeam { 0%, 100% { opacity: .10; transform: translate(-56%, -50%) rotate(-7deg) scaleX(.45); } 45%, 68% { opacity: .92; } 52% { transform: translate(-44%, -50%) rotate(-7deg) scaleX(1.08); } }
@keyframes auraPulse { 0%, 100% { transform: translate(-50%, -50%) scale(.9); opacity: .58; } 50% { transform: translate(-50%, -50%) scale(1.06); opacity: .92; } }
@keyframes auraFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-22px); } }
@keyframes slowSpin { to { transform: rotate(360deg); } }

@media (max-width: 980px) {
  .chrome-hero-content {
    justify-content: center;
    padding: 64px 24px;
  }
  .chrome-copy-panel {
    text-align: center;
    margin-inline: auto;
  }
  .chrome-actions {
    justify-content: center;
  }
  .chrome-prism-core,
  .chrome-red-beam,
  .aura-red-one {
    left: 50%;
  }
  .chrome-hero-vignette {
    background:
      radial-gradient(circle at 50% 48%, transparent 0 24%, rgba(0, 0, 0, .24) 50%, rgba(0, 0, 0, .86) 90%),
      linear-gradient(180deg, rgba(0,0,0,.26), rgba(0,0,0,.1) 36%, rgba(0,0,0,.84));
  }
}

@media (max-width: 760px) {
  .chrome-hero, .chrome-hero-content { min-height: calc(100svh - 66px); }
  .chrome-trust-badge { margin-bottom: 22px; padding: 9px 14px; font-size: .78rem; }
  .chrome-headline { font-size: clamp(2.65rem, 12.5vw, 4.2rem); }
  .chrome-subtitle { font-size: .96rem; margin-top: 20px; }
  .chrome-actions { flex-direction: column; width: min(100%, 340px); }
  .chrome-button { width: 100%; }
  .chrome-prism-core { width: 92vw; height: 92vw; opacity: .48; }
}

@media (prefers-reduced-motion: reduce) {
  .chrome-red-beam, .chrome-static-aura span, .prism-ring, .chrome-trust-badge, .chrome-headline, .chrome-subtitle, .chrome-actions { animation: none !important; }
}
`

const chromeRedShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 pointer;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) { p=fract(p*vec2(12.9898,78.233)); p+=dot(p,p+34.56); return fract(p.x*p.y); }
float noise(in vec2 p) { vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f); float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p) { float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2); for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; } return t; }
float clouds(vec2 p) { float d=1., t=.0; for (float i=.0; i<3.; i++) { float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p); t=mix(t,d,a); d=a; p*=2./(i+1.); } return t; }
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec2 mouse=(pointer-.5*R)/MN;
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.45,-st.y));
  uv*=1.-.28*(sin(T*.2)*.5+.5);
  uv += mouse*.025;
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    vec3 chromeRed=vec3(.95,.035,.075);
    vec3 pearlChrome=vec3(.98,.98,1.0);
    col+=.0018/d*(chromeRed+.36*pearlChrome);
    float b=noise(i+p+bg*1.731);
    col+=.003*b/length(max(p,vec2(b*p.x*.02,p.y)))*vec3(1.0,.10,.14);
    col=mix(col,vec3(bg*.34,bg*.03,bg*.055),d);
  }
  float vignette=pow(max(0.,1.-length((FC-.5*R)/MN)),3.2);
  col+=vignette*vec3(.24,.016,.038);
  O=vec4(col,1);
}`

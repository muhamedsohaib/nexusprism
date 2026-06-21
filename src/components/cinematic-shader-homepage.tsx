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

    const gl = canvas.getContext('webgl2')
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
      const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio * 0.55))
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerCoords = [event.clientX, window.innerHeight - event.clientY]
    }

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 1)
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
      <div className="chrome-hero-vignette" aria-hidden="true" />
      <div className="chrome-red-beam" aria-hidden="true" />

      <div className="chrome-hero-content">
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
    </section>
  )
}

export function CinematicShaderHomepage() {
  return (
    <Hero
      trustBadge={{ text: 'Amazon.ae first · UAE-first · Human-reviewed AI commerce score', icons: ['◆', '◇', '◆'] }}
      headline={{ line1: 'The AI operating layer', line2: 'for UAE sellers.' }}
      subtitle="Nexus Prism reviews your Amazon.ae presence, identifies the operational gaps holding your store back, and turns the highest-impact fixes into focused execution sprints."
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
  background: #000;
  isolation: isolate;
}

.chrome-hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: #000;
  touch-action: none;
  z-index: 0;
}

.chrome-hero-vignette {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(circle at 50% 44%, rgba(208, 24, 36, 0.05), transparent 22rem),
    radial-gradient(circle at 50% 50%, transparent 0 34%, rgba(0, 0, 0, 0.72) 84%),
    linear-gradient(180deg, rgba(0,0,0,.38), rgba(0,0,0,.1) 35%, rgba(0,0,0,.78));
  pointer-events: none;
}

.chrome-red-beam {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  width: min(980px, 82vw);
  height: 2px;
  transform: translate(-50%, -50%) rotate(-7deg);
  background: linear-gradient(90deg, transparent, rgba(128, 7, 17, .2), rgba(226, 34, 48, .92), rgba(238, 232, 224, .74), rgba(226, 34, 48, .4), transparent);
  filter: blur(.4px) drop-shadow(0 0 28px rgba(226, 34, 48, .55));
  animation: chromeBeam 5.4s cubic-bezier(.22,1,.36,1) infinite;
  opacity: .8;
}

.chrome-hero-content {
  position: relative;
  z-index: 3;
  min-height: calc(100svh - 78px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #f4efe7;
  padding: clamp(28px, 5vw, 72px) 20px;
}

.chrome-trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  margin-bottom: 34px;
  border: 1px solid rgba(238, 232, 224, .22);
  border-radius: 999px;
  color: rgba(244, 239, 231, .86);
  background: linear-gradient(135deg, rgba(208, 24, 36, .14), rgba(244, 239, 231, .045));
  backdrop-filter: blur(18px) saturate(135%);
  box-shadow: 0 18px 70px rgba(208, 24, 36, .14);
  animation: fadeDown .85s ease-out both;
}

.chrome-trust-icons {
  display: flex;
  gap: 2px;
  color: #e22230;
  text-shadow: 0 0 18px rgba(226, 34, 48, .8);
}

.chrome-headline-wrap {
  display: grid;
  gap: 8px;
  width: min(1100px, 100%);
}

.chrome-headline {
  margin: 0;
  font-family: var(--font-display), Georgia, serif;
  font-size: clamp(3.6rem, 9vw, 9.3rem);
  font-weight: 700;
  line-height: .88;
  letter-spacing: -.065em;
  animation: fadeUp .9s ease-out both;
}

.chrome-headline-primary {
  background: linear-gradient(90deg, #f7f3ed, #d6dde5 22%, #e22230 50%, #eef1f4 72%, #8b0e16);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 50px rgba(226, 34, 48, .14);
  animation-delay: .18s;
}

.chrome-headline-secondary {
  background: linear-gradient(90deg, #8b0e16, #e22230 28%, #f4efe7 55%, #b8c0c8 74%, #5a0710);
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation-delay: .36s;
}

.chrome-subtitle {
  max-width: 820px;
  margin: 28px auto 0;
  color: rgba(244, 239, 231, .78);
  font-size: clamp(1.05rem, 1.7vw, 1.45rem);
  line-height: 1.8;
  font-weight: 400;
  animation: fadeUp .9s ease-out .58s both;
}

.chrome-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 38px;
  animation: fadeUp .9s ease-out .78s both;
}

.chrome-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 26px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 900;
  transition: transform .32s ease, border-color .32s ease, box-shadow .32s ease;
}

.chrome-button:hover {
  transform: translateY(-4px) scale(1.02);
}

.chrome-button-primary {
  color: #f8f2ea;
  background: linear-gradient(135deg, #e22230, #8b0e16 58%, #3a0307);
  box-shadow: 0 22px 70px rgba(226, 34, 48, .30), inset 0 1px 0 rgba(255,255,255,.24);
}

.chrome-button-secondary {
  color: rgba(244, 239, 231, .94);
  border: 1px solid rgba(244, 239, 231, .22);
  background: rgba(244, 239, 231, .055);
  backdrop-filter: blur(14px);
}

.chrome-button-secondary:hover {
  border-color: rgba(226, 34, 48, .62);
  box-shadow: 0 18px 55px rgba(226, 34, 48, .18);
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes chromeBeam {
  0%, 100% { opacity: 0; transform: translate(-56%, -50%) rotate(-7deg) scaleX(.5); }
  45%, 65% { opacity: .9; }
  52% { transform: translate(-44%, -50%) rotate(-7deg) scaleX(1.08); }
}

@media (max-width: 760px) {
  .chrome-hero, .chrome-hero-content { min-height: calc(100svh - 66px); }
  .chrome-trust-badge { margin-bottom: 26px; padding: 10px 16px; font-size: .82rem; }
  .chrome-headline { font-size: clamp(3.25rem, 16vw, 5.2rem); }
  .chrome-subtitle { font-size: 1rem; margin-top: 22px; }
  .chrome-actions { flex-direction: column; width: min(100%, 360px); }
  .chrome-button { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .chrome-red-beam, .chrome-trust-badge, .chrome-headline, .chrome-subtitle, .chrome-actions { animation: none !important; }
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
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
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
    vec3 chromeRed=vec3(.70,.025,.055);
    vec3 pearlChrome=vec3(.86,.88,.92);
    col+=.00135/d*(chromeRed+.32*pearlChrome);
    float b=noise(i+p+bg*1.731);
    col+=.0022*b/length(max(p,vec2(b*p.x*.02,p.y)))*vec3(.92,.08,.12);
    col=mix(col,vec3(bg*.31,bg*.028,bg*.045),d);
  }
  float vignette=pow(max(0.,1.-length((FC-.5*R)/MN)),3.8);
  col+=vignette*vec3(.22,.015,.03);
  O=vec4(col,1);
}`

'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { whatsappLink } from '@/lib/constants'

type HeroProps = {
  trustBadge?: {
    text: string
    icons?: string[]
  }
  headline: {
    line1: string
    line2: string
  }
  subtitle: string
  buttons?: {
    primary?: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  className?: string
}

class WebGLRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private scale: number
  private shaderSource: string
  private mouseMove = [0, 0]
  private mouseCoords = [0, 0]
  private pointerCoords = [0, 0]
  private nbrOfPointers = 0

  private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas
    this.scale = scale
    const context = canvas.getContext('webgl2')
    if (!context) {
      throw new Error('WebGL2 is not supported')
    }
    this.gl = context
    this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
    this.shaderSource = chromeRedShaderSource
  }

  updateMove(deltas: number[]) { this.mouseMove = deltas }
  updateMouse(coords: number[]) { this.mouseCoords = coords }
  updatePointerCoords(coords: number[]) { this.pointerCoords = coords }
  updatePointerCount(nbr: number) { this.nbrOfPointers = nbr }

  updateScale(scale: number) {
    this.scale = scale
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
    }
  }

  reset() {
    const gl = this.gl
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs)
        gl.deleteShader(this.vs)
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs)
        gl.deleteShader(this.fs)
      }
      gl.deleteProgram(this.program)
    }
  }

  setup() {
    const gl = this.gl
    this.vs = gl.createShader(gl.VERTEX_SHADER)
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)
    if (!this.vs || !this.fs) return

    this.compile(this.vs, this.vertexSrc)
    this.compile(this.fs, this.shaderSource)
    this.program = gl.createProgram()
    if (!this.program) return

    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program))
    }
  }

  init() {
    const gl = this.gl
    const program = this.program
    if (!program) return

    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).resolution = gl.getUniformLocation(program, 'resolution')
    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).time = gl.getUniformLocation(program, 'time')
    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).move = gl.getUniformLocation(program, 'move')
    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).touch = gl.getUniformLocation(program, 'touch')
    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).pointerCount = gl.getUniformLocation(program, 'pointerCount')
    ;(program as WebGLProgram & Record<string, WebGLUniformLocation | null>).pointers = gl.getUniformLocation(program, 'pointers')
  }

  render(now = 0) {
    const gl = this.gl
    const program = this.program as (WebGLProgram & Record<string, WebGLUniformLocation | null>) | null
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)

    gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(program.time, now * 1e-3)
    gl.uniform2f(program.move, this.mouseMove[0], this.mouseMove[1])
    gl.uniform2f(program.touch, this.mouseCoords[0], this.mouseCoords[1])
    gl.uniform1i(program.pointerCount, this.nbrOfPointers)
    gl.uniform2fv(program.pointers, this.pointerCoords)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

class PointerHandler {
  private scale: number
  private active = false
  private pointers = new Map<number, number[]>()
  private lastCoords = [0, 0]
  private moves = [0, 0]

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale

    const map = (x: number, y: number) => [x * this.scale, element.height - y * this.scale]

    element.addEventListener('pointerdown', (event) => {
      this.active = true
      this.pointers.set(event.pointerId, map(event.clientX, event.clientY))
    })

    element.addEventListener('pointerup', (event) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(event.pointerId)
      this.active = this.pointers.size > 0
    })

    element.addEventListener('pointerleave', (event) => {
      if (this.count === 1) this.lastCoords = this.first
      this.pointers.delete(event.pointerId)
      this.active = this.pointers.size > 0
    })

    element.addEventListener('pointermove', (event) => {
      if (!this.active) return
      this.lastCoords = [event.clientX, event.clientY]
      this.pointers.set(event.pointerId, map(event.clientX, event.clientY))
      this.moves = [this.moves[0] + event.movementX, this.moves[1] + event.movementY]
    })
  }

  updateScale(scale: number) { this.scale = scale }
  get count() { return this.pointers.size }
  get move() { return this.moves }
  get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0] }
  get first() { return this.pointers.values().next().value || this.lastCoords }
}

function useShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const pointersRef = useRef<PointerHandler | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      rendererRef.current?.updateScale(dpr)
      pointersRef.current?.updateScale(dpr)
    }

    const loop = (now: number) => {
      if (!rendererRef.current || !pointersRef.current) return
      rendererRef.current.updateMouse(pointersRef.current.first)
      rendererRef.current.updatePointerCount(pointersRef.current.count)
      rendererRef.current.updatePointerCoords(pointersRef.current.coords)
      rendererRef.current.updateMove(pointersRef.current.move)
      rendererRef.current.render(now)
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    try {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
      rendererRef.current = new WebGLRenderer(canvas, dpr)
      pointersRef.current = new PointerHandler(canvas, dpr)
      rendererRef.current.setup()
      rendererRef.current.init()
      resize()
      loop(0)
    } catch (error) {
      console.error(error)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      rendererRef.current?.reset()
    }
  }, [])

  return canvasRef
}

function Hero({ trustBadge, headline, subtitle, buttons, className = '' }: HeroProps) {
  const canvasRef = useShaderBackground()

  return (
    <section className={`chrome-hero ${className}`}>
      <canvas ref={canvasRef} className="chrome-hero-canvas" aria-hidden="true" />
      <div className="chrome-hero-vignette" aria-hidden="true" />
      <div className="chrome-hero-content">
        {trustBadge && (
          <div className="chrome-trust-badge">
            {trustBadge.icons && <div className="chrome-trust-icons">{trustBadge.icons.map((icon, index) => <span key={index}>{icon}</span>)}</div>}
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

const chromeRedShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
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
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    vec3 chromeRed=vec3(0.58,0.03,0.065);
    vec3 pearlChrome=vec3(0.88,0.88,0.92);
    col+=.00135/d*(chromeRed + .35*pearlChrome);
    float b=noise(i+p+bg*1.731);
    col+=.0022*b/length(max(p,vec2(b*p.x*.02,p.y)))*(vec3(0.9,0.12,0.16));
    col=mix(col,vec3(bg*.30,bg*.035,bg*.055),d);
  }
  col += pow(max(0., 1. - length((FC-.5*R)/MN)), 4.) * vec3(.28,.02,.04);
  O=vec4(col,1);
}`

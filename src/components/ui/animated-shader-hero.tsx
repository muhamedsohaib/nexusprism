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

const shaderParts = {
  clouds: 1,
  cloudSpeed: 0.5,
  particles: 1,
  particleSpeed: 0.5,
  red: 1,
  green: 1,
  blue: 1,
  brightness: 1
}

function useUploadedShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false })
    if (!gl) return

    const vertexSource = `#version 300 es
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

    const vs = compile(gl.VERTEX_SHADER, vertexSource)
    const fs = compile(gl.FRAGMENT_SHADER, uploadedShaderSource)
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
    const clouds = gl.getUniformLocation(program, 'cloudsAmount')
    const cloudSpeed = gl.getUniformLocation(program, 'cloudSpeed')
    const particles = gl.getUniformLocation(program, 'particlesAmount')
    const particleSpeed = gl.getUniformLocation(program, 'particleSpeed')
    const tint = gl.getUniformLocation(program, 'componentTint')
    const brightness = gl.getUniformLocation(program, 'brightness')

    const resize = () => {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const render = (now: number) => {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform1f(time, now * 1e-3)
      gl.uniform1f(clouds, shaderParts.clouds)
      gl.uniform1f(cloudSpeed, shaderParts.cloudSpeed)
      gl.uniform1f(particles, shaderParts.particles)
      gl.uniform1f(particleSpeed, shaderParts.particleSpeed)
      gl.uniform3f(tint, shaderParts.red, shaderParts.green, shaderParts.blue)
      gl.uniform1f(brightness, shaderParts.brightness)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frameRef.current = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return canvasRef
}

function UploadedShaderHero({ trustBadge, headline, subtitle, buttons, className = '' }: HeroProps) {
  const canvasRef = useUploadedShader()

  return (
    <section className={`chrome-hero ${className}`}>
      <canvas ref={canvasRef} className="chrome-hero-canvas" aria-hidden="true" />
      <div className="chrome-prism-core" aria-hidden="true">
        <img src="/nexus-prism-logo.png" alt="" />
      </div>
      <div className="chrome-hero-content">
        <div className="chrome-copy-panel">
          {trustBadge && <div className="chrome-trust-badge"><span>{trustBadge.text}</span></div>}
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
    <UploadedShaderHero
      trustBadge={{ text: 'Get your score' }}
      headline={{ line1: 'The AI operating layer', line2: 'for UAE sellers.' }}
      subtitle="Nexus Prism reviews your Amazon.ae presence, identifies operational gaps, and turns the highest-impact fixes into focused execution sprints."
      buttons={{
        primary: { text: 'Check Your Actual Worth', href: '/score' },
        secondary: { text: 'WhatsApp the Founder', href: whatsappLink('Hi Nexus Prism, I want my free AI Commerce Score for my Amazon.ae store.') }
      }}
    />
  )
}

const uploadedShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform float cloudsAmount;
uniform float cloudSpeed;
uniform float particlesAmount;
uniform float particleSpeed;
uniform vec3 componentTint;
uniform float brightness;
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
  float bg=clouds(vec2(st.x+T*cloudSpeed,-st.y))*cloudsAmount;
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*particleSpeed+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125*particlesAmount/d*(cos(sin(i)*vec3(1,2,3))+1.)*componentTint;
    float b=noise(i+p+bg*1.731);
    col+=.002*particlesAmount*b/length(max(p,vec2(b*p.x*.02,p.y)))*componentTint;
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col*brightness,1);
}`

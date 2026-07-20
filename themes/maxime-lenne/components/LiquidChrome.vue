<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    interactive?: boolean
  }>(),
  {
    interactive: true,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | null = null

const VERTEX_SRC = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG_PRELUDE = `
precision highp float;
uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_mouseRaw;
uniform float u_click;
uniform vec2  u_clickPos;
uniform float u_pressed;
`

const HELPERS = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2  hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.55;
  for (int i = 0; i < 6; i++) { v += a * vnoise(p); p = p * 2.03 + 11.0; a *= 0.5; }
  return v;
}
// Aligned with theme: --ml-color-primary #2563eb, --ml-color-secondary #10b981
const vec3 BLUE  = vec3(0.145, 0.388, 0.922);
const vec3 GREEN = vec3(0.063, 0.725, 0.506);
`

const FRAG_CHROME = HELPERS + `
void main() {
  vec2 p  = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec2 m  = u_mouse;
  vec2 mC = vec2((m.x - 0.5) * (u_resolution.x / u_resolution.y), m.y - 0.5);

  vec2 mo = mC * (0.26 + u_pressed * 0.30);
  vec2 flow = mo + vec2(p.y * mC.x, -p.x * mC.y) * 0.16;

  vec2 cp = vec2((u_clickPos.x - 0.5) * (u_resolution.x / u_resolution.y), u_clickPos.y - 0.5);
  float dCp = length(p - cp);
  float ripple = sin(dCp * 28.0 - u_time * 7.0) * exp(-dCp * 4.0) * u_click * 0.22;

  vec2 q = p + flow + vec2(ripple);
  float t = u_time * 0.22;

  float n1 = fbm(q * 2.2 + vec2(t, -t));
  float n2 = fbm(q * 4.5 - vec2(t * 1.1, t * 0.6) + n1 * 1.2);
  float v  = fbm(q * 1.4 + n2 * 0.8 + t);

  float bands = 0.5 + 0.5 * sin(v * 9.0 + u_time * 0.5);
  bands = pow(bands, 3.0);

  vec3 base = mix(vec3(0.02, 0.06, 0.18), BLUE, smoothstep(0.0, 0.9, v));
  vec3 col  = mix(base, GREEN, bands * 0.55);

  float spec = pow(bands, 8.0);
  col = mix(col, vec3(0.85, 0.95, 1.00), spec * 0.45);

  col *= 0.55 + 0.55 * smoothstep(1.5, 0.2, length(p));

  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.018;
  gl_FragColor = vec4(col, 1.0);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function buildProgram(gl: WebGLRenderingContext, fragBody: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_PRELUDE + fragBody)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  if (!prog) return null
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
  if (!gl) {
    canvas.style.background = 'linear-gradient(135deg, #02061a, #3b82f6 60%, #22c55e)'
    return
  }

  const prog = buildProgram(gl, FRAG_CHROME)
  if (!prog) return

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )

  const aPos = gl.getAttribLocation(prog, 'a_pos')
  const uRes = gl.getUniformLocation(prog, 'u_resolution')
  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uMouse = gl.getUniformLocation(prog, 'u_mouse')
  const uMouseRaw = gl.getUniformLocation(prog, 'u_mouseRaw')
  const uClick = gl.getUniformLocation(prog, 'u_click')
  const uClickPos = gl.getUniformLocation(prog, 'u_clickPos')
  const uPressed = gl.getUniformLocation(prog, 'u_pressed')

  const state = {
    mouseRaw: [0.5, 0.5] as [number, number],
    smoothMouse: [0.5, 0.5] as [number, number],
    click: 0,
    clickPos: [0.5, 0.5] as [number, number],
    pressed: 0,
    start: performance.now(),
  }

  let raf = 0
  let alive = true

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const pw = Math.max(1, Math.floor(w * dpr))
    const ph = Math.max(1, Math.floor(h * dpr))
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw
      canvas.height = ph
    }
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const pointFromEvent = (e: { clientX: number; clientY: number }): [number, number] => {
    const r = canvas.getBoundingClientRect()
    return [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height]
  }
  const onMove = (e: MouseEvent) => { state.mouseRaw = pointFromEvent(e) }
  const onLeave = () => { state.mouseRaw = [0.5, 0.5] }
  const onDown = (e: MouseEvent) => {
    const p = pointFromEvent(e)
    state.click = 1
    state.clickPos = p
    state.pressed = 1
  }
  const onUp = () => { state.pressed = 0 }
  const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) state.mouseRaw = pointFromEvent(e.touches[0]) }
  const onTouchStart = (e: TouchEvent) => {
    if (!e.touches[0]) return
    const p = pointFromEvent(e.touches[0])
    state.click = 1
    state.clickPos = p
    state.pressed = 1
  }

  if (props.interactive) {
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchend', onUp)
  }

  const frame = () => {
    if (!alive) return
    const k = 0.08
    state.smoothMouse[0] += (state.mouseRaw[0] - state.smoothMouse[0]) * k
    state.smoothMouse[1] += (state.mouseRaw[1] - state.smoothMouse[1]) * k
    state.click *= 0.94
    if (state.click < 0.001) state.click = 0

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, (performance.now() - state.start) / 1000)
    gl.uniform2f(uMouse, state.smoothMouse[0], state.smoothMouse[1])
    gl.uniform2f(uMouseRaw, state.mouseRaw[0], state.mouseRaw[1])
    gl.uniform1f(uClick, state.click)
    gl.uniform2f(uClickPos, state.clickPos[0], state.clickPos[1])
    gl.uniform1f(uPressed, state.pressed)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
    raf = requestAnimationFrame(frame)
  }
  frame()

  cleanup = () => {
    alive = false
    cancelAnimationFrame(raf)
    ro.disconnect()
    if (props.interactive) {
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend', onUp)
    }
    gl.deleteBuffer(buf)
    gl.deleteProgram(prog)
  }
})

onBeforeUnmount(() => { cleanup?.() })
</script>

<template>
  <canvas ref="canvasRef" class="liquid-chrome-canvas" />
</template>

<style scoped>
.liquid-chrome-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>

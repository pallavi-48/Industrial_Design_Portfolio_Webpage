import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";

import "./WarpText.css";

export type WarpTextSegment = {
  text: string;
  color: string;
};

type WarpTextProps = {
  text: string;
  segments: WarpTextSegment[];
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: number;
  warpStrength?: number;
  warpScale?: number;
  speed?: number;
  pointerInfluence?: number;
  pointerStrength?: number;
  refraction?: number;
  ripple?: boolean;
  className?: string;
};

const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform sampler2D uTextTexture;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uTime;
uniform float uWarpStrength;
uniform float uWarpScale;
uniform float uSpeed;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uRefraction;
uniform float uRipple;
uniform float uMotion;
in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

vec4 sampleText(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture(uTextTexture, uv);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float time = uTime * uSpeed;
  float scale = max(uWarpScale, 0.001);
  vec2 drift = vec2(time * 0.055, -time * 0.045);
  float n1 = fbm(uv * scale * 3.1 + drift);
  float n2 = fbm((uv + 19.17) * scale * 3.4 - drift.yx);
  vec2 ambient = (vec2(n1, n2) - 0.5) * uWarpStrength * 0.045 * uMotion;
  vec2 pointerDelta = uv - uPointer;
  vec2 aspectDelta = vec2(pointerDelta.x * aspect, pointerDelta.y);
  float dist = length(aspectDelta);
  float radius = max(uPointerInfluence, 0.001);
  float t = clamp(dist / radius, 0.0, 1.0);
  float lens = (1.0 - smoothstep(0.0, radius, dist)) * uPointerActive;
  float bulge = t * (1.0 - t) * (1.0 - t) * 6.75 * uPointerActive;
  vec2 dir = dist > 0.0001 ? vec2(aspectDelta.x / aspect, aspectDelta.y) / dist : vec2(0.0);
  float rippleWave = sin(dist * 28.0 - time * 4.2) * 0.5 + 0.5;
  float rippleRing = (rippleWave - 0.5) * uRipple;
  vec2 pointerWarp = -dir * bulge * uPointerStrength * 0.045;
  pointerWarp += dir * rippleRing * bulge * uPointerStrength * 0.016;
  vec2 displaced = uv + ambient + pointerWarp;
  vec2 splitDir = ambient + pointerWarp;
  float splitLen = length(splitDir);
  splitDir = splitLen > 0.00001 ? splitDir / splitLen : vec2(0.7071, 0.7071);
  vec2 split = splitDir * uRefraction * 0.16 * (0.35 + lens * 1.65);
  vec4 base = sampleText(displaced);
  float r = sampleText(displaced + split).r;
  float b = sampleText(displaced - split).b;
  float alpha = max(max(sampleText(displaced + split).a, base.a), sampleText(displaced - split).a);
  fragColor = vec4(vec3(r, base.g, b) + lens * base.a * 0.055, alpha);
}
`;

function resolveColor(container: HTMLDivElement, color: string) {
  const probe = document.createElement("span");
  probe.style.color = color;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  container.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

function fontMetrics(container: HTMLDivElement, fontSize: string, fontWeight: number, fontFamily: string, letterSpacing: string, lineHeight: number) {
  const probe = document.createElement("span");
  Object.assign(probe.style, {
    position: "absolute",
    visibility: "hidden",
    whiteSpace: "pre",
    fontFamily,
    fontSize,
    fontWeight: String(fontWeight),
    letterSpacing,
    lineHeight: String(lineHeight),
  });
  container.appendChild(probe);
  const style = getComputedStyle(probe);
  const size = Number.parseFloat(style.fontSize) || 24;
  const spacing = style.letterSpacing === "normal" ? 0 : Number.parseFloat(style.letterSpacing) || 0;
  const line = Number.parseFloat(style.lineHeight) || size * lineHeight;
  const family = style.fontFamily || "sans-serif";
  probe.remove();
  return { size, spacing, line, family };
}

export default function WarpText({
  text,
  segments,
  fontFamily = "Poppins, sans-serif",
  fontWeight = 400,
  fontSize = "var(--warp-font-size)",
  letterSpacing = "0em",
  lineHeight = 1.4,
  warpStrength = 0.08,
  warpScale = 1.7,
  speed = 0.55,
  pointerInfluence = 0.42,
  pointerStrength = 0.38,
  refraction = 0.018,
  ripple = true,
  className = "",
}: WarpTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef({ segments, warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction, ripple });
  settingsRef.current = { segments, warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction, ripple };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: false, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    } catch {
      return;
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    container.appendChild(canvas);

    const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE });
    const geometry = new Triangle(gl);
    const settings = settingsRef.current;
    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTextTexture: { value: texture },
        uResolution: { value: new Float32Array([1, 1]) },
        uPointer: { value: new Float32Array([0.5, 0.5]) },
        uPointerActive: { value: 0 },
        uTime: { value: 0 },
        uWarpStrength: { value: settings.warpStrength },
        uWarpScale: { value: settings.warpScale },
        uSpeed: { value: settings.speed },
        uPointerInfluence: { value: settings.pointerInfluence },
        uPointerStrength: { value: settings.pointerStrength },
        uRefraction: { value: settings.refraction },
        uRipple: { value: settings.ripple ? 1 : 0 },
        uMotion: { value: 1 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: 0 };
    const resolvedSegments = segments.map(segment => ({ ...segment, color: resolveColor(container, segment.color) }));
    let frameId = 0;
    let lastFrame = 0;
    const startTime = performance.now();
    let visible = false;
    let disposed = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const metrics = fontMetrics(container, fontSize, fontWeight, fontFamily, letterSpacing, lineHeight);

    const rasterize = () => {
      if (disposed) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const raster = document.createElement("canvas");
      raster.width = Math.max(1, Math.floor(rect.width * dpr));
      raster.height = Math.max(1, Math.floor(rect.height * dpr));
      const context = raster.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `${fontWeight} ${metrics.size}px ${metrics.family}`;
      context.textBaseline = "middle";
      const lines: { runs: { text: string; color: string }[]; width: number }[] = [{ runs: [], width: 0 }];
      const measure = (value: string) => Array.from(value).reduce((sum, char) => sum + context.measureText(char).width + metrics.spacing, 0) - metrics.spacing;

      for (const segment of resolvedSegments) {
        const tokens = segment.text.match(/\S+\s*|\s+/g) ?? [];
        for (const token of tokens) {
          if (token.includes("\n")) {
            const parts = token.split("\n");
            parts.forEach((part, index) => {
              if (part) addText(part, segment.color);
              if (index < parts.length - 1) lines.push({ runs: [], width: 0 });
            });
          } else {
            addText(token, segment.color);
          }
        }
      }

      function addText(value: string, color: string) {
        const line = lines[lines.length - 1];
        const tokenWidth = measure(value);
        if (line.width > 0 && line.width + tokenWidth > rect.width * 0.94 && value.trim()) {
          lines.push({ runs: [], width: 0 });
        }
        const target = lines[lines.length - 1];
        if (!target.runs.length && /^\s+$/.test(value)) return;
        const previous = target.runs[target.runs.length - 1];
        if (previous?.color === color) previous.text += value;
        else target.runs.push({ text: value, color });
        target.width += tokenWidth;
      }

      const lineHeightPx = metrics.line;
      const firstBaseline = rect.height / 2 - ((lines.length - 1) * lineHeightPx) / 2;
      lines.forEach((line, lineIndex) => {
        let x = (rect.width - line.width) / 2;
        const y = firstBaseline + lineIndex * lineHeightPx;
        for (const run of line.runs) {
          context.fillStyle = run.color;
          for (const char of Array.from(run.text)) {
            context.fillText(char, x, y);
            x += context.measureText(char).width + metrics.spacing;
          }
        }
      });
      texture.image = raster;
      texture.needsUpdate = true;
      program.uniforms.uResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.uResolution.value[1] = gl.drawingBufferHeight;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      renderer.setSize(rect.width, rect.height);
      rasterize();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = (event.clientX - rect.left) / rect.width;
      pointer.targetY = 1 - (event.clientY - rect.top) / rect.height;
      pointer.active = 1;
    };
    const onPointerLeave = () => { pointer.active = 0; };
    const render = (time: number) => {
      if (disposed || document.hidden || !visible) {
        frameId = 0;
        return;
      }
      if (time - lastFrame >= 1000 / 30) {
        pointer.x += (pointer.targetX - pointer.x) * 0.16;
        pointer.y += (pointer.targetY - pointer.y) * 0.16;
        program.uniforms.uPointer.value[0] = pointer.x;
        program.uniforms.uPointer.value[1] = pointer.y;
        program.uniforms.uPointerActive.value = reducedMotion.matches ? pointer.active * 0.35 : pointer.active;
        program.uniforms.uTime.value = reducedMotion.matches ? 0 : (time - startTime) * 0.001;
        renderer.render({ scene: mesh });
        lastFrame = time;
      }
      frameId = requestAnimationFrame(render);
    };
    const start = () => {
      if (visible && !document.hidden && !frameId) frameId = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(container);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", start);
    resize();

    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", start);
      if (container.contains(canvas)) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [text, segments, fontFamily, fontWeight, fontSize, letterSpacing, lineHeight, warpStrength, warpScale, speed, pointerInfluence, pointerStrength, refraction, ripple]);

  return <div ref={containerRef} className={`warp-text ${className}`.trim()} role="img" aria-label={text} />;
}
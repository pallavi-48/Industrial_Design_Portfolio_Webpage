import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

import "./WebThreads.css";

type FanMode = "center" | "left" | "right";

type WebThreadsProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  threadCount?: number;
  frequency?: number;
  spread?: number;
  taper?: number;
  position?: number;
  fanMode?: FanMode;
  glow?: number;
  falloff?: number;
  thickness?: number;
  brightness?: number;
  opacity?: number;
  mirror?: boolean;
  shimmer?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  className?: string;
};

type ThreadContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

const FAN_MODE: Record<FanMode, number> = { center: 0, left: 1, right: 2 };
const contextByContainer = new WeakMap<HTMLDivElement, ThreadContext>();

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [Number.parseInt(result[1], 16) / 255, Number.parseInt(result[2], 16) / 255, Number.parseInt(result[3], 16) / 255];
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);
  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;
  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;
    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;
    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;
    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);
    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);
  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-dot(md, md) * 6.0) * 0.6;
  }
  col *= bright;
  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;
  vec3 outRgb = col * alpha;
  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }
  fragColor = vec4(outRgb, alpha);
}
`;

export default function WebThreads({
  color1 = "#426B30",
  color2 = "#91DA73",
  color3 = "#F1F4F0",
  speed = 0.2,
  threadCount = 6,
  frequency = 5,
  spread = 0.18,
  taper = 1,
  position = 0.5,
  fanMode = "center",
  glow = 0.02,
  falloff = 0.6,
  thickness = 1.1,
  brightness = 0.6,
  opacity = 1,
  mirror = true,
  shimmer = false,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = false,
  mouseStrength = 0.3,
  className = "",
}: WebThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef({
    color1, color2, color3, speed, threadCount, frequency, spread, taper, position,
    fanMode, glow, falloff, thickness, brightness, opacity, mirror, shimmer, grain,
    grainIntensity, mouseInteraction, mouseStrength,
  });
  settingsRef.current = {
    color1, color2, color3, speed, threadCount, frequency, spread, taper, position,
    fanMode, glow, falloff, thickness, brightness, opacity, mirror, shimmer, grain,
    grainIntensity, mouseInteraction, mouseStrength,
  };
  const mouseRef = useRef({ enabled: mouseInteraction, strength: mouseStrength });
  mouseRef.current = { enabled: mouseInteraction, strength: mouseStrength };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const settings = settingsRef.current;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: settings.speed },
        uThreadCount: { value: settings.threadCount },
        uFrequency: { value: settings.frequency },
        uSpread: { value: settings.spread },
        uTaper: { value: settings.taper },
        uPosition: { value: settings.position },
        uFanMode: { value: FAN_MODE[settings.fanMode] },
        uGlow: { value: settings.glow },
        uFalloff: { value: settings.falloff },
        uThickness: { value: settings.thickness },
        uBrightness: { value: settings.brightness },
        uOpacity: { value: settings.opacity },
        uMirror: { value: settings.mirror ? 1 : 0 },
        uShimmer: { value: settings.shimmer ? 1 : 0 },
        uGrain: { value: settings.grain ? 1 : 0 },
        uGrainIntensity: { value: settings.grainIntensity },
        uColor1: { value: new Float32Array(hexToRgb(settings.color1)) },
        uColor2: { value: new Float32Array(hexToRgb(settings.color2)) },
        uColor3: { value: new Float32Array(hexToRgb(settings.color3)) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseStrength: { value: settings.mouseStrength },
        uEnableMouse: { value: settings.mouseInteraction ? 1 : 0 },
        uMouseActive: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const context = { renderer, program, mesh };
    contextByContainer.set(container, context);

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    let currentActive = 0;
    let targetActive = 0;
    const onMouseMove = (event: PointerEvent) => {
      if (!mouseRef.current.enabled) return;
      const rect = container.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        targetActive = 0;
        return;
      }
      targetMouse[0] = (event.clientX - rect.left) / rect.width;
      targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
      targetActive = 1;
    };
    const onPointerLeave = () => { targetActive = 0; };
    window.addEventListener("pointermove", onMouseMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    let animationFrame = 0;
    let lastFrame = 0;
    let isVisible = false;
    const isPageVisible = () => !document.hidden;
    const renderLoop = (time: number) => {
      if (!isVisible || !isPageVisible()) {
        animationFrame = 0;
        return;
      }
      if (time - lastFrame >= 1000 / 30) {
        program.uniforms.iTime.value = time * 0.001;
        currentMouse[0] += 0.12 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.12 * (targetMouse[1] - currentMouse[1]);
        currentActive += 0.12 * (targetActive - currentActive);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
        program.uniforms.uMouseActive.value = currentActive;
        renderer.render({ scene: mesh });
        lastFrame = time;
      }
      animationFrame = requestAnimationFrame(renderLoop);
    };
    const start = () => {
      if (isVisible && isPageVisible() && animationFrame === 0) {
        animationFrame = requestAnimationFrame(renderLoop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(container);
    const onVisibilityChange = () => document.hidden ? stop() : start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      contextByContainer.delete(container);
      if (container.contains(canvas)) container.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const context = container ? contextByContainer.get(container) : undefined;
    if (!context) return;
    const uniforms = context.program.uniforms;
    uniforms.uSpeed.value = speed;
    uniforms.uThreadCount.value = Math.min(10, Math.max(1, Math.round(threadCount)));
    uniforms.uFrequency.value = frequency;
    uniforms.uSpread.value = spread;
    uniforms.uTaper.value = taper;
    uniforms.uPosition.value = position;
    uniforms.uFanMode.value = FAN_MODE[fanMode];
    uniforms.uGlow.value = glow;
    uniforms.uFalloff.value = falloff;
    uniforms.uThickness.value = thickness;
    uniforms.uBrightness.value = brightness;
    uniforms.uOpacity.value = opacity;
    uniforms.uMirror.value = mirror ? 1 : 0;
    uniforms.uShimmer.value = shimmer ? 1 : 0;
    uniforms.uGrain.value = grain ? 1 : 0;
    uniforms.uGrainIntensity.value = grainIntensity;
    uniforms.uColor1.value.set(...hexToRgb(color1));
    uniforms.uColor2.value.set(...hexToRgb(color2));
    uniforms.uColor3.value.set(...hexToRgb(color3));
    uniforms.uMouseStrength.value = mouseStrength;
    uniforms.uEnableMouse.value = mouseInteraction ? 1 : 0;
    context.renderer.render({ scene: context.mesh });
  }, [brightness, color1, color2, color3, fanMode, falloff, frequency, glow, grain, grainIntensity, mirror, mouseInteraction, mouseStrength, opacity, position, speed, spread, shimmer, threadCount, taper, thickness]);

  return <div ref={containerRef} className={`web-threads-container ${className}`.trim()} aria-hidden="true" />;
}
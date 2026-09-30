import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

import "./Aurora.css";

type AuroraProps = {
  colorStops?: [string, string, string];
  speed?: number;
  blend?: number;
  amplitude?: number;
  className?: string;
};

const vertexShader = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = x0.x > x0.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  int index = uv.x < 0.5 ? 0 : 1;
  ColorStop currentColor = colors[index];
  ColorStop nextColor = colors[index + 1];
  float factor = (uv.x - currentColor.position) / (nextColor.position - currentColor.position);
  vec3 rampColor = mix(currentColor.color, nextColor.color, factor);
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = uv.y * 2.0 - height + 0.2;
  float intensity = 0.6 * height;
  float midpoint = 0.20;
  float alpha = smoothstep(midpoint - uBlend * 0.5, midpoint + uBlend * 0.5, intensity);
  fragColor = vec4(intensity * rampColor * alpha, alpha);
}
`;

function toRgb(hex: string) {
  const color = new Color(hex);
  return [color.r, color.g, color.b];
}

export default function Aurora({
  colorStops = ["#315D2A", "#91DA73", "#426B30"],
  speed = 0.35,
  blend = 0.3,
  amplitude = 0.65,
  className = "",
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ colorStops, speed, blend, amplitude });
  propsRef.current = { colorStops, speed, blend, amplitude };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.25) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const initial = propsRef.current;
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: initial.amplitude },
        uColorStops: { value: initial.colorStops.map(toRgb) },
        uResolution: { value: new Float32Array([1, 1]) },
        uBlend: { value: initial.blend },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionPreference.matches;
    let visible = false;
    let animationFrame = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;
    let currentStops = initial.colorStops.join(":");

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.uResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    resize();

    const draw = (time: number) => {
      if (!visible || document.hidden) {
        animationFrame = 0;
        return;
      }
      if (time - lastFrame >= frameInterval) {
        const settings = propsRef.current;
        program.uniforms.uTime.value = reduceMotion ? 0 : time * 0.001 * settings.speed;
        program.uniforms.uAmplitude.value = settings.amplitude;
        program.uniforms.uBlend.value = settings.blend;
        const stopKey = settings.colorStops.join(":");
        if (stopKey !== currentStops) {
          program.uniforms.uColorStops.value = settings.colorStops.map(toRgb);
          currentStops = stopKey;
        }
        renderer.render({ scene: mesh });
        lastFrame = time;
      }
      if (!reduceMotion) animationFrame = requestAnimationFrame(draw);
    };
    const start = () => {
      if (visible && !document.hidden && !reduceMotion && !animationFrame) animationFrame = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(container);
    const onVisibilityChange = () => document.hidden ? stop() : start();
    const onMotionChange = () => {
      reduceMotion = motionPreference.matches;
      if (reduceMotion) {
        stop();
        program.uniforms.uTime.value = 0;
        renderer.render({ scene: mesh });
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onMotionChange);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className={`aurora-container ${className}`.trim()} aria-hidden="true" />;
}
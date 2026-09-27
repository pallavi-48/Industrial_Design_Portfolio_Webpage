import { useEffect, useMemo, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

import "./Particles.css";

type ParticlesProps = {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  pixelRatio?: number;
};

const DEFAULT_COLORS = ["#91DA73", "#6FAF63", "#B8E8A0"];

const vertexShader = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  uniform float uAspect;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.x *= uAspect;
    pos.z *= 0.15;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    modelPosition.x += sin(uTime * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    modelPosition.y += sin(uTime * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    modelPosition.z += sin(uTime * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / max(1.0, length(viewPosition.xyz));
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float distanceFromCenter = length(uv - vec2(0.5));
    vec3 animatedColor = vColor + 0.12 * sin(uv.yxx + uTime + vRandom.y * 6.28);

    if (uAlphaParticles < 0.5) {
      if (distanceFromCenter > 0.5) discard;
      gl_FragColor = vec4(animatedColor, 1.0);
    } else {
      float alpha = (1.0 - smoothstep(0.4, 0.5, distanceFromCenter)) * 0.8;
      gl_FragColor = vec4(animatedColor, alpha);
    }
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace(/^#/, "");
  const expanded = normalized.length === 3
    ? normalized.split("").map((character) => character + character).join("")
    : normalized;
  const value = Number.parseInt(expanded.slice(0, 6), 16);

  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = DEFAULT_COLORS,
  moveParticlesOnHover = false,
  particleHoverFactor = 0.35,
  alphaParticles = true,
  particleBaseSize = 70,
  sizeRandomness = 0.8,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const palette = useMemo(() => particleColors.map(hexToRgb), [particleColors]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || palette.length === 0) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2) * pixelRatio,
      depth: false,
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.className = "particles-canvas";
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const positions = new Float32Array(particleCount * 3);
    const randomValues = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      let x = 0;
      let y = 0;
      let z = 0;
      let lengthSquared = 0;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        lengthSquared = x * x + y * y + z * z;
      } while (lengthSquared > 1 || lengthSquared === 0);

      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], index * 3);
      randomValues.set(Array.from({ length: 4 }, () => Math.random()), index * 4);
      colors.set(palette[Math.floor(Math.random() * palette.length)], index * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randomValues },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
        uAspect: { value: 1 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let lastTime = performance.now();
    let reduceMotion = reducedMotionQuery.matches;
    let mousePosition = { x: 0, y: 0 };

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      const aspect = gl.canvas.width / Math.max(gl.canvas.height, 1);
      camera.perspective({ aspect });
      program.uniforms.uAspect.value = aspect;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    const handleMotionChange = () => {
      reduceMotion = reducedMotionQuery.matches;
    };

    const render = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!reduceMotion) elapsed += delta * speed;

      const timeValue = reduceMotion ? 0 : elapsed * 0.001;
      program.uniforms.uTime.value = timeValue;

      if (moveParticlesOnHover && !reduceMotion) {
        particles.position.x = -mousePosition.x * particleHoverFactor;
        particles.position.y = -mousePosition.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = reduceMotion ? 0 : Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = reduceMotion ? 0 : Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z = reduceMotion ? 0 : elapsed * 0.00001;
      }

      renderer.render({ scene: particles, camera });
      animationFrameRef.current = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    if (moveParticlesOnHover) window.addEventListener("pointermove", handlePointerMove, { passive: true });
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    resize();
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [alphaParticles, cameraDistance, disableRotation, moveParticlesOnHover, palette, particleBaseSize, particleCount, particleHoverFactor, particleSpread, pixelRatio, sizeRandomness, speed]);

  return <div ref={containerRef} className="particles-background" aria-hidden="true" />;
}

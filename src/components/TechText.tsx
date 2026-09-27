import { useEffect, useRef, type CSSProperties } from "react";

import "./TechText.css";

type TechTextProps = {
  text?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  accentColor?: string;
  reveal?: "area" | "letter" | "off";
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  lineStyle?: "dashed" | "solid";
  strokeWidth?: number;
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  sweep?: boolean;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

type Glyph = {
  char: string;
  x: number;
  baseline: number;
  box: { left: number; top: number; right: number; bottom: number };
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const signed = (value: number) => value > 0 ? `+${value}` : `${value}`;

export default function TechText({
  text = "React Bits",
  fontFamily = "",
  fontWeight = 600,
  fontSize = 150,
  letterSpacing = -0.05,
  color = "#ffffff",
  accentColor = "#91DA73",
  reveal = "letter",
  reach = 200,
  softness = 0.7,
  dashLength = 4,
  dashGap = 2,
  lineStyle = "dashed",
  strokeWidth = 1.5,
  specks = 15,
  selection = true,
  labels = true,
  draggable = true,
  sweep = true,
  speed = 1,
  className = "",
  style,
}: TechTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef({
    text, fontFamily, fontWeight, fontSize, letterSpacing, color, accentColor, reveal,
    reach, softness, dashLength, dashGap, lineStyle, strokeWidth, specks, selection,
    labels, draggable, sweep, speed,
  });

  settingsRef.current = {
    text, fontFamily, fontWeight, fontSize, letterSpacing, color, accentColor, reveal,
    reach, softness, dashLength, dashGap, lineStyle, strokeWidth, specks, selection,
    labels, draggable, sweep, speed,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let dragging = -1;
    let renderSize = fontSize;
    let glyphs: Glyph[] = [];
    let currentFont = "";
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, inside: false };
    const grab = { x: 0, y: 0 };
    const frame = { left: 0, top: 0, right: 0, bottom: 0, alpha: 0, index: -1 };

    const setFont = (ctx: CanvasRenderingContext2D, size: number) => {
      const settings = settingsRef.current;
      ctx.font = `${settings.fontWeight} ${size}px ${settings.fontFamily || getComputedStyle(container).fontFamily || "sans-serif"}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    };

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      glyphs = [];
    };

    const layoutGlyphs = () => {
      const settings = settingsRef.current;
      const fontKey = `${settings.text}|${settings.fontFamily}|${settings.fontWeight}|${settings.fontSize}|${settings.letterSpacing}|${width}|${height}`;
      if (currentFont === fontKey && glyphs.length) return;
      currentFont = fontKey;
      const probe = document.createElement("canvas").getContext("2d");
      if (!probe) return;
      setFont(probe, settings.fontSize);
      const initial = probe.measureText(settings.text);
      const initialHeight = initial.actualBoundingBoxAscent + initial.actualBoundingBoxDescent;
      const fit = Math.min(1, width * 0.9 / Math.max(initial.width, 1), height * 0.68 / Math.max(initialHeight, 1));
      const size = settings.fontSize * fit;
      renderSize = size;
      setFont(probe, size);
      const characters = Array.from(settings.text);
      const letterGap = settings.letterSpacing * size;
      const widths = characters.map((character) => probe.measureText(character).width);
      const textWidth = widths.reduce((sum, value) => sum + value, 0) + Math.max(0, characters.length - 1) * letterGap;
      const sample = probe.measureText("Mg");
      const ascent = sample.actualBoundingBoxAscent || size * 0.75;
      const descent = sample.actualBoundingBoxDescent || size * 0.2;
      const startX = (width - textWidth) / 2;
      const baseline = (height - ascent - descent) / 2 + ascent;
      let x = startX;
      const previous = glyphs;
      glyphs = [];

      characters.forEach((character, index) => {
        const metrics = probe.measureText(character);
        if (!character.trim()) {
          x += widths[index] + letterGap;
          return;
        }
        const left = x - (metrics.actualBoundingBoxLeft || 0);
        const top = baseline - (metrics.actualBoundingBoxAscent || ascent);
        const right = x + (metrics.actualBoundingBoxRight || widths[index]);
        const bottom = baseline + (metrics.actualBoundingBoxDescent || descent);
        const old = previous.find((glyph) => glyph.char === character && Math.abs(glyph.x - x) < 2);
        glyphs.push({
          char: character,
          x,
          baseline,
          box: { left, top, right, bottom },
          offsetX: old?.offsetX ?? 0,
          offsetY: old?.offsetY ?? 0,
          velocityX: 0,
          velocityY: 0,
        });
        x += widths[index] + letterGap;
      });
      frame.index = -1;
    };

    const glyphAt = (x: number, y: number) => {
      let index = -1;
      let nearest = Infinity;
      glyphs.forEach((glyph, glyphIndex) => {
        const left = glyph.box.left + glyph.offsetX;
        const right = glyph.box.right + glyph.offsetX;
        const top = glyph.box.top + glyph.offsetY - 18;
        const bottom = glyph.box.bottom + glyph.offsetY + 18;
        if (y < top || y > bottom) return;
        const distance = x < left ? left - x : x > right ? x - right : 0;
        if (distance < nearest) {
          nearest = distance;
          index = glyphIndex;
        }
      });
      return nearest < 30 ? index : -1;
    };

    const draw = (time: number) => {
      const settings = settingsRef.current;
      const delta = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastTime = time;
      if (!reducedMotion) elapsed += delta * settings.speed;
      layoutGlyphs();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.font = `${settings.fontWeight} ${renderSize}px ${settings.fontFamily || getComputedStyle(container).fontFamily || "sans-serif"}`;
      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.lineJoin = "round";

      let focus = pointer.inside ? glyphAt(pointer.x, pointer.y) : -1;
      if (focus < 0 && settings.sweep && !reducedMotion && glyphs.length) {
        const progress = (Math.sin(elapsed * 0.45) + 1) / 2;
        focus = Math.min(glyphs.length - 1, Math.floor(progress * glyphs.length));
      }

      glyphs.forEach((glyph, index) => {
        const dragged = index === dragging;
        if (dragged) {
          glyph.offsetX += (pointer.x - grab.x - glyph.offsetX) * Math.min(1, delta * 18);
          glyph.offsetY += (pointer.y - grab.y - glyph.offsetY) * Math.min(1, delta * 18);
        } else {
          glyph.velocityX += (-320 * glyph.offsetX - 22 * glyph.velocityX) * delta;
          glyph.velocityY += (-320 * glyph.offsetY - 22 * glyph.velocityY) * delta;
          glyph.offsetX += glyph.velocityX * delta;
          glyph.offsetY += glyph.velocityY * delta;
          if (Math.abs(glyph.offsetX) < 0.15 && Math.abs(glyph.offsetY) < 0.15) {
            glyph.offsetX = 0;
            glyph.offsetY = 0;
            glyph.velocityX = 0;
            glyph.velocityY = 0;
          }
        }

        const x = glyph.x + glyph.offsetX;
        const y = glyph.baseline + glyph.offsetY;
        const distance = pointer.inside ? Math.hypot(pointer.x - (glyph.box.left + glyph.box.right) / 2, pointer.y - (glyph.box.top + glyph.box.bottom) / 2) : Infinity;
        let outline = settings.reveal === "off" ? 0 : settings.reveal === "letter" ? (index === focus ? 1 : 0) : clamp(1 - distance / Math.max(settings.reach, 1), 0, 1);
        outline = outline * outline * (3 - 2 * outline);

        context.globalAlpha = 1 - outline;
        context.fillStyle = settings.color;
        context.fillText(glyph.char, x, y);
        if (outline > 0.001) {
          context.globalAlpha = outline;
          context.strokeStyle = settings.color;
          context.lineWidth = settings.strokeWidth * 2;
          context.setLineDash(settings.lineStyle === "dashed" ? [settings.dashLength, settings.dashGap] : []);
          context.strokeText(glyph.char, x, y);
          context.setLineDash([]);
        }
        context.globalAlpha = 1;
      });

      if (focus >= 0 && settings.selection) {
        const glyph = glyphs[focus];
        const box = glyph.box;
        const left = box.left + glyph.offsetX - 5;
        const top = box.top + glyph.offsetY - 5;
        const right = box.right + glyph.offsetX + 5;
        const bottom = box.bottom + glyph.offsetY + 5;
        context.strokeStyle = settings.accentColor;
        context.lineWidth = 1;
        context.strokeRect(left, top, right - left, bottom - top);
        context.fillStyle = settings.accentColor;
        for (const [x, y] of [[left, top], [right, top], [right, bottom], [left, bottom]]) context.fillRect(x - 2, y - 2, 4, 4);
        if (settings.labels) {
          context.font = "10px ui-monospace, monospace";
          context.fillText(`${glyph.char}  ${Math.round(box.right - box.left)} × ${Math.round(box.bottom - box.top)}`, left, top - 8);
        }
        if (settings.specks > 0) {
          context.globalAlpha = 0.45;
          for (let index = 0; index < settings.specks; index += 1) {
            const phase = elapsed * 2 + index * 17;
            const x = left + Math.sin(phase) * (right - left) * 0.65 + (right - left) / 2;
            const y = top + Math.cos(phase * 1.3) * (bottom - top) * 0.7 + (bottom - top) / 2;
            context.fillRect(x, y, 2, 2);
          }
          context.globalAlpha = 1;
        }
      }
      context.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerMove = (event: PointerEvent) => {
      locate(event);
      pointer.inside = true;
    };
    const onPointerLeave = () => { pointer.inside = false; };
    const onPointerDown = (event: PointerEvent) => {
      if (!draggable || (event.pointerType === "mouse" && event.button !== 0)) return;
      locate(event);
      const index = glyphAt(pointer.x, pointer.y);
      if (index < 0) return;
      dragging = index;
      grab.x = pointer.x - glyphs[index].offsetX;
      grab.y = pointer.y - glyphs[index].offsetY;
      container.setPointerCapture(event.pointerId);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (dragging >= 0) {
        dragging = -1;
        if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      }
    };
    const onMotionChange = () => { reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", onMotionChange);
    resize();
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [draggable, text]);

  return <div ref={containerRef} className={`tech-text ${className}`.trim()} style={style} role="img" aria-label={text}><canvas ref={canvasRef} className="tech-text-canvas" /></div>;
}

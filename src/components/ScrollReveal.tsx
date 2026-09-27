import { cloneElement, Children, isValidElement, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

function splitText(children: ReactNode, keyPrefix: string): ReactNode {
  return Children.map(children, (child, childIndex) => {
    const key = `${keyPrefix}-${childIndex}`;
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part, partIndex) => (
        /^\s+$/.test(part)
          ? part
          : <span className="scroll-reveal__word" key={`${key}-${partIndex}`}>{part}</span>
      ));
    }
    if (typeof child === "number") {
      return <span className="scroll-reveal__word" key={key}>{child}</span>;
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child, {}, splitText(child.props.children, key));
    }
    return child;
  });
}

export default function ScrollReveal({
  children,
  className = "",
  containerClassName = "",
  textClassName = "",
  scrollContainerRef,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitChildren = useMemo(() => splitText(children, "scroll-word"), [children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const scroller = scrollContainerRef?.current ?? window;
    const context = gsap.context(() => {
      const words = element.querySelectorAll<HTMLElement>(".scroll-reveal__word");
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(element, { opacity: 1, rotation: 0, clearProps: "transform" });
        gsap.set(words, { opacity: 1, filter: "blur(0px)", clearProps: "willChange" });
        return;
      }

      gsap.fromTo(
        element,
        { transformOrigin: "0% 50%", rotation: baseRotation },
        { rotation: 0, ease: "none", scrollTrigger: { trigger: element, scroller, start: "top bottom", end: rotationEnd, scrub: true } },
      );

      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: "opacity", ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}) },
        {
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: element, scroller, start: "top bottom-=20%", end: wordAnimationEnd, scrub: true },
        },
      );
    }, element);

    return () => context.revert();
  }, [baseOpacity, baseRotation, blurStrength, enableBlur, rotationEnd, scrollContainerRef, wordAnimationEnd]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName} ${className}`.trim()}>
      <div className={`scroll-reveal__text ${textClassName}`.trim()}>{splitChildren}</div>
    </div>
  );
}

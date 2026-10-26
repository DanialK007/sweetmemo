"use client";

/**
 * reveal.tsx — Scroll-triggered entrance animation primitives
 *
 * Usage:
 *   <FadeIn>…</FadeIn>
 *   <SlideUp delay={0.1}>…</SlideUp>
 *   <ZoomIn>…</ZoomIn>
 *   <PopUp>…</PopUp>
 *   <SlideLeft>…</SlideLeft>
 *   <SlideRight>…</SlideRight>
 *   <Flip>…</Flip>
 *   <Bounce>…</Bounce>
 *
 * All components fire only the FIRST time the element enters the viewport.
 * They use the IntersectionObserver API with a one-shot "once" flag.
 */

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before the animation plays (default 0) */
  delay?: number;
  /** Animation duration in seconds (default 0.55) */
  duration?: number;
  /** 0–1 intersection threshold to trigger (default 0.15) */
  threshold?: number;
  /** Extra className on the wrapper div */
  className?: string;
  /** Extra inline style on the wrapper div */
  style?: CSSProperties;
}

// ─── Core hook ─────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire only once
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Shared transition builder ──────────────────────────────────────────────

function makeTransition(duration: number, delay: number, easing = "cubic-bezier(0.22, 1, 0.36, 1)") {
  return `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`;
}

// ─── FadeIn ────────────────────────────────────────────────────────────────

export function FadeIn({
  children,
  delay = 0,
  duration = 0.55,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: makeTransition(duration, delay),
        willChange: "opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SlideUp ───────────────────────────────────────────────────────────────

export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: makeTransition(duration, delay),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SlideLeft ─────────────────────────────────────────────────────────────

export function SlideLeft({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: makeTransition(duration, delay),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SlideRight ────────────────────────────────────────────────────────────

export function SlideRight({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
        transition: makeTransition(duration, delay),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── ZoomIn ────────────────────────────────────────────────────────────────

export function ZoomIn({
  children,
  delay = 0,
  duration = 0.55,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.82)",
        transition: makeTransition(duration, delay, "cubic-bezier(0.34, 1.56, 0.64, 1)"),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── PopUp (springy zoom with slight overshoot) ────────────────────────────

export function PopUp({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.65) translateY(20px)",
        transition: makeTransition(duration, delay, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Flip (Y-axis card flip) ───────────────────────────────────────────────

export function Flip({
  children,
  delay = 0,
  duration = 0.65,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        perspective: "800px",
        ...style,
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "rotateY(0deg)" : "rotateY(-70deg)",
          transition: makeTransition(duration, delay, "cubic-bezier(0.22, 1, 0.36, 1)"),
          willChange: "opacity, transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Bounce (drops in from above with bounce) ──────────────────────────────

export function Bounce({
  children,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className = "",
  style,
}: RevealProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-30px)",
        transition: makeTransition(duration, delay, "cubic-bezier(0.34, 1.56, 0.64, 1)"),
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

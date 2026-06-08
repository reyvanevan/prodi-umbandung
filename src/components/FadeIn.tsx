import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  stagger = 0.12,
  direction = 'up',
  distance = 24,
  duration = 0.6,
  once = true,
  threshold = 0.15,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top ${100 - threshold * 100}%`,
        once,
      },
      delay,
    });

    tl.from(children, {
      ...fromVars,
      duration,
      stagger,
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    });

    return () => {
      tl.kill();
    };
  }, [delay, stagger, direction, distance, duration, once, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

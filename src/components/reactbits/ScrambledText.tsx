import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  autoPlayOnView?: boolean;
}

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children,
  autoPlayOnView = false,
}: ScrambledTextProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<Element[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const p = rootRef.current.querySelector('p');
    if (!p) return;

    const split = SplitText.create(p, {
      type: 'chars',
      charsClass: 'char',
    });
    charsRef.current = split.chars;

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML },
      });
    });

    const scrambleOne = (c: Element, dur: number) => {
      gsap.to(c, {
        overwrite: true,
        duration: dur,
        scrambleText: {
          text: (c as HTMLElement).dataset.content || '',
          chars: scrambleChars,
          speed,
        },
        ease: 'none',
      });
    };

    let io: IntersectionObserver | undefined;
    if (autoPlayOnView) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            charsRef.current.forEach((c, i) => {
              gsap.delayedCall((i / charsRef.current.length) * 0.5, () => scrambleOne(c, duration));
            });
            io?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(rootRef.current);
    }

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          scrambleOne(c, duration * (1 - dist / radius));
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      io?.disconnect();
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars, autoPlayOnView]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type SplitRevealProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Section titles revealed line by line behind a mask, once. Re-splits when the text changes (language switch). */
export function SplitReveal({ as: Tag = "h2", id, className, children }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        if (played.current) return;
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => {
            played.current = true;
          },
        });
      },
    });

    return () => split.revert();
  }, [children]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}

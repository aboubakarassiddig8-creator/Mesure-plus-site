"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A stitched seam between sections: the dashes sew themselves in from the left as it scrolls into view. */
export function Seam({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={cn("mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-8", className)}>
      <motion.span
        className="h-0 flex-1 origin-left border-t-2 border-dashed border-blue/35"
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
      />
      <motion.svg
        width="34"
        height="14"
        viewBox="0 0 34 14"
        className="shrink-0 text-blue/70"
        initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : 1.1 }}
      >
        {/* sewing needle with its eye */}
        <path d="M1 7h26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M27 4.5c3.5 0 5.5 1.2 5.5 2.5S30.5 9.5 27 9.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M27.5 7h2" stroke="var(--paper)" strokeWidth="1.2" strokeLinecap="round" />
      </motion.svg>
    </div>
  );
}

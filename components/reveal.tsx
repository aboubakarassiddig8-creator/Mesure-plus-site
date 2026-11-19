"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = ComponentProps<typeof motion.div> & { delay?: number };

/** Fades content in with a short upward translation, once, when it enters the viewport. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.01 : 0.6, ease: EASE, delay: reduce ? 0 : delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

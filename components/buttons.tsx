"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DownloadIcon } from "@/components/icons";
import { APK_URL } from "@/lib/content";
import { cn } from "@/lib/utils";

type Variant = "blue" | "white" | "ghost";

const styles: Record<Variant, string> = {
  blue: "bg-blue text-on-blue shadow-[0_14px_30px_-12px_var(--blue)] hover:bg-blue-deep dark:hover:bg-[#2856d8]",
  white: "bg-white text-[#1d4ed8] shadow-[0_14px_30px_-14px_rgb(0_0_0/0.45)] hover:bg-[#eef3ff]",
  ghost: "border border-ink/15 bg-card/60 text-ink hover:border-blue-ink/50 hover:text-blue-ink",
};

type ButtonProps = { href: string; children: ReactNode; variant?: Variant; download?: boolean; className?: string; id?: string };

/** Pill button with a small press and lift. */
export function Button({ href, children, variant = "blue", download, className, id }: ButtonProps) {
  return (
    <motion.a
      id={id}
      href={href}
      download={download || undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={cn(
        "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-6 text-[1.02rem] font-semibold transition-colors",
        styles[variant],
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

/** The APK download: every "Télécharger" button on the page points here. */
export function DownloadButton({ label, variant = "blue", className, id }: { label: string; variant?: Variant; className?: string; id?: string }) {
  return (
    <Button href={APK_URL} download variant={variant} className={className} id={id}>
      <DownloadIcon size={20} />
      {label}
    </Button>
  );
}

import { SplitReveal } from "@/components/split-reveal";
import { cn } from "@/lib/utils";

type SectionHeadProps = { eyebrow?: string; title: string; sub?: string; align?: "center" | "left"; className?: string };

/** Section heading: optional chalk-marked eyebrow, title revealed line by line, lead text. */
export function SectionHead({ eyebrow, title, sub, align = "center", className }: SectionHeadProps) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <SplitReveal className="type-h2 text-balance">{title}</SplitReveal>
      {sub && <p className="type-lead mt-4 text-pretty text-ink-2">{sub}</p>}
    </div>
  );
}

/** Small label in the style of a tailor's chalk mark on fabric. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-ink uppercase", className)}>
      <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden className="shrink-0">
        <path d="M1 5h4M7 5h4M13 5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

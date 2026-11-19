"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import {
  ButtonTile,
  CalcErrorIcon,
  CalculatorIcon,
  SearchIcon,
  ShieldCheckIcon,
  TornNotebookIcon,
  WhatsAppIcon,
  WifiOffIcon,
} from "@/components/icons";
import { Phone } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/section-head";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* ── Le cahier, c'est fini: three paper-pattern pieces ─────────────────── */

const PROBLEM_ICONS = [TornNotebookIcon, SearchIcon, CalcErrorIcon];
const PIECE_TILT = ["-rotate-[1.4deg]", "rotate-[1deg] md:translate-y-6", "-rotate-[0.6deg]"];

/** A kraft pattern piece: cut line inside the edge and two notches, like a real paper pattern. */
function PatternPiece({ index, children, className }: { index: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grain relative rounded-[18px] border border-kraft-edge bg-kraft p-7 pt-8", className)}>
      <span aria-hidden className="absolute inset-[9px] rounded-[11px] border-[1.5px] border-dashed border-ink/25" />
      {/* notches */}
      <span aria-hidden className="absolute top-0 left-1/2 size-0 -translate-x-1/2 border-x-[7px] border-t-[10px] border-x-transparent border-t-paper" />
      <span aria-hidden className="absolute top-1/2 right-0 size-0 -translate-y-1/2 border-y-[7px] border-r-[10px] border-y-transparent border-r-paper" />
      <span aria-hidden className="absolute right-6 bottom-4 font-display text-4xl leading-none text-ink/12 tabular-nums">
        0{index + 1}
      </span>
      <div className="relative">{children}</div>
    </div>
  );
}

export function Problem() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead title={t.problem.title} sub={t.problem.sub} />
      <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
        {t.problem.items.map((item, i) => {
          const Icon = PROBLEM_ICONS[i];
          return (
            <Reveal key={item.t} delay={i * 0.08}>
              <PatternPiece index={i} className={PIECE_TILT[i]}>
                <ButtonTile tone="orange">
                  <Icon size={24} />
                </ButtonTile>
                <h3 className="type-h3 mt-5">{item.t}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-2">{item.d}</p>
              </PatternPiece>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ── Tout est rangé: topstitched cards around the real client list ─────── */

const BENEFIT_ICONS = [ShieldCheckIcon, CalculatorIcon, WifiOffIcon, WhatsAppIcon];

function BenefitCard({ index, title, text }: { index: number; title: string; text: string }) {
  const Icon = BENEFIT_ICONS[index];
  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <div className="topstitch h-full rounded-[22px] border border-line bg-card p-7 transition-transform duration-300 hover:-translate-y-1">
        <ButtonTile>
          <Icon size={24} />
        </ButtonTile>
        <h3 className="type-h3 mt-5">{title}</h3>
        <p className="mt-2.5 leading-relaxed text-ink-2">{text}</p>
      </div>
    </Reveal>
  );
}

export function Benefits() {
  const { t } = useLang();
  const [b1, b2, b3, b4] = t.benefits.items;
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead title={t.benefits.title} sub={t.benefits.sub} />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.05fr_1fr]">
        <div className="grid gap-5">
          <BenefitCard index={0} title={b1.t} text={b1.d} />
          <BenefitCard index={1} title={b2.t} text={b2.d} />
        </div>

        <Reveal className="md:order-last md:col-span-2 lg:order-none lg:col-span-1">
          <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[22px] bg-blue px-6 pt-8 text-on-blue">
            {/* chalk grid of the cutting mat, white on blue */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(255 255 255/0.35) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255/0.35) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <p className="relative font-display text-[1.9rem] leading-tight">{t.benefits.phoneTitle}</p>
            <p className="relative mt-1 text-[0.95rem] text-white/80">{t.benefits.phoneSub}</p>
            <Phone screen="clients" alt={t.benefits.phoneAlt} className="relative mt-7 -mb-24 w-[min(70vw,270px)]" />
          </div>
        </Reveal>

        <div className="grid gap-5">
          <BenefitCard index={2} title={b3.t} text={b3.d} />
          <BenefitCard index={3} title={b4.t} text={b4.d} />
        </div>
      </div>
    </section>
  );
}

/* ── Trois étapes: the steps sit on a tape measure that fills as you scroll ── */

export function Steps() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
      <Reveal className="order-last lg:order-none">
        <div className="relative mx-auto w-[min(78vw,320px)]">
          <div aria-hidden className="absolute -inset-x-3 top-[18%] sm:-inset-x-10 bottom-[18%] -rotate-3 rounded-[28px] bg-[#25d366]/14" />
          <Phone screen="invoice" alt={t.steps.phoneAlt} className="relative rotate-[2deg]" />
          <span className="absolute -right-3 -bottom-4 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-12px_rgb(37_211_102/0.8)]">
            <WhatsAppIcon size={28} />
          </span>
        </div>
      </Reveal>

      <div>
        <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title} sub={t.steps.sub} align="left" />
        <ol ref={listRef} className="relative mt-10 space-y-9 pl-16">
          {/* tape measure track */}
          <div aria-hidden className="tape-ticks-y absolute top-1 bottom-1 left-0 w-8 rounded-[3px] bg-tape shadow-[0_8px_20px_-12px_rgb(14_26_51/0.5)]" />
          <motion.div
            aria-hidden
            className="absolute top-1 bottom-1 left-0 w-8 origin-top rounded-[3px] bg-blue/30 mix-blend-multiply dark:mix-blend-normal"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          {t.steps.items.map((step, i) => (
            <li key={step.t} className="relative">
              <span className="absolute top-0 -left-16 grid size-8 place-items-center rounded-full bg-blue font-display text-lg text-on-blue tabular-nums ring-4 ring-paper">
                {i + 1}
              </span>
              <h3 className="type-h3">{step.t}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-ink-2">{step.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

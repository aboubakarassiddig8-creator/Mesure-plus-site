"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { Button, DownloadButton } from "@/components/buttons";
import { CheckIcon, DownloadIcon, FeatherIcon, MonitorIcon, PlayIcon, PlusIcon, ShieldCheckIcon, WalletIcon, WifiOffIcon } from "@/components/icons";
import { Phone } from "@/components/phone";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHead } from "@/components/section-head";
import { SplitReveal } from "@/components/split-reveal";
import { APK_URL, FOOTER_HREFS, WEB_APP_URL } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import { useIsIos } from "@/lib/use-ios";
import { cn } from "@/lib/utils";

/* ── Pourquoi Mesure Plus: the workshop photo, stitched in its frame ───── */

const WHY_ICONS = [WifiOffIcon, FeatherIcon, WalletIcon];

export function Why() {
  const { t } = useLang();
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
      <Reveal className="relative">
        <div className="topstitch rounded-[26px] bg-card p-3 [--radius:26px] [--stitch:var(--ink)]">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[18px]">
            <Image
              src="/assets/atelier.webp"
              alt={t.why.photoAlt}
              fill
              sizes="(min-width: 1024px) 600px, 92vw"
              className="object-cover"
            />
          </div>
        </div>
        <Phone screen="orders" alt={t.why.ordersAlt} className="absolute -right-2 -bottom-14 hidden w-48 -rotate-3 rounded-[1.8rem] p-[7px] sm:block lg:-right-10" />
      </Reveal>

      <div>
        <Eyebrow>{t.why.eyebrow}</Eyebrow>
        <SplitReveal className="type-h2 text-balance">{t.why.title}</SplitReveal>
        <p className="type-lead mt-5 text-pretty text-ink-2">{t.why.desc}</p>
        <ul className="mt-7 grid gap-3">
          {t.why.stats.map((s, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <li key={s} className="flex items-center gap-3 rounded-full border border-line bg-card py-2 pr-5 pl-2 font-semibold">
                <span className="grid size-9 place-items-center rounded-full bg-blue-soft text-blue-ink">
                  <Icon size={18} />
                </span>
                {s}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-[0.95rem] font-medium text-ink-2">
          <ShieldCheckIcon size={19} className="shrink-0 text-green" />
          {t.why.trust}
        </p>
        <DownloadButton label={t.hero.ctaFree} className="mt-8 w-full sm:w-auto" />
      </div>
    </section>
  );
}

/* ── Tarif: two garment hang tags on their strings ────────────────────── */

function HangTag({ featured, children, className }: { featured?: boolean; children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative origin-top", className)}
      whileHover={reduce ? undefined : { rotate: featured ? 1.2 : -1.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 8 }}
    >
      <svg aria-hidden width="2" height="48" className="mx-auto block">
        <line x1="1" y1="0" x2="1" y2="48" stroke="var(--ink-2)" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
      <div
        className={cn(
          "relative rounded-[24px] px-7 pt-14 pb-8 sm:px-9 [clip-path:polygon(30%_0,70%_0,100%_9%,100%_100%,0_100%,0_9%)]",
          featured ? "bg-blue text-on-blue" : "grain border border-kraft-edge bg-kraft",
        )}
      >
        <span aria-hidden className={cn("absolute top-5 left-1/2 size-4 -translate-x-1/2 rounded-full border-2 bg-paper", featured ? "border-white/50" : "border-kraft-edge")} />
        <span aria-hidden className={cn("absolute inset-[9px] top-11 rounded-[16px] border-[1.5px] border-dashed", featured ? "border-white/35" : "border-ink/20")} />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}

function Features({ items, featured }: { items: string[]; featured?: boolean }) {
  return (
    <ul className="mt-7 space-y-3">
      {items.map((f) => (
        <li key={f} className="flex items-start gap-3 font-medium">
          <CheckIcon size={19} className={cn("mt-0.5 shrink-0", featured ? "text-white" : "text-blue-ink")} />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  const { t } = useLang();
  const { free, unlimited, planWeb } = t.pricing;
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead title={t.pricing.title} sub={t.pricing.sub} />
      <div className="mx-auto mt-10 grid max-w-4xl items-start gap-8 md:grid-cols-2 md:gap-10">
        <Reveal>
          <HangTag className="md:-rotate-[1.5deg]">
            <h3 className="type-h3">{free.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-6xl leading-none tabular-nums">{free.price}</span>
              <span className="font-medium text-ink-2">{free.period}</span>
            </p>
            <Features items={free.features} />
            <DownloadButton label={free.cta} variant="ghost" className="mt-8 w-full" />
            <a href={WEB_APP_URL} className="mt-4 block text-center text-sm font-semibold text-blue-ink underline-offset-4 hover:underline">
              {planWeb}
            </a>
          </HangTag>
        </Reveal>

        <Reveal delay={0.1}>
          <HangTag featured className="md:rotate-[1.5deg]">
            <span className="absolute -top-6 -right-2 grid size-24 rotate-12 place-items-center rounded-full bg-paper p-2 text-center text-[0.8rem] leading-tight font-bold text-orange shadow-[0_10px_24px_-10px_rgb(0_0_0/0.5)]">
              <span className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-orange/60" />
              {unlimited.badge}
            </span>
            <h3 className="type-h3">{unlimited.name}</h3>
            <p className="mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-6xl leading-none tabular-nums">{unlimited.price}</span>
              <span className="font-medium text-white/80">{unlimited.period}</span>
            </p>
            <p className="mt-2 font-semibold text-white/85 tabular-nums">{unlimited.alt}</p>
            <Features items={unlimited.features} featured />
            <DownloadButton label={unlimited.cta} variant="white" className="mt-8 w-full" />
            <a href={WEB_APP_URL} className="mt-4 block text-center text-sm font-semibold text-white underline-offset-4 hover:underline">
              {planWeb}
            </a>
          </HangTag>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export function Faq() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <SectionHead title={t.faq.title} />
      <div className="mt-12 border-t-2 border-dashed border-ink/20">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          const qId = `${baseId}-q${i}`;
          const aId = `${baseId}-a${i}`;
          return (
            <div key={item.q} className="border-b-2 border-dashed border-ink/20">
              <h3>
                <button
                  id={qId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={aId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center gap-4 py-6 text-left text-[1.1rem] font-semibold sm:text-[1.18rem]"
                >
                  <span className="font-display text-xl text-blue-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={cn("grid size-9 shrink-0 place-items-center rounded-full border transition-colors", isOpen ? "border-blue bg-blue text-on-blue" : "border-ink/15 group-hover:border-blue-ink/50")}
                  >
                    <PlusIcon size={18} />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={aId}
                    role="region"
                    aria-labelledby={qId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 pl-11 leading-relaxed text-ink-2">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Dernier appel: a blue band, stitched like a hem ──────────────────── */

export function FinalCta() {
  const { t } = useLang();
  return (
    <section className="px-3 sm:px-6">
      <div className="topstitch relative mx-auto max-w-6xl overflow-hidden rounded-[30px] bg-blue text-on-blue [--radius:30px] [--stitch:white]">
        <div className="grid items-center gap-10 px-6 pt-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:pt-0">
          <div className="lg:py-20">
            <SplitReveal className="type-h2 max-w-lg text-balance">{t.final.title}</SplitReveal>
            <div className="mt-9 flex flex-wrap gap-3">
              <DownloadButton label={t.final.cta} variant="white" className="w-full sm:w-auto" />
              <Button href={WEB_APP_URL} variant="ghost" className="w-full border-white/40 bg-transparent text-white hover:border-white hover:text-white sm:w-auto">
                <MonitorIcon size={19} />
                {t.final.web}
              </Button>
            </div>
            <span className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-white/30 px-4 py-2 opacity-80">
              <PlayIcon size={20} />
              <span className="flex flex-col leading-tight">
                <span className="text-[0.66rem] font-bold tracking-wider">{t.final.playPre}</span>
                <span className="font-semibold">Google Play</span>
              </span>
            </span>
          </div>
          <div aria-hidden className="relative mx-auto h-72 w-[min(66vw,260px)] self-end overflow-hidden lg:h-[24rem]">
            <Phone screen="order" alt="" className="absolute top-0 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Pied de page ─────────────────────────────────────────────────────── */

export function Footer() {
  const { t } = useLang();
  return (
    <footer id="contact" className="mt-20 overflow-hidden bg-ink text-paper dark:bg-paper-2 dark:text-ink">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-28 sm:px-8 md:pb-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/assets/logo.png" alt="" width={40} height={40} className="size-10 rounded-[11px]" />
              <span className="font-display text-2xl">Mesure Plus</span>
            </div>
            <p className="mt-3 max-w-xs opacity-75">{t.footer.tagline}</p>
          </div>
          <div>
            <p className="text-sm font-bold tracking-wider uppercase opacity-60">{t.footer.colTitle}</p>
            <ul className="mt-4 space-y-2.5">
              {t.footer.links.map((label, i) => (
                <li key={label}>
                  <a href={FOOTER_HREFS[i]} className="opacity-85 transition-opacity hover:opacity-100 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div aria-hidden className="tape-ticks-x mt-14 h-6 rounded-[3px] bg-tape [--tape-tick:#17408b]" />
        <div className="mt-6 flex items-end justify-between gap-6">
          <p className="text-sm opacity-60">{t.footer.legal}</p>
        </div>
        <p aria-hidden className="mt-4 font-display text-[clamp(3.6rem,15vw,11rem)] leading-[0.85] opacity-[0.08] select-none">
          Mesure Plus
        </p>
      </div>
    </footer>
  );
}

/* ── Barre collante mobile ────────────────────────────────────────────── */

/** Mobile bar, shown once the hero is out of view. On iPhone / iPad the APK cannot install, so it opens the web app. */
export function StickyCta() {
  const { t } = useLang();
  const ios = useIsIos();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 260;
    setVisible(y > window.innerHeight * 0.85 && !nearEnd);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: reduce ? 0 : 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : 110, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="flex items-center gap-3 rounded-full border border-line bg-card/95 p-1.5 pl-2 shadow-[0_18px_40px_-16px_rgb(14_26_51/0.5)] backdrop-blur">
            <Image src="/assets/logo.png" alt="" width={40} height={40} className="size-10 rounded-full" />
            <a
              href={ios ? WEB_APP_URL : APK_URL}
              download={ios ? undefined : true}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-blue font-semibold text-on-blue"
            >
              {ios ? <MonitorIcon size={18} /> : <DownloadIcon size={18} />}
              {ios ? t.mobile.web : t.mobile.cta}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

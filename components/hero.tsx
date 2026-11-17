"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { Button, DownloadButton } from "@/components/buttons";
import { CheckIcon, PhoneIcon, WifiOffIcon } from "@/components/icons";
import { Phone } from "@/components/phone";
import { Eyebrow } from "@/components/section-head";
import { WEB_APP_URL } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { EASE } from "@/lib/motion";

// Vertical centres (in % of the order screenshot) of the measurement rows and of
// the "Reste à payer" line, read off the real app screen.
const ROWS = [29.8, 34, 38.1, 42.3];
const ROW_H = 4.4;
const RESTE = 79;

// Signature timeline (seconds after load).
const T_TAPE = 0.7;
const T_SWEEP = 1.5;
const SWEEP = 2.2;
const T_CHALK = T_SWEEP + SWEEP + 0.2;
const T_TAG = T_CHALK + 0.7;

// The screen sits inside a 9px bezel: map a % of the screen to the wrapper, minus half the 14px marker.
const markerTop = (c: number) => `calc(${c}% + ${(9 - c * 0.18 - 7).toFixed(2)}px)`;

function HeroTitle() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { before, em, after } = t.hero.title;
  const words = [...before.split(" "), em, ...after.split(" ")];
  const emIndex = before.split(" ").length;

  return (
    <h1 key={t.hero.title.em} className="type-hero text-balance">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={i === emIndex ? "relative inline-block text-blue-ink" : "inline-block"}
              initial={{ y: reduce ? 0 : "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.08 + i * 0.06 }}
            >
              {word}
              {i === emIndex && (
                // Tape-measure underline under the key word.
                <motion.span
                  aria-hidden
                  className="tape-ticks-x absolute inset-x-0 -bottom-[0.06em] h-[0.2em] origin-left rounded-[2px] bg-tape shadow-[0_1px_0_var(--kraft-edge)]"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: EASE, delay: reduce ? 0 : T_TAPE }}
                />
              )}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </h1>
  );
}

/** The signature: a tape measure unrolls beside the real screen, checks each measurement, then the balance due is chalk-circled and tagged. */
function MeasuredPhone() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const tops = ROWS.map((c) => `${c - ROW_H / 2}%`);

  return (
    <div className="relative mx-auto mb-16 w-[min(78vw,370px)] pl-9 sm:pl-11 lg:mb-0">
      {/* Vertical tape measure */}
      <motion.div
        aria-hidden
        className="tape-ticks-y absolute top-[8%] bottom-[10%] left-0 w-7 origin-top rounded-[3px] bg-tape shadow-[0_10px_24px_-12px_rgb(14_26_51/0.5)] sm:w-8"
        initial={{ scaleY: reduce ? 1 : 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 1.2, ease: EASE, delay: reduce ? 0 : T_TAPE }}
      >
        <span className="absolute top-1.5 right-1 text-[0.6rem] font-bold text-tape-tick">cm</span>
      </motion.div>

      <Phone screen="order" alt={t.hero.phoneAlt} priority>
        {/* Sweep across the four measurements */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-x-[3.5%] rounded-md border-l-[3px] border-blue bg-blue/12"
            style={{ height: `${ROW_H}%` }}
            initial={{ top: tops[0], opacity: 0 }}
            animate={{ top: tops, opacity: [0, 1, 1, 1, 0] }}
            transition={{
              top: { duration: SWEEP, delay: T_SWEEP, ease: "easeInOut", times: [0, 0.33, 0.66, 1] },
              opacity: { duration: SWEEP + 0.3, delay: T_SWEEP, times: [0, 0.08, 0.5, 0.9, 1] },
            }}
          />
        )}
        {/* Chalk circle around "Reste à payer" */}
        <svg aria-hidden viewBox="0 0 100 18" preserveAspectRatio="none" className="absolute left-[2.5%] h-[8%] w-[95%] overflow-visible" style={{ top: `${RESTE - 4}%` }}>
          <motion.path
            d="M 8 3.6 C 30 0.3, 78 0.6, 94 3.9 C 98.6 6.3, 98.4 14.1, 92 15.9 C 70 18.3, 24 18, 7 15.6 C 1.6 14.1, 1.4 5.7, 11 2.7"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="1.1"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut", delay: reduce ? 0 : T_CHALK }}
          />
        </svg>
      </Phone>

      {/* Marker that rides the tape alongside the sweep */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-7 size-0 border-y-[7px] border-l-[9px] border-y-transparent border-l-blue sm:left-8"
          initial={{ top: markerTop(ROWS[0]), opacity: 0 }}
          animate={{ top: ROWS.map(markerTop), opacity: [0, 1, 1, 1, 0] }}
          transition={{
            top: { duration: SWEEP, delay: T_SWEEP, ease: "easeInOut", times: [0, 0.33, 0.66, 1] },
            opacity: { duration: SWEEP + 0.3, delay: T_SWEEP, times: [0, 0.08, 0.5, 0.9, 1] },
          }}
        />
      )}

      {/* Garment hang tag on the balance */}
      <motion.div
        className="absolute -right-3 z-10 w-[12.5rem] origin-top sm:-right-24 lg:-right-28"
        style={{ top: `calc(${RESTE}% - 2.4rem)` }}
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: -30, rotate: -14 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: [-14, 9, -5, 2.5, -1, 0] }}
        transition={reduce ? { duration: 0 } : { delay: T_TAG, opacity: { duration: 0.2, delay: T_TAG }, y: { duration: 0.5, ease: EASE, delay: T_TAG }, rotate: { duration: 2.2, ease: "easeOut", delay: T_TAG } }}
      >
        <svg aria-hidden width="2" height="44" className="mx-auto block">
          <line x1="1" y1="0" x2="1" y2="44" stroke="var(--ink-2)" strokeWidth="1.4" strokeDasharray="3 2" />
        </svg>
        <div className="grain relative rounded-[14px] border border-kraft-edge bg-kraft px-4 pt-6 pb-4 shadow-[0_22px_40px_-20px_rgb(14_26_51/0.55)] [clip-path:polygon(22%_0,78%_0,100%_14%,100%_100%,0_100%,0_14%)]">
          <span aria-hidden className="absolute top-2.5 left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-kraft-edge bg-paper" />
          <p className="text-[0.78rem] leading-snug font-semibold text-ink-2">{t.hero.resteTag}</p>
          <p className="mt-1.5 flex items-baseline gap-2 whitespace-nowrap">
            <span className="text-sm font-semibold text-ink-2">{t.hero.resteLabel}</span>
            <span className="font-display text-[1.75rem] leading-none text-orange tabular-nums">{t.hero.resteVal}</span>
          </p>
        </div>
      </motion.div>

      {/* Offline card (desktop) */}
      <motion.div
        aria-hidden
        className="absolute top-[3%] -right-36 hidden w-52 rounded-2xl border border-line bg-card p-4 shadow-[0_24px_50px_-28px_rgb(14_26_51/0.5)] xl:block"
        initial={{ opacity: 0, x: reduce ? 0 : -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 1.1 }}
      >
        <p className="flex items-center gap-2 font-semibold">
          <WifiOffIcon size={18} className="text-blue-ink" />
          {t.hero.offlineTitle}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-ink-2">{t.hero.offlineDesc}</p>
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink-2">
          <span className="size-2 rounded-full bg-[#f59e0b]" />
          {t.hero.offlineStatus}
        </p>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : delay },
  });

  return (
    <section id="top" className="relative">
      {/* Cutting-mat grid, fading out at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -top-[4.25rem] opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-8 pb-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-14 lg:pb-24">
        <div>
          <motion.div {...fade(0)}>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </motion.div>
          <HeroTitle />
          <motion.p {...fade(0.5)} className="type-lead mt-6 max-w-xl text-pretty text-ink-2">
            {t.hero.sub}
          </motion.p>

          <motion.div {...fade(0.65)} className="mt-8 flex flex-wrap gap-3">
            <DownloadButton id="download" label={t.hero.ctaFree} className="w-full sm:w-auto" />
            <Button href="#features" variant="ghost" className="w-full sm:w-auto">
              <PhoneIcon size={19} />
              {t.hero.ctaScreens}
            </Button>
          </motion.div>

          <motion.div {...fade(0.75)} className="mt-5">
            <a href={WEB_APP_URL} className="font-semibold text-blue-ink underline-offset-4 hover:underline">
              {t.hero.ctaWeb}
            </a>
            <p className="mt-1 text-sm text-ink-2">{t.hero.webMeta}</p>
          </motion.div>

          <motion.ul {...fade(0.85)} className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-dashed border-ink/20 pt-5 text-[0.95rem] font-medium">
            {t.hero.reassure.map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <CheckIcon size={16} className="text-green" />
                {r}
              </li>
            ))}
          </motion.ul>
          <motion.p {...fade(0.9)} className="mt-2 text-sm text-ink-2 tabular-nums">
            {t.hero.apkMeta}
          </motion.p>
        </div>

        <MeasuredPhone />
      </div>
    </section>
  );
}

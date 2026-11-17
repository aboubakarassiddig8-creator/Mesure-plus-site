"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import { APK_URL } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function readTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  if (forced === "light" || forced === "dark") return forced;
  return darkQuery().matches ? "dark" : "light";
}

function subscribeTheme(onChange: () => void) {
  const mq = darkQuery();
  mq.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    mq.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function ThemeToggle() {
  const { t } = useLang();
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, readTheme, () => null);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the switch still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-ink/12 text-ink transition-colors hover:border-blue-ink/50 hover:text-blue-ink"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {theme && (
          <motion.span
            key={theme}
            initial={{ y: 16, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          >
            {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.nav.langLabel} className="relative flex rounded-full border border-ink/12 p-1 text-[0.8rem] font-bold">
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={cn("relative h-8 w-9 rounded-full uppercase transition-colors", lang === l ? "text-on-blue" : "text-ink-2 hover:text-ink")}
        >
          {lang === l && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-blue" transition={{ type: "spring", stiffness: 420, damping: 32 }} />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Navigation principale" className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-3 px-4 sm:px-8">
        <a href="#top" className="mr-auto flex items-center gap-2.5">
          <Image src="/assets/logo.png" alt="" width={36} height={36} className="size-9 rounded-[10px]" priority />
          <span className="font-display text-[1.35rem] leading-none whitespace-nowrap">Mesure Plus</span>
        </a>

        <div className="hidden items-center gap-7 text-[0.95rem] font-medium text-ink-2 lg:flex">
          <a href="#features" className="transition-colors hover:text-ink">{t.nav.features}</a>
          <a href="#pricing" className="transition-colors hover:text-ink">{t.nav.pricing}</a>
          <a href="#contact" className="transition-colors hover:text-ink">{t.nav.contact}</a>
        </div>

        <div className="flex items-center gap-2 lg:ml-5">
          <LangSwitch />
          <ThemeToggle />
          <a
            href={APK_URL}
            download
            className="hidden h-10 items-center rounded-full bg-ink px-5 text-[0.92rem] font-semibold text-paper transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {t.nav.download}
          </a>
        </div>
      </nav>
    </header>
  );
}

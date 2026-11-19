"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AndroidIcon, DownloadIcon, MonitorIcon, PhoneIcon } from "@/components/icons";
import { APK_URL, WEB_APP_URL } from "@/lib/content";
import { useLang } from "@/lib/i18n";
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

/**
 * One button per device, all the same size: Android downloads the APK,
 * iPhone and computer open the web app (nothing to install). `onBlue` is the
 * version for the blue final band.
 */
export function PlatformButtons({ onBlue = false, id, className }: { onBlue?: boolean; id?: string; className?: string }) {
  const { t } = useLang();
  const items = [
    { key: "android", href: APK_URL, download: true, Icon: AndroidIcon, pre: t.platforms.downloadFor, name: "Android", primary: true },
    { key: "iphone", href: WEB_APP_URL, download: false, Icon: PhoneIcon, pre: t.platforms.useOn, name: "iPhone", primary: false },
    { key: "computer", href: WEB_APP_URL, download: false, Icon: MonitorIcon, pre: t.platforms.useOn, name: t.platforms.computer, primary: false },
  ];
  const tone = (primary: boolean) =>
    onBlue
      ? primary
        ? "border-white bg-white text-[#1d4ed8] shadow-[0_14px_30px_-14px_rgb(0_0_0/0.45)] hover:bg-[#eef3ff]"
        : "border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20"
      : primary
        ? "border-transparent bg-blue text-on-blue shadow-[0_14px_30px_-12px_var(--blue)] hover:bg-blue-deep dark:hover:bg-[#2856d8]"
        : "border-transparent bg-ink text-paper shadow-[0_14px_30px_-16px_rgb(14_26_51/0.6)] hover:opacity-90";

  return (
    <div id={id} className={cn("grid max-w-xl gap-3 sm:grid-cols-3", className)}>
      {items.map(({ key, href, download, Icon, pre, name, primary }) => (
        <motion.a
          key={key}
          href={href}
          download={download || undefined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className={cn("flex min-h-15 items-center gap-3 rounded-2xl border px-4 py-2.5 transition-colors", tone(primary))}
        >
          <Icon size={24} className="shrink-0" />
          <span className="flex min-w-0 flex-col text-left leading-tight">
            <span className="text-xs font-medium whitespace-nowrap opacity-80">{pre}</span>
            <span className="text-[1.05rem] font-semibold whitespace-nowrap">{name}</span>
          </span>
        </motion.a>
      ))}
    </div>
  );
}

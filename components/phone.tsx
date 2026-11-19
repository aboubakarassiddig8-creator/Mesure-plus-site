"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { SCREENS, screenSrc, type Screen } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PhoneProps = {
  screen: Screen;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Overlays positioned in % of the screen (the screenshot fills it exactly). */
  children?: ReactNode;
};

/** A real app screenshot inside a phone bezel. The image follows the page language. */
export function Phone({ screen, alt, className, priority, children }: PhoneProps) {
  const { lang } = useLang();
  const { w, h } = SCREENS[screen];
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-bezel p-[9px] shadow-[0_40px_80px_-30px_rgb(14_26_51/0.55),0_0_0_1px_rgb(255_255_255/0.06)_inset]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[2.05rem] bg-[#f5f7fa]">
        <Image
          src={screenSrc(screen, lang)}
          alt={alt}
          width={w}
          height={h}
          priority={priority}
          sizes="(min-width: 1024px) 340px, 72vw"
          className="block h-auto w-full"
        />
        {children}
      </div>
      <span aria-hidden className="absolute top-[15px] left-1/2 h-[5px] w-14 -translate-x-1/2 rounded-full bg-white/15" />
    </div>
  );
}

import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

// House icons on a 24 × 24 grid, drawn like tailor's chalk: round caps,
// 1.8 stroke, colour from currentColor so they follow the theme.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 22, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DownloadIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4 16.5v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="3" />
    <path d="M10.5 18h3" />
  </Svg>
);

export const MonitorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

/** A notebook torn across, pages loose. */
export const TornNotebookIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 3.5h10.5a2 2 0 0 1 2 2V11" />
    <path d="M5 3.5v8l2 1.2 2-1.4 2 1.4 2-1.4 2 1.4 2.5-1.5" />
    <path d="M5 15.5v5h12.5a2 2 0 0 0 2-2V15l-2.5 1.4-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4z" />
    <path d="M8 7h5" />
  </Svg>
);

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.6-4.6" />
    <path d="M8.5 9a2.5 2.5 0 0 1 4 .5c0 1.5-2 1.6-2 3" />
    <path d="M10.5 14.6v.01" />
  </Svg>
);

export const CalcErrorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
    <path d="M8 6.5h8" />
    <path d="m9 12 3 3m0-3-3 3" />
    <path d="M15 12.5v2" />
    <path d="M8.5 18h1M14.5 18h1" />
  </Svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 19 6v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const CalculatorIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2.5" />
    <rect x="8" y="6" width="8" height="3.5" rx="1" />
    <path d="M8.5 13.5h.01M12 13.5h.01M15.5 13.5h.01M8.5 17.5h.01M12 17.5h.01M15.5 17.5h.01" strokeWidth={2.4} />
  </Svg>
);

export const WifiOffIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5a10 10 0 0 1 4.2-2.4M14.5 10.2A10 10 0 0 1 19 12.5" />
    <path d="M8.5 16a5 5 0 0 1 7 0" />
    <path d="M12 19.5h.01" strokeWidth={2.6} />
    <path d="m3.5 3.5 17 17" />
    <path d="M2 9a14 14 0 0 1 4-2.6M11 5.1A14 14 0 0 1 22 9" />
  </Svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.4-4.4a8.5 8.5 0 1 1 15.6-4.5z" />
    <path d="M9 8.6c.3-.6.6-.6.9-.6h.4c.2 0 .4 0 .6.5l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.4l.6-.6c.2-.2.4-.2.6-.1l1.5.7c.3.1.3.3.3.5 0 .6-.4 1.3-.9 1.6-.6.3-1.6.4-2.7-.1-1.8-.8-3.3-2.2-4.1-4-.4-.9-.3-1.6 0-2z" fill="currentColor" stroke="none" />
  </Svg>
);

export const WalletIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7.5V18a2 2 0 0 0 2 2h13a1 1 0 0 0 1-1v-3" />
    <path d="M20 12v-3a1 1 0 0 0-1-1H6a2 2 0 0 1 0-4h11" />
    <path d="M20.5 12H17a2 2 0 0 0 0 4h3.5z" />
  </Svg>
);

export const FeatherIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19.5 4.5c-5 0-11 3.5-12.5 11.5L5 20" />
    <path d="M19.5 4.5c0 6-3.5 11-10 12" />
    <path d="M10 11h5.5" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p} strokeWidth={2.4}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const PlayIcon = (p: IconProps) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M5 3.6v16.8c0 .7.8 1.1 1.4.7l13.2-8.4c.5-.4.5-1.1 0-1.5L6.4 2.9C5.8 2.5 5 2.9 5 3.6z" />
  </Svg>
);

export const SunIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Svg>
);

export const MoonIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </Svg>
);

/**
 * Icon on a sewing-button tile: soft blue disc, ring of stitches, four thread holes
 * hinted at the rim. Colours come from the theme, readable in light and dark.
 */
export function ButtonTile({ children, tone = "blue", className }: { children: React.ReactNode; tone?: "blue" | "orange"; className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-14 shrink-0 place-items-center rounded-full",
        tone === "blue" ? "bg-blue-soft text-blue-ink" : "bg-orange-soft text-orange",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-[5px] rounded-full border-[1.5px] border-dashed border-current opacity-40" />
      {children}
    </span>
  );
}

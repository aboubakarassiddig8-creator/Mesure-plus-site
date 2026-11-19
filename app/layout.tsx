import type { Metadata, Viewport } from "next";
import { Figtree, Gloock } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE_URL } from "@/lib/content";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const gloock = Gloock({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-gloock", display: "swap" });
const figtree = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-figtree", display: "swap" });

const title = "Mesure Plus — l'appli qui remplace ton cahier de couture";
const description =
  "Clients, mesures, commandes et reste à payer : tout est rangé dans ton téléphone, même sans connexion internet. Gratuit jusqu'à 2 clients.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title,
  description,
  icons: { icon: "/assets/favicon.png", apple: "/assets/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    title,
    description: "Clients, mesures, commandes et reste à payer : tout est rangé, même hors-ligne.",
    url: SITE_URL,
    siteName: "Mesure Plus",
    locale: "fr_FR",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${gloock.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body>
        <LangProvider>
          <SmoothScroll />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}

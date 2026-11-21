import type { Metadata, Viewport } from "next";
import { Figtree, Gloock } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  // Google shows the favicon next to the site in search results: it wants a
  // square icon whose size is a multiple of 48 px, plus /favicon.ico.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/assets/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
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
        {/* Tells search engines which image is the brand's logo. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mesure Plus",
              url: SITE_URL,
              logo: `${SITE_URL}/assets/logo.png`,
            }),
          }}
        />
      </head>
      <body>
        <LangProvider>
          <SmoothScroll />
          {children}
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}

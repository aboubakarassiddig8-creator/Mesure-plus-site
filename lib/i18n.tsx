"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, type Content, type Lang } from "@/lib/content";

type LangState = { lang: Lang; t: Content; setLang: (lang: Lang) => void };

const LangContext = createContext<LangState>({ lang: "fr", t: content.fr, setLang: () => {} });

/** French is the default language (static HTML is French, as before). */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, t: content[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

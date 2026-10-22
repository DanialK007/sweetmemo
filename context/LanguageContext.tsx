"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { type Language, type Translations, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "my",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.my,
});

const STORAGE_KEY = "sweetmemos_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Burmese ("my") as requested
  const [language, setLanguageState] = useState<Language>("my");

  const syncDocumentAttributes = (lang: Language) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
      if (document.body) {
        document.body.classList.toggle("lang-my", lang === "my");
        document.body.classList.toggle("lang-en", lang === "en");
      }
    }
  };

  // Read saved preference from localStorage safely on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      const initial = (saved && (saved === "my" || saved === "en")) ? saved : "my";
      setLanguageState(initial);
      syncDocumentAttributes(initial);
    } catch {
      syncDocumentAttributes("my");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    syncDocumentAttributes(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "my" ? "en" : "my");
  };

  const currentTranslations = useMemo(() => {
    return translations[language] || translations.my;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: currentTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

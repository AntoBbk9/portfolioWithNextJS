"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Language = "fr" | "en";
export type Theme = "dark" | "light";

type PreferencesContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function savePreference(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const preferences = Object.fromEntries(
      document.cookie.split("; ").map((entry) => {
        const [key, ...value] = entry.split("=");
        return [key, value.join("=")];
      }),
    );

    if (preferences.portfolio_language === "en" || preferences.portfolio_language === "fr") {
      setLanguageState(preferences.portfolio_language);
    }
    if (preferences.portfolio_theme === "light" || preferences.portfolio_theme === "dark") {
      setThemeState(preferences.portfolio_theme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
  }, [language, theme]);

  const value = useMemo<PreferencesContextValue>(() => ({
    language,
    setLanguage: (nextLanguage) => {
      setLanguageState(nextLanguage);
      savePreference("portfolio_language", nextLanguage);
    },
    theme,
    setTheme: (nextTheme) => {
      setThemeState(nextTheme);
      savePreference("portfolio_theme", nextTheme);
    },
  }), [language, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useLanguage() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
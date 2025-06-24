import { createContext, useState, ReactNode, useContext } from "react";

interface LanguageContextType {
  language: "en" | "ar";
  toggleLanguage: (lang: "en" | "ar") => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    live: "LIVE 🔴",
    premium: "🌟 Premium",
    subscribeText: "We have subscription. Do you want to subscribe?",
    subscribeBtn: "Subscribe Now",
    logout: "Logout",
    icon1: "مساجد مكة",
    icon2: "مساجد مكة الأكثر حاجة",
    icon3: "سقيا وإطعام الحرم",
  },
  ar: {
    live: "مباشر 🔴",
    premium: "🌟 بريميوم",
    subscribeText: "لدينا اشتراك. هل تريد الاشتراك؟",
    subscribeBtn: "اشترك الآن",
    logout: "تسجيل الخروج",
    icon1: "مساجد مكة",
    icon2: "مساجد مكة الأكثر حاجة",
    icon3: "سقيا وإطعام الحرم",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const toggleLanguage = (lang: "en" | "ar") => setLanguage(lang);

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

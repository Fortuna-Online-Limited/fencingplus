import { createContext, useContext, useState, type ReactNode } from 'react';
import { zhHK, type Dict } from '../locales/zh-HK';
import { en } from '../locales/en';

export type Locale = 'zh-HK' | 'en';

const dicts: Record<Locale, Dict> = { 'zh-HK': zhHK, en };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'zh-HK',
  setLocale: () => {},
  t: zhHK,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(
    () => (localStorage.getItem('fp-locale') as Locale | null) ?? 'zh-HK'
  );

  const setLocale = (l: Locale) => {
    localStorage.setItem('fp-locale', l);
    setLocaleState(l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);

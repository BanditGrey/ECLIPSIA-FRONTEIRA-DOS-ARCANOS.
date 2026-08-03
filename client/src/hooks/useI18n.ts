import { useCallback, useMemo, useState } from 'react';
import { defaultLang, supportedLangs, translations } from '../i18n';
import type { LangCode, TranslationTree, TranslationValue } from '../i18n';

const STORAGE_KEY = 'eclipsia_lang';

const isLangCode = (code: string | null | undefined): code is LangCode => {
  return Boolean(code && supportedLangs.includes(code as LangCode));
};

const normalizeLang = (code: string | null | undefined): LangCode => {
  if (isLangCode(code)) {
    return code;
  }

  const base = code?.split('-')[0];
  const match = supportedLangs.find((lang) => lang.startsWith(`${base}-`));

  return match ?? defaultLang;
};

const getBrowserLang = (): LangCode => {
  if (typeof navigator === 'undefined') {
    return defaultLang;
  }

  return normalizeLang(navigator.language);
};

const getInitialLang = (): LangCode => {
  if (typeof window === 'undefined') {
    return defaultLang;
  }

  const savedLang = window.localStorage.getItem(STORAGE_KEY);

  return isLangCode(savedLang) ? savedLang : getBrowserLang();
};

const getByPath = (tree: TranslationTree, path: string): TranslationValue | undefined => {
  return path.split('.').reduce<TranslationValue | undefined>((current, key) => {
    if (!current || typeof current === 'string') {
      return undefined;
    }

    return current[key];
  }, tree);
};

const valueToString = (value: TranslationValue | undefined, path: string): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value._self === 'string') {
    return value._self;
  }

  if (value) {
    return path;
  }

  return undefined;
};

export const useI18n = () => {
  const [lang, setLangState] = useState<LangCode>(getInitialLang);

  const t = useCallback(
    (path: string) => {
      const currentValue = valueToString(getByPath(translations[lang], path), path);

      if (currentValue) {
        return currentValue;
      }

      return valueToString(getByPath(translations[defaultLang], path), path) ?? path;
    },
    [lang]
  );

  const setLang = useCallback((code: string) => {
    const nextLang = normalizeLang(code);

    if (typeof window === 'undefined') {
      setLangState(nextLang);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, nextLang);
    window.location.reload();
  }, []);

  return useMemo(
    () => ({
      lang,
      supportedLangs,
      setLang,
      t
    }),
    [lang, setLang, t]
  );
};

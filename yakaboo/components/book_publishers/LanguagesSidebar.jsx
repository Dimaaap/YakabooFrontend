'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useLanguageStore } from '../../states';

export const LanguagesSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { activeLang, setActiveLang } = useLanguageStore();

  useEffect(() => {
    const lang = searchParams.get('lang');
    setActiveLang(lang === 'en' ? 'en' : 'uk');
  }, [searchParams]);

  const handleLangClick = (lang) => {
    const params = new URLSearchParams(searchParams.toString());

    if (lang === 'uk') {
      params.delete('lang');
    } else {
      params.set('lang', 'en');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="publishers__sidebar languages">
      <li
        className={`languages__point ${activeLang === 'uk' ? 'is-active' : ''}`}
        onClick={() => handleLangClick('uk')}
      >
        Українська
      </li>
      <li
        className={`languages__point ${activeLang === 'en' ? 'is-active' : ''}`}
        onClick={() => handleLangClick('en')}
      >
        Англійська
      </li>
    </ul>
  );
};

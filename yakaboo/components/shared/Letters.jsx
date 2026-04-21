'use client';

import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useLanguageStore, useLetterStore } from '../../states';

export const Letters = ({ lang }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { activeLetter, setActiveLetter } = useLetterStore();
  const { activeLang, setActiveLang } = useLanguageStore();

  const UKRAINIAN_LETTERS = 'АБВГҐДЕЄЖЗИІЙКЛМНОПРСТУФХЦШЩЮЯ'.split('');
  const ENGLISH_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const letters = lang === 'uk' ? UKRAINIAN_LETTERS : ENGLISH_LETTERS;
  const defaultLetter = lang === 'uk' ? 'А' : 'A';

  const rawLetter = searchParams.get('letter');
  const isValidLetter = rawLetter && letters.includes(rawLetter);
  const resolvedLetter = isValidLetter ? rawLetter : defaultLetter;

  const handleLangClick = (lang) => {
    const params = new URLSearchParams(searchParams.toString());

    if (lang === 'uk') {
      params.delete('lang');
    } else {
      params.set('lang', 'en');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const lang = searchParams.get('lang');
  setActiveLang(lang === 'en' ? 'en' : 'uk');
  }, [searchParams]);
  
  useEffect(() => {
    if (resolvedLetter !== activeLetter) {
      setActiveLetter(resolvedLetter);
    }
  }, [resolvedLetter, activeLetter, setActiveLetter]);

  useEffect(() => {
    if (rawLetter && !isValidLetter) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('letter');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [lang, rawLetter, isValidLetter, pathname, router, searchParams]);


  return (
    <div className="letters">
      <div className="letters__header">
          <ul className="letters__list">
            <li className={`languages__point ${activeLang === "uk" ? "is-active" : ""}`} 
            onClick={() => handleLangClick("uk")}>
              Українська
            </li>

            <li className={`languages__point ${activeLang === "en" ? "is-active" : ""}`} 
            onClick={() => handleLangClick("en")}>
              Латинська
            </li>
          </ul>
        </div>

      <div className="letters__container">
          {letters.map((letter) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('letter', letter);

          if (lang === 'uk') {
            params.delete('lang');
          } else {
            params.set('lang', 'en');
          }

          const href = `${pathname}?${params.toString()}`;

          return (
            <Link
              key={letter}
              href={href}
              className={`letters__letter-link ${resolvedLetter === letter ? 'is-active' : ''}`}
            >
              {letter}
            </Link>
          );
        })}  
        </div>
    </div>
  );
};

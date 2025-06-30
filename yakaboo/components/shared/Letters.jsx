'use client';

import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useLetterStore } from '../../states';

export const Letters = ({ lang }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { activeLetter, setActiveLetter } = useLetterStore();

  const UKRAINIAN_LETTERS = 'АБВГҐДЕЄЖЗИІЙКЛМНОПРСТУФХЦШЩЮЯ'.split('');
  const ENGLISH_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const letters = lang === 'uk' ? UKRAINIAN_LETTERS : ENGLISH_LETTERS;
  const defaultLetter = lang === 'uk' ? 'А' : 'A';

  const rawLetter = searchParams.get('letter');
  const isValidLetter = rawLetter && letters.includes(rawLetter);
  const resolvedLetter = isValidLetter ? rawLetter : defaultLetter;

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
  );
};

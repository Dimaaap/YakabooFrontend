'use client';

import {
  LanguagesSidebar,
  SearchBar,
} from '../../../../../components/book_publishers';
import { Letters } from '../../../../../components/shared/Letters';
import { useLanguageStore } from '../../../../../states';

export default function AllAuthorsPage() {
  const { activeLang } = useLanguageStore();

  return (
    <div className="authors publishers">
      <h2 className="authors__title publishers__title">Автори</h2>
      <div className="authors__container publishers__container">
        <div className="authors__left-section publishers__section publishers__left-section">
          <LanguagesSidebar />
        </div>

        <div className="authors__right-section publishers__section publishers__right-section">
          <Letters lang={activeLang} />
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

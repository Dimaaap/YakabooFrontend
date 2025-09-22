"use client"

import { useLanguageStore } from "../../states";
import { DataContainer, LanguagesSidebar, SearchBar } from "../book_publishers";
import { Letters } from "../shared/Letters";

export const AllAuthorsClient = () => {
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
              <DataContainer bookPublishers={false} />
            </div>
          </div>
        </div>
      );
}
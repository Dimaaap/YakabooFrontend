"use client";

import { DataContainer, LanguagesSidebar, SearchBar } from ".";
import { useLanguageStore } from "../../states";
import { Letters } from "../shared/Letters";

export const AllBookPublishersClient = () => {
    const { activeLang } = useLanguageStore();

    return (
        <div className="publishers">
          <h2 className="publishers__title">Видавництва</h2>
          <div className="publishers__container">
            <div className="publishers__left-section publishers__section">
              <LanguagesSidebar />
            </div>
            <div className="publishers__right-section publishers__section">
              <Letters lang={activeLang} />
              <SearchBar />
              <DataContainer />
            </div>
          </div>
        </div>
      );
}
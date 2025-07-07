'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FilterForm } from '../shared';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

export const BoardGamesFilters = () => {
  const [boardGameAge, setBoardGameAge] = useState([]);
  const [boardGameBrands, setBoardGameBrands] = useState([]);
  const [boardGameSeries, setBoardGameSeries] = useState([]);
  const [boardGameLanguages, setBoardGameLanguages] = useState([]);
  const [boardGameTypes, setBoardGameTypes] = useState([]);
  const [boardGameKinds, setBoardGameKinds] = useState([]);
  const [playerCounts, setPlayerCounts] = useState([]);

  useEffect(() => {
    fetchData(Endpoints.ALL_BOARD_GAME_AGES, setBoardGameAge, 'game_ages');
  }, []);

  useEffect(() => {
    fetchData(
      Endpoints.ALL_BOARD_GAME_BRANDS,
      setBoardGameBrands,
      'game_brands'
    );
  }, []);

  useEffect(() => {
    fetchData(
      Endpoints.ALL_BOARD_GAME_SERIES,
      setBoardGameSeries,
      'game_series'
    );
  }, []);

  useEffect(() => {
    fetchData(
      Endpoints.ALL_BOARD_GAME_LANGUAGES,
      setBoardGameLanguages,
      'game_languages'
    );
  }, []);

  useEffect(() => {
    fetchData(Endpoints.ALL_BOARD_GAME_TYPES, setBoardGameTypes, 'game_types');
  }, []);

  useEffect(() => {
    fetchData(Endpoints.ALL_BOARD_GAME_KINDS, setBoardGameKinds, 'game_kinds');
  }, []);

  useEffect(() => {
    fetchData(
      Endpoints.ALL_BOARD_GAME_PLAYERS_COUNT,
      setPlayerCounts,
      'players_count'
    );
  }, []);

  return (
    <div className="filters games-filters">
      <FilterForm
        fields={[
          'Знижка',
          'Хіти продажу',
          'Національний кешбек',
          'Зимова єПідтримка',
          'єКнига',
        ]}
        formTitle="Фільтри"
      />

      {boardGameAge.length > 0 && (
        <FilterForm
          fields={boardGameAge.map((item) => item.age)}
          formTitle={'Вік'}
        />
      )}

      {boardGameBrands.length > 0 && (
        <form className="filters__form">
          <p className="filters__form-title">Бренд</p>
          <div className="filters__search-container">
            <input
              type="text"
              className="filters__search"
              placeholder="Пошук бренду"
            />
            <Image src="/icons/search.svg" alt="" width="17" height="17" />
          </div>

          {boardGameBrands.map((brand, index) => (
            <div className="filters__form-field" key={index}>
              <label className="filters__form-label custom-checkbox">
                <input type="checkbox" className="filters__form-checkbox" />
                <span className="filters__form-custom-box"></span>
                {brand.title}
              </label>
            </div>
          ))}

          <button className="filters__show-all">
            Показати всі
            <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
          </button>
        </form>
      )}

      {boardGameSeries.length > 0 && (
        <FilterForm
          fields={boardGameSeries.map((item) => item.title)}
          formTitle="Серія іграшок"
          isScroll={true}
        />
      )}

      {boardGameLanguages.length > 0 && (
        <FilterForm
          fields={boardGameLanguages}
          formTitle="Мова"
          isScroll={true}
        />
      )}

      <FilterForm
        fields={['Товари в наявності', 'Готові до відправки']}
        formTitle="Наявність"
      />

      {boardGameTypes.length > 0 && (
        <FilterForm fields={boardGameTypes} formTitle="Тип" isScroll={true} />
      )}

      {boardGameKinds.length > 0 && (
        <FilterForm fields={boardGameKinds} formTitle="Вид" isScroll={true} />
      )}

      {playerCounts.length > 0 && (
        <FilterForm
          fields={playerCounts}
          formTitle="Кількість гравців"
          isScroll={true}
        />
      )}
    </div>
  );
};

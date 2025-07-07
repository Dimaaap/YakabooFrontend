'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { FilterForm } from '.';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

export const Filters = ({ withPublishers = true, needLanguages = true }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData(Endpoints.ALL_BOOK_CATEGORIES, setCategories, 'categories');
  }, []);

  const categoriesTitle = useMemo(
    () => categories.map((category) => category.title),
    [categories]
  );

  const filtersFields = [
    'Новинки',
    'Знижка',
    'Хіти продажу',
    'Зимова ЄПідтримка',
    'єКнига',
    'Національний кешбек',
  ];

  return (
    <div className="filters games-filters">
      <FilterForm fields={filtersFields} formTitle="Фільтри" />

      {categories && (
        <FilterForm
          fields={categoriesTitle}
          formTitle="Категорія"
          isScroll={true}
        />
      )}

      <FilterForm fields={['Паперова', 'Електронна']} formTitle="Тип книги" />

      <FilterForm
        fields={['Товари в наявності', 'Готові до відправки']}
        formTitle="Наявність"
      />

      {withPublishers ? (
        <FilterForm
          fields={[
            'Книжковий клуб "Клуб Сімейного Дозвілля"',
            'Taylor & Francis',
            'Idea & Design Works',
            'Hodder',
            'Orion',
          ]}
          formTitle="Видавництва"
          isScroll={true}
          withSearch={true}
          searchPlaceholder="Пошук видавництва"
          withShowMore={true}
        />
      ) : (
        <FilterForm
          fields={[
            'Джоан Роулінг',
            'Сашко Дерманський',
            'Володимир Рутківський',
            'Андрій Кокотюха',
            'Джонатан Страуд',
          ]}
          formTitle="Автор"
          withSearch={true}
          searchPlaceholder="Пошук авторів"
          withShowMore={true}
        />
      )}

      {needLanguages && (
        <FilterForm
          fields={['Українська', 'Російська', 'Англійська']}
          formTitle="Мова"
        />
      )}

      <form className="filters__form">
        <p className="filters__form-title">Ціна</p>
        <div className="filters__field-row">
          <div className="filters__row">
            <span className="filters__price-label">Від</span>
            <input type="text" className="filters__price-field" />
          </div>
          <div className="filters__row">
            <span className="filters__price-label">До</span>
            <input type="text" className="filters__price-field" />
          </div>
        </div>

        <button className="filters__form-button" type="submit" disabled>
          Застосувати
        </button>
      </form>
    </div>
  );
};

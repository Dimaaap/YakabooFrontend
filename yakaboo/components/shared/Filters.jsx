'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterForm } from '.';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';
import { fromSearchParams, setArrayFilters, setValueFilter, toQueryString, useFilterStore } from '../../states/FilterState';
import { bookTypesFields, diffLevels, filtersFields, languageFields } from '../../site.config';
import { PriceInput } from './PriceInput';

export const Filters = ({ 
  needPublishers = true, 
  needLanguages = true, 
  needBookTypes = true, 
  needAuthors = true, 
  needCategories = true,
  needBrands = false,
  needTheme = false,
  needFilters = true,
  needPrice = true,
  needDifficultLevel= false,
  needAge = false
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useFilterStore()

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hobbyThemes, setHobbyThemes] = useState([]);
  const [authors, setAuthors] = useState([])
  const [publishings, setPublishings] = useState([]);
  const [age, setAge] = useState([])

  const fetchConfig = [
    { need: needCategories, endpoint: Endpoints.ALL_BOOK_CATEGORIES, setter: setCategories, key: "categories" },
    { need: needBrands, endpoint: Endpoints.ALL_HOBBY_BRANDS, setter: setBrands },
    { need: needTheme, endpoint: Endpoints.ALL_HOBBY_THEMES, setter: setHobbyThemes, key: "hobby_themes" },
    { need: needAuthors, endpoint: Endpoints.ALL_AUTHORS, setter: setAuthors },
    { need: needPublishers, endpoint: Endpoints.ALL_PUBLISHINGS, setter: setPublishings },
    { need: needAge, endpoint: Endpoints.ALL_BOARD_GAME_AGES, setter: setAge }
  ]

  useEffect(() => {
    fetchConfig.forEach(({ need, endpoint, setter, key }) => {
      if(need){
        fetchData(endpoint, setter, key)
      }
    })
  }, []);

  useEffect(() => {
    if(searchParams){
      fromSearchParams(searchParams)
    }
  }, [searchParams])
  

  const categoriesTitle = categories.map(c => c.title);
  const brandsTitle = brands.map(b => b.title);
  const themesTitle = hobbyThemes.map(t => t.value);
  const authorsName = authors.map(a => `${a.first_name} ${a.last_name}`);
  const publishingTitles = publishings.map(p => p.title);
  const gameAgesTitle = age.map(a => a.age);

  const applyFilters = () => {
    const queryString = toQueryString()
    router.push(`?${queryString}`, { shallow: true})
  }

  return (
    <div className="filters games-filters">
      { needFilters && (
        <FilterForm fields={filtersFields} formTitle="Фільтри"
        selected={filters.filters}
        onChange={(values) => setArrayFilters('filters', values)} />  
      ) }
      

      {categories && needCategories && (
        <FilterForm
          fields={categoriesTitle}
          formTitle="Категорія"
          isScroll={true}
          selected={filters.categories}
          onChange={(values) => setArrayFilters('categories', values)}
        />
      )}

      { needBookTypes && (
        <FilterForm 
        fields={bookTypesFields} 
        formTitle="Тип книги" 
        selected={ filters.bookTypes }
        onChange={(values) => setArrayFilters('bookTypes', values)}/>  
      ) }

      { needBrands && (
        <FilterForm 
          fields={ brandsTitle }
          formTitle="Бренди"
          withSearch={true}
          searchPlaceholder="Пошук бренду"
          withShowMore={true}
          selected={filters.brands}
          onChange={(values) => setArrayFilters('brands', values)}
        />
      ) }
      { needAge && (
        <FilterForm 
          fields={ gameAgesTitle }
          formTitle="Вік"
          selected={ filters.ages }
          onChange={ (values) => setArrayFilters("ages", values) }
        />
      ) }

      { needDifficultLevel && (
        <FilterForm 
          fields={ diffLevels }
          formTitle="Рівень складності"
          selected={ filters.difficultLevels }
          onChange={(values) => setArrayFilters("difficultLevels", values)}
          />
      ) }

      <form className="filters__form" onSubmit={e => e.preventDefault()}>
        <p className="filters__form-title">В наявності</p>
        <div className="filters__form-field">
          <label className="filters__form-label custom-checkbox">
            <input 
              type="checkbox"
              className="filters__form-checkbox"
              checked={filters.inStockOnly}
              onChange={() => setValueFilter('inStockOnly', !filters.inStockOnly)}
            />
            <span className="filters__form-custom-box"></span>
            Товари в наявності
          </label>
        </div>
      </form>
      

      {needPublishers ? (
        <FilterForm
          fields={ publishingTitles }
          formTitle="Видавництва"
          isScroll={true}
          withSearch={true}
          searchPlaceholder="Пошук видав..."
          withShowMore={true}
          selected={filters.publishers}
          onChange={(values) => setArrayFilters('publishers', values)}
        />
      ) : needAuthors ?  (
        <FilterForm
          fields={ authorsName }
          formTitle="Автор"
          withSearch={true}
          searchPlaceholder="Пошук авторів"
          withShowMore={true}
          selected={filters.authors}
          onChange={(values) => setArrayFilters('authors', values)}
        />
      ) : null}

      { needTheme && (
        <FilterForm 
        fields={ themesTitle }
        formTitle="Тематика"
        isScroll={ true }
        selected={ filters.themes }
        onChange={(values) => setArrayFilters('themes', values)}
        />
      ) }

      {needLanguages && (
        <FilterForm
          fields={ languageFields }
          formTitle="Мова"
          selected={filters.languages}
          onChange={(values) => setArrayFilters('languages', values)}
        />
      )}

      { needPrice && (
        <form className="filters__form"
        onSubmit={(e) => e.preventDefault()}>
          <p className="filters__form-title">Ціна</p>
          <div className="filters__field-row">
            <PriceInput label="Від" value={ filters.priceFrom } onChange={ (e) => setValueFilter('priceFrom', e.target.value) } />
            <PriceInput label="До" value={ filters.priceTo } onChange={ (e) => setValueFilter('priceTo', e.target.value) } />
          </div>
        </form>  
      ) }
      <button className="filters__form-button" type="submit" onClick={applyFilters}>
        Застосувати
      </button>
    </div>
  );
};

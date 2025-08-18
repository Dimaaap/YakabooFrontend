'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterForm } from '.';
import { fetchData } from '../../services';
import Endpoints from '../../endpoints';

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

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hobbyThemes, setHobbyThemes] = useState([]);
  const [authors, setAuthors] = useState([])
  const [publishings, setPublishings] = useState([]);
  const [age, setAge] = useState([])

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    publishers: [],
    languages: [],
    bookTypes: [],
    authors: [],
    themes: [],
    filters: [],
    difficultLevels: [],
    ages: [],
    inStockOnly: false,
    priceFrom: "",
    priceTo: ""
  })

  const updateArrayFilter = (key, values) => {
    setFilters(prev => ({...prev, [key]: values}))
  }

  const updateValueFilter = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}))
  }

  useEffect(() => {
    if(needCategories) {
      fetchData(Endpoints.ALL_BOOK_CATEGORIES, setCategories, 'categories');  
    } 
    if (needBrands){
      fetchData(Endpoints.ALL_HOBBY_BRANDS, setBrands)
    } 
    if(needTheme){
      fetchData(Endpoints.ALL_HOBBY_THEMES, setHobbyThemes, "hobby_themes")
    }

    if(needAuthors){
      fetchData(Endpoints.ALL_AUTHORS, setAuthors)
    }

    if(needPublishers){
      fetchData(Endpoints.ALL_PUBLISHINGS, setPublishings)
    }

    if(needAge) {
      fetchData(Endpoints.ALL_BOARD_GAME_AGES, setAge)
    }
  }, []);


  useEffect(() => {
    const getArray = name => {
      const value = searchParams.get(name);
      return value ? value.split(',') : []
    };

    setFilters({
      categories: getArray("categories"),
      brands: getArray("brands"),
      publishers: getArray("publishers"),
      languages: getArray('languages'),
      bookTypes: getArray("book_types"),
      authors: getArray("authors"),
      themes: getArray("themes"),
      filters: getArray("filters"),
      difficultLevels: getArray("difficulty_level"),
      ages: getArray("ages"),
      inStockOnly: searchParams.get('in_stock') === "true",
      priceFrom: searchParams.get("price_min") || "",
      priceTo: searchParams.get("price_max") || ""
    })
  }, [searchParams.toString()])

  const categoriesTitle = useMemo(
    () => categories.map((category) => category.title),
    [categories]
  );

  const brandsTitle = useMemo(
    () => brands.map((brand) => brand.title),
    [brands]
  )

  const themesTitle = useMemo(
    () => hobbyThemes.map((theme) => theme.value), [hobbyThemes]
  )

  const authorsName = useMemo(
    () => authors.map((author) => `${author.first_name} ${author.last_name}`), [authors]
  )

  const publishingTitles = useMemo(
    () => publishings.map((publishing) => publishing.title), [publishings]
  )

  const gameAgesTitle = useMemo(
    () => age.map((a) => a.title), [age]
  )

  const diffLevels = ["1", "2", "3", "4", "5"]


  const filtersFields = [
    'Новинки',
    'Знижка',
    'Хіти продажу',
    'Зимова ЄПідтримка',
    'єКнига',
    'Національний кешбек',
  ];

  const bookTypesFields = ["Паперова", "Електронна"]
  const languageFields = ["Українська", "Російська", "Англійська"]

  const applyFilters = () => {
    const queryParams = new URLSearchParams();

    if(filters.categories.length){
      queryParams.append('categories', filters.categories.join(','))
    }

    if(filters.brands.length){
      queryParams.append('brands', filters.brands.join(','))
    }

    if(filters.themes.length){
      queryParams.append('themes', filters.themes.join(','))
    }

    if(filters.languages.length){
      queryParams.append('languages', filters.languages.join(','))
    }

    if(filters.bookTypes.length){
      queryParams.append("book_types", filters.bookTypes.join(','))
    }

    if(filters.age.length) {
      queryParams.append("ages", filters.ages.join(','))
    }

    if(filters.filters.length){
      queryParams.append('filters', filters.filters.join(','))
    }

    if(filters.publishers.length){
      queryParams.append('publishers', filters.publishers.join(','))
    }

    if(filters.authors.length){
      queryParams.append('authors', filters.authors.join(','))
    }

    if(filters.difficultLevels.length){
      queryParams.append("difficulty_level", filters.difficultLevels.join(","))
    }

    if(filters.inStockOnly){
      queryParams.append("in_stock", "true")
    }

    if(filters.priceFrom){
      queryParams.append("price_min", filters.priceFrom)
    }

    if(filters.priceTo){
      queryParams.append("price_max", filters.priceTo)
    }

    const queryString = queryParams.toString()

    router.push(`?${queryString}`, { shallow: true })
    
  }

  return (
    <div className="filters games-filters">
      { needFilters && (
        <FilterForm fields={filtersFields} formTitle="Фільтри"
        selected={filters.filters}
        onChange={(values) => updateArrayFilter('filters', values)} />  
      ) }
      

      {categories && needCategories && (
        <FilterForm
          fields={categoriesTitle}
          formTitle="Категорія"
          isScroll={true}
          selected={filters.categories}
          onChange={(values) => updateArrayFilter('categories', values)}
        />
      )}

      { needBookTypes && (
        <FilterForm 
        fields={bookTypesFields} 
        formTitle="Тип книги" 
        selected={ filters.bookTypes }
        onChange={(values) => updateArrayFilter('bookTypes', values)}/>  
      ) }

      { needBrands && (
        <FilterForm 
          fields={ brandsTitle }
          formTitle="Бренди"
          withSearch={true}
          searchPlaceholder="Пошук бренду"
          withShowMore={true}
          selected={filters.brands}
          onChange={(values) => updateArrayFilter('brands', values)}
        />
      ) }

      { needAge && (
        <FilterForm 
          fields={ gameAgesTitle }
          forTitle="Вік"
          selected={ filters.ages }
          onChange={ (values) => updateArrayFilter("ages", values) }
        />
      ) }

      { needDifficultLevel && (
        <FilterForm 
          fields={ diffLevels }
          formTitle="Рівень складності"
          selected={ filters.difficultLevels }
          onChange={(values) => updateArrayFilter("difficultLevels", values)}
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
              onChange={() => updateValueFilter('inStockOnly', !filters.inStockOnly)}
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
          onChange={(values) => updateArrayFilter('publishers', values)}
        />
      ) : needAuthors ?  (
        <FilterForm
          fields={authorsName}
          formTitle="Автор"
          withSearch={true}
          searchPlaceholder="Пошук авторів"
          withShowMore={true}
          selected={filters.authors}
          onChange={(values) => updateArrayFilter('authors', values)}
        />
      ) : null}

      { needTheme && (
        <FilterForm 
        fields={ themesTitle }
        formTitle="Тематика"
        isScroll={ true }
        selected={ filters.themes }
        onChange={(values) => updateArrayFilter('themes', values)}
        />
      ) }

      {needLanguages && (
        <FilterForm
          fields={languageFields}
          formTitle="Мова"
          selected={filters.languages}
          onChange={(values) => updateArrayFilter('languages', values)}
        />
      )}

      { needPrice && (
        <form className="filters__form"
        onSubmit={(e) => e.preventDefault()}>
          <p className="filters__form-title">Ціна</p>
          <div className="filters__field-row">
            <div className="filters__row">
              <span className="filters__price-label">Від</span>
              <input 
              type="text" 
              className="filters__price-field" 
              value={ filters.priceFrom }
              onChange={ (e) => updateValueFilter('priceFrom', e.target.value) }/>
            </div>
            <div className="filters__row">
              <span className="filters__price-label">До</span>
              <input 
              type="text" 
              className="filters__price-field" 
              value={ filters.priceTo }
              onChange={ (e) => updateValueFilter('priceTo', e.target.value) }
              />
            </div>
          </div>
        </form>  
      ) }
      <button className="filters__form-button" type="submit" onClick={applyFilters}>
        Застосувати
      </button>
    </div>
  );
};

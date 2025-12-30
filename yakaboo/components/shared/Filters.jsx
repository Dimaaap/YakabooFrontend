'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  needAge = false,
  needAccessoriesBrands = false,
  needGiftBrands = false,
  needBookCategories = false, 
  bookCategories = null,
  categorySlug=null,
  subcategories=false
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useFilterStore();
  const pathname = usePathname();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hobbyThemes, setHobbyThemes] = useState([]);
  const [authors, setAuthors] = useState([])
  const [publishings, setPublishings] = useState([]);
  const [age, setAge] = useState([])
  const [accessoriesBrands, setAccessoriesBrands] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(true);  
  const [doubleSubcategoriesList, setDoubleSubcategoriesList] = useState(null);

  const fetchConfig = [
    { need: needCategories, endpoint: Endpoints.ALL_BOOK_CATEGORIES, setter: setCategories, key: "categories" },
    { need: needBrands || needGiftBrands, endpoint: needGiftBrands ? Endpoints.ALL_GIFT_BRANDS : Endpoints.ALL_HOBBY_BRANDS, setter: setBrands },
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
    if(needAccessoriesBrands){
      fetchData(Endpoints.ALL_ACCESSORIES_BRANDS, setAccessoriesBrands)
    }
  }, [])

  useEffect(() => {
    if(searchParams){
      fromSearchParams(searchParams)
    }
  }, [searchParams])

  const getDoubleSubcategorySlug = (href) => {
    const path = `${pathname}/${href}`
    return path
  }
  

  const categoriesTitle = categories.map(c => c.title);
  const brandsTitle = brands.map(b => b.title);
  const themesTitle = hobbyThemes.map(t => t.value);
  const authorsName = authors.map(a => `${a.first_name} ${a.last_name}`);
  const publishingTitles = publishings.map(p => p.title);
  const gameAgesTitle = age.map(a => a.age);
  const accessoriesBrandsTitle = accessoriesBrands.map(b => b.title)

  const applyFilters = () => {
    const queryString = toQueryString()
    router.push(`?${queryString}`, { shallow: true})
  }

  const onCheckboxChange = (filter, values, isArray=true) => {
    if(isArray){
      setArrayFilters(filter, values);
    } else {
      setValueFilter(filter, values)
    }
    applyFilters();
  }

  const toggleShowSubcategories = () => {
    if(showSubcategories){
      setShowSubcategories(false)
    } else {
      setShowSubcategories(true)
    }
  }

  const showDoubleSubcategoriesList = category => {
    if(doubleSubcategoriesList !== category){
      setDoubleSubcategoriesList(category);  
    } else {
      setDoubleSubcategoriesList(null);
    }
    
  }

  return (
    <div className="filters games-filters">
        <div className={`filters__book-subcategories ${!(needBookCategories && bookCategories?.length > 0) ? "hidden" : "" }`}>
          <div className={`filters__book-subcategories-header`}>
            <h6 className="filters__book-subcategories-title">Категорії книг</h6>  
            <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" 
            className={`${showSubcategories ? "rotated" : ""}`} 
            onClick={ () => toggleShowSubcategories() }/>
          </div>
          
          { showSubcategories && bookCategories?.length > 0? (
            bookCategories?.map((category, index) => (
              <div className="filters__book-subcategory" key={ index }>
                <div className={`filters__book-subcategory-container`}>
                  <div className="filters__book-subcategory-container-header">
                    <Link className="filters__book-subcategory-title" 
                    href={`${!subcategories ? `/book-categories/${categorySlug}/${category.slug}` : `${getDoubleSubcategorySlug(category.slug)}`}`}>
                      { category.title }
                    </Link>  
                    { category?.double_subcategories?.length > 0 ? 
                      (<Image src="/icons/arrow-left.svg" alt="" width="15" height="15" 
                        onClick={() => showDoubleSubcategoriesList(category.title)}
                        className={`${doubleSubcategoriesList === category.title ? "rotated" : ""}`} />) 
                      : 
                      <></> 
                    }
                  </div>
                  { doubleSubcategoriesList === category.title ? (
                    <div className="filters__book-subcategory-double-subcategories-list">
                      { category.double_subcategories.map((subcategory, index) => (
                        <Link href={`/book-categories/${categorySlug}/${category.slug}/${subcategory.slug}`} 
                        className="filters__book-subcategory-double-subcategories-title" 
                        key={ index }>
                          { subcategory.title }
                        </Link>
                      )) }
                    </div>
                  ) : <></> }
                </div>   
              </div>
            ))
          ): <></> }
          
        </div>

      { needFilters && (
        <FilterForm fields={filtersFields} formTitle="Фільтри"
        selected={filters.filters} objectFields={ true }
        onChange={(values) => onCheckboxChange("filters", values)} />  
      ) }
      

      {categories && needCategories && (
        <FilterForm
          fields={categoriesTitle}
          formTitle="Категорія"
          isScroll={true}
          selected={filters.categories}
          onChange={(values) => onCheckboxChange("categories", values)}
        />
      )}

      { accessoriesBrands && needAccessoriesBrands && (
        <FilterForm 
          fields={ accessoriesBrandsTitle }
          formTitle="Бренди"
          isScroll={ false }
          withSearch={ true }
          searchPlaceholder="Пошук бренду"
          withShowMore={ true }
          selected={ filters.accessoriesBrands }
          onChange={(values) => onCheckboxChange("accessoriesBrands", values)}
        />
      ) }

      { needBookTypes && (
        <FilterForm 
        fields={bookTypesFields} 
        formTitle="Тип книги" 
        selected={ filters.bookTypes }
        onChange={(values) => onCheckboxChange('bookTypes', values)}/>  
      ) }

      {  }

      { needBrands || needGiftBrands && (
        <FilterForm 
          fields={ brandsTitle }
          formTitle="Бренди"
          withSearch={true}
          searchPlaceholder="Пошук бренду"
          withShowMore={true}
          selected={filters.brands}
          onChange={(values) => onCheckboxChange('brands', values)}
        />
      ) }
      { needAge && (
        <FilterForm 
          fields={ gameAgesTitle }
          formTitle="Вік"
          selected={ filters.ages }
          onChange={ (values) => onCheckboxChange("ages", values) }
        />
      ) }

      { needDifficultLevel && (
        <FilterForm 
          fields={ diffLevels }
          formTitle="Рівень складності"
          selected={ filters.difficultLevels }
          onChange={(values) => onCheckboxChange("difficultLevels", values)}
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
              onChange={() => onCheckboxChange('inStockOnly', !filters.inStockOnly, false)}
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
          onChange={(values) => onCheckboxChange('publishers', values)}
        />
      ) : needAuthors ?  (
        <FilterForm
          fields={ authorsName }
          formTitle="Автор"
          withSearch={true}
          searchPlaceholder="Пошук авторів"
          withShowMore={true}
          selected={filters.authors}
          onChange={(values) => onCheckboxChange('authors', values)}
        />
      ) : null}

      { needTheme && (
        <FilterForm 
        fields={ themesTitle }
        formTitle="Тематика"
        isScroll={ true }
        selected={ filters.themes }
        onChange={(values) => onCheckboxChange('themes', values)}
        />
      ) }

      {needLanguages && (
        <FilterForm
          fields={ languageFields }
          formTitle="Мова"
          selected={filters.languages}
          onChange={(values) => onCheckboxChange('languages', values)}
        />
      )}

      { needPrice && (
        <form className="filters__form"
        // TODO: Виправити, щоб фільтр ціни не оновлювався при введенні нового символу в поле вводу, а лише після натискання на кнопку "Застосувати"
        onSubmit={(e) => e.preventDefault()}>
          <p className="filters__form-title">Ціна</p>
          <div className="filters__field-row">
            <PriceInput label="Від" value={ filters.priceFrom } onChange={ (e) => setValueFilter('priceFrom', e.target.value) } />
            <PriceInput label="До" value={ filters.priceTo } onChange={ (e) => setValueFilter('priceTo', e.target.value) } />
          </div>
          
          {/* TODO: Зробити, щоб при настиканні на кнопку додавались фільтри на мінімальну і максимальну ціни на книги */}
          <button className="filters__form-button" type="button" onClick={applyFilters}>
            Застосувати
          </button>
        </form>  
      ) }
    </div>
  );
};

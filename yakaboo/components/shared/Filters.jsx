'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterForm } from '.';
import Endpoints from '../../endpoints';
import { fromSearchParams, setArrayFilters, setValueFilter, toQueryString, useFilterStore } from '../../states/FilterState';
import { bookTypesFields, diffLevels, filtersFields, languageFields, STALE_TIME } from '../../site.config';
import { PriceInput } from './PriceInput';
import { useQueries } from '@tanstack/react-query';
import { fetcher } from '../../services/fetch.service';

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
  needBookSeria = false,
  bookCategories = null,
  categorySlug=null,
  subcategories=false
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useFilterStore();
  const pathname = usePathname();

  const [showSubcategories, setShowSubcategories] = useState(true);  
  const [doubleSubcategoriesList, setDoubleSubcategoriesList] = useState(null);
  const [priceFrom, setPriceFrom] = useState(0)
  const [priceTo, setPriceTo] = useState(4000);


  const fetchConfig = [
    {
      key: "categories",
      enabled: needCategories,
      endpoint: Endpoints.ALL_BOOK_CATEGORIES,
      dataKey: "categories"
    },
    {
      key: "brands",
      enabled: needBrands || needGiftBrands,
      endpoint: needGiftBrands ? Endpoints.ALL_GIFT_BRANDS : Endpoints.ALL_HOBBY_BRANDS
    },
    {
      key: "hobby_themes",
      enabled: needTheme,
      endpoint: Endpoints.ALL_HOBBY_THEMES
    },
    {
      key: "authors",
      enabled: needAuthors,
      endpoint: Endpoints.ALL_AUTHORS
    },
    {
      key: "publishing",
      enabled: needPublishers,
      endpoint: Endpoints.ALL_PUBLISHINGS
    },
    {
      key: "ages",
      enabled: needAge,
      endpoint: Endpoints.ALL_BOARD_GAME_AGES
    },
    {
      key: "accessoriesBrands",
      enabled: needAccessoriesBrands,
      endpoint: Endpoints.ALL_ACCESSORIES_BRANDS
    },
    {
      key: "book_series",
      enabled: needBookSeria,
      endpoint: Endpoints.ALL_SERIES
    }
  ]

  const queries = useQueries({
    queries: fetchConfig.map(
      ({key, endpoint, enabled, dataKey}) => ({
        queryKey: [key],
        queryFn: () => fetcher(endpoint),
        enabled,
        staleTime: STALE_TIME
      })
    )
  })

  useEffect(() => {
    if(searchParams){
      fromSearchParams(searchParams)
    }
  }, [searchParams])

  const getDoubleSubcategorySlug = (href) => {
    const path = `${pathname}/${href}`
    return path
  }

  const [categoriesQuery, brandsQuery, hobbyThemesQuery, authorsQuery, publishingsQuery, 
    agesQuery, accessoriesBrandsQuery, bookSeriesQuery] = queries

  const categories = categoriesQuery?.data ?? [];
  const brands = brandsQuery?.data ?? [];
  const authors = authorsQuery?.data ?? [];
  const publishings = publishingsQuery?.data ?? [];
  const ages = agesQuery?.data ?? [];
  const accessoriesBrands = accessoriesBrandsQuery?.data ?? [];
  const hobbyThemes = hobbyThemesQuery?.data ?? [];
  const bookSeries = bookSeriesQuery?.data ?? [];
  

  const categoriesTitle = categories.map(c => c.title);
  const brandsTitle = brands.map(b => b.title);
  const themesTitle = hobbyThemes.map(t => t.value);
  const authorsName = authors.map(a => `${a.first_name} ${a.last_name}`);
  const publishingTitles = publishings.map(p => p.title);
  const gameAgesTitle = ages.map(a => a.age);
  const accessoriesBrandsTitle = accessoriesBrands.map(b => b.title)
  const bookSeriesTitle = bookSeries.map(s => s.title)

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

  const handleChangePrice = () => {

    if(priceFrom){
      setValueFilter("priceFrom", priceFrom)
    } 
    if(priceTo){
      setValueFilter("priceTo", priceTo)
    }

    applyFilters();
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
                    href={`${!subcategories ? `/book-categories/${categorySlug ? categorySlug + "/" : ''}${category.slug}` : `${getDoubleSubcategorySlug(category.slug)}`}`}>
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
                        <Link href={`/book-categories/${categorySlug || ""}/${category.slug}/${subcategory.slug}`} 
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
      

      {needPublishers && (
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
      )}

      {needAuthors &&  (
        <FilterForm
          fields={ authorsName }
          formTitle="Автор"
          withSearch={true}
          searchPlaceholder="Пошук авторів"
          withShowMore={true}
          selected={filters.authors}
          onChange={(values) => onCheckboxChange('authors', values)}
        />
      )}

      {needBookSeria && (
        <FilterForm 
          fields={ bookSeriesTitle }
          fortTitle="Серія книг"
          withSearch={ true }
          searchPlaceholder="Пошук серії"
          withShowMore={ true }
          selected={ filters.series }
          onChange={(values) => onCheckboxChange("series", values)}
          />
      )}

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
        onSubmit={(e) => e.preventDefault()}>
          <p className="filters__form-title">Ціна</p>
          <div className="filters__field-row">
            <PriceInput label="Від" value={ filters.priceFrom } onChange={ (e) => setPriceFrom(e.target.value) } />
            <PriceInput label="До" value={ filters.priceTo } onChange={ (e) => setPriceTo(e.target.value) } />
          </div>
          
          <button className="filters__form-button" type="button" onClick={() => handleChangePrice()}>
            Застосувати
          </button>
        </form>  
      ) }
    </div>
  );
};

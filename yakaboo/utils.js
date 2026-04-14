import Endpoints from './endpoints';
import { CookiesWorker } from './services';
import { bookTypesFields, filtersFields } from './site.config';

export const getUserFullName = () => {
  const firstName = CookiesWorker.get('first_name');
  const lastName = CookiesWorker.get('last_name');

  return `${firstName} ${lastName}`;
};

export const getUniqueErrorField = (errorStr) => {
  const errorField = errorStr.msg?.split(':')[1];
  return errorField?.trim();
};

export const formatLocalDate = (dateStr) => {
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const date = new Date(dateStr);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}р.`;
};

export const SORTING_ORDERS = [
  {id: "popular", label: "За популярністю"},
  {id: "new", label: "За новизною"},
  {id: "discount", label: "За знижкою"},
  {id: "cheap", label: "Від найдешевших"},
  {id: "expensive", label: "Від найдорожчих"}
]


export const getBookAuthor = (book) => {
    return `${book?.authors[0]?.first_name} ${book?.authors[0]?.last_name}`;
}

export const getFilterLabel = (key, selectedFilters) => {
        let filterLabel = null;
        
        if(key.key === "filters") {
            const found = filtersFields.find(val => val.value === key.value);
            filterLabel = found?.label;
        } else if(key.key === "bookTypes"){
            const found = bookTypesFields.find(val => val === key.value);
            filterLabel = found;
        } else if(key.key === "inStockOnly"){
            filterLabel = "В наявності"
        } else if( key.key === "priceFrom" || key.key === "priceTo"){
            filterLabel = `${selectedFilters.find(item => item.key === "priceFrom")?.value || 0} грн - 
            ${selectedFilters.find(item => item.key === "priceTo")?.value || 3000} грн`
        } else {
            filterLabel = key.value;
        }

        return filterLabel
    }


export const getEndpoint = (source) => {
    switch(source.type){
        case "all":
        return Endpoints.ALL_BOOKS
    case "category":
        return Endpoints.CATEGORY_BOOKS_BY_SLUG(source?.slug)
    case "subcategory":
        return Endpoints.SUBCATEGORY_BOOKS(source?.slug)
    case "double_subcategory":
        return Endpoints.DOUBLE_SUBCATEGORY_BOOK(source?.slug)
    case "author":
        return Endpoints.AUTHOR_BOOKS(source.id)
    case "series":
        return Endpoints.ALL_SERIA_BOOKS(source.slug)
    case "publishing":
        return Endpoints.ALL_PUBLISHING_BOOKS(source.id)
    case "translator":
        return Endpoints.TRANSLATOR_BOOKS(source?.id);
    case "illustrator":
        return Endpoints.ILLUSTRATOR_BOOK(source?.id);
    }
}


export const updateQueryParam = (searchParams, key, value) => {
  const params = new URLSearchParams(searchParams.toString());

  if (!value || (Array.isArray(value) && !value.length)) {
    params.delete(key);
  } else if (Array.isArray(value)) {
    params.set(key, value.join(","));
  } else if (typeof value === "boolean") {
    value ? params.set(key, "true") : params.delete(key);
  } else {
    params.set(key, value);
  }

  return params.toString();
};


export const getFetchConfig = (
    needCategories, needBrands, needTheme, 
    needAuthors, needPublishers, needAge, needAccessoriesBrands, 
    needBookSeria, needGiftBrands=null
) => {
    return [
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
}

export const getDoubleSubcategorySlug = (href, pathname) => {
    const path = `${pathname}/${href}`
    return path
}
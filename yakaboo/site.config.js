export const ImagesLinks = {
    BONUS: "/icons/bonus.svg",
    CHEVRON_DOWN: "/icons/chevron-down.svg",
    DEFAULT_IMAGE: "/images/default-image.jpg",
    FAVOURITE_IMAGE: "/icons/heart.svg"
}

export const ImagesConfig = {
    DEFAULT_WIDTH: "20",
    DEFAULT_HEIGHT: "20"
}

export const HrefsConfig =  {
    childrenBrand: (brandSlug) => `/children-brand/view/${brandSlug}`,
    agePage: (ageSlug) =>`/age/${ageSlug}`
}

export const filtersMapping = {
    categories: "categories",
    brands: "brands",
    publishers: "publishers",
    languages: "languages",
    bookTypes: "bookTypes",
    authors: "authors",
    themes: "themes",
    filters: "filters",
    difficultLevels: "difficulty_level",
    ages: "ages",
    inStockOnly: "in_stock",
    priceFrom: "price_min",
    priceTo: "price_max"
}

export const initialState = {
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
}

export const diffLevels = ["1", "2", "3", "4", "5"]

export const filtersFields = [
    'Новинки',
    'Знижка',
    'Хіти продажу',
    'Зимова ЄПідтримка',
    'єКнига',
    'Національний кешбек',
];

export const bookTypesFields = ["Паперова", "Електронна"]
export const languageFields = ["Українська", "Російська", "Англійська"]

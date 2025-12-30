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
    giftBrand: (brandSlug) => `/knyzhkovi-aksesuary/brands/view/${brandSlug}`,
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
    accessoriesBrands: "accessories_brands",
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
    accessoriesBrands: [],
    inStockOnly: false,
    priceFrom: "",
    priceTo: ""
}

export const diffLevels = ["1", "2", "3", "4", "5"]

export const filtersFields = [
    { value: "news", label: "Новинки" },
    { value: "promo", label: "Знижки" },
    { value: "hits", label: "Хіти продажу" },
    { value: "winter-esupport", label: "Зимова ЄПідтримка" },
    { value: "ebook", label: "ЄКнига" },
    { value: "national-kashback", label: "Національний кешбек" }
];

export const bookTypesFields = ["Паперова", "Електронна"]
export const languageFields = ["Українська", "Російська", "Англійська"]


export const badgeColors = {
    purple: "rgb(175, 57, 231)",
    green: "#51a261ff",
    blue: "rgb(51, 51, 119)"
}

export const STALE_TIME = 1000 * 60 * 5;
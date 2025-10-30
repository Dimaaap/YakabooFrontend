const DOMAIN = "http://localhost:8006/"


const BoardGames = {
  ALL_BOARD_GAME_AGES: `${DOMAIN}game-ages/all`,
  ALL_BOARD_GAME_BRANDS: `${DOMAIN}game-brands/all`,
  ALL_BOARD_GAME_SERIES: `${DOMAIN}game-series/all`,
  ALL_BOARD_GAME_LANGUAGES: `${DOMAIN}game-ages/languages/all`,
  ALL_BOARD_GAME_TYPES: `${DOMAIN}game-ages/types/all`,
  ALL_BOARD_GAME_KINDS: `${DOMAIN}game-ages/kinds/all`,
  ALL_BOARD_GAME_PLAYERS_COUNT:`${DOMAIN}game-ages/players-count/all`,
}

const Accessories = {
  ALL_ACCESSORIES: `${DOMAIN}accessories/all`,
  ALL_ACCESSORIES_CATEGORIES: `${DOMAIN}accessories-categories/all`,
  ALL_ACCESSORIES_BRANDS: `${DOMAIN}accessories-brands/all`,
}

const Gifts = {
  ALL_GIFT_BRANDS: `${DOMAIN}gift_brands/all`,
  ALL_GIFT_CATEGORIES: `${DOMAIN}gift-categories/all`,
  ALL_GIFTS: `${DOMAIN}gifts/all`,
  GIFT: (giftSlug) => `${DOMAIN}gifts/by-slug/${giftSlug}`,
  GIFT_BRAND: (brandSlug) => `${DOMAIN}gift_brands/gifts/${brandSlug}`,
  GIFT_CATEGORY: (categorySlug) => `${DOMAIN}gift-categories/gifts/${categorySlug}`,
  GIFT_SUBCATEGORY: (subcategorySlug) => `${DOMAIN}gift-subcategories/gifts/${subcategorySlug}`,
  SEARCH_GIFT_BRAND: (query) => `${DOMAIN}gift_brands/search?query=${query}`
}

const Hobbies = {
  ALL_HOBBY_CATEGORIES: `${DOMAIN}hobby-categories/all`,
  ALL_HOBBY_BRANDS: `${DOMAIN}hobby-brands/all`,
  ALL_HOBBIES: `${DOMAIN}hobbies/all`,
  ALL_HOBBY_THEMES: `${DOMAIN}hobbies/all-hobby-themes`,
}

const Auth = {
  USER_REGISTER: `${DOMAIN}auth/signup`,
  USER_LOGIN: `${DOMAIN}auth/jwt/login`,
  PHONE_NUMBER_VERIFICATION: `${DOMAIN}auth/verify-sms-code`,
  JWT_REFRESH_TOKEN: `${DOMAIN}auth/jwt/refresh`,
  CHECK_ACCESS_TOKEN: `${DOMAIN}auth/jwt/verify-token`,
  USER_CHANGE_PASSWORD: `${DOMAIN}auth/user/change-password`,
  CHANGE_PASSWORD_WITH_EMAIL: `${DOMAIN}auth/user/change-password-with-email`,
  USER_LOGOUT: `${DOMAIN}auth/jwt/logout`,
}

const Promotions = {
  ALL_PROMOTIONS: `${DOMAIN}promotions/all`,
  ALL_PROMO_CATEGORIES: `${DOMAIN}promo_categories/all`,
  PROMOTION: (promoSlug) => `${DOMAIN}promotions/by-slug/${promoSlug}`
}

const Notebooks = {
  ALL_NOTEBOOK_CATEGORIES: `${DOMAIN}notebook_categories/all`,
  ALL_NOTEBOOKS: `${DOMAIN}books/notebooks/all`,
  NOTEBOOK_CATEGORY: (categorySlug) => `${DOMAIN}notebook_categories/books/${categorySlug}`,
  NOTEBOOK: (notebookSlug) => `${DOMAIN}books/notebook/${notebookSlug}`,
  NOTEBOOK_SUBCATEGORY: (subcategorySlug) => `${DOMAIN}subcategory/notebooks/${subcategorySlug}`
}

const Knowledge = {
  SIDEBAR_KNOWLEDGE: `${DOMAIN}knowledge/in-sidebar`,
  KNOWLEDGE: (knowledgeSlug) => `${DOMAIN}knowledge/slug?slug=${knowledgeSlug}`
}

const Authors = {
  ALL_AUTHORS: `${DOMAIN}authors/all`,
  AUTHOR_BOOKS: (authorId) => `${DOMAIN}authors/author/${authorId}/books`,
  AUTHOR: (authorSlug) => `${DOMAIN}authors/${authorSlug}`,
  AUTHOR_IMAGES: (authorId) => `${DOMAIN}authors/${authorId}/images`,
  AUTHOR_FACTS: (authorId) => `${DOMAIN}author_facts/author/${authorId}`,
  SEARCH_AUTHORS: (activeLetter) => `${DOMAIN}authors/first-letter/${activeLetter || 'А'}`
}

const Publishings = {
  SEARCH_PUBLISHING: (activeLetter) => `${DOMAIN}publishing/first-letter/${activeLetter || 'А'}`,
  ALL_PUBLISHING_BOOKS:(publishingId) => `${DOMAIN}publishing/${publishingId}/books`,
  PUBLISHING_BY_SLUG: (publishingSlug) => `${DOMAIN}publishing/${publishingSlug}`
}
 
const Translators = {
  SEARCH_TRANSLATOR: (query) => `${DOMAIN}translators/search/?query=${query}`,
  TRANSLATOR: (translatorSlug) => `${DOMAIN}translators/${translatorSlug}`,
  TRANSLATOR_BOOKS: (translatorId) => `${DOMAIN}translators/translator/${translatorId}/books`
}

const Defaults = {
  ALL_SIDEBARS: `${DOMAIN}sidebars/all`,
  VISIBLE_SIDEBARS: `${DOMAIN}sidebars/visible`,
  ALL_INTERESTING: `${DOMAIN}interesting/all`,
  ALL_FOOTER_LINKS: `${DOMAIN}footers/all`,
  ALL_BANNERS: `${DOMAIN}banners/all`,
  ALL_BOOK_CATEGORIES: `${DOMAIN}categories/all`,
  ALL_CONTACTS: `${DOMAIN}contacts/all`,
  ALL_COUNTRIES: `${DOMAIN}countries/all`,
  ALL_LITERATURE_PERIODS: `${DOMAIN}literature_period/all`,
  ALL_TRANSLATORS: `${DOMAIN}translators/all`,
  ALL_PUBLISHINGS: `${DOMAIN}publishing/all`,
  BOOK_CATEGORIES: (hoverCategoryId) => `${DOMAIN}categories/${hoverCategoryId}/subcategories`
}

const Wishlists = {
  CREATE_WISHLIST: `${DOMAIN}wishlist/create`,
  DELETE_WISHLIST: (id) => `${DOMAIN}wishlist/${id}`,
  USER_WISHLISTS: (userEmail) => `${DOMAIN}wishlist/${userEmail}`,
  ADD_BOOK_TO_WISHLIST: (wishlistId, bookId) => `${DOMAIN}wishlist/${wishlistId}/books/${bookId}`,
  ALL_WISHLIST_BOOKS: (wishlistId) => `${DOMAIN}wishlist/${wishlistId}/books`,
  DELETE_BOOK_FROM_WISHLIST: (wishlistId, bookId) => `${DOMAIN}wishlist/${wishlistId}/books/${bookId}`
}

const LiteraturePeriods = {
  LITERATURE_PERIOD: (periodSlug) => `${DOMAIN}literature_period/${periodSlug}`,
  LITERATURE_PERIOD_BOOKS: (periodId) => `${DOMAIN}literature_period/period/${periodId}/books`
}

const BookSeries = {
  BOOK_SERIA: (seriaSlug) => `${DOMAIN}book_series/${seriaSlug}`,
  ALL_SERIA_BOOKS: (seriaSlug) => `${DOMAIN}book_series/books/${seriaSlug}`,
  ALL_SERIES: `${DOMAIN}book_series/all`,
  SEARCH_SERIA: (query) => `${DOMAIN}book_series/search/?query=${query}`
}

const Books = {
  BOOK_BY_SLUG: (bookSlug) => `${DOMAIN}books/${bookSlug}`
}

const Illustrators = {
  ILLUSTRATOR: (illustratorSlug) => `${DOMAIN}illustrators/${illustratorSlug}`,
  ILLUSTRATOR_BOOK: (illustratorId) => `${DOMAIN}illustrators/illustrator/${illustratorId}/books`,
  SEARCH_ILLUSTRATOR: (query) => `${DOMAIN}illustrators/search/?query=${query}`,
  ALL_ILLUSTRATORS: `${DOMAIN}illustrators/all`
}

const BookCategories = {
  CATEGORY_BY_SLUG: (categorySlug) => `${DOMAIN}categories/by-slug/${categorySlug}`,
  CATEGORY_BOOKS: (categoryId) => `${DOMAIN}categories/books/${categoryId}`
}

const BookSubcategories = {
  SUBCATEGORY_BY_SLUG: (subcategorySlug) => `${DOMAIN}subcategories/${subcategorySlug}`,
  SUBCATEGORY_BOOKS: (subcategorySlug) => `${DOMAIN}subcategories/subcategory/by-slug/${subcategorySlug}/books`,
  DOUBLE_SUBCATEGORIES: (subcategoryId) => `${DOMAIN}subcategories/subcategory/double_subcategories/${subcategoryId}`
}


const Endpoints = {
  ...BoardGames,
  ...Accessories,
  ...Gifts,
  ...Hobbies,
  ...Auth,
  ...Promotions,
  ...Notebooks,
  ...Defaults,
  ...Knowledge,
  ...Authors,
  ...Publishings,
  ...Translators,
  ...Wishlists,
  ...LiteraturePeriods,
  ...BookSeries,
  ...Books,
  ...Illustrators,
  ...BookCategories,
  ...BookSubcategories,
  ACTIVE_TITLE: `${DOMAIN}page-title/active`
};

export default Endpoints;

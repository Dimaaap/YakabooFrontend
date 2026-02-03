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
  GET_USER_BY_EMAIL: (userEmail) => `${DOMAIN}auth/by-email/${userEmail}`
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
  ALL_BOOK_CATEGORIES: `${DOMAIN}categories/all`,
  ALL_CONTACTS: `${DOMAIN}contacts/all`,
  ALL_COUNTRIES: `${DOMAIN}countries/all`,
  ALL_LITERATURE_PERIODS: `${DOMAIN}literature_period/all`,
  ALL_TRANSLATORS: `${DOMAIN}translators/all`,
  ALL_PUBLISHINGS: `${DOMAIN}publishing/all`,
  BOOK_CATEGORIES: (hoverCategoryId) => `${DOMAIN}categories/${hoverCategoryId}/subcategories`
}

const Banners = {
  MAIN_PAGE_BANNERS: `${DOMAIN}banners/all`,
  ALL_BOOKS_BANNERS: `${DOMAIN}banners/all/books-page`
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
  ALL_BOOKS: `${DOMAIN}books/all`,
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
  CATEGORY_BOOKS: (categoryId) => `${DOMAIN}categories/books/${categoryId}`,
  CATEGORY_BOOKS_BY_SLUG: (categorySlug) => `${DOMAIN}categories/books/by-slug/${categorySlug}`
}

const BookSubcategories = {
  SUBCATEGORY_BY_SLUG: (subcategorySlug) => `${DOMAIN}subcategories/${subcategorySlug}`,
  SUBCATEGORY_BOOKS: (subcategorySlug) => `${DOMAIN}subcategories/subcategory/by-slug/${subcategorySlug}/books`,
  DOUBLE_SUBCATEGORIES: (subcategoryId) => `${DOMAIN}subcategories/subcategory/double_subcategories/${subcategoryId}`
}

const BookDoubleSubcategories = {
  DOUBLE_SUBCATEGORY_BOOK: (doubleSubcategorySlug) => `${DOMAIN}double_subcategories/double_subcategory/by-slug/${doubleSubcategorySlug}/books`,
  DOUBLE_SUBCATEGORY_BY_SLUG: (doubleSubcategorySlug) => `${DOMAIN}double_subcategories/${doubleSubcategorySlug}`
}

const Cart = {
  CART_ITEMS: (userEmail) => `${DOMAIN}cart/cart-items/all?user_email=${userEmail}`,
  CLEAR_CART: (userEmail) => `${DOMAIN}cart/clear?user_email=${userEmail}`,
  DELETE_ITEM_FROM_CART: (userEmail, bookId) => `${DOMAIN}cart-item/delete?book_id=${bookId}&user_email=${userEmail}`,
  UPDATE_BOOK_QUANTITY: (userEmail, bookId, newQuantity) => `${DOMAIN}cart-item/update?book_id=${bookId}&user_email=${userEmail}&quantity=${newQuantity}`
}

const UkrpostOffices = {
  ALL_OFFICES: `${DOMAIN}ukrpost_offices/all`,
  OFFICES_BY_CITY_ID: (cityId) => `${DOMAIN}ukrpost_offices/by-city/${cityId}`
}

const MeestPostOffices = {
  MEEST_ALL_OFFICES: `${DOMAIN}meest_post_offices/all`,
  MEEST_OFFICES_BY_CITY_ID: (cityId) => `${DOMAIN}meest_post_offices/by-city/${cityId}`
}

const NewPostPostomats = {
  NEW_POST_ALL_POSTOMATS: `${DOMAIN}new_post_postomats/all`,
  NEW_POST_POSTOMAT_BY_CITY_ID: (cityId) => `${DOMAIN}new_post_postomats/by-city/${cityId}`
}

const NewPostOffices = {
  NEW_POST_ALL_OFFICES: `${DOMAIN}new_post_offices/all`,
  NEW_POST_OFFICE_BY_CITY_ID: (cityId) => `${DOMAIN}new_post_offices/by-city/${cityId}`
}

const UserSeenBooks = {
  ALL_USER_SEEN_BOOKS: (userEmail) => userEmail ? `${DOMAIN}user-seen-books/all/${userEmail}` : "",
  ADD_BOOK_TO_USER_SEEN_BOOKS: (userEmail, bookId) => `${DOMAIN}user-seen-books/add?user_email=${userEmail}&book_id=${bookId}`
}

const ReviewReactions = {
  ADD_REACTION_TO_REVIEW: (reviewId, isLike, userEmail) => `${DOMAIN}reviews-reactions/${reviewId}/react?is_like=${isLike}&user_email=${userEmail}`,
  GET_USER_REACTION_TO_REVIEW: (reviewId, userEmail) => `${DOMAIN}reviews-reactions/${reviewId}/my-reaction?user_email=${userEmail}`
}

const UserSearchStory = {
  USER_SEARCH_STORY: (userEmail) => `${DOMAIN}user-search-story/all/${userEmail}`,
  CLEAR_USER_SEARCH_STORY: (userEmail) => `${DOMAIN}user-search-story/update/${userEmail}`
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
  ...Banners,
  ...LiteraturePeriods,
  ...BookSeries,
  ...Books,
  ...Illustrators,
  ...BookCategories,
  ...BookSubcategories,
  ...BookDoubleSubcategories,
  ...Cart,
  ...UkrpostOffices,
  ...MeestPostOffices,
  ...NewPostPostomats,
  ...NewPostOffices,
  ...UserSeenBooks,
  ...ReviewReactions,
  ...UserSearchStory,
  ACTIVE_TITLE: `${DOMAIN}page-title/active`,
  USE_PROMO_CODE: (userEmail, promoCode) => `${DOMAIN}promo-codes-usage/use?user_email=${userEmail}&code=${promoCode}`,
  GET_PROMO_CODE_BY_ID: (promoId) => `${DOMAIN}promo-codes/by-id/${promoId}`,
  ADD_REVIEW: `${DOMAIN}reviews/create`,
  SUBSCRIBE_USER_EMAIL: `${DOMAIN}subs/create`,
  BOOKS_TEXT: `${DOMAIN}book_text/`,
  SEARCH: (query, user_email) => `${DOMAIN}search/${user_email}?q=${query}`
};

export default Endpoints;

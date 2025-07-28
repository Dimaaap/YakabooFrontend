const Endpoints = {
  ALL_SIDEBARS: 'http://127.0.0.1:8006/sidebars/all',
  ALL_INTERESTING: 'http://127.0.0.1:8006/interesting/all',
  ALL_FOOTER_LINKS: 'http://127.0.0.1:8006/footers/all',
  ALL_BANNERS: 'http://127.0.0.1:8006/banners/all',
  ALL_BOOK_CATEGORIES: 'http://127.0.0.1:8006/categories/all',
  ALL_PROMOTIONS: 'http://127.0.0.1:8006/promotions/all',
  ALL_PROMO_CATEGORIES: 'http://127.0.0.1:8006/promo_categories/all',
  USER_REGISTER: 'http://localhost:8006/auth/signup',
  USER_LOGIN: 'http://localhost:8006/auth/jwt/login',
  PHONE_NUMBER_VERIFICATION: 'http://localhost:8006/auth/verify-sms-code',
  JWT_REFRESH_TOKEN: 'http://localhost:8006/auth/jwt/refresh',
  CHECK_ACCESS_TOKEN: 'http://localhost:8006/auth/jwt/verify-token',
  USER_CHANGE_PASSWORD: 'http://localhost:8006/auth/user/change-password',
  CREATE_WISHLIST: 'http://localhost:8006/wishlist/create',
  CHANGE_PASSWORD_WITH_EMAIL:
    'http://localhost:8006/auth/user/change-password-with-email',
  USER_LOGOUT: 'http://localhost:8006/auth/jwt/logout',
  ALL_BOARD_GAME_AGES: 'http://localhost:8006/game-ages/all',
  ALL_BOARD_GAME_BRANDS: 'http://localhost:8006/game-brands/all',
  ALL_BOARD_GAME_SERIES: 'http://localhost:8006/game-series/all',
  ALL_BOARD_GAME_LANGUAGES: 'http://localhost:8006/game-ages/languages/all',
  ALL_BOARD_GAME_TYPES: 'http://localhost:8006/game-ages/types/all',
  ALL_BOARD_GAME_KINDS: 'http://localhost:8006/game-ages/kinds/all',
  ALL_BOARD_GAME_PLAYERS_COUNT:
    'http://localhost:8006/game-ages/players-count/all',
  ALL_CONTACTS: 'http://localhost:8006/contacts/all',
  ALL_COUNTRIES: 'http://localhost:8006/countries/all',
  ALL_LITERATURE_PERIODS: "http://localhost:8006/literature_period/all"
};

export default Endpoints;

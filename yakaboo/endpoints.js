const Endpoints = {
  ALL_SIDEBARS: 'http://127.0.0.1:8004/sidebars/all',
  ALL_INTERESTING: 'http://127.0.0.1:8004/interesting/all',
  ALL_FOOTER_LINKS: 'http://127.0.0.1:8004/footers/all',
  ALL_BANNERS: 'http://127.0.0.1:8004/banners/all',
  ALL_BOOK_CATEGORIES: 'http://127.0.0.1:8004/categories/all',
  ALL_PROMOTIONS: 'http://127.0.0.1:8004/promotions/all',
  ALL_PROMO_CATEGORIES: 'http://127.0.0.1:8004/promo_categories/all',
  USER_REGISTER: 'http://localhost:8004/auth/signup',
  USER_LOGIN: 'http://localhost:8004/auth/jwt/login',
  PHONE_NUMBER_VERIFICATION: 'http://localhost:8004/auth/verify-sms-code',
  JWT_REFRESH_TOKEN: 'http://localhost:8004/auth/jwt/refresh',
  CHECK_ACCESS_TOKEN: 'http://localhost:8004/auth/jwt/verify-token',
  USER_CHANGE_PASSWORD: 'http://localhost:8004/auth/user/change-password',
  CREATE_WISHLIST: 'http://localhost:8004/wishlist/create',
  CHANGE_PASSWORD_WITH_EMAIL:
    'http://localhost:8004/auth/user/change-password-with-email',
  USER_LOGOUT: 'http://localhost:8004/auth/jwt/logout',
  ALL_BOARD_GAME_AGES: 'http://localhost:8004/game-ages/all',
  ALL_BOARD_GAME_BRANDS: 'http://localhost:8004/game-brands/all',
  ALL_BOARD_GAME_SERIES: 'http://localhost:8004/game-series/all',
  ALL_BOARD_GAME_LANGUAGES: 'http://localhost:8004/game-ages/languages/all',
  ALL_BOARD_GAME_TYPES: 'http://localhost:8004/game-ages/types/all',
  ALL_BOARD_GAME_KINDS: 'http://localhost:8004/game-ages/kinds/all',
  ALL_BOARD_GAME_PLAYERS_COUNT:
    'http://localhost:8004/game-ages/players-count/all',
  ALL_CONTACTS: 'http://localhost:8004/contacts/all',
  ALL_COUNTRIES: 'http://localhost:8004/countries/all',
};

export default Endpoints;

const Endpoints = {
    ALL_SIDEBARS: "http://127.0.0.1:8003/sidebars/all",
    ALL_INTERESTING: "http://127.0.0.1:8003/interesting/all",
    ALL_FOOTER_LINKS: "http://127.0.0.1:8003/footers/all",
    ALL_BOOK_CATEGORIES: "http://127.0.0.1:8003/categories/all",
    ALL_PROMOTIONS: "http://127.0.0.1:8003/promotions/all",
    ALL_PROMO_CATEGORIES: "http://127.0.0.1:8003/promo_categories/all",
    USER_REGISTER: "http://localhost:8003/auth/signup",
    USER_LOGIN: "http://localhost:8003/auth/jwt/login",
    PHONE_NUMBER_VERIFICATION: "http://localhost:8003/auth/verify-sms-code",
    JWT_REFRESH_TOKEN: "http://localhost:8003/auth/jwt/refresh",
    CHECK_ACCESS_TOKEN: "http://localhost:8003/auth/jwt/verify-token",
    USER_CHANGE_PASSWORD: "http://localhost:8003/auth/user/change-password",
    CREATE_WISHLIST: "http://localhost:8003/wishlist/create",
    CHANGE_PASSWORD_WITH_EMAIL: "http://localhost:8003/auth/user/change-password-with-email",
    USER_LOGOUT: "http://localhost:8003/auth/jwt/logout",
    ALL_BOARD_GAME_AGES: "http://localhost:8003/game-ages/all",
    ALL_BOARD_GAME_BRANDS: "http://localhost:8003/game-brands/all",
    ALL_BOARD_GAME_SERIES: "http://localhost:8003/game-series/all",
    ALL_BOARD_GAME_LANGUAGES: 'http://localhost:8003/game-ages/languages/all'
}

export default Endpoints;
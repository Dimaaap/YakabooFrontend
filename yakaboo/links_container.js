const myAccountRoutes = {
    USER_ORDERS: "/my-account/orders",
    USER_LIBRARY: "/my-account/library",
    USER_WISHLIST: "/my-account/wishlist",
    USER_WAITING_LIST: "/my-account/waiting-list",
    USER_BONUSES: "/my-account/bonuses",
    USER_ACCOUNT_SETTINGS: "/my-account",
    USER_LOGOUT: "/my-account/logout"
}

export const linksContainer = {
    account: {
        orders: myAccountRoutes.USER_ORDERS,
        library: myAccountRoutes.USER_LIBRARY,
        wishlist: myAccountRoutes.USER_WISHLIST,
        waitingList: myAccountRoutes.USER_WAITING_LIST,
        bonuses: myAccountRoutes.USER_BONUSES,
        settings: myAccountRoutes.USER_ACCOUNT_SETTINGS,
        logout: myAccountRoutes.USER_LOGOUT
    }
}
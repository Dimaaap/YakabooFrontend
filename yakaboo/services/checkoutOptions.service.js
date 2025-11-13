export const paymentOptions = {
    cart_or_scholar_pack:
    {
        htmlFieldName: "scholarPack",
        label: 'Оплата карткою On-line або карткою "Пакунок школяра"',
        icon: "/icons/social/visa.svg"
    },

    winter_e_support:
    {
        htmlFieldName: "eSupport",
        label: "Оплата картою Зимова єПідтримка/ Національний кешбек",
        icon: "/icons/esupport.svg"
    },

    e_book: 
    {
        htmlFieldName: "eBook",
        label: 'Оплата картою "ДІЯ єКнига - 908 грн"',
        icon: "/icons/elbook.svg"
    },

    upon_receipt: 
    {
        htmlFieldName: "cashOrCart",
        label: "Готівкою або карткою: При отриманні",
        icon: "/icons/cash_or_cart.svg"
    },

    prepay: 
    {
        htmlFieldName: "prepay",
        label: "Передплата: по б/г рахунку (для юр. осіб)",
        icon: "/icons/prepay.svg"
    }
}



export const deliveryOptions = {
    yakaboo_shop_price: 
    {
        htmlFieldName: "YakabooShop",
        label: "Самовивіз з магазину Yakaboo, Хрещатик 22, у Головпоштамті",
        icon: "icons/social/yakaboo-small.svg",
        deliveryTime: "1-3 дні",
    },

    new_post_department_price: 
    {
        htmlFieldName: "newPostToMailbox",
        label: "Поштомат Нова Пошта",
        icon: "/icons/social/new-post.svg",
        deliveryTime: "1-3 дні",
        hasFree: "від 600 грн безкоштовно",
        formId: 1
    },

     new_post_office_price: 
     {
        htmlFieldName: "newPostToOffice",
        label: "Відділення Нова Пошта",
        icon: "/icons/social/new-post.svg",
        deliveryTime: "1-3 дні",
        hasFree: "від 799 безкоштовно",
        formId: 2
    },

    meest_post_price: 
    {
        htmlFieldName: "meestPost",
        label: "Meest ПОШТА",
        icon: "/icons/social/meest-post.svg",
        deliveryTime: "1-3 дні",
        formId: 3
    },

    new_post_courier_price:
    {
        htmlFieldName: "newPostCourier",
        label: "Кур'єр Нова Пошта",
        icon: "/icons/social/new-post.svg",
        deliveryTime: "1-3 дні",
        formId: 4
    },

    ukrpost_department_price: 
    {
        htmlFieldName: "ukrpostOffice",
        label: "Відділення Укрпошта",
        icon: "/icons/social/ukrpost.svg",
        deliveryTime: "1-3 дні",
        formId: 5
    },

    ukrpost_courier_price: 
    {
        htmlFieldName: "urkpostCourier",
        label: "Кур'єр Укрпошта",
        icon: "/icons/social/ukrpost.svg",
        deliveryTime: "1-4 дні",
        formId: 6
    }        
}
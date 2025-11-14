import { CookiesWorker } from "./cookies.service"
import Image from "next/image"

export const userData = {
        firstName: CookiesWorker.get("first_name"),
        lastName: CookiesWorker.get("last_name"),
        phone: CookiesWorker.get("phone_number"),
        email: CookiesWorker.get("email")
    }


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
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostDeliveryAddress" className="checkout__form-delivery-method-label">
                            Адреса відділення *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Адреса відділення" minLength={2} name="newPostDeliveryAddress" />
                    </div>
                </div>
            </div>  
        )
    },

     new_post_office_price: 
     {
        htmlFieldName: "newPostToOffice",
        label: "Відділення Нова Пошта",
        icon: "/icons/social/new-post.svg",
        deliveryTime: "1-3 дні",
        hasFree: "від 799 безкоштовно",
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostPostomatAddress" className="checkout__form-delivery-method-label">
                            Адреса поштомату *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Адреса поштомату" minLength={2} name="newPostPostomatAddress" />
                    </div>
                </div>
            </div>  
        )
    },

    meest_post_price: 
    {
        htmlFieldName: "meestPost",
        label: "Meest ПОШТА",
        icon: "/icons/social/meest-post.svg",
        deliveryTime: "1-3 дні",
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-warning">
                    <Image src="/icons/red-info.svg" alt="" width="20" height="20" />
                    <p className="checkout__form-delivery-method-warning-text">
                        На пунктах самовивозу Rozetka оплата доступна виключно за посиланням, 
                        яке надається співробітником Rozetka
                    </p>
                </div>
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="meestOfficeAddress" className="checkout__form-delivery-method-label">
                            Адреса відділення *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Введіть адресу" minLength={2} name="meestOfficeAddress" />
                    </div>
                </div>
            </div>
        )
    },

    new_post_courier_price:
    {
        htmlFieldName: "newPostCourier",
        label: "Кур'єр Нова Пошта",
        icon: "/icons/social/new-post.svg",
        deliveryTime: "1-3 дні",
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row gridded gridded-3">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryAddress" className="checkout__form-delivery-method-label">
                            Назва вулиці *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Назва вулиці" minLength={2} name="deliveryAddress" />
                    </div>

                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryHouse" className="checkout__form-delivery-method-label">
                            Будинок *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Будинок" name="deliveryHouse" />
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryApartment" className="checkout__form-delivery-method-label">
                            Кв./Офіс
                        </label>
                        
                        <input type="number"className="checkout__form-delivery-method-input"
                        placeholder="Кв./Офіс" name="deliveryApartment" />
                    </div>
                </div>
            </div> 
        )
    },

    ukrpost_department_price: 
    {
        htmlFieldName: "ukrpostOffice",
        label: "Відділення Укрпошта",
        icon: "/icons/social/ukrpost.svg",
        deliveryTime: "1-3 дні",
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryFirstName" className="checkout__form-delivery-method-label">
                            Ім'я *
                        </label>
                        <input type="text" defaultValue={ userData.firstName } className="checkout__form-delivery-method-input"
                        placeholder="Введіть ім'я отримувача" minLength={2} name="deliveryFirstName" />
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryLastName" className="checkout__form-delivery-method-label">
                            Прізвище *
                        </label>
                        <input type="text" defaultValue={ userData.lastName } className="checkout__form-delivery-method-input"
                        placeholder="Введіть прізвище отримувача" minLength={2} name="deliveryLastName" />
                    </div>
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryMiddleName" className="checkout__form-delivery-method-label">
                            По батькові *
                        </label>
                        <input type="text"className="checkout__form-delivery-method-input"
                        placeholder="Введіть по батькові отримувача" minLength={2} name="deliveryMiddleName" />
                    </div>
                </div>
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container bigger-container">
                        <label htmlFor="officeStreet" className="checkout__form-delivery-method-label">
                            Адреса відділення*
                        </label>

                        <input type="text" className="checkout__form-delivery-method-input bigger-input" name="officeStreet"
                        placeholder="Введіть назву вулиці" />
                    </div>
                </div>
            </div>    
        )
    },

    ukrpost_courier_price: 
    {
        htmlFieldName: "urkpostCourier",
        label: "Кур'єр Укрпошта",
        icon: "/icons/social/ukrpost.svg",
        deliveryTime: "1-4 дні",
        formContent: (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryFirstName" className="checkout__form-delivery-method-label">
                            Ім'я *
                        </label>
                        <input type="text" defaultValue={ userData.firstName } className="checkout__form-delivery-method-input"
                        placeholder="Введіть ім'я отримувача" minLength={2} name="deliveryFirstName" />
                    </div>
                     
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryLastName" className="checkout__form-delivery-method-label">
                            Прізвище *
                        </label>
                        <input type="text" defaultValue={ userData.lastName } className="checkout__form-delivery-method-input"
                        placeholder="Введіть прізвище отримувача" minLength={2} name="deliveryLastName" />
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="deliveryMiddleName" className="checkout__form-delivery-method-label">
                             По батькові *
                        </label>
                        <input type="text"className="checkout__form-delivery-method-input"
                        placeholder="Введіть по батькові отримувача" minLength={2} name="deliveryMiddleName" />
                    </div>
                </div>
                
                <div className="checkout__form-delivery-method-input-row gridded"> 
                    <div className="checkout__form-delivery-method-input-container bigger-container">
                        <label htmlFor="deliveryStreet" className="checkout__form-delivery-method-label">
                            Назва вулиці*
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input" name="deliveryStreet"
                        placeholder="Введіть назву вулиці" />
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="postIndex" className="checkout__form-delivery-method-label">
                            Поштовий індекс *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input smaller-input"
                        placeholder="Поштовий індекс" name="postIndex" />
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="houseNumber" className="checkout__form-delivery-method-label">
                            Будинок *
                        </label>
                        
                        <input type="text" className="checkout__form-delivery-method-input smaller-input"
                        name="houseNumber" placeholder="Будинок" /> 
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="apartmentNumber" className="checkout__form-delivery-method-label">
                            Кв./Офіс
                        </label>
                        <input type="number" name="apartmentNumber" className="checkout__form-delivery-method-input smaller-input"
                        placeholder="Кв./Офіс" />
                    </div>
                </div>
            </div>
        )
    }        
}
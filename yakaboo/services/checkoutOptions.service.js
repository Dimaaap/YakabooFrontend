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
        formContent: (register, watch, errors) => (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostDeliveryAddress" className="checkout__form-delivery-method-label">
                            Адреса відділення *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        { ...register("newPostDeliveryAddress", 
                            { 
                                required: watch("deliveryMethod") === "newPostToMailbox" ? "Поле обов'язкове" : false,
                                minLength: {
                                value: 2,
                                message: "Адреса повинна містити хоча б 2 символи"
                            }}) }
                        placeholder="Адреса відділення" name="newPostDeliveryAddress" />
                        { errors.newPostDeliveryAddress && <p className="checkout__form-error-message">{ errors.newPostDeliveryAddress.message }</p> }
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
        formContent: (register, watch, errors) => (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostPostomatAddress" className="checkout__form-delivery-method-label">
                            Адреса поштомату *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        { ...register("newPostPostomatAddress", {
                            required: watch("deliveryMethod") === "newPostToOffice" ? "Поле обов'язкове": false,
                            minLength: {
                                value: 2,
                                message: "Адреса поштомату повинна містити хоча б 2 символи"
                            }
                        }) }
                        placeholder="Адреса поштомату" name="newPostPostomatAddress" />
                        { errors.newPostPostomatAddress && <p className="checkout__form-error-message">
                            { errors.newPostPostomatAddress.message }
                        </p> }
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
        formContent: (register, watch, errors) => (
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
                        placeholder="Введіть адресу" { ...register("meestOfficeAddress", {
                            required: watch("deliveryMethod") === "meestPost" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Адреса відділення Meest ПОШТА повинна містити хоча б 2 символи"
                            }
                        }) } name="meestOfficeAddress" />
                        { errors.meestToOfficeAddress && <p className="checkout__form-error-message">{ errors.meestToOfficeAddress.message }</p> }
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
        formContent: (register, watch, errors) => (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row gridded gridded-3">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostCourierDeliveryAddress" className="checkout__form-delivery-method-label">
                            Назва вулиці *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        placeholder="Назва вулиці" {...register("newPostCourierDeliveryAddress", {
                            
                            minLength: {
                                required: watch("deliveryMethod") === "newPostCourier" ? "Поле обов'язкове" : false,
                                value: 2,
                                message: "Назва вулиці повинна містити хоча б 2 символи"
                            }
                        }
                        )} name="newPostCourierDeliveryAddress" />
                        { errors.newPostCourierDeliveryAddress && <p className="checkout__form-error-message">
                            { errors.newPostCourierDeliveryAddress.message}
                        </p> }
                    </div>

                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostCourierHouseNumber" className="checkout__form-delivery-method-label">
                            Будинок *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        { ...register("newPostCourierHouseNumber", {
                            required: watch("deliveryMethod") === "newPostCourier" ? "Поле обов'язкове" : false,
                        }) }
                        placeholder="Будинок" name="newPostCourierHouseNumber" />
                        { errors.newPostCourierHouseNumber && <p className="checkout__form-error-message">
                            { errors.newPostCourierHouseNumber.message}
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="newPostCourierDeliveryApartment" className="checkout__form-delivery-method-label">
                            Кв./Офіс
                        </label>
                        
                        <input type="number"className="checkout__form-delivery-method-input"
                        { ...register("newPostCourierDeliveryApartment", {
                            required: watch("deliveryMethod") === "newPostCourier" ? "Поле обов'язкове" : false,
                        }) }
                        placeholder="Кв./Офіс" name="newPostCourierDeliveryApartment" />
                        { errors.newPostCourierDeliveryApartment && <p className="checkout__form-error-message">
                            { errors.newPostCourierDeliveryApartment.message}
                        </p> }
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
        formContent: (register, watch, errors) => (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostOfficeUserName" className="checkout__form-delivery-method-label">
                            Ім'я *
                        </label>
                        <input type="text" 
                        { ...register("ukrpostOfficeUserName", {
                            required: watch("deliveryMethod") === "ukrpostOffice" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        className="checkout__form-delivery-method-input"
                        placeholder="Введіть ім'я отримувача" name="ukrpostOfficeUserName" />
                        { errors.ukrpostOfficeUserName && <p className="checkout__form-error-message">
                            { errors.ukrpostOfficeUserName.message }
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostOfficerUserLastName" className="checkout__form-delivery-method-label">
                            Прізвище *
                        </label>
                        <input type="text" 
                        { ...register("ukrpostOfficerUserLastName", {
                            required: watch("deliveryMethod") === "ukrpostOffice" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        className="checkout__form-delivery-method-input"
                        placeholder="Введіть прізвище отримувача" name="ukrpostOfficerUserLastName" />
                        { errors.ukrpostOfficerUserLastName && <p className="checkout__form-error-message">
                            { errors.ukrpostOfficerUserLastName.message }
                        </p> }
                    </div>
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostOfficeUserMiddleName" className="checkout__form-delivery-method-label">
                            По батькові *
                        </label>
                        <input type="text"className="checkout__form-delivery-method-input"
                        { ...register("ukrpostOfficeUserMiddleName", {
                            required: watch("deliveryMethod") === "ukrpostOffice" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        placeholder="Введіть по батькові отримувача" name="ukrpostOfficeUserMiddleName" />
                        { errors.ukrpostOfficeUserMiddleName && <p className="checkout__form-error-message">
                            { errors.ukrpostOfficeUserMiddleName.message }
                        </p> }
                    </div>
                </div>
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container bigger-container">
                        <label htmlFor="ukrpostOfficeAddres" className="checkout__form-delivery-method-label">
                            Адреса відділення*
                        </label>

                        <input type="text" className="checkout__form-delivery-method-input bigger-input" name="ukrpostOfficeAddres"
                        { ...register("ukrpostOfficeAddress", {
                            required: watch("deliveryMethod") === "ukrpostOffice" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        placeholder="Введіть назву вулиці" />
                        { errors.ukrpostOfficeAddress && <p className="checkout__form-error-message">
                            { errors.ukrpostOfficeAddress.message }
                        </p> }
                    </div>
                </div>
            </div>    
        )
    },

    ukrpost_courier_price: 
    {
        htmlFieldName: "ukrpostCourier",
        label: "Кур'єр Укрпошта",
        icon: "/icons/social/ukrpost.svg",
        deliveryTime: "1-4 дні",
        formContent: (register, watch, errors) => (
            <div className="checkout__form-delivery-method-data-form">
                <div className="checkout__form-delivery-method-input-row">
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostCourierUserName" className="checkout__form-delivery-method-label">
                            Ім'я *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        { ...register("ukrpostCourierUserName", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        placeholder="Введіть ім'я отримувача" name="ukrpostCourierUserName" />
                        { errors.ukrpostCourierUserName && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierUserName.message }
                        </p> }
                    </div>
                     
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostCourierUserLastName" className="checkout__form-delivery-method-label">
                            Прізвище *
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input"
                        { ...register("ukrpostCourierUserLastName", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        placeholder="Введіть прізвище отримувача" name="ukrpostCourierUserLastName" />
                        { errors.ukrpostCourierUserLastName && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierUserLastName.message }
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container">
                        <label htmlFor="ukrpostCourierUserMiddleName" className="checkout__form-delivery-method-label">
                             По батькові *
                        </label>
                        <input type="text"className="checkout__form-delivery-method-input"
                        {...register("ukrpostCourierUserMiddleName", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        })}
                        placeholder="Введіть по батькові отримувача" name="ukrpostCourierUserMiddleName" />
                        { errors.ukrpostCourierUserMiddleName && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierUserMiddleName.message }
                        </p> }
                    </div>
                </div>
                
                <div className="checkout__form-delivery-method-input-row gridded"> 
                    <div className="checkout__form-delivery-method-input-container bigger-container">
                        <label htmlFor="ukrpostCourierAddress" className="checkout__form-delivery-method-label">
                            Назва вулиці*
                        </label>
                        <input type="text" className="checkout__form-delivery-method-input" name="ukrpostCourierAddress"
                        { ...register("ukrpostCourierAddress", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            minLength: {
                                value: 2,
                                message: "Введіть хоча б 2 символи"
                            }
                        }) }
                        placeholder="Введіть назву вулиці" />
                        { errors.ukrpostCourierAddress && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierAddress.message }
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="ukrpostPostIndex" className="checkout__form-delivery-method-label">
                            Поштовий індекс *
                        </label>
                        <input type="number" className="checkout__form-delivery-method-input smaller-input"
                        { ...register("ukrpostPostIndex", 
                            {
                                required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                                valueAsNumber: true,
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: "Неправильний формат індексу"
                                }
                            }
                        ) }
                        placeholder="Поштовий індекс" name="ukrpostPostIndex" />
                        { errors.ukrpostPostIndex && <p className="checkout__form-error-message">
                            { errors.ukrpostPostIndex.message }
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="ukrpostCourierHouseNumber" className="checkout__form-delivery-method-label">
                            Будинок *
                        </label>
                        
                        <input type="number" className="checkout__form-delivery-method-input smaller-input"
                        { ...register("ukrpostCourierHouseNumber", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            valueAsNumber: true
                        }) }
                        name="ukrpostCourierHouseNumber" placeholder="Будинок" /> 
                        { errors.ukrpostCourierHouseNumber && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierHouseNumber.message }
                        </p> }
                    </div>
                    
                    <div className="checkout__form-delivery-method-input-container smaller-container">
                        <label htmlFor="apartmentNumber" className="checkout__form-delivery-method-label">
                            Кв./Офіс
                        </label>
                        <input type="number" name="apartmentNumber" className="checkout__form-delivery-method-input smaller-input"
                        { ...register("ukrpostCourierApartmentNumber", {
                            required: watch("deliveryMethod") === "ukrpostCourier" ? "Поле обов'язкове" : false,
                            valueAsNumber: true
                        }) }
                        placeholder="Кв./Офіс" />
                        { errors.ukrpostCourierApartmentNumber && <p className="checkout__form-error-message">
                            { errors.ukrpostCourierApartmentNumber.message }
                        </p> }
                    </div>
                </div>
            </div>
        )
    }        
}
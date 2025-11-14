"use client"

import PhoneInput from "react-phone-input-2"
import { fetchData } from "../../services"
import { useEffect, useMemo, useState } from "react"
import Select from "react-select";
import Endpoints from "../../endpoints"
import Image from "next/image";
import { useCartStore } from "../../states";
import { wordDeclension } from "../../services/word-declension.service";
import Link from "next/link";
import { deliveryOptions, paymentOptions, userData } from "../../services/checkoutOptions.service";

export const CheckoutClient = () => {

    const [ selectedCountry, setSelectedCountry ] = useState("UA");
    const [ selectedDeliveryCountry, setSelectedDeliveryCountry ] = useState(null)
    const [ countries, setCountries ] = useState([])
    const [ selectedCity, setSelectedCity ] = useState(null)
    const [ selectedDeliveryOption, setSelectedDeliveryOption ] = useState(6)
    const [ selectedPaymentOption, setSelectedPaymentOption ] = useState(0)
    const [ deliveryPrice, setDeliveryPrice ] = useState(0);
    const [ editCartMode, setEditCartMode ] = useState(false);
    const { cartItems, setCartItems } = useCartStore();

    const FREE_DELIVERY_FROM = 600;

    const getRestToFreeDelivery = (cartItemsPrice) => {
        return FREE_DELIVERY_FROM - cartItemsPrice;
    }

    const selectFieldsCommonStyles = {
        placeholder: (provided) => ({
            ...provided,
            color: "black"
        }),

        option: (provided, countries) => ({
            ...provided,
            backgroundColor: countries.isFocused ? "#E6E8EE" : "#F2F3F6",
            border: "none",
            paddingTop: 0,
            marginTop: "0px",
            fontWeight: 500,
            color: countries.isSelected ? "#ff00c5" : "black",
            borderBottom: "1px solid #E6E8EE",
            paddingTop: "10px",
            cursor: "pointer",
            fontSize: "14px"
        }),
        control: (base) => ({
            ...base,
            width: "100%",
            backgroundColor: "#F2F3F6",
            color: "red",
            fontWeight: 500,
            height: "45px",
            border: "none",
            borderRadius: "10px",
            paddingLeft: "5px",
            fontSize: "14px"
        }),
        groupHeading: (base) => ({
            ...base,
            color: "black",
            fontWeight: 500,
            fontFamily: "Montserrat"
        })
    }


    useEffect(() => {
        fetchData(Endpoints.ALL_COUNTRIES, setCountries, "countries")
    }, [])

    useEffect(() => {
        if(countries.length > 0 && !selectedDeliveryCountry){
            const defaultCountry = countries[0];
            setSelectedDeliveryCountry(defaultCountry);

            if(defaultCountry?.cities?.length){
                setSelectedCity(defaultCountry.cities[0]);
            }
        }
    }, [countries])

    const handleSelectNewLabel = (index, price) => {
        setSelectedDeliveryOption(index);
        setDeliveryPrice(price);
    }

    const handleChangeSelectedCountry = (selectedCountry) => {
        const matchedCountry = countries.find((country) => country.title === selectedCountry.value);

        setSelectedDeliveryCountry(matchedCountry)

        if(matchedCountry?.cities?.length){
            setSelectedCity(matchedCountry.cities[0]);
        } else {
            setSelectedCity(null)
        }
    }

    const handleChangeSelectedCity = (selectedCity) => {
        const matchedCity = selectedDeliveryCountry?.cities?.find((city) => city.title === selectedCity.value);
        setSelectedCity(matchedCity)
    }

    const getCountryCities = () => {
        return (
            selectedDeliveryCountry?.cities?.map((city) => ({
                value: city.title,
                label: city.title
            })) || []
        )
    }

    const selectedCountryOption = useMemo(() => {
        return selectedDeliveryCountry ? {
            value: selectedDeliveryCountry.title,
            label: selectedDeliveryCountry.title,
        }
        :null
    }, [selectedDeliveryCountry]);

    let countriesOptions = useMemo(() => {
        return countries.map((country) => ({
            value: country.title,
            label: country.title
        }))
    }, [countries])

    return (
        <div className="checkout">
            <h2 className="checkout__title">
                Оформлення замовлення
            </h2>

            <div className="checkout__content">
                <div className="checkout__form-container">
                    <form className="checkout__form">
                        <h5 className="checkout__form-title">
                            Контактні дані
                        </h5>
                        <div className="checkout__form-input-row">
                            <div className="checkout__form-input-container">
                                <label htmlFor="firstName" className="checkout__form-label">
                                    Ім'я *
                                </label>
                                <input type="text" id="firstName" name="firstName" className="checkout__form-input" placeholder="Введіть ваше ім'я"
                                defaultValue={userData.firstName} onChange={() => {}} />
                            </div>
                            <div className="checkout__form-input-container">
                                <label htmlFor="lastName" className="checkout__form-label">
                                    Прізвище *
                                </label>
                                <input type="text" id="lastName" name="lastName" className="checkout__form-input" placeholder="Введіть ваше прізвище"
                                defaultValue={userData.lastName} onChange={() => {}} />
                            </div>
                        </div>

                        <div className="checkout__form-input-row">
                            <div className="checkout__form-input-container">
                                <label htmlFor="phone" className="checkout__form-label">
                                    Номер телефону *
                                </label>
                                <div className="form__paired-inputs">
                                    <PhoneInput className="form__country-select"
                                    country={ selectedCountry.toLowerCase() }
                                    disableDropdown={ false }
                                    inputStyle={{
                                        "height": "45px", "width": "100%", "backgroundColor": "#F4F6F8",
                                        "border": "1px solid #ddd", "borderRadius": "10px", "fontSize": "14px",
                                        "paddingInline": "2%", "outline": "none", "color": "black", "fontWeight": "500"
                                    }}
                                    preferredCountries={["ua"]}
                                    onChange={ () => {} } 
                                    excludeCountries={["ru"]}
                                    value={userData.phone}
                                    minLength={8}/>
                                    <input type="hidden" name="phone" id="phone" className="checkout__form-input" />
                                </div>
                            </div>

                            <div className="checkout__form-input-container">
                                <label htmlFor="email" className="checkout__form-label">
                                    Електронна пошта *
                                </label>
                                
                                <input type="email" name="email" id="email" placeholder="Введіть ваш email"
                                className="checkout__form-input" defaultValue={userData.email} onChange={() => {}} />
                            </div>
                        </div>

                        <div className="checkout__form-input-row checks-row">
                            <div className="checkout__form-input-container horizontalized">
                                <label htmlFor="charity" className="checkout__form-custom-checkbox">
                                    <input type="checkbox" id="charity" name="charity" className="checkout__form-custom-checkbox-input" />
                                    <span className="checkout__form-custom-checkbox-checkmark"></span>
                                    На благодійність
                                </label>
                            </div>

                            <div className="checkout__form-input-container horizontalized">
                                 <label htmlFor="other-person" className="checkout__form-custom-checkbox">
                                    <input type="checkbox" id="other-person" name="other-person" className="checkout__form-custom-checkbox-input" />
                                    <span className="checkout__form-custom-checkbox-checkmark"></span>
                                    Отримувач інша людина
                                </label>
                            </div>
                        </div>
                    </form>

                    <form className="checkout__form">
                        <h5 className="checkout__form-title">
                            Доставка
                        </h5>

                        <div className="checkout__form-input-row">
                            <div className="checkout__form-input-container">
                                <label htmlFor="country" className="checkout__form-label">
                                    Країна *
                                </label>
                                { countries.length && (
                                    <Select 
                                        id="country"
                                        name="country"
                                        options={ countriesOptions }
                                        value={ selectedCountryOption }
                                        onChange={ handleChangeSelectedCountry }
                                        placeholder={ selectedDeliveryCountry?.title }
                                        className="delivery-modal__input"
                                        styles={ selectFieldsCommonStyles }
                                    />    
                                ) }
                                
                            </div>

                            <div className="checkout__form-input-container">
                                <label htmlFor="city" className="checkout__form-label">
                                    Місто *
                                </label>
                                <Select 
                                    id="city"
                                    name="city"
                                    options={ getCountryCities() }
                                    value = {
                                        selectedCity 
                                        ? {value: selectedCity.title, label: selectedCity.title}
                                        : ''
                                    }
                                    styles={ selectFieldsCommonStyles }
                                    onChange={ handleChangeSelectedCity }
                                    placeholder={ selectedCity?.title }
                                    className="delivery-modal__input"
                                />
                            </div>
                        </div>

                        <div className="checkout__form-options-container">
                            <label htmlFor="delivery-method" className="checkout__form-label">
                                Спосіб доставки *
                            </label>

                            <div className="checkout__form-delivery-methods">

                                { selectedCity?.delivery_terms && 
                                    Object.entries(selectedCity.delivery_terms).map(([key, value], index)  => {
                                        if(
                                            ["id", "city_id", "country_id"].includes(key) || value === null
                                        ) return null

                                        const option = deliveryOptions[key]

                                        if(!option) return null

                                        return (
                                            <div className={`checkout__form-delivery-method`} 
                                            key={ index } onClick={ () => handleSelectNewLabel(index, value) }>
                                                <label htmlFor={ option.htmlFieldName } 
                                                className={`checkout__form-label delivery-label 
                                                ${selectedDeliveryOption === index ? "active" : ""}`}>
                                                    <div className="checkout__form-label-main-container">
                                                        <div className="checkout__form-default-radio">
                                                            <input type="radio" name="deliveryMethoOption" id={ option.htmlFieldName }
                                                            value={ option.htmlFieldName } className="checkout__form-default-radio-input"
                                                            checked={ selectedDeliveryOption === index } />
                                                        </div>

                                                        <div className="checkout__form-delivery-info">
                                                            <div className="checkout__form-delivery-info-logo">
                                                                <span className="checkout__form-delivery-info-logo-icon">
                                                                    <Image src={ option.icon } alt="" width="18" height="18" />
                                                                </span>
                                                                <span className="checkout__form-delivery-info-logo-title">
                                                                    { option.label }
                                                                </span>
                                                            </div>
                                                            <div className="checkout__form-delivery-description">
                                                                <span className="checkout__form-delivery-description-part">
                                                                    { value === 0 ? "безкоштовно" : `${ value } грн` }
                                                                </span>
                                                                <div className="separator-dot"></div>
                                                                <span className="checkout__form-delivery-description-part">
                                                                    {`термін доставки ${option.deliveryTime}`}
                                                                </span>
                                                                { option?.hasFree && (<div className="separator-dot"></div>) }
                                                                { option?.hasFree && (
                                                                    <span className="checkout__form-delivery-description-part">
                                                                        { option.hasFree }
                                                                    </span>
                                                                ) }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>

                                                { selectedDeliveryOption === index ? (
                                                   option?.formContent
                                                ) : null }
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </form>

                    <form className="checkout__form">
                        <h5 className="checkout__form-title">Спосіб оплати</h5>

                        <div className="checkout__form-payment-methods">

                            { selectedCity?.payment_methods && 
                                Object.entries(selectedCity.payment_methods).map(([key, value], index) => {
                                    if(
                                        ["id", "city_id", "country_id"].includes(key) || value === null
                                    ) return null;

                                    const option = paymentOptions[key];

                                    if(!option) return null;
                                    
                                    return (
                                        <div className={`checkout__form-payment-method ${selectedPaymentOption === index ? "active": ''} `} 
                                        key={ index } onClick={ () => setSelectedPaymentOption(index) }>
                                            <label htmlFor={ option.htmlFieldName } className="checkout__form-label payment-label">
                                                <div className="checkout__form-default-radio">
                                                    <input type="radio" name="paymentMethodOption"
                                                    id={ option.htmlFieldName } value={ option.htmlFieldName }
                                                    checked={ selectedPaymentOption === index }
                                                    className="checkout__form-default-radio-input" />
                                                </div>
                                                <div className="checkout__payment-container">
                                                    <Image src={ option.icon } alt="" width="18" height="18" />
                                                    <span className="checkout__payment-text">
                                                        { option.label }
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </form>

                    <form className="checkout__form">
                        <h5 className="checkout__form-title">
                            Коментар до замовлення
                        </h5>

                        <textarea className="checkout__form-textarea" rows={3} ></textarea>
                    </form>
                </div>    

                <div className="checkout__add-info">
                    <div className="checkout__cart-content">
                        <div className="checkout__cart-header">
                            { cartItems?.items?.length }{" "}{wordDeclension(cartItems?.items?.length)} у кошику
                            <button className={`checkout__cart-edit-btn ${ editCartMode ? "edit-cart" : "" }`}>
                                <Image src="/icons/edit.svg" alt="" width="18" height="18" 
                                className={`checkout__cart-edit-img ${editCartMode ? "edit-cart-image": ""}`} />
                            </button>
                        </div>

                        <div className="checkout__cart-body">
                            { cartItems?.items?.map((item, index) => (
                                <Link className="checkout__cart-item" key={ index } href={`/book/${item.slug}`}>
                                    <div className="checkout__cart-item__image-container">
                                        <Image src={ item.images[0].image_url } alt={ item.title } width="50" height="50" />
                                    </div>
                                    <div className="checkout__cart-item-info">
                                        <p className="checkout__cart-item-title">
                                            { item.title }
                                        </p>
                                        <div className="checkout__cart-item-format">
                                            <span className="checkout__cart-item-price blue-text">
                                                { item.price } грн
                                            </span>
                                            <div className="separator-dot"></div>
                                            <p className="checkout___cart-item-format-status">
                                                { item.format }
                                            </p>
                                        </div>
                                        <div className="checkout__cart-item-format second-row">
                                            <div className="checkout__cart-item-in-stock">
                                                { item.is_in_stock ? <Image src="/icons/truck.svg" alt="" width="18" height="18" /> : "" }
                                                <span className={`checkout__cart-item-in-stock-text ${item.is_in_stock ? "green-truck" : ""}`}>
                                                    { item.is_in_stock ? "В наявності" : "Немає в наявності" }
                                                </span>
                                            </div>
                                            <div className="separator-dot"></div>
                                            <span className="checkout__cart-item-format-code">
                                                Код {item.code}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="checkout__cart-quantity">
                                        { item.quantity } шт.
                                    </div>
                                </Link>
                            )) }
                        </div>

                        <div className="checkout__cart-footer">
                            <p className="checkout__cart-total">
                                Разом { cartItems?.total_price } грн
                            </p>
                        </div>
                    </div>

                    <div className="checkout__payment-info">
                        <div className="checkout__payment-header">
                            <div className="checkout__payment-text-row">
                                <p className="checkout__payment-text">
                                    Подарунковий сертифікат чи промокод
                                </p>
                                <button className="checkout__payment-btn add-btn gray-btn" type="button">
                                    Додати
                                </button>
                            </div>
                            <p className="checkout__payment-additional-text">
                                За наявності бонусів їх використання можливе після {" "}
                                <span className="checkout__payment-link">авторизації</span>
                            </p>
                        </div>

                        <div className="checkout__payment-body">
                            <div className="checkout__payment-bill-row">
                                <h5 className="checkout__payment-total">
                                    До сплати
                                </h5>
                                <h5 className="checkout__payment-total-sum bold">
                                    { cartItems?.total_price + deliveryPrice } грн
                                </h5>
                            </div>
                            <div className="checkout__payment-bill-row">
                                <p className="checkout__payment-type smaller">
                                    { cartItems?.items?.length } {" "} { wordDeclension(cartItems?.items?.length) }
                                </p>
                                <p className="checkout__payment-total-sum smaller">
                                    { cartItems?.total_price } грн
                                </p>
                            </div>
                            { deliveryPrice > 0 && (
                                <div className="checkout__payment-bill-row">
                                    <p className="checkout__payment-type smaller">
                                        Доставка
                                    </p>
                                    <p className="checkout__payment-total-sum smaller">
                                        { deliveryPrice } грн
                                    </p>
                                </div>    
                            ) }

                            <div className="checkout__payment-bonuses">
                                <div className="checkout__payment-bill-row">
                                    <p className="checkout__payment-type">
                                        Бонуси за замовлення
                                        <Image src="/icons/info.svg" alt="" width="18" height="18" />
                                    </p>
                                    <p className="checkout__payment-total-sum blue">
                                        +{ Math.ceil(cartItems?.total_price / 2) } бонусів
                                    </p>
                                </div>
                            </div>

                            <div className="checkout__payment-notes">
                                <span className="checkout__payment-notes-text">
                                    Відправляючи замовлення, я підтверджую, що прочитав 
                                    і згоден(а) з <Link href="/conditions-of-use" className="checkout__payment-link">
                                        Умовами використання
                                    </Link>
                                </span>
                            </div>

                            { deliveryPrice > 0 && getRestToFreeDelivery(cartItems?.total_price) > 0 && (
                                <div className="checkout__advert">
                                    <span className="checkout__advert-text">
                                        Додайте в кошик ще товарів на { getRestToFreeDelivery(cartItems?.total_price) } {" "}
                                        грн та отримайте безкоштовну доставку
                                    </span>
                                </div>    
                            ) }
                        </div>

                        <div className="checkout__payment-footer">
                            <button className="checkout__payment-btn order-btn red-btn" type="submit">
                                Підтвердити замовлення
                            </button>
                            <p className="checkout__continue-shopping">
                                Продовжити покупки
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
"use client"

import PhoneInput from "react-phone-input-2"
import { CookiesWorker, fetchData } from "../../services"
import { useEffect, useMemo, useState } from "react"
import Select from "react-select";
import Endpoints from "../../endpoints"
import Image from "next/image";

export const CheckoutClient = () => {
    const userData = {
        firstName: CookiesWorker.get("first_name"),
        lastName: CookiesWorker.get("last_name"),
        phone: CookiesWorker.get("phone_number"),
        email: CookiesWorker.get("email")
    }

    const [ selectedCountry, setSelectedCountry ] = useState("UA");
    const [ selectedDeliveryCountry, setSelectedDeliveryCountry ] = useState(null)
    const [ countries, setCountries ] = useState([])
    const [ selectedCity, setSelectedCity ] = useState(null)

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

                                <div className="checkout__form-delivery-method">
                                    <label htmlFor="newPostToMailbox" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="newPostToMailBox" id="newPostToMailBox"
                                                value="newPostToMailBox"
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/new-post.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Поштомат Нова Пошта
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        60 грн
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 1-3 дні
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        від 600 грн безкоштовно
                                                    </span>
                                                </div>
                                            </div>   
                                        </div>
                                        <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div> 
                                    </label>
                                </div>

                                <div className="checkout__form-delivery-method">
                                    <label htmlFor="newPostToOffice" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="newPostToOffice" id="newPostToOffice"
                                                value="newPostToOffice"
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/new-post.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Відділення Нова Пошта
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        60 грн
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 1-3 дні
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        від 799 грн безкоштовно
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div>  
                                    </label>
                                </div>

                                <div className="checkout__form-delivery-method">
                                    <label htmlFor="meestPost" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="meestPost" id="meestPost"
                                                value="meestPost"
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/meest-post.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Meest ПОШТА
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        безкоштовно
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 1-3 дні
                                                    </span> 
                                                </div>
                                            </div>   
                                        </div>
                                        <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div> 
                                    </label>
                                </div>

                                <div className="checkout__form-delivery-method">
                                    <label htmlFor="newPostCourier" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="newPostCourier" id="newPostCourier"
                                                value="newPostCourier"
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/new-post.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Кур'єр Нова Пошта
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        95 грн
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 1-3 дні
                                                    </span>
                                                    <div className="separator" />
                                                </div>
                                            </div>   
                                        </div>

                                        <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div> 
                                    </label>
                                </div>

                                <div className="checkout__form-delivery-method">
                                    <label htmlFor="ukrpostOffice" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="ukrpostOffice" id="ukrpostOffice"
                                                value="ukrpostOffice"
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/ukrpost.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Відділення Укрпошта
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        безкоштовно
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 1-3 дні
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                         <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div>  
                                    </label>
                                </div>

                                <div className="checkout__form-delivery-method active">
                                    <label htmlFor="ukrpostCourier" className="checkout__form-label delivery-label">
                                        <div className="checkout__form-label-main-container">
                                            <div className="checkout__form-default-radio">
                                                <input type="radio" name="ukrpostCourier" id="ukrpostCourier"
                                                value="ukrpostCourier" checked={ true }
                                                className="checkout__form-default-radio-input" />
                                            </div>
                                            <div className="checkout__form-delivery-info">
                                                <div className="checkout__form-delivery-info-logo">
                                                    <span className="checkout__form-delivery-info-logo-icon">
                                                        <Image src="/icons/social/ukrpost.svg" alt="" width="18" height="18" />
                                                    </span>
                                                    <span className="checkout__form-delivery-info-logo-title">
                                                        Кур'єр Укрпошта
                                                    </span>
                                                </div>
                                                <div className="checkout__form-delivery-description">
                                                    <span className="checkout__form-delivery-description-part">
                                                        75 грн
                                                    </span>
                                                    <div className="separator" />
                                                    <span className="checkout__form-delivery-description-part">
                                                        термін доставки 3-4 дні
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                         <div className="checkout__form-arrow">
                                            <Image src="/icons/arrow-left.svg" alt="" width="18" height="18" />
                                        </div>  
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>    
            </div>
            
        </div>
    )
}
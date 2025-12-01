"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import PhoneInput from "react-phone-input-2"
import { useForm, FormSubmit } from "react-hook-form";

import Endpoints from "../../endpoints"
import { useCartStore } from "../../states";
import { CookiesWorker, fetchData} from "../../services"
import { wordDeclension } from "../../services/word-declension.service";
import { deliveryFormsDefaultValues, deliveryOptions, paymentOptions, userData } from "../../services/checkoutOptions.service";
import { selectFieldsCommonStyles } from "../../services/characteristicsMap.service";
import { BonusInfoModal } from "../dynamic";
import { useRouter } from "next/navigation";

export const CheckoutClient = () => {

    const [ selectedCountry, setSelectedCountry ] = useState("UA");
    const [ selectedDeliveryCountry, setSelectedDeliveryCountry ] = useState(null)
    const [ countries, setCountries ] = useState([])
    const [ selectedCity, setSelectedCity ] = useState(null)
    const [ selectedDeliveryOption, setSelectedDeliveryOption ] = useState("ukrpostCourier")
    const [ selectedPaymentOption, setSelectedPaymentOption ] = useState("scholarPack")
    const [ addPromo, setAddPromo ] = useState(false);
    const [ deliveryPrice, setDeliveryPrice ] = useState(0);
    const [ editCartMode, setEditCartMode ] = useState(false);
    const [ showBonusInfo, setShowBonusInfo ] = useState(false);
    const [ promoCodeError, setPromoCodeError ] = useState("");
    const [ usedPromoCode, setUsedPromoCode ] = useState({});
    const [ promoCode, setPromoCode ] = useState("");
    const [ ukrpostOffices, setUkrpostOffices ] = useState([]);
    const [ newPostPostomats, setNewPostomats ] = useState([]);
    const [ meestPostOffices, setMeestPostOffices ] = useState([]);
    const [ filteredOffice, setFitleredOffice ] = useState([]);
    const [ meestFilteredOffice, setMeestFilteredOffice ] = useState([]);
    const [ newPostFilteredPostomats, setNewPostFilteredPostomats ] = useState([]);
    const [ prevQuantities, setPrevQuantities ] = useState({})
    const [ priceWithPromoCode, setPriceWithPromoCode ] = useState(0);
    const { cartItems, setCartItems, updateCartItemQuantity } = useCartStore();

    const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm({
        defaultValues: {
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phone: userData.phone || "",
            email: userData.email || "",
            charity: false,
            otherPerson: false,
            country: selectedDeliveryCountry || null,
            city: selectedCity || null,
            deliveryMethod: "ukrpostCourier",
            paymentMethod: "scholarPack",
            comment: "",
            ...deliveryFormsDefaultValues
        }
    });

    const FREE_DELIVERY_FROM = 600;
    const deliveryMethod = watch("deliveryMethod");
    const userEmail = CookiesWorker.get("email");
    const router = useRouter();

    const getRestToFreeDelivery = (cartItemsPrice) => {
        return FREE_DELIVERY_FROM - cartItemsPrice;
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

    useEffect(() => {
        if(selectedDeliveryCountry){
            setValue("country", selectedDeliveryCountry.title);
        } 

        if(selectedCity){
            setValue("city", selectedCity.title)
        }
    }, [selectedDeliveryCountry, selectedCity, setValue])


    useEffect(() => {
        if(!cartItems.total_price || cartItems.items.length === 0){
            router.replace("/");
        }
    }, [cartItems])


    useEffect(() => {
        if(!selectedCity || !deliveryMethod){
            setDeliveryPrice(0);
            return;
        }

        const matchedKey = Object.keys(deliveryOptions).find(
            (k) => deliveryOptions[k].htmlFieldName === deliveryMethod
        )

        const price = matchedKey && selectedCity?.delivery_terms ? selectedCity.delivery_terms[matchedKey] ?? 0 : 0

        setDeliveryPrice(price);

        if (selectedCity?.delivery_terms) {
            const visibleKeys = Object.keys(selectedCity.delivery_terms).filter(
                (k) => !["id", "city_id", "country_id"].includes(k) && selectedCity.delivery_terms[k] !== null
            );
        
            const idx = visibleKeys.indexOf(matchedKey);
            if (idx !== -1) setSelectedDeliveryOption(idx);
        }
    }, [deliveryMethod, selectedCity])


    useEffect(() => {
        fetchData(Endpoints.ALL_OFFICES, setUkrpostOffices, "ukrpost_offices")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.MEEST_ALL_OFFICES, setMeestPostOffices, "meest_offices")
    }, []);

    useEffect(() => {
        fetchData(Endpoints.NEW_POST_ALL_POSTOMATS, setNewPostomats, "new_post_postomats")
    }, [])

    useEffect(() => {
        if(selectedCity && meestPostOffices.length > 1){
            setMeestFilteredOffice(meestPostOffices.filter((office) => office.city_id === selectedCity.id))
            setFitleredOffice([])
        }
    }, [selectedCity, meestPostOffices])


    useEffect(() => {
        if(selectedCity && ukrpostOffices.length > 1){
            setFitleredOffice(ukrpostOffices.filter((office) => office.city_id === selectedCity.id))
            setMeestFilteredOffice([]);
        }
    }, [selectedCity, ukrpostOffices])

    const handleSelectNewLabel = (index, price) => {
        setSelectedDeliveryOption(index);
        setDeliveryPrice(price);
    }

    const handleFilteredOfficesList = (fieldName) => {
        if(!selectedCity) {
            return;
        }

        if(fieldName === "meestPost"){
            setFitleredOffice([])
            setNewPostFilteredPostomats([])
            setMeestFilteredOffice(meestPostOffices.filter((office) => office.city_id === selectedCity.id))
        } else if(fieldName === "ukrpostOffice"){
            setMeestFilteredOffice([])
            setNewPostFilteredPostomats([])
            setFitleredOffice(ukrpostOffices.filter((office) => office.city_id === selectedCity.id))
        } else if(fieldName="newPostToMailbox") {
            setFitleredOffice([])
            setMeestFilteredOffice([])
            console.log("here")
            setNewPostFilteredPostomats(newPostPostomats.filter((postomat) => postomat.city_id == selectedCity.id))
            console.log(newPostFilteredPostomats)
        }
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

    const onSubmit = async(data) => {
        console.log(data);
    }

    const toggleEditMode = () => {
        if(editCartMode){
            setEditCartMode(false)
        } else {
            setEditCartMode(true)
        }
    }

    const toggleAddPromo = () => {
        if(addPromo){
            setAddPromo(false);
        } else {
            setAddPromo(true);
        }
    }

    const toggleShowBonusInfo = () => {
        if(showBonusInfo){
            setShowBonusInfo(false)
        } else {
            setShowBonusInfo(true)
        }
    }

    const deleteItemFromCartHandler = async(bookId) => {

        const res = await fetch(Endpoints.DELETE_ITEM_FROM_CART(userEmail, bookId), {
            method: "DELETE"
        })

        if(res.ok){
            setCartItems((prev) => {
                if(!prev?.items) return prev;

                const updatedItems = prev.items.filter(
                    (item) => item.book_id !== bookId
                );

                const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

                return {
                    ...prev, 
                    items: updatedItems,
                    total_price: updatedTotal
                }
            })
        } else {
            return null;
        }
    }

    const changeQuantity = async(bookId, addOrMinus) => {
        const currentItem = cartItems.items.find(item => item.book_id === bookId)

        if(!currentItem){
            return;
        }

        let newQuantity = null;

        if(addOrMinus === "add") {
            newQuantity = currentItem.quantity + 1;
        } else {
            newQuantity = currentItem.quantity - 1;
        }

        const res = await fetch(Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(res.ok){
            updateCartItemQuantity(bookId, newQuantity)
        } else {
            console.error("Error: ", res.text());
        }
    }

    const handleFocus = (bookId) => {
        setPrevQuantities((prev) => {
        const currentQuantity = cartItems.items.find((item) => item.book_id === bookId)?.quantity;
        return {...prev, [bookId]: currentQuantity}
        })
    }  

    const handleQuantityChangeLocal = (bookId, newValue) => {
        if(newValue === ""){
            setCartItems((prev) => {
                const updatedItems = prev.items.map((item) => item.book_id === bookId ? {...item, quantity: ""} : item)

                return { ...prev, items: updatedItems }
            })

            return
        }

        const newQuantity = parseInt(newValue);
        if(isNaN(newQuantity) || newQuantity < 1){
            return;
        }

        setCartItems((prev) => {
            const updatedItems = prev.items.map((item) => (
                item.book_id === bookId ? { ...item, quantity: newQuantity } : item
            ));

            return { ...prev, items: updatedItems }
        })
    }

    const getCurrentSelectedList = () => {
        if(newPostFilteredPostomats.length > 0){
            return newPostFilteredPostomats
        } else if(meestFilteredOffice.length > 0){
            return meestFilteredOffice
        } else if(filteredOffice.length > 0){
            return filteredOffice
        }
    }

    const handleQuantityBlur = async(bookId, newValue) => {

        if(newValue === "" || isNaN(parseInt(newValue))){
            const oldQuantity = prevQuantities[bookId];
            setCartItems((prev) => {
                const updatedItems = prev.items.map((item) => (
                    item.book_id === bookId ? { ...item, quantity: oldQuantity } : item
                ))

                return {...prev, items: updatedItems}
            })

            return;
        }

        const newQuantity = parseInt(newValue);

        const res = await fetch(Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), {
            method: "PATCH",
            headers: {
                "Contetn-Type": "application/json"
            }
        })

        if(res.ok){
            updateCartItemQuantity(bookId, newQuantity)
        } else {
            console.error("Error updating quantity")
        }
    }


    const addPromoCode = async () => {
        const userEmail = CookiesWorker.get("email")
        setPromoCodeError("")

        if(!userEmail){
            setPromoCodeError("Для використання промокоду потрібно зареєструватись або увійти в акаунт");
            return;
        }

        const promo = document.querySelector(".checkout__add-promo-input").value;

        try {
            const res = await fetch(Endpoints.USE_PROMO_CODE(userEmail, promo), {
                method: "POST"
            })

            const response = await res.json();

            if(res.ok){
                const promoId = response.promo_id;
                try {
                    await fetchData(Endpoints.GET_PROMO_CODE_BY_ID(promoId), (promoData) => {
                        setUsedPromoCode(promoData);
                        CookiesWorker.setForYear("promo_code", JSON.stringify(promoData));
                    })
                    setPromoCode("");
                    setPromoCodeError("");
                    setAddPromo(false);
                } catch(err){
                    console.error(err);
                }
                
            } else {
                setPromoCodeError(response.detail)
            }
        } catch(err){
            console.log(err);
        }

        document.querySelector(".checkout__add-promo-input").value = "";
        setPromoCode("");
    }

    useEffect(() => {
        const promoCodeInCookies = CookiesWorker.get("promo_code")
        if(promoCodeInCookies){
            setUsedPromoCode(JSON.parse(promoCodeInCookies));
            return;
        }
    }, [])

    useEffect(() => {
        const totalPrice = cartItems?.total_price + deliveryPrice;
        const discountPercent = usedPromoCode.discount;

        if(usedPromoCode.discount_type === "percent"){
            setPriceWithPromoCode(totalPrice - (totalPrice * (discountPercent / 100)));
            console.log(priceWithPromoCode);
        } else {
            setPriceWithPromoCode(totalPrice - discountPercent);
        }
    }, [usedPromoCode, deliveryPrice, cartItems])

    if(!cartItems.total_price || cartItems.items.length === 0){
        return null;
    }

    return (
        <form className="checkout" onSubmit={handleSubmit(onSubmit)}>
            { console.log(newPostFilteredPostomats) }
            <h2 className="checkout__title">
                Оформлення замовлення
            </h2>
            { console.log(meestFilteredOffice) }
            <div className="checkout__content">
                <div className="checkout__form-container">
                    <div className="checkout__form">
                        <h5 className="checkout__form-title">
                            Контактні дані
                        </h5>
                        <div className="checkout__form-input-row">
                            <div className="checkout__form-input-container">
                                <label htmlFor="firstName" className="checkout__form-label">
                                    Ім'я *
                                </label>
                                <input type="text" id="firstName" name="firstName" 
                                {...register("firstName", {
                                    required: "Ім'я обов'язкове",
                                    minLength: {
                                        value: 1,
                                        message: "Мінімум 1 символ"
                                    },
                                    pattern: {
                                        value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{2,}$/,
                                        message: "Ім'я може містити тільки букви"
                                    }
                                })}
                                className={`checkout__form-input ${errors.firstName ? "error-input" : ""}`} placeholder="Введіть ваше ім'я" />

                                { errors.firstName && <p className="checkout__form-error-message">{ errors.firstName.message }</p> }
                            </div>
                            <div className="checkout__form-input-container">
                                <label htmlFor="lastName" className="checkout__form-label">
                                    Прізвище *
                                </label>
                                <input type="text" id="lastName" name="lastName" 
                                className={`checkout__form-input ${ errors.lastName ? "error-input" : "" }`} placeholder="Введіть ваше прізвище"
                                {...register("lastName", {
                                    required: "Прізвище обов'язкове",
                                    minLength: {
                                        value: 1,
                                        message: "Мінімум 1 символ",
                                    },
                                    pattern: {
                                        value: /^[A-Za-zА-Яа-яІіЇїЄєҐґ'-]{2,}$/,
                                        message: "Прізвище містить некоректні символи"
                                    }
                                })} />

                                { errors.lastName && <p className="checkout__form-error-message">{ errors.lastName.message }</p> }
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
                                    onChange={ (value) => setValue("phone", value, { showValidate: true }) } 
                                    excludeCountries={["ru"]}
                                    value={watch("phone")}
                                    minLength={8}/>
                                    <input type="hidden" name="phone" id="phone" className="checkout__form-input" />
                                </div>
                            </div>

                            <div className="checkout__form-input-container">
                                <label htmlFor="email" className="checkout__form-label">
                                    Електронна пошта *
                                </label>
                                
                                <input type="email" name="email" id="email" placeholder="Введіть ваш email"
                                className={`checkout__form-input ${errors.email ? "error-input": ""}`} 
                                { ...register("email", {
                                    required: "Введіть email",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Некоректний формат email"
                                    }
                                }) }/>

                                { errors.email && <p className="checkout__form-error-message">{ errors.email.message }</p> }
                            </div>
                        </div>

                        <div className="checkout__form-input-row checks-row">
                            <div className="checkout__form-input-container horizontalized">
                                <label htmlFor="charity" className="checkout__form-custom-checkbox">
                                    <input type="checkbox" id="charity" name="charity" 
                                    { ...register("charity") }
                                    className="checkout__form-custom-checkbox-input" />
                                    <span className="checkout__form-custom-checkbox-checkmark"></span>
                                    На благодійність
                                </label>
                            </div>

                            <div className="checkout__form-input-container horizontalized">
                                 <label htmlFor="other-person" className="checkout__form-custom-checkbox">
                                    <input type="checkbox" id="other-person" name="other-person" 
                                    { ...register("otherPerson") }
                                    className="checkout__form-custom-checkbox-input" />
                                    <span className="checkout__form-custom-checkbox-checkmark"></span>
                                    Отримувач інша людина
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="checkout__form">
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
                                        onChange={ (option) => {
                                            setValue("country", option.value);
                                            handleChangeSelectedCountry(option);
                                        }  }
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
                                    onChange={(option) => {
                                        setValue("city", option.value);
                                        handleChangeSelectedCity(option);
                                    }}
                                    styles={ selectFieldsCommonStyles }
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
                                            key={ index } onClick={() => {
                                                setValue("deliveryMethod", option.htmlFieldName);
                                                handleSelectNewLabel(index, value);
                                                handleFilteredOfficesList(option.htmlFieldName)
                                            }}>
                                                <label htmlFor={ option.htmlFieldName } 
                                                className={`checkout__form-label delivery-label 
                                                ${watch("deliveryMethod") === option.htmlFieldName ? "active" : ""}`}>
                                                    <div className="checkout__form-label-main-container">
                                                        <div className="checkout__form-default-radio">
                                                            <input type="radio" name="deliveryMethoOption" 
                                                            { ...register("deliveryMethod") }
                                                            id={ option.htmlFieldName }
                                                            value={ option.htmlFieldName } 
                                                            className="checkout__form-default-radio-input"
                                                            />
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

                                                {watch("deliveryMethod") === option.htmlFieldName && option.formContent(register, watch, control, errors,
                                                    getCurrentSelectedList())}
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>

                    <div className="checkout__form">
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
                                        <div className={`checkout__form-payment-method 
                                        ${watch("paymentMethod") === option.htmlFieldName ? "active": ''} `} 
                                        key={ index } onClick={ () => {
                                            setValue("paymentMethod", option.htmlFieldName);
                                            setSelectedPaymentOption(index, value);
                                        } }>
                                            <label htmlFor={ option.htmlFieldName } className="checkout__form-label payment-label">
                                                <div className="checkout__form-default-radio">
                                                    <input type="radio" name="paymentMethodOption"
                                                    { ...register("paymentMethod") }
                                                    id={ option.htmlFieldName } 
                                                    value={ option.htmlFieldName }
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
                    </div>

                    <div className="checkout__form">
                        <h5 className="checkout__form-title">
                            Коментар до замовлення
                        </h5>

                        <textarea className={`checkout__form-textarea ${errors.comment ? "error-input" : ""}`} rows={3} 
                        { ...register("comment", {
                            maxLength: {
                                value: 500,
                                message: "Максимум 500 символів"
                            }
                        })}
                        ></textarea>
                        { errors.comment && <p className="checkout__form-error-message">{ errors.comment.message }</p> }
                    </div>
                </div>    

                <div className="checkout__add-info">
                    <div className="checkout__cart-content">
                        <div className="checkout__cart-header">
                            { cartItems?.items?.length }{" "}{wordDeclension(cartItems?.items?.length)} у кошику
                            <button className={`checkout__cart-edit-btn ${ editCartMode ? "edit-cart" : "" }`}
                            onClick={() => toggleEditMode()} type="button">
                                <Image src={`/icons/edit${editCartMode ? "-white" : ""}.svg`} alt="" width="18" height="18" 
                                className={`checkout__cart-edit-img`} />
                            </button>
                        </div>

                        <div className="checkout__cart-body">
                            { cartItems?.items?.map((item, index) => (
                                <div className="checkout__cart-item" key={ index }>
                                    <div className="checkout__cart-item__left-part">
                                        <Link className="checkout__cart-item__image-container"
                                        href={`/book/${item.slug}`}>
                                            <Image src={ item.images[0].image_url } alt={ item.title } width="50" height="50" />
                                        </Link>
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
                                                
                                            </div>
                                        </div>    
                                    </div>
                                    
                                    <div className="checkout__cart-item__right-part">
                                        {!editCartMode ? (
                                            <div className="checkout__cart-quantity">
                                                { item.quantity } шт.
                                            </div>    
                                        ) : (
                                            <div className="checkout__cart-edit-container">
                                                <button className="checkout__cart-delete-item-btn" type="button"
                                                onClick={() => deleteItemFromCartHandler(item.book_id)}>
                                                    Видалити
                                                </button>    
                                                <div className="checkout__cart-change-quantity cart-body__quantity">
                                                    <div className="checkout__cart-change-quantity-feature cart-body__quantity-feature minus" onClick={() => changeQuantity(item.book_id, "minus")}>
                                                        <div className="checkout__cart-change-quantity-minus cart-body__minus"></div>
                                                    </div>

                                                    <input type="text" 
                                                    className="cart-body__quantity-input checkout__cart-change-quantity-input" 
                                                    value={ item.quantity === 0 ? "" : item.quantity } min="1" max="999"
                                                    onFocus={() => handleFocus(item.book_id)}
                                                    onChange={(e) => handleQuantityChangeLocal(item.book_id, e.target.value)}
                                                    onBlur={(e) => handleQuantityBlur(item.book_id, e.target.value)}/>

                                                    <div className="checkout__cart-change-quantity-feature cart-body__quantity-feature plus" onClick={() => changeQuantity(item.book_id, "add")}>
                                                        <div className="checkout__cart-change-quantity-plus"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )}    
                                    </div>
                                    
                                </div>
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
                            { !CookiesWorker.get("promo_code") && (
                                <div className="checkout__payment-text-row">
                                    <p className="checkout__payment-text">
                                        Подарунковий сертифікат чи промокод
                                    </p>
                                    <button className="checkout__payment-btn add-btn gray-btn" type="button"
                                    onClick={() => toggleAddPromo()}>
                                        Додати
                                    </button>
                                </div>    
                            ) }
                            { addPromo && (
                                <div className="checkout__add-promo-block">
                                    <input type="text" className="checkout__add-promo-input"
                                    name="promo"
                                    placeholder="Промокод чи сертифікат" value={ promoCode } onChange={(e) => setPromoCode(e.target.value)} />
                                    <button className="checkout__add-promo-button" type="button"
                                    disabled={ !promoCode.length === 0 || CookiesWorker.get("promo_code") }
                                    onClick={ () => addPromoCode() }>
                                        Застосувати
                                    </button>
                                </div>
                            ) }
                            {promoCodeError && (
                                <p className="checkout__form-error-message">{ promoCodeError }</p>
                            )}
                            { usedPromoCode.code && (
                                <div className="checkout__payment-bill-row">
                                    <p className="checkout__payment-type">
                                        Використаний купон:
                                    </p>
                                    <span className="checkout__payment-total-sum used-promo-tile">
                                        { usedPromoCode.code }
                                    </span>
                                </div>
                            ) }
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
                                    { !priceWithPromoCode ? cartItems?.total_price + deliveryPrice : priceWithPromoCode } грн
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

                            { priceWithPromoCode > 0 && (
                                <div className="checkout__payment-bill-row positive">
                                    <p className="checkout__payment-type smaller positive">
                                        Знижка з купону
                                    </p>
                                    <p className="checkout__payment-total-sum smaller positive">
                                        { cartItems?.total_price + deliveryPrice - priceWithPromoCode } грн
                                    </p>
                                </div>
                            ) }

                            <div className="checkout__payment-bonuses">
                                { showBonusInfo && (<BonusInfoModal />) }
                                <div className="checkout__payment-bill-row">
                                    <p className="checkout__payment-type">
                                        Бонуси за замовлення
                                        <Image src="/icons/info.svg" alt="" width="18" height="18"
                                        onClick={ () => toggleShowBonusInfo() } />
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
            
        </form>
    )
}
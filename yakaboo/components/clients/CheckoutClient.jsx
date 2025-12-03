"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { useForm, FormSubmit } from "react-hook-form";

import Endpoints from "../../endpoints"
import { useCartStore, useDeliveryCountryStore, useDeliveryOptionsStore } from "../../states";
import { CookiesWorker, fetchData} from "../../services"
import { wordDeclension } from "../../services/word-declension.service";
import { deliveryFormsDefaultValues, deliveryOptions, userData } from "../../services/checkoutOptions.service";
import { BonusInfoModal } from "../dynamic";
import { useRouter } from "next/navigation";
import { CommentForm, ContactDataForm, DeliveryDataForm, PaymentMethodForm } from "../shared";

export const CheckoutClient = () => {

    const [ addPromo, setAddPromo ] = useState(false);
    const [ editCartMode, setEditCartMode ] = useState(false);
    const [ showBonusInfo, setShowBonusInfo ] = useState(false);
    const [ promoCodeError, setPromoCodeError ] = useState("");
    const [ usedPromoCode, setUsedPromoCode ] = useState({});
    const [ promoCode, setPromoCode ] = useState("");
    const [ prevQuantities, setPrevQuantities ] = useState({})
    const [ priceWithPromoCode, setPriceWithPromoCode ] = useState(0);
    const { cartItems, setCartItems, updateCartItemQuantity } = useCartStore();

    const { selectedCity, selectedCountry, selectedDeliveryCountry } = useDeliveryCountryStore();

    const { deliveryPrice, setSelectedDeliveryOption, setDeliveryPrice,
     } = useDeliveryOptionsStore();

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
            <h2 className="checkout__title">
                Оформлення замовлення
            </h2>
            <div className="checkout__content">
                <div className="checkout__form-container">
                    <ContactDataForm register={ register } errors={ errors }
                    setValue={ setValue } watch={ watch } selectedCountry={ selectedCountry } />

                    <DeliveryDataForm setValue={setValue} register={register} watch={watch} control={control} errors={errors} />

                    <PaymentMethodForm watch={ watch } register={ register } setValue={ setValue } />

                    <CommentForm register={ register } errors={ errors } />
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
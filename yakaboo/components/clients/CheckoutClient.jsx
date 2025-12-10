"use client"

import { useEffect } from "react"

import { useForm, FormSubmit } from "react-hook-form";

import { useCartStore, useDeliveryCountryStore, useDeliveryOptionsStore, usePromoCodeStore } from "../../states";
import { deliveryFormsDefaultValues, deliveryOptions, userData } from "../../services/checkoutOptions.service";
import { useRouter } from "next/navigation";
import { CartComponent, CheckoutPaymentInfo, CommentForm, ContactDataForm, DeliveryDataForm, OtherPersonDataForm, PaymentMethodForm } from "../shared";

export const CheckoutClient = () => {
    const { cartItems } = useCartStore();
    const { usedPromoCode, initPromoCode, calculateDiscountPrice } = usePromoCodeStore();
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
            otherPersonFirstName: "",
            otherPersonLastName: "",
            otherPersonPhone: "",
            dontCall: false,
            ...deliveryFormsDefaultValues
        }
    });

    const deliveryMethod = watch("deliveryMethod");
    const router = useRouter();

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

    useEffect(() => {
       initPromoCode();
    }, [])

    useEffect(() => {
        const totalPrice = cartItems?.total_price + deliveryPrice;
       
        calculateDiscountPrice(totalPrice);
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

                    { watch("otherPerson") && (
                        <OtherPersonDataForm register={ register } errors={ errors } setValue={ setValue } watch={ watch }
                        selectedCountry={ selectedCountry } />
                    ) }

                    <DeliveryDataForm setValue={setValue} register={register} watch={watch} control={control} errors={errors} />

                    <PaymentMethodForm watch={ watch } register={ register } setValue={ setValue } />

                    <CommentForm register={ register } errors={ errors } />
                </div>    

                <div className="checkout__add-info">
                    <CartComponent />
                    <CheckoutPaymentInfo />
                </div>
            </div>  
        </form>
    )
}
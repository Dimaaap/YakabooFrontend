"use client"

import PhoneInput from "react-phone-input-2"
import { CookiesWorker } from "../../services"
import { useState } from "react"

export const CheckoutClient = () => {
    const userData = {
        firstName: CookiesWorker.get("first_name"),
        lastName: CookiesWorker.get("last_name"),
        phone: CookiesWorker.get("phone_number"),
        email: CookiesWorker.get("email")
    }

    const [ selectedCountry, setSelectedCountry ] = useState("UA");

    return (
        <div className="checkout">
            <h2 className="checkout__title">
                Оформлення замовлення
            </h2>

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
                                    "border": "1px solid #ddd"
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

                    <div className="checkout_form-input-row checks-row">
                        <div className="checkout__form-input-container">
                            <input type="checkbox" className="checkout__form-input" name="charity" id="charity" checked={false} />
                            <label htmlFor="charity" classNamee="checkout__form-label checkbox-label">
                                На благодійність
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
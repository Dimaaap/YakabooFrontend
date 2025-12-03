"use client";

import PhoneInput from "react-phone-input-2"

export const PhoneInputField = ({ watch, setValue, selectedCountry }) => {
    return(
       <div className="checkout__form-input-container">
        <label htmlFor="phone" className="checkout__form-label">
            Номер телефону
        </label>
        <div className="form__paired-inputs">
            <PhoneInput
                className="form__country-select"
                country={ selectedCountry.toLowerCase() }
                disableDropdown={ false }
                inputStyle={{
                    "height": "45px", "width": "100%", "backgroundColor": "#F4F6F8",
                    "border": "1px solid #ddd", "borderRadius": "10px", "fontSize": "14px",
                    "paddingInline": "2%", "outline": "none", "color": "black", "fontWeight": "500"
                }}
                preferredCountries={["ua"]}
                onChange={( value ) => setValue("phone", value, { showValidate: true })}
                excludeCountries={["ru"]}
                value={ watch("phone") }
                minLength={ 8 }
            />
            <input type="hidden" name="phone" id="phone" className="checkout__form-input" />
        </div>
       </div>
    )
}
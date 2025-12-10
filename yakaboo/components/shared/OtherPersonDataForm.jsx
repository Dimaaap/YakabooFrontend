import { Checkbox, FormInput } from "."
import { validationRules } from "../../services"
import { PhoneInputField } from "./PhoneInput"

export const OtherPersonDataForm = ({ register, errors, setValue, watch, selectedCountry }) => {
    return(
        <div className="checkout__form">
            <h5 className="checkout__form-title">Отримувач замовлення</h5>
            <div className="checkout__form-input-row">
                <FormInput id="otherPersonFirstName" label="Ім'я *" placeholder="Введіть ім'я отримувача"
                register={ register } validation={ validationRules.firstName } errors={ errors } />

                <FormInput id="otherPersonLastName" label="Прізвище *" placeholder="Введіть прізвище отримувача"
                register={ register } validation={ validationRules.lastName } errors={ errors } />
            </div>

            <div className="checkout__form-input-row with-one-checkout">
                <PhoneInputField watch={ watch } setValue={ setValue } selectedCountry={ selectedCountry } 
                id="otherPersonPhone" />

                <Checkbox id="dontCall" label="Не дзвонити - це подарунок" register={ register } />
            </div>
        </div>
    )
}
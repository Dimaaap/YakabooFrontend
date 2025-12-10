import { validationRules } from "../../services";
import { FormInput, Checkbox } from ".";
import { PhoneInputField } from "./PhoneInput";


export const ContactDataForm = ({ register, errors, setValue, watch, selectedCountry }) => {
  return (
    <div className="checkout__form">
      <h5 className="checkout__form-title">Контактні дані</h5>
      <div className="checkout__form-input-row">
        <FormInput id="firstName" label="Ім'я *" placeholder="Введіть ваше ім'я"
        register={ register } validation={ validationRules.firstName } errors={ errors } />

        <FormInput id="lastName" label="Прізвище *" placeholder="Введіть ваше прізвище" 
        register={ register } validation={ validationRules.lastName } errors={ errors }/>
      </div>

      <div className="checkout__form-input-row">
        <PhoneInputField watch={ watch } setValue={ setValue } 
        selectedCountry={ selectedCountry } id="phone" />        
        <FormInput id="email" type="email" label="Електронна пошта *" placeholder="Введіть ваш email" register={ register }
        validation={ validationRules.email } errors={ errors }/>
      </div>

      <div className="checkout__form-input-row checks-row">
        <Checkbox id="charity" label="На благодійність" 
        register={ register } />
        <Checkbox id="otherPerson" label="Отримувач інша людина"
        register={ register }
         />
      </div>
    </div>
  );
};

import { parsePhoneNumberFromString } from 'libphonenumber-js';


export class FormValidator{

    EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    REG_EMAIL_FAILED_MESSAGE = "Некоректний email"
    REG_PASSWORD_VALIDATOR = /^(?=.*\d)(?=.*[a-zA-Zа-яА-Я]).{8,}$/
    REG_PASSWORD_FAILED_MESSAGE = "Пароль має містити хоча б одну цифру і літеру"
    REG_NAME_VALIDATOR = /^[A-Za-zА-Яа-яЇїІіЄєґҐ\-\'']+$/
    REG_NAME_FAILED_MESSAGE = "Використовуйте лише літери, апостроф та дефіс"

    

    validateEmailRegex(email){
        return this.EMAIL_REGEX.test(email)
    }

    validatePhoneNumber = value => {
        const phoneNumber = parsePhoneNumberFromString(value);
        return phoneNumber && phoneNumber.isValid();
    }
}
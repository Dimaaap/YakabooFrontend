"use client"

import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';

import { useForm } from 'react-hook-form';

import { useUserLoginModalStore, useConfirmationCodeStore } from '../../states';
import Endpoints from '../../endpoints';
import { CookiesWorker, FormValidator, handleBackdropClick } from '../../services';
import { FlashMessage } from '../shared';
import { useBlockBodyScroll } from '../../hooks';

const UserRegisterModal = () => {

    const {isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen} = useUserLoginModalStore();
    const { setIsConfirmationModalOpen } = useConfirmationCodeStore();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("UA");

    const ONE_MONTH = 43_200;

    useBlockBodyScroll(isRegisterModalOpen)
    let formValidator = new FormValidator()

    const {register, handleSubmit, formState: { errors }, setValue} = useForm();


    const onSubmit = async data => {
        try {
            const result = await registerUser(data);
        } catch(error) {
            setServerError(error)
        }
    }

    const changeModal = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true);
    }

    const toggleShowPassword = () => {
        if(showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const registerUser = async data => {
        try {
            setLoading(true);
            const response = await fetch(Endpoints.USER_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                if(response.status === 400){
                    setServerError("Користувач з таким email уже зареєстрований")
                } else if(response.status === 500 || response.status === 422){
                    setServerError("Помилка сервера")
                } else if(response.status === 409){
                    setServerError("Користувач з таким номером телефону уже зареєстрований")
                }
            } else {
                const result = await response.json();
                let userData = {
                        "phone_number": result.phone_number,
                        "first_name": result.first_name,
                        "last_name": result.last_name,
                        "email": result.email
                    }
                Object.entries(userData).forEach(([key, value]) => {
                    CookiesWorker.setWithTimer(key, value, ONE_MONTH)
                })
                setServerError(null)
                setIsRegisterModalOpen(false);
                setIsConfirmationModalOpen(true);
            }
        } catch(error){
            console.log(error)
            setServerError("Помилка сервера")
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="menu login-modal" onClick={e => handleBackdropClick(e, setIsRegisterModalOpen)}>
        { serverError && <FlashMessage message={ serverError } onClose={() => setServerError(null)} /> }
        <div className="login-modal__content register-content">
            <button className="menu__close login-modal__close" type="button" onClick={() => setIsRegisterModalOpen(false)}>
                <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" />
            </button>
            <div className="login-modal__header register">
                <p className="login-modal__welcome register">Реєстрація</p>
                <div className="login-modal__user-icon-container">
                    <Image src="/icons/user-white.svg" alt="" width="18" height="18" />
                </div>
            </div>
            <form className="login-modal__form login-form form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__field-group">
                    <label htmlFor="first_name" className="form__label" method="post">
                        Ваше ім'я *
                    </label>
                    <input name="first_name" id="first_name" 
                    className={`form__input ${errors.first_name ? "failed-input": ""}`} 
                    placeholder="Введіть ваше ім'я" type="text" 
                    {...register("first_name", {
                        required: "Це поле обов'язкове",
                        pattern: {
                            value: formValidator.REG_NAME_VALIDATOR,
                            message: formValidator.REG_NAME_FAILED_MESSAGE
                        }
                    })}/>
                    { errors.first_name && (
                        <span className="form__message-text">{ errors.first_name.message }</span>
                    ) }
                </div>
                <div className="form__field-group">
                    <label htmlFor="last_name" className="form__label">
                        Ваше прізвище *
                    </label>
                    <input name="last_name" id="last_name" 
                    className={`form__input ${errors.last_name ? "failed-input": ""}`}
                    placeholder="Введіть ваше прізвище" type="text" 
                    {...register("last_name", {
                        required: "Це поле обов'язкове",
                        pattern: {
                            value: formValidator.REG_NAME_VALIDATOR,
                            message: formValidator.REG_NAME_FAILED_MESSAGE
                        }
                    })}/>
                    { errors.last_name && (
                        <span className="form__message-text">{ errors.last_name.message }</span>
                    ) }
                </div>
                <div className="form__field-group">
                    <label htmlFor="phone_number" className="form__label">
                        Номер телефону *
                    </label>
                    <div className="form__paired-inputs">
                        <PhoneInput className="form__country-select" 
                            country={selectedCountry.toLowerCase()}
                            disableDropdown={false}
                            inputStyle={{
                                "height": "45px", "width": "100%", "backgroundColor": "#F4F6F8", 
                                "border": "1px solid #ddd"
                            }}
                            preferredCountries={["ua"]}
                            onChange={phone => setValue("phone_number", phone)}
                            excludeCountries={["ru"]}
                            minLength={8}
                        />
                        <input type="hidden" {...register("phone_number", {
                            required: "Номер телефону обов'язковий",
                            validate: formValidator.validatePhoneNumber
                        })} />
                    </div>
                    {errors.phone_number && (
                        <span className="form__message-text">{ errors.phone_number.message }</span>
                    )}
                </div>
                <div className="form__field-group">
                    <label htmlFor="email" className="form__label">
                        Електронна пошта *
                    </label>
                    <input name="email" id="email" className={`form__input ${errors.email ? "failed-input" : ""}`}
                    placeholder="Введіть email"
                    type="email" {...register("email", {
                        required: "Це поле обов'язкове",
                        pattern: {
                            value: formValidator.EMAIL_REGEX,
                            message: formValidator.REG_NAME_FAILED_MESSAGE
                        }
                    })}/>
                    { errors.email && (
                        <span className="form__message-text">{ errors.email.message }</span>
                    ) }
                </div>
                <div className="form__field-group">
                    <div className="form__block-content">
                        <label htmlFor="password" className="form__label">
                            Пароль *
                        </label>   
                        <span className="form__hint">
                            Не менше восьми знаків без урахування пробілів на початку та в кінці
                        </span>
                    </div>
                    <div className="form__input-wrapper">
                        <input 
                            name="password" id="password" 
                            className={`form__input password-input ${errors.password ? "failed-input": ""}`} 
                            placeholder="Введіть пароль" type={`${ showPassword ? "text": "password" }`} 
                            {...register('password', {
                                required: "Це поле обов'язкове",
                                minLength: {
                                    value: 8,
                                    message: "Пароль повинен містити не менше 8 символів"
                                },
                                pattern: {
                                    value: formValidator.REG_PASSWORD_VALIDATOR,
                                    message: formValidator.REG_PASSWORD_FAILED_MESSAGE
                                }
                            })}
                        />    
                        <Image 
                        src={`${!showPassword ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                        alt="" width="16" height="16" 
                        className={`form__eye register-eye ${showPassword ? "open-eye register-open" : ""}`} 
                        onClick={toggleShowPassword} />
                    </div>

                    {errors.password && (
                        <span className="form__message-text">{ errors.password.message }</span>
                    )}
                </div>
                <div className="form__field-group checkbox-group">
                    <label className="form__label custom-checkbox">
                        <input type="checkbox" className="form__form-checkbox" 
                        {...register("agree", {required: "Потрібно погодитись з умовами"})} />
                        <span className="form__checkbox-custom"></span>
                        Погоджуюсь з <Link href="#" className="form__agree-link">
                            умовами використання
                        </Link>
                    </label>
                    { errors.agree && (
                        <span className="form__message-text">{ errors.agree.message }</span>
                    ) }
                </div>
                <span className="form__additional-info">
                    Реєструючись, ви погоджуєтесь на зберігання і використання 
                    компанією "Якабу Ритейл" наданих вами особистих даних відповідно 
                    до чинного законодавства України про недоторканість до особистої 
                    інформації.
                </span>
                <button className={`form__submit-btn ${ loading ? "load-btn" : "" }`} type="submit">
                    { loading ? (
                        <Image src="./icons/spinner.svg" alt="" className="form__spinner spin-animated" 
                        width="20" height="20" />
                    ) : "Зареєструватись" }
                </button>
            </form>
            <p className="login-modal__additional-info">
                Вже маєте акаунт? {" "}
                <span className="login-modal__link-span" onClick={ changeModal }>Увійти</span>
            </p>
        </div>
    </div>
  )
}

export default UserRegisterModal
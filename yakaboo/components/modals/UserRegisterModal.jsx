"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useUserLoginModalStore } from '../../states';
import Link from 'next/link';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
import { useForm } from 'react-hook-form';

export const UserRegisterModal = () => {

    const {isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen} = useUserLoginModalStore();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("UA")

    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    const REG_NAME_VALIDATIOR = /^[A-Za-zА-Яа-яЇїІіЄєґҐ\-\'']+$/
    const REG_FAILED_MESSAGE = "Використовуйте лише літери, апостроф та дефіс"
    const REG_EMAIL_VALIDATOR = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const REG_EMAIL_FAILED_MESSAGE = "Некоректний email"

    const handleCountryChange = code => {
        setSelectedCountry(code);
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsRegisterModalOpen(false);
        }
    }

    const onSubmit = async data => {
        console.log(data);
    }

    useEffect(() => {
        if(isRegisterModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        
        return(() => {
            document.body.style.overflow = ""
        })
    }, [isRegisterModalOpen])

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

  return (
    <div className="menu login-modal" onClick={handleBackdropClick}>
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
                            value: REG_NAME_VALIDATIOR,
                            message: REG_FAILED_MESSAGE
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
                            value: REG_NAME_VALIDATIOR,
                            message: REG_FAILED_MESSAGE
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
                            excludeCountries={["ru"]}
                            minLength={8}
                        />
                    </div>
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
                            value: REG_EMAIL_VALIDATOR,
                            message: REG_EMAIL_FAILED_MESSAGE
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
                    <input name="password" id="password" className="form__input" 
                    placeholder="Введіть пароль" type={`${ showPassword ? "text": "password" }`}/>

                    <Image src={`${!showPassword ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                        alt="" width="16" height="16" className={`form__eye register-eye ${showPassword ? "open-eye register-open" : ""}`} 
                        onClick={toggleShowPassword} />
                </div>
                <div className="form__field-group checkbox-group">
                    <label className="form__label custom-checkbox">
                        <input type="checkbox" className="form__form-checkbox" />
                        <span className="form__checkbox-custom"></span>
                        Погоджуюсь з <Link href="#" className="form__agree-link">
                            умовами використання
                        </Link>
                    </label>
                </div>
                <span className="form__additional-info">
                    Реєструючись, ви погоджуєтесь на зберігання і використання 
                    компанією "Якабу Ритейл" наданих вами особистих даних відповідно 
                    до чинного законодавства України про недоторканість до особистої 
                    інформації.
                </span>
                <button className="form__submit-btn" type="submit">
                    Зареєструватись
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


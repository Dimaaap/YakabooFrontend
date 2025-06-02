"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUserLoginModalStore } from '../../states';

import { useForm } from "react-hook-form"
import Endpoints from '../../endpoints';
import { setCookiesWithTimer, validateEmailRegex } from '../../utils';

export const UserLoginModal = ({ afterClose = null }) => {

    const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } = useUserLoginModalStore();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [sendgingLoading, setSendingLoading] = useState(false)
  
    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm();

    const REG_EMAIL_VALIDATOR = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const REG_EMAIL_FAILED_MESSAGE = "Некоректний email"
    const REG_PASSWORD_VALIDATOR = /^(?=.*\d)(?=.*[a-zA-Zа-яА-Я]).{8,}$/
    const REG_PASSWORD_FAILED_MESSAGE = "Пароль має містити хоча б одну цифру і літеру"
    const TWO_MINUTES = 2 * 60 * 1000;


    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsLoginModalOpen(false);
        }
    }

    useEffect(() => {
        if(isLoginModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    
        return() => {
            document.body.style.overflow = ""
        }
    }, [isLoginModalOpen])

    const toggleShowPassword = () => {
        if(showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handleUserForgotPassword = async(event) => {
        event.preventDefault()
        setServerError(null)

        const email = getValues("email")
        console.log(email)

        if(!email){
            setEmailError("Це поле обов'язкове")
        } else if(!validateEmailRegex(email)){
            setEmailError("Неправильний формат email")
        } else {
            try {
                setSendingLoading(true)
                setEmailError(null)
                const response = await fetch(Endpoints.CHANGE_PASSWORD_WITH_EMAIL, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_email: email
                    })
                })

                if(response.ok){
                    const resp = await response.json();

                    setInfoMessage(`Відправили вам оновлений пароль на email: ${email}`)

                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 10000)

                    setIsButtonDisabled(true)
                    setTimeout(() => setIsButtonDisabled(false), TWO_MINUTES)
                } else {
                    const error = await response.json();
                    console.error(error);
                    setServerError("Користувач з таким email не зареєстрований")
                }
            } catch(error){
                setServerError("Користувач з таким email не зареєстрований")
            } finally {
                setSendingLoading(false)
            }
        }
    }

    const onSubmit = async data => {
        try {
            const result = await loginUser(data);
        } catch(error){
            setServerError(error)
        }
    }

    const changeModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    }


    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
        if(afterClose){
            afterClose()
        }
    }

    const loginUser = async (data) => {
        try {
            const response = await fetch(Endpoints.USER_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            if(!response.ok){
                const errorData = await response.json();
                if(response.status === 401){
                    setError("password", {
                        type: "manual",
                        message: "Неправильний пароль"
                    })
                    setServerError(null)
                } else {
                    setServerError(errorData.detail || "Невідома помилка")   
                    throw new Error(`HTTP Error! Status: ${response.status}`) 
                }
            } else {
                const result = await response.json();
                const access_token = result.access_token;
                const refresh_token = result.refresh_token;
                setCookiesWithTimer("access_token", access_token, 30)
                setCookiesWithTimer("refresh_token", refresh_token, 60 * 24 * 7)
                setCookiesWithTimer("token_type", result.token_type)
                setCookiesWithTimer("email", result.user.email)
                setCookiesWithTimer("first_name", result.user.first_name)
                setCookiesWithTimer("last_name", result.user.last_name)
                setCookiesWithTimer("phone_number", result.user.phone_number)
                setServerError(null)
                setIsLoginModalOpen(false);
            }
        } catch(error){
            console.error(error)
            setServerError("Помилка сервера")
        }
    }

  return (
    <div className="menu login-modal" onClick={handleBackdropClick}>
      <div className="login-modal__content">
        <button className="menu__close login-modal__close" type="button" onClick={() => setIsLoginModalOpen(false)}>
            <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" onClick={ handleCloseModal } />
        </button>
        <div className="login-modal__header">
            <div className="login-modal__user-icon-container">
                <Image src="/icons/user-white.svg" alt="" width="18" height="18" />
            </div>
            <div className="login-modal__text-container">
                <p className="login-modal__welcome">Вхід до акаунту</p>
                <p>
                    Щоб слідкувати за статусом замовлення та отримувати 
                    індивідуальні рекомендації
                </p>
            </div>
        </div>
        <button className="login-modal__login-with" type="button">
            <Image src="/icons/social/google.svg" alt="" width="16" height="16" />
            Продовжити через Google
        </button>
        <div className="login-modal__separator separator">
            <span className="separator-line" />
            <span className="separator-text">або</span>
            <span className="separator-line" />
        </div>
        <form className="login-modal__form login-form form" method="post"
        onSubmit={ handleSubmit(onSubmit) }>
            <div className="form__field-group">
                <label htmlFor="email" className="form__label">
                    Email *
                </label>
                <input name="email" id="email" 
                className={`form__input ${ errors.email || serverError || emailError ? "failed-input": "" }`} 
                placeholder='Введіть email' type="email" 
                {...register("email", {
                    required: "Це поле обов'язкове",
                    pattern: {
                        value: REG_EMAIL_VALIDATOR,
                        message: REG_EMAIL_FAILED_MESSAGE
                    }
                })}/>
                { errors.email && (
                    <span className="form__message-text">{ errors.email.message }</span>
                ) }

                { emailError && (
                    <span className="form__message-text">{ emailError }</span>
                ) }

                { serverError && (
                    <span className="form__message-text">{ serverError }</span>
                ) }
            </div>
            <div className="form__field-group">
                <div className="form__field-row">
                    <label htmlFor="password" className="form__label">
                        Пароль *
                    </label> 
                    <button className={`form__forgot-password ${ isButtonDisabled ? "disabled": "" }`}
                    type="button" disabled={ isButtonDisabled }
                    onClick={ handleUserForgotPassword }>
                        Забули пароль?
                    </button>   
                </div>
                <div className="form__input-wrapper">
                    <input name="password" 
                    id="password" 
                    className={`form__input password-input ${errors.password ? "failed-input": ""}`}
                    placeholder="Введіть пароль" 
                    type={`${ showPassword ? "text": "password" }`}
                    {...register("password", {
                        required: "Це поле обов'язкове",
                        minLength: {
                            value: 8,
                            message: "Пароль повинен містити не менше 8 символів"
                        },
                        pattern: {
                            value: REG_PASSWORD_VALIDATOR,
                            message: REG_PASSWORD_FAILED_MESSAGE
                        }
                    })}/>

                    <Image src={`${!showPassword ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                    alt="" width="16" height="16" className={`form__eye login-eye ${showPassword ? "open-eye" : ""}`} 
                    onClick={toggleShowPassword} />
                </div>
                { errors.password && (
                    <span className="form__message-text">{ errors.password.message }</span>
                    ) }
                { infoMessage && (
                    <span className="form__info-message-container">
                        { infoMessage }
                    </span>
                ) }

                { sendgingLoading && (
                    <Image src="/icons/spinner.svg" width="20" height="20" alt="" className="animate-spin" />
                ) }
            </div>
            <button className="form__submit-btn" type="submit">
                Увійти
            </button>
        </form>
        <p className="login-modal__additional-info">
            Немає акаунту? {" "}
            <span className="login-modal__link-span" onClick={ changeModal }>Зареєструватись</span>
        </p>
      </div>
    </div>
  )
}

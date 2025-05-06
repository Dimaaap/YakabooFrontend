"use client";

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useUserLoginModalStore } from '../../states';

export const UserLoginModal = () => {

    const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } = useUserLoginModalStore();
    const [showPassword, setShowPassword] = useState(false);

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
    
        return(() => {
            document.body.style.overflow = ""
        })
    }, [isLoginModalOpen])

    const toggleShowPassword = () => {
        if(showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const changeModal = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(true);
    }

  return (
    <div className="menu login-modal" onClick={handleBackdropClick}>
      <div className="login-modal__content">
        <button className="menu__close login-modal__close" type="button" onClick={() => setIsLoginModalOpen(false)}>
            <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" />
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
        <form className="login-modal__form login-form form" method="post">
            <div className="form__field-group">
                <label htmlFor="phone_number" className="form__label">
                    Номер телефону *
                </label>
                <input name="phone_number" id="phone_number" className="form__input" 
                placeholder='Введіть номер або email' type="tel"/>
            </div>
            <div className="form__field-group">
                <div className="form__field-row">
                    <label htmlFor="password" className="form__label">
                        Пароль *
                    </label> 
                    <span className="form__forgot-password">
                        Забули пароль?
                    </span>   
                </div>
                <input name="password" id="password" className="form__input" 
                placeholder="Введіть пароль" type={`${ showPassword ? "text": "password" }`}/>

                <Image src={`${!showPassword ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                alt="" width="16" height="16" className={`form__eye ${showPassword ? "open-eye" : ""}`} 
                onClick={toggleShowPassword} />
            </div>
            <button className="form__submit-btn disabled" type="submit" disabled>
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

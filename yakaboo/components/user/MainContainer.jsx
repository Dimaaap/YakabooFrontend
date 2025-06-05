"use client"

import React, { useState } from 'react'
import { useForm } from "react-hook-form"

import Image from "next/image";
import { useUserData } from '../../hooks';
import { changeUserPassword, updateUserData } from '../../services/user.service';
import { DateTime } from '../../services';
import { getUniqueErrorField, getUserFullName } from '../../utils';
import { CookiesWorker } from '../../services/cookies.service';
import { FlashMessage, NoneSpan } from '../shared';

const MainContainer = () => {

    const { userData, updateFieldValue, getDataToUpdate } = useUserData();

    const [showPassword, setShowPassword] = useState(false);
    const [newPasswordShow, setNewPasswordShow] = useState(false);
    const [visibleForms, setVisibleForms] = useState([])
    const [showFlashMessage, setShowFlashMessage] = useState(false)
    const [passwordFormError, setPasswordFormError] = useState(null)
    const [uniqueError, setUniqueError] = useState({email: "", phone_number: ""})
    
    const {register, handleSubmit, formState: { errors }} = useForm();

    const PHONE_EXISTS_MSG = "Користувач з таким номером телефону вже зареєстрований"
    const EMAIL_EXISTS_MSG = "Користувач з таким email уже зареєстрований"
    const dateTime = new DateTime()


    const handleChangePasswordForm = async (data) => {

        try {
            const response = await changeUserPassword(data)
            if(response.ok){
                setShowFlashMessage(true);
                closeForm(4);
                setPasswordFormError(null);
            } else {
                setPasswordFormError(response.status === 401 
                    ? "Ви ввели неправильний пароль"
                    : "Помилка сервера"
                )
            }
        } catch(err){
            console.error(err)
        }
    }

    const handleSaveChangesButton = async(e, formId) => {
        e.preventDefault();
        const userEmail = CookiesWorker.get("email")
        const updates = getDataToUpdate()

        const body = {
            "phone_number": CookiesWorker.get("phone_number"),
            ...updates
        }

        try {
            const response = await updateUserData(body, userEmail)
            const responseData = await response.json();

            if(response.ok) {
                CookiesWorker.saveCookies(responseData);
                setShowFlashMessage(true)
                closeForm(formId)
                setUniqueError({phone_number: "", email: ""})
            } else {
                const errorField = getUniqueErrorField(message.detail);
                if(errorField === "phone_number"){
                    setUniqueError(prevState => ({
                        ...prevState,
                        phone_number: PHONE_EXISTS_MSG
                    }))
                } else {
                    setUniqueError(prevState => ({
                        ...prevState,
                        email: EMAIL_EXISTS_MSG
                    }))
                }
            }
        } catch(error){
            console.error(error)
        }
    }


    const toggle = setter => setter(prev => !prev);

    const toggleShowPassword = () => toggle(setShowPassword)
    const toggleNewPasswordShow = () => toggle(setNewPasswordShow)

    const openForm = formId => setVisibleForms([...visibleForms, formId])
    const closeForm = formId => setVisibleForms(visibleForms.filter(id => id !== formId))

  return (
    <div className="user-data">
        { showFlashMessage && <FlashMessage message="Дані вашого профілю успішно оновлені" 
        onClose={() =>setShowFlashMessage(false)} /> }
        <p className="user-data__title">
            Інформація
        </p>
        { !visibleForms.includes(1) ? (
            <div className="user-data__row">
                <div className="user-data__cell">
                    <span className="user-data__field-title">
                        Ім'я
                    </span>
                    <p className="user-data__user-info">
                        { getUserFullName() }
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={() => openForm(1)}>Змінити</button>
            </div>
        ) : (
            <div className="user-data__form-container">
                <form className="user-data__form">
                    <div className="user-data__field-group">
                        <label htmlFor='first_name' className="user-data__field-label">
                            Ім'я
                        </label>
                        <input type="text" placeholder="Введіть ім'я" autoComplete="false"
                        className="user-data__field-input" name="first_name" id="first_name"
                        value={ userData.first_name } onInput={(e) => updateFieldValue(e, "first_name")} />
                    </div>
                    <div className="user-data__field-group">
                        <label htmlFor='last_name' className="user-data__field-label">
                            Прізвище
                        </label>
                        <div className="user-data__last-form-input">
                            <input type="text" placeholder="Введіть прізвище" autoComplete="false"
                            className="user-data__field-input" name="last_name" id="last_name" 
                            value={ userData.last_name } onInput={(e) => updateFieldValue(e, "last_name")} />
                            <div className="user-data__btns-row">
                                <button className="user-data__submit-btn" type="submit"
                                onClick={(e) => handleSaveChangesButton(e, 1)}>
                                    Зберегти
                                </button>
                                <button className="user-data__cancel-btn" type="button" 
                                onClick={ () => closeForm(1) }>
                                    Скасувати
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) }

        { !visibleForms.includes(2) ? (
            <div className="user-data__row">
                <div className="user-data__cell">
                    <span className="user-data__field-title">
                        Електронна пошта
                    </span>
                    <p className="user-data__user-info">
                        { CookiesWorker.get("email") }
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={() => openForm(2)}>Змінити</button>
            </div>
        ) : (
            <div className="user-data__form-container">
                <form className="user-data__form">
                    <div className="user-data__field-group">
                        <label htmlFor='email' className="user-data__field-label">
                            Електронна пошта
                        </label>
                        <div className="user-data__last-form-input">
                            <input type="text" placeholder="Введіть email" autoComplete="false"
                            className="user-data__field-input" name="email" id="email" 
                            value={ userData.email } onChange={(e) => updateFieldValue(e, "email")} />
                            <div className="user-data__btns-row">
                                <button className="user-data__submit-btn" type="submit"
                                onClick={(e) => handleSaveChangesButton(e, 2)}>
                                    Зберегти
                                </button>
                                <button className="user-data__cancel-btn" type="button"
                                onClick={() => closeForm(2)}>
                                    Скасувати
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) }

        { !visibleForms.includes(3) ? (
            <div className="user-data__row">
                <div className="user-data__cell">
                    <span className="user-data__field-title">
                        Номер телефону
                    </span>
                    <p className="user-data__user-info">
                        +{ CookiesWorker.get("phone_number") }
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={ () => openForm(3) }>Змінити</button>
            </div>
        ) : (
            <div className="user-data__form-container">
                <form className="user-data__form">
                    <div className="user-data__field-group">
                        <label htmlFor='phoneNumber' className="user-data__field-label">
                            Номер телефону
                        </label>
                        <div className="user-data__last-form-input">
                            <input type="tel" placeholder="Введіть номер телефону" autoComplete="false"
                            className="user-data__field-input" name="phoneNumber" id="phoneNumber" 
                            maxLength={13} value={ "+"+userData.phone_number } 
                            onChange={ (e) => updateFieldValue(e, "phone_number") } />
                            <div className="user-data__btns-row">
                                <button className="user-data__submit-btn" type="submit"
                                onClick={(e) => handleSaveChangesButton(e, 3)}>
                                    Зберегти
                                </button>
                                <button className="user-data__cancel-btn" type="button"
                                onClick={ () => closeForm(3) }>
                                    Скасувати
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>    
        ) }
        
        { !visibleForms.includes(4) ? (
            <div className="user-data__row">
                <div className="user-data__cell">
                    <span className="user-data__field-title">
                        Пароль
                    </span>
                    <p className="user-data__user-info">
                        *******
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={() => openForm(4)}>Змінити</button>
            </div>
        ) : (
            <div className="user-data__form-container">
                <form className="user-data__form" method="post" onSubmit={ handleSubmit(handleChangePasswordForm) }>
                    <div className="user-data__field-group">
                        <label htmlFor='old_password' className="user-data__field-label">
                            Старий пароль
                        </label>
                        <input type={`${ showPassword ? "text": "password" }`} placeholder="Введіть старий пароль" 
                        autoComplete="false"
                        className="user-data__field-input"
                        name="old_password" id="old_password" 
                        {...register("old_password", {
                            required: "Це поле обов'язкове"
                        })} />
                        { errors.old_password && 
                        <span className="form__message-text">
                            { errors.old_password.message }
                        </span> }

                        { passwordFormError && <span className="form__message-text">{ passwordFormError }</span> }
                        <Image src={`${!showPassword ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                            alt="" width="16" height="16" className={`form__eye new-password-eye ${showPassword ? "open-eye" : ""}`} 
                            onClick={toggleShowPassword} />
                    </div>
                    <div className="user-data__field-group">
                        <div className="user-data__text-block">
                            <label htmlFor='new_password' className="user-data__field-label">
                                Новий пароль
                            </label>
                            <span className="user-data__additional-info">
                                Не менше восьми знаків без урахування пробілів на початку 
                                та в кінці
                            </span>
                        </div>
                        <div className="user-data__last-form-input">
                            <input type={`${ newPasswordShow ? "text": "password" }`} placeholder="Введіть новий пароль" autoComplete="false"
                            className="user-data__field-input" name="new_password" id="new_password" 
                            { ...register("new_password", {
                                required: "Пароль обов'язковий",
                                minLength: {
                                    value: 8,
                                    message: "Пароль повинен містити не менше 8 символів"
                                },
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-zA-Zа-яА-Я]).{8,}$/,
                                    message: 'Пароль має містити хоча б одну цифру і літеру',
                                }
                            }) }/>
                            <Image src={`${!newPasswordShow ? "/icons/eye-close.svg": "/icons/eye.svg"}`} 
                            alt="" width="16" height="16" className={`form__eye new-password-eye ${newPasswordShow ? "open-eye" : ""}`} 
                            onClick={ toggleNewPasswordShow } />
                            <div className="user-data__btns-row">
                                <button className="user-data__submit-btn" type="submit">
                                    Зберегти
                                </button>
                                <button className="user-data__cancel-btn" type="button"
                                onClick={() => closeForm(4)}>
                                    Скасувати
                                </button>
                            </div>
                        </div>
                        { errors.new_password && <span className="form__message-text">
                            { errors.new_password.message }
                        </span> }
                    </div>
                </form>
            </div>
        ) }

        { !visibleForms.includes(5) ? (
            <div className="user-data__row">
                <div className="user-data__cell">
                    <span className="user-data__field-title">
                        Дата народження
                    </span>
                    <p className="user-data__user-info">
                        { dateTime.dateFormat(CookiesWorker.get("birth_date")) }
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={() => openForm(5)}>
                    { CookiesWorker.get("birth_date") ? "Змінити": "Додати" }
                </button>
            </div>    
        ) : (
            <div className="user-data__form-container">
                <form className="user-data__form">
                    <div className="user-data__field-group">
                        <label htmlFor='birth_date' className="user-data__field-label">
                            Дата народження
                        </label>
                        <div className="user-data__last-form-input">
                            <input type="date" placeholder="Ваша дата народження" autoComplete="false"
                            className="user-data__field-input" name="birth_date" id="birth_date"
                            onChange={(e) => updateFieldValue(e, "birth_date")} />
                            <div className="user-data__btns-row">
                                <button className="user-data__submit-btn" type="submit"
                                onClick={(e) => handleSaveChangesButton(e, 5)}>
                                    Зберегти
                                </button>
                                <button className="user-data__cancel-btn" type="button"
                                onClick={() => closeForm(5)}>
                                    Скасувати
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>    
        )}
        
        
        <div className="user-data__subscription">
            <p className="user-data__bold">
                Підписка на електронні листи
                <NoneSpan text='Немає' />
            </p>
            <p>
                Міняємо email на книжкотренди, інформацію про новинки, книжкові 
                добірки, секретні промокоди
            </p>
        </div>
    </div>
  )
}


export default MainContainer
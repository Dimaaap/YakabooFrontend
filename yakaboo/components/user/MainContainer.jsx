"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"

import Image from "next/image";
import { dateFormat, getCookie, getUniqueErrorField, getUserFullName, setCookies, setCookiesWithTimer } from '../../utils';
import { FlashMessage, NoneSpan } from '../shared';
import Endpoints from '../../endpoints';

export const MainContainer = () => {

    const [dataToUpdate, setDataToUpdate] = useState({})
    const [visibleForms, setVisibleForms] = useState([])
    const [showFlashMessage, setShowFlashMessage] = useState(false)
    const [passwordFormError, setPasswordFormError] = useState(null)
    const [userSubscribed, setUserSubscribed] = useState(false);
    const [uniqueError, setUniqueError] = useState({email: "", phone_number: ""})
    const [userData, setUserData] = useState({
        first_name: getCookie("first_name"),
        last_name: getCookie("last_name"),
        email: getCookie("email"),
        phone_number: getCookie("phone_number"),
        birth_date: getCookie("birth_date") || ""
    })

    const {register, handleSubmit, watch, formState: { errors }} = useForm();
 
    useEffect(() => {
        checkUserSubscription();
    }, [userSubscribed])

    const checkUserSubscription = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8003/subs/check/${getCookie("email")}`)

            if(response.ok){
                const res = await response.json();
                setUserSubscribed(res.exists);
            } else {
                console.log(response)
            }
        } catch(error){
            console.error(error);
        }
    }

    const openForm = formId => {
        setVisibleForms([...visibleForms, formId])
    }

    const closeForm = formId => {
        setVisibleForms(visibleForms.filter(id => id !== formId))
    }

    const updateFieldValue = (e, fieldTitle) => {
        let newValue = e.target.value;

        if(fieldTitle === "phone_number") {
            newValue = newValue.slice(1)
        }

        setUserData(prevState => ({
            ...prevState,
            [fieldTitle]: newValue
        }))
    }

    const formDataToUpdate = () => {
        const newDataToUpdate = {};

        Object.keys(userData).forEach(field => {
            const currentValue = userData[field];
            const cookieValue = getCookie(field);

            if(currentValue !== cookieValue){
                newDataToUpdate[field] = currentValue
            }
        })

        setDataToUpdate(newDataToUpdate);
    }

    const handleChangePasswordForm = async (data) => {
        const requestBody = {
            "user_email": getCookie("email"),
            "current_password": data.old_password,
            "new_password": data.new_password
        }

        try {
            const response = await fetch(Endpoints.USER_CHANGE_PASSWORD, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })

            if(response.ok){
                const resp = await response.json();
                setShowFlashMessage(true);
                closeForm(4);
                setPasswordFormError(null);
            } else {
                if(response.status === 401){
                    setPasswordFormError("Ви ввели неправильний пароль")
                } else {
                    setPasswordFormError("Помилка сервера")
                }
            }
        } catch(err){
            console.error(err)
        }
    }

    const handleSaveChangesButton = async(e, formId) => {
        e.preventDefault();
        const userEmail = getCookie("email")
        formDataToUpdate()

        const newDataToUpdate = {};

        Object.keys(userData).forEach(field => {
            const currentValue = userData[field];
            const cookieValue = getCookie(field) || "";

            if(currentValue !== cookieValue){
                newDataToUpdate[field] = currentValue;
            }
        })

        const body = {
            "phone_number": getCookie("phone_number"),
            ...newDataToUpdate
        }

        try {
            console.log("here")
            console.log(body)
            const response = await fetch(`http://localhost:8003/auth/user/update/${userEmail}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            if(response.ok) {
                const resp = await response.json();
                console.log("response: ", resp)
                Object.keys(resp).forEach(key => {
                    if(resp[key]){
                        setCookiesWithTimer(key, resp[key], 60 * 24 * 3)
                    }
                })

                setShowFlashMessage(true)
                closeForm(formId)
                setUniqueError({phone_number: "", email: ""})
            } else {
                const message = await response.json();
                const errorField = getUniqueErrorField(message.detail);
                if(errorField === "phone_number"){
                    setUniqueError(prevState => ({
                        ...prevState,
                        phone_number: "Користувач з таким номером телефону вже зареєстрований"
                    }))
                } else {
                    setUniqueError(prevState => ({
                        ...prevState,
                        email: "Користувач з таким email уже зареєстрований"
                    }))
                }
            }
        } catch(error){
            console.error(error)
        }
    }

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
                        { getCookie("email") }
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
                        +{ getCookie("phone_number") }
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
                        <input type="password" placeholder="Введіть старий пароль" 
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
                            <input type="password" placeholder="Введіть новий пароль" autoComplete="false"
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
                        { dateFormat(getCookie("birth_date")) }
                    </p>
                </div>
                <button className="user-data__change" type="button"
                onClick={() => openForm(5)}>
                    { getCookie("birth_date") ? "Змінити": "Додати" }
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

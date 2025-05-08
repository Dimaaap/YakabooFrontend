"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useConfirmationCodeStore } from '../../states'
import Image from "next/image";

import { getCookie, setCookiesWithTimer } from '../../utils'
import Endpoints from '../../endpoints'
import { FlashMessage } from '../shared'

export const ConfirmationCodeModal = () => {

    const { isConfirmationModalOpen, setIsConfirmationModalOpen } = useConfirmationCodeStore();

    const [seconds, setSeconds] = useState(100);
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState(null);
    const [code, setCode] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    
    const inputRefs = useRef([]);

    const ONE_WEEK = 7 * 24 * 60;

    const handleChange = (value, index) => {
        if(!/^\d?$/.test(value)) return;
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if(value && index < 5){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget){
            setIsConfirmationModalOpen(false);
        }
    }

    const handleKeyDown = (e, index) => {
        if(e.key === "Backspace" && code[index] === "" && index > 0){
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = async() => {
        const verificationCode = code.join("");
        const phoneNumber = getCookie("phone_number")

        try {
            setLoading(true);
            const response = await fetch(Endpoints.PHONE_NUMBER_VERIFICATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    code: verificationCode
                })
            });

            if(response.ok){
                const data = await response.json();
                setCookiesWithTimer("access_token", data.access_token, 30)
                setCookiesWithTimer("refresh_token", data.refresh_token, ONE_WEEK)
                setCookiesWithTimer("token_type", data.token_type, ONE_WEEK)
                setIsConfirmationModalOpen(false);
                setMessage("Ви успішно авторизувались")
            } else {
                const errorData = await response.json()
                setMessage("Неправильний код")
            }
        } catch(error){
            console.error("An error occured", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let timer;

        if(isDisabled && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1)
            }, 1_000)
        } else if(seconds === 0) {
            setIsDisabled(false)
        }

        return () => clearInterval(timer);
    }, [seconds, isDisabled])


    useEffect(() => {
        if(isConfirmationModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        
        return(() => {
            document.body.style.overflow = ""
        })
    }, [isConfirmationModalOpen])
    

    const phoneNumber = getCookie("phone_number")

  return (
    <div className="menu code-modal" onClick={ handleBackdropClick }>
         { message && <FlashMessage message={message} onClose={() => setMessage(null)} /> }
      <div className="code-modal__content">
        <button className="menu__close code-modal__close" type="button" onClick={() => setIsConfirmationModalOpen(false)}>
            <Image src="/icons/close-smaller.svg" alt="" width="22" height="22" />
        </button>
        <div className="code-modal__text-container">
            <p className="code-modal__main-info">
                Введіть код підтвердження
            </p>
            <p className="code-modal__additional-info">
                Ми надіслали на ваш номер 
                <span className="code-modal__user-phone">
                    (+{ phoneNumber })
                </span> цифровий код. Введіть його у форму нижче 
                для підтвердження вашого номера телефону
            </p>
        </div>
        <div className="code-modal__code-cells">
            { code.map((_, index) => (
                <input key={ index } type="text" maxLength="1" value={code[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="code-modal__code-cell" />
            )) }
        </div>
        <button className={`code-modal__submit-btn ${ loading ? "load-btn" : "" }`}
        type='submit' onClick={() => handleSubmit()} disabled={ loading }>
            { loading ? (
                <Image src="./icons/spinner.svg" alt="" className="form__spinner spin-animated" 
                width="20" height="20"/>
            ) : "Підтвердити" }
        </button>
        <button className={`code-modal__send-again ${isDisabled ? "disable-code": ""}`}
        disabled={ isDisabled }>
            {isDisabled ? (
                `Надіслати код повторно через ${seconds}с`
            ): "Надіслати код повторно"}
        </button>
      </div>
    </div>
  )
}

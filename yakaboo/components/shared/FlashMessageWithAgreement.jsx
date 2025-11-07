"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const CLOSE_MESSAGE_TIME = 10_000;

export const FlashMessageWithAgreement = ({ message, onConfirm, onClose }) => {

    const [visible, setVisible] = useState(true);
    const [timerId, setTimerId] = useState(null);

    
    const handleClose = () => {
        setVisible(false);
        clearTimeout(timerId);
        setTimeout(() => onClose(), 300)
    }
    
    useEffect(() => {
        if(message) {
            setVisible(true);
            const id = setTimeout(() => {
                setVisible(false);
                setTimeout(() => onClose(), 300);
            }, CLOSE_MESSAGE_TIME);
    
            setTimerId(id);
            return () => clearTimeout(timerId);
        }
    }, [message, onClose])

    
    return (
        <div className={`flash-message ${visible ? "animate-slide-in": "animate-slide-out"}`}>
            <button className="menu__close flash-message__close" 
            type="button" onClick={ handleClose }>
                <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
            </button>
            <span className="flash-message__message-text">
                { message }
            </span>
            <div className="flash-message__btns-row">
                <button className="flash-message__ok-button btn" type="button"
                onClick={ onConfirm }>
                    Видалити
                </button>
                <button className="flash-message__ok-button btn" type="button" onClick={ () => {
                    onConfirm()
                    handleClose()
                    } }>
                    OK
                </button>
            </div>
        </div>
    )
}


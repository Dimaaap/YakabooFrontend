"use client";

import React, {useState, useEffect} from 'react'
import Image from "next/image";

const CLOSE_MESSAGE_TIME = 10_000;

export const FlashMessage = ({ message, onClose }) => {

    const [visible, setVisible] = useState(true);
    const [timerId, setTimerId] = useState(null);

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

    const handleClose = () => {
        setVisible(false);
        clearTimeout(timerId);
        setTimeout(() => onClose(), 300)
    }

  return (
    <div className="flash-message">
        <button className="menu__close flash-message__close" 
        type="button" onClick={ handleClose }>
            <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
        </button>
        <span className="flash-message__message-text">
            { message }
        </span>
        <button className="flash-message__ok-button" type="button" onClick={ handleClose }>
            OK
        </button>
    </div>
  )
}

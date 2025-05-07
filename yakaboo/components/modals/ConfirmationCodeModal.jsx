"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useConfirmationCodeStore } from '../../states'

export const ConfirmationCodeModal = () => {

    const { isConfirmationModalOpen } = useConfirmationCodeStore();

    const [seconds, setSeconds] = useState(100);
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState(null);
    const [code, setCode] = useState(new Array(6).fill(""));
    
    const inputRefs = useRef([]);

    const ONE_WEEK = 7 * 24 * 60;

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


    const handleChange = (value, index) => {
        if(!/^\d?$/.test(value)) return;
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if(value && index < 5){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if(e.key === "Backspace" && code[index] === "" && index > 0){
            inputRefs.current[index - 1].focus()
        }
    }

    

  return (
    <div>
      
    </div>
  )
}

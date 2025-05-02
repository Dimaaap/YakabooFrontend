"use client"

import React, { useState, useEffect } from 'react'
import { getTimeLeft } from '../../utils'

export const PromoTimer = ({ endDate }) => {

    const ONE_MINUTE_IN_MS = 60000;

    const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(endDate))
        }, ONE_MINUTE_IN_MS);

        return () => clearInterval(interval)
    }, [endDate]);

  return (
    <span className="promotions__date">{ timeLeft }</span>
  )
}


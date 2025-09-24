"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { DateTime } from '../../services';

export const PromoTimer = ({ endDate }) => {

    const ONE_MINUTE_IN_MS = 60000;

    const [timeLeft, setTimeLeft] = useState('');

    const dateTime = useMemo(() => new DateTime(), [])

    useEffect(() => {
        if(!endDate){
          setTimeLeft('')
          return;
        }
        setTimeLeft(dateTime.getTimeLeft(endDate))

        const intervalId = setInterval(() => {
          setTimeLeft(dateTime.getTimeLeft(endDate))
        }, ONE_MINUTE_IN_MS)

        return () => clearInterval(intervalId)

    }, [endDate, dateTime]);

  return (
    <span className="promotions__date">{ timeLeft }</span>
  )
}


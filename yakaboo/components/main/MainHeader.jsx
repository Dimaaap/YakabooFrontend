"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Endpoints from '../../endpoints';

export const MainHeader = () => {

    const [interesting, setInteresting] = useState([]);

    const fetchInteresting = async() => {
        try {
            const cached = localStorage.getItem("interesting")
            const cachedTime = localStorage.getItem("interesting_time");

            const now = Date.now()
            const SIX_HOURS = 6 * 60 * 60 * 1000

            if(cached && cachedTime && now - parseInt(cachedTime) < SIX_HOURS){
                const parsedInteresting = JSON.parse(cached);
                setInteresting(parsedInteresting);
                return;
            }

            const res = await fetch(Endpoints.ALL_INTERESTING);
            const data = await res.json()
            setInteresting(data);

            localStorage.setItem("interesting", JSON.stringify(data))
            localStorage.setItem("interesting_time", now.toString())
        } catch(error) {
            console.error("Помилка при отриманні interesting", error);
        }
    }

    useEffect(() => {
        fetchInteresting()
    }, [])

  return (
    <div className="main-header">
        <h2 className="main-header__title">
            Замовляйте книжки - оплачуйте Зимовою єПідтримкою
        </h2>
        <ul className="main-header__items">
            { console.log(interesting) }
            { interesting.length > 0 ? (
                interesting.map((interest, i) => (
                    <Link href={ interest.slug } key={ i } className="main-header__link">
                        <li className={`main-header__point ${ i === 0 ? "is-active": "" }`}>
                            { interest.title }
                        </li>
                    </Link>
                ))
            ) : (
                [...Array(10)].map((_, i) => (
                    <li key={i} className="main-header__point skeleton-item"></li>
                ))
            )}
        </ul>
    </div>
  )
}

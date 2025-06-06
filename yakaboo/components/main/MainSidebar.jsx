"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Endpoints from '../../endpoints';


export const MainSidebar = () => {

    const [sidebars, setSidebars] = useState([]);


    const fetchSidebars = async () => {
        try {
            const cached = localStorage.getItem("sidebars");
            const cachedTime = localStorage.getItem("sidebars_time");

            const now = Date.now();
            const sixHours = 6 * 60 * 60 * 1000

            if(cached && cachedTime && now - parseInt(cachedTime) < sixHours){
                const parsedSidebars = JSON.parse(cached);
                setSidebars(parsedSidebars);
                return
            }

            const res = await fetch(Endpoints.ALL_SIDEBARS)
            const data = await res.json()
            setSidebars(data);

            localStorage.setItem("sidebars", JSON.stringify(data))
            localStorage.setItem("sidebars_time", now.toString())
        } catch(error){
            console.error("Помилка при отриманні sidebars", error)
        }
    }

    useEffect(() => {
        fetchSidebars()
    }, [])

  return (
    <div className='sidebar'>
        <ul className="sidebar__list">
            { sidebars.length > 0 ? (sidebars.map((sidebar, i) => (
                <Link key={ i } className="sidebar__item" href={ sidebar.slug }>
                    <li className="sidebar__point-flex">
                        { sidebar.icon && (<Image src={sidebar.icon} alt="" width="18" height="22" />) }
                        { sidebar.title }
                    </li>
                </Link>
            ))): (
                <>
                    {[...Array(5).map((_, i) => (
                        <li className="loading__text" key={i}></li>
                    ))]}
                </>
            ) }
        </ul>
    </div>
  )
}



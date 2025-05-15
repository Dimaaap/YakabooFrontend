"use client";

import React, { useState } from 'react'

export const OrdersSidebar = ({ listItems=[] }) => {

    const [ activeLink, setActiveLink ] = useState(1);

  return (
    <ul className="orders-sidebar">
        { listItems.map((listItem, index) => (
            <li className={`orders-point ${activeLink === index + 1 ? "active" : ""}`} key={index}
            onClick={() => setActiveLink(index+1)}>
                { listItem }
            </li>
        )) }
    </ul>
  )
}

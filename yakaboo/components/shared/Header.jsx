"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ContactsModal } from '../modals';

export const Header = () => {

    const [isContactsOpen, setIsContactsOpen] = useState(false);

  return (
    <div className="header">
        <div className="header__section header__first-section">
            <button type="button" id="burger">
                <Image src="/icons/line.svg" className="header__icon" width="20" height="1"/>
                <Image src="/icons/line.svg" className="header__icon" width="20" height="1"/>
            </button>
            <Link href="/" className="header__logo">
                <Image src="/icons/logo.svg" width="200" alt="Yakaboo" height="70" />
            </Link>
        </div>
        <div className="header__section header__center-section">
            <button className="header__categories-btn">
                <Image src="/icons/menu.svg" className="header__icon menu" width="25" alt="" height="25" />
                Категорії книг
            </button>
            <div className="header__search-container">
                <input type="search" placeholder='Знайти книгу' className="header__search" />  
                <Image src="/icons/search.svg" className="header__search-icon" width="30" height="30" alt="" />
            <button type="button" className="header__search-button">Пошук</button>      
            </div>
        </div>
        <div className="header__section header__right-section">
            <div className="header__section-relative" onMouseEnter={() => setIsContactsOpen(true)} 
                onMouseLeave={() => setIsContactsOpen(false)}>
                <div className="header__section-info-text">
                    <div className="top-row row">
                        <Image src="/icons/phone.svg" alt="" width="15" height="15" className="row__icon" />    
                        <span className="row__text">
                            0-800-335-425
                        </span>
                        <Image src="/icons/chevron-down.svg" alt="" width="20" height="20" className="row__icon" />
                    </div>  
                    <div className="bottom-row row">
                        <span className="row__text">
                            Без вихідних, з 9 до 20
                        </span>
                    </div>
                    { isContactsOpen && <ContactsModal /> }
                    
                </div>
            </div>
            <div className="header__icons-row">
                <Link className="header__link" href="#">
                    <Image src="/icons/cart.svg" alt="" className="header__link-icon" width="20" height="20" />
                    <span className="header__link-text">Кошик</span>
                </Link>
                <Link className="header__link" href="#">
                    <Image src="/icons/user.svg" alt="" className="header__link-icon" width="20" height="20" />
                    <span className="header__link-text">
                        Увійти    
                    </span>
                </Link>
            </div>
        </div>
    </div>
  )
}


"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ContactsModal } from '../modals';
import { useBookCategoriesModalStore, useCartModalStore, 
    useMenuModalStore, 
    useProfileSettingsModalStore, 
    useUserLoginModalStore} from '../../states';
import { useAuth } from '../../hooks';
import { UserProfileButton } from '.';

export const Header = () => {

    const [isContactsOpen, setIsContactsOpen] = useState(false);
    const { setIsMenuModalOpen } = useMenuModalStore();
    const { setIsCartModalOpen } = useCartModalStore();
    const { setIsCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsLoginModalOpen } = useUserLoginModalStore();
    const { setIsProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const isAuthenticated = useAuth();

  return (
    <div className="header">
        <div className="header__section header__first-section">
            <button type="button" id="burger" onClick={() => setIsMenuModalOpen(true)}>
                <Image src="/icons/line.svg" className="header__icon" width="20" height="1" alt=""/>
                <Image src="/icons/line.svg" className="header__icon" width="20" height="1" alt=""/>
            </button>
            <Link href="/" className="header__logo">
                <Image src="/icons/logo.svg" width="200" alt="Yakaboo" height="70" />
            </Link>
        </div>
        <div className="header__section header__center-section">
            <button className="header__categories-btn" onClick={() => setIsCategoriesModalOpen(true)}>
                <Image src="/icons/menu.svg" className="header__icon menu visually-hidden" width="25" alt="" height="25" />
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
                <Link className="header__link" href="#" onClick={() => setIsCartModalOpen(true) }>
                    <Image src="/icons/cart.svg" alt="" className="header__link-icon" width="20" height="20" />
                    <span className="header__link-text">Кошик</span>
                </Link>
                { !isAuthenticated ? (
                    <div className="header__link" onClick={() => setIsLoginModalOpen(true)}>
                        <Image src="/icons/user.svg" alt="" className="header__link-icon" width="20" height="20" />
                        <span className="header__link-text">
                            Увійти    
                        </span>
                    </div>
                ) : (
                    <div className="header__link user-info" onClick={() => setIsProfileSettingsModalOpen(true)}>
                        <UserProfileButton />
                    </div>
                ) }
            </div>
        </div>
    </div>
  )
}


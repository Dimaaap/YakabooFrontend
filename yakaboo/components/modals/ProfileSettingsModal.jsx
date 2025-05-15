"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useProfileSettingsModalStore } from '../../states';
import { getCookie, getUserFullName } from '../../utils';

export const ProfileSettingsModal = () => {

    const { isProfileSettingsModalOpen, setIsProfileSettingsModalOpen } = useProfileSettingsModalStore();

    const handleBackdropClick = (e) => {
        if(e.target === e.currentTarget){
          setIsProfileSettingsModalOpen(false);
        }
    }

    useEffect(() => {
            if(isProfileSettingsModalOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
            
            return(() => {
                document.body.style.overflow = ""
            })
        }, [isProfileSettingsModalOpen])


        const handleLinkClick = () => {
            setIsProfileSettingsModalOpen(false);
        }


    return (
        <div className="menu settings" onClick={ handleBackdropClick }>
            <div className="menu__content settings-content">
                <div className="menu__header settings-header">
                    <p className="settings-header__title">
                        Профіль
                    </p>
                    <button className="menu__close settings__close" type="button" 
                    onClick={() => setIsProfileSettingsModalOpen(false)}>
                        <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
                    </button>
                    <div className="settings-header__profile-info">
                        <button className="settings-header__user-btn">
                            <Image  src="/icons/user-white.svg" className="settings-header__user-icon" alt="" 
                            width="18" height="18" />
                        </button>
                        <div className="settings-header__profile-main-info">
                            <p className="settings-header__username">
                                { getUserFullName() }
                            </p>
                            <span className="settings-header__user_phone">
                                +{ getCookie("phone_number") }
                            </span>
                        </div>
                    </div>
                </div>

                <div className="menu__body settings-body">
                    <ul className="settings-menu">
                        <li className="settings-point">
                            <Link href="/my-account/orders" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/truck-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Замовлення
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href="/my-account/library" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/done.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Моя бібліотека
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href="/my-account/wishlist" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/heart-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Бажані книги
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href="#" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/waiting.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Товари в очікуванні
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href="/my-account/bonuses" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/bonuses.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Бонуси
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                
                <div className="menu__body settings-body">
                    <ul className="settings-menu">
                        <li className="settings-point">
                            <Link href="/my-account" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/user-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Налаштування
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="menu__body settings-body">
                    <ul className="settings-menu">
                        <li className="settings-point">
                            <Link href="#" className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/logout.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Вихід
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="menu__footer settings-footer">
                    <p className="settings__additional-info">
                        Виникли запитання?
                    </p>
                    <Link href="tel:0800335425" className="settings__phone-link">
                        0-800-335-425
                    </Link>
                </div>
            </div>
        </div>
    )
}


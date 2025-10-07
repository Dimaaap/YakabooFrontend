"use client";

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { useProfileSettingsModalStore } from '../../states';
import { getUserFullName } from '../../utils';
import { CookiesWorker, handleBackdropClick } from '../../services';
import { useBlockBodyScroll } from '../../hooks';
import { linksContainer } from '../../links_container';
import { StatusBadge } from '../shared';

const ProfileSettingsModal = () => {

    const { isProfileSettingsModalOpen, setIsProfileSettingsModalOpen } = useProfileSettingsModalStore();

    useBlockBodyScroll(isProfileSettingsModalOpen)

    const handleLinkClick = () => {
        setIsProfileSettingsModalOpen(false);
    }

    return (
        <div className="menu settings" onClick={ e => handleBackdropClick(e, setIsProfileSettingsModalOpen) }>
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
                                +{ CookiesWorker.get("phone_number") }
                            </span>
                        </div>
                    </div>
                    <div className="settings-header__tiles-block">
                        <Link className="settings-header__tile bonuses-tile" href="my-account/bonuses">
                            <div className="settings-header__tile-header">
                                <Image src="/icons/bonus.svg" alt="Bonuses" width="18" height="18" 
                                className="settings-header__image" />
                                <h5 className="settings-header__tile-title">{ CookiesWorker.get("bonuses") || 0 }</h5>
                            </div>
                            <p className="settings-header__tile-info">
                                Баланс бонусів
                            </p>
                        </Link>
                        <Link className="settings-header__tile bonuses-tile" href="my-account/bonuses">
                            <div className="settings-header__tile-header">
                                <StatusBadge status={ CookiesWorker.get("level") } />
                            </div>
                            <p className="settings-header__tile-info">
                                Ваш рівень
                            </p>
                        </Link>
                    </div>
                </div>

                <div className="menu__body settings-body">
                    <ul className="settings-menu">
                        <li className="settings-point">
                            <Link href={ linksContainer.account.orders } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/truck-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Замовлення
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.library } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/done.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Моя бібліотека
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.wishlist } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/heart-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Бажані книги
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.waitingList } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/waiting.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Товари в очікуванні
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.bonuses } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/bonuses.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Бонуси
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.settings } className="settings-link" onClick={ () => handleLinkClick() }>
                                <span className="settings__icon-wrapper">
                                    <Image src="/icons/user-pink.svg" alt="" width="18" height="18" />
                                </span>
                                <span className="settings__text">
                                    Налаштування
                                </span>
                            </Link>
                        </li>
                        <li className="settings-point">
                            <Link href={ linksContainer.account.logout } className="settings-link" onClick={ () => handleLinkClick() }>
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


export default ProfileSettingsModal

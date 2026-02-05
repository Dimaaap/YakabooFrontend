"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ContactsModal } from '../modals';
import { useBookCategoriesModalStore, useCartModalStore, 
    useCartStore, 
    useHistoryStore, 
    useMenuModalStore, 
    useProfileSettingsModalStore, 
    useSearchHistoryOpenStore, 
    useSearchTerm, 
    useUserLoginModalStore} from '../../states';
import { useAuth } from '../../hooks';
import { UserProfileButton } from '.';
import { useDebounce } from '../../hooks/useDebounce';
import Endpoints from '../../endpoints';
import { CookiesWorker } from '../../services';
import { useRouter } from 'next/navigation';

export const Header = () => {

    const [isContactsOpen, setIsContactsOpen] = useState(false);

    const { setIsMenuModalOpen } = useMenuModalStore();
    const { setIsCartModalOpen } = useCartModalStore();
    const { setIsCategoriesModalOpen } = useBookCategoriesModalStore();
    const { setIsLoginModalOpen } = useUserLoginModalStore();
    const { setIsProfileSettingsModalOpen } = useProfileSettingsModalStore();
    const { isSearchHistoryModalOpen, setIsSearchHistoryModalOpen } = useSearchHistoryOpenStore();
    const { cartItems } = useCartStore();
    const { history } = useHistoryStore();
    const { searchTerm, setSearchTerm, searchResponse, setSearchResponse } = useSearchTerm();

    const isAuthenticated = useAuth();
    const router = useRouter();
    const USER_EMAIL = CookiesWorker.get("email") || ""

    const handleSearchInputClick = () => {
        setIsSearchHistoryModalOpen(true);
    }

    const handleCancelInputButtonClick = () => {
        setSearchTerm("");
        setIsSearchHistoryModalOpen(false);
    }

    const debouncedSearchValue = useDebounce(searchTerm, 500);
    const isDebouncing = searchTerm.trim() && searchTerm !== debouncedSearchValue;

    useEffect(() => {
        if(!debouncedSearchValue.trim()){
            setSearchResponse(null);
            return;
        }

        let isCanceled = false;

        const fetchData = async () => {
            try {
                const res = await fetch(Endpoints.SEARCH(debouncedSearchValue, USER_EMAIL));
                if(!res.ok){
                    throw new Error("Error")    
                } else {
                    const data = await res.json();
                    setSearchResponse(data);
                }
            } catch(err){
                console.error(err)
            }
        }

        fetchData();

        return () => {
            isCanceled = true;
        }
    }, [debouncedSearchValue]
    )

    const handleInputValueChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if(value.trim()){
            setIsSearchHistoryModalOpen(false);
        }
    };

    const handleIsSearchClick = () => {
        const urlPath = `/search?q=${searchTerm}`
        router.push(urlPath)
    }

  return (
    //TODO: Прибрати цей костиль і змінити нормальний z-index через CSS і HTML
    <div className={`header ${isSearchHistoryModalOpen || searchResponse ? "increase-z-index": ""}`}>
        <div className="header__section header__first-section">
            <button type="button" id="burger" onClick={() => setIsMenuModalOpen(true)}>
                <Image src="/icons/burger.svg" alt="Burger" width="20" height="20" />
            </button>
            <Link href="/" className="header__logo">
                <Image src="/icons/logo.svg" width="200" alt="Yakaboo" height="70" />
            </Link>
            <Link href="/" className="header__logo-hidden">
                <Image src="/icons/logo-short.svg" width="30" height="30" className="hidden-logo" alt="Yakaboo" />
            </Link>
            
        </div>
        <div className="header__section header__center-section">
            <button className="header__categories-btn" onClick={() => setIsCategoriesModalOpen(true)}>
                <Image src="/icons/menu.svg" className="header__icon-menu menu-icon" width="25" alt="" height="25" />
                Каталог
            </button>
            <div className="header__search-container">
                <input type="search" placeholder='Знайти книгу' className="header__search" name='q' 
                onClick={() => handleSearchInputClick()} value={ searchTerm } onChange={(e) => handleInputValueChange(e)} /> 
                { isSearchHistoryModalOpen &&  
                    <Image src="/icons/close.svg" alt="" width="20" height="20" 
                    className="header__close-icon" onClick={ () => handleCancelInputButtonClick() } /> 
                } 
                
                { searchResponse && (
                    <Image src="/icons/close.svg" alt="" width="20" height="20" 
                    className="header__close-icon" onClick={ () => {
                        setSearchTerm("");
                        setSearchResponse(null);
                        setIsSearchHistoryModalOpen(false);
                    } } />
                ) }

                <div className="header__input-loader">
                    { isDebouncing && <div className="header__loader"></div> }
                </div>
                <Image src="/icons/search.svg" className="header__search-icon" width="30" height="30" alt="" />
            <button type="button" className="header__search-button" onClick={() => handleIsSearchClick()}>Пошук</button>      
            </div>
        </div>
        <div className="header__section header__right-section">
            <div className="header__section-relative" onMouseEnter={() => setIsContactsOpen(true)} 
                onMouseLeave={() => setIsContactsOpen(false)}>
                <div className="header__section-info-text">
                    <div className="top-row row">
                        <Image src="/icons/phone.svg" alt="" width="15" height="15" className="row__icon" />    
                        Зв'язатись з нами
                        <Image src="/icons/chevron-down.svg" alt="" width="15" height="15" />
                    </div>
                    { isContactsOpen && <ContactsModal /> }
                    
                </div>
            </div>
            <div className="header__icons-row">
                { isAuthenticated && (
                    <Image src="/icons/bell.svg" alt="" className="header__link-icon" width="20" height="20" />
                ) }
                { isAuthenticated && (
                    <Link className="header__link cart-link" href="#" onClick={() => setIsCartModalOpen(true) }>
                        <Image src="/icons/cart.svg" alt="" className="header__link-icon" width="20" height="20" />
                        { cartItems?.items?.length > 0 && (<span className="header__cart-items-count">{ cartItems.items.length }</span>) }
                    </Link>    
                ) }
                
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


"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CookiesWorker, fetchData } from '../../services'
import Endpoints from '../../endpoints'
import { Spinner } from '.'
import { useSmallScreen } from '../../hooks'

export const Footer = () => {

    const USER_EMAIL = CookiesWorker.get("email") || null;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const isSmallScreen = useSmallScreen()
    const isLaptop = useSmallScreen(1024);
    
    const [links, setLinks] = useState([])
    const [contacts, setContacts] = useState([])
    const [userEmail, setUserEmail] = useState(USER_EMAIL);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [emailInputErrors, setEmailInputErrors] = useState(null);

    const isEmailValid = (userEmail) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
    }


    const subscribeUser = async email => {
        if(!isEmailValid(email)){
            setEmailInputErrors("Неправильний формат email. Спробуйте ще раз");
            return;
        } 

        try {
            setIsSubmitting(true);

            await fetch(Endpoints.SUBSCRIBE_USER_EMAIL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email: userEmail })
            })

            setIsSubscribed(true);
        } catch(e){
            setEmailInputErrors("Сталась помилка. Спробуйте ще раз пізніше або напишіть на email: procdima49@gmail.com")
        } finally {
            setIsSubmitting(false);
            setEmailInputErrors(null);
        }
    }

    useEffect(() => {
        fetchData(Endpoints.ALL_CONTACTS, setContacts, "contact_links")
    }, [])

    useEffect(() => {
        fetchData(Endpoints.ALL_FOOTER_LINKS, setLinks, "footer_links")
    }, [])

  return (
    <footer className="footer">
        <div className="footer__top-row">
            <div className="footer__left-part">
                <h5 className="footer__title">
                    Міняємо email на книжкотренди
                </h5>
                { !isSmallScreen && (
                    <p className="footer__desc">
                        Інформація про новинки, книжкові добірки, секретні промокоди
                    </p>    
                ) }
            </div>
            <div className="footer__right-part">
                { !isSubmitting ? (
                    <div className="footer__input-container">
                        <input type="email" className="footer__email-input" placeholder="Введіть email" 
                        value={ userEmail } onChange={(e) => setUserEmail(e.target.value)} />     
                        { emailInputErrors ? (
                            <p className="footer__input-error">
                                { emailInputErrors }
                            </p> 
                        ) : <></> }  
                    </div>
                     
                ) : (
                    <Spinner />
                ) }
                
                <button className={`footer__submit-btn ${!userEmail?.length || isSubmitting || isSubscribed ? "is-disabled" : ""}`}
                onClick={() => subscribeUser(userEmail)}
                type="button" 
                disabled={ !userEmail?.length || isSubmitting || isSubscribed }>
                    Отримувати цікавинки
                </button>
            </div>
        </div>
        <div className="footer__bottom-row">
            <div className="footer__section">
                <div className="footer__text-block">
                    <Image src="/icons/logo.svg" alt="Yakaboo" width={ 150 } height={ 75 } />

                    <div className="contacts-modal__header">
                        <Link href="tel:080335425" className="contacts-modal__phone-link">
                            0-800-335-425
                        </Link>
                        <div className="contacts-modal__text-container">
                            <p className="contacts-modal__text bold-text">
                                Безкоштовно по Україні
                            </p>
                            <p className="contacts-modal__text">
                                Без вихідних, 9:00-20:00
                            </p>
                        </div>
                    </div>
                    <div className="contacts-modal__socials">
                        <Link className="contacts-modal__social" href="https://t.me/Yakaboo_ua_bot">
                            <Image src="/icons/social/telegram.svg" alt="Yakaboo Telegram" width="30" height="30" />
                            <span className="contacts-modal__social-title">
                                Telegram
                            </span>
                        </Link>
                        <Link className="contacts-modal__social" href="viber://pa?chatURI=yakaboo_ua">
                            <Image src="/icons/social/viber.svg" alt="Yakaboo Viber" width="30" height="30" />
                            <span className="contacts-modal__social-title">
                                Viber
                            </span>
                        </Link>
                        <div className="contacts-modal__social">
                            <Image src="/icons/social/phone.svg" alt="Yakaboo Phone" width="30" height="30" />
                            <span className="contacts-modal__social-title">
                                Замовити дзвінок
                            </span>
                        </div>
                        <Link className="contacts-modal__social" href="mailto:supoort@yakaboo.ua">
                            <Image src="/icons/social/mail.svg" alt="Yakaboo Telegram" width="30" height="30" />
                            <span className="contacts-modal__social-title">
                                Написати на пошту
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            { isLaptop && (
                <div className="footer__section">
                    <div className="footer__desc">
                        <p className="footer__text-title">
                            Мобільний застосунок
                        </p>
                        <p className="footer__text">
                            Читайте і прослуховуйте книжку у найбільшій біліотеці електронних 
                            та аудіокниг від топових українських і світових авторів
                        </p>
                        <div className="footer__btns-row">
                            <Link href="#" className="footer__btn-download">
                                <Image src="/icons/google-play.svg" alt="" width="120" height="120" />
                            </Link>
                            <Link href="#" className="footer__btn-download">
                                <Image src="/icons/app-store.svg" alt="" width="120" height="120" />
                            </Link>
                        </div>
                    </div>
                </div>    
            ) }
            <ul className="footer__list">
                <p className="footer__list-title">
                    Yakaboo
                </p>
                { links.length > 0 ? (
                    links
                    .filter(link => link.category === "Yakaboo")
                    .map(link => (
                        <li key={ link.title } className="footer__item">
                            <Link href={ `/base${link.link}` } className="footer__point">
                                { link.title }
                            </Link>
                        </li>
                    ))
                ) : (
                    Array.from({length: 4}).map((_, i) => (
                        <li key={i} className="footer__item">
                            <div className="footer__point skeleton" />
                        </li>
                    ))
                ) }
            </ul>
            <ul className="footer__list">
                <p className="footer__list-title">
                    Інформація
                </p>
                { links.length > 0 ? (
                    links
                    .filter(link => link.category === "Інформація")
                    .map(link => (
                        <li key={ link.title } className="footer__item">
                            <Link href={ link.link } className="footer__point">
                                { link.title }
                            </Link>
                        </li>
                    ))
                ) : (
                    Array.from({length: 4}).map((_, i) => (
                        <li key={i} className="footer__item">
                            <div className="footer__point skeleton" />
                        </li>
                    ))
                ) }
            </ul>
            { !isLaptop && (
                <div className="footer__section">
                    <div className="footer__desc">
                        <p className="footer__text-title">
                            Мобільний застосунок
                        </p>
                        <p className="footer__text">
                            Читайте і прослуховуйте книжку у найбільшій біліотеці електронних 
                            та аудіокниг від топових українських і світових авторів
                        </p>
                        <div className="footer__btns-row">
                            <Link href="#" className="footer__btn-download">
                                <Image src="/icons/google-play.svg" alt="" width="120" height="120" />
                            </Link>
                            <Link href="#" className="footer__btn-download">
                                <Image src="/icons/app-store.svg" alt="" width="120" height="120" />
                            </Link>
                        </div>
                    </div>
                </div>    
            ) }
            
        </div>
        <div className="footer__footer-row">
            <span className="footer__copyright">
                &copy;{`Yakaboo 2004 - ${new Date().getFullYear()} .Усі права захищено`}
            </span>
            <button className="footer__top-btn" type="btn" onClick={scrollToTop}>
                Вгору
                <Image src="/icons/arrow-up.svg" alt="" width="20" height="20" />
            </button>
        </div>
    </footer>
  )
}

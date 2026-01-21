"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CookiesWorker, fetchData } from '../../services'
import Endpoints from '../../endpoints'
import { Spinner } from '.'

export const Footer = () => {

    const USER_EMAIL = CookiesWorker.get("email") || null;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    
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
                <p className="footer__desc">
                    Інформація про новинки, книжкові добірки, секретні промокоди
                </p>
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
                disabled={ !userEmail.length || isSubmitting || isSubscribed }>
                    Отримувати цікавинки
                </button>
            </div>
        </div>
        <div className="footer__bottom-row">
            <div className="footer__section">
                <div className="footer__text-block">
                    <p className="footer__text">
                        Безкоштовно по Україні
                    </p>
                    <Link href="tel:0800335425" className="footer__phone-number">
                        0-800-335-425
                    </Link>
                    <span className="footer__small-text">
                        Без вихідних, з 9 до 20
                    </span>
                </div>
                { contacts.length > 0 && (
                    <ul className="footer__social-links">
                        { contacts.map((contact, index) => (
                            <li className="footer__social-link" key={ index }>
                                <Link href={ contact.link } className="footer__social">
                                    <Image src={`/icons/${contact.icon_title}`} width="30" 
                                    height="30" alt="" />
                                </Link>
                            </li>
                        )) }
                    </ul>
                ) }
            </div>
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

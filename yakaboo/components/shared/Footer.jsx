"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

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
                <input type="email" className="footer__email-input" placeholder="Введіть email" />
                <button className="footer__submit-btn is-disabled" type="button" disabled={true}>Отримувати цікавинки</button>
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
                <ul className="footer__social-links">
                    <li className="footer__social-link">
                        <Link href="#" className="footer__social">
                            <Image src="/icons/instagram.svg" width="30" height="30" alt="" />
                        </Link>
                    </li>
                    <li className="footer__social-link">
                        <Link href="#" className="footer__social">
                            <Image src="/icons/youtube.svg" width="30" height="30" alt="" />
                        </Link>
                    </li>
                    <li className="footer__social-link">
                        <Link href="#" className="footer__social">
                            <Image src="/icons/facebook.svg" width="30" height="30" alt="" />
                        </Link>
                    </li>
                    <li className="footer__social-link">
                        <Link href="#" className="footer__social">
                            <Image src="/icons/telegram.svg" width="30" height="30" alt="" />
                        </Link>
                    </li>
                </ul>
            </div>
            <ul className="footer__list">
                <p className="footer__list-title">
                    Yakaboo
                </p>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Про магазин
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Програма лояльності
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Вакансії
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Контакти
                    </Link>
                </li>
            </ul>
            <ul className="footer__list">
                <p className="footer__list-title">
                    Інформація
                </p>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Доставка та оплата
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Подарункові сертифікати
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Повернення товару
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Блог
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Часто шукають
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Серія книг
                    </Link>
                </li>
                <li className="footer__item">
                    <Link href="#" className="footer__point">
                        Автори
                    </Link>
                </li>
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
                &copy; Yakaboo 2004-2025. Усі права захищено.
            </span>
            <button className="footer__top-btn" type="btn" onClick={scrollToTop}>
                Вгору
                <Image src="/icons/arrow-up.svg" alt="" width="20" height="20" />
            </button>
        </div>
    </footer>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useMenuModalStore } from '../../states'
import { handleBackdropClick } from '../../services'

export const MenuModal = () => {

  const { isMenuModalOpen, setIsMenuModalOpen } = useMenuModalStore();

  return (
    <div className="menu" onClick={e => handleBackdropClick(e, setIsMenuModalOpen)}>
      <div className={`menu__content ${isMenuModalOpen ? 'active': ''}`}>
        <div className="menu__header">
            <Link href="/" className="menu__logo">
                <Image src="/icons/logo.svg" alt="Yakaboo" width="100" height="100" /> 
            </Link>
            <button className="menu__close" type="button" onClick={() => setIsMenuModalOpen(false)}>
                <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
            </button>
        </div>
        <div className="menu__auth-text">
            <button className="menu__user-btn" type="button">
                <Image src="/icons/user-white.svg" alt="" width="20" height="20" />
            </button>
            <div className="menu__text-container">
                <p className="menu__subtitle">
                    Вхід або реєстрація
                </p>
                <p className="menu__small-text">
                    Для відслідковування статусу замовлень та рекомендацій
                </p>
            </div>
        </div>
        <ul className="menu__items">
            <li className="menu__point">
                <button className="menu__user-btn menu-btn">
                    <Image src="/icons/points.svg" alt="" width="20" height="20" />
                </button>
                <span className="menu__text">
                    Категорії книг
                </span>
            </li>
            <li className="menu__point">
                <button className="menu__user-btn menu-btn">
                    <Image src="/icons/card-pink.svg" alt="" width="20" height="20" />
                </button>
                <span className="menu__text">
                    Кошик
                </span>
            </li>
            <Link href="tel:0800335425" className="menu__point-link">
                <li className="menu__point">
                    <button className="menu__user-btn menu-btn">
                        <Image src="/icons/phone-pink.svg" alt="" width="20" height="20" />
                    </button>
                    <div className="menu__point-text-block">
                        <p className="menu__subtitle">0-800-335-425</p>
                        <p className="menu__small-text">Без вихідних, з 9 до 20</p>
                    </div>
                </li>
            </Link>
        </ul>
        <ul className="menu__items">
            <li className="menu__point second-menu-point">
                <button className="menu__user-btn menu-btn second-menu-btn">
                    <Image src="/icons/book-pink.svg" alt="" width="20" height="20" />
                </button>
                <span className="menu__text">
                    Паперові книги
                </span>
            </li>
            <li className="menu__point second-menu-point">
                <button className="menu__user-btn menu-btn second-menu-btn">
                    <Image src="/icons/ebook.svg" alt="" width="20" height="20" />
                </button>
                <span className="menu__text">
                    Електронні книги
                </span>
            </li>
            <li className="menu__point second-menu-point">
                <button className="menu__user-btn menu-btn second-menu-btn">
                    <Image src="/icons/audio-pink.svg" alt="" width="20" height="20" />
                </button>
                <span className="menu__text">
                    Аудіокниги
                </span>
            </li>
            <li className="menu__point second-menu-point">
                <button className="menu__user-btn menu-btn second-menu-btn">
                    <Image src="/icons/dots-pink.svg" alt="" width="20" height="20" />
                </button>
                <div className="menu__point-text-block">
                    <p className="menu__subtitle">
                        Інше
                    </p>
                    <p className="menu__small-text">
                        Ігри, аксесуари, подарунки тощо
                    </p>
                </div>
            </li>
        </ul>
        <div className="menu__choose-city">
            <div className="menu__city-info">
                <span className="menu__city">
                    Вказати місто 
                    <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
                </span>
                <p className="menu__small-text light">
                    Щоб бачити терміни доставки
                </p>    
            </div>
            <div className="menu__lang-btns">
                <button className="menu__lang-btn active" type="button">
                    Українська
                </button>
                <button className="menu__lang-btn" type="button">
                    Русский
                </button>
            </div>
        </div>

        <ul className="menu__items simpler">
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Акції
                </li>
            </Link>
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Сертифікати
                </li>
            </Link>
        </ul>

        <ul className="menu__items simpler">
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Корпоративна бібліотека
                </li>
            </Link>
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Про Yakaboo
                </li>
            </Link>
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Доставка та оплата
                </li>
            </Link>
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Контакти
                </li>
            </Link>
            <Link href="#" className="menu-link">
                <li className="menu__point-simple">
                    Блог
                </li>
            </Link>
        </ul>
      </div>
    </div>
  )
}


import Link from 'next/link'
import React from 'react'

export const MainHeader = () => {
  return (
    <div className="main-header">
        <h2 className="main-header__title">
            Замовляйте книжки - оплачуйте Зимовою єПідтримкою
        </h2>
        <ul className="main-header__items">
            <Link href="#" className="main-header__link">
                <li className="main-header__point is-active">
                    Акції 🔥
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Зимова єПідтримка ❄
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    єКниги 📲
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Комплекти до 1000₴ 🎁
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Комплекти єКнига 📚
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Новинки квітня 🌼
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Електронні новинки квітня
                </li>
            </Link>
            <Link href="#" className="main-header__link">
                <li className="main-header__point">
                    Yakaboo Publishing
                </li>
            </Link>
        </ul>
    </div>
  )
}

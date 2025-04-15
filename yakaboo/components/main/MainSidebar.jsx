import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const MainSidebar = () => {
  return (
    <div className='sidebar'>
        <ul className="sidebar__list">
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point">
                   Акції 
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point">
                   Сертифікати
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point">
                   Програма лояльності
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point">
                   Остання ціна
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Друковані книги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Електронні книги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Аудіокниги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Настільні ігри
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Творчіть, хобі
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                   Книжкові аксесуари
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                    Блокноти
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                    Подарунки
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/book.svg" alt="" width="20" height="20" />
                    Активний відпочинок
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point">
                   Видавництва
                </li>
            </Link>
        </ul>
    </div>
  )
}


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
                   <Image src="/icons/book.svg" alt="" width="18" height="22" />
                   Друковані книги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/mobile.svg" alt="" id="second-image" width="18" height="22" />
                   Електронні книги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/audio.svg" alt="" width="18" height="22" />
                   Аудіокниги
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/table-games.svg" alt="" width="18" height="22" />
                   Настільні ігри
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/art.svg" alt="" width="18" height="22" />
                   Творчість, хобі
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/accessouris.svg" alt="" width="18" height="22" />
                   Книжкові аксесуари
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/notes.svg" alt="" width="18" height="22" />
                    Блокноти
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/gift.svg" alt="" width="18" height="22" />
                    Подарунки
                </li>
            </Link>
            <Link href="#" className="sidebar__item">
                <li className="sidebar__point-flex">
                   <Image src="/icons/active-rest.svg" alt="" width="18" height="22" />
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


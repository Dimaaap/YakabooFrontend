import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../shared'

export const BooksContainer = () => {
  return (
    <div className="books-container">
      <Link className="books-container__badge category-badge" href="#">
        Новинки книг
        <Image src="/icons/badge-icons.svg" alt="" width="20" height="25" 
        className="books-container__icon"/>
      </Link>
      <div className="books-container__slider">
        <button className="books-container__btn prev-btn" type="btn">
             <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
        <div className="books-container__slider book-slider">
            <Link href="#" className="book-slider__book">
                <Image src="/images/books/1.jpg" width="200" height="250" alt="" 
                className="book-slider__book-image"/>
                <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                <h6 className="book-slider__title">
                    Крижаний дракон
                </h6>
                <p className="book-slider__author">
                    Джордж Р.Р. Мартін
                </p>
                <h6 className="book-slider__price">
                    350 грн
                </h6>
                <p className="book-slider__delivery-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    Очікується з 30.04.25
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Передзамовити
                </button>
            </Link>
            <Link href="#" className="book-slider__book">
                <Image src="/images/books/2.jpg" width="200" height="250" alt="" 
                className="book-slider__book-image"/>
                <h6 className="book-slider__title">
                    Гаррі Поттер. Магія плетіння. ...
                </h6>
                <p className="book-slider__author">
                    Таніс Грей
                </p>
                <h6 className="book-slider__price">
                    850 грн
                </h6>
                <p className="book-slider__delivery-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    Очікується з 31.05.25
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Передзамовити
                </button>
            </Link>
            <Link href="#" className="book-slider__book">
                <Image src="/images/books/3.jpg" width="200" height="250" alt=""
                className="book-slider__book-image" />
                <h6 className="book-slider__title">
                    Війна
                </h6>
                <p className="book-slider__author">
                    Боб Вудворд
                </p>
                <h6 className="book-slider__price">
                    559 грн
                </h6>
                <p className="book-slider__delivery-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    Очікується з 31.07.25
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Передзамовити
                </button>
            </Link>
            <Link href="#" className="book-slider__book">
                <Image src="/images/books/1.jpg" width="200" height="250" alt=""
                className="book-slider__book-image" />
                <h6 className="book-slider__title">
                    Крижаний дракон
                </h6>
                <p className="book-slider__author">
                    Джордж Р.Р. Мартін
                </p>
                <h6 className="book-slider__price">
                    350 грн
                </h6>
                <p className="book-slider__delivery-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    Очікується з 30.04.25
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Передзамовити
                </button>
            </Link>
            <Link href="#" className="book-slider__book">
                <Image src="/images/books/1.jpg" width="200" height="250" alt=""
                className="book-slider__book-image" />
                <h6 className="book-slider__title">
                    Крижаний дракон
                </h6>
                <p className="book-slider__author">
                    Джордж Р.Р. Мартін
                </p>
                <h6 className="book-slider__price">
                    350 грн
                </h6>
                <p className="book-slider__delivery-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    Очікується з 30.04.25
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Передзамовити
                </button>
            </Link>
        </div>  
        <button className="books-container__btn prev-btn" type="btn">
             <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
        </button>
      </div>
      <Link href="#" className="books-container__more-books">
        Перейти до категорії
        <Image src="/icons/arrow-left.svg" width="20" height="20" />
      </Link>
    </div>
  )
}

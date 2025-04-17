import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge, BookInfoBadge, Stars } from '../shared'

export const BooksContainer = () => {
  return (
    <div className="categories">
        <div className="books-container">
        <Link className="books-container__badge category-badge" href="#">
            Новинки книг
            <Image src="/icons/badge-icons.svg" alt="" width="20" height="25" 
            className="books-container__icon"/>
        </Link>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="books-container__slider book-slider">
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500156" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/1.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper">
                        <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    </div>
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

                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500344" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/2.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper"></div>
                    <h6 className="book-slider__title">
                        Гаррі Поттер. Магія ...
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
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500322" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/3.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper"></div>
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
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500527" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/1.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                        <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />    
                    </div>
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
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500387" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/1.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper"></div>
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
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
        <Link href="#" className="books-container__more-books">
            Перейти до категорії
            <Image src="/icons/arrow-left.svg" width="20" height="20" />
        </Link>
        </div>

        <div className="books-container">
        <Link className="books-container__badge category-badge pink-badge" href="#">
            Вас може зацікавити
        </Link>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="books-container__slider book-slider">
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500156" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/6.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper">
                    </div>
                    <h6 className="book-slider__title">
                        How to Train Your D...
                    </h6>
                    <p className="book-slider__author">
                        Крессіда Коуелл
                    </p>
                    <h6 className="book-slider__price">
                        1296 грн
                    </h6>
                    <p className="book-slider__delivery-time orange-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        Доставка з UK 20-30 днів
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">

                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500344" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/7.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper"></div>
                    <h6 className="book-slider__title">
                        The Ice Dragon
                    </h6>
                    <p className="book-slider__author">
                        Джордж Р.Р. Мартін
                    </p>
                    <h6 className="book-slider__price">
                        583 грн
                    </h6>
                    <p className="book-slider__delivery-time orange-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        Доставка з UK 20-30 днів
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500322" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/8.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper"></div>
                    <h6 className="book-slider__title">
                        How to Train Your D...
                    </h6>
                    <p className="book-slider__author">
                        Крессіда Коуелл
                    </p>
                    <h6 className="book-slider__price">
                        518 грн
                    </h6>
                    <p className="book-slider__delivery-time orange-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        Доставка з UK 20-30 днів
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500527" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/9.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                    </div>
                    <h6 className="book-slider__title">
                        A Feast for Crows
                    </h6>
                    <p className="book-slider__author">
                        Джордж Р.Р. Мартін
                    </p>
                    <h6 className="book-slider__price">
                        648 грн
                    </h6>
                    <p className="book-slider__delivery-time orange-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        Доставка з UK 20-30 днів
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500387" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/10.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper"></div>
                    <h6 className="book-slider__title">
                        A Song of Ice And F...
                    </h6>
                    <p className="book-slider__author">
                        Джордж Р.Р. Мартін
                    </p>
                    <h6 className="book-slider__price">
                        3554 грн
                    </h6>
                    <p className="book-slider__delivery-time orange-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        Доставка 9 днів
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
            </div>  
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
        <Link href="#" className="books-container__more-books">
            Перейти до категорії
            <Image src="/icons/arrow-left.svg" width="20" height="20" />
        </Link>
        </div>

        <div className="books-container">
        <Link className="books-container__badge category-badge blue-badge" href="#">
            Головні англомовні релізи сезону
            <Image src="/icons/badge-icons.svg" alt="" width="20" height="25" 
            className="books-container__icon"/>
        </Link>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="books-container__slider book-slider">
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500156" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/11.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper">
                    </div>
                    <h6 className="book-slider__title">
                        Empire of the Damn...
                    </h6>
                    <p className="book-slider__author">
                        Джей Крістофф
                    </p>
                    <h6 className="book-slider__price">
                        713 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">

                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500344" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/12.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper"></div>
                    <h6 className="book-slider__title">
                        Dream Count
                    </h6>
                    <p className="book-slider__author">
                        Чімаманда Нгозі Адічі
                    </p>
                    <h6 className="book-slider__price">
                        1296 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500322" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                        <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                    </div>
                    <h6 className="book-slider__title">
                        Looking at Women,...
                    </h6>
                    <p className="book-slider__author">
                        Вікторія Амеліна
                    </p>
                    <h6 className="book-slider__price">
                        1296 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500527" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/14.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">    
                    </div>
                    <h6 className="book-slider__title">
                        Beg, Borrow or Steal
                    </h6>
                    <p className="book-slider__author">
                        Сара Адамс
                    </p>
                    <h6 className="book-slider__price">
                        600 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Передзамовити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500387" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/15.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                        <Stars count="1" />
                    </div>
                    <h6 className="book-slider__title">
                        Deep End: From the...
                    </h6>
                    <p className="book-slider__author">
                        Алі Гейзелвуд
                    </p>
                    <h6 className="book-slider__price">
                        698 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
            </div>  
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
        <Link href="#" className="books-container__more-books">
            Перейти до категорії
            <Image src="/icons/arrow-left.svg" width="20" height="20" />
        </Link>
        </div>    

        <div className="books-container">
        <Link className="books-container__badge category-badge blue-badge wider" href="#">
            Книги про українських митців та їх творчий доробок
            <Image src="/icons/badge-icons.svg" alt="" width="20" height="25" 
            className="books-container__icon"/>
        </Link>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="books-container__slider book-slider">
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500156" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/16.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper">
                        <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    </div>
                    <h6 className="book-slider__title">
                        7 художників Зак...
                    </h6>
                    <p className="book-slider__author">
                        Олена Меленевська
                    </p>
                    <h6 className="book-slider__price">
                        417 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden orange-btn" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">

                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500344" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/17.jpg" width="200" height="250" alt="" 
                    className="book-slider__book-image"/>
                    <div className="book-slider__wrapper">
                        <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    </div>
                    <h6 className="book-slider__title">
                        Алла Горська. Спал...
                    </h6>
                    <p className="book-slider__author">
                    </p>
                    <h6 className="book-slider__price">
                        583 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500322" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/18.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                        <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                    </div>
                    <h6 className="book-slider__title">
                        Ловці світла: історії...
                    </h6>
                    <p className="book-slider__author">
                        Максим Дупешко
                    </p>
                    <h6 className="book-slider__price">
                        300 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500527" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/14.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">    
                    </div>
                    <h6 className="book-slider__title">
                        Beg, Borrow or Steal
                    </h6>
                    <p className="book-slider__author">
                        Сара Адамс
                    </p>
                    <h6 className="book-slider__price">
                        600 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Передзамовити
                    </button>
                </Link>
                <Link href="#" className="book-slider__book">
                    <div className="book-slider__book-info visually-hidden">
                        <BookInfoBadge text="1500387" />
                        <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                    </div>
                    <Image src="/images/books/15.jpg" width="200" height="250" alt=""
                    className="book-slider__book-image" />
                    <div className="book-slider__wrapper">
                        <Stars count="1" />
                    </div>
                    <h6 className="book-slider__title">
                        Deep End: From the...
                    </h6>
                    <p className="book-slider__author">
                        Алі Гейзелвуд
                    </p>
                    <h6 className="book-slider__price">
                        698 грн
                    </h6>
                    <p className="book-slider__delivery-time green-time">
                        <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                        В наявності
                    </p>
                    <button className="book-slider__order-btn visually-hidden" type="btn">
                        Купити
                    </button>
                </Link>
            </div>  
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
        <Link href="#" className="books-container__more-books">
            Перейти до категорії
            <Image src="/icons/arrow-left.svg" width="20" height="20" />
        </Link>
        </div>    
    </div>
  )
}

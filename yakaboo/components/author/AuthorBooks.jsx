import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { BookInfoBadge, Badge, Stars } from '../shared';

export const AuthorBooks = () => {
  return (
    <div className="author-books">
      <div className="author-books__header">
        <h5 className="author-books__count">331 товар</h5>
        <span className="author-books__select">
            За популярністю 
            <Image src="/icons/arrow-left.svg" alt="" width="15" height="15" />
        </span>
      </div>
      <div className="author-books__books-container">
        <Link href="#" className="author-books__book">
            <div className="author-books__book-info visually-hidden">
                <BookInfoBadge text="1500322" />
                <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
            </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="book-slider__book-image" />
                <div className="author-books__wrapper">
                    <Stars count={15} isSmaller={true} />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                    <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>
            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="book-slider__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>
            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Stars count={1} isSmaller={true} />
                    <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>
            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>
            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>

            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Stars count={7} isSmaller={true} />
                    <Badge text="Добірка" backgroundColor="rgb(0, 148, 95)" />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>

            <Link href="#" className="author-books__book">
                <div className="author-books__book-info visually-hidden">
                    <BookInfoBadge text="1500322" />
                    <BookInfoBadge text="/icons/heart.svg" isIcon={ true } />
                </div>
                <Image src="/images/books/13.jpg" width="200" height="250" alt=""
                className="author-books__book-image" />
                <div className="author-books__wrapper">
                    <Badge text="Розіграш" backgroundColor="rgb(234, 91, 61)" />
                    <Badge text="Хіт" backgroundColor="rgb(175, 57, 231)" />
                </div>
                <h6 className="author-books__title">
                    Looking at Women,...
                </h6>
                <p className="author-books__author">
                    Вікторія Амеліна
                </p>
                <h6 className="author-books__price">
                    1296 грн
                </h6>
                <p className="author-books__delivery-time green-time">
                    <Image src="/icons/truck.svg" width="25" height="25" alt="" />
                    В наявності
                </p>
                <button className="author-books__order-btn visually-hidden" type="btn">
                    Купити
                </button>
            </Link>
      </div>
      <div className="author-books__bottom-section">
        <button className="author-books__show-more" type="button">
            Показати більше товарів
        </button>
        <div className="author-books__section-footer">
            <button className="author-books__pagination-arrow disabled-btn">
                <Image src="/icons/pagination-left.svg" alt="" width="15" height="15" />
            </button>

            <div className="author-books__page-numbers">
                <button className="author-books__page-num active" type="button">
                    1
                </button>
                <button className="author-books__page-num" type="button">
                    2
                </button>
                <button className="author-books__page-num" type="button">
                    3
                </button>
                <button className="author-books__page-num" type="button">
                    4
                </button>
                <button className="author-books__page-num" type="button">
                    5
                </button>
                <button className="author-books__page-num" type="button">
                    6
                </button>
                <button className="author-books__page-num" type="button">
                    7
                </button>
            </div>

            <button className="author-books__pagination-arrow">
                <Image src="/icons/pagination-right.svg" alt="" width="15" height="15" />
            </button>
        </div>
      </div>
    </div>
  )
}

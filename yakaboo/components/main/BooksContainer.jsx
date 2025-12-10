import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge, BookInfoBadge, ProductCard, Stars } from '../shared'

const BooksContainer = () => {
  return (
    <div className="categories">
        <div className="books-container">
        <div className="books-container__header">
            <h3 className="books-container__title">
                Новинки книг
            </h3>
            <Link className="books-container__title-link" href="#">
                <span>
                    Показати все 
                    <Image src="icons/chevron-down.svg" width="15" height="15" alt="" />
                </span>
            </Link>    
        </div>
        <div className="books-container__slider">
            <button className="books-container__btn prev-btn visually-hidden" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
            <div className="books-container__slider book-slider">
                <ProductCard title="test" brand="test test" 
                imageSrc='https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-617-8383-94-7_cr.jpg'
                badges={[<Stars count={0} isSmaller={true} />,  <Badge text="Новинка" backgroundColor="#fff" />]}
                productCode='1231' productLink='#' oldPrice={500} bonusesCount={250}
                inStock={ true } withAddToWishlist={ true } />
            </div>  
            <button className="books-container__btn next-btn" type="btn">
                <Image src="/icons/arrow-left.svg" width="30" height="30" alt="" />
            </button>
        </div>
        <Link href="#" className="books-container__more-books">
            Перейти до категорії
            <Image src="/icons/arrow-left.svg" width="20" height="20" alt="" />
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
            <Image src="/icons/arrow-left.svg" width="20" height="20" alt=""/>
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
            <Image src="/icons/arrow-left.svg" width="20" height="20" alt="" />
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
            <Image src="/icons/arrow-left.svg" width="20" height="20" alt="" />
        </Link>
        </div>    
    </div>
  )
}


export default BooksContainer
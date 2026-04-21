"use client"

import { useState, useEffect, forwardRef } from 'react'
import Image from "next/image"
import AddToWishlistBtn from '../shared/AddToWishlistBtn'
import { BookImagesCarousel, BookInfoBlock } from '.';
import {  useProductImagesStore } from '../../states';
import { Breadcrumbs, Rate } from '../shared';
import Link from 'next/link';

export const BookContainerLeftSection = forwardRef(({ book, setIsSimpleFlashMessage, isGift, breadcrumbLinks }, ref) => {
    
    const [smallScreen, setSmallScreen] = useState(false)


    const images = book.images || [];
    const pageImages = images.filter((img) => img.type === "page");
    const info = isGift ? book.gift_info : book.book_info;

    const bookPromoOptions = {
        "Книга на фронт": info?.is_for_war,
        "Нацкешбек": info?.is_has_cashback,
        "Зимова Підтримка": info?.is_has_winter_esupport,
        "Єкнига": info?.is_has_esupport
    }


    const { setIsReadPart, setIsProductImagesOpen } = useProductImagesStore();

    const viewReadPartClick = () => {
        setIsReadPart(true)
        setIsProductImagesOpen(true)
    }

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 1441){
                setSmallScreen(true)
            } else {
                setSmallScreen(false)
            }
        }

        handleResize();
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])


  return (
    <div className="book-container__section left-section">
        { console.log(smallScreen) }
        
        { smallScreen && (
            <Breadcrumbs linksList={ breadcrumbLinks } />    
        ) }

        { smallScreen && (
            <div className="book-container__author-block">
                <h3 className="book-container__book-title">
                    <span className="book-container__book-title-template">
                        {book?.book_info?.format === "Електронна" ? "Електронна книга" : "Книга"}
                    </span>
                    { book.title }
                </h3>
                { book?.authors.length > 0 && (
                    <div className="book-container__authors-block">
                        {book.authors.map((author, index) => (
                            <span key={ index }>
                                <Link className="book-container__link author-link" href={`/author/view/${author.slug}`}>
                                    {author.first_name} {author.last_name}
                                </Link>       
                                { index < book.authors.length - 1 && ", " }    
                            </span>
                        ))} 
                    </div>
                ) }     
            </div>    
        ) }

        { smallScreen && (
            <div className="book-container__flex-container">
                {book?.reviews?.length > 0 && (
                    <Rate reviews={ book?.reviews } onClick={() => {
                        if(ref.current){
                            ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                    }} />
                )}

                <p className="book-container__code">
                    Код товару: {info.code}
                </p>     
            </div>    
        ) }        

        <div className="book-container__btns-section">
            <AddToWishlistBtn book={ book } setIsSimple={ setIsSimpleFlashMessage } />
                {pageImages.length > 0 && (
                    <button className="book-container__header-btn read-part" onClick={() => viewReadPartClick()}>
                        <Image src="/icons/book.svg" alt="" width="25" height="25" />
                            Читати уривок
                    </button>    
                )}
        </div>
    
        <BookImagesCarousel images={ images } title={ book.title } isGift={ isGift } book={ book } />

         { smallScreen && (
            <div className="book-container__underlined-container">
                <div className="book-container__block-price-block">
                    { !book?.promo_price ? (
                        <div className="book-container__price-row">
                            <h2 className="book-container__header book-container__h2">
                                { book.price } грн
                            </h2>
                            <div className="book-container__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">+{ Math.ceil(book.price / 2) } бонусів</p>
                            </div>
                        </div>    
                    ) : (
                        <div className="book-container__block-discount">
                            <div className="book-container__old-price">
                                <div className="book-container__discount">
                                    <span className="book-container__cancelled-text">
                                        { book.price } грн
                                    </span>
                                    <span className="product-card__discount-percents book-container__discount-percents">
                                        -{Math.round(((book.price - book.promo_price) / book.price) * 100)}%
                                    </span>    
                                </div>
                                <h5 className="book-container__pink-text">
                                    { book.promo_price } грн
                                </h5>
                            </div>
                            <div className="book-container__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">
                                    +{ book?.promo_price ? Math.ceil(book.promo_price / 2) : Math.ceil(book.price / 2) } бонусів
                                </p>
                            </div>
                        </div>
                    ) }
                    <div className="book-container__in-stock-row">
                        { info.format === "Паперова" ? (
                            <span className={`book-container__book-status ${!info?.in_stock || info?.delivery_time || info?.uk_delivery_time 
                            ? "red-text": "green-text"} ${info.waiting_since ? "pink-text" : ""}`}>
                                { info?.in_stock && !info.uk_delivery_time && !info?.delivery_time && (
                                    "В наявності"
                                    ) }
                                    { !info?.in_stock && ("Немає в наявності") } 
                                    { info?.delivery_time && (
                                        `Доставка протягом ${info.delivery_time} днів`
                                    )}
                                    { info.uk_delivery_time && (
                                        `Доставка з UK протягом ${info.uk_delivery_time} днів`
                                    ) }
                                    { info.waiting_since && (
                                        `Очікується з ${waitingSice}`
                                ) }
                            </span>
                        ) : <></> }
                        {!isGift && info.format === "Паперова" && <div className="book-container__dot-separator" />}
                        { info.format === "Електронна" && <Image src="/icons/mobile.svg" alt="" width="15" height="15" /> }
                        {!isGift && <span className={`book-container__text-gray`}>{ info?.format } книга</span>}
                    </div>
                    <button
                        className={`book-container__pink-buy-btn buy-btn ${info.in_stock ? "buy-btn-pink" : "disabled-btn"}`}
                        disabled={!info.in_stock}
                    >
                        {info.in_stock ? "Купити" : "Сповістити про наявність"}
                    </button> 
                </div>

                <BookInfoBlock book={ book } isGift={ false } withTitle={ false } />
                

                { (info?.is_has_cashback || info?.is_has_esupport || info?.is_has_winter_esupport || info?.is_far_war) && (
                    <div className="book-container__participant-promo">
                        <p className="book-container__participant-promo-title">
                            Товар бере участь у таких промо:
                        </p>
                        <div className="book-container__participant-promo-items">
                            { Object.entries(bookPromoOptions).filter(([_, isActive]) => isActive).map(([title]) => (
                                <span key={ title } className="book-container__participant-promo-item">
                                    { title }
                                </span>
                            )) }    
                        </div>
                    </div>    
                )  }    
            </div>    
        ) }

    </div>
  )
})

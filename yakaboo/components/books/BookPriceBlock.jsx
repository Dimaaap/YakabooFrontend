"use client"

import { useState, useEffect } from "react";
import Image from "next/image"
import { Delivery, DeliveryInfoModal, DownloadFile, MobileApp } from "../dynamic"
import { DeliveryTerms } from "../shared"
import { useDeliveryCityStore, useDeliveryModalStore } from "../../states";
import { AdditionalFromUkInfo } from "../modals";

export const BookPriceBlock = ({ book, info, isGift }) => {
    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();

    const [smallScreen, setSmallScreen] = useState(false);
    const [isAdditinalModalOpen, setIsAdditionalModalOpen] = useState(false)

    const bookPromoOptions = {
        "Книга на фронт": info?.is_for_war,
        "Нацкешбек": info?.is_has_cashback,
        "Зимова Підтримка": info?.is_has_winter_esupport,
        "Єкнига": info?.is_has_esupport
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

    if(smallScreen) {
        return null
    }

    return(
        <div className="book-container__section right-section">
            <div className="book-container__block-price-block">
                { !book?.promo_price ? (
                    <div className="book-container__price-row">
                        <h2 className="book-container__header book-container__h2">
                            { book.price } грн
                        </h2>
                        { info?.bonuses > 0 && (
                            <div className="book-container__bonuses product-bonuses">
                                <Image src="/icons/bonus.svg" alt="" width="20" height="20" />
                                <p className="product-bonuses__bonuses-count">+{ info.bonuses } бонусів</p>
                            </div>
                        ) }
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
                        <span className={`book-container__book-status 
                            ${info.status !== "in_stock" ? "red-text": "green-text"}
                            ${info.status === "pending" ? "pink-text": ""}`}>
                                { info.status === "in_stock" && (
                                    "В наявності"
                                ) }
                                { info.status === "not_in_stock" && (
                                    "Немає в наявності"
                                ) }
                                { info.status === "delivery_from_ukraine" && (
                                    `Доставка протягом ${info?.delivery_time || 10} днів`
                                ) }
                                { info.status === "delivery_from_uk" && (
                                    <span className="book-container__book-status">
                                        <Image src="/icons/uk-flag.svg" alt="" width="16" height="16" />
                                        Доставка з UK протягом {info?.uk_delivery_time || 15} днів    
                                    </span>
                                    
                                ) }
                                { info.status === "pending" && (
                                    `Очікується з ${info.waiting_since}`
                                ) }
                            </span>
                    ) : <></>}

                    
                    {!isGift && info.format === "Паперова" && 
                    info?.status !== "delivery_from_uk" ? <div className="book-container__dot-separator" /> : 
                    <div className="book-container__additinal-info-separator" 
                    onMouseEnter={() => setIsAdditionalModalOpen(!isAdditinalModalOpen)}
                    onMouseLeave={() => setIsAdditionalModalOpen(!isAdditinalModalOpen)}>
                        { isAdditinalModalOpen && <AdditionalFromUkInfo days={ info?.uk_delivery_time || 15 } /> }
                        <Image src="/icons/red-info.svg" alt="Attention" width="15" height="15" />
                    </div>
                    }
                    { info.format === "Електронна" && <Image src="/icons/mobile.svg" alt="" width="15" height="15" /> }
                    {!isGift && <span className={`book-container__text-gray`}>{ info?.format } книга</span>}
                </div>
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

            { info?.has_esupport && (
                <div className="book-container__block collection-block product-collection">
                    <div className="collection-block__blue-badge collection-badge blue-badge">Кешбек</div>
                    <p className="collection-block__info-text">Купити з програмою "Зимова єПідтримка"</p>
                </div>
            ) }

            <button
                className={`book-container__pink-buy-btn buy-btn ${info.status !== "pending" ? "buy-btn-pink" : "disabled-btn"}`}
                disabled={info.status !== "in_stock"}
            >
                {info.status !== "not_in_stock" ? "Купити" : "Сповістити про наявність"}
            </button>

            { info?.format !== "Електронна" ? (<Delivery />) : <MobileApp /> }
            { info?.format === "Електронна" && <DownloadFile />}
            
            { isDeliveryModalOpen && <DeliveryInfoModal /> }

            { deliveryLocation && <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ book.code } /> }
        </div>
    )

}
"use client"

import Image from "next/image"
import { Delivery, DeliveryInfoModal, DownloadFile, MobileApp } from "../dynamic"
import { DeliveryTerms } from "../shared"
import { useDeliveryCityStore, useDeliveryModalStore } from "../../states";

export const BookPriceBlock = ({ book, info, isGift }) => {
    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();

    return(
        <div className="book-container__section right-section">
            <div className="book-container__block-price-block">
                { console.log(book) }
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
                        <span className={`book-container__book-status ${!info?.in_stock || info?.delivery_time || info?.uk_delivery_time 
                        ? "red-text": "green-text"} ${info.waiting_since ? "pink-text" : ""}`}>
                            { info?.in_stock && !info.uk_delivery_time && !info?.delivery_time && (
                                "В наявності"
                            ) }
                            { !info?.in_stock && (
                                "Немає в наявності"
                            ) } 
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
                    {!isGift && <span className={`book-container__text`}>{ info?.format } книга</span>}
                </div>
            </div>

            { info?.has_esupport && (
                <div className="book-container__block collection-block product-collection">
                    <div className="collection-block__blue-badge collection-badge blue-badge">Кешбек</div>
                    <p className="collection-block__info-text">Купити з програмою "Зимова єПідтримка"</p>
                </div>
            ) }

            <button
                className={`book-container__pink-buy-btn buy-btn ${info.in_stock ? "buy-btn-pink" : "disabled-btn"}`}
                disabled={!info.in_stock}
            >
                {info.in_stock ? "Купити" : "Сповістити про наявність"}
            </button>

            { info?.format !== "Електронна" ? (<Delivery />) : <MobileApp /> }
            { info?.format === "Електронна" && <DownloadFile />}
            
            { isDeliveryModalOpen && <DeliveryInfoModal /> }

            { deliveryLocation && <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ book.code } /> }
        </div>
    )

}
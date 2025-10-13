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

                <div className="book-container__in-stock-row">
                    { info.format === "Паперова" ? (
                        <span className={`book-container__book-status ${info?.in_stock ? "green-text": "gray-text"}`}>
                            {info?.in_stock ? "В наявності" : "Немає в наявності"}
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

            { deliveryLocation && <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ info.code } /> }
        </div>
    )

}
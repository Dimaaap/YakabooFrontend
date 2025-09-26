"use client"

import Image from 'next/image'
import { Delivery, DeliveryInfoModal } from '../../dynamic'
import { DeliveryTerms } from '..'
import { useDeliveryCityStore, useDeliveryModalStore } from '../../../states'
import { ImagesConfig, ImagesLinks } from '../../../site.config'

export const PriceContainer = ({ hobby }) => {

    const { isDeliveryModalOpen } = useDeliveryModalStore();
    const { deliveryLocation } = useDeliveryCityStore();

    return (
         <div className="book-container__block price-block hobby-page__price-block">
            <div className="book-container__price-row hobby-page__price-row">
                { hobby.is_in_stock && (
                    <h2 className="book-container__header book-container__h2 hobby-page__header">
                        { `${hobby.price} грн` }
                    </h2>    
                ) }
                                
                { hobby.is_in_stock && hobby.bonuses && (
                    <div className="book-container__bonuses hobby-page__bonuses product-bonuses">
                        <Image src={ ImagesLinks.BONUS } alt="" width={ ImagesConfig.DEFAULT_WIDTH } height={ ImagesConfig.DEFAULT_HEIGHT } />
                        <p className="product-bonuses__bonuses-count">+{ hobby.bonuses } бонусів</p>
                    </div>
                ) }
            </div>
            <div className="book-container__in-stock-row">
                <span className={`book-container__book-status ${hobby.is_in_stock ? "green-text" : "gray-text"}`}>
                    { hobby.is_in_stock ? "В наявності" : "Немає в наявності" }
                </span>
            </div>
            <div className={`book-container__pink-buy-btn buy-btn ${hobby.is_in_stock ? "buy-btn-pink" : "notify-btn-gray"}`}>
                { hobby.is_in_stock ? "Купити" : "Сповістити про наявність" }
            </div>
            { hobby.is_in_stock && (
                <>
                    <Delivery />
        
                    { isDeliveryModalOpen && <DeliveryInfoModal /> }
        
                    { deliveryLocation && (
                        <DeliveryTerms deliveryLocation={ deliveryLocation } productCode={ hobby.code } />
                    ) }
                </>
            ) }
        </div>
    )
}
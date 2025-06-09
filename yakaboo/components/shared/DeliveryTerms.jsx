import React from 'react'
import Image from "next/image"

export const DeliveryTerms = () => {
  return (
    <div className="container-info__delivery-terms delivery-terms">
        <div className="delivery-terms__row">
            <div className="delivery-terms__cell">
                <Image src="/icons/yakaboo.svg" alt="" width="16" height="16" />
                <p className="delivery-terms__title">
                    Yakaboo
                </p>
            </div>
            <div className="delivery-tems__cell">
                <p className="delivery-terms__price">
                    30 грн
                </p>
                <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
            </div>
        </div>
    
        <div className="delivery-terms__row">
            <div className="delivery-terms__cell">
                <Image src="/icons/nova-poshta.svg" alt="" width="16" height="16" />
                <p className="delivery-terms__title">
                    Нова Пошта
                </p>
            </div>
            <div className="delivery-tems__cell">
                <p className="delivery-terms__price">
                    60-95 грн
                </p>
                <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
            </div>
        </div>
    
        <div className="delivery-terms__row">
            <div className="delivery-terms__cell">
                <Image src="/icons/meest.svg" alt="" width="16" height="16" />
                <p className="delivery-terms__title">
                    Meest
                </p>
            </div>
            <div className="delivery-tems__cell">
                <p className="delivery-terms__price">
                    50 грн
                </p>
                <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
            </div>
        </div>
    
        <div className="delivery-terms__row">
            <div className="delivery-terms__cell">
                <Image src="/icons/ukrposhta.svg" alt="" width="16" height="16" />
                <p className="delivery-terms__title">
                    Укрпошта
                </p>
            </div>
            <div className="delivery-tems__cell">
                <p className="delivery-terms__price">
                    39-75 грн
                </p>
                <Image src="/icons/chevron-down.svg" alt="" width="16" height="16" />
            </div>
        </div>
    
        <div className="delivery-terms__additional">
            <div className="delivery-terms__seller-info">
                <p className="delivery-terms__cell">
                    Продавець товару
                </p>
                <p className="delivery-terms__cell">
                    Код товару
                </p>
            </div>
            <div className="delivery-terms__seller-info">
                <Image src="/icons/logo.svg" alt="" width="40" height="20" />
                <p className="delivery-terms__cell">
                    1245917
                </p>
            </div>
        </div>
    </div>
  )
}


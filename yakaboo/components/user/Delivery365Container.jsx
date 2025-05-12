import React from 'react'
import { NoneSpan } from '../shared'
import Image from 'next/image'

export const Delivery365Container = () => {
  return (
    <div className="delivery">
        <div className="delivery-header">
            <p className="delivery__title">
                Доставка 365
            </p>
            <NoneSpan />
        </div>
        <div className="delivery__body">
            <div className="delivery__left">
                <Image src="/icons/365.svg" alt="" width="20" height="20" />   
            </div>
            <div className="delivery__right">
                <p>
                    Підписка на безкоштовну доставку замовлень від Yakaboo.ua по всій Україні. 
                    Діє на всі замовлення від 300 грн протягом 1 року з моменту оформлення.
                    Немає жодних обмежень по кількості замолень.
                </p>
            </div>
        </div>
        <div className="delivery__footer">
            <button className="delivery__subscribe" type="button">
                Детальніше про Доставку 365
            </button>
        </div>
    </div>
  )
}

"use client";

import Image from 'next/image'
import React, { useState } from 'react'

export const PaymentMethods = ({ locationPaymentMethods }) => {

    const [showAll, setShowAll] = useState(false)
  
    const { cart_or_scholar_pack, winter_e_support, e_book, prepay } = locationPaymentMethods
    const methodsMap = { 
        cart_or_scholar_pack: {
            icon: "/icons/visa.svg",
            text: "Оплата карткою онлайн (через сервіс LiqPay)",
            need: cart_or_scholar_pack
        },
        winter_e_support: {
            icon: "/icons/social/winter-e-support.svg",
            text: "Оплата карткою Зимова ЄПідтримка / Національний кешбек",
            need: winter_e_support
        },
        e_book: {
            icon: "/icons/e-support.svg",
            text: 'Оплата карткою "ДІЯ єКнига (виплата на 18-ліття) - 998,40 грн"',
            need: e_book
        },
        prepay: {
            icon: "/icons/check.svg",
            text: "Передплата за рахунком",
            need: prepay
        }
    }

    const activeMethods = Object.values(methodsMap).filter(m => m.need);

     const methods = showAll 
        ? activeMethods 
        : activeMethods.slice(0, 2)
  
  
    return (
    <div className="container-info__payment-methods payment-methods delivery-term">
        <p className="payment-methods__title">
            Варіанти оплати
        </p>
        <div className="payment-methods__row-container">
            { methods.map((method, index) => (
                <div className="payment-methods__methods-row" key={ index }>
                    <span className="payment-methods__icon-block">
                        <Image src={ method.icon } width={ 20 } height={ 20 } alt={method.text} />
                    </span>
                    <p className="payment-methods__text">
                        { method.text }
                    </p>
                </div>    
                )
            ) }
    
        </div>
        
        { activeMethods.length > 2 ? (
            !showAll ? (
                <button className="payment-methods__show-more" type="button" onClick={ () => setShowAll(true) }>
                    Показати все
                    <Image src="/icons/chevron-down.svg" alt="" width={ 16 } height={ 16 } />
                </button>
            ) : (
                <button className="payment-methods__show-more rotated" type="button" onClick={ () => setShowAll(false) }>
                    Показати менше
                    <Image src="/icons/chevron-down.svg" alt="" width={ 16 } height={ 16 } />
             </button>
            )
        ) : null }

    </div>
  )
}

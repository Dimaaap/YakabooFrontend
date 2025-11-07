"use client"

import Image from "next/image"
import { wordDeclension } from "../../services/word-declension.service"
import Link from "next/link"
import { useState } from "react"

const CartInfo = ({ itemsCount, totalPrice }) => {

    const [isOpen, setIsOpen] = useState(true); 

    if(!isOpen) {
        return null
    }
    
    return (
        <div className="cart-info">
            <div className="cart-info__left-component">
                <div className="cart-info__image-wrapper">
                    <Image src="/icons/cart-white.svg" alt="" width="20"
                    height="20" className="cart-info__image" />
                </div>
                <div className="cart-info__text-content">
                    <h4 className="cart-info__cart-header">
                        У кошику { itemsCount } { wordDeclension(itemsCount) }
                    </h4>
                    <p className="cart-info__cart-price">
                        Сума товарів у кошику { totalPrice } грн
                    </p>
                </div>
            </div>

            <div className="cart-info__right-component">
                <Link className="cart-info__order-btn pink-btn"
                href="/checkout">
                    Оформити замовлення
                </Link>
                <button className="cart-info__close-btn" onClick={ () => setIsOpen(false) }>
                    <Image src="/icons/close-smaller.svg" alt="" width="25" height="25" /> 
                </button>
            </div>
        </div>
    )
}

export default CartInfo
"use client"

import Image from "next/image"
import { wordDeclension } from "../../services/word-declension.service"
import Link from "next/link"
import { useState } from "react"
import { useSmallScreen } from "../../hooks"

const CartInfo = ({ itemsCount, totalPrice }) => {

    const [isOpen, setIsOpen] = useState(true); 
    const { isSmallScreen } = useSmallScreen(1024);

    if(!isOpen) {
        return null
    }
    
    return (
        <div className="cart-info">
            <div className="cart-info__left-component">
                { isSmallScreen && (
                    <div className="cart-info__image-wrapper">
                        <Image src="/icons/cart-white.svg" alt="" width="20"
                        height="20" className="cart-info__image" />    
                    </div>    
                ) }
                <div className="cart-info__text-content">
                    <h4 className="cart-info__cart-header">
                        У кошику <span className="cart-info__bolder-text">{ itemsCount }</span> { wordDeclension(itemsCount) }
                    </h4>
                    { isSmallScreen ? (
                        <p className="cart-info__cart-price">
                            Сума товарів у кошику { totalPrice } грн
                        </p>    
                    ) : (
                        <p className="cart-info__cart-price">
                            На суму <span className="cart-info__bolder-text">{ totalPrice } грн</span>
                        </p>
                    ) }
                    
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
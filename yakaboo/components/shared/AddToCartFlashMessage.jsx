"use client";

import { useEffect } from 'react'
import { wordDeclension } from '../../services/word-declension.service';
import Link from 'next/link';
import Image from 'next/image';
import { useCartFlashMessageOpenStore } from '../../states';

const CLOSE_MESSAGE_TIME = 10_000;


export const AddToCartFlashMessage = ({ itemsCount, price }) => {
    const { isAddToCartModalOpen, setIsAddToCartModalOpen } = useCartFlashMessageOpenStore()

    useEffect(() => {
        if (itemsCount > 0) {
            setIsAddToCartModalOpen(true);

            const id = setTimeout(() => {
                setIsAddToCartModalOpen(false);
            }, CLOSE_MESSAGE_TIME);

            return () => clearTimeout(id);
        }
    }, [itemsCount, setIsAddToCartModalOpen]);

    const handleClose = () => {
        setIsAddToCartModalOpen(false)
    }
  
    return (
        <div className={`flash-message cart-flash ${ isAddToCartModalOpen ? "animate-slide-in": "animate-slide-out" }`}>
            <button className="menu__close flash-message__close cart-flash__close" 
            type="button" onClick={ handleClose }>
                <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
            </button>
            <div className="cart-flash__body">
                <div className="cart-flash__icon">
                    <Image src="/icons/cart.svg" alt="Cart" width={ 25 } height={ 25 } />
                </div>
                <div className="cart-flash__text">
                    <p className="cart-flash__header">
                        Товар додано до кошика
                    </p>
                    <span className="flash-cart-flash__message-text cart-flash__message-text">
                        В кошику { itemsCount } { wordDeclension(itemsCount) } <br />
                        Сума товарів у кошику { price } грн
                    </span>    
                </div>
            </div>
            <Link className="cart-flash__button" type="button" href="/checkout">
                Оформити замовлення
            </Link>
        </div>
  )
}

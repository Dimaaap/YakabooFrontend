"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from '../../states'
import { CartProductCountInput } from '.'

export const CartModalItem = ({ index, item, userEmail }) => {

    const { deleteItemFromCart, changeQuantity } = useCartStore();

  return (
    <div className="cart-body__item-container" key={ index }>
        <div className="cart-body__item-info">
            <div className="cart-body__image-container">
                <Link href={`/book/${item.slug}`}>
                    <Image src={ item.images.image_url} alt="" width="40" height="45" className="cart-bory__item-image" /> 
                </Link> 
            </div>
            <div className="cart-body__book-content">
                <Link className="cart-body__book-title" href={`/book/${item.slug}`}>
                    { item.title }
                </Link>
                { item.authors.map((author, author_index) => (
                    <span className="cart-body__author" key={ author_index }>
                        { author.first_name } { author.last_name }
                        { author_index < item.authors.length - 1 ? ", " : ""}
                    </span>
                )) }
                
                <div className="cart-body__price-row">
                    <p className="cart-body__price blue-text">
                        { item.price } грн 
                    </p>
                <div className="dot-separator" />
                    <span className="cart-body__book-format">
                        { item.format }
                    </span>
                </div>

                <div className="cart-body__in-stock-row">
                    <p className="cart-body__status">
                        <Image src={`${item.status === "in_stock" ? "/icons/green-truck.svg" : "/icons/truck.svg"}`} height="18" width="18" alt="" />
                        <span className={`cart-body__status-text ${item.status === "in_stock" ? "green-text": "red-text"}`}>
                            { item.status === "in_stock" ? "В наявності" : "Немає в наявності" }  
                        </span>
                    </p>
                    <div className="dot-separator" />
                        <span className="cart-body__text">
                            Код <span className="cart-body__code">{item.code}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="cart-body__item-features">
                <button className="cart-body__btn delete-item-btn" type="button" 
                onClick={ () => deleteItemFromCart(item.book_id, userEmail) }>
                    Видалити
                </button>

                <div className="cart-body__quantity">
                    <div className="cart-body__quantity-feature minus" onClick={() => changeQuantity(item.book_id, "minus", userEmail)}>
                        <div className="cart-body__minus"></div>
                    </div>
                    <CartProductCountInput item={ item } />
                    <div className="cart-body__quantity-feature plus" onClick={() => changeQuantity(item.book_id, "add", userEmail)}>
                        <div className="cart-body__plus"></div>
                    </div>
                </div>
            </div>
        </div>
  )
}

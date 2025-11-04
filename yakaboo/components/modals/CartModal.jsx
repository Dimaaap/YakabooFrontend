"use client"

import React, { useEffect, useState } from 'react'
import { useCartModalStore } from '../../states'
import { CookiesWorker, fetchData, handleBackdropClick } from '../../services'
import { ModalCloseBtn } from '../shared'
import Endpoints from '../../endpoints'
import { wordDeclension } from '../../services/word-declension.service'
import Image from 'next/image'
import Link from 'next/link'

const CartModal = () => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()
  const [cartItems, setCartItems] = useState([])

  const userEmail = CookiesWorker.get("email")

  useEffect(() => {
    fetchData(Endpoints.CART_ITEMS(userEmail), setCartItems)
  }, [])

  return (
    <div className="menu" onClick={e => handleBackdropClick(e, setIsCartModalOpen)}>
      <div className={`menu__content cart-content ${isCartModalOpen ? 'active': ''}`}>
        <div className="menu__header cart-header">
            <p className="cart-header__title">
                Кошик
            </p>
            <ModalCloseBtn clickHandler={() => setIsCartModalOpen(false)} />
        </div>
        <div className="menu__body cart-body">
            { cartItems?.items?.length < 1 ? (
              <div className="cart-body__text-container">
                <p className="cart-body__text-title">
                      Ваш кошик порожній
                  </p> 
                  <p className="cart-body__text-desc">
                      Не вагайтесь і перегляньте наш каталогю, 
                      щою знайти щосб гарне для Вас!
                  </p>
              </div>  
            ) : (
                <div className="cart-body__items">
                  <div className="cart-body__items-count">
                     <span className="cart-body__count">
                      { cartItems?.items?.length } шт.
                     </span>
                     <button className="cart-body__btn delete-all-btn" type="button">
                      Видалити все
                     </button>
                  </div>
                  <div className="cart-body__items-container">
                    { cartItems?.items?.map((item, index) => (
                      <div className="cart-body__item-container" key={ index }>
                        <div className="cart-body__item-info">
                          <div className="cart-body__image-container">
                            <Link href={`/book/${item.slug}`}>
                              <Image src={ item.images[0].image_url } alt="" width="40" height="45" className="cart-bory__item-image" /> 
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
                              <p className="cart-body__price red-text">
                                { item.price } грн 
                              </p>
                              <div className="dot-separator" />
                              <span className="cart-body__book-format">
                                { item.format }
                              </span>
                            </div>

                            <div className="cart-body__in-stock-row">
                              <p className="cart-body__status">
                                <Image src="/icons/truck.svg" height="18" width="18" alt="" />
                                { item.is_in_stock ? "В наявності" : "Немає в наявності" }
                              </p>
                              <div className="dot-separator" />
                              <span className="cart-body__text">
                                Код {item.code}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="cart-body__item-features">
                          <button className="cart-body__btn delete-item-btn" type="button">
                            Видалити
                          </button>

                          <div className="cart-body__quantity">
                            <button className="cart-body__quantity-feature plus">
                              -
                            </button>

                            <input type="text" className="cart-body__quantity-input" value={ item.quantity } />

                            <button className="cart-body__quantity-feature minus">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )) }
                  </div>
                  
                  <div className="cart-body__bonuses">
                    <div className="cart-body__bonuses-container">
                      <Image src="/icons/bonuses.svg" height="25" width="25" alt="" />
                      <p className="cart-body__bonuses-text">
                        За цю покупку буде нараховано 
                        <b className="cart-body__bonuses-text-highlighted">
                          + {Math.ceil(cartItems.total_price / 2)} бонусів.
                        </b>
                      </p>
                    </div>
                  </div>

                  <div className="cart-body__footer">
                    <div className="cart-body__footer-row">
                      <p className="cart-body__footer-text">
                        Всього
                      </p>
                      <p className="cart-body__footer-text">
                        { cartItems.total_price } грн
                      </p>
                    </div>

                    <div className="cart-body__footer-row">
                      <p className="cart-body__footer-text-smaller">
                        Бонуси за замовлення
                        <Image src="/icons/info.svg" alt="" width="16" height="16" />
                      </p>
                      <div className="cart-body__footer-text-bonuses">
                        + {Math.ceil(cartItems.total_price / 2)} бонусів
                      </div>
                    </div>

                    <button className="cart-body__submit-btn">
                      Перейти до оформлення замовлення
                    </button>
                  </div>
                </div>
            ) }
            
        </div>
      </div>
    </div>
  )
}

export default CartModal
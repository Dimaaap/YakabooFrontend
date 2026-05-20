"use client"

import React, { useEffect, useState } from 'react'
import { useCartModalStore, useCartStore } from '../../states'
import { CookiesWorker, handleBackdropClick } from '../../services'
import { CartModalBonuses, CartModalItem, EmptyCartModal, FlashMessageWithAgreement, ModalCloseBtn } from '../shared'
import Endpoints from '../../endpoints'
import Image from 'next/image'
import { BonusesInfoModal } from '.'

const CartModal = () => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()
  const { cart, setCart } = useCartStore();
  const [isBonusesInfoModalOpen, setIsBonusesInfoModalOpen] = useState(false);
  const [showFlashMessage, setShowFlashMessage] = useState(false);

  const userEmail = CookiesWorker.get("email")

  const deleteAllItemsFromCartHandler = () => {
    setShowFlashMessage(true)
  }

  const handleDeleteAll = async() => {
    const res = await fetch(Endpoints.CLEAR_CART(userEmail), {
      method: "POST"
    })

    if(res.ok){
       setCart({
        items: [],
        total_price: 0,
        discount: 0,
        final_price: 0,
        promo: null
      });
    } else {
      console.log(res.json())
    }
  }
  
  useEffect(() => {
    if (!userEmail) return;

    const loadCart = async () => {
      const res = await fetch(Endpoints.CART_ITEMS(userEmail));
      const data = await res.json();

      setCart(data);
    };

    loadCart();
    
  }, [userEmail])

  const items = cart?.items || [];

  return (
    <div className="menu" 
    onClick={e => handleBackdropClick(e, setIsCartModalOpen)}>
      { showFlashMessage && (
        <FlashMessageWithAgreement message="Ви впевнені, що хочете видалити всі товари з кошика?"
        onConfirm={ handleDeleteAll } onClose={() => setShowFlashMessage(false)}/>
      ) }
      <div className={`menu__content cart-content ${isCartModalOpen ? 'active': ''}`}>
        <div className="menu__header cart-header">
            <p className="cart-header__title">
                Кошик
            </p>
            <ModalCloseBtn clickHandler={() => setIsCartModalOpen(false)} />
        </div>
        <div className="menu__body cart-body">
            { items?.length === 0 ? (
              <EmptyCartModal />
            ) : (
                <div className="cart-body__items">
                  <div className="cart-body__items-count">
                     <span className="cart-body__count">
                      { items.length } шт.
                     </span>
                     <button className="cart-body__btn delete-all-btn" type="button"
                     onClick={ deleteAllItemsFromCartHandler }>
                      Видалити все
                     </button>
                  </div>
                  <div className="cart-body__items-container">
                    { items.map((item, index) => (
                      <CartModalItem index={ index } item={ item } userEmail={ userEmail } key={ index }/>
                    )) }
                  </div>
                  
                  <div className="cart-body__bottom-section">
                    <CartModalBonuses cart={ cart } />

                    <div className="cart-body__footer">
                      <div className="cart-body__footer-row">
                        <p className="cart-body__footer-text bold-text">
                          Всього
                        </p>
                        <p className="cart-body__footer-text bold-text">
                          { cart.final_price } грн
                        </p>
                      </div>

                      <div className="cart-body__footer-row">
                        <p className="cart-body__footer-text-smaller" >
                          Бонуси за замовлення
                          <Image src="/icons/info.svg" className="cart-body__footer-text-image" 
                          alt="" width="16" height="16" onClick={() => setIsBonusesInfoModalOpen(!isBonusesInfoModalOpen)}/>
                        </p>
                        <p className="cart-body__footer-text-bonuses">
                          + {Math.ceil(cart.total_price / 2)} бонусів
                        </p>
                      </div>

                      { isBonusesInfoModalOpen && <BonusesInfoModal /> }

                      <button className="cart-body__submit-btn">
                        Перейти до оформлення замовлення
                      </button>
                    </div>
                  </div>
                  
                </div>
            ) }
            
        </div>
      </div>
    </div>
  )
}

export default CartModal
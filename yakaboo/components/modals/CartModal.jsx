"use client"

import React, { useEffect, useState } from 'react'
import { useCartModalStore, useCartStore } from '../../states'
import { CookiesWorker, fetchData, handleBackdropClick } from '../../services'
import { FlashMessageWithAgreement, ModalCloseBtn } from '../shared'
import Endpoints from '../../endpoints'
import Image from 'next/image'
import Link from 'next/link'
import { BonusesInfoModal } from '.'

const CartModal = () => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()
  const { cartItems, setCartItems, clearCart, updateCartItemQuantity } = useCartStore();
  const [prevQuantities, setPrevQuantities] = useState({})
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
      clearCart()
      console.log(cartItems)
    } else {
      console.log(res.json())
    }
  }

  const deleteItemFromCartHandler = async(bookId) => {
    const res = await fetch(Endpoints.DELETE_ITEM_FROM_CART(userEmail, bookId), {
      method: "DELETE"
    })

    if(res.ok){
      setCartItems((prev) => {
        if(!prev?.items) return prev;

        const updatedItems = prev.items.filter(
          (item) => item.book_id !== bookId
        );

        const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return {
          ...prev, 
          items: updatedItems,
          total_price: updatedTotal
        }
      });
    } else {
      return null
    }
  }

  const changeQuantity = async(bookId, addOrMinus) => {
    const currentItem = cartItems.items.find(item => item.book_id === bookId);

    if(!currentItem) {
      return
    }

    let newQuantity = null;

    if(addOrMinus === "add") {
      newQuantity = currentItem.quantity + 1;
    } else {
      newQuantity = currentItem.quantity - 1;
    }

    const res = await fetch(Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(res.ok){
      updateCartItemQuantity(bookId, newQuantity)
    } else {
      console.error("Error: ", res.text())
    }
  }

  const handleFocus = (bookId) => {
    setPrevQuantities((prev) => {
      const currentQuantity = cartItems.items.find((item) => item.book_id === bookId)?.quantity;
      return {...prev, [bookId]: currentQuantity}
    })
  } 

  const handleQuantityChangeLocal = (bookId, newValue) => {
    if(newValue === ""){
      setCartItems((prev) => {
        const updatedItems = prev.items.map((item) => item.book_id === bookId ? {...item, quantity: ""} : item)

        return {...prev, items: updatedItems}
      })

      return
    }


    const newQuantity = parseInt(newValue);
    if(isNaN(newQuantity) || newQuantity < 1){
      return
    }

    setCartItems((prev) => {
      const updatedItems = prev.items.map((item) => (
        item.book_id === bookId ? {...item, quantity: newQuantity} : item
      ));
      return {...prev, items: updatedItems}
    })
  }

  const handleQuantityBlur = async(bookId, newValue) => {

    if(newValue === "" || isNaN(parseInt(newValue))){
      const oldQuantity = prevQuantities[bookId];
      setCartItems((prev) => {
        const updatedItems = prev.items.map((item) => (
          item.book_id === bookId ? {...item, quantity: oldQuantity} : item
        ))

        return {...prev, items: updatedItems}
      })

      return
    }

    const newQuantity = parseInt(newValue);

    const res = await fetch(Endpoints.UPDATE_BOOK_QUANTITY(userEmail, bookId, newQuantity), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(res.ok){
      updateCartItemQuantity(bookId, newQuantity)
    } else {
      console.error("Error updating quantity")
    }
  }

  useEffect(() => {
    fetchData(Endpoints.CART_ITEMS(userEmail), setCartItems)
    
  }, [userEmail])

  return (
    <div className="menu" onClick={e => handleBackdropClick(e, setIsCartModalOpen)}>
      { showFlashMessage && <FlashMessageWithAgreement message="Ви впевнені, що хочете видалити всі товари з кошика?"
      onConfirm={handleDeleteAll} onClose={() => setShowFlashMessage(false)}/> }
      <div className={`menu__content cart-content ${isCartModalOpen ? 'active': ''}`}>
        <div className="menu__header cart-header">
            <p className="cart-header__title">
                Кошик
            </p>
            <ModalCloseBtn clickHandler={() => setIsCartModalOpen(false)} />
        </div>
        <div className="menu__body cart-body">
            { !cartItems?.items || cartItems.items.length === 0 ? (
              <div className="cart-body__text-container">
                <p className="cart-body__text-title">
                      Ваш кошик порожній
                  </p> 
                  <p className="cart-body__text-desc">
                      Не вагайтесь і перегляньте наш каталог, 
                      щоб знайти щось гарне для Вас!
                  </p>
              </div>  
            ) : (
                <div className="cart-body__items">
                  <div className="cart-body__items-count">
                     <span className="cart-body__count">
                      { cartItems?.items?.length } шт.
                     </span>
                     <button className="cart-body__btn delete-all-btn" type="button"
                     onClick={ deleteAllItemsFromCartHandler }>
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
                                <Image src={`${item.is_in_stock ? "/icons/green-truck.svg" : "/icons/truck.svg"}`} height="18" width="18" alt="" />
                                <span className={`cart-body__status-text ${item.is_in_stock ? "green-text": "red-text"}`}>
                                  { item.is_in_stock ? "В наявності" : "Немає в наявності" }  
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
                          onClick={ () => deleteItemFromCartHandler(item.book_id) }>
                            Видалити
                          </button>

                          <div className="cart-body__quantity">
                            <div className="cart-body__quantity-feature minus" onClick={() => changeQuantity(item.book_id, "minus")}>
                              <div className="cart-body__minus"></div>
                            </div>

                            <input type="text" className="cart-body__quantity-input" value={ item.quantity === 0 ? "" : item.quantity } min="1" max="999"
                            onFocus={() => handleFocus(item.book_id)}
                            onChange={(e) => handleQuantityChangeLocal(item.book_id, e.target.value)}
                            onBlur={(e) => handleQuantityBlur(item.book_id, e.target.value)}/>

                            <div className="cart-body__quantity-feature plus" onClick={() => changeQuantity(item.book_id, "add")}>
                              <div className="cart-body__plus"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )) }
                  </div>
                  
                  <div className="cart-body__bottom-section">
                    <div className="cart-body__bonuses">
                      <div className="cart-body__bonuses-container">
                        <Image src="/icons/bonus.svg" height="25" width="25" alt="" />
                        <p className="cart-body__bonuses-text">
                          За цю покупку буде нараховано {" "}
                          <span className="cart-body__bonuses-highlighted">
                            +{Math.ceil(cartItems.total_price / 2)} бонусів.  
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="cart-body__footer">
                      <div className="cart-body__footer-row">
                        <p className="cart-body__footer-text bold-text">
                          Всього
                        </p>
                        <p className="cart-body__footer-text bold-text">
                          { cartItems.total_price } грн
                        </p>
                      </div>

                      <div className="cart-body__footer-row">
                        { console.log(isBonusesInfoModalOpen) }
                        <p className="cart-body__footer-text-smaller" >
                          Бонуси за замовлення
                          <Image src="/icons/info.svg" className="cart-body__footer-text-image" 
                          alt="" width="16" height="16" onClick={() => setIsBonusesInfoModalOpen(!isBonusesInfoModalOpen)}/>
                        </p>
                        <p className="cart-body__footer-text-bonuses">
                          + {Math.ceil(cartItems.total_price / 2)} бонусів
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
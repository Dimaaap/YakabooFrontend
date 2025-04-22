import React from 'react'
import Image from 'next/image'

export const CartModal = () => {
  return (
    <div className="menu">
      <div className={`menu__content cart-content ${isMenuModalOpen ? 'active': ''}`}>
        <div className="menu__header cart-header">
            <p className="cart-header__title">
                Кошик
            </p>
            <button className="menu__close" type="button">
                <Image src="/icons/close-smaller.svg" alt="" width="20" height="20" />
            </button>
        </div>
        <div className="menu__body cart-body">
            <div className="cart-body__text-container">
               <p className="cart-body__text-title">
                    Ваш кошик порожній
                </p> 
                <p className="cart-body__text-desc">
                    Не вагайтесь і перегляньте наш каталогю, 
                    щою знайти щосб гарне для Вас!
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}


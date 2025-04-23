import React from 'react'
import Image from 'next/image'
import { useCartModalStore } from '../../states'

export const CartModal = () => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()

  const handleBackdropClick = (e) => {
    if(e.target === e.currentTarget){
      setIsCartModalOpen(false);
    }
  }

  return (
    <div className="menu" onClick={handleBackdropClick}>
      <div className={`menu__content cart-content ${isCartModalOpen ? 'active': ''}`}>
        <div className="menu__header cart-header">
            <p className="cart-header__title">
                Кошик
            </p>
            <button className="menu__close" type="button" onClick={() => setIsCartModalOpen(false)}>
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


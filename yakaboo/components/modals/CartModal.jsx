import React from 'react'
import { useCartModalStore } from '../../states'
import { handleBackdropClick } from '../../services'
import { ModalCloseBtn } from '../shared'

export const CartModal = () => {

  const { isCartModalOpen, setIsCartModalOpen } = useCartModalStore()

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


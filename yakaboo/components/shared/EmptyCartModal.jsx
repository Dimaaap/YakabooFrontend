import React from 'react'

export const EmptyCartModal = () => {
  return (
    <div className="cart-body__text-container">
        <p className="cart-body__text-title">
            Ваш кошик порожній
        </p> 
        <p className="cart-body__text-desc">
            Не вагайтесь і перегляньте наш каталог, 
            щоб знайти щось гарне для Вас!
        </p>
    </div> 
  )
}

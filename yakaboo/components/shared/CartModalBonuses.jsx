import Image from 'next/image'
import React from 'react'

export const CartModalBonuses = ({  cart}) => {
  return (
   <div className="cart-body__bonuses">
    <div className="cart-body__bonuses-container">
        <Image src="/icons/bonus.svg" height="25" width="25" alt="" />
        <p className="cart-body__bonuses-text">
            За цю покупку буде нараховано {" "}
            <span className="cart-body__bonuses-highlighted">
                +{Math.ceil(cart.total_price / 2)} бонусів.  
            </span>
        </p>
    </div>
    </div>
  )
}
